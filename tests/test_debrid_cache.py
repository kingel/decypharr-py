from __future__ import annotations

from datetime import datetime

from decypharr.debrid.base import DebridClient
from decypharr.debrid.cache import DebridCache
from decypharr.debrid.models import DebridFile, DebridTorrent, DownloadLink


class FakeClient(DebridClient):
    name = "fake"

    def __init__(self):
        self.calls = 0

    def get_profile(self):
        return None  # not used

    def list_torrents(self):
        return [
            DebridTorrent(
                id="1",
                name="TorrentA.mkv",
                status="downloaded",
                added=datetime.utcnow(),
                original_name="Original.Name.mkv",
                info_hash="ABC123",
            )
        ]

    def get_torrent(self, torrent_id: str):
        return DebridTorrent(
            id="1",
            name="TorrentA",
            status="downloaded",
            files={"file.mkv": DebridFile(id="f1", name="file.mkv", size=123, link="link1")},
        )

    def unrestrict_link(self, link: str):
        return DownloadLink(link=link, download_url="http://example.com/file", filename="file.mkv", size=123)

    def submit_magnet(self, magnet: str) -> DebridTorrent:
        return DebridTorrent(id="1", name="TorrentA", status="downloaded")

    def submit_torrent_file(self, data: bytes) -> DebridTorrent:
        return DebridTorrent(id="1", name="TorrentA", status="downloaded")

    def delete_torrent(self, torrent_id: str) -> None:
        return None


def test_cache_lists_and_fetches_files():
    cache = DebridCache(FakeClient())
    torrents = cache.list_torrents()
    assert torrents[0].name == "TorrentA.mkv"

    folder = cache.folder_names()[0]
    files = cache.get_files_for_folder(folder)
    assert "file.mkv" in files

    url = cache.get_download_url(files["file.mkv"])
    assert url == "http://example.com/file"


def test_folder_naming_modes():
    cache = DebridCache(FakeClient(), folder_naming="original_no_ext")
    folders = cache.folder_names()
    assert "Original.Name" in folders

    cache = DebridCache(FakeClient(), folder_naming="infohash")
    folders = cache.folder_names()
    assert "ABC123" in folders


def test_bad_detection_status():
    cache = DebridCache(FakeClient())
    bad = DebridTorrent(id="2", name="Bad", status="error")
    assert cache.is_bad(bad) is True
