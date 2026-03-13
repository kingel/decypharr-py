from __future__ import annotations

import json
import urllib.parse
from pathlib import Path
from types import SimpleNamespace

from fastapi.testclient import TestClient

from decypharr.app import create_app
from decypharr.config import ConfigManager, Debrid
from decypharr.debrid.models import DebridFile, DebridProfile, DebridTorrent
from decypharr.torrent_utils import parse_magnet_infohash


def _make_app(tmp_path: Path):
    manager = ConfigManager(tmp_path)
    cfg = manager.load()
    cfg.use_auth = False
    cfg.url_base = "/"
    cfg.debrids = [Debrid(name="", api_key="key", folder="folder")]
    if cfg.qbittorrent.download_folder:
        Path(cfg.qbittorrent.download_folder).mkdir(parents=True, exist_ok=True)
    manager.save(cfg)
    return create_app(tmp_path)


def _make_invalid_app(tmp_path: Path):
    manager = ConfigManager(tmp_path)
    cfg = manager.load()
    cfg.use_auth = False
    cfg.url_base = "/"
    manager.save(cfg)
    return create_app(tmp_path)


def _make_auth_app(tmp_path: Path, with_auth: bool = False):
    manager = ConfigManager(tmp_path)
    cfg = manager.load()
    cfg.use_auth = True
    cfg.url_base = "/"
    cfg.debrids = [Debrid(name="", api_key="key", folder="folder")]
    if cfg.qbittorrent.download_folder:
        Path(cfg.qbittorrent.download_folder).mkdir(parents=True, exist_ok=True)
    manager.save(cfg)
    if with_auth:
        manager.ensure_auth("user", "pass")
    return create_app(tmp_path)


def test_root_page(tmp_path: Path):
    app = _make_app(tmp_path)
    client = TestClient(app)
    response = client.get("/")
    assert response.status_code == 200
    assert "Decypharr" in response.text


def test_version_endpoint(tmp_path: Path):
    app = _make_app(tmp_path)
    client = TestClient(app)
    response = client.get("/version")
    assert response.status_code == 200
    data = response.json()
    assert "version" in data
    assert "channel" in data


def test_qbit_preferences_shape(tmp_path: Path):
    app = _make_app(tmp_path)
    client = TestClient(app)
    response = client.get("/api/v2/app/preferences")
    assert response.status_code == 200
    data = response.json()
    assert "save_path" in data
    assert "temp_path" in data
    assert "web_ui_username" in data
    assert "add_trackers_enabled" in data


def test_qbit_login_rejects_invalid_when_auth_enabled(tmp_path: Path):
    manager = ConfigManager(tmp_path)
    cfg = manager.load()
    cfg.use_auth = True
    cfg.debrids = [Debrid(name="", api_key="key", folder="folder")]
    if cfg.qbittorrent.download_folder:
        Path(cfg.qbittorrent.download_folder).mkdir(parents=True, exist_ok=True)
    manager.save(cfg)
    manager.ensure_auth("user", "pass")
    app = create_app(tmp_path)
    client = TestClient(app)

    response = client.post(
        "/api/v2/auth/login", data={"username": "bad", "password": "bad"}
    )
    assert response.status_code == 401
    assert response.text.strip() == "unauthorized: invalid credentials"


def test_qbit_auth_requires_credentials_when_enabled(tmp_path: Path):
    manager = ConfigManager(tmp_path)
    cfg = manager.load()
    cfg.use_auth = True
    cfg.debrids = [Debrid(name="", api_key="key", folder="folder")]
    if cfg.qbittorrent.download_folder:
        Path(cfg.qbittorrent.download_folder).mkdir(parents=True, exist_ok=True)
    manager.save(cfg)
    manager.ensure_auth("user", "pass")
    app = create_app(tmp_path)
    client = TestClient(app)

    response = client.get("/api/v2/torrents/info")
    assert response.status_code == 401
    assert (
        response.text.strip()
        == "unauthorized: Host and token are required for authentication(you've enabled authentication)"
    )


def test_secret_key_is_generated_and_persisted(tmp_path: Path, monkeypatch):
    monkeypatch.delenv("DECYPHARR_SECRET_KEY", raising=False)
    manager = ConfigManager(tmp_path)

    secret = manager.secret_key()

    assert secret
    assert manager.secret_path.exists()
    assert manager.secret_path.read_text().strip() == secret


def test_secret_key_is_stable_for_same_config_path(tmp_path: Path, monkeypatch):
    monkeypatch.delenv("DECYPHARR_SECRET_KEY", raising=False)

    first = ConfigManager(tmp_path).secret_key()
    second = ConfigManager(tmp_path).secret_key()

    assert first == second


def test_secret_key_env_overrides_persisted_secret(tmp_path: Path, monkeypatch):
    monkeypatch.delenv("DECYPHARR_SECRET_KEY", raising=False)
    manager = ConfigManager(tmp_path)
    generated = manager.secret_key()

    monkeypatch.setenv("DECYPHARR_SECRET_KEY", "override-secret")

    assert ConfigManager(tmp_path).secret_key() == "override-secret"
    assert manager.secret_path.read_text().strip() == generated


def test_register_allows_bootstrap_without_auth(tmp_path: Path):
    app = _make_auth_app(tmp_path)
    client = TestClient(app)

    response = client.post(
        "/register",
        data={"username": "alice", "password": "secret", "confirmPassword": "secret"},
    )

    assert response.status_code == 200
    assert app.state.ctx.config_manager.verify_auth("alice", "secret")


def test_register_blocks_unauthenticated_after_bootstrap(tmp_path: Path):
    app = _make_auth_app(tmp_path)
    client = TestClient(app)

    first = client.post(
        "/register",
        data={"username": "alice", "password": "secret", "confirmPassword": "secret"},
    )
    assert first.status_code == 200

    client.cookies.clear()
    second = client.post(
        "/register",
        data={"username": "eve", "password": "hijack", "confirmPassword": "hijack"},
    )
    assert second.status_code == 403


def test_register_allows_authenticated_update_after_bootstrap(tmp_path: Path):
    app = _make_auth_app(tmp_path, with_auth=True)
    client = TestClient(app)

    login = client.post("/login", json={"username": "user", "password": "pass"})
    assert login.status_code == 200

    response = client.post(
        "/register",
        data={"username": "admin", "password": "newpass", "confirmPassword": "newpass"},
    )
    assert response.status_code == 200
    assert app.state.ctx.config_manager.verify_auth("admin", "newpass")
    assert not app.state.ctx.config_manager.verify_auth("user", "pass")


def test_skip_auth_route_removed(tmp_path: Path):
    app = _make_auth_app(tmp_path)
    client = TestClient(app)
    response = client.post("/skip-auth")
    assert response.status_code == 404


def test_qbit_add_and_list(tmp_path: Path):
    app = _make_app(tmp_path)
    client = TestClient(app)

    add_resp = client.post(
        "/api/v2/torrents/add",
        data={"urls": "magnet:?xt=urn:btih:testhash", "category": "sonarr"},
    )
    assert add_resp.status_code == 200

    list_resp = client.get("/api/v2/torrents/info")
    assert list_resp.status_code == 200
    items = list_resp.json()
    assert len(items) == 1
    assert items[0]["category"] == "sonarr"


def test_qbit_add_requires_urls(tmp_path: Path):
    app = _make_app(tmp_path)
    client = TestClient(app)

    add_resp = client.post("/api/v2/torrents/add", data={})
    assert add_resp.status_code == 400
    assert add_resp.text.strip() == "No valid URLs or torrents provided"


def test_setup_redirects_to_settings_when_invalid(tmp_path: Path):
    app = _make_invalid_app(tmp_path)
    client = TestClient(app)

    response = client.get("/", follow_redirects=False)
    assert response.status_code == 303
    location = urllib.parse.unquote(response.headers["location"])
    assert location.endswith("/settings?inco=no debrids configured")

    config_resp = client.get("/api/config", follow_redirects=False)
    assert config_resp.status_code == 200


def test_setup_strips_inco_when_valid(tmp_path: Path):
    app = _make_app(tmp_path)
    client = TestClient(app)

    response = client.get(
        "/settings?inco=repair%20interval%20is%20required", follow_redirects=False
    )
    assert response.status_code == 303
    assert response.headers["location"].endswith("/settings")


def test_qbit_trackers_peers_fileprio(tmp_path: Path):
    app = _make_app(tmp_path)
    client = TestClient(app)

    tracker_a = "udp://tracker.example.com:1337/announce"
    tracker_b = "http://tracker.example.org/announce"
    magnet = (
        "magnet:?xt=urn:btih:testhash"
        f"&tr={urllib.parse.quote(tracker_a)}"
        f"&tr={urllib.parse.quote(tracker_b)}"
    )
    add_resp = client.post(
        "/api/v2/torrents/add",
        data={"urls": magnet, "category": "sonarr"},
    )
    assert add_resp.status_code == 200
    torrents = client.get("/api/v2/torrents/info").json()
    assert torrents
    torrent_hash = torrents[0]["hash"]

    trackers = client.get("/api/v2/torrents/trackers", params={"hash": torrent_hash})
    assert trackers.status_code == 200
    tracker_urls = {item["url"] for item in trackers.json()}
    assert tracker_a in tracker_urls
    assert tracker_b in tracker_urls

    peers = client.get("/api/v2/torrents/peers", params={"hash": torrent_hash})
    assert peers.status_code == 200
    data = peers.json()
    assert "peers" in data

    prio = client.post(
        "/api/v2/torrents/filePrio",
        data={"hash": torrent_hash, "id": "0", "priority": "1"},
    )
    assert prio.status_code == 200
    stored = app.state.ctx.torrents.get(torrent_hash)
    assert stored
    assert stored.file_priorities.get(0) == 1


def test_qbit_delete_requires_hashes(tmp_path: Path):
    app = _make_app(tmp_path)
    client = TestClient(app)

    resp = client.post("/api/v2/torrents/delete", data={})
    assert resp.status_code == 400
    assert resp.text.strip() == "No hashes provided"


def test_ui_add_populates_dashboard(tmp_path: Path):
    app = _make_app(tmp_path)
    client = TestClient(app)

    resp = client.post(
        "/api/add",
        data={
            "urls": "magnet:?xt=urn:btih:testhash",
            "arr": "sonarr",
            "downloadFolder": "/downloads",
        },
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["results"]

    torrents = client.get("/api/torrents").json()
    assert len(torrents) == 1
    assert torrents[0]["category"] == "sonarr"


def test_add_rejects_uncached_when_disabled(tmp_path: Path):
    app = _make_app(tmp_path)
    ctx = app.state.ctx
    cfg = ctx.config_manager.load()
    cfg.debrids = [
        {
            "name": "realdebrid",
            "api_key": "abc",
            "folder": "folder",
            "download_uncached": False,
        }
    ]
    ctx.config_manager.save(cfg)

    called = {"cached": False, "submitted": False}

    def fake_is_cached(name, infohash):
        called["cached"] = True
        return False

    def fake_submit_magnet(name, magnet):
        called["submitted"] = True
        raise AssertionError("Should not submit when uncached")

    ctx.debrids.is_cached = fake_is_cached  # type: ignore[assignment]
    ctx.debrids.submit_magnet = fake_submit_magnet  # type: ignore[assignment]

    client = TestClient(app)
    resp = client.post(
        "/api/add",
        data={"urls": "magnet:?xt=urn:btih:ABCDEF1234567890ABCDEF1234567890ABCDEF12"},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["errors"]
    assert called["cached"] is True
    assert called["submitted"] is False


def test_add_uses_cached_many(tmp_path: Path):
    app = _make_app(tmp_path)
    ctx = app.state.ctx
    cfg = ctx.config_manager.load()
    cfg.debrids = [
        {
            "name": "realdebrid",
            "api_key": "abc",
            "folder": "folder",
            "download_uncached": False,
        }
    ]
    ctx.config_manager.save(cfg)

    calls = {"many": None, "single": 0}

    def fake_cached_many(name, hashes):
        calls["many"] = list(hashes)
        return {h: True for h in hashes}

    def fake_cached_single(name, infohash):
        calls["single"] += 1
        return True

    def fake_submit(name, magnet):
        return DebridTorrent(
            id="1",
            name="Batch",
            status="downloaded",
            info_hash=parse_magnet_infohash(magnet),
        )

    ctx.debrids.is_cached_many = fake_cached_many  # type: ignore[assignment]
    ctx.debrids.is_cached = fake_cached_single  # type: ignore[assignment]
    ctx.debrids.submit_magnet = fake_submit  # type: ignore[assignment]

    magnet_a = "magnet:?xt=urn:btih:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    magnet_b = "magnet:?xt=urn:btih:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
    client = TestClient(app)
    resp = client.post("/api/add", data={"urls": f"{magnet_a}\n{magnet_b}"})
    assert resp.status_code == 200
    data = resp.json()
    assert len(data["results"]) == 2
    assert calls["single"] == 0
    assert set(calls["many"] or []) == {
        parse_magnet_infohash(magnet_a),
        parse_magnet_infohash(magnet_b),
    }


def test_qbit_add_uses_cached_many(tmp_path: Path):
    app = _make_app(tmp_path)
    ctx = app.state.ctx
    cfg = ctx.config_manager.load()
    cfg.debrids = [
        {
            "name": "realdebrid",
            "api_key": "abc",
            "folder": "folder",
            "download_uncached": False,
        }
    ]
    ctx.config_manager.save(cfg)

    calls = {"many": None, "single": 0}

    def fake_cached_many(name, hashes):
        calls["many"] = list(hashes)
        return {h: True for h in hashes}

    def fake_cached_single(name, infohash):
        calls["single"] += 1
        return True

    def fake_submit(name, magnet):
        return DebridTorrent(
            id="1",
            name="Batch",
            status="downloaded",
            info_hash=parse_magnet_infohash(magnet),
        )

    ctx.debrids.is_cached_many = fake_cached_many  # type: ignore[assignment]
    ctx.debrids.is_cached = fake_cached_single  # type: ignore[assignment]
    ctx.debrids.submit_magnet = fake_submit  # type: ignore[assignment]
    ctx.debrids.entries = lambda: {"realdebrid": object()}  # type: ignore[assignment]

    magnet_a = "magnet:?xt=urn:btih:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    magnet_b = "magnet:?xt=urn:btih:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
    client = TestClient(app)
    resp = client.post(
        "/api/v2/torrents/add",
        data={"urls": f"{magnet_a}\n{magnet_b}", "category": "radarr"},
    )
    assert resp.status_code == 200
    assert calls["single"] == 0
    assert set(calls["many"] or []) == {
        parse_magnet_infohash(magnet_a),
        parse_magnet_infohash(magnet_b),
    }


def test_delete_remove_from_debrid_calls_client(tmp_path: Path):
    app = _make_app(tmp_path)
    ctx = app.state.ctx
    torrent = ctx.torrents.add(
        name="Test", category="sonarr", debrid="realdebrid", debrid_id="rd123"
    )

    called = {"deleted": False}

    def fake_delete(name, torrent_id):
        called["deleted"] = True
        assert name == "realdebrid"
        assert torrent_id == "rd123"

    ctx.debrids.delete_torrent = fake_delete  # type: ignore[assignment]

    client = TestClient(app)
    resp = client.delete(f"/api/torrents/sonarr/{torrent.hash}?removeFromDebrid=true")
    assert resp.status_code == 200
    assert called["deleted"] is True


def test_static_assets(tmp_path: Path):
    app = _make_app(tmp_path)
    client = TestClient(app)
    response = client.get("/assets/css/main.css")
    assert response.status_code == 200


def test_config_round_trip_directories(tmp_path: Path):
    app = _make_app(tmp_path)
    client = TestClient(app)

    payload = {
        "debrids": [
            {
                "name": "realdebrid",
                "api_key": "abc",
                "folder": "/mnt/rd",
                "use_webdav": True,
                "folder_naming": "original_no_ext",
                "directories": {
                    "recent": {"filters": {"last_added": "7d"}},
                },
            }
        ],
        "qbittorrent": {},
        "arrs": [],
        "repair": {},
        "rclone": {},
    }

    resp = client.post("/api/config", json=payload)
    assert resp.status_code == 200

    get_resp = client.get("/api/config")
    assert get_resp.status_code == 200
    data = get_resp.json()
    assert data["debrids"][0]["directories"]["recent"]["filters"]["last_added"] == "7d"


def test_stats_debrid_library_fields(tmp_path: Path):
    app = _make_app(tmp_path)
    ctx = app.state.ctx

    class FakeProfileClient:
        def get_profile(self):
            return DebridProfile(name="TorBox", username="tester")

    torrents = [
        DebridTorrent(
            id="1",
            name="A",
            status="downloaded",
            bytes=100,
            files={"a.mkv": DebridFile(id="f1", name="a.mkv", size=100, link="link1")},
        ),
        DebridTorrent(
            id="2",
            name="B",
            status="downloaded",
            bytes=200,
            files={
                "b.mkv": DebridFile(id="f2", name="b.mkv", size=200, link=""),
                "c.mkv": DebridFile(id="f3", name="c.mkv", size=300, link="link2"),
            },
        ),
    ]

    class FakeCache:
        def list_torrents(self):
            return torrents

        def is_bad(self, torrent):
            return torrent.id == "2"

    ctx.debrids.entries = lambda: {
        "torbox": SimpleNamespace(client=FakeProfileClient())
    }  # type: ignore[assignment]
    ctx.debrids.cache = lambda name: FakeCache()  # type: ignore[assignment]

    client = TestClient(app)
    resp = client.get("/debug/stats")
    assert resp.status_code == 200
    data = resp.json()
    assert "go_version" in data
    assert "total_alloc_mb" in data
    assert "gc_cycles" in data
    debrid = next(item for item in data["debrids"] if item["service"] == "torbox")
    library = debrid["library"]
    assert library["total"] == 2
    assert library["bad"] == 1
    assert library["files"] == 3
    assert library["active_links"] == 2
    assert library["total_bytes"] == 300


def test_debug_stats_requires_auth(tmp_path: Path):
    app = _make_auth_app(tmp_path, with_auth=True)
    client = TestClient(app)
    response = client.get("/debug/stats")
    assert response.status_code == 401


def test_api_allows_bearer_token(tmp_path: Path):
    app = _make_auth_app(tmp_path, with_auth=True)
    token = app.state.ctx.config_manager.load().auth.api_token
    client = TestClient(app)

    response = client.get("/api/config", headers={"Authorization": f"Bearer {token}"})

    assert response.status_code == 200
    data = response.json()
    assert data["auth_username"] == "user"


def test_api_rejects_invalid_bearer_token(tmp_path: Path):
    app = _make_auth_app(tmp_path, with_auth=True)
    client = TestClient(app)

    response = client.get(
        "/api/config", headers={"Authorization": "Bearer invalid-token"}
    )

    assert response.status_code == 401


def test_debug_allows_bearer_token(tmp_path: Path):
    app = _make_auth_app(tmp_path, with_auth=True)
    token = app.state.ctx.config_manager.load().auth.api_token
    client = TestClient(app)

    response = client.get("/debug/stats", headers={"Authorization": f"Bearer {token}"})

    assert response.status_code == 200


def test_refresh_token_rotates_bearer_auth(tmp_path: Path):
    app = _make_auth_app(tmp_path, with_auth=True)
    token = app.state.ctx.config_manager.load().auth.api_token
    client = TestClient(app)

    refresh = client.post(
        "/api/refresh-token", headers={"Authorization": f"Bearer {token}"}
    )
    assert refresh.status_code == 200
    new_token = refresh.json()["token"]
    assert new_token != token

    old_response = client.get(
        "/api/config", headers={"Authorization": f"Bearer {token}"}
    )
    assert old_response.status_code == 401

    new_response = client.get(
        "/api/config", headers={"Authorization": f"Bearer {new_token}"}
    )
    assert new_response.status_code == 200


def test_debug_stats_allows_authenticated(tmp_path: Path):
    app = _make_auth_app(tmp_path, with_auth=True)
    client = TestClient(app)
    login = client.post("/login", json={"username": "user", "password": "pass"})
    assert login.status_code == 200
    response = client.get("/debug/stats")
    assert response.status_code == 200


def test_debug_logs_requires_auth(tmp_path: Path):
    app = _make_auth_app(tmp_path, with_auth=True)
    client = TestClient(app)
    response = client.get("/debug/logs")
    assert response.status_code == 401


def test_qbit_sid_does_not_contain_password(tmp_path: Path):
    app = _make_auth_app(tmp_path, with_auth=True)
    client = TestClient(app)
    resp = client.post(
        "/api/v2/auth/login", data={"username": "user", "password": "pass"}
    )
    assert resp.status_code == 200
    sid = client.cookies.get("sid") or ""
    assert sid, "SID cookie should be set"
    import base64
    try:
        decoded = base64.urlsafe_b64decode(sid).decode("utf-8")
    except Exception:
        decoded = ""
    assert "pass" not in decoded


def test_qbit_sid_authenticates_subsequent_request(tmp_path: Path):
    app = _make_auth_app(tmp_path, with_auth=True)
    client = TestClient(app)
    login = client.post(
        "/api/v2/auth/login", data={"username": "user", "password": "pass"}
    )
    assert login.status_code == 200
    assert client.cookies.get("sid"), "SID cookie should be set after login"
    resp = client.get("/api/v2/torrents/info")
    assert resp.status_code == 200


def test_torrent_store_concurrent_updates(tmp_path: Path):
    import threading
    from decypharr.storage.torrents import TorrentStore
    store = TorrentStore(tmp_path / "torrents.json")
    torrent = store.add(name="base", hash_value="aaa")

    errors = []
    def worker(i):
        try:
            store.update("aaa", name=f"worker-{i}")
        except Exception as exc:
            errors.append(exc)

    threads = [threading.Thread(target=worker, args=(i,)) for i in range(20)]
    for t in threads:
        t.start()
    for t in threads:
        t.join()

    assert not errors
    data = json.loads((tmp_path / "torrents.json").read_text())
    assert len(data) == 1


def test_torrent_store_atomic_write_no_tmp_left(tmp_path: Path):
    from decypharr.storage.torrents import TorrentStore
    store = TorrentStore(tmp_path / "torrents.json")
    store.add(name="t1", hash_value="bbb")
    assert not (tmp_path / "torrents.tmp").exists()
    assert (tmp_path / "torrents.json").exists()


def test_arr_client_tls_secure_by_default():
    from decypharr.config import Arr as ArrConfig
    from decypharr.arr import ArrClient
    client = ArrClient(ArrConfig(name="test", host="https://arr.local", token="tok"))
    assert client.insecure_tls is False


def test_arr_client_tls_insecure_when_opted_in():
    from decypharr.config import Arr as ArrConfig
    from decypharr.arr import ArrClient
    client = ArrClient(ArrConfig(name="test", host="https://arr.local", token="tok", insecure_tls=True))
    assert client.insecure_tls is True
