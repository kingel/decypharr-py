from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum
from typing import Dict, Iterable, List, Optional
import threading
import urllib.parse
import os
from urllib.parse import urlencode

import httpx

from decypharr.config import Arr as ArrConfig, Config


class ArrType(str, Enum):
    SONARR = "sonarr"
    RADARR = "radarr"
    LIDARR = "lidarr"
    READARR = "readarr"
    OTHER = "other"


@dataclass
class ContentFile:
    path: str
    file_id: int
    media_id: int
    season_number: int = 0
    size: int = 0
    target_path: Optional[str] = None
    is_symlink: bool = False

    def to_dict(self) -> Dict[str, object]:
        return {
            "path": self.path,
            "size": self.size,
            "fileId": self.file_id,
            "id": self.media_id,
            "seasonNumber": self.season_number,
        }

    def delete_local(self) -> None:
        try:
            os.remove(self.path)
        except OSError:
            return


@dataclass
class Content:
    title: str
    media_id: int
    files: List[ContentFile] = field(default_factory=list)


class ArrClient:
    def __init__(self, cfg: ArrConfig) -> None:
        self.name = cfg.name or ""
        self.host = (cfg.host or "").rstrip("/")
        self.token = (cfg.token or "").strip()
        self.cleanup = cfg.cleanup
        self.auto_remove_completed = cfg.auto_remove_completed
        self.skip_repair = cfg.skip_repair
        self.download_uncached = cfg.download_uncached
        self.selected_debrid = cfg.selected_debrid or ""
        self.source = cfg.source or ""
        self.type = self._infer_type(self.host, self.name)
        self._client = httpx.Client(verify=False, timeout=60.0)

    @staticmethod
    def _infer_type(host: str, name: str) -> ArrType:
        lowered = f"{host} {name}".lower()
        if "sonarr" in lowered:
            return ArrType.SONARR
        if "radarr" in lowered:
            return ArrType.RADARR
        if "lidarr" in lowered:
            return ArrType.LIDARR
        if "readarr" in lowered:
            return ArrType.READARR
        return ArrType.OTHER

    def _request(self, method: str, endpoint: str, payload: Optional[dict] = None) -> httpx.Response:
        if not self.host or not self.token:
            raise RuntimeError("Arr not configured")
        endpoint = endpoint.lstrip("/")
        url = urllib.parse.urljoin(f"{self.host}/", endpoint)
        headers = {"X-Api-Key": self.token}
        resp = self._client.request(method, url, json=payload, headers=headers)
        return resp

    def validate(self) -> None:
        if not self.host or not self.token:
            raise RuntimeError("Arr not configured")
        resp = self._request("GET", "api/v3/health")
        if resp.status_code not in (200, 404):
            raise RuntimeError(f"Arr validation failed: {resp.status_code}")

    def refresh(self) -> None:
        payload = {"name": "RefreshMonitoredDownloads"}
        resp = self._request("POST", "api/v3/command", payload)
        if resp.status_code >= 300:
            raise RuntimeError(f"Arr refresh failed: {resp.status_code}")

    def get_queue(self) -> List[dict]:
        results: List[dict] = []
        page = 1
        page_size = 200
        while True:
            query = urlencode({"page": page, "pageSize": page_size})
            resp = self._request("GET", f"api/v3/queue?{query}")
            if resp.status_code >= 300:
                raise RuntimeError(f"Arr queue fetch failed: {resp.status_code}")
            data = resp.json() or {}
            records = data.get("records") or []
            total = int(data.get("totalRecords", 0) or 0)
            if records:
                results.extend(records)
            if not records or len(results) >= total:
                break
            page += 1
        return results

    def cleanup_queue(self) -> None:
        queue = self.get_queue()
        if not queue:
            return
        queue_ids: List[int] = []
        for item in queue:
            if item.get("protocol") != "torrent":
                continue
            if item.get("status") != "completed":
                continue
            if item.get("trackedDownloadStatus") != "warning":
                continue
            if item.get("trackedDownloadState") != "importPending":
                continue
            messages = item.get("statusMessages") or []
            is_messed_up = False
            for msg in messages:
                title = str(msg.get("title") or "")
                lines = msg.get("messages") or []
                combined = " ".join([str(m) for m in lines])
                if "No files found are eligible" in combined:
                    is_messed_up = True
                    break
                if "One or more episodes expected in this release were not imported or missing from the release" in title:
                    is_messed_up = True
                    break
            if is_messed_up:
                queue_id = int(item.get("id", 0) or 0)
                if queue_id:
                    queue_ids.append(queue_id)
        if not queue_ids:
            return
        payload = {"ids": queue_ids}
        query = urlencode(
            {
                "removeFromClient": "true",
                "blocklist": "true",
                "skipRedownload": "false",
                "changeCategory": "false",
            }
        )
        resp = self._request("DELETE", f"api/v3/queue/bulk?{query}", payload)
        if resp.status_code >= 300:
            raise RuntimeError(f"Arr cleanup failed: {resp.status_code}")

    def get_media(self, media_id: str) -> List[Content]:
        if self.type == ArrType.RADARR:
            return self._get_movies(media_id)

        endpoint = "api/v3/series"
        if media_id:
            endpoint = f"{endpoint}?tvdbId={media_id}"
        resp = self._request("GET", endpoint)
        if resp.status_code == 404:
            return self._get_movies(media_id)
        resp.raise_for_status()
        data = resp.json()
        contents: List[Content] = []
        for series in data:
            series_id = int(series.get("id", 0) or 0)
            title = series.get("title") or ""
            if not series_id:
                continue
            files_resp = self._request("GET", f"api/v3/episodefile?seriesId={series_id}")
            files_resp.raise_for_status()
            series_files = files_resp.json()

            episodes_resp = self._request("GET", f"api/v3/episode?seriesId={series_id}")
            episodes_resp.raise_for_status()
            episode_file_map = {e.get("episodeFileId"): e.get("id") for e in episodes_resp.json()}

            files: List[ContentFile] = []
            for entry in series_files:
                file_id = int(entry.get("id", 0) or 0)
                path = entry.get("path") or ""
                if not file_id or not path:
                    continue
                season_number = int(entry.get("seasonNumber", 0) or 0)
                size = int(entry.get("size", entry.get("bytes", 0)) or 0)
                files.append(
                    ContentFile(
                        path=path,
                        file_id=file_id,
                        media_id=series_id,
                        season_number=season_number,
                        size=size,
                    )
                )
            if not files:
                continue
            contents.append(Content(title=title, media_id=series_id, files=files))
        self.type = ArrType.SONARR
        return contents

    def _get_movies(self, media_id: str) -> List[Content]:
        endpoint = "api/v3/movie"
        if media_id:
            endpoint = f"{endpoint}?tmdbId={media_id}"
        resp = self._request("GET", endpoint)
        if resp.status_code == 404:
            raise RuntimeError("Arr endpoint not found")
        resp.raise_for_status()
        data = resp.json()
        contents: List[Content] = []
        for movie in data:
            movie_file = movie.get("movieFile") or {}
            file_id = int(movie_file.get("id", 0) or 0)
            path = movie_file.get("path") or ""
            if not file_id or not path:
                continue
            size = int(movie_file.get("size", movie_file.get("bytes", 0)) or 0)
            movie_id = int(movie.get("id", 0) or 0)
            title = movie.get("title") or ""
            files = [
                ContentFile(
                    path=path,
                    file_id=file_id,
                    media_id=movie_id,
                    size=size,
                )
            ]
            contents.append(Content(title=title, media_id=movie_id, files=files))
        self.type = ArrType.RADARR
        return contents

    def search_missing(self, files: List[ContentFile]) -> None:
        if not files:
            return
        if self.type == ArrType.SONARR:
            seen = set()
            for entry in files:
                key = (entry.media_id, entry.season_number)
                if key in seen:
                    continue
                seen.add(key)
                payload = {
                    "name": "SeasonSearch",
                    "seasonNumber": entry.season_number,
                    "seriesId": entry.media_id,
                }
                resp = self._request("POST", "api/v3/command", payload)
                resp.raise_for_status()
            return
        if self.type == ArrType.RADARR:
            ids = list({entry.media_id for entry in files if entry.media_id})
            payload = {"name": "MoviesSearch", "movieIds": ids}
            resp = self._request("POST", "api/v3/command", payload)
            resp.raise_for_status()
            return
        raise RuntimeError(f"Unknown Arr type: {self.type}")

    def delete_files(self, files: List[ContentFile]) -> None:
        if not files:
            return
        if self.type == ArrType.SONARR:
            payload = {"episodeFileIds": [f.file_id for f in files]}
            resp = self._request("DELETE", "api/v3/episodefile/bulk", payload)
            resp.raise_for_status()
        elif self.type == ArrType.RADARR:
            payload = {"movieFileIds": [f.file_id for f in files]}
            resp = self._request("DELETE", "api/v3/moviefile/bulk", payload)
            resp.raise_for_status()
        else:
            raise RuntimeError(f"Unknown Arr type: {self.type}")
        for f in files:
            f.delete_local()


class ArrStorage:
    def __init__(self) -> None:
        self._arrs: Dict[str, ArrClient] = {}
        self._lock = threading.Lock()

    def refresh_from_config(self, config: Config) -> None:
        arrs: Dict[str, ArrClient] = {}
        for cfg in config.arrs:
            if not cfg.name or not cfg.host or not cfg.token:
                continue
            arrs[cfg.name] = ArrClient(cfg)
        with self._lock:
            self._arrs = arrs

    def add_or_update(self, arr: ArrClient) -> None:
        if not arr.name:
            return
        with self._lock:
            self._arrs[arr.name] = arr

    def get(self, name: str) -> Optional[ArrClient]:
        with self._lock:
            return self._arrs.get(name)

    def get_all(self) -> List[ArrClient]:
        with self._lock:
            return list(self._arrs.values())

    def names(self) -> List[str]:
        with self._lock:
            return list(self._arrs.keys())

    def serialize(self) -> List[Dict[str, object]]:
        with self._lock:
            arrs = list(self._arrs.values())
        return [
            {
                "name": arr.name,
                "host": arr.host,
                "token": arr.token,
                "cleanup": arr.cleanup,
                "auto_remove_completed": arr.auto_remove_completed,
                "skip_repair": arr.skip_repair,
                "download_uncached": arr.download_uncached,
                "selected_debrid": arr.selected_debrid,
                "source": arr.source,
            }
            for arr in arrs
        ]
