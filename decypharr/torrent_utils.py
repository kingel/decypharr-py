from __future__ import annotations

import base64
import hashlib
import re
from typing import Optional
import urllib.parse

import bencodepy


MAGNET_INFOHASH_RE = re.compile(r"xt=urn:btih:([A-Za-z0-9]+)")


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
