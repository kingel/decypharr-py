from __future__ import annotations

import base64
from pathlib import Path

from fastapi.testclient import TestClient

from decypharr.app import create_app
from decypharr.config import ConfigManager


def _make_app(tmp_path: Path):
    manager = ConfigManager(tmp_path)
    cfg = manager.load()
    cfg.use_auth = True
    cfg.enable_webdav_auth = True
    cfg.webdav.enabled = True
    cfg.url_base = "/"
    manager.save(cfg)
    manager.ensure_auth("alice", "secret")
    return create_app(tmp_path)


def test_webdav_requires_basic_auth(tmp_path: Path):
    app = _make_app(tmp_path)
    client = TestClient(app)

    resp = client.get("/webdav/")
    assert resp.status_code == 401

    token = base64.b64encode(b"alice:secret").decode("utf-8")
    resp = client.get("/webdav/", headers={"Authorization": f"Basic {token}"})
    assert resp.status_code != 401
