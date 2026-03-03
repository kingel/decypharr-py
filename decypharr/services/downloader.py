from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
import os

import httpx

from decypharr.config import Config
from decypharr.debrid.cache import DebridCache
from decypharr.debrid.models import DebridTorrent
from decypharr.storage.torrents import Torrent


@dataclass
class DownloadResult:
    content_path: str
    processed: bool


def _resolve_mount(config: Config, debrid: str) -> str:
    for entry in config.debrids:
        if entry.name == debrid:
            return entry.rclone_mount_path or entry.folder or ""
    return ""


def _resolve_save_path(config: Config, torrent: Torrent) -> str:
    base = torrent.save_path or config.qbittorrent.download_folder or ""
    if torrent.category:
        tail = os.path.basename(base.rstrip(os.path.sep))
        if tail != torrent.category:
            base = os.path.join(base, torrent.category)
    return base


def _symlink(src: str, dest: str) -> None:
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    if os.path.islink(dest) or os.path.exists(dest):
        return
    os.symlink(src, dest)


def _download_file(url: str, dest: str) -> None:
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    with httpx.stream("GET", url, timeout=None) as resp:
        resp.raise_for_status()
        with open(dest, "wb") as f:
            for chunk in resp.iter_bytes():
                if not chunk:
                    continue
                f.write(chunk)


def _ensure_real_dir(path: Path) -> None:
    if path.is_symlink():
        path.unlink()
    path.mkdir(parents=True, exist_ok=True)


def _symlink_tree(src_root: str, dest_root: str, files: Iterable[DebridFile]) -> None:
    os.makedirs(dest_root, exist_ok=True)
    for file in files:
        rel = (file.name or "").lstrip("/\\")
        if not rel:
            continue
        src = os.path.join(src_root, rel)
        dest = os.path.join(dest_root, rel)
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        if os.path.islink(dest) or os.path.exists(dest):
            continue
        os.symlink(src, dest)


def _single_file_name(remote: DebridTorrent) -> str | None:
    if len(remote.files) != 1:
        return None
    file = next(iter(remote.files.values()), None)
    if not file or not file.name:
        return None
    return file.name.lstrip("/\\")


def build_content_path(config: Config, cache: DebridCache, torrent: Torrent, remote: DebridTorrent) -> str:
    save_root = _resolve_save_path(config, torrent)
    if not save_root:
        return ""
    folder_name = cache.folder_name(remote)
    dest = os.path.join(save_root, folder_name)
    single_name = _single_file_name(remote)
    if single_name:
        return os.path.join(dest, single_name)
    return dest


def ensure_symlinked(config: Config, cache: DebridCache, torrent: Torrent, remote: DebridTorrent) -> None:
    mount = _resolve_mount(config, torrent.debrid or "")
    if not mount:
        return
    save_root = _resolve_save_path(config, torrent)
    if not save_root:
        return
    folder_name = cache.folder_name(remote)
    src_root = os.path.join(mount, folder_name)
    dest_root = os.path.join(save_root, folder_name)
    if os.path.islink(dest_root):
        try:
            os.unlink(dest_root)
        except FileNotFoundError:
            pass
    if remote.files:
        _symlink_tree(src_root, dest_root, remote.files.values())
        return
    _symlink(src_root, dest_root)


def process_completed(
    config: Config,
    cache: DebridCache,
    torrent: Torrent,
    remote: DebridTorrent,
) -> DownloadResult | None:
    if torrent.processed:
        return None
    action = (torrent.action or "symlink").lower()
    save_root = _resolve_save_path(config, torrent)
    if not save_root:
        return None
    folder_name = cache.folder_name(remote)
    if action == "none":
        return DownloadResult(content_path="", processed=True)
    if action == "symlink":
        ensure_symlinked(config, cache, torrent, remote)
        return DownloadResult(content_path=build_content_path(config, cache, torrent, remote), processed=True)
    if action == "download":
        dest_dir = Path(save_root) / folder_name
        _ensure_real_dir(dest_dir)
        for file in remote.files.values():
            url = cache.get_download_url(file)
            if not url or not (url.startswith("http://") or url.startswith("https://")):
                continue
            dest_path = dest_dir / file.name
            if dest_path.is_absolute():
                try:
                    relative = dest_path.relative_to(dest_dir)
                except ValueError:
                    relative = Path(dest_path.name)
            else:
                relative = dest_path
            current = dest_dir
            for part in relative.parts[:-1]:
                current = current / part
                _ensure_real_dir(current)
            _download_file(url, str(dest_path))
        return DownloadResult(content_path=build_content_path(config, cache, torrent, remote), processed=True)
    return None
