// Web Awesome styles + theme
import '@awesome.me/webawesome/dist/styles/webawesome.css'
import '@awesome.me/webawesome/dist/styles/themes/default.css'

// Web Awesome base path for icons (CDN)
import { setBasePath } from '@awesome.me/webawesome/dist/webawesome.js'
setBasePath('https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3.3.1/dist-cdn/')

// Web Awesome components used in Phase 1 (layout + login + register)
import '@awesome.me/webawesome/dist/components/badge/badge.js'
import '@awesome.me/webawesome/dist/components/button/button.js'
import '@awesome.me/webawesome/dist/components/card/card.js'
import '@awesome.me/webawesome/dist/components/callout/callout.js'
import '@awesome.me/webawesome/dist/components/divider/divider.js'
import '@awesome.me/webawesome/dist/components/drawer/drawer.js'
import '@awesome.me/webawesome/dist/components/dialog/dialog.js'
import '@awesome.me/webawesome/dist/components/icon/icon.js'
import '@awesome.me/webawesome/dist/components/input/input.js'
import '@awesome.me/webawesome/dist/components/option/option.js'
import '@awesome.me/webawesome/dist/components/select/select.js'
import '@awesome.me/webawesome/dist/components/checkbox/checkbox.js'
import '@awesome.me/webawesome/dist/components/textarea/textarea.js'
import '@awesome.me/webawesome/dist/components/spinner/spinner.js'
import '@awesome.me/webawesome/dist/components/progress-bar/progress-bar.js'
import '@awesome.me/webawesome/dist/components/tooltip/tooltip.js'

// htmx
import 'htmx.org'

// Custom components
import './components/theme-toggle.js'
import './components/download-page.js'
import './components/system-stats.js'
import './components/torrent-dashboard.js'
import './components/config-page.js'
import './components/repair-page.js'

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
  debounce: utils.debounce,
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
