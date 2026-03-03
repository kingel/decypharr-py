from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timedelta
from typing import Dict, List, Optional


@dataclass
class DebridFile:
    id: str
    name: str
    size: int
    link: str
    is_rar: bool = False
    rar_path: Optional[str] = None
    torrent_id: Optional[str] = None
    archive_size: Optional[int] = None


@dataclass
class DebridTorrent:
    id: str
    name: str
    status: str
    added: Optional[datetime] = None
    files: Dict[str, DebridFile] = field(default_factory=dict)
    info_hash: Optional[str] = None
    original_name: Optional[str] = None
    bytes: Optional[int] = None
    progress: Optional[float] = None
    speed: Optional[int] = None
    seeders: Optional[int] = None


@dataclass
class DownloadLink:
    link: str
    download_url: str
    filename: str
    size: int
    expires_at: Optional[datetime] = None

    def is_valid(self) -> bool:
        if self.expires_at is None:
            return True
        return datetime.utcnow() < self.expires_at


@dataclass
class DebridProfile:
    name: str
    username: str
    expiration: Optional[datetime] = None
    type: Optional[str] = None
    points: Optional[int] = None
