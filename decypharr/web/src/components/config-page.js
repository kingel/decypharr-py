import { LitElement, html } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import template from '../templates/config.html?raw'

export class ConfigPage extends LitElement {
  static properties = {
    needSetup: { type: Boolean, attribute: 'need-setup' },
  }

  createRenderRoot() {
    return this
  }

  firstUpdated() {
    if (!this._controller) {
      this._controller = new ConfigManager()
      window.configManager = this._controller
      setupPasswordToggles()
      window.refreshAPIToken = refreshAPIToken
      window.copyAPIToken = copyAPIToken
      window.updateAuthSettings = updateAuthSettings
    }
  }

  render() {
    const base = window.urlBase || ''
    const needSetupHtml = this.needSetup
      ? `
        <wa-callout variant="warning" appearance="accent">
          <wa-icon slot="icon" name="triangle-exclamation"></wa-icon>
          <strong>Configuration Required</strong>
          <div>Your configuration is incomplete. Please complete the setup below.</div>
        </wa-callout>
      `
      : ''
    const htmlStr = template
      .replace('__NEED_SETUP__', needSetupHtml)
      .replace(/__URL_BASE__/g, base)
    return html`${unsafeHTML(htmlStr)}`
  }
}

customElements.define('config-page', ConfigPage)

function setupPasswordToggles() {
  document.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('.password-toggle-btn')
    if (!toggleBtn) return
    e.preventDefault()
    e.stopPropagation()
    const container = toggleBtn.closest('.password-toggle-container')
    if (!container) return
    const input = container.querySelector('input, textarea, wa-input, wa-textarea')
    let icon = toggleBtn.querySelector('wa-icon, i')
    if (!icon) {
      icon = document.createElement('wa-icon')
      icon.setAttribute('name', 'eye')
      toggleBtn.appendChild(icon)
    }
    if (!input || !icon) return
    if (input.tagName.toLowerCase() === 'textarea') {
      togglePasswordTextarea(input, icon)
    } else {
      togglePasswordInput(input, icon)
    }
  })
}

function togglePasswordInput(field, icon) {
  if (field.type === 'password') {
    field.type = 'text'
    if (icon.tagName && icon.tagName.toLowerCase() === 'wa-icon') {
      icon.setAttribute('name', 'eye-slash')
    } else {
      icon.className = 'bi bi-eye-slash'
    }
  } else {
    field.type = 'password'
    if (icon.tagName && icon.tagName.toLowerCase() === 'wa-icon') {
      icon.setAttribute('name', 'eye')
    } else {
      icon.className = 'bi bi-eye'
    }
  }
}

function togglePasswordTextarea(field, icon) {
  const isHidden = field.style.webkitTextSecurity === 'disc' ||
    field.style.webkitTextSecurity === '' ||
    field.getAttribute('data-password-visible') !== 'true'
  if (isHidden) {
    field.style.webkitTextSecurity = 'none'
    field.style.textSecurity = 'none'
    field.setAttribute('data-password-visible', 'true')
    if (icon.tagName && icon.tagName.toLowerCase() === 'wa-icon') {
      icon.setAttribute('name', 'eye-slash')
    } else {
      icon.className = 'bi bi-eye-slash'
    }
  } else {
    field.style.webkitTextSecurity = 'disc'
    field.style.textSecurity = 'disc'
    field.setAttribute('data-password-visible', 'false')
    if (icon.tagName && icon.tagName.toLowerCase() === 'wa-icon') {
      icon.setAttribute('name', 'eye')
    } else {
      icon.className = 'bi bi-eye'
    }
  }
}

async function refreshAPIToken() {
  const refreshBtn = document.getElementById('refresh-token-btn')
  const tokenDisplay = document.getElementById('api-token-display')

  window.decypharrUtils.setButtonLoading(refreshBtn, true, 'Refresh Token')
  try {
    const response = await window.decypharrUtils.fetcher('/api/refresh-token', { method: 'POST' })
    if (!response.ok) throw new Error('Failed to refresh token')
    const data = await response.json()
    tokenDisplay.value = data.token
    window.decypharrUtils.createToast(data.message || 'Token refreshed successfully', 'success')
  } catch (error) {
    console.error('Error refreshing token:', error)
    window.decypharrUtils.createToast('Failed to refresh token: ' + error.message, 'error')
  } finally {
    window.decypharrUtils.setButtonLoading(refreshBtn, false)
  }
}

async function copyAPIToken() {
  const tokenDisplay = document.getElementById('api-token-display')
  const token = tokenDisplay.value

  if (!token || token === 'No token generated') {
    window.decypharrUtils.createToast('No token to copy. Please refresh the token first.', 'warning')
    return
  }

  try {
    await window.decypharrUtils.copyToClipboard(token)
  } catch (error) {
    console.error('Failed to copy token:', error)
    window.decypharrUtils.createToast('Failed to copy token to clipboard', 'error')
  }
}

async function updateAuthSettings() {
  const username = document.getElementById('auth-username').value
  const password = document.getElementById('auth-password').value
  const confirmPassword = document.getElementById('auth-password-confirm').value
  const updateBtn = document.getElementById('update-auth-btn')

  if (password !== confirmPassword) {
    window.decypharrUtils.createToast('Passwords do not match', 'error')
    return false
  }

  window.decypharrUtils.setButtonLoading(updateBtn, true, 'Update Authentication')
  try {
    const response = await window.decypharrUtils.fetcher('/api/update-auth', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
        confirm_password: confirmPassword,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(errorText || 'Failed to update authentication settings')
    }

    const data = await response.json()
    window.decypharrUtils.createToast(data.message, 'success')
    document.getElementById('auth-password').value = ''
    document.getElementById('auth-password-confirm').value = ''
    return true
  } catch (error) {
    console.error('Error updating auth settings:', error)
    window.decypharrUtils.createToast('Failed to update authentication: ' + error.message, 'error')
    return false
  } finally {
    window.decypharrUtils.setButtonLoading(updateBtn, false)
  }
}

// Configuration management for Decypharr
class ConfigManager {
  constructor() {
    this.debridCount = 0
    this.arrCount = 0
    this.debridDirectoryCounts = {}
    this.directoryFilterCounts = {}

    this.refs = {
      configForm: document.getElementById('configForm'),
      loadingOverlay: document.getElementById('loadingOverlay'),
      debridConfigs: document.getElementById('debridConfigs'),
      arrConfigs: document.getElementById('arrConfigs'),
      addDebridBtn: document.getElementById('addDebridBtn'),
      addArrBtn: document.getElementById('addArrBtn'),
    }

    this.init()
  }

  init() {
    this.bindEvents()
    this.initTabs()
    this.loadConfiguration()
    this.setupMagnetHandler()
    this.checkIncompleteConfig()
  }

  initTabs() {
    const tabs = Array.from(document.querySelectorAll('.tab-button'))
    const panels = Array.from(document.querySelectorAll('.tab-content'))
    if (!tabs.length || !panels.length) return

    const activate = (tab) => {
      const target = tab.dataset.tab
      tabs.forEach(btn => btn.classList.toggle('active', btn === tab))
      panels.forEach(panel => {
        panel.classList.toggle('hidden', panel.dataset.tabContent !== target)
      })
    }

    tabs.forEach(btn => btn.addEventListener('click', () => activate(btn)))
    activate(tabs.find(tab => tab.classList.contains('active')) || tabs[0])
  }

  checkIncompleteConfig() {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has('inco')) {
      const errMsg = urlParams.get('inco')
      window.decypharrUtils.createToast(`Incomplete configuration: ${errMsg}`, 'warning')
    }
  }

  bindEvents() {
    this.refs.configForm.addEventListener('submit', (e) => this.saveConfiguration(e))
    this.refs.addDebridBtn.addEventListener('click', () => this.addDebridConfig())
    this.refs.addArrBtn.addEventListener('click', () => this.addArrConfig())

    document.addEventListener('change', (e) => {
      if (e.target.classList.contains('useWebdav')) {
        this.toggleWebDAVSection(e.target)
      }
    })

    document.addEventListener('click', (e) => {
      const testBtn = e.target.closest('.test-debrid-key')
      if (testBtn) {
        e.preventDefault()
        const index = parseInt(testBtn.dataset.index || '0', 10)
        this.testDebridKey(index)
      }
    })
  }

  async loadConfiguration() {
    try {
      const response = await window.decypharrUtils.fetcher('/api/config')
      if (!response.ok) {
        throw new Error('Failed to load configuration')
      }

      const config = await response.json()
      this.populateForm(config)
    } catch (error) {
      console.error('Error loading configuration:', error)
      window.decypharrUtils.createToast('Error loading configuration', 'error')
    }
  }

  populateForm(config) {
    this.populateGeneralSettings(config)

    if (config.debrids && Array.isArray(config.debrids)) {
      config.debrids.forEach(debrid => this.addDebridConfig(debrid))
    }

    this.populateQBittorrentSettings(config.qbittorrent)

    if (config.arrs && Array.isArray(config.arrs)) {
      config.arrs.forEach(arr => this.addArrConfig(arr))
    }

    this.populateRepairSettings(config.repair)
    this.populateRcloneSettings(config.rclone)
    this.populateAPIToken(config)
  }

  populateGeneralSettings(config) {
    const fields = [
      'log_level', 'url_base', 'bind_address', 'port',
      'discord_webhook_url', 'min_file_size', 'max_file_size', 'remove_stalled_after',
      'debrid_poll_interval', 'bad_torrent_threshold_hours',
    ]

    fields.forEach(field => {
      const element = document.querySelector(`[name="${field}"]`)
      if (element && config[field] !== undefined) {
        element.value = config[field]
      }
    })

    if (config.allowed_file_types && Array.isArray(config.allowed_file_types)) {
      document.querySelector('[name="allowed_file_types"]').value = config.allowed_file_types.join(', ')
    }
  }

  populateQBittorrentSettings(qbitConfig) {
    if (!qbitConfig) return

    const fields = ['download_folder', 'refresh_interval', 'max_downloads', 'skip_pre_cache', 'always_rm_tracker_urls', 'default_action']

    fields.forEach(field => {
      const element = document.querySelector(`[name="qbit.${field}"]`)
      if (element && qbitConfig[field] !== undefined) {
        if (element.type === 'checkbox') {
          element.checked = qbitConfig[field]
        } else {
          element.value = qbitConfig[field]
        }
      }
    })
  }

  populateRepairSettings(repairConfig) {
    if (!repairConfig) return

    const fields = ['enabled', 'interval', 'workers', 'zurg_url', 'strategy', 'use_webdav', 'auto_process']

    fields.forEach(field => {
      const element = document.querySelector(`[name="repair.${field}"]`)
      if (element && repairConfig[field] !== undefined) {
        if (element.type === 'checkbox') {
          element.checked = repairConfig[field]
        } else {
          element.value = repairConfig[field]
        }
      }
    })
  }

  populateRcloneSettings(rcloneConfig) {
    if (!rcloneConfig) return

    const fields = [
      'enabled', 'rc_port', 'mount_path', 'cache_dir', 'transfers', 'vfs_cache_mode', 'vfs_cache_max_size', 'vfs_cache_max_age',
      'vfs_cache_poll_interval', 'vfs_read_chunk_size', 'vfs_read_chunk_size_limit', 'buffer_size', 'bw_limit',
      'uid', 'gid', 'vfs_read_ahead', 'attr_timeout', 'dir_cache_time', 'poll_interval', 'umask',
      'no_modtime', 'no_checksum', 'log_level', 'vfs_cache_min_free_space', 'vfs_fast_fingerprint', 'vfs_read_chunk_streams',
      'async_read', 'use_mmap',
    ]

    fields.forEach(field => {
      const element = document.querySelector(`[name="rclone.${field}"]`)
      if (element && rcloneConfig[field] !== undefined) {
        if (element.type === 'checkbox') {
          element.checked = rcloneConfig[field]
        } else {
          element.value = rcloneConfig[field]
        }
      }
    })
  }

  addDebridConfig(data = {}) {
    const debridHtml = this.getDebridTemplate(this.debridCount, data)
    this.refs.debridConfigs.insertAdjacentHTML('beforeend', debridHtml)

    const newDebrid = this.refs.debridConfigs.lastElementChild
    const webdavToggle = newDebrid.querySelector('.useWebdav')

    if (data.use_webdav) {
      this.toggleWebDAVSection(webdavToggle, true)
    }

    if (Object.keys(data).length > 0) {
      this.populateDebridData(this.debridCount, data)
    }

    this.debridDirectoryCounts[this.debridCount] = 0

    if (data.directories) {
      Object.entries(data.directories).forEach(([dirName, dirData]) => {
        const dirIndex = this.addDirectory(this.debridCount, { name: dirName, ...dirData })

        if (dirData.filters) {
          Object.entries(dirData.filters).forEach(([filterType, filterValue]) => {
            this.addFilter(this.debridCount, dirIndex, filterType, filterValue)
          })
        }
      })
    }

    this.debridCount++
  }

  populateDebridData(index, data) {
    Object.entries(data).forEach(([key, value]) => {
      const input = document.querySelector(`[name="debrid[${index}].${key}"]`)
      if (input) {
        if (input.type === 'checkbox') {
          input.checked = value
        } else if (key === 'download_api_keys' && Array.isArray(value)) {
          input.value = value.join('\n')
          if (input.tagName.toLowerCase() === 'textarea') {
            input.style.webkitTextSecurity = 'disc'
            input.style.textSecurity = 'disc'
            input.setAttribute('data-password-visible', 'false')
          }
        } else {
          input.value = value
        }
      }
    })
  }

  getDebridTemplate(index) {
    return templateDebrid(index)
  }

  toggleWebDAVSection(toggle, forceShow = false) {
    const debridCard = toggle.closest('.debrid-config')
    const index = debridCard.dataset.index
    const webdavSection = debridCard.querySelector(`#webdav-section-${index}`)
    const webdavFields = webdavSection.querySelectorAll('.webdav-field')

    if (toggle.checked || forceShow) {
      webdavSection.classList.remove('hidden')
    } else {
      webdavSection.classList.add('hidden')
      webdavFields.forEach(field => field.required = false)
    }
  }

  addDirectory(debridIndex, data = {}) {
    if (!this.debridDirectoryCounts[debridIndex]) {
      this.debridDirectoryCounts[debridIndex] = 0
    }

    const dirIndex = this.debridDirectoryCounts[debridIndex]
    const container = document.getElementById(`debrid[${debridIndex}].directories`)

    const directoryHtml = this.getDirectoryTemplate(debridIndex, dirIndex)
    container.insertAdjacentHTML('beforeend', directoryHtml)

    if (Object.keys(data).length > 0) {
      this.populateDirectoryData(debridIndex, dirIndex, data)
    }

    this.debridDirectoryCounts[debridIndex]++
    return dirIndex
  }

  populateDirectoryData(debridIndex, dirIndex, data) {
    if (data.name) {
      const nameInput = document.querySelector(`[name="debrid[${debridIndex}].directories[${dirIndex}].name"]`)
      if (nameInput) nameInput.value = data.name
    }
    if (data.path) {
      const pathInput = document.querySelector(`[name="debrid[${debridIndex}].directories[${dirIndex}].path"]`)
      if (pathInput) pathInput.value = data.path
    }
  }

  getDirectoryTemplate(debridIndex, dirIndex) {
    return templateDirectory(debridIndex, dirIndex)
  }

  addFilter(debridIndex, dirIndex, filterType, filterValue) {
    if (!this.directoryFilterCounts[`${debridIndex}-${dirIndex}`]) {
      this.directoryFilterCounts[`${debridIndex}-${dirIndex}`] = 0
    }

    const filterIndex = this.directoryFilterCounts[`${debridIndex}-${dirIndex}`]
    const container = document.getElementById(`debrid[${debridIndex}].directories[${dirIndex}].filters`)

    const filterHtml = this.getFilterTemplate(debridIndex, dirIndex, filterIndex)
    container.insertAdjacentHTML('beforeend', filterHtml)

    const typeSelect = document.querySelector(
      `[name="debrid[${debridIndex}].directories[${dirIndex}].filters[${filterIndex}].type"]`
    )
    const valueInput = document.querySelector(
      `[name="debrid[${debridIndex}].directories[${dirIndex}].filters[${filterIndex}].value"]`
    )
    if (typeSelect) typeSelect.value = filterType
    if (valueInput) valueInput.value = filterValue

    this.directoryFilterCounts[`${debridIndex}-${dirIndex}`]++
  }

  getFilterTemplate(debridIndex, dirIndex, filterIndex) {
    return templateFilter(debridIndex, dirIndex, filterIndex)
  }

  addArrConfig(data = {}) {
    const arrHtml = this.getArrTemplate(this.arrCount, data)
    this.refs.arrConfigs.insertAdjacentHTML('beforeend', arrHtml)

    if (Object.keys(data).length > 0) {
      this.populateArrData(this.arrCount, data)
    }

    this.arrCount++
  }

  populateArrData(index, data) {
    Object.entries(data).forEach(([key, value]) => {
      const input = document.querySelector(`[name="arr[${index}].${key}"]`)
      if (input) {
        if (input.type === 'checkbox') {
          input.checked = value
        } else {
          input.value = value
        }
      }
    })
  }

  getArrTemplate(index, data = {}) {
    return templateArr(index, data)
  }

  async saveConfiguration(e) {
    e.preventDefault()

    const formData = new FormData(this.refs.configForm)
    const payload = this.buildConfigPayload(formData)

    this.showLoadingOverlay(true)
    try {
      const response = await window.decypharrUtils.fetcher('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Failed to save configuration')
      }

      window.decypharrUtils.createToast('Configuration saved successfully', 'success')
    } catch (error) {
      console.error('Error saving configuration:', error)
      window.decypharrUtils.createToast('Failed to save configuration: ' + error.message, 'error')
    } finally {
      this.showLoadingOverlay(false)
    }
  }

  buildConfigPayload(formData) {
    const payload = Object.fromEntries(formData.entries())

    if (payload.allowed_file_types) {
      payload.allowed_file_types = payload.allowed_file_types.split(',').map(v => v.trim()).filter(Boolean)
    }

    payload.debrids = this.collectDebridConfig()
    payload.arrs = this.collectArrConfig()
    payload.qbittorrent = this.collectQbitConfig()
    payload.repair = this.collectRepairConfig()
    payload.rclone = this.collectRcloneConfig()

    return payload
  }

  collectDebridConfig() {
    const debrids = []
    for (let i = 0; i < this.debridCount; i++) {
      const nameEl = document.querySelector(`[name="debrid[${i}].name"]`)
      if (!nameEl) continue
      const config = {}
      document.querySelectorAll(`[name^="debrid[${i}]."]`).forEach(input => {
        const key = input.name.replace(`debrid[${i}].`, '')
        if (input.type === 'checkbox') {
          config[key] = input.checked
        } else if (key === 'download_api_keys') {
          config[key] = input.value.split('\n').map(v => v.trim()).filter(Boolean)
        } else {
          config[key] = input.value
        }
      })
      config.directories = this.collectDirectoryConfig(i)
      debrids.push(config)
    }
    return debrids
  }

  collectDirectoryConfig(debridIndex) {
    const directories = {}
    const dirContainer = document.getElementById(`debrid[${debridIndex}].directories`)
    if (!dirContainer) return directories

    dirContainer.querySelectorAll('.directory-config').forEach(dir => {
      const dirIndex = dir.dataset.index
      const name = document.querySelector(`[name="debrid[${debridIndex}].directories[${dirIndex}].name"]`).value
      const path = document.querySelector(`[name="debrid[${debridIndex}].directories[${dirIndex}].path"]`).value
      const filters = this.collectFilterConfig(debridIndex, dirIndex)
      directories[name] = { path, filters }
    })

    return directories
  }

  collectFilterConfig(debridIndex, dirIndex) {
    const filters = {}
    const filterContainer = document.getElementById(`debrid[${debridIndex}].directories[${dirIndex}].filters`)
    if (!filterContainer) return filters

    filterContainer.querySelectorAll('.filter-config').forEach(filter => {
      const filterIndex = filter.dataset.index
      const type = document.querySelector(
        `[name="debrid[${debridIndex}].directories[${dirIndex}].filters[${filterIndex}].type"]`
      ).value
      const value = document.querySelector(
        `[name="debrid[${debridIndex}].directories[${dirIndex}].filters[${filterIndex}].value"]`
      ).value
      if (type) filters[type] = value
    })

    return filters
  }

  collectArrConfig() {
    const arrs = []
    for (let i = 0; i < this.arrCount; i++) {
      const nameEl = document.querySelector(`[name="arr[${i}].name"]`)
      if (!nameEl) continue
      const config = {}
      document.querySelectorAll(`[name^="arr[${i}]."]`).forEach(input => {
        const key = input.name.replace(`arr[${i}].`, '')
        if (input.type === 'checkbox') {
          config[key] = input.checked
        } else {
          config[key] = input.value
        }
      })
      arrs.push(config)
    }
    return arrs
  }

  collectQbitConfig() {
    const getElementValue = (name, defaultValue = '') => {
      const element = document.querySelector(`[name="qbit.${name}"]`)
      if (!element) return defaultValue
      if (element.type === 'checkbox') {
        return element.checked
      }
      return element.value || defaultValue
    }

    return {
      download_folder: getElementValue('download_folder'),
      refresh_interval: parseInt(getElementValue('refresh_interval', 60), 10),
      max_downloads: parseInt(getElementValue('max_downloads', 0), 10),
      skip_pre_cache: getElementValue('skip_pre_cache', false),
      always_rm_tracker_urls: getElementValue('always_rm_tracker_urls', false),
      default_action: getElementValue('default_action', 'symlink'),
    }
  }

  collectRepairConfig() {
    return {
      enabled: document.querySelector('[name="repair.enabled"]').checked,
      interval: document.querySelector('[name="repair.interval"]').value,
      zurg_url: document.querySelector('[name="repair.zurg_url"]').value,
      strategy: document.querySelector('[name="repair.strategy"]').value,
      workers: parseInt(document.querySelector('[name="repair.workers"]').value) || 1,
      use_webdav: document.querySelector('[name="repair.use_webdav"]').checked,
      auto_process: document.querySelector('[name="repair.auto_process"]').checked,
    }
  }

  collectRcloneConfig() {
    const getElementValue = (name, defaultValue = '') => {
      const element = document.querySelector(`[name="rclone.${name}"]`)
      if (!element) return defaultValue
      if (element.type === 'checkbox') {
        return element.checked
      } else if (element.type === 'number') {
        const val = parseInt(element.value)
        return isNaN(val) ? 0 : val
      }
      return element.value || defaultValue
    }

    return {
      enabled: getElementValue('enabled', false),
      rc_port: getElementValue('rc_port', '5572'),
      mount_path: getElementValue('mount_path'),
      buffer_size: getElementValue('buffer_size'),
      bw_limit: getElementValue('bw_limit'),
      cache_dir: getElementValue('cache_dir'),
      transfers: getElementValue('transfers', 8),
      vfs_cache_mode: getElementValue('vfs_cache_mode', 'off'),
      vfs_cache_max_age: getElementValue('vfs_cache_max_age', '1h'),
      vfs_cache_max_size: getElementValue('vfs_cache_max_size'),
      vfs_cache_poll_interval: getElementValue('vfs_cache_poll_interval', '1m'),
      vfs_read_chunk_size: getElementValue('vfs_read_chunk_size', '128M'),
      vfs_read_chunk_size_limit: getElementValue('vfs_read_chunk_size_limit', 'off'),
      vfs_cache_min_free_space: getElementValue('vfs_cache_min_free_space', ''),
      vfs_fast_fingerprint: getElementValue('vfs_fast_fingerprint', false),
      vfs_read_chunk_streams: getElementValue('vfs_read_chunk_streams', 0),
      use_mmap: getElementValue('use_mmap', false),
      async_read: getElementValue('async_read', true),
      uid: getElementValue('uid', 0),
      gid: getElementValue('gid', 0),
      umask: getElementValue('umask', ''),
      vfs_read_ahead: getElementValue('vfs_read_ahead', '128k'),
      attr_timeout: getElementValue('attr_timeout', '1s'),
      dir_cache_time: getElementValue('dir_cache_time', '5m'),
      no_modtime: getElementValue('no_modtime', false),
      no_checksum: getElementValue('no_checksum', false),
      log_level: getElementValue('log_level', 'INFO'),
    }
  }

  showLoadingOverlay(show) {
    this.refs.loadingOverlay.classList.toggle('hidden', !show)
  }

  setupMagnetHandler() {
    window.registerMagnetLinkHandler = () => {
      if ('registerProtocolHandler' in navigator) {
        try {
          navigator.registerProtocolHandler(
            'magnet',
            `${window.location.origin}${window.urlBase}download?magnet=%s`,
            'Decypharr'
          )
          localStorage.setItem('magnetHandler', 'true')
          const btn = document.getElementById('registerMagnetLink')
          if (btn) {
            btn.innerHTML = '<wa-icon slot="start" name="check"></wa-icon>Magnet Handler Registered'
            btn.variant = 'success'
            btn.appearance = 'solid'
            btn.disabled = true
          }
          window.decypharrUtils.createToast('Magnet link handler registered successfully')
        } catch (error) {
          console.error('Failed to register magnet link handler:', error)
          window.decypharrUtils.createToast('Failed to register magnet link handler', 'error')
        }
      } else {
        window.decypharrUtils.createToast('Magnet link registration not supported in this browser', 'warning')
      }
    }

    if (localStorage.getItem('magnetHandler') === 'true') {
      const btn = document.getElementById('registerMagnetLink')
      if (btn) {
        btn.innerHTML = '<wa-icon slot="start" name="check"></wa-icon>Magnet Handler Registered'
        btn.variant = 'success'
        btn.appearance = 'solid'
        btn.disabled = true
      }
    }
  }

  async testDebridKey(index) {
    const nameField = document.querySelector(`[name="debrid[${index}].name"]`)
    const apiKeyField = document.querySelector(`[name="debrid[${index}].api_key"]`)
    if (!nameField || !apiKeyField) {
      window.decypharrUtils.createToast('Debrid fields not found', 'error')
      return
    }

    const name = nameField.value.trim()
    const apiKey = apiKeyField.value.trim()
    const unpackField = document.querySelector(`[name="debrid[${index}].unpack_rar"]`)
    const button = document.querySelector(`.test-debrid-key[data-index="${index}"]`)

    if (!name || !apiKey) {
      window.decypharrUtils.createToast('Please enter a debrid service and API key first', 'warning')
      return
    }

    try {
      window.decypharrUtils.setButtonLoading(button, true)
      const response = await window.decypharrUtils.fetcher('/api/debrid/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          api_key: apiKey,
          unpack_rar: unpackField ? unpackField.checked : false,
        }),
      })

      let data = {}
      try {
        data = await response.json()
      } catch {
        data = {}
      }

      if (!response.ok) {
        throw new Error(data.detail || data.error || 'Test failed')
      }

      const profile = data.profile || {}
      let message = `${name} key OK`
      if (profile.username) message += ` (${profile.username})`
      if (profile.expiration) {
        const exp = new Date(profile.expiration)
        if (!isNaN(exp.getTime())) {
          message += `, expires ${exp.toLocaleString()}`
        }
      }
      window.decypharrUtils.createToast(message, 'success')
    } catch (err) {
      const msg = err && err.message ? err.message : String(err)
      window.decypharrUtils.createToast(`Key test failed: ${msg}`, 'error')
    } finally {
      window.decypharrUtils.setButtonLoading(button, false)
    }
  }

  populateAPIToken(config) {
    const tokenDisplay = document.getElementById('api-token-display')
    if (tokenDisplay) {
      tokenDisplay.value = config.api_token || '****'
    }

    const usernameField = document.getElementById('auth-username')
    if (usernameField && config.auth_username) {
      usernameField.value = config.auth_username
    }
  }
}

function getDebridTemplate(index) {
  return `
        <wa-card class="panel debrid-config" data-index="${index}">
            <div class="panel-body page-stack">
                <div class="row-between-start">
                    <h3 class="section-subheading">Debrid Service #${index + 1}</h3>
                    <wa-button type="button" variant="danger" appearance="outline" size="small" onclick="this.closest('.debrid-config').remove();">
                        Remove
                    </wa-button>
                </div>
                <div class="grid grid-2 grid-spaced">
                        <div class="field-group">
                            <label class="label" for="debrid[${index}].name">
                                <span class="label-text">Service Type</span>
                            </label>
                            <select class="app-select" name="debrid[${index}].name" id="debrid[${index}].name" required>
                                <option value="realdebrid">Real Debrid</option>
                                <option value="alldebrid">AllDebrid</option>
                                <option value="debridlink">Debrid Link</option>
                                <option value="torbox">Torbox</option>
                            </select>
                        </div>

                        <div class="field-group">
                            <label class="label" for="debrid[${index}].api_key">
                                <span class="label-text">API Key</span>
                            </label>
                            <div class="password-toggle-container">
                                <input type="password" class="app-input input-has-toggle"
                                       name="debrid[${index}].api_key" id="debrid[${index}].api_key" required>
                                <wa-button type="button" appearance="plain" class="password-toggle-btn">
                                    <wa-icon name="eye" id="debrid[${index}].api_key_icon"></wa-icon>
                                </wa-button>
                            </div>
                            <div class="label">
                                <span class="label-text-alt">API key for the debrid service</span>
                            </div>
                            <div class="inline-note">
                                <wa-button type="button" appearance="outline" size="small" class="test-debrid-key" data-index="${index}">
                                    Test key
                                </wa-button>
                                <span class="hint">Validates the API key against the service.</span>
                            </div>
                        </div>
                </div>

                <div class="grid grid-2 grid-spaced">
                    <div class="field-group">
                        <label class="label" for="debrid[${index}].download_api_keys">
                            <span class="label-text">Download API Keys</span>
                        </label>
                        <div class="password-toggle-container">
                            <textarea class="app-textarea text-mono textarea-tall"
                                      name="debrid[${index}].download_api_keys"
                                      id="debrid[${index}].download_api_keys"
                                      placeholder="Multiple API keys for download (one per line). If empty, main API key will be used."></textarea>
                            <wa-button type="button" appearance="plain" class="password-toggle-btn textarea-toggle">
                                <wa-icon name="eye" id="debrid[${index}].download_api_keys_icon"></wa-icon>
                            </wa-button>
                        </div>
                        <div class="label">
                            <span class="label-text-alt">Multiple API keys for downloads - leave empty to use main API key</span>
                        </div>
                    </div>
                    <div class="stack-md">
                    <div class="grid grid-2">
                        <div class="field-group">
                            <label class="label" for="debrid[${index}].folder">
                                <span class="label-text">Mount/Rclone Folder</span>
                            </label>
                            <input type="text" class="app-input"
                                   name="debrid[${index}].folder" id="debrid[${index}].folder"
                                   placeholder="/mnt/remote/realdebrid/__all__" required>
                            <div class="label">
                                <span class="label-text-alt">Path where debrid files are mounted</span>
                            </div>
                        </div>
                        <div class="field-group">
                              <label class="label" for="debrid[${index}].rclone_mount_path">
                                  <span class="label-text">Custom Rclone Mount Path</span>
                                  <wa-badge variant="neutral" size="small">Optional</wa-badge>
                              </label>
                              <input type="text" class="app-input"
                                     name="debrid[${index}].rclone_mount_path" id="debrid[${index}].rclone_mount_path"
                                     placeholder="/custom/mount/path (leave empty for global mount path)">
                              <div class="label">
                                  <span class="label-text-alt">Custom mount path for this debrid service. If empty, uses global rclone mount path.</span>
                              </div>
                        </div>
                    </div>
                    <div class="grid grid-3">
                        <div class="field-group">
                            <label class="label" for="debrid[${index}].rate_limit">
                                <span class="label-text">Rate Limit</span>
                            </label>
                            <input type="text" class="app-input"
                                   name="debrid[${index}].rate_limit" id="debrid[${index}].rate_limit"
                                   placeholder="1000">
                        </div>
                        <div class="field-group">
                            <label class="label" for="debrid[${index}].download_queue">
                                <span class="label-text">Download Queue</span>
                            </label>
                            <input type="number" class="app-input"
                                   name="debrid[${index}].download_queue" id="debrid[${index}].download_queue"
                                   placeholder="0">
                        </div>
                        <div class="field-group">
                            <label class="label" for="debrid[${index}].download_timeout">
                                <span class="label-text">Download Timeout</span>
                            </label>
                            <input type="text" class="app-input"
                                   name="debrid[${index}].download_timeout" id="debrid[${index}].download_timeout"
                                   placeholder="30s">
                        </div>
                    </div>
                    <div class="field-group">
                        <label class="label" for="debrid[${index}].folder_naming">
                            <span class="label-text">Folder Naming Strategy</span>
                        </label>
                        <select class="app-select" name="debrid[${index}].folder_naming" id="debrid[${index}].folder_naming">
                            <option value="original">Original</option>
                            <option value="original_no_ext">Original (No Extension)</option>
                            <option value="min">Minimum</option>
                            <option value="title">Title</option>
                            <option value="title_no_ext">Title (No Extension)</option>
                            <option value="arr">Arr Style</option>
                        </select>
                    </div>
                    <div class="field-group">
                        <label class="checkbox-row">
                            <input type="checkbox" class="app-checkbox useWebdav" name="debrid[${index}].use_webdav" id="debrid[${index}].use_webdav">
                            <div class="checkbox-row__text">
                                <span class="label-text">Enable WebDAV</span>
                                <span class="label-text-alt">Expose debrid via WebDAV</span>
                            </div>
                        </label>
                    </div>
                    </div>
                </div>

                <div class="webdav-section hidden" id="webdav-section-${index}">
                    <div class="section-divider">
                        <span class="section-divider__text">WebDAV Settings</span>
                    </div>
                    <div class="grid grid-2">
                        <div class="field-group">
                            <label class="label" for="debrid[${index}].webdav_url">
                                <span class="label-text">WebDAV URL</span>
                            </label>
                            <input type="text" class="app-input webdav-field"
                                   name="debrid[${index}].webdav_url" id="debrid[${index}].webdav_url"
                                   placeholder="https://webdav.example.com">
                        </div>
                        <div class="field-group">
                            <label class="label" for="debrid[${index}].webdav_username">
                                <span class="label-text">WebDAV Username</span>
                            </label>
                            <input type="text" class="app-input webdav-field"
                                   name="debrid[${index}].webdav_username" id="debrid[${index}].webdav_username">
                        </div>
                        <div class="field-group">
                            <label class="label" for="debrid[${index}].webdav_password">
                                <span class="label-text">WebDAV Password</span>
                            </label>
                            <input type="password" class="app-input webdav-field"
                                   name="debrid[${index}].webdav_password" id="debrid[${index}].webdav_password">
                        </div>
                        <div class="field-group">
                            <label class="label" for="debrid[${index}].webdav_path">
                                <span class="label-text">WebDAV Path</span>
                            </label>
                            <input type="text" class="app-input webdav-field"
                                   name="debrid[${index}].webdav_path" id="debrid[${index}].webdav_path">
                        </div>
                    </div>
                </div>

                <div class="section-divider">
                    <span class="section-divider__text">Directories & Filters</span>
                </div>
                <div class="row-between">
                    <h4 class="section-subheading">Directories</h4>
                    <wa-button type="button" appearance="outline" size="small" onclick="window.configManager.addDirectory(${index});">
                        Add Directory
                    </wa-button>
                </div>
                <div id="debrid[${index}].directories"></div>
            </div>
        </wa-card>
    `
}

function getDirectoryTemplate(debridIndex, dirIndex) {
  return `
        <wa-card class="panel directory-config" data-index="${dirIndex}">
            <div class="panel-body page-stack">
                <div class="row-between-start">
                    <h4 class="section-subheading">Directory #${dirIndex + 1}</h4>
                    <wa-button type="button" variant="danger" appearance="outline" size="small" onclick="this.closest('.directory-config').remove();">Remove</wa-button>
                </div>

                <div class="grid grid-2">
                    <div class="field-group">
                        <label class="label" for="debrid[${debridIndex}].directories[${dirIndex}].name">
                            <span class="label-text">Directory Name</span>
                        </label>
                        <input type="text" class="app-input"
                               name="debrid[${debridIndex}].directories[${dirIndex}].name"
                               id="debrid[${debridIndex}].directories[${dirIndex}].name" required>
                    </div>
                    <div class="field-group">
                        <label class="label" for="debrid[${debridIndex}].directories[${dirIndex}].path">
                            <span class="label-text">Directory Path</span>
                        </label>
                        <input type="text" class="app-input"
                               name="debrid[${debridIndex}].directories[${dirIndex}].path"
                               id="debrid[${debridIndex}].directories[${dirIndex}].path">
                    </div>
                </div>

                <div class="section-divider">
                    <span class="section-divider__text">Filters</span>
                </div>
                <div class="row-between">
                    <span class="hint">Optional: route only matching torrents.</span>
                    <wa-button type="button" appearance="outline" size="small" onclick="window.configManager.addFilter(${debridIndex}, ${dirIndex});">Add Filter</wa-button>
                </div>
                <div id="debrid[${debridIndex}].directories[${dirIndex}].filters"></div>
            </div>
        </wa-card>
    `
}

function getFilterTemplate(debridIndex, dirIndex, filterIndex) {
  return `
        <wa-card class="panel panel-muted filter-config" data-index="${filterIndex}">
            <div class="panel-body">
                <div class="grid grid-3 align-end">
                    <div class="field-group">
                        <label class="label" for="debrid[${debridIndex}].directories[${dirIndex}].filters[${filterIndex}].type">
                            <span class="label-text">Filter Type</span>
                        </label>
                        <select class="app-select"
                                name="debrid[${debridIndex}].directories[${dirIndex}].filters[${filterIndex}].type"
                                id="debrid[${debridIndex}].directories[${dirIndex}].filters[${filterIndex}].type">
                            <option value="">Select filter</option>
                            <option value="label">Label</option>
                            <option value="last_added">Last Added</option>
                            <option value="size_greater_than">Size Greater Than</option>
                            <option value="size_less_than">Size Less Than</option>
                            <option value="name_contains">Name Contains</option>
                            <option value="name_not_contains">Name Does Not Contain</option>
                            <option value="file_contains">File Contains</option>
                            <option value="file_not_contains">File Does Not Contain</option>
                        </select>
                    </div>
                    <div class="field-group">
                        <label class="label" for="debrid[${debridIndex}].directories[${dirIndex}].filters[${filterIndex}].value">
                            <span class="label-text">Filter Value</span>
                        </label>
                        <input type="text" class="app-input"
                               name="debrid[${debridIndex}].directories[${dirIndex}].filters[${filterIndex}].value"
                               id="debrid[${debridIndex}].directories[${dirIndex}].filters[${filterIndex}].value">
                    </div>
                    <div class="field-group">
                        <wa-button type="button" variant="danger" appearance="outline" size="small" onclick="this.closest('.filter-config').remove();">Remove</wa-button>
                    </div>
                </div>
            </div>
        </wa-card>
    `
}

function getArrTemplate(index, data = {}) {
  const isAutoDetected = data && data.source === 'auto'
  const highlightClass = isAutoDetected ? 'panel-highlight' : ''
  return `
            <wa-card class="panel arr-config ${highlightClass}" data-index="${index}">
                <div class="panel-body page-stack">
                    <div class="row-between-start">
                        <h3 class="section-subheading">Arr Service #${index + 1}</h3>
                        <wa-button type="button" variant="danger" appearance="outline" size="small" onclick="this.closest('.arr-config').remove();">
                            Remove
                        </wa-button>
                    </div>
                    <div class="grid grid-2 grid-spaced">
                        <div class="field-group">
                            <label class="label" for="arr[${index}].name">
                                <span class="label-text">Service Name</span>
                            </label>
                            <input type="text" class="app-input"
                                   name="arr[${index}].name" id="arr[${index}].name" required>
                        </div>

                        <div class="field-group">
                            <label class="label" for="arr[${index}].host">
                                <span class="label-text">Host URL</span>
                            </label>
                            <input type="text" class="app-input"
                                   name="arr[${index}].host" id="arr[${index}].host"
                                   placeholder="http://localhost:7878" required>
                        </div>
                    </div>

                    <div class="grid grid-2 grid-spaced">
                        <div class="field-group">
                            <label class="label" for="arr[${index}].api_key">
                                <span class="label-text">API Key</span>
                            </label>
                            <div class="password-toggle-container">
                                <input type="password" class="app-input input-has-toggle"
                                       name="arr[${index}].api_key" id="arr[${index}].api_key" required>
                                <wa-button type="button" appearance="plain" class="password-toggle-btn">
                                    <wa-icon name="eye" id="arr[${index}].api_key_icon"></wa-icon>
                                </wa-button>
                            </div>
                        </div>

                        <div class="field-group">
                            <label class="label" for="arr[${index}].category">
                                <span class="label-text">Category</span>
                            </label>
                            <input type="text" class="app-input"
                                   name="arr[${index}].category" id="arr[${index}].category"
                                   placeholder="sonarr or radarr">
                        </div>
                    </div>

                    <div class="grid grid-3">
                        <div class="field-group">
                            <label class="label" for="arr[${index}].fallback_on_pause">
                                <span class="label-text">Fallback On Pause</span>
                            </label>
                            <input type="number" class="app-input"
                                   name="arr[${index}].fallback_on_pause" id="arr[${index}].fallback_on_pause"
                                   placeholder="0">
                        </div>
                        <div class="field-group">
                            <label class="label" for="arr[${index}].max_errors">
                                <span class="label-text">Max Errors</span>
                            </label>
                            <input type="number" class="app-input"
                                   name="arr[${index}].max_errors" id="arr[${index}].max_errors"
                                   placeholder="0">
                        </div>
                        <div class="field-group">
                            <label class="label" for="arr[${index}].quality_profile">
                                <span class="label-text">Quality Profile</span>
                            </label>
                            <input type="text" class="app-input"
                                   name="arr[${index}].quality_profile" id="arr[${index}].quality_profile"
                                   placeholder="HD-1080p">
                        </div>
                    </div>

                    <div class="grid grid-3">
                        <div class="field-group">
                            <label class="checkbox-row">
                                <input type="checkbox" class="app-checkbox" name="arr[${index}].enabled" id="arr[${index}].enabled">
                                <div class="checkbox-row__text">
                                    <span class="label-text">Enabled</span>
                                    <span class="label-text-alt">Enable this Arr integration</span>
                                </div>
                            </label>
                        </div>
                        <div class="field-group">
                            <label class="checkbox-row">
                                <input type="checkbox" class="app-checkbox" name="arr[${index}].add_as_completed" id="arr[${index}].add_as_completed">
                                <div class="checkbox-row__text">
                                    <span class="label-text">Add As Completed</span>
                                    <span class="label-text-alt">Add to Arr when download completes</span>
                                </div>
                            </label>
                        </div>
                        <div class="field-group">
                            <label class="checkbox-row">
                                <input type="checkbox" class="app-checkbox" name="arr[${index}].add_default_to_job" id="arr[${index}].add_default_to_job">
                                <div class="checkbox-row__text">
                                    <span class="label-text">Add Default Jobs</span>
                                    <span class="label-text-alt">Add default Arr items to repair queue</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </wa-card>
    `
}

function templateDebrid(index) {
  return getDebridTemplate(index)
}

function templateDirectory(debridIndex, dirIndex) {
  return getDirectoryTemplate(debridIndex, dirIndex)
}

function templateFilter(debridIndex, dirIndex, filterIndex) {
  return getFilterTemplate(debridIndex, dirIndex, filterIndex)
}

function templateArr(index, data) {
  return getArrTemplate(index, data)
}
