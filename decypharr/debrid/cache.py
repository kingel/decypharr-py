from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta
import os
import re
from typing import Dict, List, Optional, Tuple

import httpx

from decypharr.torrent_utils import construct_magnet

from decypharr.debrid.base import DebridClient
from decypharr.debrid.models import DebridFile, DebridTorrent, DownloadLink


def _parse_size(value: str) -> int:
    value = value.strip().lower()
    if not value:
        return 0
    multipliers = {"k": 1024, "m": 1024**2, "g": 1024**3, "t": 1024**4}
    if value[-1] in multipliers:
        return int(float(value[:-1]) * multipliers[value[-1]])
    return int(value)


def _parse_duration(value: str) -> timedelta:
    value = value.strip().lower()
    if not value:
        return timedelta(0)
    multipliers = {"s": 1, "m": 60, "h": 3600, "d": 86400}
    if value[-1] in multipliers:
        return timedelta(seconds=float(value[:-1]) * multipliers[value[-1]])
    return timedelta(seconds=float(value))


@dataclass
class CachedTorrent:
    torrent: DebridTorrent
    last_refresh: datetime


class DebridCache:
    def __init__(
        self,
        client: DebridClient,
        ttl: timedelta = timedelta(minutes=10),
        folder_naming: str = "original_no_ext",
        directories: Optional[dict] = None,
    ) -> None:
        self.client = client
        self.ttl = ttl
        self.folder_naming = folder_naming
        self.directories = directories or {}
        self._torrents: Dict[str, CachedTorrent] = {}
        self._folder_index: Dict[str, List[str]] = {}
        self._download_links: Dict[str, DownloadLink] = {}
        self._last_list_refresh: Optional[datetime] = None
        self.bad_wait_threshold = timedelta(hours=12)
        self._reinsert_inflight: Dict[str, bool] = {}

    def list_torrents(self) -> List[DebridTorrent]:
        self._ensure_list_fresh()
        return [ct.torrent for ct in self._torrents.values()]

    def sorted_torrents(self) -> List[DebridTorrent]:
        self._ensure_list_fresh()
        torrents = [ct.torrent for ct in self._torrents.values()]
        return sorted(
            torrents,
            key=lambda torrent: (
                self._folder_name(torrent),
                torrent.added or datetime.min,
            ),
        )

    def folder_names(self) -> List[str]:
        self._ensure_list_fresh()
        return list(self._folder_index.keys())

    def torrents_for_folder(self, name: str) -> List[DebridTorrent]:
        self._ensure_list_fresh()
        ids = self._folder_index.get(name, [])
        return [self._torrents[t_id].torrent for t_id in ids if t_id in self._torrents]

    def get_torrent_by_name(self, name: str) -> Optional[DebridTorrent]:
        torrents = self.torrents_for_folder(name)
        return torrents[0] if torrents else None

    def get_torrent_by_id(self, torrent_id: str) -> Optional[DebridTorrent]:
        cached = self._torrents.get(torrent_id)
        return cached.torrent if cached else None

    def get_files_for_folder(self, folder_name: str) -> Dict[str, DebridFile]:
        files: Dict[str, DebridFile] = {}
        for torrent in self.torrents_for_folder(folder_name):
            cached = self._torrents.get(torrent.id)
            if cached and cached.torrent.files:
                merged = cached.torrent.files
            else:
                refreshed = self._refresh_torrent(torrent.id)
                merged = refreshed.files if refreshed else {}
            for name, file in merged.items():
                existing = files.get(name)
                if not existing:
                    files[name] = file
                else:
                    # Prefer the file from the newest torrent if possible
                    existing_added = self._torrents.get(existing.torrent_id or "", None)
                    current_added = self._torrents.get(file.torrent_id or "", None)
                    if current_added and existing_added:
                        if current_added.torrent.added and existing_added.torrent.added:
                            if current_added.torrent.added > existing_added.torrent.added:
                                files[name] = file
        return files

    def get_download_url(self, file: DebridFile) -> str:
        cached = self._download_links.get(file.link)
        if cached and cached.is_valid() and cached.download_url and cached.download_url.startswith(("http://", "https://")):
            return cached.download_url
        link = self.client.unrestrict_link(file.link)
        self._download_links[file.link] = link
        return link.download_url

    def _ensure_list_fresh(self) -> None:
        if self._last_list_refresh and datetime.utcnow() - self._last_list_refresh < self.ttl:
            return
        torrents = self.client.list_torrents()
        self._torrents.clear()
        self._folder_index.clear()
        for torrent in torrents:
            folder_name = self._folder_name(torrent)
            self._torrents[torrent.id] = CachedTorrent(torrent=torrent, last_refresh=datetime.utcnow())
            self._folder_index.setdefault(folder_name, []).append(torrent.id)
        self._last_list_refresh = datetime.utcnow()

    def _refresh_torrent(self, torrent_id: str) -> Optional[DebridTorrent]:
        torrent = self.client.get_torrent(torrent_id)
        self._torrents[torrent_id] = CachedTorrent(torrent=torrent, last_refresh=datetime.utcnow())
        return torrent

    def get_broken_files(
        self,
        torrent: DebridTorrent,
        filenames: List[str],
        strategy: str = "per_torrent",
        reinsert: bool = True,
    ) -> Optional[List[str]]:
        files = torrent.files
        if filenames:
            files = {name: f for name, f in torrent.files.items() if name in filenames}
        if not files:
            return []
        # Refresh if any link is missing
        if any(not f.link for f in files.values()):
            refreshed = self._refresh_torrent(torrent.id)
            if refreshed:
                torrent = refreshed
                files = torrent.files if not filenames else {name: f for name, f in torrent.files.items() if name in filenames}
        broken: List[str] = []
        for name, f in files.items():
            if not f.link:
                broken.append(name)
                continue
            if not self._check_link(f.link):
                broken.append(name)
        if strategy == "per_torrent" and broken:
            broken = list(files.keys())
        if broken and reinsert:
            if self._reinsert_torrent(torrent):
                return None
        return broken

    def _check_link(self, link: str) -> bool:
        if link.startswith("torbox://"):
            return True
        try:
            resp = httpx.head(link, timeout=10.0, follow_redirects=True)
        except Exception:
            return False
        return 200 <= resp.status_code < 400

    def _reinsert_torrent(self, torrent: DebridTorrent) -> bool:
        info_hash = torrent.info_hash
        if not info_hash:
            return False
        if self._reinsert_inflight.get(torrent.id):
            return False
        self._reinsert_inflight[torrent.id] = True
        try:
            magnet = construct_magnet(info_hash, torrent.name)
            new_torrent = self.client.submit_magnet(magnet)
            if not new_torrent or not new_torrent.id:
                return False
            if not new_torrent.files:
                new_torrent = self.client.get_torrent(new_torrent.id)
            if not new_torrent.files or any(not f.link for f in new_torrent.files.values()):
                return False
            try:
                self.client.delete_torrent(torrent.id)
            except Exception:
                pass
            self._torrents.pop(torrent.id, None)
            self._torrents[new_torrent.id] = CachedTorrent(
                torrent=new_torrent,
                last_refresh=datetime.utcnow(),
            )
            if new_torrent.status == "downloaded":
                folder = self._folder_name(new_torrent)
                self._folder_index.setdefault(folder, []).append(new_torrent.id)
            return True
        finally:
            self._reinsert_inflight.pop(torrent.id, None)

    def _folder_name(self, torrent: DebridTorrent) -> str:
        name = torrent.name
        original = torrent.original_name or torrent.name
        info_hash = torrent.info_hash or torrent.id
        if self.folder_naming == "filename":
            name = torrent.name
        elif self.folder_naming == "original":
            name = original
        elif self.folder_naming == "filename_no_ext":
            name = os.path.splitext(torrent.name)[0]
        elif self.folder_naming == "original_no_ext":
            name = os.path.splitext(original)[0]
        elif self.folder_naming == "id":
            name = torrent.id
        elif self.folder_naming == "infohash":
            name = info_hash
        return name or torrent.id

    def folder_name(self, torrent: DebridTorrent) -> str:
        return self._folder_name(torrent)

    def delete_torrent(self, torrent_id: str) -> None:
        self.client.delete_torrent(torrent_id)
        cached = self._torrents.pop(torrent_id, None)
        if cached:
            folder = self._folder_name(cached.torrent)
            ids = self._folder_index.get(folder, [])
            if torrent_id in ids:
                ids.remove(torrent_id)
            if not ids:
                self._folder_index.pop(folder, None)

    def custom_folders(self) -> Dict[str, List[str]]:
        folders: Dict[str, List[str]] = {}
        if not self.directories:
            return folders
        now = datetime.utcnow()
        for folder_name, cfg in self.directories.items():
            filters = cfg.get("filters", {}) if isinstance(cfg, dict) else {}
            matched: List[str] = []
            for torrent in self.list_torrents():
                if self._matches_filters(torrent, filters, now):
                    matched.append(self._folder_name(torrent))
            if matched:
                folders[folder_name] = matched
        return folders

    def is_bad(self, torrent: DebridTorrent) -> bool:
        status = (torrent.status or "").lower()
        bad_statuses = {"error", "virus", "dead", "magnet_error"}
        if status in bad_statuses:
            return True
        if status == "waiting_files_selection":
            if torrent.added and datetime.utcnow() - torrent.added > self.bad_wait_threshold:
                return True
        if status == "downloaded":
            return not self._has_files(torrent)
        return False

    def _has_files(self, torrent: DebridTorrent) -> bool:
        if torrent.files:
            return True
        refreshed = self._refresh_torrent(torrent.id)
        return bool(refreshed and refreshed.files)

    def _matches_filters(self, torrent: DebridTorrent, filters: dict, now: datetime) -> bool:
        name = (torrent.name or "").lower()
        size = 0
        for file in torrent.files.values():
            size += file.size
        for key, value in filters.items():
            val = str(value).lower()
            if key == "include" and val not in name:
                return False
            if key == "exclude" and val in name:
                return False
            if key == "starts_with" and not name.startswith(val):
                return False
            if key == "ends_with" and not name.endswith(val):
                return False
            if key == "not_starts_with" and name.startswith(val):
                return False
            if key == "not_ends_with" and name.endswith(val):
                return False
            if key == "exact_match" and name != val:
                return False
            if key == "not_exact_match" and name == val:
                return False
            if key == "regex" and not re.search(val, name):
                return False
            if key == "not_regex" and re.search(val, name):
                return False
            if key == "size_gt" and size <= _parse_size(val):
                return False
            if key == "size_lt" and size >= _parse_size(val):
                return False
            if key == "last_added":
                threshold = _parse_duration(val)
                if torrent.added and torrent.added < (now - threshold):
                    return False
        return True
