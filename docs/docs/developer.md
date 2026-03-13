# Developer Guide

This guide covers development for the Python implementation in this repository.

## Repo Layout

- `decypharr/`: FastAPI app and core services
- `tests/`: pytest test suite
- `docs/`: documentation (MkDocs)

## FastAPI App

### Quick Start (Local)

```bash
uv pip install -e .[dev]
python -m decypharr.main --config /data
```

### Docker Dev

```bash
docker compose -f docker-compose.dev.yml up -d --build
```

Subsequent runs do not require rebuilds unless dependencies change:

```bash
docker compose -f docker-compose.dev.yml up -d
```

### Tests

Run inside the container (recommended):

```bash
docker compose -f docker-compose.dev.yml exec -T decypharr-py pytest -q
```

### Frontend Assets

When you change files under `decypharr/web/src/`, rebuild the checked-in Vite assets in the frontend container:

```bash
docker compose -f docker-compose.dev.yml exec -T frontend sh -lc 'cd /app/decypharr/web && npm run build'
```

Then verify the generated bundle is committed:

```bash
git diff --exit-code -- decypharr/web/static/build
```

### Documentation

Build the MkDocs site inside the dev container:

```bash
docker compose -f docker-compose.dev.yml exec -T decypharr-py python -m mkdocs build -f docs/mkdocs.yml --strict
```

### Rclone (Internal Mounting)

Decypharr uses rclone `rcd` and manages mounts internally.
To use mounts, you must run with FUSE access:

- Linux/WSL: `/dev/fuse` device + `SYS_ADMIN` cap.
- macOS: requires macFUSE in the host.

The docker-compose files in this repo already include the required device and caps.

## Config & Data

Both apps load config from a directory (JSON):

- `config.json`
- `auth.json`
- `torrents.json`

The path is set by `--config` or `DECYPHARR_CONFIG_PATH`.

## Architecture Overview

See `docs/docs/architecture.md` for the module map and data flow.

## Original Project (Acknowledgement)

This Python implementation is inspired by the original Decypharr project.

- Original project: [sirrobot01/decypharr](https://github.com/sirrobot01/decypharr)
- Original documentation: [sirrobot01.github.io/decypharr](https://sirrobot01.github.io/decypharr/)
