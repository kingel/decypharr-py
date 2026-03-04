from __future__ import annotations

import gc
import os
import platform
import resource
import threading
import asyncio
import os
import shutil
import time
from datetime import datetime
from pathlib import Path
from typing import List

from fastapi import APIRouter, Depends, Request
from fastapi.responses import PlainTextResponse

from decypharr.services.context import AppContext


router = APIRouter()


_CPU_SAMPLE = {"total": None, "busy": None, "ts": None}


def get_ctx(request: Request) -> AppContext:
    return request.app.state.ctx


def _log_file(base_path: Path, name: str) -> Path:
    return base_path / "logs" / name


def _count_async_tasks() -> int:
    try:
        return len(asyncio.all_tasks())
    except Exception:
        return 0


def _gc_cycles() -> int:
    try:
        stats = gc.get_stats()
        return sum(gen.get("collections", 0) for gen in stats)
    except Exception:
        return sum(gc.get_count())


def _read_proc_stat() -> tuple[int, int]:
    with open("/proc/stat", "r", encoding="utf-8") as handle:
        line = handle.readline()
    parts = line.strip().split()
    if not parts or parts[0] != "cpu":
        return 0, 0
    values = [int(v) for v in parts[1:]]
    total = sum(values)
    idle = values[3] if len(values) > 3 else 0
    iowait = values[4] if len(values) > 4 else 0
    busy = total - idle - iowait
    return total, busy


def _cpu_percent() -> float:
    try:
        sys_total, sys_busy = _read_proc_stat()
        now = time.time()
    except Exception:
        return 0.0
    prev_total = _CPU_SAMPLE["total"]
    prev_busy = _CPU_SAMPLE["busy"]
    _CPU_SAMPLE["total"] = sys_total
    _CPU_SAMPLE["busy"] = sys_busy
    _CPU_SAMPLE["ts"] = now
    if prev_total is None or prev_busy is None:
        return 0.0
    delta_total = sys_total - prev_total
    delta_busy = sys_busy - prev_busy
    if delta_total <= 0:
        return 0.0
    percent = (delta_busy / delta_total) * 100.0
    return max(0.0, min(100.0, percent))


def _disk_usage(path: Path) -> dict:
    try:
        usage = shutil.disk_usage(path)
        return {"path": str(path), "total": usage.total, "used": usage.used, "free": usage.free}
    except Exception:
        return {"path": str(path), "total": 0, "used": 0, "free": 0}


def _read_cgroup_value(path: str) -> Optional[str]:
    try:
        with open(path, "r", encoding="utf-8") as handle:
            return handle.read().strip()
    except Exception:
        return None


def _container_limits() -> dict:
    memory_limit = None
    cpu_limit = None
    value = _read_cgroup_value("/sys/fs/cgroup/memory.max")
    if value and value != "max":
        try:
            memory_limit = int(value)
        except Exception:
            memory_limit = None
    if memory_limit is None:
        value = _read_cgroup_value("/sys/fs/cgroup/memory/memory.limit_in_bytes")
        if value:
            try:
                limit = int(value)
                if limit < (1 << 60):
                    memory_limit = limit
            except Exception:
                memory_limit = None
    cpu_max = _read_cgroup_value("/sys/fs/cgroup/cpu.max")
    if cpu_max:
        parts = cpu_max.split()
        if len(parts) >= 2 and parts[0] != "max":
            try:
                quota = float(parts[0])
                period = float(parts[1])
                if period > 0:
                    cpu_limit = quota / period
            except Exception:
                cpu_limit = None
    if cpu_limit is None:
        quota = _read_cgroup_value("/sys/fs/cgroup/cpu/cpu.cfs_quota_us")
        period = _read_cgroup_value("/sys/fs/cgroup/cpu/cpu.cfs_period_us")
        if quota and period:
            try:
                quota_val = float(quota)
                period_val = float(period)
                if quota_val > 0 and period_val > 0:
                    cpu_limit = quota_val / period_val
            except Exception:
                cpu_limit = None
    return {
        "memory_limit": memory_limit,
        "cpu_limit": cpu_limit,
    }


@router.get("/stats")
async def stats(ctx: AppContext = Depends(get_ctx)):
    usage = resource.getrusage(resource.RUSAGE_SELF)
    memory_mb = usage.ru_maxrss / 1024.0
    runtime_version = f"Python {platform.python_version()}"
    debrid_profiles = []
    for name, entry in ctx.debrids.entries().items():
        profile = None
        status = "error"
        error = None
        library = {"total": 0, "bad": 0, "active_links": 0, "total_bytes": 0, "files": 0}
        try:
            profile = entry.client.get_profile()
            status = "ok"
        except Exception as exc:
            error = str(exc)
            profile = None
        cache = ctx.debrids.cache(name)
        if cache:
            try:
                torrents = cache.list_torrents()
                library["total"] = len(torrents)
                library["bad"] = sum(1 for t in torrents if cache.is_bad(t))
                for torrent in torrents:
                    if torrent.bytes:
                        library["total_bytes"] += int(torrent.bytes)
                    if torrent.files:
                        library["files"] += len(torrent.files)
                        library["active_links"] += sum(1 for f in torrent.files.values() if f.link)
            except Exception:
                pass
        debrid_profiles.append(
            {
                "service": name,
                "status": status,
                "checked_at": datetime.utcnow().isoformat() + "Z",
                "error": error,
                "profile": {
                    "name": profile.name if profile else name,
                    "username": profile.username if profile else "",
                    "type": profile.type if profile else "",
                    "points": profile.points if profile else 0,
                    "expiration": profile.expiration.isoformat() if profile and profile.expiration else None,
                },
                "library": library,
                "accounts": [],
            }
        )
    stats = {
        "memory_used": f"{memory_mb:.1f} MB",
        "heap_alloc_mb": f"{memory_mb:.1f} MB",
        "total_alloc_mb": f"{memory_mb:.1f} MB",
        "goroutines": threading.active_count(),
        "async_tasks": _count_async_tasks(),
        "cpu_percent": _cpu_percent(),
        "gc_cycles": _gc_cycles(),
        "num_cpu": os.cpu_count() or 0,
        "arch": platform.machine(),
        "os": platform.system(),
        "runtime_version": runtime_version,
        "go_version": runtime_version,
        "load_avg": os.getloadavg() if hasattr(os, "getloadavg") else None,
        "disk": {
            "root": _disk_usage(Path("/")),
            "data": _disk_usage(Path(ctx.config_manager.base_path)),
        },
        "limits": _container_limits(),
        "debrids": debrid_profiles,
    }
    cfg = ctx.config_manager.load()
    if cfg.rclone.enabled and ctx.rclone:
        try:
            stats["rclone"] = ctx.rclone.get_stats()
        except Exception:
            stats["rclone"] = {"enabled": True, "server_ready": False}
    else:
        stats["rclone"] = {"enabled": False, "server_ready": False}
    return stats


@router.get("/logs", response_class=PlainTextResponse)
async def logs(ctx: AppContext = Depends(get_ctx)):
    path = _log_file(Path(ctx.config_manager.load().path or "."), "decypharr.log")
    if path.exists():
        return path.read_text()
    return "No logs available."


@router.get("/logs/rclone", response_class=PlainTextResponse)
async def rclone_logs(ctx: AppContext = Depends(get_ctx)):
    path = _log_file(Path(ctx.config_manager.load().path or "."), "rclone.log")
    if path.exists():
        return path.read_text()
    return "No rclone logs available."


@router.get("/ingests")
async def ingests():
    return []


@router.get("/ingests/{debrid}")
async def ingests_by_debrid(debrid: str):
    return []
