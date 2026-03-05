from __future__ import annotations

import json
import os
import secrets
from pathlib import Path
from typing import Any, List, Optional

from pydantic import BaseModel, Field
import bcrypt


def _env_secret_key() -> str:
    return os.getenv(
        "DECYPHARR_SECRET_KEY",
        "\"wqj(v%lj*!-+kf@4&i95rhh_!5_px5qnuwqbr%cjrvrozz_r*(\"",
    )


def _normalize_url_base(url_base: str) -> str:
    if not url_base:
        url_base = "/"
    if not url_base.startswith("/"):
        url_base = "/" + url_base
    if not url_base.endswith("/"):
        url_base += "/"
    return url_base


class BaseConfigModel(BaseModel):
    model_config = {"extra": "allow", "validate_assignment": True}


class Debrid(BaseConfigModel):
    name: Optional[str] = None
    api_key: Optional[str] = None
    download_api_keys: List[str] = Field(default_factory=list)
    folder: Optional[str] = None
    rclone_mount_path: Optional[str] = None
    download_uncached: Optional[bool] = None
    check_cached: Optional[bool] = None
    rate_limit: Optional[str] = None
    repair_rate_limit: Optional[str] = None
    download_rate_limit: Optional[str] = None
    proxy: Optional[str] = None
    unpack_rar: Optional[bool] = None
    add_samples: Optional[bool] = None
    minimum_free_slot: Optional[int] = None
    limit: Optional[int] = None
    use_webdav: Optional[bool] = None
    folder_naming: Optional[str] = None
    directories: dict = Field(default_factory=dict)
    torrents_refresh_interval: Optional[str] = None
    download_links_refresh_interval: Optional[str] = None
    auto_expire_links_after: Optional[str] = None
    workers: Optional[int] = None
    serve_from_rclone: Optional[bool] = None
    rc_url: Optional[str] = None
    rc_user: Optional[str] = None
    rc_pass: Optional[str] = None
    rc_refresh_dirs: Optional[str] = None


class QBitTorrent(BaseConfigModel):
    username: Optional[str] = None
    password: Optional[str] = None
    port: Optional[str] = None
    download_folder: Optional[str] = None
    categories: List[str] = Field(default_factory=list)
    refresh_interval: int = 15
    skip_pre_cache: bool = False
    max_downloads: int = 5
    always_rm_tracker_urls: bool = False
    default_action: str = "symlink"


class Arr(BaseConfigModel):
    name: Optional[str] = None
    host: Optional[str] = None
    token: Optional[str] = None
    cleanup: bool = False
    auto_remove_completed: bool = False
    skip_repair: bool = False
    download_uncached: Optional[bool] = None
    selected_debrid: Optional[str] = None
    source: Optional[str] = None
    insecure_tls: bool = False


class Repair(BaseConfigModel):
    enabled: bool = False
    interval: Optional[str] = None
    zurg_url: Optional[str] = None
    auto_process: bool = False
    use_webdav: bool = False
    workers: int = 0
    reinsert: bool = False
    strategy: str = "per_torrent"


class WebDav(BaseConfigModel):
    enabled: bool = True
    root_path: Optional[str] = None
    folder_naming: str = "original_no_ext"
    directories: dict = Field(default_factory=dict)


class Rclone(BaseConfigModel):
    enabled: bool = False
    mount_path: Optional[str] = None
    rc_port: Optional[str] = None
    cache_dir: Optional[str] = None
    vfs_cache_mode: Optional[str] = None
    vfs_cache_max_age: Optional[str] = None
    vfs_disk_space_total: Optional[str] = None
    vfs_cache_max_size: Optional[str] = None
    vfs_cache_poll_interval: Optional[str] = None
    vfs_read_chunk_size: Optional[str] = None
    vfs_read_chunk_size_limit: Optional[str] = None
    vfs_read_ahead: Optional[str] = None
    buffer_size: Optional[str] = None
    bw_limit: Optional[str] = None
    vfs_cache_min_free_space: Optional[str] = None
    vfs_fast_fingerprint: bool = False
    vfs_read_chunk_streams: int = 0
    async_read: Optional[bool] = None
    transfers: int = 0
    use_mmap: bool = False
    uid: int = 0
    gid: int = 0
    umask: Optional[str] = None
    attr_timeout: Optional[str] = None
    dir_cache_time: Optional[str] = None
    no_modtime: bool = False
    no_checksum: bool = False
    log_level: Optional[str] = None


class Auth(BaseConfigModel):
    username: str = ""
    password: str = ""
    api_token: str = ""


class Config(BaseConfigModel):
    bind_address: str = "0.0.0.0"
    url_base: str = "/"
    port: str = "8282"
    log_level: str = "info"
    debrids: List[Debrid] = Field(default_factory=list)
    qbittorrent: QBitTorrent = Field(default_factory=QBitTorrent)
    arrs: List[Arr] = Field(default_factory=list)
    repair: Repair = Field(default_factory=Repair)
    webdav: WebDav = Field(default_factory=WebDav)
    rclone: Rclone = Field(default_factory=Rclone)
    allowed_file_types: List[str] = Field(default_factory=list)
    min_file_size: Optional[str] = None
    max_file_size: Optional[str] = None
    use_auth: bool = True
    discord_webhook_url: Optional[str] = None
    remove_stalled_after: Optional[str] = None
    callback_url: Optional[str] = None
    enable_webdav_auth: bool = False
    debrid_poll_interval: int = 30
    bad_torrent_threshold_hours: int = 12
    path: Optional[str] = None
    auth: Optional[Auth] = None

    def normalize(self) -> None:
        self.url_base = _normalize_url_base(self.url_base)


class ConfigManager:
    def __init__(self, base_path: Path) -> None:
        self.base_path = base_path
        self._config: Optional[Config] = None

    @property
    def config_path(self) -> Path:
        return self.base_path / "config.json"

    @property
    def auth_path(self) -> Path:
        return self.base_path / "auth.json"

    @property
    def torrents_path(self) -> Path:
        return self.base_path / "torrents.json"

    def load(self) -> Config:
        if self._config is not None:
            return self._config

        if not self.config_path.exists():
            self._config = self._create_default()
            self.save(self._config)
        else:
            data = json.loads(self.config_path.read_text())
            self._config = Config.model_validate(data)

        self._config.path = str(self.base_path)
        self._config.normalize()
        self._config.auth = self._load_auth() if self._config.use_auth else None

        if self._config.use_auth and self._config.auth and not self._config.auth.api_token:
            self._config.auth.api_token = self._generate_api_token()
            self.save_auth(self._config.auth)

        return self._config

    def save(self, config: Config) -> None:
        self.base_path.mkdir(parents=True, exist_ok=True)
        config.normalize()
        data = config.model_dump(mode="json", exclude={"auth", "path"})
        self.config_path.write_text(json.dumps(data, indent=2))
        self._config = config

    def _load_auth(self) -> Auth:
        if self.auth_path.exists():
            data = json.loads(self.auth_path.read_text())
            return Auth.model_validate(data)
        return Auth()

    def save_auth(self, auth: Auth) -> None:
        self.base_path.mkdir(parents=True, exist_ok=True)
        data = auth.model_dump(mode="json")
        self.auth_path.write_text(json.dumps(data, indent=2))

    def ensure_auth(self, username: str, password: str) -> Auth:
        auth = Auth(username=username, password=self._hash_password(password))
        auth.api_token = self._generate_api_token()
        self.save_auth(auth)
        if self._config is not None:
            self._config.auth = auth
        return auth

    def verify_auth(self, username: str, password: str) -> bool:
        cfg = self.load()
        if not cfg.use_auth:
            return True
        if not cfg.auth:
            return False
        if username != cfg.auth.username:
            return False
        if not cfg.auth.password:
            return False
        return bcrypt.checkpw(password.encode("utf-8"), cfg.auth.password.encode("utf-8"))

    def refresh_api_token(self) -> str:
        cfg = self.load()
        if cfg.auth is None:
            cfg.auth = Auth()
        cfg.auth.api_token = self._generate_api_token()
        self.save_auth(cfg.auth)
        return cfg.auth.api_token

    @staticmethod
    def secret_key() -> str:
        return _env_secret_key()

    @staticmethod
    def _hash_password(password: str) -> str:
        return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    @staticmethod
    def _generate_api_token() -> str:
        return secrets.token_hex(24)

    def needs_setup(self) -> bool:
        return self.setup_error() is not None

    def setup_error(self) -> Optional[str]:
        cfg = self.load()
        if len(cfg.debrids) == 0:
            return "no debrids configured"

        for debrid in cfg.debrids:
            if not debrid.api_key:
                return "debrid api key is required"
            if not debrid.folder:
                return "debrid folder is required"

        download_folder = cfg.qbittorrent.download_folder
        if not download_folder:
            return "qbittorent download folder is required"
        if not Path(download_folder).exists():
            return f"qbittorent download folder({download_folder}) does not exist"

        if cfg.repair.enabled and not cfg.repair.interval:
            return "repair interval is required"

        return None

    def _create_default(self) -> Config:
        self.base_path.mkdir(parents=True, exist_ok=True)
        return Config(
            url_base="/",
            port="8282",
            log_level="info",
            use_auth=True,
            qbittorrent=QBitTorrent(
                download_folder=str(self.base_path / "downloads"),
                categories=["sonarr", "radarr"],
                refresh_interval=15,
            ),
        )
