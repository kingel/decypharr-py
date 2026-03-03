from __future__ import annotations

from dataclasses import dataclass
from datetime import timedelta
from typing import Dict, Optional

from decypharr.config import Config
from decypharr.debrid.base import DebridClient
from decypharr.debrid.cache import DebridCache
from decypharr.debrid.realdebrid import RealDebridClient
from decypharr.debrid.torbox import TorBoxClient


@dataclass
class DebridEntry:
    client: DebridClient
    cache: DebridCache


class DebridStorage:
    def __init__(self, config: Config) -> None:
        self._entries: Dict[str, DebridEntry] = {}
        for debrid in config.debrids:
            if not debrid.name:
                continue
            client = self._create_client(debrid.name, debrid.api_key or "", bool(debrid.unpack_rar))
            if client is None:
                continue
            folder_naming = debrid.folder_naming or config.webdav.folder_naming
            directories = dict(config.webdav.directories or {})
            for key, value in (debrid.directories or {}).items():
                directories[key] = value
            self._entries[debrid.name] = DebridEntry(
                client=client,
                cache=DebridCache(client, folder_naming=folder_naming, directories=directories),
            )
            self._entries[debrid.name].cache.bad_wait_threshold = timedelta(
                hours=max(1, config.bad_torrent_threshold_hours)
            )

    def _create_client(self, name: str, api_key: str, unpack_rar: bool) -> Optional[DebridClient]:
        if name == "realdebrid":
            if not api_key:
                return None
            return RealDebridClient(api_key, unpack_rar=unpack_rar)
        if name == "torbox":
            if not api_key:
                return None
            return TorBoxClient(api_key, unpack_rar=unpack_rar)
        return None

    def cache(self, name: str) -> Optional[DebridCache]:
        entry = self._entries.get(name)
        return entry.cache if entry else None

    def caches(self) -> Dict[str, DebridCache]:
        return {name: entry.cache for name, entry in self._entries.items()}

    def entries(self) -> Dict[str, DebridEntry]:
        return dict(self._entries)

    def submit_magnet(self, name: str, magnet: str):
        entry = self._entries.get(name)
        if not entry:
            raise ValueError(f"Debrid {name} not configured")
        torrent = entry.client.submit_magnet(magnet)
        return torrent

    def submit_torrent_file(self, name: str, data: bytes):
        entry = self._entries.get(name)
        if not entry:
            raise ValueError(f"Debrid {name} not configured")
        torrent = entry.client.submit_torrent_file(data)
        return torrent

    def delete_torrent(self, name: str, torrent_id: str) -> None:
        entry = self._entries.get(name)
        if not entry:
            raise ValueError(f"Debrid {name} not configured")
        entry.client.delete_torrent(torrent_id)

    def is_cached(self, name: str, infohash: str) -> bool:
        entry = self._entries.get(name)
        if not entry:
            raise ValueError(f"Debrid {name} not configured")
        client = entry.client
        if hasattr(client, "is_cached"):
            return bool(client.is_cached(infohash))  # type: ignore[attr-defined]
        return True

    def is_cached_many(self, name: str, infohashes: list[str]) -> dict[str, bool]:
        entry = self._entries.get(name)
        if not entry:
            raise ValueError(f"Debrid {name} not configured")
        client = entry.client
        hashes = [h for h in infohashes if h]
        if hasattr(client, "is_cached_many"):
            return client.is_cached_many(hashes)  # type: ignore[attr-defined]
        return {h: self.is_cached(name, h) for h in hashes}

    def test_key(self, name: str, api_key: str, unpack_rar: bool = False):
        client = self._create_client(name, api_key, unpack_rar)
        if client is None:
            raise ValueError(f"Debrid {name} not supported")
        try:
            return client.get_profile()
        finally:
            client.close()

    def close(self) -> None:
        for entry in self._entries.values():
            entry.client.close()
