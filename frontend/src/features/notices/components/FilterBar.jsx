import React from 'react';

export const ISSUE_TYPES = [
  { value: 'all', label: 'All Disruption Types' },
  { value: 'road_closed', label: 'Road Closed / Culvert Washout' },
  { value: 'landslide', label: 'Landslide / Earth Slip' },
  { value: 'flooded_access', label: 'Flooded Access / High River' },
  { value: 'no_water', label: 'No Water / Pipeline Rupture' },
  { value: 'power_cut', label: 'Power Cut / Grid Trip' },
  { value: 'bridge_unsafe', label: 'Bridge Unsafe' },
  { value: 'network_down', label: 'Telecom / Network Down' },
  { value: 'relocation', label: 'Relocation Notice' },
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Sort: Most Recent' },
  { value: 'severity', label: 'Sort: Highest Severity' },
  { value: 'oldest', label: 'Sort: Oldest First' },
  { value: 'town', label: 'Sort: Town (A-Z)' },
];

export default function FilterBar({
  filters,
  stats,
  towns = [],
  activeFiltersCount = 0,
  onSetTown,
  onSetStatus,
  onSetIssue,
  onSetSearchQuery,
  onSetSortBy,
  onOpenMobileFilter,
}) {
  const { town = 'all', status = 'all', issue = 'all', q = '', sort = 'newest' } = filters || {};

  // Build town pills list combining Geography towns + counts from stats
  const townCounts = stats?.townCounts || {};
  const totalNoticesCount = stats?.total || 0;

  return (
    <div className="filter-section" role="search" aria-label="Notices and corridors filter controls">
      {/* Search Input Bar with Mobile Filter Trigger */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <div className="search-input-wrapper">
          <span className="search-icon-box" aria-hidden="true">
            🔍
          </span>
          <input
            type="search"
            className="search-input"
            placeholder="Search by stay, town, road name, or landmark (e.g. Ella, Passara road, Ramboda, Heen Ganga)..."
            value={q}
            onChange={(e) => onSetSearchQuery(e.target.value)}
            aria-label="Search corridor notices"
          />
          {q && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => onSetSearchQuery('')}
              aria-label="Clear search input"
            >
              ✕
            </button>
          )}
        </div>

        {/* Mobile Filter Button */}
        <button
          type="button"
          className="btn-mobile-filter"
          onClick={onOpenMobileFilter}
          aria-label="Open filter options"
        >
          <span aria-hidden="true">⚙️</span>
          <span>Filter {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
        </button>
      </div>

      {/* Corridors / Towns Pill Row */}
      <div className="filter-row">
        <span className="filter-label">CORRIDORS:</span>
        <div className="pill-group" role="tablist" aria-label="Filter by town or corridor">
          <button
            type="button"
            className={`filter-pill ${town === 'all' ? 'active' : ''}`}
            onClick={() => onSetTown('all')}
          >
            All Towns ({totalNoticesCount})
          </button>

          {towns.map((t) => {
            const count = townCounts[t.id.toLowerCase()] || 0;
            const isSelected = town.toLowerCase() === t.id.toLowerCase();
            return (
              <button
                key={t.id}
                type="button"
                className={`filter-pill ${isSelected ? 'active' : ''}`}
                onClick={() => onSetTown(t.id)}
              >
                {t.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Status Filter & Dropdown Controls Row */}
      <div className="filter-controls-row">
        <div className="filter-row" style={{ flex: 1 }}>
          <span className="filter-label">STATUS:</span>
          <div className="pill-group" role="tablist" aria-label="Filter by operational status">
            <button
              type="button"
              className={`filter-pill ${status === 'all' ? 'active' : ''}`}
              onClick={() => onSetStatus('all')}
            >
              All Statuses
            </button>
            <button
              type="button"
              className={`filter-pill status-disrupted ${status === 'disrupted' ? 'active' : ''}`}
              onClick={() => onSetStatus('disrupted')}
            >
              Disrupted ({stats?.disrupted || 0})
            </button>
            <button
              type="button"
              className={`filter-pill status-caution ${status === 'caution' ? 'active' : ''}`}
              onClick={() => onSetStatus('caution')}
            >
              Caution ({stats?.caution || 0})
            </button>
            <button
              type="button"
              className={`filter-pill status-open ${status === 'open' ? 'active' : ''}`}
              onClick={() => onSetStatus('open')}
            >
              Open & Clear ({stats?.open || 0})
            </button>
          </div>
        </div>

        {/* Dropdowns on Right (Issue type & Sort) */}
        <div className="filter-dropdowns">
          <select
            className="select-control"
            value={issue}
            onChange={(e) => onSetIssue(e.target.value)}
            aria-label="Filter by disruption type"
          >
            {ISSUE_TYPES.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <select
            className="select-control"
            value={sort}
            onChange={(e) => onSetSortBy(e.target.value)}
            aria-label="Sort notices"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
