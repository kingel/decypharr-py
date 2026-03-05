import { LitElement, html } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import template from '../templates/repair.html?raw'

export class RepairPage extends LitElement {
  static properties = {
    needSetup: { type: Boolean, attribute: 'need-setup' },
  }

  createRenderRoot() {
    return this
  }

  firstUpdated() {
    if (!this._controller) {
      this._controller = new RepairManager()
      window.repairManager = this._controller
      window.RepairUtils = RepairUtils
    }
  }

  render() {
    const base = window.urlBase || ''
    const needSetupHtml = this.needSetup
      ? `
        <wa-callout variant="warning" appearance="accent">
          <wa-icon slot="icon" name="triangle-exclamation"></wa-icon>
          <strong>Configuration Required</strong>
          <div>Your configuration is incomplete. Please complete the setup in the <a href="${base}settings">Settings page</a>.</div>
        </wa-callout>
      `
      : ''
    const htmlStr = template
      .replace('__NEED_SETUP__', needSetupHtml)
      .replace(/__URL_BASE__/g, base)
    return html`${unsafeHTML(htmlStr)}`
  }
}

customElements.define('repair-page', RepairPage)

// Repair management for Decypharr
class RepairManager {
    constructor() {
        this.state = {
            jobs: [],
            currentJob: null,
            allBrokenItems: [],
            filteredItems: [],
            selectedItems: new Set(),
            currentPage: 1,
            currentItemsPage: 1,
            itemsPerPage: 10,
            itemsPerModalPage: 20,
            searchTerm: '',
            arrFilter: '',
            pathFilter: '',
            sortBy: 'created_at',
            sortDirection: 'desc'
        };

        this.refs = {
            repairForm: document.getElementById('repairForm'),
            arrSelect: document.getElementById('arrSelect'),
            mediaIds: document.getElementById('mediaIds'),
            isAsync: document.getElementById('isAsync'),
            autoProcess: document.getElementById('autoProcess'),
            submitBtn: document.getElementById('submitRepair'),

            // Jobs table
            jobsTable: document.getElementById('jobsTable'),
            jobsTableBody: document.getElementById('jobsTableBody'),
            jobsPagination: document.getElementById('jobsPagination'),
            noJobsMessage: document.getElementById('noJobsMessage'),
            refreshJobs: document.getElementById('refreshJobs'),
            deleteSelectedJobs: document.getElementById('deleteSelectedJobs'),
            selectAllJobs: document.getElementById('selectAllJobs'),

            // Modal elements
            jobDetailsModal: document.getElementById('jobDetailsModal'),
            modalJobId: document.getElementById('modalJobId'),
            modalJobStatus: document.getElementById('modalJobStatus'),
            modalJobStarted: document.getElementById('modalJobStarted'),
            modalJobCompleted: document.getElementById('modalJobCompleted'),
            modalJobArrs: document.getElementById('modalJobArrs'),
            modalJobMediaIds: document.getElementById('modalJobMediaIds'),
            modalJobAutoProcess: document.getElementById('modalJobAutoProcess'),
            modalJobError: document.getElementById('modalJobError'),
            errorContainer: document.getElementById('errorContainer'),

            // Broken items
            brokenItemsTableBody: document.getElementById('brokenItemsTableBody'),
            itemsPagination: document.getElementById('itemsPagination'),
            noBrokenItemsMessage: document.getElementById('noBrokenItemsMessage'),
            noFilteredItemsMessage: document.getElementById('noFilteredItemsMessage'),
            totalItemsCount: document.getElementById('totalItemsCount'),
            modalFooterStats: document.getElementById('modalFooterStats'),

            // Filters
            itemSearchInput: document.getElementById('itemSearchInput'),
            arrFilterSelect: document.getElementById('arrFilterSelect'),
            pathFilterSelect: document.getElementById('pathFilterSelect'),
            clearFiltersBtn: document.getElementById('clearFiltersBtn'),

            // Action buttons
            processJobBtn: document.getElementById('processJobBtn'),
            stopJobBtn: document.getElementById('stopJobBtn')
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.loadArrInstances();
        this.loadJobs();
        this.startAutoRefresh();
    }

    bindEvents() {
        // Form submission
        this.refs.repairForm.addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Jobs table events
        this.refs.refreshJobs.addEventListener('click', () => this.loadJobs());
        this.refs.deleteSelectedJobs.addEventListener('click', () => this.deleteSelectedJobs());
        this.refs.selectAllJobs.addEventListener('change', (e) => this.toggleSelectAllJobs(e.target.checked));

        // Modal events
        this.refs.processJobBtn.addEventListener('click', () => this.processCurrentJob());
        this.refs.stopJobBtn.addEventListener('click', () => this.stopCurrentJob());
        this.refs.jobDetailsModal.addEventListener('wa-hide', () => this.hideJobDetailsModal());

        // Filter events
        this.refs.itemSearchInput.addEventListener('input',
            window.decypharrUtils.debounce(() => this.applyFilters(), 300));
        this.refs.arrFilterSelect.addEventListener('change', () => this.applyFilters());
        this.refs.pathFilterSelect.addEventListener('change', () => this.applyFilters());
        this.refs.clearFiltersBtn.addEventListener('click', () => this.clearFilters());

        // Table row events (using event delegation)
        this.refs.jobsTableBody.addEventListener('click', (e) => this.handleJobTableClick(e));
        this.refs.brokenItemsTableBody.addEventListener('click', (e) => this.handleItemTableClick(e));
    }

    async loadArrInstances() {
        try {
            const response = await window.decypharrUtils.fetcher('/api/arrs');
            if (!response.ok) throw new Error('Failed to load Arr instances');

            const arrs = await response.json();

            // Clear existing options (keep the default one)
            this.refs.arrSelect.innerHTML = '<wa-option value="">Select an Arr instance</wa-option>';

            arrs.forEach(arr => {
                const option = document.createElement('wa-option');
                option.value = arr.name;
                option.textContent = `${arr.name} (${arr.host})`;
                this.refs.arrSelect.appendChild(option);
            });

        } catch (error) {
            console.error('Error loading Arr instances:', error);
            window.decypharrUtils.createToast('Failed to load Arr instances', 'error');
        }
    }

    async handleFormSubmit(e) {
        e.preventDefault();

        const arr = this.refs.arrSelect.value;
        const mediaIdsValue = this.refs.mediaIds.value.trim();

        const mediaIds = mediaIdsValue ?
            mediaIdsValue.split(',').map(id => id.trim()).filter(Boolean) :
            [];

        try {
            window.decypharrUtils.setButtonLoading(this.refs.submitBtn, true);

            const response = await window.decypharrUtils.fetcher('/api/repair', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    arr: arr,
                    mediaIds: mediaIds.length > 0 ? mediaIds : null,
                    async: this.refs.isAsync.checked,
                    autoProcess: this.refs.autoProcess.checked
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to start repair');
            }

            const result = await response.json();

            window.decypharrUtils.createToast(
                `Repair job started successfully! Job ID: ${result.job_id?.substring(0, 8) || 'Unknown'}`,
                'success'
            );

            // Clear form
            this.refs.mediaIds.value = '';

            // Refresh jobs list
            await this.loadJobs();

        } catch (error) {
            console.error('Error starting repair:', error);
            window.decypharrUtils.createToast(`Error starting repair: ${error.message}`, 'error');
        } finally {
            window.decypharrUtils.setButtonLoading(this.refs.submitBtn, false);
        }
    }

    async loadJobs() {
        try {
            const response = await window.decypharrUtils.fetcher('/api/repair/jobs');
            if (!response.ok) throw new Error('Failed to fetch jobs');

            this.state.jobs = await response.json();
            this.renderJobsTable();

        } catch (error) {
            console.error('Error loading jobs:', error);
            window.decypharrUtils.createToast('Error loading repair jobs', 'error');
        }
    }

    renderJobsTable() {
        const jobs = this.getSortedJobs();
        const totalPages = Math.ceil(jobs.length / this.state.itemsPerPage);
        const startIndex = (this.state.currentPage - 1) * this.state.itemsPerPage;
        const endIndex = Math.min(startIndex + this.state.itemsPerPage, jobs.length);
        const pageJobs = jobs.slice(startIndex, endIndex);

        // Clear table
        this.refs.jobsTableBody.innerHTML = '';
        this.refs.jobsPagination.innerHTML = '';

        if (jobs.length === 0) {
            this.refs.noJobsMessage.classList.remove('hidden');
            this.refs.jobsTable.classList.add('hidden');
            return;
        }

        this.refs.noJobsMessage.classList.add('hidden');
        this.refs.jobsTable.classList.remove('hidden');

        pageJobs.forEach(job => {
            const jobRow = document.createElement('tr');
            jobRow.dataset.jobId = job.id;
            const statusInfo = RepairUtils.formatRepairStatus(job.status, job.error);

            jobRow.innerHTML = `
                <td>
                    <wa-checkbox class="job-checkbox" data-job-id="${job.id}"
                        ${this.state.selectedItems.has(job.id) ? 'checked' : ''}></wa-checkbox>
                </td>
                <td class="text-mono text-tiny">${job.id.substring(0, 8)}</td>
                <td>
                    <wa-badge variant="${statusInfo.variant}" size="small">
                        <wa-icon name="${statusInfo.icon}"></wa-icon>
                        ${statusInfo.message}
                    </wa-badge>
                </td>
                <td>${this.formatDate(job.created_at)}</td>
                <td>${job.arrs ? job.arrs.join(', ') : 'All'}</td>
                <td>${job.media_ids ? job.media_ids.join(', ') : 'All'}</td>
                <td>
                    <div class="table-actions">
                        <wa-button class="view-job" appearance="plain" size="small" data-job-id="${job.id}" title="View">
                            <wa-icon name="eye"></wa-icon>
                        </wa-button>
                        <wa-button class="export-job" appearance="plain" size="small" data-job-id="${job.id}" title="Export">
                            <wa-icon name="download"></wa-icon>
                        </wa-button>
                        <wa-button class="delete-job" appearance="plain" size="small" variant="danger" data-job-id="${job.id}" title="Delete">
                            <wa-icon name="trash"></wa-icon>
                        </wa-button>
                    </div>
                </td>
            `;

            this.refs.jobsTableBody.appendChild(jobRow);
        });

        // Update pagination
        this.renderPagination(this.refs.jobsPagination, totalPages, this.state.currentPage, (page) => {
            this.state.currentPage = page;
            this.renderJobsTable();
        });

        // Update delete selected button
        this.updateDeleteSelectedButton();
    }

    getSortedJobs() {
        return [...this.state.jobs].sort((a, b) => {
            if (this.state.sortDirection === 'asc') {
                return a[this.state.sortBy] > b[this.state.sortBy] ? 1 : -1;
            } else {
                return a[this.state.sortBy] < b[this.state.sortBy] ? 1 : -1;
            }
        });
    }

    handleJobTableClick(e) {
        const jobId = e.target.closest('[data-job-id]')?.dataset.jobId;
        if (!jobId) return;

        const checkbox = e.target.closest('.job-checkbox');
        if (checkbox) {
            this.toggleJobSelection(jobId, checkbox.checked);
        } else if (e.target.closest('.view-job')) {
            this.viewJobDetails(jobId);
        } else if (e.target.closest('.export-job')) {
            this.exportJobData(jobId);
        } else if (e.target.closest('.delete-job')) {
            this.deleteJob(jobId);
        }
    }

    toggleJobSelection(jobId, selected) {
        if (selected) {
            this.state.selectedItems.add(jobId);
        } else {
            this.state.selectedItems.delete(jobId);
        }
        this.updateDeleteSelectedButton();
    }

    toggleSelectAllJobs(selected) {
        if (selected) {
            this.state.jobs.forEach(job => this.state.selectedItems.add(job.id));
        } else {
            this.state.selectedItems.clear();
        }
        this.renderJobsTable();
    }

    updateDeleteSelectedButton() {
        this.refs.deleteSelectedJobs.disabled = this.state.selectedItems.size === 0;
    }

    async viewJobDetails(jobId) {
        try {
            const response = await window.decypharrUtils.fetcher(`/api/repair/jobs/${jobId}`);
            if (!response.ok) throw new Error('Failed to fetch job details');

            const job = await response.json();
            this.state.currentJob = job;
            this.renderJobDetails(job);
            this.showJobDetailsModal();

        } catch (error) {
            console.error('Error loading job details:', error);
            window.decypharrUtils.createToast('Error loading job details', 'error');
        }
    }

    renderJobDetails(job) {
        const statusInfo = RepairUtils.formatRepairStatus(job.status, job.error);

        this.refs.modalJobId.textContent = job.id;
        this.refs.modalJobStatus.innerHTML = `
            <wa-badge variant="${statusInfo.variant}" size="small">
                <wa-icon name="${statusInfo.icon}"></wa-icon>
                ${statusInfo.message}
            </wa-badge>
        `;
        this.refs.modalJobStarted.textContent = this.formatDate(job.created_at);
        this.refs.modalJobCompleted.textContent = job.completed_at ? this.formatDate(job.completed_at) : 'Not completed';
        this.refs.modalJobArrs.textContent = job.arrs ? job.arrs.join(', ') : 'All';
        this.refs.modalJobMediaIds.textContent = job.media_ids ? job.media_ids.join(', ') : 'All';
        this.refs.modalJobAutoProcess.textContent = job.auto_process ? 'Yes' : 'No';

        if (job.error) {
            this.refs.modalJobError.textContent = job.error;
            this.refs.errorContainer.classList.remove('hidden');
        } else {
            this.refs.errorContainer.classList.add('hidden');
        }

        // Handle broken items
        if (job.broken_items && Object.keys(job.broken_items).length > 0) {
            this.state.allBrokenItems = this.flattenBrokenItems(job.broken_items);
            this.applyFilters();
        } else {
            this.state.allBrokenItems = [];
            this.state.filteredItems = [];
            this.renderBrokenItemsTable();
        }

        // Update action buttons based on job status
        this.updateActionButtons(job.status);
    }

    updateActionButtons(status) {
        if (status === 'pending' || status === 'failed' || status === 'completed' || status === 'cancelled') {
            this.refs.processJobBtn.classList.remove('hidden');
            this.refs.stopJobBtn.classList.add('hidden');
        } else if (status === 'started' || status === 'processing') {
            this.refs.processJobBtn.classList.add('hidden');
            this.refs.stopJobBtn.classList.remove('hidden');
        } else {
            this.refs.processJobBtn.classList.add('hidden');
            this.refs.stopJobBtn.classList.add('hidden');
        }
    }

    flattenBrokenItems(brokenItems) {
        const items = [];
        Object.entries(brokenItems).forEach(([arr, arrItems]) => {
            if (Array.isArray(arrItems)) {
                arrItems.forEach(item => {
                    items.push({ ...item, arr });
                });
            }
        });
        return items;
    }

    applyFilters() {
        const searchTerm = this.refs.itemSearchInput.value.toLowerCase();
        const arrFilter = this.refs.arrFilterSelect.value;
        const pathFilter = this.refs.pathFilterSelect.value;

        this.state.searchTerm = searchTerm;
        this.state.arrFilter = arrFilter;
        this.state.pathFilter = pathFilter;

        this.state.filteredItems = this.state.allBrokenItems.filter(item => {
            const matchesSearch = !searchTerm ||
                item.path.toLowerCase().includes(searchTerm) ||
                item.arr.toLowerCase().includes(searchTerm);

            const matchesArr = !arrFilter || item.arr === arrFilter;
            const matchesPath = !pathFilter || item.path.includes(pathFilter);

            return matchesSearch && matchesArr && matchesPath;
        });

        this.state.currentItemsPage = 1;
        this.renderBrokenItemsTable();
        this.updateFilterOptions();
    }

    updateFilterOptions() {
        const arrOptions = new Set(this.state.allBrokenItems.map(item => item.arr));
        const pathOptions = new Set(this.state.allBrokenItems.map(item => {
            const parts = item.path.split('/');
            return parts.length > 1 ? parts[0] : item.path;
        }));

        // Update Arr filter options
        this.refs.arrFilterSelect.innerHTML = '<wa-option value="">All Arrs</wa-option>';
        arrOptions.forEach(arr => {
            const option = document.createElement('wa-option');
            option.value = arr;
            option.textContent = arr;
            if (arr === this.state.arrFilter) option.selected = true;
            this.refs.arrFilterSelect.appendChild(option);
        });

        // Update path filter options
        this.refs.pathFilterSelect.innerHTML = '<wa-option value="">All Paths</wa-option>';
        pathOptions.forEach(path => {
            const option = document.createElement('wa-option');
            option.value = path;
            option.textContent = path;
            if (path === this.state.pathFilter) option.selected = true;
            this.refs.pathFilterSelect.appendChild(option);
        });
    }

    clearFilters() {
        this.refs.itemSearchInput.value = '';
        this.refs.arrFilterSelect.value = '';
        this.refs.pathFilterSelect.value = '';

        this.state.searchTerm = '';
        this.state.arrFilter = '';
        this.state.pathFilter = '';

        this.state.filteredItems = [...this.state.allBrokenItems];
        this.state.currentItemsPage = 1;

        this.renderBrokenItemsTable();
    }

    renderBrokenItemsTable() {
        const items = this.state.filteredItems;
        const totalPages = Math.ceil(items.length / this.state.itemsPerModalPage);
        const startIndex = (this.state.currentItemsPage - 1) * this.state.itemsPerModalPage;
        const endIndex = Math.min(startIndex + this.state.itemsPerModalPage, items.length);
        const pageItems = items.slice(startIndex, endIndex);

        // Clear table
        this.refs.brokenItemsTableBody.innerHTML = '';
        this.refs.itemsPagination.innerHTML = '';

        if (items.length === 0) {
            this.refs.noBrokenItemsMessage.classList.toggle('hidden', this.state.allBrokenItems.length > 0);
            this.refs.noFilteredItemsMessage.classList.toggle('hidden', this.state.allBrokenItems.length === 0);
            this.refs.modalFooterStats.textContent = '';
            this.refs.totalItemsCount.textContent = '0';
            return;
        }

        this.refs.noBrokenItemsMessage.classList.add('hidden');
        this.refs.noFilteredItemsMessage.classList.add('hidden');

        pageItems.forEach(item => {
            const row = document.createElement('tr');
            row.className = 'hover';
            row.dataset.itemId = item.id;

            row.innerHTML = `
                <td class="w-12">
                    <wa-checkbox class="item-checkbox" data-item-id="${item.id}"
                        ${this.state.selectedItems.has(item.id) ? 'checked' : ''}></wa-checkbox>
                </td>
                <td>
                    <wa-badge variant="brand" size="small">${window.decypharrUtils.escapeHtml(item.arr)}</wa-badge>
                </td>
                <td>
                    <div class="text-small max-w-sm text-truncate" title="${window.decypharrUtils.escapeHtml(item.path)}">
                        ${window.decypharrUtils.escapeHtml(item.path)}
                    </div>
                </td>
                <td>
                    <span class="text-small text-mono">${window.decypharrUtils.formatBytes(item.size)}</span>
                </td>
            `;

            this.refs.brokenItemsTableBody.appendChild(row);
        });

        // Update pagination
        this.renderPagination(this.refs.itemsPagination, totalPages, this.state.currentItemsPage, (page) => {
            this.state.currentItemsPage = page;
            this.renderBrokenItemsTable();
        });

        // Update footer stats
        this.refs.modalFooterStats.textContent = `${items.length} items`;
        this.refs.totalItemsCount.textContent = items.length.toString();
    }

    handleItemTableClick(e) {
        const checkbox = e.target.closest('.item-checkbox');
        if (checkbox) {
            const itemId = checkbox.dataset.itemId;
            this.toggleItemSelection(itemId, checkbox.checked);
        }
    }

    toggleItemSelection(itemId, selected) {
        if (selected) {
            this.state.selectedItems.add(itemId);
        } else {
            this.state.selectedItems.delete(itemId);
        }
    }

    async processCurrentJob() {
        if (!this.state.currentJob) return;
        const jobId = this.state.currentJob.id;

        try {
            const response = await window.decypharrUtils.fetcher(`/api/repair/jobs/${jobId}/process`, {
                method: 'POST'
            });

            if (!response.ok) throw new Error('Failed to process job');

            window.decypharrUtils.createToast('Job processing started', 'success');
            this.loadJobs();

        } catch (error) {
            console.error('Error processing job:', error);
            window.decypharrUtils.createToast(`Error processing job: ${error.message}`, 'error');
        }
    }

    async stopCurrentJob() {
        if (!this.state.currentJob) return;
        const jobId = this.state.currentJob.id;

        try {
            const response = await window.decypharrUtils.fetcher(`/api/repair/jobs/${jobId}/stop`, {
                method: 'POST'
            });

            if (!response.ok) throw new Error('Failed to stop job');

            window.decypharrUtils.createToast('Job stop requested', 'success');
            this.loadJobs();

        } catch (error) {
            console.error('Error stopping job:', error);
            window.decypharrUtils.createToast(`Error stopping job: ${error.message}`, 'error');
        }
    }

    async deleteJob(jobId) {
        if (!confirm('Are you sure you want to delete this job?')) return;

        try {
            const response = await window.decypharrUtils.fetcher('/api/repair/jobs', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify([jobId])
            });

            if (!response.ok) throw new Error('Failed to delete job');

            window.decypharrUtils.createToast('Job deleted successfully', 'success');
            this.state.selectedItems.delete(jobId);
            this.loadJobs();

        } catch (error) {
            console.error('Error deleting job:', error);
            window.decypharrUtils.createToast(`Error deleting job: ${error.message}`, 'error');
        }
    }

    async deleteSelectedJobs() {
        const selectedIds = Array.from(this.state.selectedItems);

        if (selectedIds.length === 0) return;
        if (!confirm(`Are you sure you want to delete ${selectedIds.length} job(s)?`)) return;

        try {
            const response = await window.decypharrUtils.fetcher('/api/repair/jobs', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedIds)
            });

            if (!response.ok) throw new Error('Failed to delete jobs');

            window.decypharrUtils.createToast(`${selectedIds.length} job(s) deleted successfully`, 'success');
            this.state.selectedItems.clear();
            this.loadJobs();

        } catch (error) {
            console.error('Error deleting jobs:', error);
            window.decypharrUtils.createToast(`Error deleting jobs: ${error.message}`, 'error');
        }
    }

    showJobDetailsModal() {
        if (this.refs.jobDetailsModal.show) {
            this.refs.jobDetailsModal.show();
        } else {
            this.refs.jobDetailsModal.open = true;
        }
    }

    hideJobDetailsModal() {
        if (this.refs.jobDetailsModal.hide) {
            this.refs.jobDetailsModal.hide();
        } else {
            this.refs.jobDetailsModal.open = false;
        }
        this.state.currentJob = null;
        this.state.allBrokenItems = [];
        this.state.filteredItems = [];
        this.state.selectedItems.clear();
    }

    renderPagination(container, totalPages, currentPage, onPageChange) {
        if (totalPages <= 1) return;

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('wa-button');
            button.size = 'small';
            button.variant = i === currentPage ? 'brand' : 'neutral';
            button.appearance = i === currentPage ? 'solid' : 'outline';
            button.textContent = i;
            button.addEventListener('click', () => onPageChange(i));
            container.appendChild(button);
        }
    }

    formatDate(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString();
    }

    async exportJobData(jobId) {
        try {
            const response = await window.decypharrUtils.fetcher(`/api/repair/jobs/${jobId}`);
            if (!response.ok) throw new Error('Failed to fetch job data');

            const job = await response.json();
            const dataStr = JSON.stringify(job, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

            const exportFileDefaultName = `repair_job_${jobId.substring(0, 8)}.json`;

            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();

            window.decypharrUtils.createToast('Job data exported successfully', 'success');
        } catch (error) {
            console.error('Error exporting job data:', error);
            window.decypharrUtils.createToast('Failed to export job data', 'error');
        }
    }

    startAutoRefresh() {
        this.refreshInterval = setInterval(() => {
            this.loadJobs();
        }, 30000);
    }

    destroy() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }

        // Remove event listeners
        Object.values(this.refs).forEach(ref => {
            if (ref && ref.removeEventListener) {
                // Note: In a real implementation, you'd need to keep track of
                // the specific event listeners to remove them properly
            }
        });
    }
}

// Additional utility functions for repair operations
const RepairUtils = {
    // Format repair status for display
    formatRepairStatus(status, error = null) {
        const statusConfig = {
            'pending': {
                icon: 'clock',
                variant: 'warning',
                message: 'Waiting to start'
            },
            'started': {
                icon: 'play',
                variant: 'brand',
                message: 'Repair in progress'
            },
            'processing': {
                icon: 'gear',
                variant: 'brand',
                message: 'Processing results'
            },
            'completed': {
                icon: 'circle-check',
                variant: 'success',
                message: 'Repair completed successfully'
            },
            'failed': {
                icon: 'circle-xmark',
                variant: 'danger',
                message: error || 'Repair failed'
            },
            'cancelled': {
                icon: 'stop',
                variant: 'warning',
                message: 'Repair was cancelled'
            }
        };

        return statusConfig[status] || {
            icon: 'circle-question',
            variant: 'neutral',
            message: `Unknown status: ${status}`
        };
    },

    // Validate media IDs input
    validateMediaIds(input) {
        if (!input || !input.trim()) return { valid: true, ids: [] };

        const ids = input.split(',').map(id => id.trim()).filter(Boolean);
        const invalidIds = ids.filter(id => !/^\d+$/.test(id));

        if (invalidIds.length > 0) {
            return {
                valid: false,
                error: `Invalid media IDs: ${invalidIds.join(', ')}. Only numeric IDs are allowed.`,
                ids: []
            };
        }

        return { valid: true, ids };
    },

    // Generate repair summary
    generateRepairSummary(job) {
        if (!job.broken_items) return 'No broken items found';

        const itemCounts = Object.entries(job.broken_items).map(([arr, items]) =>
            `${arr}: ${items.length} items`
        );

        const totalItems = Object.values(job.broken_items).reduce((sum, arr) => sum + arr.length, 0);

        return `Found ${totalItems} broken items across ${Object.keys(job.broken_items).length} Arr instance(s): ${itemCounts.join(', ')}`;
    },

    // Calculate repair completion percentage
    calculateProgress(job) {
        // This would need to be implemented based on your API
        // For now, return based on status
        switch (job.status) {
            case 'pending': return 0;
            case 'started': return 25;
            case 'processing': return 75;
            case 'completed': return 100;
            case 'failed':
            case 'cancelled': return 0;
            default: return 0;
        }
    }
};
