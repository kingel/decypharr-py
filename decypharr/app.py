from __future__ import annotations

import os
import asyncio
import base64
from pathlib import Path
from contextlib import asynccontextmanager, suppress

from fastapi import FastAPI, Request
from fastapi.responses import PlainTextResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.responses import Response
from starlette.middleware.sessions import SessionMiddleware
from a2wsgi import WSGIMiddleware

from decypharr.services.context import AppContext
from decypharr.services.arr_cleanup import poll_arr_cleanup
from decypharr.services.poller import poll_debrid
from decypharr.services.webdav import create_webdav_app
from decypharr.routes import api as api_routes
from decypharr.routes import debug as debug_routes
from decypharr.routes import qbit as qbit_routes
from decypharr.routes import ui as ui_routes


BASE_DIR = Path(__file__).resolve().parent
TEMPLATES_DIR = BASE_DIR / "web" / "templates"
STATIC_DIR = BASE_DIR / "web" / "static" / "build"
IMAGES_DIR = BASE_DIR / "web" / "images"


def create_app(config_path: Path) -> FastAPI:
    ctx = AppContext.from_path(config_path)
    cfg = ctx.config_manager.load()

    @asynccontextmanager
    async def lifespan(app: FastAPI):
        if ctx.rclone:
            ctx.rclone.start()
            sync = getattr(ctx.rclone, "sync_mounts", None)
            if callable(sync):
                sync()
        app.state.poller_task = asyncio.create_task(poll_debrid(ctx))
        app.state.arr_cleanup_task = asyncio.create_task(poll_arr_cleanup(ctx))
        try:
            yield
        finally:
            task = getattr(app.state, "poller_task", None)
            if task:
                task.cancel()
                with suppress(asyncio.CancelledError):
                    await task
            task = getattr(app.state, "arr_cleanup_task", None)
            if task:
                task.cancel()
                with suppress(asyncio.CancelledError):
                    await task
            if ctx.rclone:
                ctx.rclone.stop()

    app = FastAPI(title="Decypharr", lifespan=lifespan)
    app.add_middleware(SessionMiddleware, secret_key=ctx.config_manager.secret_key())

    templates = Jinja2Templates(directory=str(TEMPLATES_DIR))
    templates.env.globals["vite_dev"] = bool(os.getenv("VITE_DEV"))
    app.state.templates = templates
    app.state.ctx = ctx

    @app.exception_handler(qbit_routes.QbitError)
    async def qbit_error_handler(request, exc: qbit_routes.QbitError):
        return PlainTextResponse(exc.message, status_code=exc.status_code)

    prefix = cfg.url_base.rstrip("/")
    if prefix == "/":
        prefix = ""

    def _decode_basic_auth(header: str) -> tuple[str, str]:
        if not header:
            return "", ""
        parts = header.split(" ", 1)
        if len(parts) != 2 or parts[0].lower() != "basic":
            return "", ""
        try:
            decoded = base64.b64decode(parts[1]).decode("utf-8")
        except Exception:
            return "", ""
        username, sep, password = decoded.rpartition(":")
        if not sep:
            return "", ""
        return username.strip(), password.strip()

    @app.middleware("http")
    async def setup_middleware(request: Request, call_next):
        path = request.scope.get("path", "")
        settings_path = f"{prefix}/settings"
        config_path = f"{prefix}/api/config"
        setup_error = ctx.config_manager.setup_error()
        if setup_error and path not in (settings_path, config_path):
            return RedirectResponse(url=f"{settings_path}?inco={setup_error}", status_code=303)
        if not setup_error and path == settings_path and request.query_params.get("inco"):
            return RedirectResponse(url=settings_path, status_code=303)
        return await call_next(request)

    @app.middleware("http")
    async def webdav_auth_middleware(request, call_next):
        path = request.scope.get("path", "")
        if path.startswith(f"{prefix}/webdav"):
            cfg = ctx.config_manager.load()
            if cfg.use_auth and cfg.enable_webdav_auth:
                username, password = _decode_basic_auth(request.headers.get("Authorization", ""))
                if not ctx.config_manager.verify_auth(username, password):
                    return Response(
                        "Unauthorized",
                        status_code=401,
                        headers={"WWW-Authenticate": 'Basic realm="Restricted"'},
                    )
        return await call_next(request)

    app.mount(f"{prefix}/assets", StaticFiles(directory=str(STATIC_DIR)), name="assets")
    app.mount(f"{prefix}/images", StaticFiles(directory=str(IMAGES_DIR)), name="images")

    app.include_router(ui_routes.router, prefix=prefix)
    app.include_router(api_routes.router, prefix=f"{prefix}/api")
    app.include_router(qbit_routes.router, prefix=f"{prefix}/api/v2")
    app.include_router(debug_routes.router, prefix=f"{prefix}/debug")

    if cfg.webdav.enabled:
        webdav_app = create_webdav_app(ctx)
        app.mount(f"{prefix}/webdav", WSGIMiddleware(webdav_app))

    return app


def create_app_from_env() -> FastAPI:
    config_path = Path(os.getenv("DECYPHARR_CONFIG_PATH", "/data"))
    return create_app(config_path)
