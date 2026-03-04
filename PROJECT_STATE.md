# Project State (Python Port)

Last updated: 2026-03-04

## Recent Changes
- Added qBittorrent parity for trackers and file priorities (stored in torrent state).
- Tests updated to cover tracker parsing + file priority persistence.

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
- **Static asset handling**: Ensure `decypharr/web/static/build/` is committed or add a build step in CI to generate it.
- **UI validation parity**: Bring settings field validation in line with Go version (edge cases remain).
- **WebDAV parity**: Special folders (`__all__`, `__bad__`) still need full parity behavior.
- **Error mapping**: Align qBittorrent error responses with Go behavior.
- **Advanced stats parity**: Minor gaps remain versus Go’s system stats output.
- **Tests**: Add integration/stack tests (Arr + debrid + webdav flows).
- **Additional debrid providers**: Debrid‑Link / AllDebrid not yet implemented.

## Constraints
- None added in this update.

## Next Step
- Decide and implement the static asset strategy (commit build output or CI build).

## Decisions
- **FastAPI + Jinja2** for the main web UI and API, keeping template parity with the Go UI.
- **In‑process WebDAV** via WsgiDAV (same process as the API) for simpler deployment.
- **qBittorrent API shim** to integrate with Radarr/Sonarr/Arr flows without running qBittorrent.
- **Rclone managed via RC** and mounted by the app rather than an external supervisor.
- **JSON config persistence** (`config.json`, `auth.json`, `torrents.json`) for portability.
- **Pytest** for tests and **MkDocs** for documentation.
- **RAR extraction** uses external tools (`unrar` or `bsdtar`) when enabled.
- **Folder naming** uses Go‑style strategies for parity (configurable).
