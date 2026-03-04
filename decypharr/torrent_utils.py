from __future__ import annotations

import base64
import hashlib
import re
from typing import Iterable, List, Optional
import urllib.parse

import bencodepy


MAGNET_INFOHASH_RE = re.compile(r"xt=urn:btih:([A-Za-z0-9]+)")

def _dedupe(values: Iterable[str]) -> List[str]:
    seen = set()
    result: List[str] = []
    for value in values:
        cleaned = value.strip()
        if not cleaned or cleaned in seen:
            continue
        seen.add(cleaned)
        result.append(cleaned)
    return result


def _decode_tracker(value: object) -> Optional[str]:
    if isinstance(value, bytes):
        try:
            return value.decode("utf-8", "ignore")
        except Exception:
            return None
    if isinstance(value, str):
        return value
    return None


def parse_magnet_infohash(magnet: str) -> Optional[str]:
    match = MAGNET_INFOHASH_RE.search(magnet)
    if not match:
        return None
    raw = match.group(1)
    if len(raw) == 40 and all(c in "0123456789abcdefABCDEF" for c in raw):
        return raw.lower()
    # Base32
    try:
        decoded = base64.b32decode(raw.upper())
        return decoded.hex()
    except Exception:
        return None


def parse_magnet_trackers(magnet: str) -> List[str]:
    try:
        parsed = urllib.parse.urlparse(magnet)
    except Exception:
        return []
    if parsed.scheme != "magnet":
        return []
    query = urllib.parse.parse_qs(parsed.query)
    trackers = query.get("tr", [])
    return _dedupe(trackers)


def trackers_from_torrent(data: bytes) -> List[str]:
    try:
        decoded = bencodepy.decode(data)
    except Exception:
        return []
    trackers: List[str] = []
    announce = decoded.get(b"announce")
    if announce is not None:
        value = _decode_tracker(announce)
        if value:
            trackers.append(value)
    announce_list = decoded.get(b"announce-list")
    if isinstance(announce_list, list):
        for tier in announce_list:
            if not isinstance(tier, list):
                continue
            for entry in tier:
                value = _decode_tracker(entry)
                if value:
                    trackers.append(value)
    return _dedupe(trackers)


def infohash_from_torrent(data: bytes) -> Optional[str]:
    try:
        decoded = bencodepy.decode(data)
    except Exception:
        return None
    if b"info" not in decoded:
        return None
    info = decoded[b"info"]
    try:
        encoded = bencodepy.encode(info)
    except Exception:
        return None
    return hashlib.sha1(encoded).hexdigest()


def map_debrid_status(status: Optional[str]) -> str:
    if not status:
        return "pausedUP"
    lowered = status.lower()
    if lowered in ("downloaded", "completed"):
        return "pausedUP"
    if lowered in ("downloading", "queued", "waiting_files_selection", "magnet_conversion", "compressing", "uploading"):
        return "downloading"
    if lowered in ("error", "virus", "dead"):
        return "error"
    return "pausedUP"


def construct_magnet(infohash: str, name: str = "") -> str:
    hash_clean = infohash.strip().lower()
    name = name.strip()
    if name:
        dn = f"&dn={urllib.parse.quote(name)}"
    else:
        dn = ""
    return f"magnet:?xt=urn:btih:{hash_clean}{dn}"
