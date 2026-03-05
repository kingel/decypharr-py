from __future__ import annotations

from typing import Any, Dict

from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import RedirectResponse

from decypharr import __version__
from decypharr.services.context import AppContext


def get_ctx(request: Request) -> AppContext:
    return request.app.state.ctx


def _template_context(
    request: Request, ctx: AppContext, page: str, title: str
) -> Dict[str, Any]:
    config = ctx.config_manager.load()
    return {
        "request": request,
        "page": page,
        "title": title,
        "url_base": config.url_base,
        "need_setup": ctx.config_manager.needs_setup(),
        "has_multi_debrid": len(config.debrids) > 1,
        "debrids": [d.name for d in config.debrids if d.name],
        "always_rm_tracker_urls": config.qbittorrent.always_rm_tracker_urls,
        "download_folder": config.qbittorrent.download_folder or "",
    }


def _require_auth(request: Request, ctx: AppContext) -> None:
    config = ctx.config_manager.load()
    if not config.use_auth:
        return
    if request.session.get("user"):
        return
    raise HTTPException(status_code=401, detail="Authentication required")


def _auth_initialized(ctx: AppContext) -> bool:
    auth = ctx.config_manager.load().auth
    return bool(auth and auth.username and auth.password)


router = APIRouter()


@router.get("/version")
async def version_info():
    return {"channel": "dev", "version": __version__}


@router.get("/")
async def index(request: Request, ctx: AppContext = Depends(get_ctx)):
    try:
        _require_auth(request, ctx)
    except HTTPException:
        return RedirectResponse(url=f"{ctx.config_manager.load().url_base}login")

    templates = request.app.state.templates
    return templates.TemplateResponse(
        request,
        "layout.html",
        _template_context(request, ctx, page="index", title="Dashboard"),
    )


@router.get("/download")
async def download(request: Request, ctx: AppContext = Depends(get_ctx)):
    try:
        _require_auth(request, ctx)
    except HTTPException:
        return RedirectResponse(url=f"{ctx.config_manager.load().url_base}login")

    templates = request.app.state.templates
    return templates.TemplateResponse(
        request,
        "layout.html",
        _template_context(request, ctx, page="download", title="Download"),
    )


@router.get("/repair")
async def repair(request: Request, ctx: AppContext = Depends(get_ctx)):
    try:
        _require_auth(request, ctx)
    except HTTPException:
        return RedirectResponse(url=f"{ctx.config_manager.load().url_base}login")

    templates = request.app.state.templates
    return templates.TemplateResponse(
        request,
        "layout.html",
        _template_context(request, ctx, page="repair", title="Repair"),
    )


@router.get("/stats")
async def stats(request: Request, ctx: AppContext = Depends(get_ctx)):
    try:
        _require_auth(request, ctx)
    except HTTPException:
        return RedirectResponse(url=f"{ctx.config_manager.load().url_base}login")

    templates = request.app.state.templates
    return templates.TemplateResponse(
        request,
        "layout.html",
        _template_context(request, ctx, page="stats", title="Stats"),
    )


@router.get("/settings")
async def settings(request: Request, ctx: AppContext = Depends(get_ctx)):
    try:
        _require_auth(request, ctx)
    except HTTPException:
        return RedirectResponse(url=f"{ctx.config_manager.load().url_base}login")

    templates = request.app.state.templates
    return templates.TemplateResponse(
        request,
        "layout.html",
        _template_context(request, ctx, page="config", title="Settings"),
    )


@router.get("/login")
async def login_page(request: Request, ctx: AppContext = Depends(get_ctx)):
    templates = request.app.state.templates
    return templates.TemplateResponse(
        request,
        "layout.html",
        _template_context(request, ctx, page="login", title="Login"),
    )


@router.post("/login")
async def login(request: Request, ctx: AppContext = Depends(get_ctx)):
    payload = await request.json()
    username = payload.get("username", "")
    password = payload.get("password", "")

    if not ctx.config_manager.verify_auth(username, password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    request.session["user"] = username
    return {"ok": True}


@router.get("/register")
async def register_page(request: Request, ctx: AppContext = Depends(get_ctx)):
    templates = request.app.state.templates
    return templates.TemplateResponse(
        request,
        "layout.html",
        _template_context(request, ctx, page="register", title="Register"),
    )


@router.post("/register")
async def register(request: Request, ctx: AppContext = Depends(get_ctx)):
    if _auth_initialized(ctx) and not request.session.get("user"):
        raise HTTPException(
            status_code=403,
            detail="Registration is only available during initial setup",
        )

    form = await request.form()
    username = form.get("username", "")
    password = form.get("password", "")
    confirm = form.get("confirmPassword", "")
    if not username or not password:
        raise HTTPException(status_code=400, detail="Username and password required")
    if password != confirm:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    ctx.config_manager.ensure_auth(username, password)
    request.session["user"] = username
    return {"ok": True}
