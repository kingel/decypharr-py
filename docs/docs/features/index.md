# Features Overview

Decypharr extends the functionality of qBittorrent by integrating with Debrid services, providing several powerful features that enhance your media management experience.

## Core Features

### Mock qBittorrent API

Decypharr implements a complete qBittorrent-compatible API that can be used with Sonarr, Radarr, Lidarr, and other Arr applications. This allows you to:

- Seamlessly integrate with your existing Arr setup
- Use familiar interfaces to manage your downloads
- Benefit from Debrid services without changing your workflow

### Comprehensive UI

The Decypharr user interface provides:

- Torrent management capabilities
- Status monitoring
- Configuration options
- Multi-provider configuration for implemented and planned Debrid backends

## Advanced Features

Decypharr includes several advanced features that extend its capabilities:

- [Repair Support](repair-worker.md): Identifies and fixes issues with your media files
- WebDav Server: Provides direct access to your Debrid files
- Mounting Support: Allows you to mount Debrid services using [rclone](https://rclone.org), making it easy to access your files directly from your system
- Multiple Debrid Providers: Real Debrid and Torbox are implemented today, with Debrid Link and All Debrid planned

## Debrid Provider Status

Implemented providers:

- Real Debrid
- Torbox

Planned providers:

- Debrid Link
- All Debrid

Each provider is intended to be configurable separately. See the feature status page for current implementation coverage.
