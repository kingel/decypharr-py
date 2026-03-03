# Feature Status

This page tracks the current feature coverage of this repository.

Legend:
- **Done**: Implemented and works end-to-end.
- **Partial**: Implemented, but missing behavior, edge cases, or UX parity.
- **Planned**: Not implemented yet.

## Core UI & Config

| Area | Status | Notes |
| --- | --- | --- |
| UI pages (dashboard/download/repair/settings/login) | Done | Uses shared templates. |
| Auth + sessions | Done | Login + session middleware. |
| Config persistence | Done | `config.json`, `auth.json`, `torrents.json`. |
| Settings validation | Partial | Some UI validation differences remain. |

## Debrid Providers

| Provider | Status | Notes |
| --- | --- | --- |
| Real-Debrid | Done | Submit/list/info/delete/unrestrict + cache checks. |
| TorBox | Done | API integration and cache checks. |
| Debrid-Link | Planned | Not yet implemented. |
| AllDebrid | Planned | Not yet implemented. |

## Debrid Pipeline

| Area | Status | Notes |
| --- | --- | --- |
| Cache availability checks | Done | Batch checks when possible. |
| Insert + list sync | Done | Uses provider list polling. |
| Remove from debrid | Done | Delete path supported. |
| Error mapping to qBittorrent | Partial | Some error responses differ. |

## WebDAV

| Area | Status | Notes |
| --- | --- | --- |
| WebDAV server | Done | WsgiDAV provider. |
| Per-provider dirs | Done | `realdebrid/`, `torbox/`, etc. |
| Special folders | Partial | `__all__`, `__bad__` parity still improving. |
| Auth for WebDAV | Done | Uses app credentials (Basic auth). |
| RAR per-file extraction | Done | Requires `unrar` or `bsdtar`. |

## Rclone / Mounting

| Area | Status | Notes |
| --- | --- | --- |
| Internal rclone mounts | Done | rclone `rcd` managed by the app. |
| Mount lifecycle | Done | Auto-start/stop with config changes. |
| RC stats in UI | Partial | Core stats shown; more parity pending. |

## qBittorrent API (Arr)

| Area | Status | Notes |
| --- | --- | --- |
| Auth/login | Done | qBittorrent-compatible auth. |
| Add torrent | Done | Magnet + URL; cache gate. |
| List/info | Done | Basic list/status fields. |
| Categories/tags | Done | Basic support. |
| Sync/maindata | Partial | Core fields only. |
| Trackers/peers/priorities | Planned | Not yet implemented. |

## Arr Integration

| Area | Status | Notes |
| --- | --- | --- |
| Arr autodetect | Done | Auth-based auto-detect. |
| Completion callbacks | Done | Added richer payload. |
| Failure callbacks | Done | Fired on error states. |
| Cleanup worker | Done | Queue cleanup loop every 10s. |
| Auto-remove completed | Done | Removes completed items after Arr import. |

## Repair Worker

| Area | Status | Notes |
| --- | --- | --- |
| Queue + worker loop | Done | Basic behavior implemented. |
| Reinsert logic | Partial | Simplified vs original. |
| UI actions wired | Done | Actions trigger real behavior. |

## Dashboard & Stats

| Area | Status | Notes |
| --- | --- | --- |
| Core stats | Done | System + debrid stats. |
| Advanced stats | Partial | CPU%, disk, limits added; more parity pending. |

## Tests

| Area | Status | Notes |
| --- | --- | --- |
| Unit tests | Partial | Basic pytest coverage only. |
| Integration tests | Planned | Stack-level tests still missing. |

If you want a specific feature prioritized, share the exact behavior you want mirrored from the original project.
