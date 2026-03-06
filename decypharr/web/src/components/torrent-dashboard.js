import { LitElement, html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import template from "../templates/index.html?raw";

export class TorrentDashboardPage extends LitElement {
  static properties = {
    needSetup: { type: Boolean, attribute: "need-setup" },
  };

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    if (!this._controller) {
      this._controller = new TorrentDashboard();
      window.dashboard = this._controller;
    }
  }

  render() {
    const base = window.urlBase || "";
    const needSetupHtml = this.needSetup
      ? `
        <wa-callout variant="warning" appearance="accent">
          <wa-icon slot="icon" name="triangle-exclamation"></wa-icon>
          <strong>Configuration Required</strong>
          <div>Your configuration is incomplete. Please complete the setup in the <a href="${base}settings">Settings page</a>.</div>
        </wa-callout>
      `
      : "";
    const htmlStr = template
      .replace("__NEED_SETUP__", needSetupHtml)
      .replace(/__URL_BASE__/g, base);
    return html`${unsafeHTML(htmlStr)}`;
  }
}

customElements.define("torrent-dashboard", TorrentDashboardPage);

// Dashboard functionality for torrent management
class TorrentDashboard {
  constructor() {
    this.state = {
      torrents: [],
      selectedTorrents: new Set(),
      categories: new Set(),
      filteredTorrents: [],
      selectedCategory: "",
      selectedState: "",
      sortBy: "added_on",
      itemsPerPage: 20,
      currentPage: 1,
      selectedTorrentContextMenu: null,
    };

    this.refs = {
      torrentsList: document.getElementById("torrentsList"),
      categoryFilter: document.getElementById("categoryFilter"),
      stateFilter: document.getElementById("stateFilter"),
      sortSelector: document.getElementById("sortSelector"),
      selectAll: document.getElementById("selectAll"),
      batchDeleteBtn: document.getElementById("batchDeleteBtn"),
      batchDeleteDebridBtn: document.getElementById("batchDeleteDebridBtn"),
      refreshBtn: document.getElementById("refreshBtn"),
      torrentContextMenu: document.getElementById("torrentContextMenu"),
      paginationControls: document.getElementById("paginationControls"),
      paginationInfo: document.getElementById("paginationInfo"),
      emptyState: document.getElementById("emptyState"),
    };

    this.refs.tableCard = this.refs.torrentsList?.closest("wa-card");
    this.init();
  }

  init() {
    this.bindEvents();
    this.loadTorrents();
    this.startAutoRefresh();
  }

  bindEvents() {
    this.refs.refreshBtn.addEventListener("click", () => this.loadTorrents());
    this.refs.batchDeleteBtn.addEventListener("click", () =>
      this.deleteSelectedTorrents(),
    );
    this.refs.batchDeleteDebridBtn.addEventListener("click", () =>
      this.deleteSelectedTorrents(true),
    );
    this.refs.selectAll.addEventListener("change", (e) =>
      this.toggleSelectAll(e.target.checked),
    );
    this.refs.categoryFilter.addEventListener("change", (e) =>
      this.setFilter("category", e.target.value),
    );
    this.refs.stateFilter.addEventListener("change", (e) =>
      this.setFilter("state", e.target.value),
    );
    this.refs.sortSelector.addEventListener("change", (e) =>
      this.setSort(e.target.value),
    );
    this.bindContextMenu();
    this.refs.torrentsList.addEventListener("change", (e) => {
      const checkbox = e.target.closest(".torrent-select");
      if (checkbox) {
        this.toggleTorrentSelection(checkbox.dataset.hash, checkbox.checked);
      }
    });
  }

  bindContextMenu() {
    this.refs.torrentsList.addEventListener("contextmenu", (e) => {
      const row = e.target.closest("tr[data-hash]");
      if (!row) return;
      e.preventDefault();
      this.showContextMenu(e, row);
    });

    document.addEventListener("click", (e) => {
      if (!this.refs.torrentContextMenu.contains(e.target)) {
        this.hideContextMenu();
      }
    });

    this.refs.torrentContextMenu.addEventListener("click", (e) => {
      const action = e.target.closest("[data-action]")?.dataset.action;
      if (action) {
        this.handleContextAction(action);
        this.hideContextMenu();
      }
    });
  }

  showContextMenu(event, row) {
    this.state.selectedTorrentContextMenu = {
      hash: row.dataset.hash,
      name: row.dataset.name,
      category: row.dataset.category || "",
    };

    this.refs.torrentContextMenu.querySelector(".torrent-name").textContent =
      this.state.selectedTorrentContextMenu.name;

    const { pageX, pageY } = event;
    const { clientWidth, clientHeight } = document.documentElement;
    const menu = this.refs.torrentContextMenu;

    menu.classList.remove("hidden");

    const menuWidth = menu.offsetWidth;
    const menuHeight = menu.offsetHeight;

    const left = pageX + menuWidth > clientWidth ? pageX - menuWidth : pageX;
    const top = pageY + menuHeight > clientHeight ? pageY - menuHeight : pageY;

    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
  }

  hideContextMenu() {
    this.refs.torrentContextMenu.classList.add("hidden");
  }

  async handleContextAction(action) {
    const { hash } = this.state.selectedTorrentContextMenu || {};
    if (!hash) return;
    const torrent = this.state.torrents.find((t) => t.hash === hash);
    if (!torrent) return;

    const actions = {
      "copy-magnet": async () => {
        try {
          await navigator.clipboard.writeText(
            `magnet:?xt=urn:btih:${torrent.hash}`,
          );
          window.decypharrUtils.createToast("Magnet link copied to clipboard");
        } catch (error) {
          window.decypharrUtils.createToast(
            "Failed to copy magnet link",
            "error",
          );
        }
      },
      "copy-name": async () => {
        try {
          await navigator.clipboard.writeText(torrent.name);
          window.decypharrUtils.createToast("Torrent name copied to clipboard");
        } catch (error) {
          window.decypharrUtils.createToast(
            "Failed to copy torrent name",
            "error",
          );
        }
      },
      delete: async () => {
        await this.deleteTorrent(torrent.hash, torrent.category, false);
      },
    };

    if (actions[action]) {
      await actions[action]();
    }
  }

  async loadTorrents() {
    try {
      this.refs.refreshBtn.disabled = true;
      this.refs.paginationInfo.textContent = "Loading torrents...";

      const response = await window.decypharrUtils.fetcher("/api/torrents");
      if (!response.ok) throw new Error("Failed to fetch torrents");

      const torrents = await response.json();
      this.state.torrents = torrents;
      this.state.categories = new Set(
        torrents.map((t) => t.category).filter(Boolean),
      );

      this.updateUI();
    } catch (error) {
      console.error("Error loading torrents:", error);
      window.decypharrUtils.createToast(
        `Error loading torrents: ${error.message}`,
        "error",
      );
    } finally {
      this.refs.refreshBtn.disabled = false;
    }
  }

  updateUI() {
    this.filterTorrents();
    this.updateCategoryFilter();
    this.renderTorrents();
    this.updatePagination();
    this.updateSelectionUI();
    this.toggleEmptyState();
  }

  filterTorrents() {
    let filtered = [...this.state.torrents];

    if (this.state.selectedCategory) {
      filtered = filtered.filter(
        (t) => t.category === this.state.selectedCategory,
      );
    }

    if (this.state.selectedState) {
      filtered = filtered.filter(
        (t) =>
          t.state?.toLowerCase() === this.state.selectedState.toLowerCase(),
      );
    }

    filtered = this.sortTorrents(filtered);
    this.state.filteredTorrents = filtered;
  }

  sortTorrents(torrents) {
    const [field, direction] =
      this.state.sortBy.includes("_asc") || this.state.sortBy.includes("_desc")
        ? [
            this.state.sortBy.split("_").slice(0, -1).join("_"),
            this.state.sortBy.endsWith("_asc") ? "asc" : "desc",
          ]
        : [this.state.sortBy, "desc"];

    return torrents.sort((a, b) => {
      let valueA;
      let valueB;

      switch (field) {
        case "name":
          valueA = a.name?.toLowerCase() || "";
          valueB = b.name?.toLowerCase() || "";
          break;
        case "size":
          valueA = a.size || 0;
          valueB = b.size || 0;
          break;
        case "progress":
          valueA = a.progress || 0;
          valueB = b.progress || 0;
          break;
        case "added_on":
          valueA = a.added_on || 0;
          valueB = b.added_on || 0;
          break;
        default:
          valueA = a[field] || 0;
          valueB = b[field] || 0;
      }

      if (typeof valueA === "string") {
        return direction === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return direction === "asc" ? valueA - valueB : valueB - valueA;
    });
  }

  renderTorrents() {
    const startIndex = (this.state.currentPage - 1) * this.state.itemsPerPage;
    const endIndex = Math.min(
      startIndex + this.state.itemsPerPage,
      this.state.filteredTorrents.length,
    );
    const pageItems = this.state.filteredTorrents.slice(startIndex, endIndex);
    this.refs.torrentsList.innerHTML = pageItems
      .map((torrent) => this.torrentRowTemplate(torrent))
      .join("");
  }

  torrentRowTemplate(torrent) {
    const progressPercent = (torrent.progress * 100).toFixed(1);
    const isSelected = this.state.selectedTorrents.has(torrent.hash);

    const stateVariant = this.getStateVariant(torrent.state);
    return `
      <tr data-hash="${torrent.hash}"
          data-name="${this.escapeHtml(torrent.name)}"
          data-category="${torrent.category || ""}">
        <td>
          <wa-checkbox
            class="torrent-select"
            data-hash="${torrent.hash}"
            ${isSelected ? "checked" : ""}>
          </wa-checkbox>
        </td>
        <td class="max-w-sm">
          <div class="text-truncate text-strong" title="${this.escapeHtml(torrent.name)}">
            ${this.escapeHtml(torrent.name)}
          </div>
        </td>
        <td class="text-nowrap text-mono text-small">
          ${window.decypharrUtils.formatBytes(torrent.size)}
        </td>
        <td>
          <div class="progress-cell">
            <wa-progress-bar class="progress-bar" value="${progressPercent}"></wa-progress-bar>
            <span class="text-small text-strong">${progressPercent}%</span>
          </div>
        </td>
        <td class="text-nowrap text-mono text-small">
          ${window.decypharrUtils.formatSpeed(torrent.dlspeed)}
        </td>
        <td>
          ${
            torrent.category
              ? `<wa-badge class="category-pill" variant="neutral" size="small">${this.escapeHtml(torrent.category)}</wa-badge>`
              : '<span class="hint">None</span>'
          }
        </td>
        <td>
          ${
            torrent.debrid
              ? `<wa-badge class="debrid-pill" variant="brand" size="small">${this.escapeHtml(torrent.debrid)}</wa-badge>`
              : '<span class="hint">None</span>'
          }
        </td>
        <td class="text-nowrap text-mono text-small">
          ${torrent.num_seeds || 0}
        </td>
        <td>
          <wa-badge class="state-pill" variant="${stateVariant}" size="small">
            ${this.escapeHtml(torrent.state)}
          </wa-badge>
        </td>
        <td>
          <div class="table-actions">
            <wa-button
              class="action-btn action-btn--danger"
              appearance="plain"
              size="small"
              variant="danger"
              title="Delete from local"
              aria-label="Delete torrent"
              onclick="dashboard.deleteTorrent('${torrent.hash}', '${torrent.category || ""}', false);"
            >
              <wa-icon name="trash"></wa-icon>
            </wa-button>
            ${
              torrent.debrid && torrent.id
                ? `
              <wa-button
                class="action-btn action-btn--warning"
                appearance="plain"
                size="small"
                variant="warning"
                title="Remove from debrid"
                aria-label="Remove from debrid"
                onclick="dashboard.deleteTorrent('${torrent.hash}', '${torrent.category || ""}', true);"
              >
                <wa-icon name="cloud-slash"></wa-icon>
              </wa-button>
            `
                : ""
            }
          </div>
        </td>
      </tr>
    `;
  }

  updateCategoryFilter() {
    const categories = [...this.state.categories];
    const currentValue = this.refs.categoryFilter.value;
    this.refs.categoryFilter.innerHTML =
      '<wa-option value="">All Categories</wa-option>';
    categories.forEach((category) => {
      const option = document.createElement("wa-option");
      option.value = category;
      option.textContent = category;
      this.refs.categoryFilter.appendChild(option);
    });
    this.refs.categoryFilter.value = currentValue;
  }

  updatePagination() {
    const totalPages = Math.ceil(
      this.state.filteredTorrents.length / this.state.itemsPerPage,
    );
    this.refs.paginationControls.innerHTML = "";

    if (totalPages <= 1) {
      this.refs.paginationInfo.textContent = `${this.state.filteredTorrents.length} torrent${this.state.filteredTorrents.length !== 1 ? "s" : ""}`;
      return;
    }

    const startIndex =
      (this.state.currentPage - 1) * this.state.itemsPerPage + 1;
    const endIndex = Math.min(
      startIndex + this.state.itemsPerPage - 1,
      this.state.filteredTorrents.length,
    );
    this.refs.paginationInfo.textContent = `Showing ${startIndex}-${endIndex} of ${this.state.filteredTorrents.length}`;

    const createButton = (label, page, disabled = false, active = false) => {
      const button = document.createElement("wa-button");
      button.size = "small";
      button.variant = active ? "brand" : "neutral";
      button.appearance = active ? "solid" : "outline";
      button.textContent = label;
      button.disabled = disabled;
      button.addEventListener("click", () => this.goToPage(page));
      return button;
    };

    this.refs.paginationControls.appendChild(
      createButton(
        "«",
        this.state.currentPage - 1,
        this.state.currentPage === 1,
      ),
    );

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        Math.abs(i - this.state.currentPage) <= 1
      ) {
        this.refs.paginationControls.appendChild(
          createButton(i.toString(), i, false, i === this.state.currentPage),
        );
      } else if (Math.abs(i - this.state.currentPage) === 2) {
        const span = document.createElement("span");
        span.className = "pagination-ellipsis";
        span.textContent = "...";
        this.refs.paginationControls.appendChild(span);
      }
    }

    this.refs.paginationControls.appendChild(
      createButton(
        "»",
        this.state.currentPage + 1,
        this.state.currentPage === totalPages,
      ),
    );
  }

  updateSelectionUI() {
    const currentHashes = new Set(
      this.state.filteredTorrents.map((t) => t.hash),
    );
    this.state.selectedTorrents.forEach((hash) => {
      if (!currentHashes.has(hash)) {
        this.state.selectedTorrents.delete(hash);
      }
    });

    this.refs.batchDeleteBtn.classList.toggle(
      "hidden",
      this.state.selectedTorrents.size === 0,
    );
    this.refs.batchDeleteDebridBtn.classList.toggle(
      "hidden",
      this.state.selectedTorrents.size === 0,
    );

    const visibleTorrents = this.state.filteredTorrents.slice(
      (this.state.currentPage - 1) * this.state.itemsPerPage,
      this.state.currentPage * this.state.itemsPerPage,
    );

    this.refs.selectAll.checked =
      visibleTorrents.length > 0 &&
      visibleTorrents.every((torrent) =>
        this.state.selectedTorrents.has(torrent.hash),
      );
    this.refs.selectAll.indeterminate =
      visibleTorrents.some((torrent) =>
        this.state.selectedTorrents.has(torrent.hash),
      ) &&
      !visibleTorrents.every((torrent) =>
        this.state.selectedTorrents.has(torrent.hash),
      );
  }

  toggleEmptyState() {
    const isEmpty = this.state.torrents.length === 0;
    this.refs.emptyState.classList.toggle("hidden", !isEmpty);
    if (this.refs.tableCard) {
      this.refs.tableCard.classList.toggle("hidden", isEmpty);
    }
  }

  setFilter(type, value) {
    if (type === "category") {
      this.state.selectedCategory = value;
    } else if (type === "state") {
      this.state.selectedState = value;
    }
    this.state.currentPage = 1;
    this.updateUI();
  }

  setSort(sortBy) {
    this.state.sortBy = sortBy;
    this.state.currentPage = 1;
    this.updateUI();
  }

  goToPage(page) {
    this.state.currentPage = page;
    this.updateUI();
  }

  toggleSelectAll(checked) {
    const visibleTorrents = this.state.filteredTorrents.slice(
      (this.state.currentPage - 1) * this.state.itemsPerPage,
      this.state.currentPage * this.state.itemsPerPage,
    );

    visibleTorrents.forEach((torrent) => {
      if (checked) {
        this.state.selectedTorrents.add(torrent.hash);
      } else {
        this.state.selectedTorrents.delete(torrent.hash);
      }
    });

    this.updateUI();
  }

  toggleTorrentSelection(hash, checked) {
    if (checked) {
      this.state.selectedTorrents.add(hash);
    } else {
      this.state.selectedTorrents.delete(hash);
    }
    this.updateSelectionUI();
  }

  async deleteTorrent(hash, category, removeFromDebrid = false) {
    if (
      !confirm(
        `Are you sure you want to delete this torrent${removeFromDebrid ? " from " + category : ""}?`,
      )
    ) {
      return;
    }

    try {
      const endpoint = `/api/torrents/${encodeURIComponent(category)}/${hash}?removeFromDebrid=${removeFromDebrid}`;
      const response = await window.decypharrUtils.fetcher(endpoint, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(await response.text());
      window.decypharrUtils.createToast("Torrent deleted successfully");
      await this.loadTorrents();
    } catch (error) {
      console.error("Error deleting torrent:", error);
      window.decypharrUtils.createToast(
        `Failed to delete torrent: ${error.message}`,
        "error",
      );
    }
  }

  async deleteSelectedTorrents(removeFromDebrid = false) {
    const count = this.state.selectedTorrents.size;
    if (count === 0) {
      window.decypharrUtils.createToast(
        "No torrents selected for deletion",
        "warning",
      );
      return;
    }
    if (
      !confirm(
        `Are you sure you want to delete ${count} torrent${count > 1 ? "s" : ""}${removeFromDebrid ? " from debrid" : ""}?`,
      )
    ) {
      return;
    }

    try {
      const hashes = Array.from(this.state.selectedTorrents).join(",");
      const response = await window.decypharrUtils.fetcher(
        `/api/torrents/?hashes=${encodeURIComponent(hashes)}&removeFromDebrid=${removeFromDebrid}`,
        { method: "DELETE" },
      );
      if (!response.ok) throw new Error(await response.text());
      window.decypharrUtils.createToast(
        `${count} torrent${count > 1 ? "s" : ""} deleted successfully`,
      );
      this.state.selectedTorrents.clear();
      await this.loadTorrents();
    } catch (error) {
      console.error("Error deleting torrents:", error);
      window.decypharrUtils.createToast(
        `Failed to delete some torrents: ${error.message}`,
        "error",
      );
    }
  }

  startAutoRefresh() {
    this.refreshInterval = setInterval(() => {
      this.loadTorrents();
    }, 5000);

    window.addEventListener("beforeunload", () => {
      if (this.refreshInterval) {
        clearInterval(this.refreshInterval);
      }
    });
  }

  getStateVariant(state) {
    switch ((state || "").toLowerCase()) {
      case "pausedup":
      case "completed":
        return "success";
      case "downloading":
        return "brand";
      case "error":
        return "danger";
      default:
        return "neutral";
    }
  }

  escapeHtml(text) {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text ? text.replace(/[&<>"']/g, (m) => map[m]) : "";
  }
}
