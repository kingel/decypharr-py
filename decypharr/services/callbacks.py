from __future__ import annotations

from dataclasses import asdict, is_dataclass
from typing import Any, Dict

import httpx


def _to_serializable(value: Any) -> Any:
    if is_dataclass(value):
        return {k: _to_serializable(v) for k, v in asdict(value).items()}
    if isinstance(value, dict):
        return {k: _to_serializable(v) for k, v in value.items()}
    if isinstance(value, list):
        return [_to_serializable(v) for v in value]
    return value


def send_callback(url: str, payload: Dict[str, Any]) -> None:
    if not url:
        return
    try:
        httpx.post(url, json=_to_serializable(payload), timeout=10.0)
    except Exception:
        return
