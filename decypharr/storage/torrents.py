from __future__ import annotations

import json
import secrets
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


class TorrentStore:
    def __init__(self, path: Path) -> None:
        self.path = path
        self._items: Dict[str, Torrent] = {}
        self._loaded = False

    def load(self) -> None:
        if self._loaded:
            return
        if self.path.exists():
            data = json.loads(self.path.read_text())
            self._items = {item["hash"]: Torrent.model_validate(item) for item in data}
        self._loaded = True

    def save(self) -> None:
        self.path.parent.mkdir(parents=True, exist_ok=True)
        data = [t.model_dump(mode="json") for t in self._items.values()]
        self.path.write_text(json.dumps(data, indent=2))

    def list(self) -> List[Torrent]:
        self.load()
        return list(self._items.values())

    def get(self, hash_value: str) -> Optional[Torrent]:
        self.load()
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
    ) -> Torrent:
        self.load()
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
        )
        self._items[hash_value] = torrent
        self.save()
        return torrent

    def delete(self, hashes: List[str]) -> int:
        self.load()
        removed = 0
        for h in hashes:
            if h in self._items:
                del self._items[h]
                removed += 1
        if removed:
            self.save()
        return removed

    def update(self, hash_value: str, **fields) -> None:
        self.load()
        torrent = self._items.get(hash_value)
        if not torrent:
            return
        updated = torrent.model_copy(update=fields)
        self._items[hash_value] = updated
        self.save()

    def update_category(self, hashes: List[str], category: str) -> None:
        self.load()
        for h in hashes:
            if h in self._items:
                self._items[h].category = category
        self.save()

    def add_tags(self, hashes: List[str], tags: List[str]) -> None:
        self.load()
        for h in hashes:
            if h in self._items:
                current = set(self._items[h].tags)
                current.update(tags)
                self._items[h].tags = sorted(current)
        self.save()

    def remove_tags(self, hashes: List[str], tags: List[str]) -> None:
        self.load()
        for h in hashes:
            if h in self._items:
                current = [t for t in self._items[h].tags if t not in tags]
                self._items[h].tags = current
        self.save()

    def set_state(self, hashes: List[str], state: str) -> None:
        self.load()
        for h in hashes:
            if h in self._items:
                self._items[h].state = state
        self.save()
