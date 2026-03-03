from __future__ import annotations

from datetime import datetime, timedelta
from typing import Dict, List, Optional

import httpx

from decypharr.debrid.base import DebridClient
from decypharr.debrid.models import DebridFile, DebridProfile, DebridTorrent, DownloadLink
from decypharr.debrid.rar import list_rar_files


class RealDebridClient(DebridClient):
    name = "realdebrid"

    def __init__(
        self,
        api_key: str,
        base_url: str = "https://api.real-debrid.com/rest/1.0",
        unpack_rar: bool = False,
    ) -> None:
        self.base_url = base_url.rstrip("/")
        self._client = httpx.Client(
            headers={"Authorization": f"Bearer {api_key}"},
            timeout=None,
        )
        self.unpack_rar = unpack_rar

    def get_profile(self) -> DebridProfile:
        resp = self._client.get(f"{self.base_url}/user")
        resp.raise_for_status()
        data = resp.json()
        expiration = None
        if data.get("expiration"):
            try:
                expiration = datetime.fromisoformat(data["expiration"].replace("Z", "+00:00"))
            except ValueError:
                expiration = None
        return DebridProfile(
            name="Real-Debrid",
            username=data.get("username", ""),
            expiration=expiration,
            type=data.get("type"),
            points=data.get("points"),
        )

    def submit_magnet(self, magnet: str) -> DebridTorrent:
        resp = self._client.post(f"{self.base_url}/torrents/addMagnet", data={"magnet": magnet})
        resp.raise_for_status()
        data = resp.json()
        torrent_id = data.get("id", "")
        return self._finalize_submission(torrent_id)

    def submit_torrent_file(self, data: bytes) -> DebridTorrent:
        headers = {"Content-Type": "application/x-bittorrent"}
        resp = self._client.put(f"{self.base_url}/torrents/addTorrent", content=data, headers=headers)
        resp.raise_for_status()
        body = resp.json()
        torrent_id = body.get("id", "")
        return self._finalize_submission(torrent_id)

    def list_torrents(self) -> List[DebridTorrent]:
        resp = self._client.get(f"{self.base_url}/torrents", params={"limit": 5000})
        if resp.status_code == 204:
            return []
        resp.raise_for_status()
        torrents = []
        for item in resp.json():
            if item.get("status") != "downloaded":
                continue
            added = None
            if item.get("added"):
                try:
                    added = datetime.fromisoformat(item["added"].replace("Z", "+00:00"))
                except ValueError:
                    added = None
            torrents.append(
                DebridTorrent(
                    id=item.get("id", ""),
                    name=item.get("filename", ""),
                    status=item.get("status", ""),
                    added=added,
                    info_hash=item.get("hash"),
                    original_name=item.get("filename", ""),
                )
            )
        return torrents

    def delete_torrent(self, torrent_id: str) -> None:
        resp = self._client.delete(f"{self.base_url}/torrents/delete/{torrent_id}")
        resp.raise_for_status()

    def get_torrent(self, torrent_id: str) -> DebridTorrent:
        data = self._get_torrent_info(torrent_id)
        files = self._map_files(data.get("files", []), data.get("links", []))
        added = None
        if data.get("added"):
            try:
                added = datetime.fromisoformat(data["added"].replace("Z", "+00:00"))
            except ValueError:
                added = None
        return DebridTorrent(
            id=data.get("id", ""),
            name=data.get("filename", ""),
            status=data.get("status", ""),
            files=self._with_torrent_id(files, data.get("id", "")),
            info_hash=data.get("hash"),
            added=added,
            original_name=data.get("original_filename"),
            bytes=data.get("bytes"),
            progress=data.get("progress"),
            speed=data.get("speed"),
            seeders=data.get("seeders"),
        )

    def is_cached(self, infohash: str) -> bool:
        if not infohash:
            return False
        infohash = infohash.lower()
        resp = self._client.get(f"{self.base_url}/torrents/instantAvailability/{infohash}")
        resp.raise_for_status()
        data = resp.json()
        # RD may return a list with a single object
        if isinstance(data, list) and data:
            data = data[0]
        hosters = data.get(infohash) or data.get(infohash.upper()) or {}
        rd = hosters.get("rd") if isinstance(hosters, dict) else None
        return bool(rd)

    def _get_torrent_info(self, torrent_id: str) -> Dict[str, object]:
        resp = self._client.get(f"{self.base_url}/torrents/info/{torrent_id}")
        resp.raise_for_status()
        return resp.json()

    def _finalize_submission(self, torrent_id: str) -> DebridTorrent:
        data = self._get_torrent_info(torrent_id)
        status = data.get("status")
        if status == "waiting_files_selection":
            file_ids = [str(f.get("id")) for f in data.get("files", []) if f.get("bytes", 0)]
            if file_ids:
                self._client.post(
                    f"{self.base_url}/torrents/selectFiles/{torrent_id}",
                    data={"files": ",".join(file_ids)},
                )
                data = self._get_torrent_info(torrent_id)

        files = self._map_files(data.get("files", []), data.get("links", []))
        added = None
        if data.get("added"):
            try:
                added = datetime.fromisoformat(str(data.get("added")).replace("Z", "+00:00"))
            except ValueError:
                added = None
        return DebridTorrent(
            id=data.get("id", ""),
            name=data.get("filename", ""),
            status=data.get("status", ""),
            files=self._with_torrent_id(files, data.get("id", "")),
            info_hash=data.get("hash"),
            added=added,
            original_name=data.get("original_filename"),
            bytes=data.get("bytes"),
            progress=data.get("progress"),
            speed=data.get("speed"),
            seeders=data.get("seeders"),
        )

    def unrestrict_link(self, link: str) -> DownloadLink:
        resp = self._client.post(f"{self.base_url}/unrestrict/link", data={"link": self._normalize_link(link)})
        resp.raise_for_status()
        data = resp.json()
        expires_at = datetime.utcnow() + timedelta(hours=48)
        return DownloadLink(
            link=data.get("link", link),
            download_url=data.get("download", ""),
            filename=data.get("filename", ""),
            size=int(data.get("filesize", 0) or 0),
            expires_at=expires_at,
        )

    def _map_files(self, files: List[Dict[str, object]], links: List[str]) -> Dict[str, DebridFile]:
        selected = [f for f in files if f.get("selected") == 1]
        mapped: Dict[str, DebridFile] = {}
        if len(links) == 1 and len(selected) > 1 and self.unpack_rar:
            return self._map_rar_files(selected, links[0])
        link_idx = 0
        for entry in selected:
            if link_idx >= len(links):
                break
            name = str(entry.get("path", "")).split("/")[-1]
            file_id = str(entry.get("id", ""))
            size = int(entry.get("bytes", 0) or 0)
            mapped[name] = DebridFile(id=file_id, name=name, size=size, link=links[link_idx])
            link_idx += 1
        return mapped

    @staticmethod
    def _with_torrent_id(files: Dict[str, DebridFile], torrent_id: str) -> Dict[str, DebridFile]:
        for file in files.values():
            file.torrent_id = torrent_id
        return files

    def _map_rar_files(self, selected: List[Dict[str, object]], link: str) -> Dict[str, DebridFile]:
        try:
            dl = self.unrestrict_link(link)
        except Exception:
            return self._rar_fallback(selected, link)

        try:
            infos = list_rar_files(dl.download_url, dl.size)
        except Exception:
            return self._rar_fallback(selected, link)

        file_map: Dict[str, Dict[str, object]] = {}
        for entry in selected:
            name = str(entry.get("path", "")).split("/")[-1]
            safe_name = (
                name.replace("|", "_")
                .replace("\"", "_")
                .replace("\\", "_")
                .replace("?", "_")
                .replace("*", "_")
                .replace(":", "_")
                .replace("<", "_")
                .replace(">", "_")
            )
            file_map[safe_name] = entry

        mapped: Dict[str, DebridFile] = {}
        for info in infos:
            if info.is_dir():
                continue
            base_name = info.filename.split("/")[-1]
            selected_entry = file_map.get(base_name)
            if not selected_entry:
                continue
            original_name = str(selected_entry.get("path", "")).split("/")[-1]
            file_id = str(selected_entry.get("id", ""))
            mapped[original_name] = DebridFile(
                id=file_id,
                name=original_name,
                size=info.file_size,
                link=link,
                is_rar=True,
                rar_path=info.filename,
                archive_size=dl.size,
            )

        if not mapped:
            return self._rar_fallback(selected, link)
        return mapped

    def _rar_fallback(self, selected: List[Dict[str, object]], link: str) -> Dict[str, DebridFile]:
        if not selected:
            return {}
        name = str(selected[0].get("path", "")).split("/")[-1] or "archive.rar"
        size = int(selected[0].get("bytes", 0) or 0)
        file_id = str(selected[0].get("id", ""))
        return {name: DebridFile(id=file_id, name=name, size=size, link=link, is_rar=False)}

    @staticmethod
    def _normalize_link(link: str) -> str:
        if link.startswith("https://real-debrid.com/d/") and len(link) > 39:
            return link[:39]
        return link

    def close(self) -> None:
        self._client.close()
