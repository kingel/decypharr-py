from __future__ import annotations

import io
from datetime import datetime
from typing import Callable, Dict, Iterable, List, Optional, Tuple

import httpx
from wsgidav.dav_provider import DAVCollection, DAVNonCollection, DAVProvider

from decypharr import __version__
from decypharr.debrid.cache import DebridCache
from decypharr.debrid.models import DebridFile, DebridTorrent


class _HTTPStream(io.RawIOBase):
    def __init__(self, url: str) -> None:
        self._client = httpx.Client(timeout=None)
        self._response = self._client.stream("GET", url)
        self._response.__enter__()
        self._iter = self._response.iter_bytes()
        self._buffer = b""

    def readable(self) -> bool:  # type: ignore[override]
        return True

    def read(self, size: int = -1) -> bytes:  # type: ignore[override]
        if size == 0:
            return b""
        if size < 0:
            chunks = [self._buffer]
            self._buffer = b""
            for chunk in self._iter:
                chunks.append(chunk)
            return b"".join(chunks)
        while len(self._buffer) < size:
            try:
                self._buffer += next(self._iter)
            except StopIteration:
                break
        data, self._buffer = self._buffer[:size], self._buffer[size:]
        return data

    def close(self) -> None:  # type: ignore[override]
        try:
            self._response.__exit__(None, None, None)
        finally:
            self._client.close()
        super().close()


def _split_path(path: str) -> List[str]:
    if not path:
        return []
    return [part for part in path.replace("\\", "/").split("/") if part]


def _resolve_child(
    files: Dict[str, DebridFile],
    prefix: List[str],
    name: str,
) -> Tuple[Optional[str], bool]:
    file_key: Optional[str] = None
    is_dir = False
    for key in files:
        parts = _split_path(key)
        if parts[: len(prefix)] != prefix:
            continue
        rest = parts[len(prefix) :]
        if not rest or rest[0] != name:
            continue
        if len(rest) == 1:
            file_key = key
        else:
            is_dir = True
    return file_key, is_dir


def _path_type(
    files: Dict[str, DebridFile],
    rel_parts: List[str],
) -> Tuple[Optional[str], Optional[str]]:
    file_key: Optional[str] = None
    is_dir = False
    for key in files:
        parts = _split_path(key)
        if parts[: len(rel_parts)] != rel_parts:
            continue
        if len(parts) == len(rel_parts):
            file_key = key
        else:
            is_dir = True
    if is_dir:
        return "dir", None
    if file_key:
        return "file", file_key
    return None, None


class DebridProvider(DAVProvider):
    def __init__(self, cache_provider: Callable[[], Dict[str, DebridCache]]) -> None:
        super().__init__()
        self._cache_provider = cache_provider

    @property
    def caches(self) -> Dict[str, DebridCache]:
        return self._cache_provider()

    def get_resource_inst(self, path: str, environ: dict):
        path = path or "/"
        parts = [p for p in path.strip("/").split("/") if p]
        if not parts:
            return RootCollection(path, environ, self)
        debrid = parts[0]
        cache = self.caches.get(debrid)
        if cache is None:
            return None
        if len(parts) == 1:
            return DebridCollection(path, environ, self, cache)
        if len(parts) == 2 and parts[1] == "version.txt":
            return VersionResource(path, environ, self)
        if len(parts) == 2:
            parent = parts[1]
            if parent not in ("__all__", "torrents", "__bad__") and parent not in cache.custom_folders():
                return None
            return TorrentsCollection(path, environ, self, cache, parent)
        if len(parts) == 3:
            parent = parts[1]
            if parent not in ("__all__", "torrents", "__bad__") and parent not in cache.custom_folders():
                return None
            return TorrentCollection(path, environ, self, cache, parts[2])
        if len(parts) >= 4:
            parent = parts[1]
            if parent not in ("__all__", "torrents", "__bad__") and parent not in cache.custom_folders():
                return None
            torrent_name = parts[2]
            rel_parts = parts[3:]
            files = cache.get_files_for_folder(torrent_name)
            kind, file_key = _path_type(files, rel_parts)
            if kind == "dir":
                return TorrentSubCollection(path, environ, self, cache, torrent_name, rel_parts)
            if kind == "file" and file_key:
                return FileResource(path, environ, self, cache, torrent_name, file_key)
            return None
        return None


class RootCollection(DAVCollection):
    def __init__(self, path, environ, provider):
        super().__init__(path, environ)
        self.provider = provider

    def get_member_names(self):
        return list(self.provider.caches.keys())

    def get_member(self, name):
        cache = self.provider.caches.get(name)
        if cache is None:
            return None
        path = f"/{name}"
        return DebridCollection(path, self.environ, self.provider, cache)


class DebridCollection(DAVCollection):
    def __init__(self, path, environ, provider, cache: DebridCache):
        super().__init__(path, environ)
        self.provider = provider
        self.cache = cache

    def get_member_names(self):
        base = ["__all__", "torrents"]
        if self._has_bad():
            base.append("__bad__")
        base.extend(list(self.cache.custom_folders().keys()))
        base.append("version.txt")
        return base

    def get_member(self, name):
        if name == "version.txt":
            base = self.path.rstrip("/")
            return VersionResource(f"{base}/version.txt", self.environ, self.provider)
        if name not in ("__all__", "torrents", "__bad__") and name not in self.cache.custom_folders():
            return None
        base = self.path.rstrip("/")
        path = f"{base}/{name}"
        return TorrentsCollection(path, self.environ, self.provider, self.cache, name)

    def _has_bad(self) -> bool:
        for torrent in self.cache.list_torrents():
            if self.cache.is_bad(torrent):
                return True
        return False


class TorrentsCollection(DAVCollection):
    def __init__(self, path, environ, provider, cache: DebridCache, parent: str):
        super().__init__(path, environ)
        self.provider = provider
        self.cache = cache
        self.parent = parent

    def get_member_names(self):
        if self.parent == "__bad__":
            return [
                f"{t.name} || {t.id}"
                for t in self.cache.list_torrents()
                if self.cache.is_bad(t)
            ]
        if self.parent in self.cache.custom_folders():
            return self.cache.custom_folders()[self.parent]
        return self.cache.folder_names()

    def get_member(self, name):
        if self.parent == "__bad__":
            folder_name = name.split(" || ")[0]
        else:
            folder_name = name
        if not self.cache.torrents_for_folder(folder_name):
            return None
        base = self.path.rstrip("/")
        path = f"{base}/{name}"
        return TorrentCollection(path, self.environ, self.provider, self.cache, folder_name)


class TorrentCollection(DAVCollection):
    def __init__(self, path, environ, provider, cache: DebridCache, torrent_name: str):
        super().__init__(path, environ)
        self.provider = provider
        self.cache = cache
        self.torrent_name = torrent_name

    def _torrent(self) -> Optional[DebridTorrent]:
        torrents = self.cache.torrents_for_folder(self.torrent_name)
        return torrents[0] if torrents else None

    def get_member_names(self):
        files = self.cache.get_files_for_folder(self.torrent_name)
        children = set()
        for name in files:
            parts = _split_path(name)
            if parts:
                children.add(parts[0])
        return list(children)

    def get_member(self, name):
        files = self.cache.get_files_for_folder(self.torrent_name)
        base = self.path.rstrip("/")
        path = f"{base}/{name}"
        file_key, is_dir = _resolve_child(files, [], name)
        if is_dir:
            return TorrentSubCollection(path, self.environ, self.provider, self.cache, self.torrent_name, [name])
        if file_key:
            return FileResource(path, self.environ, self.provider, self.cache, self.torrent_name, file_key)
        return None


class TorrentSubCollection(DAVCollection):
    def __init__(self, path, environ, provider, cache: DebridCache, torrent_name: str, prefix: List[str]):
        super().__init__(path, environ)
        self.provider = provider
        self.cache = cache
        self.torrent_name = torrent_name
        self.prefix = prefix

    def get_member_names(self):
        files = self.cache.get_files_for_folder(self.torrent_name)
        children = set()
        for name in files:
            parts = _split_path(name)
            if parts[: len(self.prefix)] != self.prefix:
                continue
            rest = parts[len(self.prefix) :]
            if rest:
                children.add(rest[0])
        return list(children)

    def get_member(self, name):
        files = self.cache.get_files_for_folder(self.torrent_name)
        base = self.path.rstrip("/")
        path = f"{base}/{name}"
        file_key, is_dir = _resolve_child(files, self.prefix, name)
        if is_dir:
            return TorrentSubCollection(path, self.environ, self.provider, self.cache, self.torrent_name, self.prefix + [name])
        if file_key:
            return FileResource(path, self.environ, self.provider, self.cache, self.torrent_name, file_key)
        return None


class FileResource(DAVNonCollection):
    def __init__(self, path, environ, provider, cache: DebridCache, torrent_name: str, file_name: str):
        super().__init__(path, environ)
        self.provider = provider
        self.cache = cache
        self.torrent_name = torrent_name
        self.file_name = file_name

    def _file(self) -> Optional[DebridFile]:
        files = self.cache.get_files_for_folder(self.torrent_name)
        return files.get(self.file_name)

    def get_content_length(self):
        file = self._file()
        return file.size if file else 0

    def get_content_type(self):
        return "application/octet-stream"

    def get_last_modified(self):
        return datetime.utcnow().timestamp()

    def get_content(self):
        file = self._file()
        if not file:
            return io.BytesIO(b"")
        download_url = self.cache.get_download_url(file)
        if file.is_rar and file.rar_path:
            return _open_rar_stream(download_url, file)
        return _HTTPStream(download_url)

    def support_ranges(self):
        return False

    def support_etag(self):
        return False

    def get_etag(self):
        return None

    def delete(self):
        raise RuntimeError("Read-only")


class VersionResource(DAVNonCollection):
    def __init__(self, path, environ, provider):
        super().__init__(path, environ)
        self.provider = provider

    def get_content_length(self):
        return len(__version__)

    def get_content_type(self):
        return "text/plain"

    def get_last_modified(self):
        return datetime.utcnow().timestamp()

    def get_content(self):
        return io.BytesIO(__version__.encode("utf-8"))

    def support_ranges(self):
        return False

    def support_etag(self):
        return False

    def get_etag(self):
        return None

    def delete(self):
        raise RuntimeError("Read-only")


def _open_rar_stream(download_url: str, file: DebridFile):
    from decypharr.debrid.rar import open_rar_file

    size = file.archive_size or (file.size if file.size > 0 else 1)
    return open_rar_file(download_url, size, file.rar_path or file.name)
