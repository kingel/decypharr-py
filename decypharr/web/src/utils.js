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
  if (loading) {
    el.disabled = true
    if (!el.dataset.originalText) el.dataset.originalText = originalText || el.innerHTML
    el.innerHTML = '<sl-spinner></sl-spinner> Processing...'
  } else {
    el.disabled = false
    el.innerHTML = el.dataset.originalText || 'Submit'
    delete el.dataset.originalText
  }
}

export function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light'
}

// Toast using Shoelace's sl-alert .toast() API
export function createToast(message, type = 'success', duration) {
  const variants = { success: 'success', error: 'danger', warning: 'warning', info: 'primary' }
  const icons = { success: 'check2-circle', error: 'exclamation-octagon', warning: 'exclamation-triangle', info: 'info-circle' }
  const durations = { success: 5000, warning: 10000, error: 15000, info: 7000 }

  const alert = Object.assign(document.createElement('sl-alert'), {
    variant: variants[type] || 'primary',
    closable: true,
    duration: duration || durations[type] || 5000,
  })
  alert.innerHTML = `<sl-icon slot="icon" name="${icons[type] || 'info-circle'}"></sl-icon>${escapeHtml(message)}`
  document.body.appendChild(alert)
  alert.toast()
}
