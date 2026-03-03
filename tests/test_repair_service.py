from datetime import datetime

from apscheduler.schedulers.background import BackgroundScheduler

from decypharr.arr import ArrStorage, ContentFile
from decypharr.config import ConfigManager
from decypharr.debrid.storage import DebridStorage
from decypharr.services.repair import JobStatus, RepairJob, RepairService


class FakeArr:
    def __init__(self):
        self.deleted = False
        self.searched = False
        self.deleted_files = []
        self.searched_files = []

    def delete_files(self, files):
        self.deleted = True
        self.deleted_files = list(files)

    def search_missing(self, files):
        self.searched = True
        self.searched_files = list(files)


def test_process_job_calls_arr_actions(tmp_path):
    cfg = ConfigManager(tmp_path)
    config = cfg.load()
    debrids = DebridStorage(config)
    scheduler = BackgroundScheduler()
    arrs = ArrStorage()
    service = RepairService(cfg, debrids, arrs, scheduler)

    fake_arr = FakeArr()
    service._arrs._arrs = {"sonarr": fake_arr}
    service._arrs.refresh_from_config = lambda _cfg: None

    broken_file = ContentFile(path="/tmp/fake.mkv", file_id=1, media_id=2, size=100)
    job = RepairJob(
        id="job-1",
        arrs=["sonarr"],
        media_ids=[],
        created_at=datetime.utcnow(),
        status=JobStatus.PENDING,
        broken_items={"sonarr": [broken_file]},
    )
    service._jobs["key"] = job

    service.process_job("job-1")

    assert fake_arr.deleted is True
    assert fake_arr.searched is True
    assert job.status == JobStatus.COMPLETED
