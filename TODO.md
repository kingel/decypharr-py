# TODO

- Done: qBittorrent tracker + file priority parity (stored in torrent state).
- Done: WebDAV `__all__` ordering + `__bad__` listing + delete-all.
- Done: Align qBittorrent error responses with Go behavior.
- Done: Add qBittorrent error-response tests (auth/add/delete).
- Done: Setup validation parity (Go-style checks + settings redirect).
- Update: next step pending user direction.
- Update: docs refreshed (constraints/next step).
- Done: System stats parity (go_version/total_alloc/gc cycles).
- Deferred: decide static asset strategy (commit `decypharr/web/static/build/` or add CI build step).
- Constraints: static assets directory must exist (missing `decypharr/web/static/build/` breaks app/tests).
- Tighten UI validation to match Go behavior for settings forms (client-side rules).
- Manual: integration/stack tests (Arr + debrid + WebDAV flows).
- Add additional debrid providers (Debrid‑Link, AllDebrid).
