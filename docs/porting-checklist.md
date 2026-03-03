# Implementation Checklist

Status legend:
- Done: implemented and works end-to-end
- Partial: core behavior exists, edge cases or advanced behavior missing
- Missing: not implemented yet

## Core UI & Auth
- Done: Core UI pages (dashboard/download/repair/settings/login)
- Done: App auth + sessions
- Done: Config persistence (config + auth JSON, UI save)

## Debrid Integrations
- Done: Real-Debrid submit/list/info/delete/unrestrict
- Done: TorBox integration + cache checks
- Missing: AllDebrid/DebridLink
- Partial: Rate limits / slots / account manager

## WebDAV
- Done: WebDAV server (listing, streaming, RAR)
- Done: WebDAV auth (`enable_webdav_auth`)
- Partial: Directory filters (core supported, advanced parity pending)

## Rclone / Mounting
- Done: Internal rclone mount (rcd-managed)

## Repair Worker
- Done: Repair worker (jobs + UI)
- Partial: Reinsert strategy (simplified)

## Arr Integrations
- Done: Arr auto-detect via qbit auth (`source="auto"`)
- Done: Arr refresh on completion
- Done: Arr cleanup queue worker
- Done: Auto-remove completed after import

## qBittorrent API
- Done: Core endpoints (auth, add, info, categories, tags, pause/resume, etc.)
- Partial: Rich endpoints (sync/maindata, transfer/info added; trackers/peers/priorities not yet)

## Download Workflow
- Done: End-to-end pipeline (Arr → qbit → debrid → filesystem)
- Done: Actions (symlink/download/none)
- Missing: Multi-season handling

## Tracker Privacy
- Missing: Private tracker “remove tracker URLs” (beyond cached checks)

## Notifications / Callbacks
- Done: Callback webhooks (completion + failure)
- Missing: Discord notifications

## Tests
- Partial: Basic pytest coverage only
