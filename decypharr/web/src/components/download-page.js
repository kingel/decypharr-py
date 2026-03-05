import { LitElement, html, css } from 'lit'
import { escapeHtml, fetcher, joinURL } from '../utils.js'

export class DownloadPage extends LitElement {
  static properties = {
    downloadFolder: { type: String, attribute: 'download-folder' },
    needSetup: { type: Boolean, attribute: 'need-setup' },
    hasMultiDebrid: { type: Boolean, attribute: 'has-multi-debrid' },
    alwaysRmTrackerUrls: { type: Boolean, attribute: 'always-rm-tracker-urls' },
    debrids: { type: Array },
  }

  static styles = css`
    :host { display: block; }
    .page { display: flex; flex-direction: column; gap: 1.5rem; }
    .grid { display: grid; gap: 1rem; }
    .grid-2 { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
    .grid-3 { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
    .section-title { display: flex; align-items: center; gap: 0.5rem; font-weight: 600; }
    .field-group { display: flex; flex-direction: column; gap: 0.5rem; }
    .hint { font-size: 0.85rem; color: var(--app-text-muted); }
    .file-drop {
      border: 1px dashed var(--app-border);
      border-radius: var(--app-radius);
      padding: 0.75rem;
      transition: background 0.2s, border-color 0.2s;
    }
    .file-drop.active {
      border-color: var(--app-brand-strong);
      background: var(--app-brand-bg);
    }
    .file-label { font-weight: 600; }
    .file-input {
      padding: 0.4rem;
      border: 1px solid var(--app-border);
      border-radius: var(--app-radius);
      background: var(--app-surface);
      color: var(--app-text);
    }
    wa-divider::part(base) { margin: 0.5rem 0; }
  `

  constructor() {
    super()
    this.downloadFolder = ''
    this.needSetup = false
    this.hasMultiDebrid = false
    this.alwaysRmTrackerUrls = false
    this.debrids = []
    this._loading = false
    this._fileLabel = ''
  }

  connectedCallback() {
    super.connectedCallback()
    this._loadSavedOptions()
    this._handleMagnetFromURL()
  }

  updated(changed) {
    if (changed.has('downloadFolder')) {
      this._syncFolderDefault()
    }
  }

  _parseDebrids() {
    if (this.debrids.length) return
    const raw = this.getAttribute('debrids')
    if (!raw) return
    try {
      this.debrids = JSON.parse(raw)
    } catch {
      this.debrids = []
    }
  }

  _syncFolderDefault() {
    const input = this.renderRoot?.querySelector('#downloadFolder')
    if (input && !input.value) input.value = this.downloadFolder || ''
  }

  _loadSavedOptions() {
    const values = {
      category: localStorage.getItem('downloadCategory') || '',
      action: localStorage.getItem('downloadAction') || 'symlink',
      uncached: localStorage.getItem('downloadUncached') === 'true',
      rmTrackerUrls: localStorage.getItem('rmTrackerUrls') === 'true',
      folder: localStorage.getItem('downloadFolder') || this.downloadFolder,
    }
    this.updateComplete.then(() => {
      const root = this.renderRoot
      root.getElementById('arr').value = values.category
      root.getElementById('downloadAction').value = values.action
      root.getElementById('downloadUncached').checked = values.uncached
      root.getElementById('rmTrackerUrls').checked = values.rmTrackerUrls
      root.getElementById('downloadFolder').value = values.folder
      this._parseDebrids()
    })
  }

  _saveOptions() {
    const root = this.renderRoot
    localStorage.setItem('downloadCategory', root.getElementById('arr').value)
    localStorage.setItem('downloadAction', root.getElementById('downloadAction').value)
    localStorage.setItem('downloadUncached', root.getElementById('downloadUncached').checked.toString())
    const rmTracker = root.getElementById('rmTrackerUrls')
    if (!rmTracker.disabled) {
      localStorage.setItem('rmTrackerUrls', rmTracker.checked.toString())
    }
    localStorage.setItem('downloadFolder', root.getElementById('downloadFolder').value)
  }

  _handleMagnetFromURL() {
    const magnet = new URLSearchParams(window.location.search).get('magnet')
    if (!magnet) return
    this.updateComplete.then(() => {
      this.renderRoot.getElementById('magnetURI').value = magnet
      history.replaceState({}, document.title, window.location.pathname)
      window.decypharrUtils?.createToast('Magnet link loaded from URL', 'info')
    })
  }

  _onFileChange(e) {
    const files = Array.from(e.target.files || [])
    if (!files.length) {
      this._fileLabel = ''
      return
    }
    const names = files.map(file => file.name).join(', ')
    this._fileLabel = `Selected ${files.length} file${files.length > 1 ? 's' : ''}: ${names}`
    window.decypharrUtils?.createToast(this._fileLabel, 'info')
  }

  _setDropActive(active) {
    const drop = this.renderRoot?.querySelector('.file-drop')
    if (!drop) return
    drop.classList.toggle('active', active)
  }

  _handleDrop(e) {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files || []).filter(f => f.name.toLowerCase().endsWith('.torrent'))
    if (!files.length) {
      window.decypharrUtils?.createToast('Please drop .torrent files only', 'warning')
      return
    }
    const input = this.renderRoot.getElementById('torrentFiles')
    const dt = new DataTransfer()
    files.forEach(file => dt.items.add(file))
    input.files = dt.files
    this._onFileChange({ target: { files } })
  }

  async _submit(e) {
    e.preventDefault()
    const root = this.renderRoot
    const magnets = root.getElementById('magnetURI').value.split('\n').map(v => v.trim()).filter(Boolean)
    const files = root.getElementById('torrentFiles').files
    const total = magnets.length + files.length

    if (total === 0) {
      window.decypharrUtils?.createToast('Please provide at least one torrent', 'warning')
      return
    }
    if (total > 100) {
      window.decypharrUtils?.createToast('Please submit up to 100 torrents at a time', 'warning')
      return
    }

    const formData = new FormData()
    if (magnets.length) formData.append('urls', magnets.join('\n'))
    for (const file of files) formData.append('files', file)

    formData.append('arr', root.getElementById('arr').value)
    formData.append('downloadFolder', root.getElementById('downloadFolder').value)
    formData.append('action', root.getElementById('downloadAction').value)
    formData.append('downloadUncached', root.getElementById('downloadUncached').checked)
    formData.append('rmTrackerUrls', root.getElementById('rmTrackerUrls').checked)
    if (this.hasMultiDebrid) {
      formData.append('debrid', root.getElementById('debrid').value)
    }

    this._loading = true
    try {
      const resp = await fetcher('/api/add', { method: 'POST', body: formData, headers: {} })
      const data = await resp.json()
      if (!resp.ok) throw new Error(data.error || 'Unknown error')

      if (data.errors && data.errors.length > 0) {
        if (data.results.length > 0) {
          window.decypharrUtils?.createToast(`Added ${data.results.length} torrents with ${data.errors.length} errors`, 'warning')
          this._showErrors(data.errors)
        } else {
          window.decypharrUtils?.createToast('Failed to add torrents', 'error')
          this._showErrors(data.errors)
        }
      } else {
        window.decypharrUtils?.createToast(`Successfully added ${data.results.length} torrent${data.results.length > 1 ? 's' : ''}!`)
        this._clearForm()
      }
    } catch (err) {
      window.decypharrUtils?.createToast(`Error adding downloads: ${err.message}`, 'error')
    } finally {
      this._loading = false
    }
  }

  _showErrors(errors) {
    const text = errors.map(err => `• ${err}`).join('\n')
    console.error('Download errors:', text)
    window.decypharrUtils?.createToast(`Errors occurred while adding torrents:\n${text}`, 'error')
  }

  _clearForm() {
    const root = this.renderRoot
    root.getElementById('magnetURI').value = ''
    root.getElementById('torrentFiles').value = ''
    this._fileLabel = ''
  }

  render() {
    this._parseDebrids()
    return html`
      <div class="page">
        ${this.needSetup ? html`
          <wa-callout variant="warning" appearance="accent">
            <wa-icon slot="icon" name="triangle-exclamation"></wa-icon>
            <strong>Configuration Required</strong>
            <div class="hint">
              Your configuration is incomplete. Complete setup in the
              <a href="${joinURL(window.urlBase || '', 'settings')}">Settings page</a>.
            </div>
          </wa-callout>
        ` : null}

        <wa-card>
          <div class="section-title">
            <wa-icon name="magnet"></wa-icon>
            Add Torrents
          </div>
          <form @submit=${this._submit} @change=${this._saveOptions}>
            <div class="grid grid-2">
              <div class="field-group">
                <wa-textarea
                  id="magnetURI"
                  name="urls"
                  label="Torrent Links"
                  hint="Paste magnet links or URLs, one per line."
                  rows="6"
                ></wa-textarea>
              </div>
              <div class="field-group file-drop"
                   @dragenter=${e => { e.preventDefault(); this._setDropActive(true) }}
                   @dragover=${e => { e.preventDefault(); this._setDropActive(true) }}
                   @dragleave=${e => { e.preventDefault(); this._setDropActive(false) }}
                   @drop=${e => { this._setDropActive(false); this._handleDrop(e) }}>
                <label class="file-label" for="torrentFiles">Upload Torrent Files</label>
                <input
                  id="torrentFiles"
                  class="file-input"
                  type="file"
                  name="torrents"
                  accept=".torrent"
                  multiple
                  @change=${this._onFileChange}
                />
                <div class="hint">Select one or more .torrent files.</div>
                ${this._fileLabel ? html`<div class="hint">${escapeHtml(this._fileLabel)}</div>` : null}
              </div>
            </div>

            <wa-divider></wa-divider>

            <div class="grid grid-3">
              <div class="field-group">
                <wa-select id="downloadAction" name="downloadAction" label="Post Download Action" hint="How to handle files after download completion">
                  <wa-option value="symlink">Create Symlink</wa-option>
                  <wa-option value="download">Download Files</wa-option>
                  <wa-option value="none">No Action</wa-option>
                </wa-select>
              </div>
              <div class="field-group">
                <wa-input id="downloadFolder" name="downloadFolder" label="Download Folder" placeholder="/downloads/torrents" hint="Leave empty to use default qBittorrent folder"></wa-input>
              </div>
              <div class="field-group">
                <wa-input id="arr" name="arr" label="Arr Category" placeholder="sonarr, radarr, etc." hint="Optional: specify which Arr service should handle this"></wa-input>
              </div>
              ${this.hasMultiDebrid ? html`
                <div class="field-group">
                  <wa-select id="debrid" name="debrid" label="Debrid Service" hint="Choose which debrid service to use">
                    ${this.debrids.map((debrid, index) => html`
                      <wa-option value="${debrid}" ?selected=${index === 0}>${debrid}</wa-option>
                    `)}
                  </wa-select>
                </div>
              ` : null}
              <div class="field-group">
                <wa-checkbox id="downloadUncached" name="downloadUncached" hint="Allow downloading content not cached by debrid service">Download Uncached Content</wa-checkbox>
              </div>
              <div class="field-group">
                <wa-checkbox id="skipMultiSeason" name="skipMultiSeason" hint="Skip the multi-season episode checker for TV shows">Skip Multi-Season Checker</wa-checkbox>
              </div>
              <div class="field-group">
                <wa-checkbox
                  id="rmTrackerUrls"
                  name="rmTrackerUrls"
                  ?checked=${this.alwaysRmTrackerUrls}
                  ?disabled=${this.alwaysRmTrackerUrls}
                >
                  Remove Tracker
                  <span slot="hint">
                    Allows you to
                    <a href="https://sirrobot01.github.io/decypharr/features/repair-worker/private-tracker-downloads" target="_blank">download private tracker torrents</a>
                    with lower risk.
                  </span>
                </wa-checkbox>
              </div>
            </div>

            <div class="field-group">
              <wa-button type="submit" variant="brand" ?loading=${this._loading}>
                <wa-icon slot="start" name="cloud-arrow-up"></wa-icon>
                Add to Download Queue
              </wa-button>
            </div>
          </form>
        </wa-card>
      </div>
    `
  }
}

customElements.define('download-page', DownloadPage)
