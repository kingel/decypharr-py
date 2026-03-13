# Architecture

This document describes the major components and data flow for Decypharr using FastAPI + Jinja2 + WsgiDAV.

## High-Level Components

- **UI + API**
  - FastAPI app (`decypharr/app.py`) with Jinja2 templates and REST endpoints
- **qBittorrent-Compatible API**
  - Implements Arr-facing qBittorrent endpoints for add/list/delete/status, categories, and preferences.
  - State mapping: debrid `downloaded`/`completed` → `pausedUP` (qBittorrent completed), active processing → `downloading`, failures → `error`.
- **Debrid Layer**
  - Provider clients (Real-Debrid, TorBox)
  - Additional providers such as Debrid-Link and All-Debrid remain planned
  - Unified storage and caching to map infohashes to debrid items and cache availability
- **WebDAV**
  - Provider-backed WebDAV directories exposed per debrid service
  - Optional virtual folders such as `__all__` and `__bad__`
- **Rclone (Optional)**
  - Manages internal WebDAV mounts via rclone `rcd`
  - Mounts are created per debrid provider when enabled
- **Repair Worker**
  - Background job to find missing media, reinsert items, and repair symlinks
- **Arr Integration**
  - Arr webhook/refresh callbacks on completion or failure
  - Arr download-client compatibility via qBittorrent endpoints

## Data Flow

1. **Arr adds a release**
   - Arr sends a magnet or torrent URL to the qBittorrent API.
2. **Debrid availability**
   - Decypharr checks cache availability via the configured debrid provider.
3. **Debrid insertion**
   - Decypharr inserts the torrent into the debrid service.
4. **Torrent tracking**
   - Debrid list polling updates state and progress for the dashboard and API.
5. **WebDAV access**
   - Files are exposed through WebDAV directories per provider.
6. **Mount (optional)**
   - Rclone mounts WebDAV to local paths for easy file access.
7. **Media import**
   - Arr reads files from the mounted path (or WebDAV) and imports into the library.

## Config and State Files

All runtime state lives in a config directory:

- `config.json` (settings)
- `auth.json` (UI auth)
- `torrents.json` (tracked items)
- `rclone/` (internal rclone config and cache)

The app uses `--config` or `DECYPHARR_CONFIG_PATH`.

## Module Map

- `decypharr/app.py`: FastAPI app and lifespan
- `decypharr/routes/`: REST API handlers (qBittorrent, config, stats)
- `decypharr/debrid/`: provider clients, storage, cache
- `decypharr/webdav/`: WsgiDAV provider + resources
- `decypharr/services/rclone.py`: rclone lifecycle and mounts
- `decypharr/services/repair.py`: repair queue and workers
- `decypharr/web/templates/`: UI templates
