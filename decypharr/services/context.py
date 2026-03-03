from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

from apscheduler.schedulers.background import BackgroundScheduler

from decypharr.arr import ArrStorage
from decypharr.config import ConfigManager
from decypharr.debrid.storage import DebridStorage
from decypharr.services.repair import RepairService
from decypharr.services.rclone import RcloneManager
from decypharr.storage.torrents import TorrentStore


@dataclass
class AppContext:
    config_manager: ConfigManager
    torrents: TorrentStore
    scheduler: BackgroundScheduler
    debrids: DebridStorage
    arrs: ArrStorage
    repair: RepairService
    rclone: RcloneManager | None

    @classmethod
    def from_path(cls, base_path: Path) -> "AppContext":
        cfg = ConfigManager(base_path)
        config = cfg.load()
        torrents = TorrentStore(cfg.torrents_path)
        scheduler = BackgroundScheduler()
        if config.repair.enabled:
            scheduler.start()
        debrids = DebridStorage(config)
        arrs = ArrStorage()
        arrs.refresh_from_config(config)
        repair = RepairService(cfg, debrids, arrs, scheduler)
        rclone = RcloneManager(cfg) if config.rclone.enabled else None
        return cls(
            config_manager=cfg,
            torrents=torrents,
            scheduler=scheduler,
            debrids=debrids,
            arrs=arrs,
            repair=repair,
            rclone=rclone,
        )
