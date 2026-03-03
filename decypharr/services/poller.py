from __future__ import annotations

import asyncio
import os
import logging
from datetime import datetime
from typing import Optional

from decypharr.services.context import AppContext
from decypharr.services.callbacks import send_callback
from decypharr.services.downloader import build_content_path, ensure_symlinked, process_completed


logger = logging.getLogger("decypharr.poller")
from decypharr.torrent_utils import map_debrid_status


def _normalize_progress(progress: Optional[float]) -> float:
    if progress is None:
        return 0.0
    # Real-Debrid reports 0-100
    value = progress / 100.0 if progress > 1 else progress
    if value < 0:
        return 0.0
    if value > 1:
        return 1.0
    return value


async def poll_debrid(ctx: AppContext, interval: float | None = None) -> None:
    while True:
        try:
            entries = ctx.debrids.entries()
            for torrent in ctx.torrents.list():
                if not torrent.debrid or not torrent.id:
                    continue
                entry = entries.get(torrent.debrid)
                if not entry:
                    continue
                try:
                    remote = entry.client.get_torrent(torrent.id)
                    updates = {
                        "name": remote.name or torrent.name,
                        "state": map_debrid_status(remote.status),
                        "progress": _normalize_progress(getattr(remote, "progress", None)),
                        "size": getattr(remote, "bytes", None) or torrent.size,
                        "dlspeed": getattr(remote, "speed", None) or torrent.dlspeed,
                        "num_seeds": getattr(remote, "seeders", None) or torrent.num_seeds,
                    }
                    ctx.torrents.update(torrent.hash, **updates)
                    status = (remote.status or "").lower()
                    if status in ("downloaded", "completed") and not torrent.processed:
                        cache = ctx.debrids.cache(torrent.debrid or "")
                        if cache:
                            try:
                                result = process_completed(ctx.config_manager.load(), cache, torrent, remote)
                            except Exception:
                                logger.exception("Failed to process completed torrent %s", torrent.hash)
                                result = None
                            if result and result.processed:
                                ctx.torrents.update(
                                    torrent.hash,
                                    processed=True,
                                    content_path=result.content_path,
                                )
                                updated_torrent = ctx.torrents.get(torrent.hash) or torrent
                                # Notify Arr on completion
                                arr = ctx.arrs.get(torrent.category)
                                if arr:
                                    try:
                                        arr.refresh()
                                    except Exception:
                                        pass
                                # Callback hook
                                callback_url = torrent.callback_url or ctx.config_manager.load().callback_url
                                if callback_url:
                                    send_callback(
                                        callback_url,
                                        {
                                            "status": "completed",
                                            "completedAt": datetime.utcnow().isoformat(),
                                            "torrent": updated_torrent.model_dump(mode="json"),
                                            "debrid": remote,
                                            "category": updated_torrent.category,
                                            "contentPath": updated_torrent.content_path or updated_torrent.save_path or "",
                                            "action": updated_torrent.action,
                                        },
                                    )
                                    ctx.torrents.update(torrent.hash, callback_status="completed")
                    if status in ("downloaded", "completed"):
                        cache = ctx.debrids.cache(torrent.debrid or "")
                        if cache:
                            expected_path = build_content_path(ctx.config_manager.load(), cache, torrent, remote)
                            if expected_path and expected_path != (torrent.content_path or ""):
                                ctx.torrents.update(torrent.hash, content_path=expected_path)
                            if torrent.action == "symlink" and expected_path:
                                folder_name = cache.folder_name(remote)
                                save_root = ctx.config_manager.load().qbittorrent.download_folder or torrent.save_path or ""
                                if torrent.category:
                                    tail = os.path.basename(save_root.rstrip(os.path.sep))
                                    if tail != torrent.category:
                                        save_root = os.path.join(save_root, torrent.category)
                                dest_root = os.path.join(save_root, folder_name) if save_root else ""
                                if not os.path.exists(expected_path) or (dest_root and os.path.islink(dest_root)):
                                    ensure_symlinked(ctx.config_manager.load(), cache, torrent, remote)
                    if status in ("error", "virus", "dead", "magnet_error"):
                        callback_url = torrent.callback_url or ctx.config_manager.load().callback_url
                        if callback_url and torrent.callback_status != "failed":
                            send_callback(
                                callback_url,
                                {
                                    "status": "failed",
                                    "completedAt": datetime.utcnow().isoformat(),
                                    "error": remote.status,
                                    "torrent": torrent.model_dump(mode="json"),
                                    "debrid": remote,
                                    "category": torrent.category,
                                    "contentPath": torrent.content_path or torrent.save_path or "",
                                    "action": torrent.action,
                                },
                            )
                            ctx.torrents.update(torrent.hash, callback_status="failed")
                except Exception:
                    logger.exception("Poller failed for torrent %s", torrent.hash)
                    continue
        finally:
            sleep_for = interval
            if sleep_for is None:
                sleep_for = max(5, ctx.config_manager.load().debrid_poll_interval)
            await asyncio.sleep(sleep_for)
