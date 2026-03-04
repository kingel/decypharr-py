from __future__ import annotations

from typing import Dict, List, Optional, Tuple
import base64
import hashlib
import time
import os
import re

from fastapi import APIRouter, Depends, Form, Request
from fastapi.responses import PlainTextResponse

from decypharr.arr import ArrClient
from decypharr.config import Arr as ArrConfig
from decypharr.services.context import AppContext
from decypharr.torrent_utils import (
    infohash_from_torrent,
    map_debrid_status,
    parse_magnet_infohash,
    parse_magnet_trackers,
    trackers_from_torrent,
)


router = APIRouter()

_QBIT_TAGS: set[str] = set()
_FILE_ID_SPLIT_RE = re.compile(r"[|,]")


class QbitError(Exception):
    def __init__(self, status_code: int, message: str) -> None:
        super().__init__(message)
        self.status_code = status_code
        self.message = message


def _torrent_payload(t, now: int) -> dict:
    completed = int(t.size * t.progress)
    amount_left = max(t.size - completed, 0)
    eta = -1
    if t.dlspeed and amount_left > 0:
        eta = int(amount_left / max(t.dlspeed, 1))
    tracker = ""
    if t.trackers:
        tracker = t.trackers[0]
    elif t.magnet_uri:
        magnet_trackers = parse_magnet_trackers(t.magnet_uri)
        if magnet_trackers:
            tracker = magnet_trackers[0]
    return {
        "added_on": t.added_on,
        "amount_left": amount_left,
        "auto_tmm": False,
        "availability": 0,
        "category": t.category,
        "completed": completed,
        "completion_on": t.added_on if t.progress >= 1.0 else 0,
        "content_path": t.content_path or t.save_path or "",
        "dl_limit": -1,
        "dlspeed": t.dlspeed,
        "downloaded": completed,
        "downloaded_session": completed,
        "eta": eta,
        "f_l_piece_prio": False,
        "force_start": False,
        "hash": t.hash,
        "last_activity": now,
        "magnet_uri": t.magnet_uri or "",
        "max_ratio": -1,
        "max_seeding_time": -1,
        "name": t.name,
        "num_complete": t.num_seeds,
        "num_incomplete": 0,
        "num_leechs": 0,
        "num_seeds": t.num_seeds,
        "priority": 0,
        "progress": t.progress,
        "ratio": 0,
        "ratio_limit": -1,
        "save_path": t.save_path or "",
        "seeding_time_limit": -1,
        "seen_complete": 0,
        "seq_dl": False,
        "size": t.size,
        "seeding_time": 0,
        "state": t.state,
        "super_seeding": False,
        "tags": ",".join(t.tags),
        "time_active": max(now - t.added_on, 0),
        "total_size": t.size,
        "tracker": tracker,
        "up_limit": -1,
        "uploaded": 0,
        "uploaded_session": 0,
        "upspeed": 0,
        "source": "decypharr",
    }


def get_ctx(request: Request) -> AppContext:
    return request.app.state.ctx


def _parse_hashes(hashes: Optional[str]) -> Optional[List[str]]:
    if not hashes:
        return []
    if hashes == "all":
        return None
    return [h for h in hashes.replace("|", ",").split(",") if h]


def _matches_filter(t, filter_value: str) -> bool:
    if not filter_value or filter_value == "all":
        return True
    if filter_value == "completed":
        return t.progress >= 1.0
    if filter_value == "downloading":
        return t.progress < 1.0
    if filter_value == "paused":
        return t.state.startswith("paused")
    if filter_value == "seeding":
        return t.progress >= 1.0
    return t.state == filter_value


def _decode_basic_auth(header: str) -> Tuple[str, str]:
    if not header:
        return "", ""
    parts = header.split(" ", 1)
    if len(parts) != 2 or parts[0].lower() != "basic":
        return "", ""
    try:
        decoded = base64.b64decode(parts[1]).decode("utf-8")
    except Exception:
        return "", ""
    username, sep, password = decoded.rpartition(":")
    if not sep:
        return "", ""
    return username.strip(), password.strip()


def _create_sid(username: str, password: str, secret: str) -> str:
    combined = f"{username}|{password}"
    digest = hashlib.sha256((combined + secret).encode("utf-8")).hexdigest()[:16]
    raw = f"{combined}|{digest}".encode("utf-8")
    return base64.urlsafe_b64encode(raw).decode("utf-8")


def _extract_from_sid(sid: str, secret: str) -> Tuple[str, str]:
    try:
        decoded = base64.urlsafe_b64decode(sid.encode("utf-8")).decode("utf-8")
    except Exception:
        return "", ""
    parts = decoded.split("|")
    if len(parts) != 3:
        return "", ""
    username, password, provided = parts
    combined = f"{username}|{password}"
    digest = hashlib.sha256((combined + secret).encode("utf-8")).hexdigest()[:16]
    if digest != provided:
        return "", ""
    return username, password


def _get_auth_credentials(request: Request, ctx: AppContext) -> Tuple[str, str]:
    username, password = _decode_basic_auth(request.headers.get("Authorization", ""))
    if username:
        return username, password
    sid = request.cookies.get("sid") or request.cookies.get("SID") or ""
    if sid:
        return _extract_from_sid(sid, ctx.config_manager.secret_key())
    return "", ""


def _require_qbit_auth(request: Request, ctx: AppContext, category: str) -> Optional[ArrClient]:
    cfg = ctx.config_manager.load()
    username, password = _get_auth_credentials(request, ctx)
    if cfg.qbittorrent.username and cfg.qbittorrent.password:
        if username != cfg.qbittorrent.username or password != cfg.qbittorrent.password:
            raise QbitError(status_code=401, message="unauthorized: invalid credentials")
        return None
    if not username or not password:
        if cfg.use_auth:
            raise QbitError(
                status_code=401,
                message="unauthorized: Host and token are required for authentication(you've enabled authentication)",
            )
        return None
    try:
        return _authenticate_arr(ctx, category, username, password)
    except Exception:
        if cfg.use_auth and ctx.config_manager.verify_auth(username, password):
            return None
        if cfg.use_auth:
            raise QbitError(status_code=401, message="unauthorized: invalid credentials")
        raise


def _authenticate_arr(ctx: AppContext, category: str, username: str, password: str) -> Optional[ArrClient]:
    cfg = ctx.config_manager.load()
    arr_cfg = ArrConfig(
        name=category or "",
        host=username,
        token=password,
        cleanup=False,
        auto_remove_completed=False,
        skip_repair=False,
        download_uncached=None,
        selected_debrid=None,
        source="auto",
    )
    arr = ArrClient(arr_cfg)
    try:
        arr.validate()
    except Exception:
        if cfg.use_auth and ctx.config_manager.verify_auth(username, password):
            return None
        if not cfg.use_auth:
            return arr
        raise
    if category:
        ctx.arrs.add_or_update(arr)
    return arr


def _parse_file_ids(value: Optional[str]) -> List[int]:
    if not value:
        return []
    parts = [item for item in _FILE_ID_SPLIT_RE.split(value) if item]
    ids: List[int] = []
    for part in parts:
        try:
            ids.append(int(part))
        except ValueError:
            continue
    return ids


@router.post("/auth/login", response_class=PlainTextResponse)
async def auth_login(
    request: Request,
    username: str = Form("") ,
    password: str = Form("") ,
    ctx: AppContext = Depends(get_ctx),
):
    cfg = ctx.config_manager.load()
    # Allow qbittorrent credentials if configured, otherwise fallback to app auth
    if cfg.qbittorrent.username and cfg.qbittorrent.password:
        if username != cfg.qbittorrent.username or password != cfg.qbittorrent.password:
            raise QbitError(status_code=401, message="unauthorized: invalid credentials")
        if cfg.use_auth:
            sid = _create_sid(username, password, ctx.config_manager.secret_key())
            response = PlainTextResponse("Ok.")
            response.set_cookie("sid", sid)
            return response
        return PlainTextResponse("Ok.")

    category = request.query_params.get("category", "") or ""
    try:
        _authenticate_arr(ctx, category, username, password)
    except Exception:
        if cfg.use_auth and (not username or not password):
            raise QbitError(
                status_code=401,
                message="unauthorized: Host and token are required for authentication(you've enabled authentication)",
            )
        if cfg.use_auth and not ctx.config_manager.verify_auth(username, password):
            raise QbitError(status_code=401, message="unauthorized: invalid credentials")
    if cfg.use_auth:
        sid = _create_sid(username, password, ctx.config_manager.secret_key())
        response = PlainTextResponse("Ok.")
        response.set_cookie("sid", sid)
        return response
    return PlainTextResponse("Ok.")


@router.get("/torrents/info")
@router.post("/torrents/info")
async def torrents_info(
    request: Request,
    hashes: Optional[str] = None,
    category: Optional[str] = None,
    tag: Optional[str] = None,
    ctx: AppContext = Depends(get_ctx),
):
    category = (category or request.query_params.get("category") or "").strip()
    filter_value = (request.query_params.get("filter") or "").strip()
    _require_qbit_auth(request, ctx, category)
    items = ctx.torrents.list()
    now = int(time.time())
    if hashes is None:
        hashes = request.query_params.get("hashes")
    if hashes is None:
        form = await request.form()
        hashes = form.get("hashes") if form else None
    hash_list = _parse_hashes(hashes)
    if hash_list:
        items = [t for t in items if t.hash in hash_list]
    if category:
        items = [t for t in items if t.category == category]
    if filter_value:
        items = [t for t in items if _matches_filter(t, filter_value)]
    if tag:
        items = [t for t in items if tag in t.tags]
    items.sort(key=lambda t: t.added_on, reverse=True)
    return [_torrent_payload(t, now) for t in items]


@router.post("/torrents/add", response_class=PlainTextResponse)
async def torrents_add(
    request: Request,
    urls: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    tags: Optional[str] = Form(None),
    savepath: Optional[str] = Form(None),
    ctx: AppContext = Depends(get_ctx),
):
    cfg = ctx.config_manager.load()
    category = (category or "").strip()
    arr = _require_qbit_auth(request, ctx, category)
    if arr is None and category:
        arr = ctx.arrs.get(category)

    tag_list = [t.strip() for t in (tags or "").split(",") if t.strip()]
    debrid = None
    if arr and arr.selected_debrid:
        debrid = arr.selected_debrid
    if not debrid and len(cfg.debrids) == 1:
        debrid = cfg.debrids[0].name
    debrid_config = next((d for d in cfg.debrids if d.name == debrid), None) if debrid else None
    if debrid and debrid not in ctx.debrids.entries():
        raise QbitError(status_code=400, message="no debrid clients available")

    download_uncached = None
    if arr and arr.download_uncached is not None:
        download_uncached = arr.download_uncached

    form = await request.form()
    action = (cfg.qbittorrent.default_action or "symlink").lower()
    if action not in ("symlink", "download", "none"):
        action = "symlink"
    if str(form.get("sequentialDownload", "")).lower() == "true":
        action = "download"
    callback_url = cfg.callback_url
    savepath = savepath or cfg.qbittorrent.download_folder or ""
    if category:
        tail = os.path.basename(savepath.rstrip(os.path.sep))
        if tail != category:
            savepath = os.path.join(savepath, category)

    url_items = []
    if urls:
        for raw in urls.split("\n"):
            url = raw.strip()
            if not url:
                continue
            url_items.append(
                {
                    "url": url,
                    "infohash": parse_magnet_infohash(url),
                    "trackers": parse_magnet_trackers(url),
                }
            )

    uploads = []
    if form:
        uploads.extend(form.getlist("torrents"))
        uploads.extend(form.getlist("files"))
    file_items = []
    for upload in uploads:
        try:
            data = await upload.read()
        except Exception:
            continue
        infohash = infohash_from_torrent(data)
        file_items.append(
            {
                "upload": upload,
                "data": data,
                "infohash": infohash,
                "trackers": trackers_from_torrent(data),
            }
        )

    if not url_items and not file_items:
        raise QbitError(status_code=400, message="No valid URLs or torrents provided")

    cached_map = None
    if debrid and download_uncached is not True and debrid_config and not debrid_config.download_uncached:
        hashes = [item["infohash"] for item in url_items if item["infohash"]]
        hashes.extend(item["infohash"] for item in file_items if item["infohash"])
        if hashes:
            try:
                cached_map = ctx.debrids.is_cached_many(debrid, hashes)
            except Exception:
                cached_map = None

    for item in url_items:
        url = item["url"]
        infohash = item["infohash"]
        trackers = item.get("trackers") or []
        if debrid:
            if download_uncached is not True and debrid_config and not debrid_config.download_uncached and infohash:
                try:
                    cached = cached_map.get(infohash) if cached_map is not None else ctx.debrids.is_cached(debrid, infohash)
                except Exception as exc:
                    raise QbitError(status_code=400, message=f"Debrid cache check failed: {exc}") from exc
                if not cached:
                    raise QbitError(status_code=400, message="Torrent is not cached on debrid")
            try:
                debrid_torrent = ctx.debrids.submit_magnet(debrid, url)
            except Exception as exc:
                raise QbitError(status_code=400, message=f"Debrid submit failed: {exc}") from exc
            name = debrid_torrent.name or url[:120]
            hash_value = debrid_torrent.info_hash or infohash
            state = map_debrid_status(debrid_torrent.status)
            if state == "pausedUP":
                state = "downloading"
            ctx.torrents.add(
                name=name,
                magnet_uri=url,
                category=category or "",
                tags=tag_list,
                save_path=savepath,
                debrid=debrid,
                hash_value=hash_value,
                debrid_id=debrid_torrent.id,
                state=state,
                action=action,
                callback_url=callback_url,
                trackers=trackers,
            )
        else:
            name = url[:120]
            ctx.torrents.add(
                name=name,
                magnet_uri=url,
                category=category or "",
                tags=tag_list,
                save_path=savepath,
                hash_value=infohash,
                action=action,
                callback_url=callback_url,
                trackers=trackers,
            )

    for item in file_items:
        upload = item["upload"]
        data = item["data"]
        infohash = item["infohash"]
        trackers = item.get("trackers") or []
        if debrid:
            if download_uncached is not True and debrid_config and not debrid_config.download_uncached and infohash:
                try:
                    cached = cached_map.get(infohash) if cached_map is not None else ctx.debrids.is_cached(debrid, infohash)
                except Exception as exc:
                    raise QbitError(status_code=400, message=f"Debrid cache check failed: {exc}") from exc
                if not cached:
                    raise QbitError(status_code=400, message="Torrent is not cached on debrid")
            try:
                debrid_torrent = ctx.debrids.submit_torrent_file(debrid, data)
            except Exception as exc:
                raise QbitError(status_code=400, message=f"Debrid submit failed: {exc}") from exc
            name = debrid_torrent.name or (upload.filename or "upload.torrent")
            hash_value = debrid_torrent.info_hash or infohash
            state = map_debrid_status(debrid_torrent.status)
            if state == "pausedUP":
                state = "downloading"
            ctx.torrents.add(
                name=name,
                magnet_uri=None,
                category=category or "",
                tags=tag_list,
                save_path=savepath,
                debrid=debrid,
                hash_value=hash_value,
                debrid_id=debrid_torrent.id,
                state=state,
                action=action,
                callback_url=callback_url,
                trackers=trackers,
            )
        else:
            name = upload.filename or "upload.torrent"
            ctx.torrents.add(
                name=name,
                magnet_uri=None,
                category=category or "",
                tags=tag_list,
                save_path=savepath,
                hash_value=infohash,
                action=action,
                callback_url=callback_url,
                trackers=trackers,
            )
    return PlainTextResponse("Ok.")


@router.post("/torrents/delete", response_class=PlainTextResponse)
async def torrents_delete(request: Request, hashes: str = Form(""), ctx: AppContext = Depends(get_ctx)):
    _require_qbit_auth(request, ctx, "")
    hash_list = _parse_hashes(hashes)
    if hash_list == []:
        raise QbitError(status_code=400, message="No hashes provided")
    if hash_list is None:
        hash_list = [t.hash for t in ctx.torrents.list()]
    ctx.torrents.delete(hash_list)
    return PlainTextResponse("Ok.")


@router.get("/torrents/categories")
@router.post("/torrents/categories")
async def torrent_categories(request: Request, ctx: AppContext = Depends(get_ctx)):
    _require_qbit_auth(request, ctx, "")
    cfg = ctx.config_manager.load()
    save_root = cfg.qbittorrent.download_folder or ""
    return {name: {"name": name, "savePath": os.path.join(save_root, name)} for name in cfg.qbittorrent.categories}


@router.post("/torrents/createCategory", response_class=PlainTextResponse)
async def torrents_create_category(request: Request, category: str = Form(""), ctx: AppContext = Depends(get_ctx)):
    _require_qbit_auth(request, ctx, "")
    cfg = ctx.config_manager.load()
    if category and category not in cfg.qbittorrent.categories:
        cfg.qbittorrent.categories.append(category)
        ctx.config_manager.save(cfg)
    return PlainTextResponse("Ok.")


@router.post("/torrents/setCategory", response_class=PlainTextResponse)
async def torrents_set_category(
    request: Request,
    hashes: str = Form(""),
    category: str = Form(""),
    ctx: AppContext = Depends(get_ctx),
):
    _require_qbit_auth(request, ctx, "")
    hash_list = _parse_hashes(hashes)
    if hash_list is None:
        hash_list = [t.hash for t in ctx.torrents.list()]
    if category:
        ctx.torrents.update_category(hash_list, category)
    return PlainTextResponse("Ok.")


@router.post("/torrents/addTags", response_class=PlainTextResponse)
async def torrents_add_tags(request: Request, hashes: str = Form(""), tags: str = Form(""), ctx: AppContext = Depends(get_ctx)):
    _require_qbit_auth(request, ctx, "")
    hash_list = _parse_hashes(hashes)
    if hash_list is None:
        hash_list = [t.hash for t in ctx.torrents.list()]
    tag_list = [t.strip() for t in tags.split(",") if t.strip()]
    ctx.torrents.add_tags(hash_list, tag_list)
    _QBIT_TAGS.update(tag_list)
    return PlainTextResponse("Ok.")


@router.post("/torrents/removeTags", response_class=PlainTextResponse)
async def torrents_remove_tags(request: Request, hashes: str = Form(""), tags: str = Form(""), ctx: AppContext = Depends(get_ctx)):
    _require_qbit_auth(request, ctx, "")
    hash_list = _parse_hashes(hashes)
    if hash_list is None:
        hash_list = [t.hash for t in ctx.torrents.list()]
    tag_list = [t.strip() for t in tags.split(",") if t.strip()]
    ctx.torrents.remove_tags(hash_list, tag_list)
    for tag in tag_list:
        _QBIT_TAGS.discard(tag)
    return PlainTextResponse("Ok.")


@router.post("/torrents/createTags", response_class=PlainTextResponse)
async def torrents_create_tags(tags: str = Form("")):
    tag_list = [t.strip() for t in tags.split(",") if t.strip()]
    _QBIT_TAGS.update(tag_list)
    return PlainTextResponse("Ok.")


@router.get("/torrents/tags")
@router.post("/torrents/tags")
async def torrents_tags(request: Request, ctx: AppContext = Depends(get_ctx)):
    _require_qbit_auth(request, ctx, "")
    tags = set(_QBIT_TAGS)
    for t in ctx.torrents.list():
        tags.update(t.tags)
    return sorted(tags)


@router.get("/torrents/pause")
@router.post("/torrents/pause")
async def torrents_pause(request: Request, hashes: Optional[str] = None, ctx: AppContext = Depends(get_ctx)):
    _require_qbit_auth(request, ctx, "")
    if hashes is None:
        hashes = request.query_params.get("hashes")
    if hashes is None:
        form = await request.form()
        hashes = form.get("hashes") if form else None
    hash_list = _parse_hashes(hashes)
    if hash_list is None:
        hash_list = [t.hash for t in ctx.torrents.list()]
    ctx.torrents.set_state(hash_list, "pausedUP")
    return "Ok."


@router.get("/torrents/resume")
@router.post("/torrents/resume")
async def torrents_resume(request: Request, hashes: Optional[str] = None, ctx: AppContext = Depends(get_ctx)):
    _require_qbit_auth(request, ctx, "")
    if hashes is None:
        hashes = request.query_params.get("hashes")
    if hashes is None:
        form = await request.form()
        hashes = form.get("hashes") if form else None
    hash_list = _parse_hashes(hashes)
    if hash_list is None:
        hash_list = [t.hash for t in ctx.torrents.list()]
    ctx.torrents.set_state(hash_list, "downloading")
    return "Ok."


@router.get("/torrents/recheck")
@router.post("/torrents/recheck")
async def torrents_recheck(request: Request, hashes: Optional[str] = None, ctx: AppContext = Depends(get_ctx)):
    _require_qbit_auth(request, ctx, "")
    if hashes is None:
        hashes = request.query_params.get("hashes")
    if hashes is None:
        form = await request.form()
        hashes = form.get("hashes") if form else None
    return "Ok."


@router.get("/torrents/properties")
@router.post("/torrents/properties")
async def torrents_properties(request: Request, hash: Optional[str] = None, ctx: AppContext = Depends(get_ctx)):
    _require_qbit_auth(request, ctx, "")
    if not hash:
        hash = request.query_params.get("hash") or None
    if not hash:
        form = await request.form()
        hash = form.get("hash") if form else None
    if not hash:
        return {}
    torrent = ctx.torrents.get(hash)
    if not torrent:
        return {}
    completed = int(torrent.size * torrent.progress)
    amount_left = max(torrent.size - completed, 0)
    eta = -1
    if torrent.dlspeed and amount_left > 0:
        eta = int(amount_left / max(torrent.dlspeed, 1))
    return {
        "addition_date": torrent.added_on,
        "comment": "Decypharr",
        "completion_date": torrent.added_on if torrent.progress >= 1.0 else 0,
        "created_by": "Decypharr",
        "creation_date": torrent.added_on,
        "dl_limit": -1,
        "up_limit": -1,
        "dl_speed": torrent.dlspeed,
        "dl_speed_avg": 0,
        "up_speed": 0,
        "up_speed_avg": 0,
        "eta": eta,
        "total_size": torrent.size,
        "total_wasted": 0,
        "total_downloaded": int(torrent.size * torrent.progress),
        "total_downloaded_session": int(torrent.size * torrent.progress),
        "total_uploaded": 0,
        "total_uploaded_session": 0,
        "last_seen": int(time.time()),
        "time_elapsed": max(int(time.time()) - torrent.added_on, 0),
        "nb_connections_limit": 100,
        "nb_connections": 0,
        "peers": 0,
        "peers_total": 0,
        "piece_size": 0,
        "pieces_have": 0,
        "pieces_num": 0,
        "reannounce": 0,
        "seeding_time": 0,
        "seeds": torrent.num_seeds,
        "seeds_total": torrent.num_seeds,
        "share_ratio": 0,
        "save_path": torrent.save_path or "",
    }


@router.get("/torrents/files")
@router.post("/torrents/files")
async def torrents_files(request: Request, hash: Optional[str] = None, ctx: AppContext = Depends(get_ctx)):
    _require_qbit_auth(request, ctx, "")
    if not hash:
        hash = request.query_params.get("hash") or None
    if not hash:
        form = await request.form()
        hash = form.get("hash") if form else None
    if not hash:
        return []
    torrent = ctx.torrents.get(hash)
    if not torrent or not torrent.debrid or not torrent.id:
        return []
    entry = ctx.debrids.entries().get(torrent.debrid)
    if not entry:
        return []
    remote = entry.client.get_torrent(torrent.id)
    files = []
    for idx, file in enumerate(remote.files.values()):
        files.append(
            {
                "id": idx,
                "name": file.name,
                "size": file.size,
                "progress": 1.0 if remote.status in ("downloaded", "completed") else torrent.progress,
                "priority": torrent.file_priorities.get(idx, 0),
                "is_seed": False,
                "piece_range": [0, 0],
                "availability": 0,
            }
        )
    return files


@router.get("/torrents/trackers")
@router.post("/torrents/trackers")
async def torrents_trackers(request: Request, hash: Optional[str] = None, ctx: AppContext = Depends(get_ctx)):
    _require_qbit_auth(request, ctx, "")
    if not hash:
        hash = request.query_params.get("hash") or None
    if not hash:
        form = await request.form()
        hash = form.get("hash") if form else None
    if not hash:
        return []
    torrent = ctx.torrents.get(hash)
    if not torrent:
        return []
    trackers = torrent.trackers
    if not trackers and torrent.magnet_uri:
        trackers = parse_magnet_trackers(torrent.magnet_uri)
    entries = []
    for idx, tracker in enumerate(trackers):
        entries.append(
            {
                "url": tracker,
                "status": 2,
                "tier": idx,
                "num_peers": 0,
                "num_seeds": 0,
                "num_leeches": 0,
                "num_downloaded": 0,
                "msg": "",
            }
        )
    return entries


@router.get("/torrents/peers")
@router.post("/torrents/peers")
async def torrents_peers(request: Request, hash: Optional[str] = None, ctx: AppContext = Depends(get_ctx)):
    _require_qbit_auth(request, ctx, "")
    if not hash:
        hash = request.query_params.get("hash") or None
    if not hash:
        form = await request.form()
        hash = form.get("hash") if form else None
    if not hash:
        return {"show_flags": False, "peers": {}}
    torrent = ctx.torrents.get(hash)
    if not torrent:
        return {"show_flags": False, "peers": {}}
    return {"show_flags": False, "peers": {}}


@router.post("/torrents/filePrio", response_class=PlainTextResponse)
async def torrents_file_prio(
    request: Request,
    hash: Optional[str] = Form(None),
    id: Optional[str] = Form(None),
    priority: Optional[str] = Form(None),
    ctx: AppContext = Depends(get_ctx),
):
    _require_qbit_auth(request, ctx, "")
    if not hash:
        form = await request.form()
        hash = form.get("hash") if form else None
        id = id or (form.get("id") if form else None)
        priority = priority or (form.get("priority") if form else None)
    if not hash:
        raise QbitError(status_code=400, message="hash required")
    ids = _parse_file_ids(id)
    try:
        prio = int(priority) if priority is not None else 0
    except ValueError:
        prio = 0
    if ids:
        updates: Dict[int, int] = {file_id: prio for file_id in ids}
        ctx.torrents.set_file_priorities(hash, updates)
    return PlainTextResponse("Ok.")


@router.get("/app/version", response_class=PlainTextResponse)
async def app_version():
    return PlainTextResponse("v4.3.2")


@router.get("/app/webapiVersion", response_class=PlainTextResponse)
async def app_webapi_version():
    return PlainTextResponse("2.7")


@router.get("/app/preferences")
async def app_preferences(request: Request, ctx: AppContext = Depends(get_ctx)):
    cfg = ctx.config_manager.load()
    save_path = cfg.qbittorrent.download_folder or ""
    return {
        "add_trackers": "",
        "add_trackers_enabled": False,
        "alt_dl_limit": 10240,
        "alt_up_limit": 10240,
        "alternative_webui_enabled": False,
        "alternative_webui_path": "",
        "announce_ip": "",
        "announce_to_all_tiers": True,
        "announce_to_all_trackers": False,
        "anonymous_mode": False,
        "async_io_threads": 4,
        "auto_delete_mode": 0,
        "auto_tmm_enabled": False,
        "autorun_enabled": False,
        "autorun_program": "",
        "banned_IPs": "",
        "bittorrent_protocol": 0,
        "bypass_auth_subnet_whitelist": "",
        "bypass_auth_subnet_whitelist_enabled": False,
        "bypass_local_auth": False,
        "category_changed_tmm_enabled": False,
        "checking_memory_use": 32,
        "create_subfolder_enabled": True,
        "current_interface_address": "",
        "current_network_interface": "",
        "dht": True,
        "disk_cache": -1,
        "disk_cache_ttl": 60,
        "dl_limit": 0,
        "dont_count_slow_torrents": False,
        "dyndns_domain": "changeme.dyndns.org",
        "dyndns_enabled": False,
        "dyndns_password": "",
        "dyndns_service": 0,
        "dyndns_username": "",
        "embedded_tracker_port": 9000,
        "enable_coalesce_read_write": True,
        "enable_embedded_tracker": False,
        "enable_multi_connections_from_same_ip": False,
        "enable_os_cache": True,
        "enable_piece_extent_affinity": False,
        "enable_super_seeding": False,
        "enable_upload_suggestions": False,
        "encryption": 0,
        "export_dir": "",
        "export_dir_fin": "",
        "file_pool_size": 40,
        "incomplete_files_ext": False,
        "ip_filter_enabled": False,
        "ip_filter_path": "",
        "ip_filter_trackers": False,
        "limit_lan_peers": True,
        "limit_tcp_overhead": False,
        "limit_utp_rate": True,
        "listen_port": 31193,
        "locale": "en",
        "lsd": True,
        "mail_notification_auth_enabled": False,
        "mail_notification_email": "",
        "mail_notification_enabled": False,
        "mail_notification_password": "",
        "mail_notification_sender": "qBittorrentNotification@example.com",
        "mail_notification_smtp": "smtp.changeme.com",
        "mail_notification_ssl_enabled": False,
        "mail_notification_username": "",
        "max_active_downloads": cfg.qbittorrent.max_downloads,
        "max_active_torrents": 5,
        "max_active_uploads": 3,
        "max_connec": 500,
        "max_connec_per_torrent": 100,
        "max_ratio": -1,
        "max_ratio_act": 0,
        "max_ratio_enabled": False,
        "max_seeding_time": -1,
        "max_seeding_time_enabled": False,
        "max_uploads": -1,
        "max_uploads_per_torrent": -1,
        "outgoing_ports_max": 0,
        "outgoing_ports_min": 0,
        "pex": True,
        "preallocate_all": False,
        "proxy_auth_enabled": False,
        "proxy_ip": "0.0.0.0",
        "proxy_password": "",
        "proxy_peer_connections": False,
        "proxy_port": 8080,
        "proxy_torrents_only": False,
        "proxy_type": 0,
        "proxy_username": "",
        "queueing_enabled": False,
        "random_port": False,
        "recheck_completed_torrents": False,
        "resolve_peer_countries": True,
        "rss_auto_downloading_enabled": False,
        "rss_max_articles_per_feed": 50,
        "rss_processing_enabled": False,
        "rss_refresh_interval": 30,
        "save_path": save_path,
        "save_path_changed_tmm_enabled": False,
        "save_resume_data_interval": 60,
        "scan_dirs": {},
        "schedule_from_hour": 8,
        "schedule_from_min": 0,
        "schedule_to_hour": 20,
        "schedule_to_min": 0,
        "scheduler_days": 0,
        "scheduler_enabled": False,
        "send_buffer_low_watermark": 10,
        "send_buffer_watermark": 500,
        "send_buffer_watermark_factor": 50,
        "slow_torrent_dl_rate_threshold": 2,
        "slow_torrent_inactive_timer": 60,
        "slow_torrent_ul_rate_threshold": 2,
        "socket_backlog_size": 30,
        "start_paused_enabled": False,
        "stop_tracker_timeout": 1,
        "temp_path": os.path.join(save_path, "temp"),
        "temp_path_enabled": False,
        "torrent_changed_tmm_enabled": True,
        "up_limit": 0,
        "upload_choking_algorithm": 1,
        "upload_slots_behavior": 0,
        "upnp": True,
        "upnp_lease_duration": 0,
        "use_https": False,
        "utp_tcp_mixed_mode": 0,
        "web_ui_address": "*",
        "web_ui_ban_duration": 3600,
        "web_ui_clickjacking_protection_enabled": True,
        "web_ui_csrf_protection_enabled": True,
        "web_ui_domain_list": "*",
        "web_ui_host_header_validation_enabled": True,
        "web_ui_https_cert_path": "",
        "web_ui_https_key_path": "",
        "web_ui_max_auth_fail_count": 5,
        "web_ui_port": 8080,
        "web_ui_secure_cookie_enabled": True,
        "web_ui_session_timeout": 3600,
        "web_ui_upnp": False,
        "web_ui_username": cfg.qbittorrent.username or "",
        "web_ui_password": cfg.qbittorrent.password or "",
        "ssl_key": "",
        "ssl_cert": "",
        "rss_download_repack_proper_episodes": "",
        "rss_smart_episode_filters": "",
        "web_ui_use_custom_http_headers": False,
        "web_ui_use_custom_http_headers_enabled": False,
    }


@router.get("/app/buildInfo")
async def app_build_info():
    return {
        "bitness": 64,
        "boost": "1.75.0",
        "libtorrent": "1.2.11.0",
        "openssl": "1.1.1i",
        "qt": "5.15.2",
        "zlib": "1.2.11",
    }


@router.get("/app/shutdown", response_class=PlainTextResponse)
async def app_shutdown():
    return PlainTextResponse("Ok.")


@router.get("/transfer/info")
@router.post("/transfer/info")
async def transfer_info(request: Request, ctx: AppContext = Depends(get_ctx)):
    _require_qbit_auth(request, ctx, "")
    total_down = 0
    total_up = 0
    dl_speed = 0
    up_speed = 0
    for t in ctx.torrents.list():
        dl_speed += t.dlspeed
        total_down += int(t.size * t.progress)
    return {
        "dl_info_speed": dl_speed,
        "up_info_speed": up_speed,
        "dl_info_data": total_down,
        "up_info_data": total_up,
        "dl_rate_limit": -1,
        "up_rate_limit": -1,
        "dht_nodes": 0,
        "connection_status": "connected",
    }


@router.get("/sync/maindata")
@router.post("/sync/maindata")
async def sync_maindata(request: Request, ctx: AppContext = Depends(get_ctx)):
    _require_qbit_auth(request, ctx, "")
    now = int(time.time())
    torrents = {t.hash: _torrent_payload(t, now) for t in ctx.torrents.list()}
    cfg = ctx.config_manager.load()
    categories = {
        name: {"name": name, "savePath": os.path.join(cfg.qbittorrent.download_folder or "", name)}
        for name in cfg.qbittorrent.categories
    }
    tags = sorted({tag for t in ctx.torrents.list() for tag in t.tags})
    total_down = sum(int(t.size * t.progress) for t in ctx.torrents.list())
    total_up = 0
    dl_speed = sum(t.dlspeed for t in ctx.torrents.list())
    return {
        "rid": now,
        "full_update": True,
        "torrents": torrents,
        "torrents_removed": [],
        "categories": categories,
        "tags": tags,
        "server_state": {
            "alltime_dl": total_down,
            "alltime_ul": total_up,
            "global_ratio": 0,
            "dl_info_speed": dl_speed,
            "up_info_speed": 0,
            "dl_info_data": total_down,
            "up_info_data": total_up,
            "dl_rate_limit": -1,
            "up_rate_limit": -1,
            "dht_nodes": 0,
            "connection_status": "connected",
            "queueing": True,
            "use_alt_speed_limits": False,
            "free_space_on_disk": 0,
            "total_buffers_size": 0,
            "total_peer_connections": 0,
        },
    }
