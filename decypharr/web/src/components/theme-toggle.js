import { LitElement, html, css } from 'lit'

export class ThemeToggle extends LitElement {
  static styles = css`
    :host { display: inline-flex; align-items: center; }
  `

  connectedCallback() {
    super.connectedCallback()
    // Apply saved theme on mount
    const saved = localStorage.getItem('theme')
    const theme = saved || (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    this._applyTheme(theme)
  }

  get _isDark() {
    return document.documentElement.classList.contains('wa-dark')
  }

  _applyTheme(theme) {
    document.documentElement.classList.toggle('wa-dark', theme === 'dark')
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
    this.requestUpdate()
  }

  _toggle() {
    this._applyTheme(this._isDark ? 'light' : 'dark')
  }

  render() {
    return html`
      <wa-button
        appearance="plain"
        size="small"
        aria-label="Toggle theme"
        title="Toggle theme"
        @click=${this._toggle}
      >
        <wa-icon slot="start" name=${this._isDark ? 'moon' : 'sun'}></wa-icon>
      </wa-button>
    `
  }
}

customElements.define('theme-toggle', ThemeToggle)
