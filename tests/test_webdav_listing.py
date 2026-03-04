from __future__ import annotations

from datetime import datetime, timedelta

from decypharr.debrid.base import DebridClient
from decypharr.debrid.cache import DebridCache
from decypharr.debrid.models import DebridProfile, DebridTorrent, DownloadLink
from decypharr.webdav.provider import DELETE_ALL_BAD_TORRENTS, DebridProvider


class FakeDebridClient(DebridClient):
    name = "fake"

    def __init__(self, torrents: list[DebridTorrent]) -> None:
        self._torrents = {torrent.id: torrent for torrent in torrents}
        self.deleted: list[str] = []

    def get_profile(self) -> DebridProfile:
        return DebridProfile(name="fake", username="fake")

    def submit_magnet(self, magnet: str) -> DebridTorrent:  # pragma: no cover - not used
        raise NotImplementedError

    def submit_torrent_file(self, data: bytes) -> DebridTorrent:  # pragma: no cover - not used
        raise NotImplementedError

    def list_torrents(self) -> list[DebridTorrent]:
        return list(self._torrents.values())

    def delete_torrent(self, torrent_id: str) -> None:
        self.deleted.append(torrent_id)
        self._torrents.pop(torrent_id, None)

    def get_torrent(self, torrent_id: str) -> DebridTorrent:
        return self._torrents[torrent_id]

    def unrestrict_link(self, link: str) -> DownloadLink:  # pragma: no cover - not used
        return DownloadLink(link=link, download_url="http://example.com/file", filename="file", size=1)


def _make_provider(torrents: list[DebridTorrent]) -> DebridProvider:
    client = FakeDebridClient(torrents)
    cache = DebridCache(client)
    return DebridProvider(lambda: {"fake": cache})


def test_webdav_bad_folder_present_when_empty():
    torrents = [
        DebridTorrent(
            id="t1",
            name="Good.Movie.mkv",
            status="downloading",
            added=datetime.utcnow() - timedelta(hours=1),
        )
    ]
    provider = _make_provider(torrents)
    debrid = provider.get_resource_inst("/fake", {"wsgidav.provider": provider})
    names = debrid.get_member_names()
    assert "__bad__" in names


def test_webdav_bad_listing_and_delete():
    bad = DebridTorrent(
        id="bad1",
        name="Bad.Movie.mkv",
        status="error",
        added=datetime.utcnow() - timedelta(hours=2),
    )
    worse = DebridTorrent(
        id="bad2",
        name="Worse.Movie.mkv",
        status="error",
        added=datetime.utcnow() - timedelta(hours=3),
    )
    good = DebridTorrent(
        id="good1",
        name="Good.Movie.mkv",
        status="downloading",
        added=datetime.utcnow() - timedelta(hours=1),
    )
    provider = _make_provider([bad, worse, good])
    cache = provider.caches["fake"]

    env = {"wsgidav.provider": provider}
    bad_folder = provider.get_resource_inst("/fake/__bad__", env)
    listing = bad_folder.get_member_names()
    assert f"{cache.folder_name(bad)} || {bad.id}" in listing
    assert f"{cache.folder_name(worse)} || {worse.id}" in listing

    delete_one = provider.get_resource_inst(f"/fake/__bad__/{bad.id}", env)
    delete_one.delete()
    assert bad.id in cache.client.deleted
    assert cache.get_torrent_by_id(bad.id) is None

    delete_all = provider.get_resource_inst(f"/fake/__bad__/{DELETE_ALL_BAD_TORRENTS}", env)
    delete_all.delete()
    assert worse.id in cache.client.deleted
