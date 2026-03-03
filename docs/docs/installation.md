# Installation

There are multiple ways to install and run Decypharr. These instructions are for the Python implementation in this repository.

## Docker Installation (Recommended)

Docker is the easiest way to get started with Decypharr.

### Docker Compose Setup

Create a `docker-compose.yml` file with the following content:

```yaml
services:
  decypharr-py:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: decypharr-py
    ports:
      - "8282:8282"
    volumes:
      - ./data:/data
      - ./mnt:/mnt:rshared
    restart: unless-stopped
    devices:
      - /dev/fuse:/dev/fuse:rwm
    cap_add:
      - SYS_ADMIN
    security_opt:
      - apparmor:unconfined
    environment:
      - DECYPHARR_CONFIG_PATH=/data
```

Run the Docker Compose setup:
```bash
docker-compose up -d
```

## Development

### Docker Dev

```bash
docker compose -f docker-compose.dev.yml up -d --build
```

Subsequent runs do not require rebuilds unless dependencies change:

```bash
docker compose -f docker-compose.dev.yml up -d
```

### Local Dev

```bash
uv pip install -e .[dev]
python -m decypharr.main --config /data
```

### Notes for Docker Users

- Ensure that the `/mnt/` directory is mounted correctly to access your media files.
- You can adjust the `PUID` and `PGID` environment variables to match your user and group IDs for proper file permissions.
- The `UMASK` environment variable can be set to control file permissions created by Decypharr.

##### Health Checks
- Health checks are disabled by default. You can enable them by adding a `healthcheck` section in your `docker-compose.yml` file.
- Health checks the availability of several parts of the application;
    - The main web interface
    - The qBittorrent API
    - The WebDAV server (if enabled). You should disable health checks for the initial indexes as they can take a long time to complete.

```yaml
services:
  decypharr-py:
    ...
    ...
    healthcheck:
      test: ["CMD", "/usr/bin/healthcheck", "--config", "/data/"]
      interval: 10s
      timeout: 10s
      retries: 3
```

## Original Project (Acknowledgement)

This Python implementation is inspired by the original Decypharr project.

- Original project: [sirrobot01/decypharr](https://github.com/sirrobot01/decypharr)
- Original documentation: [sirrobot01.github.io/decypharr](https://sirrobot01.github.io/decypharr/)
