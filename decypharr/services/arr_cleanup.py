from __future__ import annotations

import asyncio
import logging

from decypharr.services.context import AppContext


logger = logging.getLogger("decypharr.arr_cleanup")


def _queue_hashes(queue: list[dict]) -> set[str]:
    hashes: set[str] = set()
    for item in queue:
        if item.get("protocol") and item.get("protocol") != "torrent":
            continue
        download_id = item.get("downloadId") or item.get("downloadID") or item.get("download_id")
        if download_id:
            hashes.add(str(download_id).lower())
    return hashes


def remove_completed_from_decypharr(ctx: AppContext, arr) -> int:
    if not arr.name:
        return 0
    queue = arr.get_queue()
    queue_hashes = _queue_hashes(queue)
    to_remove: list[str] = []
    for torrent in ctx.torrents.list():
        if not torrent.category:
            continue
        if torrent.category.lower() != arr.name.lower():
            continue
        if not torrent.processed:
            continue
        if torrent.progress < 1.0:
            continue
        if torrent.hash.lower() in queue_hashes:
            continue
        to_remove.append(torrent.hash)
    if not to_remove:
        return 0
    return ctx.torrents.delete(to_remove)


async def poll_arr_cleanup(ctx: AppContext, interval: float = 10.0) -> None:
    while True:
        try:
            cfg = ctx.config_manager.load()
            ctx.arrs.refresh_from_config(cfg)
            arrs = ctx.arrs.get_all()
            for arr in arrs:
                if arr.cleanup:
                    try:
                        await asyncio.to_thread(arr.cleanup_queue)
                    except Exception:
                        continue
                if arr.auto_remove_completed:
                    try:
                        await asyncio.to_thread(remove_completed_from_decypharr, ctx, arr)
                    except Exception:
                        logger.exception("Failed to auto-remove completed torrents for %s", arr.name)
        finally:
            await asyncio.sleep(interval)
