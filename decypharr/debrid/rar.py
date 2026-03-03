from __future__ import annotations

import io
from typing import Iterable, List, Optional, Tuple

import httpx
import rarfile


class HTTPRangeReader(io.RawIOBase):
    def __init__(self, url: str, size: int) -> None:
        self._client = httpx.Client(timeout=None)
        self._url = url
        self._size = size
        self._pos = 0

    def readable(self) -> bool:  # type: ignore[override]
        return True

    def seekable(self) -> bool:  # type: ignore[override]
        return True

    def tell(self) -> int:  # type: ignore[override]
        return self._pos

    def seek(self, offset: int, whence: int = io.SEEK_SET) -> int:  # type: ignore[override]
        if whence == io.SEEK_SET:
            self._pos = max(0, offset)
        elif whence == io.SEEK_CUR:
            self._pos = max(0, self._pos + offset)
        elif whence == io.SEEK_END:
            self._pos = max(0, self._size + offset)
        return self._pos

    def read(self, size: int = -1) -> bytes:  # type: ignore[override]
        if self._pos >= self._size:
            return b""
        if size < 0:
            end = self._size - 1
        else:
            end = min(self._size - 1, self._pos + size - 1)
        headers = {"Range": f"bytes={self._pos}-{end}"}
        resp = self._client.get(self._url, headers=headers)
        resp.raise_for_status()
        data = resp.content
        self._pos += len(data)
        return data

    def close(self) -> None:  # type: ignore[override]
        try:
            self._client.close()
        finally:
            super().close()


def list_rar_files(download_url: str, size: int) -> List[rarfile.RarInfo]:
    reader = HTTPRangeReader(download_url, size)
    try:
        with rarfile.RarFile(reader) as rf:
            return rf.infolist()
    finally:
        reader.close()


def open_rar_file(download_url: str, size: int, inner_path: str):
    reader = HTTPRangeReader(download_url, size)
    rf = rarfile.RarFile(reader)
    try:
        rar_entry = rf.open(inner_path)
    except Exception:
        rf.close()
        reader.close()
        raise

    return RarStream(rf, rar_entry, reader)


class RarStream(io.RawIOBase):
    def __init__(self, rf: rarfile.RarFile, rar_entry, reader: HTTPRangeReader) -> None:
        self._rf = rf
        self._entry = rar_entry
        self._reader = reader

    def readable(self) -> bool:  # type: ignore[override]
        return True

    def read(self, size: int = -1) -> bytes:  # type: ignore[override]
        return self._entry.read(size)

    def close(self) -> None:  # type: ignore[override]
        try:
            self._entry.close()
        finally:
            try:
                self._rf.close()
            finally:
                self._reader.close()
        super().close()
