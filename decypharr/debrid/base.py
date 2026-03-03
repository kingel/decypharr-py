from __future__ import annotations

from abc import ABC, abstractmethod
from typing import List, Optional

from decypharr.debrid.models import DebridProfile, DebridTorrent, DownloadLink


class DebridClient(ABC):
    name: str

    @abstractmethod
    def get_profile(self) -> DebridProfile:
        raise NotImplementedError

    @abstractmethod
    def submit_magnet(self, magnet: str) -> DebridTorrent:
        raise NotImplementedError

    @abstractmethod
    def submit_torrent_file(self, data: bytes) -> DebridTorrent:
        raise NotImplementedError

    @abstractmethod
    def list_torrents(self) -> List[DebridTorrent]:
        raise NotImplementedError

    @abstractmethod
    def delete_torrent(self, torrent_id: str) -> None:
        raise NotImplementedError

    @abstractmethod
    def get_torrent(self, torrent_id: str) -> DebridTorrent:
        raise NotImplementedError

    @abstractmethod
    def unrestrict_link(self, link: str) -> DownloadLink:
        raise NotImplementedError

    def supports_webdav(self) -> bool:
        return True

    def close(self) -> None:
        return None
