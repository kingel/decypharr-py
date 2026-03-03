from __future__ import annotations

import json
import os
import shutil
import signal
import subprocess
import threading
import time
import logging
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, Optional

import httpx

from decypharr.config import Config, ConfigManager


@dataclass
class MountInfo:
    provider: str
    local_path: str
    webdav_url: str
    mounted: bool
    mounted_at: Optional[str] = None
    config_name: Optional[str] = None
    error: Optional[str] = None


class RcloneManager:
    def __init__(self, config_manager: ConfigManager) -> None:
        self._config_manager = config_manager
        self._process: Optional[subprocess.Popen[bytes]] = None
        self._rc_port = "5572"
        self._rclone_dir = Path(config_manager.base_path) / "rclone"
        self._mounts: Dict[str, MountInfo] = {}
        self._mounts_lock = threading.RLock()
        self._started = False
        self._ready = threading.Event()
        self._stop_event = threading.Event()
        self._http = httpx.Client(timeout=60.0)
        self._monitor_thread: Optional[threading.Thread] = None
        self._logger_lock = threading.Lock()
        self._logger = logging.getLogger("decypharr.rclone")

    def _log(self, level: str, message: str) -> None:
        with self._logger_lock:
            lowered = level.lower()
            if lowered in {"error", "err"}:
                self._logger.error(message)
            elif lowered in {"warn", "warning"}:
                self._logger.warning(message)
            else:
                self._logger.info(message)

    def start(self) -> None:
        cfg = self._config_manager.load()
        if not cfg.rclone.enabled:
            return
        if self._started:
            return
        self._started = True
        self._stop_event.clear()
        self._ready.clear()

        self._rc_port = cfg.rclone.rc_port or "5572"
        self._rclone_dir.mkdir(parents=True, exist_ok=True)
        log_dir = Path(self._config_manager.base_path) / "logs"
        log_dir.mkdir(parents=True, exist_ok=True)
        log_file = log_dir / "rclone.log"
        if log_file.exists():
            try:
                log_file.unlink()
            except Exception:
                pass

        args = [
            "rclone",
            "rcd",
            "--rc-addr",
            f":{self._rc_port}",
            "--rc-no-auth",
            "--config",
            str(self._rclone_dir / "rclone.conf"),
            "--log-file",
            str(log_file),
        ]
        log_level = (cfg.rclone.log_level or "").upper()
        if log_level not in {"DEBUG", "INFO", "NOTICE", "ERROR"}:
            log_level = "INFO"
        args.extend(["--log-level", log_level])

        if cfg.rclone.cache_dir:
            try:
                Path(cfg.rclone.cache_dir).mkdir(parents=True, exist_ok=True)
                args.extend(["--cache-dir", cfg.rclone.cache_dir])
            except Exception:
                pass

        try:
            self._process = subprocess.Popen(
                args,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
            )
        except Exception as exc:
            self._started = False
            self._log("error", f"failed to start rclone RC server: {exc}")
            return

        threading.Thread(target=self._wait_for_server, daemon=True).start()

    def stop(self) -> None:
        if not self._started:
            return
        self._stop_event.set()
        self.unmount_all()
        proc = self._process
        if proc:
            try:
                proc.send_signal(signal.SIGINT)
            except Exception:
                try:
                    proc.terminate()
                except Exception:
                    pass
            try:
                proc.wait(timeout=2)
            except Exception:
                try:
                    proc.kill()
                except Exception:
                    pass
                try:
                    proc.wait(timeout=5)
                except Exception:
                    pass
        self._process = None
        self._started = False
        self._ready.clear()

    def _wait_for_server(self) -> None:
        for _ in range(30):
            if self._stop_event.is_set():
                return
            if self._ping():
                self._ready.set()
                self._log("info", "rclone RC server is ready")
                self._monitor_thread = threading.Thread(target=self._monitor_mounts, daemon=True)
                self._monitor_thread.start()
                return
            time.sleep(1)
        self._log("error", "rclone RC server not responding")

    def _ping(self) -> bool:
        try:
            self._request("core/version", {})
            return True
        except Exception:
            return False

    def is_ready(self) -> bool:
        return self._ready.is_set()

    def wait_ready(self, timeout: float = 30.0) -> bool:
        return self._ready.wait(timeout=timeout)

    def _request(self, command: str, args: Dict[str, Any], close: bool = True) -> httpx.Response:
        url = f"http://localhost:{self._rc_port}/{command}"
        resp = self._http.post(url, json=args)
        if resp.status_code != 200:
            try:
                data = resp.json()
                if isinstance(data, dict) and data.get("error"):
                    raise RuntimeError(data["error"])
            except Exception:
                pass
            raise RuntimeError(f"rclone RC error: HTTP {resp.status_code}")
        return resp

    def create_config(self, provider: str, webdav_url: str) -> None:
        args = {
            "name": provider,
            "type": "webdav",
            "parameters": {
                "url": webdav_url,
                "vendor": "other",
                "pacer_min_sleep": "0",
            },
        }
        self._request("config/create", args)

    def mount(self, provider: str, mount_path: str, webdav_url: str, cfg: Config) -> None:
        if not self.is_ready():
            if not self.wait_ready(30):
                raise RuntimeError("rclone RC server not ready")

        if os.name != "nt":
            Path(mount_path).mkdir(parents=True, exist_ok=True)
        else:
            try:
                os.remove(mount_path)
            except Exception:
                pass

        with self._mounts_lock:
            existing = self._mounts.get(provider)
            if existing and existing.mounted:
                return

        if existing and not existing.mounted:
            self._force_unmount_path(mount_path)

        self.create_config(provider, webdav_url)

        mount_args: Dict[str, Any] = {
            "fs": f"{provider}:",
            "mountPoint": mount_path,
        }
        mount_opt: Dict[str, Any] = {
            "AllowNonEmpty": True,
            "AllowOther": True,
            "DebugFUSE": False,
            "DeviceName": f"decypharr-{provider}",
            "VolumeName": f"decypharr-{provider}",
        }
        if cfg.rclone.async_read is not None:
            mount_opt["AsyncRead"] = cfg.rclone.async_read
        if cfg.rclone.use_mmap:
            mount_opt["UseMmap"] = cfg.rclone.use_mmap
        if cfg.rclone.transfers:
            mount_opt["Transfers"] = cfg.rclone.transfers

        config_opts: Dict[str, Any] = {}
        if cfg.rclone.buffer_size:
            config_opts["BufferSize"] = cfg.rclone.buffer_size
        if cfg.rclone.bw_limit:
            config_opts["BwLimit"] = cfg.rclone.bw_limit
        if config_opts:
            mount_args["_config"] = config_opts

        vfs_opt: Dict[str, Any] = {
            "CacheMode": cfg.rclone.vfs_cache_mode or "off",
            "DirCacheTime": _duration_to_ns(cfg.rclone.dir_cache_time or "5m"),
            "PollInterval": 0,
        }
        if cfg.rclone.vfs_cache_mode and cfg.rclone.vfs_cache_mode != "off":
            if cfg.rclone.vfs_cache_max_age:
                vfs_opt["CacheMaxAge"] = _duration_to_ns(cfg.rclone.vfs_cache_max_age)
            if cfg.rclone.vfs_disk_space_total:
                vfs_opt["DiskSpaceTotalSize"] = cfg.rclone.vfs_disk_space_total
            if cfg.rclone.vfs_read_chunk_size_limit:
                vfs_opt["ChunkSizeLimit"] = cfg.rclone.vfs_read_chunk_size_limit
            if cfg.rclone.vfs_cache_max_size:
                vfs_opt["CacheMaxSize"] = cfg.rclone.vfs_cache_max_size
            if cfg.rclone.vfs_cache_poll_interval:
                vfs_opt["CachePollInterval"] = _duration_to_ns(cfg.rclone.vfs_cache_poll_interval)
            if cfg.rclone.vfs_read_chunk_size:
                vfs_opt["ChunkSize"] = cfg.rclone.vfs_read_chunk_size
            if cfg.rclone.vfs_read_ahead:
                vfs_opt["ReadAhead"] = cfg.rclone.vfs_read_ahead
            if cfg.rclone.vfs_cache_min_free_space:
                vfs_opt["CacheMinFreeSpace"] = cfg.rclone.vfs_cache_min_free_space
            if cfg.rclone.vfs_fast_fingerprint:
                vfs_opt["FastFingerprint"] = cfg.rclone.vfs_fast_fingerprint
            if cfg.rclone.vfs_read_chunk_streams:
                vfs_opt["ChunkStreams"] = cfg.rclone.vfs_read_chunk_streams
            if cfg.rclone.no_checksum:
                vfs_opt["NoChecksum"] = cfg.rclone.no_checksum
            if cfg.rclone.no_modtime:
                vfs_opt["NoModTime"] = cfg.rclone.no_modtime

        if cfg.rclone.uid:
            vfs_opt["UID"] = cfg.rclone.uid
        if cfg.rclone.gid:
            vfs_opt["GID"] = cfg.rclone.gid
        if cfg.rclone.umask:
            try:
                vfs_opt["Umask"] = int(cfg.rclone.umask, 8)
            except Exception:
                pass
        if cfg.rclone.attr_timeout:
            mount_opt["AttrTimeout"] = _duration_to_ns(cfg.rclone.attr_timeout)

        mount_args["vfsOpt"] = vfs_opt
        mount_args["mountOpt"] = mount_opt

        self._request("mount/mount", mount_args)

        info = MountInfo(
            provider=provider,
            local_path=mount_path,
            webdav_url=webdav_url,
            mounted=True,
            mounted_at=datetime.utcnow().isoformat(),
            config_name=provider,
        )
        with self._mounts_lock:
            self._mounts[provider] = info

    def unmount(self, provider: str) -> None:
        with self._mounts_lock:
            mount_info = self._mounts.get(provider)
        if not mount_info or not mount_info.mounted:
            return

        rc_err = None
        try:
            self._request("mount/unmount", {"mountPoint": mount_info.local_path})
        except Exception as exc:
            rc_err = exc
            self._force_unmount_path(mount_info.local_path)

        with self._mounts_lock:
            info = self._mounts.get(provider)
            if info:
                info.mounted = False
                info.error = str(rc_err) if rc_err else ""

    def unmount_all(self) -> None:
        with self._mounts_lock:
            providers = [p for p, m in self._mounts.items() if m.mounted]
        for provider in providers:
            self.unmount(provider)

    def refresh_dir(self, provider: str, dirs: list[str]) -> None:
        if not self.is_ready():
            raise RuntimeError("rclone RC server not ready")
        if not dirs:
            dirs = ["/"]
        args: Dict[str, Any] = {"fs": f"{provider}:"}
        for idx, directory in enumerate(dirs):
            if not directory:
                continue
            key = "dir" if idx == 0 else f"dir{idx + 1}"
            args[key] = directory
        self._request("vfs/forget", args)
        self._request("vfs/refresh", args)

    def get_mounts(self) -> Dict[str, Dict[str, Any]]:
        with self._mounts_lock:
            return {k: vars(v) for k, v in self._mounts.items()}

    def get_stats(self) -> Dict[str, Any]:
        stats: Dict[str, Any] = {
            "enabled": True,
            "server_ready": self.is_ready(),
        }
        if not self.is_ready():
            stats["mounts"] = self.get_mounts()
            return stats
        for cmd, key in (
            ("core/version", "version"),
            ("core/stats", "core"),
            ("core/memstats", "memory"),
            ("core/bwlimit", "bandwidth"),
        ):
            try:
                resp = self._request(cmd, {}, close=False)
                stats[key] = resp.json()
                resp.close()
            except Exception:
                pass
        stats["mounts"] = self.get_mounts()
        return stats

    def _check_mount_health(self, provider: str) -> bool:
        try:
            self._request("operations/list", {"fs": f"{provider}:", "remote": ""})
            return True
        except Exception:
            return False

    def _recover_mount(self, provider: str, cfg: Config, webdav_url: str, mount_path: str) -> None:
        try:
            self.unmount(provider)
        except Exception:
            pass
        time.sleep(1)
        try:
            self.mount(provider, mount_path, webdav_url, cfg)
        except Exception as exc:
            self._log("error", f"failed to recover mount {provider}: {exc}")

    def _monitor_mounts(self) -> None:
        while not self._stop_event.is_set():
            if not self.is_ready():
                time.sleep(30)
                continue
            with self._mounts_lock:
                providers = [p for p, m in self._mounts.items() if m.mounted]
            cfg = self._config_manager.load()
            webdav_url = build_webdav_url(cfg)
            for provider in providers:
                if not self._check_mount_health(provider):
                    with self._mounts_lock:
                        info = self._mounts.get(provider)
                        if info:
                            info.error = "Health check failed"
                            info.mounted = False
                            mount_path = info.local_path
                        else:
                            mount_path = None
                    if mount_path:
                        threading.Thread(
                            target=self._recover_mount,
                            args=(provider, cfg, webdav_url, mount_path),
                            daemon=True,
                        ).start()
            time.sleep(30)

    def sync_mounts(self, cfg: Optional[Config] = None) -> None:
        cfg = cfg or self._config_manager.load()
        if not cfg.rclone.enabled:
            return
        webdav_url = build_webdav_url(cfg)
        desired = {}
        for debrid in cfg.debrids:
            if not debrid.name or not debrid.use_webdav:
                continue
            if debrid.rclone_mount_path:
                mount_path = debrid.rclone_mount_path
            else:
                mount_path = os.path.join(cfg.rclone.mount_path or "", debrid.name)
            folder = (debrid.folder or "").rstrip("/")
            remote_suffix = ""
            if mount_path.rstrip("/").endswith("/__all__") or folder.endswith("/__all__"):
                if not mount_path.rstrip("/").endswith("/__all__"):
                    mount_path = os.path.join(mount_path, "__all__")
                remote_suffix = "/__all__"
            provider_url = f"{webdav_url}/{debrid.name}{remote_suffix}"
            desired[debrid.name] = (mount_path, provider_url)

        with self._mounts_lock:
            current = set(self._mounts.keys())
        for provider in current - set(desired.keys()):
            try:
                self.unmount(provider)
            except Exception:
                pass
        for provider, (mount_path, url) in desired.items():
            try:
                self.mount(provider, mount_path, url, cfg)
            except Exception as exc:
                self._log("error", f"failed to mount {provider}: {exc}")


def build_webdav_url(cfg: Config) -> str:
    host = cfg.bind_address or "localhost"
    if host in {"0.0.0.0", "::"}:
        host = "localhost"
    base = cfg.url_base.rstrip("/")
    if base == "/":
        base = ""
    return f"http://{host}:{cfg.port}{base}/webdav"


def _duration_to_ns(value: str | None) -> int:
    if not value:
        return 0
    raw = str(value).strip().lower()
    if not raw or raw == "off":
        return 0
    multipliers = {"s": 1, "m": 60, "h": 3600, "d": 86400}
    try:
        if raw[-1] in multipliers:
            seconds = float(raw[:-1]) * multipliers[raw[-1]]
        else:
            seconds = float(raw)
    except ValueError:
        return 0
    return int(seconds * 1_000_000_000)
