from __future__ import annotations

from typing import Any, Dict, List

from fastapi import APIRouter, Depends, HTTPException, Request

from decypharr.config import Config
from decypharr.torrent_utils import infohash_from_torrent, parse_magnet_infohash, map_debrid_status
from decypharr.services.context import AppContext
from decypharr.debrid.storage import DebridStorage
from decypharr.services.rclone import RcloneManager


def _require_auth(request: Request, ctx: AppContext) -> None:
    cfg = ctx.config_manager.load()
    if not cfg.use_auth:
        return
    if request.session.get("user"):
        return
    raise HTTPException(status_code=401, detail="Authentication required")


router = APIRouter()


def get_ctx(request: Request) -> AppContext:
    return request.app.state.ctx


@router.get("/arrs")
async def get_arrs(request: Request, ctx: AppContext = Depends(get_ctx)):
    _require_auth(request, ctx)
    return [{"name": arr["name"], "host": arr["host"]} for arr in ctx.arrs.serialize()]


@router.post("/debrid/test")
async def test_debrid_key(request: Request, payload: Dict[str, Any], ctx: AppContext = Depends(get_ctx)):
    _require_auth(request, ctx)
    name = str(payload.get("name") or "").strip()
    api_key = str(payload.get("api_key") or "").strip()
    unpack_rar = bool(payload.get("unpack_rar", False))
    if not name or not api_key:
        raise HTTPException(status_code=400, detail="name and api_key required")
    try:
        profile = ctx.debrids.test_key(name, api_key, unpack_rar=unpack_rar)
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    profile_data = {
        "name": profile.name,
        "username": profile.username,
        "expiration": profile.expiration.isoformat() if profile.expiration else None,
        "type": profile.type,
        "points": profile.points,
    }
    return {"ok": True, "profile": profile_data}


@router.post("/add")
async def add_content(request: Request, ctx: AppContext = Depends(get_ctx)):
    _require_auth(request, ctx)
    form = await request.form()

    urls_raw = form.get("urls") or ""
    urls = [u.strip() for u in str(urls_raw).split("\n") if u.strip()]
    files = form.getlist("files")
    category = str(form.get("arr") or "")
    debrid = str(form.get("debrid") or "") or None
    save_path = str(form.get("downloadFolder") or "") or None
    action = str(form.get("action") or "symlink")
    callback_url = str(form.get("callbackUrl") or form.get("callback_url") or "").strip() or None
    if not callback_url:
        callback_url = ctx.config_manager.load().callback_url

    results = []
    errors = []

    cfg = ctx.config_manager.load()
    debrid_config = next((d for d in cfg.debrids if d.name == debrid), None) if debrid else None
    if not debrid and len(cfg.debrids) == 1:
        debrid = cfg.debrids[0].name
        debrid_config = cfg.debrids[0]

    file_items = []
    for upload in files:
        filename = upload.filename or "upload.torrent"
        try:
            data = await upload.read()
        except Exception as exc:
            errors.append(str(exc))
            continue
        infohash = infohash_from_torrent(data)
        file_items.append({"filename": filename, "data": data, "infohash": infohash})

    cached_map = None
    if debrid and debrid_config and not debrid_config.download_uncached:
        hashes = [parse_magnet_infohash(url) for url in urls]
        hashes.extend(item["infohash"] for item in file_items)
        hashes = [h for h in hashes if h]
        if hashes:
            try:
                cached_map = ctx.debrids.is_cached_many(debrid, hashes)
            except Exception:
                cached_map = None

    for url in urls:
        try:
            infohash = parse_magnet_infohash(url)
            if debrid:
                if debrid_config and not debrid_config.download_uncached and infohash:
                    cached = cached_map.get(infohash) if cached_map is not None else ctx.debrids.is_cached(debrid, infohash)
                    if not cached:
                        raise ValueError("Torrent is not cached on debrid")
                debrid_torrent = ctx.debrids.submit_magnet(debrid, url)
                name = debrid_torrent.name or url[:120]
                hash_value = (debrid_torrent.info_hash or infohash)
                torrent = ctx.torrents.add(
                    name=name,
                    magnet_uri=url,
                    category=category,
                    save_path=save_path,
                    debrid=debrid,
                    hash_value=hash_value,
                    debrid_id=debrid_torrent.id,
                    state=map_debrid_status(debrid_torrent.status),
                    action=action,
                    callback_url=callback_url,
                )
            else:
                name = url[:120]
                torrent = ctx.torrents.add(
                    name=name,
                    magnet_uri=url,
                    category=category,
                    save_path=save_path,
                    debrid=debrid,
                    hash_value=infohash,
                    action=action,
                    callback_url=callback_url,
                )
            results.append({"hash": torrent.hash, "name": torrent.name})
        except Exception as exc:  # pragma: no cover
            errors.append(str(exc))

    for item in file_items:
        try:
            filename = item["filename"]
            data = item["data"]
            infohash = item["infohash"]
            if debrid:
                if debrid_config and not debrid_config.download_uncached and infohash:
                    cached = cached_map.get(infohash) if cached_map is not None else ctx.debrids.is_cached(debrid, infohash)
                    if not cached:
                        raise ValueError("Torrent is not cached on debrid")
                debrid_torrent = ctx.debrids.submit_torrent_file(debrid, data)
                name = debrid_torrent.name or filename
                hash_value = debrid_torrent.info_hash or infohash
                torrent = ctx.torrents.add(
                    name=name,
                    magnet_uri=None,
                    category=category,
                    save_path=save_path,
                    debrid=debrid,
                    hash_value=hash_value,
                    debrid_id=debrid_torrent.id,
                    state=map_debrid_status(debrid_torrent.status),
                    action=action,
                    callback_url=callback_url,
                )
            else:
                torrent = ctx.torrents.add(
                    name=filename,
                    magnet_uri=None,
                    category=category,
                    save_path=save_path,
                    debrid=debrid,
                    hash_value=infohash,
                    action=action,
                    callback_url=callback_url,
                )
            results.append({"hash": torrent.hash, "name": torrent.name})
        except Exception as exc:  # pragma: no cover
            errors.append(str(exc))

    return {"results": results, "errors": errors}




@router.post("/repair")
async def repair_media(request: Request, payload: Dict[str, Any], ctx: AppContext = Depends(get_ctx)):
    _require_auth(request, ctx)
    arr_name = str(payload.get("arr") or "")
    media_ids = payload.get("mediaIds") or []
    if media_ids is None:
        media_ids = []
    if not isinstance(media_ids, list):
        raise HTTPException(status_code=400, detail="mediaIds must be a list")
    auto_process = bool(payload.get("autoProcess", False))
    arrs = [arr_name] if arr_name else []
    try:
        job_id = ctx.repair.add_job(arrs, [str(m) for m in media_ids], auto_process, recurrent=False)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    return {"ok": True, "job_id": job_id}


@router.get("/repair/jobs")
async def repair_jobs(request: Request, ctx: AppContext = Depends(get_ctx)):
    _require_auth(request, ctx)
    return ctx.repair.get_jobs()


@router.post("/repair/jobs/{job_id}/process")
async def process_repair_job(request: Request, job_id: str, ctx: AppContext = Depends(get_ctx)):
    _require_auth(request, ctx)
    try:
        ctx.repair.process_job(job_id)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return {"ok": True}


@router.post("/repair/jobs/{job_id}/stop")
async def stop_repair_job(request: Request, job_id: str, ctx: AppContext = Depends(get_ctx)):
    _require_auth(request, ctx)
    try:
        ctx.repair.stop_job(job_id)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return {"ok": True}


@router.delete("/repair/jobs")
async def delete_repair_jobs(request: Request, ctx: AppContext = Depends(get_ctx)):
    _require_auth(request, ctx)
    payload = await request.json()
    ids = payload.get("ids") if isinstance(payload, dict) else None
    if not ids:
        return {"ok": True}
    if not isinstance(ids, list):
        raise HTTPException(status_code=400, detail="ids must be list")
    ctx.repair.delete_jobs([str(i) for i in ids])
    return {"ok": True}


@router.get("/torrents")
async def get_torrents(request: Request, ctx: AppContext = Depends(get_ctx)):
    _require_auth(request, ctx)
    return [t.model_dump(mode="json") for t in ctx.torrents.list()]


@router.delete("/torrents/{category}/{hash_value}")
async def delete_torrent(request: Request, category: str, hash_value: str, ctx: AppContext = Depends(get_ctx)):
    _require_auth(request, ctx)
    remove_from_debrid = request.query_params.get("removeFromDebrid") == "true"
    torrent = ctx.torrents.get(hash_value)
    if remove_from_debrid and torrent and torrent.debrid and torrent.id:
        try:
            ctx.debrids.delete_torrent(torrent.debrid, torrent.id)
        except Exception:
            pass
    ctx.torrents.delete([hash_value])
    return {"ok": True}


@router.delete("/torrents")
async def delete_all_torrents(request: Request, ctx: AppContext = Depends(get_ctx)):
    _require_auth(request, ctx)
    hashes_param = request.query_params.get("hashes")
    remove_from_debrid = request.query_params.get("removeFromDebrid") == "true"
    hashes = [h for h in (hashes_param or "").split(",") if h] if hashes_param else [t.hash for t in ctx.torrents.list()]
    if remove_from_debrid:
        for h in hashes:
            torrent = ctx.torrents.get(h)
            if torrent and torrent.debrid and torrent.id:
                try:
                    ctx.debrids.delete_torrent(torrent.debrid, torrent.id)
                except Exception:
                    pass
    ctx.torrents.delete(hashes)
    return {"ok": True}


@router.get("/config")
async def get_config(request: Request, ctx: AppContext = Depends(get_ctx)):
    _require_auth(request, ctx)
    cfg = ctx.config_manager.load()
    data = cfg.model_dump(mode="json", exclude={"auth", "path"})
    data["arrs"] = ctx.arrs.serialize()
    if cfg.auth:
        data["auth"] = {"username": cfg.auth.username, "api_token": cfg.auth.api_token}
        data["api_token"] = cfg.auth.api_token
        data["auth_username"] = cfg.auth.username
    return data


@router.post("/config")
async def update_config(request: Request, payload: Dict[str, Any], ctx: AppContext = Depends(get_ctx)):
    _require_auth(request, ctx)
    current = ctx.config_manager.load()
    base = current.model_dump(mode="json")
    base.update(payload)
    updated = Config.model_validate(base)
    updated.path = current.path
    updated.auth = current.auth
    ctx.config_manager.save(updated)
    old_debrids = ctx.debrids
    ctx.debrids = DebridStorage(updated)
    try:
        old_debrids.close()
    except Exception:
        pass
    ctx.repair.update_debrids(ctx.debrids)
    ctx.arrs.refresh_from_config(updated)
    ctx.repair.refresh_from_config()
    if ctx.rclone:
        ctx.rclone.stop()
    ctx.rclone = None
    if updated.rclone.enabled:
        ctx.rclone = RcloneManager(ctx.config_manager)
        ctx.rclone.start()
        ctx.rclone.sync_mounts(updated)
    return {"ok": True}


@router.post("/refresh-token")
async def refresh_token(request: Request, ctx: AppContext = Depends(get_ctx)):
    _require_auth(request, ctx)
    token = ctx.config_manager.refresh_api_token()
    return {"ok": True, "token": token, "message": "Token refreshed"}


@router.post("/update-auth")
async def update_auth(request: Request, payload: Dict[str, Any], ctx: AppContext = Depends(get_ctx)):
    _require_auth(request, ctx)
    username = payload.get("username")
    password = payload.get("password")
    if not username or not password:
        raise HTTPException(status_code=400, detail="Username and password required")
    ctx.config_manager.ensure_auth(username, password)
    return {"ok": True, "message": "Authentication updated"}
