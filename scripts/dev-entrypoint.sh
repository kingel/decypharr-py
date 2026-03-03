#!/usr/bin/env sh
set -e

cd /app
uv pip install -e '.[dev]' --system

exec uvicorn decypharr.app:create_app_from_env \
  --factory \
  --host 0.0.0.0 \
  --port 8282 \
  --reload \
  --reload-dir /app
