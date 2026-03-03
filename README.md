# Decypharr

FastAPI + Jinja2 + WsgiDAV implementation of Decypharr.

## Quick Start

```bash
uv pip install -e .[dev]
python -m decypharr.main --config /data
```

RAR support (WebDAV per-file extraction) requires `unrar` or `bsdtar` to be available in the runtime.

## Docker (Dev)

```bash
docker compose -f docker-compose.dev.yml up --build
```

Subsequent runs do not require rebuilds unless dependencies change:

```bash
docker compose -f docker-compose.dev.yml up
```

## Tests

```bash
pytest -q
```

## Rclone

The Python port manages rclone internally. When `rclone.enabled` is true and WebDAV is enabled per provider, Decypharr starts an rclone `rcd` server and mounts each provider under the configured mount root.

If you're using Docker, the compose files already include the required FUSE device and caps. On macOS, you need macFUSE on the host.

## Configuration

Configuration is stored in a data directory that contains:
- `config.json`
- `auth.json`
- `torrents.json`

You can point Decypharr at a specific data directory using `--config` or `DECYPHARR_CONFIG_PATH`.

## Acknowledgements

This implementation is inspired by the original Decypharr project by Mukhtar Akere.

- Original project: [sirrobot01/decypharr](https://github.com/sirrobot01/decypharr)
- Original documentation: [sirrobot01.github.io/decypharr](https://sirrobot01.github.io/decypharr/)
