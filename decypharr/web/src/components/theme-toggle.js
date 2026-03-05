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
    return document.documentElement.classList.contains('sl-theme-dark')
  }

  _applyTheme(theme) {
    document.documentElement.classList.toggle('sl-theme-dark', theme === 'dark')
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
    this.requestUpdate()
  }

  _toggle() {
    this._applyTheme(this._isDark ? 'light' : 'dark')
  }

  render() {
    return html`
      <sl-icon-button
        name=${this._isDark ? 'moon-stars-fill' : 'sun-fill'}
        label="Toggle theme"
        @click=${this._toggle}
      ></sl-icon-button>
    `
  }
}

customElements.define('theme-toggle', ThemeToggle)
