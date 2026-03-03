from __future__ import annotations

import httpx

from decypharr.arr import ArrClient
from decypharr.config import Arr as ArrConfig
from decypharr.services.arr_cleanup import remove_completed_from_decypharr
from decypharr.storage.torrents import TorrentStore

from types import SimpleNamespace


def _response(status: int, json_data=None):
    return httpx.Response(
        status_code=status,
        json=json_data,
        request=httpx.Request("GET", "http://example"),
    )


class StubArr(ArrClient):
    def __init__(self):
        cfg = ArrConfig(
            name="sonarr",
            host="http://example",
            token="token",
            cleanup=True,
            skip_repair=False,
            download_uncached=None,
            selected_debrid=None,
            source="manual",
        )
        super().__init__(cfg)
        self.calls = []
        self.responses = []

    def _request(self, method: str, endpoint: str, payload=None):
        self.calls.append((method, endpoint, payload))
        return self.responses.pop(0)


class QueueArr(ArrClient):
    def __init__(self, name: str, queue: list[dict]):
        cfg = ArrConfig(
            name=name,
            host="http://example",
            token="token",
            cleanup=False,
            auto_remove_completed=True,
            skip_repair=False,
            download_uncached=None,
            selected_debrid=None,
            source="manual",
        )
        super().__init__(cfg)
        self._queue = queue

    def get_queue(self) -> list[dict]:
        return self._queue


def test_cleanup_queue_removes_messed_up_items():
    arr = StubArr()
    arr.responses = [
        _response(
            200,
            {
                "page": 1,
                "pageSize": 200,
                "totalRecords": 1,
                "records": [
                    {
                        "id": 42,
                        "protocol": "torrent",
                        "status": "completed",
                        "trackedDownloadStatus": "warning",
                        "trackedDownloadState": "importPending",
                        "statusMessages": [
                            {"title": "warning", "messages": ["No files found are eligible for import"]}
                        ],
                    }
                ],
            },
        ),
        _response(200, {}),
    ]

    arr.cleanup_queue()

    assert arr.calls[0][0] == "GET"
    assert "api/v3/queue" in arr.calls[0][1]
    assert arr.calls[1][0] == "DELETE"
    assert "api/v3/queue/bulk" in arr.calls[1][1]
    assert "removeFromClient=true" in arr.calls[1][1]
    assert arr.calls[1][2] == {"ids": [42]}


def test_cleanup_queue_noop_when_empty():
    arr = StubArr()
    arr.responses = [
        _response(
            200,
            {
                "page": 1,
                "pageSize": 200,
                "totalRecords": 0,
                "records": [],
            },
        )
    ]

    arr.cleanup_queue()

    assert len(arr.calls) == 1


def test_auto_remove_completed_removes_processed_not_in_queue(tmp_path):
    store = TorrentStore(tmp_path / "torrents.json")
    t_keep = store.add(name="Keep", category="radarr", hash_value="aaa", state="pausedUP")
    store.update(t_keep.hash, processed=True, progress=1.0)
    t_remove = store.add(name="Remove", category="radarr", hash_value="bbb", state="pausedUP")
    store.update(t_remove.hash, processed=True, progress=1.0)
    t_other = store.add(name="Other", category="sonarr", hash_value="ccc", state="pausedUP")
    store.update(t_other.hash, processed=True, progress=1.0)
    t_incomplete = store.add(name="Incomplete", category="radarr", hash_value="ddd", state="downloading")
    store.update(t_incomplete.hash, processed=True, progress=0.5)

    arr = QueueArr("radarr", [{"protocol": "torrent", "downloadId": "aaa"}])
    ctx = SimpleNamespace(torrents=store)

    removed = remove_completed_from_decypharr(ctx, arr)

    assert removed == 1
    assert store.get("bbb") is None
    assert store.get("aaa") is not None
    assert store.get("ccc") is not None
    assert store.get("ddd") is not None
