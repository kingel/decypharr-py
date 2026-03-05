import { LitElement, html, css } from 'lit'
import { escapeHtml, fetcher, formatBytes, formatDuration, formatNumber, joinURL } from '../utils.js'

export class SystemStats extends LitElement {
  static properties = {
    stats: { type: Object },
    loading: { type: Boolean },
    error: { type: String },
  }

  static styles = css`
    :host { display: block; }
    .header { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.5rem; }
    .title { font-size: 1.5rem; font-weight: 700; }
    .section { display: flex; flex-direction: column; gap: 1.5rem; }
    .grid { display: grid; gap: 1rem; }
    .grid-2 { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
    .grid-3 { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
    .grid-6 { grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); }
    .stat-card { display: flex; flex-direction: column; gap: 0.25rem; }
    .stat-title { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--app-text-muted); }
    .stat-value { font-size: 1.1rem; font-weight: 600; }
    .stat-desc { font-size: 0.85rem; color: var(--app-text-muted); }
    .muted { color: var(--app-text-muted); }
    .pill { display: inline-flex; align-items: center; gap: 0.35rem; }
    .subtle { background: var(--app-surface-muted); padding: 0.5rem; border-radius: var(--app-radius); }
    .scroll { max-height: 280px; overflow-y: auto; }
    .callout-row { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; flex-wrap: wrap; }
  `

  constructor() {
    super()
    this.stats = null
    this.loading = false
    this.error = ''
    this._timer = null
  }

  connectedCallback() {
    super.connectedCallback()
    this._loadStats()
    this._timer = window.setInterval(() => this._loadStats(), 30000)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    if (this._timer) window.clearInterval(this._timer)
  }

  async _loadStats() {
    this.loading = true
    this.error = ''
    try {
      const resp = await fetcher('/debug/stats')
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
      this.stats = await resp.json()
    } catch (err) {
      this.error = err.message || 'Failed to load statistics'
    } finally {
      this.loading = false
    }
  }

  _renderOverview(stats) {
    const heapAlloc = stats.heap_alloc_mb || '-'
    const totalAlloc = stats.total_alloc_mb || null
    const heapText = totalAlloc ? `Heap: ${heapAlloc} | Total: ${totalAlloc}` : `Heap: ${heapAlloc}`
    const loadAvg = Array.isArray(stats.load_avg) ? stats.load_avg.map(v => v.toFixed(2)).join(', ') : '-'

    return html`
      <wa-card>
        <div class="section">
          <div class="pill">
            <wa-icon name="gauge"></wa-icon>
            <strong>System Overview</strong>
          </div>
          <div class="grid grid-6">
            <div class="stat-card">
              <div class="stat-title">System</div>
              <div class="stat-value">${stats.os || '-'}</div>
              <div class="stat-desc">${stats.runtime_version || stats.go_version || '-'}</div>
            </div>
            <div class="stat-card">
              <div class="stat-title">CPU Cores</div>
              <div class="stat-value">${stats.num_cpu || '-'}</div>
              <div class="stat-desc">${stats.arch || '-'}</div>
            </div>
            <div class="stat-card">
              <div class="stat-title">CPU %</div>
              <div class="stat-value">${stats.cpu_percent ? `${stats.cpu_percent.toFixed(1)}%` : '0%'}</div>
              <div class="stat-desc">Load: ${loadAvg}</div>
            </div>
            <div class="stat-card">
              <div class="stat-title">Memory Used</div>
              <div class="stat-value">${stats.memory_used || '-'}</div>
              <div class="stat-desc">${heapText}</div>
            </div>
            <div class="stat-card">
              <div class="stat-title">Threads</div>
              <div class="stat-value">${formatNumber(stats.goroutines || 0)}</div>
              <div class="stat-desc">GC: ${formatNumber(stats.gc_cycles || 0)} cycles</div>
            </div>
            <div class="stat-card">
              <div class="stat-title">Async Tasks</div>
              <div class="stat-value">${formatNumber(stats.async_tasks || 0)}</div>
              <div class="stat-desc">Event Loop</div>
            </div>
          </div>
        </div>
      </wa-card>
    `
  }

  _renderDebrid(stats) {
    const debrids = stats.debrids || []
    if (!debrids.length) {
      return html`
        <wa-card>
          <div class="pill"><wa-icon name="cloud"></wa-icon><strong>Debrid Services</strong></div>
          <p class="muted">No debrid services configured.</p>
        </wa-card>
      `
    }

    return html`
      <wa-card>
        <div class="section">
          <div class="pill"><wa-icon name="cloud"></wa-icon><strong>Debrid Services</strong></div>
          <div class="grid grid-2">
            ${debrids.map(debrid => {
              const profile = debrid.profile || {}
              const library = debrid.library || {}
              const accounts = debrid.accounts || []
              const status = debrid.status || 'unknown'
              const checkedAt = debrid.checked_at ? new Date(debrid.checked_at).toLocaleString() : null
              const errorText = debrid.error ? escapeHtml(debrid.error) : null
              const statusBadge = status === 'ok'
                ? html`<wa-badge variant="success" pill>Key OK</wa-badge>`
                : status === 'error'
                  ? html`<wa-badge variant="danger" pill>Key Error</wa-badge>`
                  : html`<wa-badge variant="neutral" pill>Unknown</wa-badge>`

              return html`
                <div class="subtle">
                  <div style="display:flex; justify-content: space-between; gap: 1rem;">
                    <div>
                      <strong>${profile.name || 'Unknown Service'}</strong>
                      <div class="muted">${profile.username || 'No username'}</div>
                    </div>
                    <div style="text-align:right;">
                      ${statusBadge}
                      ${checkedAt ? html`<div class="muted">Checked: ${checkedAt}</div>` : null}
                      <div class="muted">${formatNumber(profile.points || 0)} points</div>
                      <div class="muted">Type: ${profile.type || 'Unknown'}</div>
                      <div class="muted">Expires: ${profile.expiration ? new Date(profile.expiration).toLocaleDateString() : 'Unknown'}</div>
                    </div>
                  </div>
                  ${errorText ? html`<wa-callout variant="danger" appearance="outlined">${errorText}</wa-callout>` : null}
                  <div class="grid grid-3" style="margin-top: 0.75rem;">
                    <div class="stat-card">
                      <div class="stat-title">Library Size</div>
                      <div class="stat-value">${formatNumber(library.total || 0)}</div>
                      ${library.total_bytes ? html`<div class="stat-desc">${formatBytes(library.total_bytes)}</div>` : null}
                    </div>
                    <div class="stat-card">
                      <div class="stat-title">Bad Torrents</div>
                      <div class="stat-value">${formatNumber(library.bad || 0)}</div>
                    </div>
                    <div class="stat-card">
                      <div class="stat-title">Active Links</div>
                      <div class="stat-value">${formatNumber(library.active_links || 0)}</div>
                    </div>
                    <div class="stat-card">
                      <div class="stat-title">Files</div>
                      <div class="stat-value">${formatNumber(library.files || 0)}</div>
                    </div>
                    <div class="stat-card">
                      <div class="stat-title">Total Accounts</div>
                      <div class="stat-value">${formatNumber(accounts.length)}</div>
                    </div>
                  </div>
                </div>
              `
            })}
          </div>
        </div>
      </wa-card>
    `
  }

  _renderDisk(stats) {
    const disk = stats.disk
    if (!disk) {
      return html`<wa-card><p class="muted">No disk data available.</p></wa-card>`
    }
    const entries = [
      { label: 'Root', data: disk.root },
      { label: 'Data', data: disk.data },
    ]
    return html`
      <wa-card>
        <div class="pill"><wa-icon name="hard-drive"></wa-icon><strong>Disk Usage</strong></div>
        <div class="section">
          ${entries.map(entry => {
            const data = entry.data || {}
            const total = data.total || 0
            const used = data.used || 0
            const free = data.free || 0
            const percent = total > 0 ? Math.round((used / total) * 100) : 0
            return html`
              <div class="subtle">
                <div style="display:flex; justify-content: space-between; gap: 1rem;">
                  <strong>${entry.label}</strong>
                  <div class="muted">${data.path || ''}</div>
                </div>
                <wa-progress-bar value="${percent}"></wa-progress-bar>
                <div class="grid grid-3" style="margin-top: 0.5rem;">
                  <div class="stat-desc">Used: ${formatBytes(used)}</div>
                  <div class="stat-desc">Total: ${formatBytes(total)}</div>
                  <div class="stat-desc">Free: ${formatBytes(free)}</div>
                </div>
              </div>
            `
          })}
        </div>
      </wa-card>
    `
  }

  _renderLimits(stats) {
    const limits = stats.limits
    if (!limits) {
      return html`<wa-card><p class="muted">No limit data available.</p></wa-card>`
    }
    const memoryLimit = limits.memory_limit ? formatBytes(limits.memory_limit) : 'Unlimited'
    const cpuLimit = limits.cpu_limit ? `${limits.cpu_limit.toFixed(2)} cores` : 'Unlimited'
    return html`
      <wa-card>
        <div class="pill"><wa-icon name="sliders"></wa-icon><strong>Container Limits</strong></div>
        <div class="grid grid-2">
          <div class="stat-card">
            <div class="stat-title">Memory Limit</div>
            <div class="stat-value">${memoryLimit}</div>
          </div>
          <div class="stat-card">
            <div class="stat-title">CPU Limit</div>
            <div class="stat-value">${cpuLimit}</div>
          </div>
        </div>
      </wa-card>
    `
  }

  _renderRclone(stats) {
    const rclone = stats.rclone
    const status = !rclone || !rclone.enabled ? 'Disabled' : rclone.server_ready ? 'Active' : 'Not Ready'
    const statusVariant = status === 'Active' ? 'success' : status === 'Not Ready' ? 'warning' : 'danger'
    return html`
      <wa-card>
        <div class="header">
          <div class="pill"><wa-icon name="cloud-arrow-up"></wa-icon><strong>Rclone Statistics</strong></div>
          <wa-button href="${joinURL(window.urlBase || '', 'debug/logs/rclone')}" appearance="outlined" size="small" target="_blank">
            View Rclone Logs
          </wa-button>
        </div>
        <wa-badge variant="${statusVariant}" pill>${status}</wa-badge>
        ${!rclone || !rclone.enabled ? html`<p class="muted">Rclone is not enabled or configured.</p>` : null}
        ${rclone && !rclone.server_ready ? html`<p class="muted">Rclone server is not ready.</p>` : null}
        ${rclone && rclone.server_ready ? html`
          <div class="grid grid-3">
            ${rclone.version ? html`
              <div class="stat-card">
                <div class="stat-title">Rclone Version</div>
                <div class="stat-value">${rclone.version.version || 'Unknown'}</div>
                <div class="stat-desc">${rclone.version.arch || ''} ${rclone.version.os || ''}</div>
              </div>
            ` : null}
            ${rclone.core ? html`
              <div class="stat-card">
                <div class="stat-title">Transferred</div>
                <div class="stat-value">${formatBytes(rclone.core.bytes || 0)}</div>
                <div class="stat-desc">Speed: ${formatBytes(rclone.core.speed || 0)}/s</div>
              </div>
              <div class="stat-card">
                <div class="stat-title">Transfers</div>
              <div class="stat-value">${formatNumber(rclone.core.transfers || 0)}</div>
                <div class="stat-desc">Errors: ${formatNumber(rclone.core.errors || 0)}</div>
              </div>
              <div class="stat-card">
                <div class="stat-title">Checks</div>
              <div class="stat-value">${formatNumber(rclone.core.checks || 0)}</div>
                <div class="stat-desc">Total: ${formatNumber(rclone.core.totalChecks || 0)}</div>
              </div>
              <div class="stat-card">
                <div class="stat-title">Uptime</div>
                <div class="stat-value">${formatDuration(rclone.core.elapsedTime)}</div>
                <div class="stat-desc">Transfer: ${formatDuration(rclone.core.transferTime)}</div>
              </div>
            ` : null}
            ${rclone.memory ? html`
              <div class="stat-card">
                <div class="stat-title">Rclone Memory</div>
                <div class="stat-value">${formatBytes(rclone.memory.Sys || 0)}</div>
                <div class="stat-desc">Heap: ${formatBytes(rclone.memory.TotalAlloc || 0)}</div>
              </div>
            ` : null}
          </div>
          ${rclone.core && rclone.core.transferring && rclone.core.transferring.length ? html`
            <div class="section">
              <div class="pill"><wa-icon name="arrows-rotate"></wa-icon><strong>Active Transfers (${rclone.core.transferring.length})</strong></div>
              <div class="scroll">
                ${rclone.core.transferring.map(transfer => {
                  const progress = ((transfer.bytes || 0) / (transfer.size || 1)) * 100
                  return html`
                    <div class="subtle">
                      <div style="display:flex; justify-content: space-between; gap: 1rem;">
                        <strong>${transfer.name || 'Unknown'}</strong>
                        <span class="muted">${formatBytes(transfer.speed || 0)}/s</span>
                      </div>
                      <wa-progress-bar value="${progress}"></wa-progress-bar>
                      <div class="muted">
                        ${formatBytes(transfer.bytes || 0)} / ${formatBytes(transfer.size || 0)} · ETA: ${transfer.eta ? formatDuration(transfer.eta) : 'Unknown'}
                      </div>
                    </div>
                  `
                })}
              </div>
            </div>
          ` : null}
          ${rclone.mounts && Object.keys(rclone.mounts).length ? html`
            <div class="section">
              <div class="pill"><wa-icon name="hard-drive"></wa-icon><strong>Mounted Services</strong></div>
              <div class="grid grid-2">
                ${Object.entries(rclone.mounts).map(([name, mount]) => {
                  const mounted = mount.mounted
                  return html`
                    <div class="subtle">
                      <div style="display:flex; justify-content: space-between; gap: 1rem;">
                        <div>
                          <strong>${mount.config_name || name}</strong>
                          <div class="muted">${mount.provider || 'Unknown Provider'}</div>
                          ${mount.local_path ? html`<div class="muted">${mount.local_path}</div>` : null}
                        </div>
                        <wa-badge variant="${mounted ? 'success' : 'danger'}" pill>${mounted ? 'Mounted' : 'Not Mounted'}</wa-badge>
                      </div>
                      ${mount.error ? html`<wa-callout variant="danger" appearance="outlined">${mount.error}</wa-callout>` : null}
                    </div>
                  `
                })}
              </div>
            </div>
          ` : null}
          ${rclone.bandwidth && rclone.bandwidth.rate !== 'off' ? html`
            <div class="section">
              <div class="pill"><wa-icon name="gauge"></wa-icon><strong>Bandwidth Limits</strong></div>
              <div class="grid grid-2">
                <div class="stat-card">
                  <div class="stat-title">Bytes Per Seconds</div>
                  <div class="stat-value">${formatBytes(rclone.bandwidth.bytesPerSecond)}</div>
                </div>
                <div class="stat-card">
                  <div class="stat-title">Rate</div>
                  <div class="stat-value">${formatBytes(rclone.bandwidth.rate)}</div>
                </div>
              </div>
            </div>
          ` : null}
        ` : null}
      </wa-card>
    `
  }

  render() {
    return html`
      <div class="header">
        <div class="title">System Statistics</div>
        <wa-button appearance="outlined" size="small" @click=${this._loadStats}>
          <wa-icon slot="start" name="arrows-rotate"></wa-icon>
          Refresh
        </wa-button>
      </div>

      ${this.loading ? html`
        <wa-card class="subtle">
          <wa-spinner></wa-spinner>
          <span class="muted">Loading system statistics...</span>
        </wa-card>
      ` : null}

      ${this.error ? html`
        <wa-callout variant="danger" appearance="outlined">
          <wa-icon slot="icon" name="triangle-exclamation"></wa-icon>
          <div class="callout-row">
            <span>${this.error}</span>
            <wa-button appearance="outlined" size="small" @click=${this._loadStats}>
              Retry
            </wa-button>
          </div>
        </wa-callout>
      ` : null}

      ${!this.loading && !this.error && this.stats ? html`
        <div class="section">
          ${this._renderOverview(this.stats)}
          ${this._renderDebrid(this.stats)}
          <div class="grid grid-2">
            ${this._renderDisk(this.stats)}
            ${this._renderLimits(this.stats)}
          </div>
          ${this._renderRclone(this.stats)}
        </div>
      ` : null}
    `
  }
}

customElements.define('system-stats', SystemStats)
