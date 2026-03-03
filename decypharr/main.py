from __future__ import annotations

import argparse
from pathlib import Path

import uvicorn

from decypharr.app import create_app


def main() -> None:
    parser = argparse.ArgumentParser(description="Decypharr (Python)")
    parser.add_argument("--config", default="/data", help="path to the data folder")
    args = parser.parse_args()

    config_path = Path(args.config)
    app = create_app(config_path)

    cfg = app.state.ctx.config_manager.load()
    uvicorn.run(
        app,
        host=cfg.bind_address,
        port=int(cfg.port),
        log_level=cfg.log_level,
    )


if __name__ == "__main__":
    main()
