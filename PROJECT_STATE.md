# Project State (Python Port)

Last updated: 2026-03-05 (8)

## Recent Changes
- Phase 4 cleanup: pruned `web/static/build/` to Vite outputs only (main.js/main.css), removed legacy script placeholders, rebuilt assets.
- Frontend cleanup: removed utility-class shim and template normalization; config templates now explicit Web Awesome + app input markup; rebuilt Vite assets.
- Docs: refreshed Project State + TODO after Phase 3 frontend modernization; no code changes.
- Frontend modernization (Phase 3): dashboard/config/repair now render with Web Awesome components; runtime template normalization added; legacy Tailwind/DaisyUI bundle + Bootstrap icons removed; WA dialog + utility CSS added.
- Frontend modernization (Phase 2): migrated download + stats pages to Web Awesome + Lit components; removed legacy scripts; rebuilt Vite assets in container.
- Frontend pivot: switched Phase 1 UI from Shoelace to Web Awesome (tags/imports/icons/theme classes), updated app CSS tokens; Vite assets rebuilt in container.
- Frontend modernization (Phase 1): added Vite build system + Shoelace + Lit + htmx; rewrote layout, login, register templates with Shoelace components; old DaisyUI CSS kept for unmigrated pages (dual CSS); Vite dev server in Docker with hot-reload; backward compat shim for `window.decypharrUtils` (`42 passed`).
- Runtime robustness: all blocking sync calls in `poll_debrid` now run via `asyncio.to_thread`.
- Storage robustness: `TorrentStore` now serialises all reads/writes under a `threading.Lock`; `_save()` uses atomic write-to-tmp-then-rename so a crash mid-write leaves the file intact; 2 regression tests added.
- Transport hardening: `ArrClient` now verifies TLS by default (`verify=True`); opt-in `insecure_tls: bool = False` field added to `Arr` config model and round-tripped through `ArrStorage.serialize()`; 2 regression tests added.
- Auth hardening: replaced qBittorrent SID cookie credential exposure — SID now contains only a HMAC-signed username (no password); `_require_qbit_auth` accepts SID as proof of prior auth without re-verifying the password; switched from `hashlib` to `hmac` with `compare_digest`; 2 regression tests added.
- Auth hardening: protected all `/debug/*` endpoints (`stats`, `logs`, `logs/rclone`, `ingests`) behind session auth via router-level dependency; returns 401 when `use_auth=True` and no valid session.
- Tests: added 3 auth regression tests for `/debug/*` (`36 passed`).
- Bug fix: removed duplicate `os` import and added missing `Optional` import in `debug.py`.
- Auth hardening: `/register` is now bootstrap-only for unauthenticated users; authenticated users can still rotate credentials.
- Auth hardening: removed `/skip-auth` endpoint and removed skip-auth UI action from register page.
- WebDAV: aligned `__all__` ordering, `__bad__` listing, and delete-all behavior with Go.
- Added WebDAV listing + delete tests for `__bad__`.
- qBittorrent: aligned error responses (status + plain-text bodies) with Go.
- Added qBittorrent error-response tests (auth/add/delete).
- Setup validation parity: added Go-style setup checks + redirect middleware.
- Updated tests to use valid setup defaults where needed.

## Architecture
- **App core**: FastAPI ASGI app with a shared context container (`decypharr/services/context.py`) and lifespan startup in `decypharr/app.py`.
- **UI**: Jinja2 templates + static bundle in `decypharr/web/templates/` and `decypharr/web/static/build/`.
- **API surface**:
  - App API under `decypharr/routes/api.py`.
  - qBittorrent-compatible API under `decypharr/routes/qbit.py` for Arr clients.
  - Debug/stats under `decypharr/routes/debug.py`.
- **Debrid layer**: Providers implement a shared interface (`decypharr/debrid/base.py`) with Real‑Debrid and TorBox clients (`realdebrid.py`, `torbox.py`).
- **Torrent state**: Persistent JSON store in `decypharr/storage/torrents.py`.
- **Workers/services**:
  - Poller + downloader + callbacks + repair worker under `decypharr/services/`.
  - Arr cleanup loop in `services/arr_cleanup.py`.
  - Rclone RC management in `services/rclone.py`.
  - WebDAV server in-process via WsgiDAV (`services/webdav.py`, `webdav/provider.py`).
- **Config**: Pydantic models in `decypharr/config.py`, persisted as JSON (`config.json`, `auth.json`, `torrents.json`).

## Key Files
- `decypharr/app.py`: Application factory, routing, middleware, static mounts.
- `decypharr/main.py`: CLI entrypoint for `decypharr`.
- `decypharr/config.py`: Config schema + persistence.
- `decypharr/routes/qbit.py`: qBittorrent API shim for Arr clients.
- `decypharr/routes/api.py`: Core API used by UI.
- `decypharr/services/context.py`: Shared service wiring (config, debrid, cache, rclone, etc.).
- `decypharr/services/poller.py`: Debrid polling + state refresh.
- `decypharr/services/downloader.py`: Unrestrict/download flow.
- `decypharr/services/callbacks.py`: Arr callbacks on success/failure.
- `decypharr/services/arr_cleanup.py`: Cleanup of completed Arr items.
- `decypharr/services/repair.py`: Repair queue and worker loop.
- `decypharr/services/rclone.py`: Rclone RC + mount management.
- `decypharr/webdav/provider.py`: WebDAV provider and virtual folder layout.
- `decypharr/debrid/realdebrid.py`, `decypharr/debrid/torbox.py`: Provider clients.
- `decypharr/web/templates/`: UI templates (shared with Go version).
- `decypharr/web/static/build/`: Built UI assets; must be present at runtime.
- `tests/`: Pytest suite.
- `docs/`: MkDocs site for user + developer docs.

## Open Tasks
- **Static asset handling**: Vite build step added (`npm run build` in `decypharr/web/`); CI should run this before packaging.
- **UI validation parity**: Bring settings field validation in line with Go version (client-side rules remain).
- **WebDAV parity**: Validate WsgiDAV dir browser UX vs Go’s custom listing (delete buttons).
- **Tests**: Integration/stack tests (Arr + debrid + webdav flows) — manual by user.
- **Additional debrid providers**: Debrid‑Link / AllDebrid not yet implemented.

## Constraints
- Static assets directory `decypharr/web/static/build/` must exist at runtime/tests or app init fails.
- Run npm/vite commands only inside containers (no host npm).
- Legacy `styles.css` removed; UI now depends on Vite `main.css` bundle.

## Next Step
- Tighten UI validation to match Go behavior for settings forms.

## Decisions
- **FastAPI + Jinja2** for the main web UI and API, keeping template parity with the Go UI.
- **In‑process WebDAV** via WsgiDAV (same process as the API) for simpler deployment.
- **qBittorrent API shim** to integrate with Radarr/Sonarr/Arr flows without running qBittorrent.
- **Rclone managed via RC** and mounted by the app rather than an external supervisor.
- **JSON config persistence** (`config.json`, `auth.json`, `torrents.json`) for portability.
- **Pytest** for tests and **MkDocs** for documentation.
- **RAR extraction** uses external tools (`unrar` or `bsdtar`) when enabled.
- **Folder naming** uses Go‑style strategies for parity (configurable).
