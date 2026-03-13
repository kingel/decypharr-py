from __future__ import annotations

from fastapi import HTTPException, Request

from decypharr.services.context import AppContext


def _bearer_token(request: Request) -> str:
    header = request.headers.get("Authorization", "").strip()
    if not header:
        return ""
    scheme, _, token = header.partition(" ")
    if scheme.lower() != "bearer" or not token:
        return ""
    return token.strip()


def require_session_or_api_token(request: Request, ctx: AppContext) -> None:
    cfg = ctx.config_manager.load()
    if not cfg.use_auth:
        return
    if request.session.get("user"):
        return
    token = _bearer_token(request)
    if token and ctx.config_manager.verify_api_token(token):
        return
    raise HTTPException(status_code=401, detail="Authentication required")
