from __future__ import annotations

from datetime import datetime, timedelta
from typing import Any, Dict, List, Optional, Tuple

import httpx

from decypharr.debrid.base import DebridClient
from decypharr.debrid.models import DebridFile, DebridProfile, DebridTorrent, DownloadLink


class TorBoxClient(DebridClient):
    name = "torbox"

    def __init__(
        self,
        api_key: str,
        base_url: str = "https://api.torbox.app/v1",
        unpack_rar: bool = False,
    ) -> None:
        self.base_url = base_url.rstrip("/")
        self._client = httpx.Client(
            headers={"Authorization": f"Bearer {api_key}"},
            timeout=None,
        )
        self._api_key = api_key
        self.unpack_rar = unpack_rar

    def close(self) -> None:
        self._client.close()

    def get_profile(self) -> DebridProfile:
        data = self._request_json("GET", "/api/user/me")
        user = self._coerce_user(data)
        expiration = self._parse_datetime(
            user.get("expiration")
            or user.get("expires")
            or user.get("expires_at")
            or user.get("plan_expires")
        )
        return DebridProfile(
            name="TorBox",
            username=user.get("username") or user.get("name") or user.get("email") or "",
            expiration=expiration,
            type=user.get("plan") or user.get("type") or None,
            points=user.get("points"),
        )

    def submit_magnet(self, magnet: str) -> DebridTorrent:
        data = self._create_torrent_form(magnet=magnet)
        torrent = self._build_torrent_from_create(data, fallback_name=magnet[:120], fallback_hash=None)
        if torrent.id:
            try:
                return self.get_torrent(torrent.id)
            except Exception:
                pass
        return torrent

    def submit_torrent_file(self, data: bytes) -> DebridTorrent:
        payload = self._create_torrent_file(data)
        torrent = self._build_torrent_from_create(payload, fallback_name="upload.torrent", fallback_hash=None)
        if torrent.id:
            try:
                return self.get_torrent(torrent.id)
            except Exception:
                pass
        return torrent

    def list_torrents(self) -> List[DebridTorrent]:
        data = self._request_json("GET", "/api/torrents/mylist")
        items = self._coerce_list(data)
        torrents: List[DebridTorrent] = []
        for item in items:
            torrent = self._map_torrent_item(item)
            has_links = any(f.link for f in torrent.files.values())
            status = (torrent.status or "").lower()
            if has_links or status in ("downloaded", "completed"):
                torrents.append(torrent)
        return torrents

    def delete_torrent(self, torrent_id: str) -> None:
        payload = {"torrent_id": torrent_id, "action": "Delete"}
        resp = self._client.delete(
            f"{self.base_url}/api/torrents/controltorrent/{torrent_id}",
            json=payload,
        )
        if resp.status_code < 400:
            return
        for params in (
            {"torrent_id": torrent_id, "action": "Delete"},
            {"id": torrent_id, "action": "Delete"},
            {"torrent_hash": torrent_id, "action": "Delete"},
        ):
            resp = self._client.post(f"{self.base_url}/api/torrents/controltorrent", data=params)
            if resp.status_code < 400:
                return
        resp.raise_for_status()

    def get_torrent(self, torrent_id: str) -> DebridTorrent:
        data = self._get_torrent_info(torrent_id)
        torrent = self._map_torrent_item(data)
        if not torrent.id:
            torrent.id = torrent_id
        return torrent

    def is_cached(self, infohash: str) -> bool:
        if not infohash:
            return False
        resp = self._client.get(
            f"{self.base_url}/api/torrents/checkcached",
            params={"hash": infohash},
        )
        resp.raise_for_status()
        data = self._unwrap(resp.json())
        entry = None
        if isinstance(data, dict):
            entry = data.get(infohash) or data.get(infohash.upper()) or data.get("cached")
        if isinstance(entry, dict):
            if entry.get("cached") is not None:
                return bool(entry.get("cached"))
            if entry.get("is_cached") is not None:
                return bool(entry.get("is_cached"))
            if entry.get("files") is not None:
                return bool(entry.get("files"))
            if entry.get("size") is not None:
                return int(entry.get("size") or 0) > 0
        if isinstance(entry, list):
            return len(entry) > 0
        if isinstance(data, list):
            return len(data) > 0
        return bool(entry)

    def is_cached_many(self, infohashes: list[str]) -> dict[str, bool]:
        hashes = [h for h in infohashes if h]
        result: dict[str, bool] = {h: False for h in hashes}
        if not hashes:
            return result
        resp = self._client.get(
            f"{self.base_url}/api/torrents/checkcached",
            params={"hash": ",".join(hashes)},
        )
        resp.raise_for_status()
        data = self._unwrap(resp.json())
        if isinstance(data, dict):
            normalized = {h.lower(): h for h in hashes}
            for key, value in data.items():
                if not isinstance(key, str):
                    continue
                entry = value if isinstance(value, dict) else {}
                size = 0
                if isinstance(entry, dict):
                    size = int(entry.get("size") or 0)
                normalized_key = key.lower()
                if normalized_key in normalized:
                    result[normalized[normalized_key]] = size > 0
            return result
        if isinstance(data, list):
            normalized = {h.lower(): h for h in hashes}
            for item in data:
                if not isinstance(item, dict):
                    continue
                key = item.get("hash")
                if not isinstance(key, str):
                    continue
                size = int(item.get("size") or 0)
                normalized_key = key.lower()
                if normalized_key in normalized:
                    result[normalized[normalized_key]] = size > 0
        return result

    def unrestrict_link(self, link: str) -> DownloadLink:
        if link.startswith("http://") or link.startswith("https://"):
            return DownloadLink(link=link, download_url=link, filename="", size=0)
        if link.startswith("torbox://"):
            torrent_id, file_id = self._parse_torbox_link(link)
            if torrent_id and file_id:
                return self._request_download_link(torrent_id, file_id)
        return DownloadLink(link=link, download_url=link, filename="", size=0)

    def _request_json(self, method: str, path: str, **kwargs: Any) -> Any:
        resp = self._client.request(method, f"{self.base_url}{path}", **kwargs)
        resp.raise_for_status()
        data = resp.json()
        return self._unwrap(data)

    @staticmethod
    def _unwrap(data: Any) -> Any:
        if isinstance(data, dict) and "data" in data:
            return data["data"]
        return data

    @staticmethod
    def _coerce_list(data: Any) -> List[Dict[str, Any]]:
        if isinstance(data, list):
            return [item for item in data if isinstance(item, dict)]
        if isinstance(data, dict):
            for key in ("torrents", "items", "list"):
                value = data.get(key)
                if isinstance(value, list):
                    return [item for item in value if isinstance(item, dict)]
            if "torrent" in data and isinstance(data["torrent"], dict):
                return [data["torrent"]]
        return []

    @staticmethod
    def _coerce_user(data: Any) -> Dict[str, Any]:
        if isinstance(data, dict):
            if "user" in data and isinstance(data["user"], dict):
                return data["user"]
            return data
        return {}

    def _create_torrent_form(self, magnet: str) -> Any:
        last_error: Optional[Exception] = None
        for field in ("magnet", "magnet_link"):
            try:
                return self._request_json("POST", "/api/torrents/createtorrent", data={field: magnet})
            except Exception as exc:
                last_error = exc
        if last_error:
            raise last_error
        raise RuntimeError("Unable to create torrent")

    def _create_torrent_file(self, data: bytes) -> Any:
        last_error: Optional[Exception] = None
        for field in ("torrent_file", "torrent"):
            try:
                files = {field: ("upload.torrent", data, "application/x-bittorrent")}
                return self._request_json("POST", "/api/torrents/createtorrent", files=files)
            except Exception as exc:
                last_error = exc
        if last_error:
            raise last_error
        raise RuntimeError("Unable to create torrent")

    def _build_torrent_from_create(
        self, data: Any, fallback_name: str, fallback_hash: Optional[str]
    ) -> DebridTorrent:
        if isinstance(data, dict):
            torrent_id = (
                data.get("torrent_id")
                or data.get("id")
                or data.get("torrentId")
                or data.get("torrent")
            )
            info_hash = data.get("hash") or data.get("torrent_hash") or data.get("info_hash") or fallback_hash
            name = data.get("name") or data.get("torrent_name") or data.get("filename") or fallback_name
            status = data.get("status") or data.get("download_state") or data.get("state") or ""
        else:
            torrent_id = None
            info_hash = fallback_hash
            name = fallback_name
            status = ""
        return DebridTorrent(
            id=str(torrent_id or ""),
            name=name,
            status=str(status or ""),
            info_hash=info_hash,
        )

    def _get_torrent_info(self, torrent_id: str) -> Any:
        params_list = []
        if len(torrent_id) == 40:
            params_list.append({"torrent_hash": torrent_id})
            params_list.append({"hash": torrent_id})
        params_list.extend(
            [
                {"id": torrent_id},
                {"torrent_id": torrent_id},
                {"torrent_hash": torrent_id},
            ]
        )
        last_error: Optional[Exception] = None
        for params in params_list:
            try:
                return self._request_json("GET", "/api/torrents/mylist", params=params)
            except Exception as exc:
                last_error = exc
        if last_error:
            raise last_error
        raise RuntimeError("Unable to fetch torrent info")

    def _map_torrent_item(self, item: Dict[str, Any]) -> DebridTorrent:
        torrent_id = (
            item.get("id")
            or item.get("torrent_id")
            or item.get("torrentId")
            or item.get("hash")
            or ""
        )
        info_hash = item.get("hash") or item.get("info_hash") or item.get("torrent_hash")
        name = item.get("name") or item.get("torrent_name") or item.get("filename") or ""
        raw_status = str(item.get("download_state") or item.get("status") or item.get("state") or "")
        normalized_status = raw_status.lower()
        download_finished = bool(
            item.get("download_finished")
            or item.get("downloadFinished")
            or item.get("download_present")
            or normalized_status in {"cached", "downloaded", "completed", "download_ready", "ready", "ready_for_download"}
        )
        status = self._map_status(normalized_status, download_finished)
        added = self._parse_datetime(item.get("added") or item.get("created_at") or item.get("created"))
        files = self._map_files(
            item.get("files") or item.get("links") or item.get("file_list"),
            str(torrent_id),
            download_finished,
        )
        progress = self._normalize_progress(item.get("progress"))
        if download_finished and (progress is None or progress <= 0):
            progress = 100.0
        return DebridTorrent(
            id=str(torrent_id or ""),
            name=name,
            status=str(status or ""),
            added=added,
            files=files,
            info_hash=info_hash,
            original_name=item.get("original_name") or item.get("original_filename"),
            bytes=item.get("size") or item.get("bytes"),
            progress=progress,
            speed=item.get("speed"),
            seeders=item.get("seeders"),
        )

    def _map_files(self, raw: Any, torrent_id: str, download_finished: bool) -> Dict[str, DebridFile]:
        files: Dict[str, DebridFile] = {}
        entries: List[Dict[str, Any]] = []
        if isinstance(raw, list):
            entries = [item for item in raw if isinstance(item, dict)]
        elif isinstance(raw, dict):
            entries = [item for item in raw.values() if isinstance(item, dict)]
        for entry in entries:
            name = entry.get("name") or entry.get("filename") or entry.get("path") or ""
            if not name:
                continue
            file_id = (
                entry.get("id")
                or entry.get("file_id")
                or entry.get("link_id")
                or entry.get("fileId")
                or ""
            )
            size = int(entry.get("size") or entry.get("bytes") or entry.get("filesize") or 0)
            link = entry.get("link") or entry.get("download_url") or entry.get("url") or ""
            if not link and torrent_id and file_id and download_finished:
                link = f"torbox://{torrent_id}/{file_id}"
            files[name] = DebridFile(id=str(file_id), name=name, size=size, link=link, torrent_id=torrent_id)
        return files

    def _request_download_link(self, torrent_id: str, file_id: str) -> DownloadLink:
        last_error: Optional[Exception] = None
        for payload in (
            {"torrent_id": torrent_id, "file_id": file_id, "token": self._api_key},
            {"id": torrent_id, "file_id": file_id, "token": self._api_key},
            {"torrent_hash": torrent_id, "file_id": file_id, "token": self._api_key},
        ):
            try:
                data = self._request_json("POST", "/api/torrents/requestdl", data=payload)
                return self._parse_download_link(data, fallback_name="", fallback_size=0)
            except Exception as exc:
                last_error = exc
        for payload in (
            {"torrent_id": torrent_id, "file_id": file_id, "token": self._api_key},
            {"id": torrent_id, "file_id": file_id, "token": self._api_key},
            {"torrent_hash": torrent_id, "file_id": file_id, "token": self._api_key},
        ):
            try:
                data = self._request_json("GET", "/api/torrents/requestdl", params=payload)
                return self._parse_download_link(data, fallback_name="", fallback_size=0)
            except Exception as exc:
                last_error = exc
        if last_error:
            raise last_error
        raise RuntimeError("Unable to request download link")

    @staticmethod
    def _parse_download_link(data: Any, fallback_name: str, fallback_size: int) -> DownloadLink:
        if isinstance(data, str):
            return DownloadLink(link=data, download_url=data, filename=fallback_name, size=fallback_size, expires_at=None)
        if isinstance(data, dict):
            link = (
                data.get("download_url")
                or data.get("link")
                or data.get("url")
                or data.get("download")
                or ""
            )
            filename = data.get("filename") or data.get("name") or fallback_name
            size = int(data.get("size") or data.get("filesize") or fallback_size)
            expires = TorBoxClient._parse_datetime(data.get("expires_at") or data.get("expires"))
            return DownloadLink(link=link, download_url=link, filename=filename, size=size, expires_at=expires)
        if isinstance(data, list) and data:
            return TorBoxClient._parse_download_link(data[0], fallback_name, fallback_size)
        return DownloadLink(link="", download_url="", filename=fallback_name, size=fallback_size)

    @staticmethod
    def _parse_torbox_link(link: str) -> Tuple[str, str]:
        raw = link.replace("torbox://", "", 1)
        parts = raw.split("/", 1)
        if len(parts) == 2:
            return parts[0], parts[1]
        return "", ""

    @staticmethod
    def _map_status(status: str, finished: bool) -> str:
        if finished:
            return "downloaded"
        normalized = (status or "").lower()
        if normalized in {"cached", "download_ready", "ready", "ready_for_download"}:
            return "downloaded"
        downloading = {
            "paused",
            "downloading",
            "uploading",
            "checkingResumeData",
            "metaDL",
            "pausedUP",
            "queuedUP",
            "checkingUP",
            "forcedUP",
            "allocating",
            "pausedDL",
            "queuedDL",
            "checkingDL",
            "forcedDL",
            "moving",
        }
        if normalized in downloading:
            return "downloading"
        return "error"

    @staticmethod
    def _normalize_progress(value: Any) -> Optional[float]:
        if value is None:
            return None
        try:
            progress = float(value)
        except Exception:
            return None
        if progress <= 1.0:
            return progress * 100.0
        return progress

    @staticmethod
    def _parse_datetime(value: Any) -> Optional[datetime]:
        if not value:
            return None
        if isinstance(value, (int, float)):
            try:
                return datetime.utcfromtimestamp(float(value))
            except Exception:
                return None
        if isinstance(value, str):
            try:
                return datetime.fromisoformat(value.replace("Z", "+00:00"))
            except Exception:
                return None
        return None
