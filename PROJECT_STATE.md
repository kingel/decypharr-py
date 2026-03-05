# Project State (Python Port)

Last updated: 2026-03-05

## Recent Changes
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
- **Transport hardening (high)**: remove `verify=False` from Arr HTTP client or make insecure TLS opt-in.
- **Session hardening (high)**: replace qBittorrent SID cookie format so credentials are not embedded in cookie payload.
- **Runtime robustness (medium)**: move blocking poller callbacks/download processing to threads or async clients.
- **Storage robustness (medium)**: add locking/atomic writes for `torrents.json` updates.
- **Tests**: add concurrency/race coverage for torrent storage writes.
- **Static asset handling**: Ensure `decypharr/web/static/build/` is committed or add a build step in CI to generate it.
- **UI validation parity**: Bring settings field validation in line with Go version (client-side rules remain).
- **WebDAV parity**: Validate WsgiDAV dir browser UX vs Go’s custom listing (delete buttons).
- **Tests**: Integration/stack tests (Arr + debrid + webdav flows) — manual by user.
- **Additional debrid providers**: Debrid‑Link / AllDebrid not yet implemented.

## Constraints
- Static assets directory `decypharr/web/static/build/` must exist at runtime/tests or app init fails.

## Next Step
- Continue security hardening: tighten Arr TLS (`verify=False`) and fix qBittorrent SID cookie credential exposure.

## Decisions
- **FastAPI + Jinja2** for the main web UI and API, keeping template parity with the Go UI.
- **In‑process WebDAV** via WsgiDAV (same process as the API) for simpler deployment.
- **qBittorrent API shim** to integrate with Radarr/Sonarr/Arr flows without running qBittorrent.
- **Rclone managed via RC** and mounted by the app rather than an external supervisor.
- **JSON config persistence** (`config.json`, `auth.json`, `torrents.json`) for portability.
- **Pytest** for tests and **MkDocs** for documentation.
- **RAR extraction** uses external tools (`unrar` or `bsdtar`) when enabled.
- **Folder naming** uses Go‑style strategies for parity (configurable).
