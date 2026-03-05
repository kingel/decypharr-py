from __future__ import annotations

import json
import secrets
import threading
from pathlib import Path
from typing import Dict, List, Optional

from pydantic import BaseModel, Field
import time


class Torrent(BaseModel):
    hash: str
    name: str
    size: int = 0
    progress: float = 0.0
    state: str = "pausedUP"
    category: str = ""
    tags: List[str] = Field(default_factory=list)
    added_on: int = 0
    save_path: Optional[str] = None
    magnet_uri: Optional[str] = None
    dlspeed: int = 0
    num_seeds: int = 0
    debrid: Optional[str] = None
    id: Optional[str] = None
    action: str = "symlink"
    content_path: Optional[str] = None
    processed: bool = False
    callback_url: Optional[str] = None
    callback_status: Optional[str] = None
    trackers: List[str] = Field(default_factory=list)
    file_priorities: Dict[int, int] = Field(default_factory=dict)


class TorrentStore:
    def __init__(self, path: Path) -> None:
        self.path = path
        self._items: Dict[str, Torrent] = {}
        self._loaded = False
        self._lock = threading.Lock()

    def _load(self) -> None:
        """Load from disk. Caller must hold self._lock."""
        if self._loaded:
            return
        if self.path.exists():
            data = json.loads(self.path.read_text())
            self._items = {item["hash"]: Torrent.model_validate(item) for item in data}
        self._loaded = True

    def load(self) -> None:
        with self._lock:
            self._load()

    def _save(self) -> None:
        """Atomic write. Caller must hold self._lock."""
        self.path.parent.mkdir(parents=True, exist_ok=True)
        data = [t.model_dump(mode="json") for t in self._items.values()]
        tmp = self.path.with_suffix(".tmp")
        tmp.write_text(json.dumps(data, indent=2))
        tmp.replace(self.path)

    def save(self) -> None:
        with self._lock:
            self._save()

    def list(self) -> List[Torrent]:
        with self._lock:
            self._load()
            return list(self._items.values())

    def get(self, hash_value: str) -> Optional[Torrent]:
        with self._lock:
            self._load()
            return self._items.get(hash_value)

    def add(
        self,
        name: str,
        magnet_uri: Optional[str] = None,
        category: str = "",
        tags: Optional[List[str]] = None,
        save_path: Optional[str] = None,
        debrid: Optional[str] = None,
        hash_value: Optional[str] = None,
        debrid_id: Optional[str] = None,
        state: Optional[str] = None,
        action: Optional[str] = None,
        callback_url: Optional[str] = None,
        trackers: Optional[List[str]] = None,
        file_priorities: Optional[Dict[int, int]] = None,
    ) -> Torrent:
        with self._lock:
            self._load()
            if not hash_value:
                hash_value = secrets.token_hex(20)
            torrent = Torrent(
                hash=hash_value,
                name=name,
                category=category,
                tags=tags or [],
                save_path=save_path,
                magnet_uri=magnet_uri,
                added_on=int(time.time()),
                debrid=debrid,
                id=debrid_id,
                state=state or "pausedUP",
                action=action or "symlink",
                callback_url=callback_url,
                trackers=trackers or [],
                file_priorities=file_priorities or {},
            )
            self._items[hash_value] = torrent
            self._save()
        return torrent

    def delete(self, hashes: List[str]) -> int:
        with self._lock:
            self._load()
            removed = 0
            for h in hashes:
                if h in self._items:
                    del self._items[h]
                    removed += 1
            if removed:
                self._save()
        return removed

    def update(self, hash_value: str, **fields) -> None:
        with self._lock:
            self._load()
            torrent = self._items.get(hash_value)
            if not torrent:
                return
            self._items[hash_value] = torrent.model_copy(update=fields)
            self._save()

    def update_category(self, hashes: List[str], category: str) -> None:
        with self._lock:
            self._load()
            for h in hashes:
                if h in self._items:
                    self._items[h].category = category
            self._save()

    def add_tags(self, hashes: List[str], tags: List[str]) -> None:
        with self._lock:
            self._load()
            for h in hashes:
                if h in self._items:
                    current = set(self._items[h].tags)
                    current.update(tags)
                    self._items[h].tags = sorted(current)
            self._save()

    def remove_tags(self, hashes: List[str], tags: List[str]) -> None:
        with self._lock:
            self._load()
            for h in hashes:
                if h in self._items:
                    self._items[h].tags = [t for t in self._items[h].tags if t not in tags]
            self._save()

    def set_state(self, hashes: List[str], state: str) -> None:
        with self._lock:
            self._load()
            for h in hashes:
                if h in self._items:
                    self._items[h].state = state
            self._save()

    def set_file_priorities(self, hash_value: str, priorities: Dict[int, int]) -> None:
        with self._lock:
            self._load()
            torrent = self._items.get(hash_value)
            if not torrent:
                return
            merged = dict(torrent.file_priorities)
            merged.update(priorities)
            torrent.file_priorities = merged
            self._items[hash_value] = torrent
            self._save()
