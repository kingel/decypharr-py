from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime
from typing import Dict, List, Optional
import json
import os
import re
import threading
import urllib.parse
from concurrent.futures import ThreadPoolExecutor, as_completed

import httpx
from apscheduler.triggers.cron import CronTrigger
from apscheduler.triggers.interval import IntervalTrigger

from decypharr.arr import ArrClient, ArrStorage, Content, ContentFile
from decypharr.config import ConfigManager, Repair
from decypharr.debrid.cache import DebridCache
from decypharr.debrid.storage import DebridStorage


class JobStatus:
    STARTED = "started"
    PENDING = "pending"
    FAILED = "failed"
    COMPLETED = "completed"
    PROCESSING = "processing"
    CANCELLED = "cancelled"


@dataclass
class RepairJob:
    id: str
    arrs: List[str]
    media_ids: List[str]
    created_at: datetime
    status: str = JobStatus.STARTED
    broken_items: Optional[Dict[str, List[ContentFile]]] = None
    finished_at: Optional[datetime] = None
    failed_at: Optional[datetime] = None
    auto_process: bool = False
    recurrent: bool = False
    error: str = ""
    _cancel: threading.Event = field(default_factory=threading.Event, repr=False, compare=False)

    def cancel(self) -> None:
        self._cancel.set()

    def cancelled(self) -> bool:
        return self._cancel.is_set()


def _job_key(arrs: List[str], media_ids: List[str]) -> str:
    return f"{','.join(arrs)}-{','.join(media_ids)}"


def _parse_schedule(value: str):
    value = value.strip()
    if not value:
        return None
    match = re.match(r"^(\\d+)([smhd])$", value, re.IGNORECASE)
    if match:
        amount = int(match.group(1))
        unit = match.group(2).lower()
        seconds = amount
        if unit == "m":
            seconds *= 60
        elif unit == "h":
            seconds *= 3600
        elif unit == "d":
            seconds *= 86400
        return IntervalTrigger(seconds=seconds)
    match = re.match(r"^(\\d{1,2}):(\\d{2})$", value)
    if match:
        hour = int(match.group(1))
        minute = int(match.group(2))
        return CronTrigger(hour=hour, minute=minute)
    if value.count(" ") >= 4:
        try:
            return CronTrigger.from_crontab(value)
        except ValueError:
            return None
    return None


class RepairService:
    def __init__(
        self,
        config_manager: ConfigManager,
        debrids: DebridStorage,
        arrs: ArrStorage,
        scheduler,
    ) -> None:
        self._config_manager = config_manager
        self._debrids = debrids
        self._arrs = arrs
        self._scheduler = scheduler
        self._jobs: Dict[str, RepairJob] = {}
        self._lock = threading.Lock()
        self._filename = os.path.join(config_manager.base_path, "repair.json")
        self._load_from_file()
        self._schedule_if_enabled()

    def _schedule_if_enabled(self) -> None:
        cfg = self._config_manager.load()
        if not cfg.repair.enabled or not cfg.repair.interval:
            return
        if not getattr(self._scheduler, "running", False):
            try:
                self._scheduler.start()
            except Exception:
                return
        trigger = _parse_schedule(cfg.repair.interval)
        if trigger is None:
            return
        try:
            self._scheduler.remove_job("repair-scheduler")
        except Exception:
            pass
        self._scheduler.add_job(
            lambda: self.add_job([], [], cfg.repair.auto_process, recurrent=True),
            trigger=trigger,
            id="repair-scheduler",
            replace_existing=True,
        )

    def _save_to_file(self) -> None:
        with self._lock:
            data = {key: self._serialize_job(job) for key, job in self._jobs.items()}
        try:
            os.makedirs(os.path.dirname(self._filename), exist_ok=True)
            with open(self._filename, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)
        except OSError:
            return

    def _load_from_file(self) -> None:
        if not os.path.exists(self._filename):
            self._jobs = {}
            return
        try:
            with open(self._filename, "r", encoding="utf-8") as f:
                raw = json.load(f)
        except (OSError, json.JSONDecodeError):
            self._jobs = {}
            return
        jobs: Dict[str, RepairJob] = {}
        for key, data in raw.items():
            status = data.get("status")
            if status != JobStatus.PENDING:
                continue
            jobs[key] = self._deserialize_job(data)
        self._jobs = jobs

    def _deserialize_job(self, data: dict) -> RepairJob:
        created_at = _parse_dt(data.get("created_at"))
        job = RepairJob(
            id=data.get("id", ""),
            arrs=list(data.get("arrs", [])),
            media_ids=list(data.get("media_ids", [])),
            created_at=created_at or datetime.utcnow(),
            status=data.get("status", JobStatus.PENDING),
            auto_process=bool(data.get("auto_process", False)),
            recurrent=bool(data.get("recurrent", False)),
            error=data.get("error", ""),
        )
        job.finished_at = _parse_dt(data.get("finished_at"))
        job.failed_at = _parse_dt(data.get("failed_at"))
        broken_items: Dict[str, List[ContentFile]] = {}
        for arr, items in (data.get("broken_items") or {}).items():
            broken_items[arr] = [
                ContentFile(
                    path=item.get("path", ""),
                    file_id=int(item.get("fileId", item.get("file_id", 0)) or 0),
                    media_id=int(item.get("id", 0) or 0),
                    season_number=int(item.get("seasonNumber", item.get("season_number", 0)) or 0),
                    size=int(item.get("size", 0) or 0),
                )
                for item in items
            ]
        job.broken_items = broken_items if broken_items else None
        return job

    def _serialize_job(self, job: RepairJob) -> dict:
        return {
            "id": job.id,
            "arrs": job.arrs,
            "media_ids": job.media_ids,
            "created_at": job.created_at.isoformat(),
            "finished_at": job.finished_at.isoformat() if job.finished_at else None,
            "failed_at": job.failed_at.isoformat() if job.failed_at else None,
            "status": job.status,
            "auto_process": job.auto_process,
            "recurrent": job.recurrent,
            "error": job.error,
            "broken_items": self._serialize_broken_items(job.broken_items),
        }

    def _serialize_broken_items(
        self, broken_items: Optional[Dict[str, List[ContentFile]]]
    ) -> Optional[Dict[str, List[dict]]]:
        if not broken_items:
            return None
        return {arr: [item.to_dict() for item in items] for arr, items in broken_items.items()}

    def get_jobs(self) -> List[dict]:
        with self._lock:
            jobs = list(self._jobs.values())
        jobs.sort(key=lambda j: j.created_at, reverse=True)
        return [self._serialize_job(job) for job in jobs]

    def refresh_from_config(self) -> None:
        cfg = self._config_manager.load()
        self._arrs.refresh_from_config(cfg)
        self._schedule_if_enabled()

    def update_debrids(self, debrids: DebridStorage) -> None:
        self._debrids = debrids

    def add_job(self, arr_names: List[str], media_ids: List[str], auto_process: bool, recurrent: bool) -> str:
        cfg = self._config_manager.load()
        self._arrs.refresh_from_config(cfg)
        arrs = self._resolve_arrs(arr_names)
        if not arrs:
            raise ValueError("No Arrs found to repair")
        job_key = _job_key(arrs, media_ids or [])
        with self._lock:
            job = self._jobs.get(job_key)
            if job and job.status in {JobStatus.STARTED, JobStatus.PROCESSING}:
                raise ValueError("job already running")
            if not job:
                job = RepairJob(
                    id=_new_id(),
                    arrs=arrs,
                    media_ids=media_ids or [],
                    created_at=datetime.utcnow(),
                    status=JobStatus.STARTED,
                )
                self._jobs[job_key] = job
            job.arrs = arrs
            job.media_ids = media_ids or []
            job.created_at = datetime.utcnow()
            job.status = JobStatus.STARTED
            job.finished_at = None
            job.failed_at = None
            job.error = ""
            job.broken_items = None
            job.auto_process = auto_process
            job.recurrent = recurrent
            job._cancel = threading.Event()
        thread = threading.Thread(target=self._run_job, args=(job,), daemon=True)
        thread.start()
        self._save_to_file()
        return job.id

    def stop_job(self, job_id: str) -> None:
        job = self._get_job(job_id)
        if not job:
            raise ValueError("job not found")
        if job.status not in {JobStatus.STARTED, JobStatus.PROCESSING}:
            raise ValueError("job cannot be stopped")
        job.cancel()
        job.status = JobStatus.CANCELLED
        job.finished_at = datetime.utcnow()
        job.error = "Job was cancelled by user"
        self._save_to_file()

    def process_job(self, job_id: str) -> None:
        job = self._get_job(job_id)
        if not job:
            raise ValueError("job not found")
        if job.status != JobStatus.PENDING:
            raise ValueError("job not pending")
        broken_items = job.broken_items or {}
        if not broken_items:
            job.status = JobStatus.COMPLETED
            job.finished_at = datetime.utcnow()
            self._save_to_file()
            return
        cfg = self._config_manager.load()
        self._arrs.refresh_from_config(cfg)
        job.status = JobStatus.PROCESSING
        self._save_to_file()
        try:
            max_workers = max(1, cfg.repair.workers or 1)

            def _process_arr(name: str, items: List[ContentFile]) -> None:
                arr = self._arrs.get(name)
                if not arr:
                    return
                arr.delete_files(items)
                arr.search_missing(items)

            with ThreadPoolExecutor(max_workers=max_workers) as executor:
                futures = [executor.submit(_process_arr, name, items) for name, items in broken_items.items()]
                for future in as_completed(futures):
                    future.result()
            job.status = JobStatus.COMPLETED
            job.finished_at = datetime.utcnow()
        except Exception as exc:
            job.status = JobStatus.FAILED
            job.failed_at = datetime.utcnow()
            job.finished_at = datetime.utcnow()
            job.error = str(exc)
        self._save_to_file()

    def delete_jobs(self, ids: List[str]) -> None:
        if not ids:
            return
        with self._lock:
            for key, job in list(self._jobs.items()):
                if job.id in ids:
                    del self._jobs[key]
        self._save_to_file()

    def _get_job(self, job_id: str) -> Optional[RepairJob]:
        with self._lock:
            for job in self._jobs.values():
                if job.id == job_id:
                    return job
        return None

    def _resolve_arrs(self, arr_names: List[str]) -> List[str]:
        cfg = self._config_manager.load()
        if not arr_names:
            names = []
            for arr in cfg.arrs:
                if not arr.name or arr.skip_repair:
                    continue
                if not arr.host or not arr.token:
                    continue
                names.append(arr.name)
            return names
        names = []
        for name in arr_names:
            arr = self._arrs.get(name)
            if not arr:
                continue
            if arr.skip_repair:
                continue
            names.append(arr.name)
        return names

    def _run_job(self, job: RepairJob) -> None:
        cfg = self._config_manager.load()
        self._arrs.refresh_from_config(cfg)
        try:
            self._pre_run_checks(cfg.repair)
            broken_items: Dict[str, List[ContentFile]] = {}
            max_workers = max(1, cfg.repair.workers or 1)
            lock = threading.Lock()

            def _process_arr(arr_name: str) -> None:
                if job.cancelled():
                    return
                arr = self._arrs.get(arr_name)
                if not arr:
                    return
                items = self._repair_arr(job, arr, cfg.repair)
                if items:
                    with lock:
                        broken_items[arr_name] = items

            with ThreadPoolExecutor(max_workers=max_workers) as executor:
                futures = [executor.submit(_process_arr, arr_name) for arr_name in job.arrs]
                for future in as_completed(futures):
                    if job.cancelled():
                        raise RuntimeError("job cancelled")
                    future.result()
            if job.cancelled():
                job.status = JobStatus.CANCELLED
                job.finished_at = datetime.utcnow()
                job.error = "Job was cancelled"
            elif not broken_items:
                job.status = JobStatus.COMPLETED
                job.finished_at = datetime.utcnow()
            else:
                job.broken_items = broken_items
                if job.auto_process:
                    job.status = JobStatus.COMPLETED
                    job.finished_at = datetime.utcnow()
                else:
                    job.status = JobStatus.PENDING
            self._save_to_file()
        except Exception as exc:
            if job.cancelled():
                job.status = JobStatus.CANCELLED
                job.error = "Job was cancelled"
            else:
                job.status = JobStatus.FAILED
                job.error = str(exc)
                job.failed_at = datetime.utcnow()
            job.finished_at = datetime.utcnow()
            self._save_to_file()

    def _pre_run_checks(self, repair_cfg: Repair) -> None:
        if repair_cfg.use_webdav:
            if not self._debrids.caches():
                raise RuntimeError("No debrid caches found")
            return
        if repair_cfg.zurg_url:
            resp = httpx.get(f"{repair_cfg.zurg_url.rstrip('/')}/http/version.txt", timeout=10.0)
            if resp.status_code != 200:
                raise RuntimeError("Zurg not reachable")

    def _repair_arr(self, job: RepairJob, arr: ArrClient, repair_cfg: Repair) -> List[ContentFile]:
        media_ids = job.media_ids or []
        contents: List[Content] = []
        if not media_ids:
            contents = arr.get_media("")
        else:
            for media_id in media_ids:
                contents.extend(arr.get_media(media_id))
        if not contents:
            return []
        self._check_mount_up(contents)
        max_workers = max(1, repair_cfg.workers or 1)

        def _process_content(content: Content) -> List[ContentFile]:
            if job.cancelled():
                return []
            items = self._get_broken_files(job, content, repair_cfg)
            if items and job.auto_process:
                arr.delete_files(items)
                arr.search_missing(items)
            return items or []

        broken: List[ContentFile] = []
        with ThreadPoolExecutor(max_workers=max_workers) as executor:
            futures = [executor.submit(_process_content, content) for content in contents]
            for future in as_completed(futures):
                if job.cancelled():
                    break
                items = future.result()
                if items:
                    broken.extend(items)
        return broken

    def _check_mount_up(self, contents: List[Content]) -> None:
        sample = None
        for content in contents:
            if content.files:
                sample = content
                break
        if not sample:
            return
        for file in sample.files:
            if not os.path.exists(file.path):
                raise RuntimeError(f"file {file.path} does not exist")
            target = _symlink_target(file.path)
            if target and not os.path.exists(target):
                raise RuntimeError(f"symlink target {target} missing")

    def _get_broken_files(self, job: RepairJob, content: Content, repair_cfg: Repair) -> List[ContentFile]:
        if repair_cfg.use_webdav:
            return self._get_webdav_broken_files(job, content, repair_cfg)
        if repair_cfg.zurg_url:
            return self._get_zurg_broken_files(job, content, repair_cfg)
        return self._get_file_broken_files(content)

    def _get_file_broken_files(self, content: Content) -> List[ContentFile]:
        broken: List[ContentFile] = []
        for parent, files in _collect_files(content).items():
            for file in files:
                if _file_unreadable(file.path):
                    broken.append(file)
        return broken

    def _get_zurg_broken_files(self, job: RepairJob, content: Content, repair_cfg: Repair) -> List[ContentFile]:
        broken: List[ContentFile] = []
        base = repair_cfg.zurg_url.rstrip("/")
        for torrent_path, files in _collect_files(content).items():
            if job.cancelled():
                return broken
            torrent_name = urllib.parse.quote(os.path.basename(torrent_path))
            for file in files:
                if not os.path.exists(file.path):
                    broken.append(file)
                    continue
                target = file.target_path or os.path.basename(file.path)
                encoded = urllib.parse.quote(target)
                url = f"{base}/http/__all__/{torrent_name}/{encoded}"
                try:
                    resp = httpx.get(url, timeout=10.0)
                except Exception:
                    broken.append(file)
                    continue
                if resp.status_code < 200 or resp.status_code >= 300:
                    broken.append(file)
        return broken

    def _get_webdav_broken_files(self, job: RepairJob, content: Content, repair_cfg: Repair) -> List[ContentFile]:
        broken: List[ContentFile] = []
        for torrent_path, files in _collect_files(content).items():
            if job.cancelled():
                return broken
            debrid_name = _find_debrid_for_path(self._config_manager.load(), torrent_path)
            if not debrid_name:
                broken.extend(files)
                continue
            cache = self._debrids.cache(debrid_name)
            if not cache:
                broken.extend(files)
                continue
            torrent_name = os.path.basename(torrent_path)
            torrents = cache.torrents_for_folder(torrent_name)
            if not torrents:
                broken.extend(files)
                continue
            torrent = torrents[0]
            file_paths = [f.target_path or os.path.basename(f.path) for f in files]
            broken_paths = cache.get_broken_files(
                torrent,
                file_paths,
                strategy=repair_cfg.strategy,
                reinsert=True,
            )
            if broken_paths is None:
                continue
            broken_set = set(broken_paths)
            for file in files:
                if (file.target_path or os.path.basename(file.path)) in broken_set:
                    broken.append(file)
        return broken


def _file_unreadable(path: str) -> bool:
    try:
        if not os.path.isfile(path):
            return True
        with open(path, "rb") as f:
            chunk = f.read(1024)
        if not chunk:
            return True
    except OSError:
        return True
    return False


def _symlink_target(path: str) -> str:
    if not os.path.islink(path):
        return ""
    try:
        target = os.readlink(path)
    except OSError:
        return ""
    if not os.path.isabs(target):
        target = os.path.join(os.path.dirname(path), target)
    return target


def _collect_files(content: Content) -> Dict[str, List[ContentFile]]:
    unique: Dict[str, List[ContentFile]] = {}
    for file in content.files:
        target = _symlink_target(file.path)
        if not target:
            continue
        file.is_symlink = True
        dir_path, name = os.path.split(target)
        file.target_path = name
        unique.setdefault(os.path.normpath(dir_path), []).append(file)
    return unique


def _find_debrid_for_path(config, torrent_path: str) -> str:
    parent = os.path.normpath(os.path.dirname(torrent_path))
    for debrid in config.debrids:
        mount = debrid.folder or debrid.rclone_mount_path
        if not mount:
            continue
        if os.path.normpath(mount) == parent:
            return debrid.name or ""
    return ""


def _parse_dt(value: Optional[str]) -> Optional[datetime]:
    if not value:
        return None
    try:
        return datetime.fromisoformat(value)
    except ValueError:
        return None


def _new_id() -> str:
    import uuid

    return str(uuid.uuid4())
