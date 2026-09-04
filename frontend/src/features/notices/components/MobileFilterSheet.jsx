import React, { useState, useEffect } from 'react';
import { ISSUE_TYPES, SORT_OPTIONS } from './FilterBar';

export default function MobileFilterSheet({
  isOpen,
  onClose,
  filters,
  stats,
  towns = [],
  onApplyFilters,
  onResetFilters,
}) {
  const [draftTown, setDraftTown] = useState(filters?.town || 'all');
  const [draftStatus, setDraftStatus] = useState(filters?.status || 'all');
  const [draftIssue, setDraftIssue] = useState(filters?.issue || 'all');
  const [draftQ, setDraftQ] = useState(filters?.q || '');
  const [draftFrom, setDraftFrom] = useState(filters?.from || '');
  const [draftTo, setDraftTo] = useState(filters?.to || '');
  const [draftSort, setDraftSort] = useState(filters?.sort || 'newest');

  useEffect(() => {
    if (isOpen) {
      setDraftTown(filters?.town || 'all');
      setDraftStatus(filters?.status || 'all');
      setDraftIssue(filters?.issue || 'all');
      setDraftQ(filters?.q || '');
      setDraftFrom(filters?.from || '');
      setDraftTo(filters?.to || '');
      setDraftSort(filters?.sort || 'newest');
    }
  }, [isOpen, filters]);

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyFilters({
      town: draftTown,
      status: draftStatus,
      issue: draftIssue,
      q: draftQ,
      from: draftFrom,
      to: draftTo,
      sort: draftSort,
    });
    onClose();
  };

  const handleReset = () => {
    onResetFilters();
    onClose();
  };

  return (
    <div
      className="modal-backdrop bottom-sheet-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Filter notices mobile sheet"
    >
      <div
        className="modal-dialog bottom-sheet-drawer"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '85vh', overflowY: 'auto' }}
      >
        <div className="modal-header">
          <h3 className="modal-title">Filter Corridor Notices</h3>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close filter options"
          >
            ✕
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Keyword Search */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>
              Search Keywords
            </label>
            <input
              type="text"
              className="search-input"
              style={{ height: '40px', padding: '0 12px' }}
              placeholder="Stay, landmark, or road..."
              value={draftQ}
              onChange={(e) => setDraftQ(e.target.value)}
            />
          </div>

          {/* Operational Status */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>
              Operational Status
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {[
                { id: 'all', label: 'All Statuses' },
                { id: 'disrupted', label: `Disrupted (${stats?.disrupted || 0})` },
                { id: 'caution', label: `Caution (${stats?.caution || 0})` },
                { id: 'open', label: `Open (${stats?.open || 0})` },
              ].map((st) => (
                <button
                  key={st.id}
                  type="button"
                  className={`filter-pill ${draftStatus === st.id ? 'active' : ''}`}
                  onClick={() => setDraftStatus(st.id)}
                  style={{ padding: '6px 12px', fontSize: '12px' }}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* Town / Corridor */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>
              Town / Highland Corridor
            </label>
            <select
              className="select-control"
              style={{ width: '100%', height: '40px' }}
              value={draftTown}
              onChange={(e) => setDraftTown(e.target.value)}
            >
              <option value="all">All Towns ({stats?.total || 0})</option>
              {towns.map((t) => {
                const count = stats?.townCounts?.[t.id.toLowerCase()] || 0;
                return (
                  <option key={t.id} value={t.id}>
                    {t.name} ({count})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Disruption Type */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>
              Disruption Type
            </label>
            <select
              className="select-control"
              style={{ width: '100%', height: '40px' }}
              value={draftIssue}
              onChange={(e) => setDraftIssue(e.target.value)}
            >
              {ISSUE_TYPES.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>
              Sort Order
            </label>
            <select
              className="select-control"
              style={{ width: '100%', height: '40px' }}
              value={draftSort}
              onChange={(e) => setDraftSort(e.target.value)}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>
              Date Range
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>From:</span>
                <input
                  type="date"
                  className="search-input"
                  style={{ height: '36px', padding: '0 8px', fontSize: '12px' }}
                  value={draftFrom}
                  onChange={(e) => setDraftFrom(e.target.value)}
                />
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>To:</span>
                <input
                  type="date"
                  className="search-input"
                  style={{ height: '36px', padding: '0 8px', fontSize: '12px' }}
                  value={draftTo}
                  onChange={(e) => setDraftTo(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <button
            type="button"
            className="filter-pill"
            onClick={handleReset}
            style={{ backgroundColor: '#EDE8DE' }}
          >
            Reset All
          </button>
          <button
            type="button"
            className="btn-report-disruption"
            onClick={handleApply}
            style={{ width: 'auto', padding: '10px 24px' }}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
