// Shared utility functions — replaces DecypharrUtils from common.js

let _urlBase = ''

export function setUrlBase(base) {
  _urlBase = base
}

export function getUrlBase() {
  return _urlBase || window.urlBase || ''
}

export function joinURL(base, path) {
  if (!base.endsWith('/')) base += '/'
  if (path.startsWith('/')) path = path.substring(1)
  return base + path
}

export async function fetcher(endpoint, options = {}) {
  const url = joinURL(getUrlBase(), endpoint)
  const defaults = { headers: {}, ...options }
  if (!(options.body instanceof FormData)) {
    defaults.headers['Content-Type'] = 'application/json'
  }
  defaults.headers = { ...defaults.headers, ...options.headers }
  return fetch(url, defaults)
}

export function escapeHtml(text) {
  if (!text) return ''
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }
  return text.replace(/[&<>"']/g, m => map[m])
}

export function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

export function formatSpeed(speed) {
  return `${formatBytes(speed)}/s`
}

export function formatDuration(seconds) {
  if (!seconds || seconds === 0) return '0s'
  const units = [
    { label: 'd', seconds: 86400 },
    { label: 'h', seconds: 3600 },
    { label: 'm', seconds: 60 },
    { label: 's', seconds: 1 },
  ]
  const parts = []
  let remaining = seconds
  for (const unit of units) {
    const count = Math.floor(remaining / unit.seconds)
    if (count > 0) {
      parts.push(`${count}${unit.label}`)
      remaining %= unit.seconds
    }
  }
  return parts.slice(0, 2).join(' ') || '0s'
}

export function formatNumber(value) {
  try { return Number(value).toLocaleString() } catch { return value ?? '-' }
}

export function debounce(func, wait, immediate = false) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      timeout = null
      if (!immediate) func(...args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func(...args)
  }
}

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    createToast('Copied to clipboard', 'success')
    return true
  } catch {
    createToast('Failed to copy to clipboard', 'error')
    return false
  }
}

export function isValidUrl(string) {
  try { new URL(string); return true } catch { return false }
}

export function setButtonLoading(el, loading = true, originalText = null) {
  if (typeof el === 'string') el = document.getElementById(el) || document.querySelector(el)
  if (!el) return
  if (el.tagName && el.tagName.toLowerCase() === 'wa-button') {
    if (loading) {
      el.disabled = true
      el.loading = true
      if (originalText && !el.dataset.originalText) el.dataset.originalText = el.textContent
      if (originalText) el.textContent = originalText
    } else {
      el.disabled = false
      el.loading = false
      if (el.dataset.originalText) {
        el.textContent = el.dataset.originalText
        delete el.dataset.originalText
      }
    }
    return
  }
  if (loading) {
    el.disabled = true
    if (!el.dataset.originalText) el.dataset.originalText = originalText || el.innerHTML
    el.innerHTML = '<wa-spinner></wa-spinner> Processing...'
  } else {
    el.disabled = false
    el.innerHTML = el.dataset.originalText || 'Submit'
    delete el.dataset.originalText
  }
}

export function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light'
}

function getToastContainer() {
  let container = document.getElementById('app-toast-container')
  if (!container) {
    container = document.createElement('div')
    container.id = 'app-toast-container'
    container.className = 'app-toast-container'
    document.body.appendChild(container)
  }
  return container
}

// Toast using Web Awesome callouts (custom container)
export function createToast(message, type = 'success', duration) {
  const variants = { success: 'success', error: 'danger', warning: 'warning', info: 'brand' }
  const icons = { success: 'circle-check', error: 'circle-xmark', warning: 'triangle-exclamation', info: 'circle-info' }
  const durations = { success: 5000, warning: 10000, error: 15000, info: 7000 }
  const ttl = duration || durations[type] || 5000

  const container = getToastContainer()
  const toast = document.createElement('div')
  toast.className = `app-toast app-toast--${type}`
  toast.innerHTML = `
    <wa-callout variant="${variants[type] || 'brand'}" appearance="accent" size="small">
      <wa-icon slot="icon" name="${icons[type] || 'circle-info'}"></wa-icon>
      ${escapeHtml(message)}
    </wa-callout>
  `
  container.appendChild(toast)

  window.setTimeout(() => {
    toast.classList.add('app-toast--hide')
    window.setTimeout(() => toast.remove(), 250)
  }, ttl)
}
