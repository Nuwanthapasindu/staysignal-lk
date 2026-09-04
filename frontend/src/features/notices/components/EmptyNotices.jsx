import React from 'react';

export default function EmptyNotices({
  townName,
  isTownEmpty = false,
  isFiltered = false,
  onResetFilters,
}) {
  if (isTownEmpty && townName) {
    return (
      <div className="empty-state-card" role="status" aria-live="polite">
        <div className="empty-state-icon" aria-hidden="true">
          🌱
        </div>
        <h3 className="empty-state-title">
          No Active Disruption in {townName}
        </h3>
        <p className="empty-state-description">
          All routes, municipal water supplies, and power grids in the {townName} corridor are currently clear and operating normally. No verified incident notices have been filed.
        </p>
        {onResetFilters && (
          <button
            type="button"
            className="btn-reset-filters"
            onClick={onResetFilters}
          >
            ← View All Corridors
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="empty-state-card" role="status" aria-live="polite">
      <div className="empty-state-icon" aria-hidden="true">
        🔍
      </div>
      <h3 className="empty-state-title">No matching corridor notices found</h3>
      <p className="empty-state-description">
        We couldn't find any notices matching your current search query or filter criteria. Try adjusting your filters or resetting to see all active highland updates.
      </p>
      {onResetFilters && (
        <button
          type="button"
          className="btn-reset-filters"
          onClick={onResetFilters}
        >
          Reset All Filters
        </button>
      )}
    </div>
  );
}
