from __future__ import annotations

from pathlib import Path

from wsgidav.wsgidav_app import WsgiDAVApp

from decypharr.services.context import AppContext
from decypharr.webdav.provider import DebridProvider


def create_webdav_app(ctx: AppContext) -> WsgiDAVApp:
    provider = DebridProvider(ctx.debrids.caches)
    cfg = ctx.config_manager.load()
    url_base = cfg.url_base.rstrip("/")
    if url_base == "":
        url_base = ""
    mount_path = f"{url_base}/webdav"
    config = {
        "provider_mapping": {"/": provider},
        "mount_path": mount_path,
        "simple_dc": {"user_mapping": {"*": True}},
        "http_authenticator": {
            "accept_basic": True,
            "accept_digest": True,
            "default_to_digest": False,
        },
        "dir_browser": {"enable": True},
        "verbose": 1,
    }

    return WsgiDAVApp(config)
