// Shoelace themes
import '@shoelace-style/shoelace/dist/themes/light.css'
import '@shoelace-style/shoelace/dist/themes/dark.css'

// Shoelace base path for icons (CDN)
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'
setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.19.1/cdn/')

// Shoelace components used in Phase 1 (layout + login + register)
import '@shoelace-style/shoelace/dist/components/alert/alert.js'
import '@shoelace-style/shoelace/dist/components/badge/badge.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/card/card.js'
import '@shoelace-style/shoelace/dist/components/divider/divider.js'
import '@shoelace-style/shoelace/dist/components/drawer/drawer.js'
import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js'
import '@shoelace-style/shoelace/dist/components/input/input.js'
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js'
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js'

// htmx
import 'htmx.org'

// Custom components
import './components/theme-toggle.js'

// Custom styles
import './styles/app.css'

// Shared utilities + backward compat shim for unmigrated pages
import * as utils from './utils.js'

// Set URL base from the global set by the template
if (window.urlBase !== undefined) {
  utils.setUrlBase(window.urlBase)
}

// Backward compat: expose as window.decypharrUtils for old page scripts
window.decypharrUtils = {
  fetcher: utils.fetcher,
  createToast: utils.createToast,
  formatBytes: utils.formatBytes,
  formatDuration: utils.formatDuration,
  formatSpeed: utils.formatSpeed,
  joinURL: utils.joinURL,
  escapeHtml: utils.escapeHtml,
  copyToClipboard: utils.copyToClipboard,
  setButtonLoading: utils.setButtonLoading,
  isValidUrl: utils.isValidUrl,
  getCurrentTheme: utils.getCurrentTheme,
}
window.fetcher = utils.fetcher
window.createToast = utils.createToast

// Version badge (replaces setupVersionInfo from old common.js)
async function loadVersion() {
  try {
    const resp = await utils.fetcher('/version')
    if (!resp.ok) throw new Error('Failed')
    const data = await resp.json()
    const badge = document.getElementById('version-badge')
    if (badge) {
      badge.innerHTML = `<a href="https://github.com/sirrobot01/decypharr/releases/tag/v${data.version}" target="_blank">${data.channel}-${data.version}</a>`
      const variants = { beta: 'warning', nightly: 'danger' }
      if (variants[data.channel]) badge.variant = variants[data.channel]
    }
  } catch {
    const badge = document.getElementById('version-badge')
    if (badge) badge.textContent = 'Unknown'
  }
}

document.addEventListener('DOMContentLoaded', loadVersion)
