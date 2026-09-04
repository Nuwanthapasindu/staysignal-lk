import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useNotices from '../hooks/useNotices';
import NoticeCard from '../components/NoticeCard';
import FilterBar from '../components/FilterBar';
import EmptyNotices from '../components/EmptyNotices';
import NoticeSkeleton from '../components/NoticeSkeleton';
import MobileFilterSheet from '../components/MobileFilterSheet';
import CallStayModal from '../components/CallStayModal';

export default function NoticesPage() {
  const {
    notices,
    stats,
    towns,
    loading,
    error,
    filters,
    activeFiltersCount,
    setTown,
    setStatus,
    setIssue,
    setSearchQuery,
    setSortBy,
    resetFilters,
    refetch,
  } = useNotices();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedCallNotice, setSelectedCallNotice] = useState(null);

  // Identify current selected town object if any
  const currentTownObj = towns.find(
    (t) => t.id.toLowerCase() === (filters.town || '').toLowerCase()
  );
  const isTownSelected = filters.town && filters.town !== 'all';
  const isTownEmpty = isTownSelected && notices.length === 0 && !filters.q && filters.status === 'all' && filters.issue === 'all';
  const isSearchNoMatch = notices.length === 0 && !isTownEmpty;

  const handleApplyMobileFilters = (newFilters) => {
    if (newFilters.town !== undefined) setTown(newFilters.town);
    if (newFilters.status !== undefined) setStatus(newFilters.status);
    if (newFilters.issue !== undefined) setIssue(newFilters.issue);
    if (newFilters.q !== undefined) setSearchQuery(newFilters.q);
    if (newFilters.sort !== undefined) setSortBy(newFilters.sort);
  };

  return (
    <div className="page-wrapper">
      {/* Page Hero & Header */}
      <section className="ledger-hero" aria-labelledby="ledger-heading">
        <div className="hero-text-block">
          <div className="hero-tracker">
            <span aria-hidden="true">📋</span>
            <span>Field Ledger · All Monitored Corridors</span>
          </div>
          <h1 id="ledger-heading" className="hero-title">
            Live Notices & Corridor Ledger
          </h1>
          <p className="hero-description">
            Real-time road access, power cut schedules, water deliveries, and landslide bypasses verified directly by local guest-houses and transport coordinators across Sri Lanka.
          </p>
        </div>

        {/* Metrics Summary Card */}
        <div className="metrics-summary-card">
          <div className="metrics-row">
            <span className="metric-pill total">
              {stats.active || stats.total} Active
            </span>
            <span className="metric-pill open">
              ● {stats.open} Open
            </span>
            <span className="metric-pill caution">
              ● {stats.caution} Caution
            </span>
            <span className="metric-pill disrupted">
              ● {stats.disrupted} Disrupted
            </span>
          </div>
          <div className="metrics-timestamp">
            Last verified 4 min ago
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <FilterBar
        filters={filters}
        stats={stats}
        towns={towns}
        activeFiltersCount={activeFiltersCount}
        onSetTown={setTown}
        onSetStatus={setStatus}
        onSetIssue={setIssue}
        onSetSearchQuery={setSearchQuery}
        onSetSortBy={setSortBy}
        onOpenMobileFilter={() => setIsMobileFilterOpen(true)}
      />

      {/* Main Content Feed / States */}
      {loading ? (
        <NoticeSkeleton count={6} />
      ) : error ? (
        <div className="empty-state-card" role="alert">
          <div className="empty-state-icon" style={{ backgroundColor: '#FEE2E2', color: '#B91C1C' }}>
            ⚠️
          </div>
          <h3 className="empty-state-title">Unable to load corridor ledger</h3>
          <p className="empty-state-description">{error}</p>
          <button type="button" className="btn-reset-filters" onClick={refetch}>
            🔄 Retry Loading
          </button>
        </div>
      ) : isTownEmpty ? (
        <EmptyNotices
          isTownEmpty={true}
          townName={currentTownObj?.name || filters.town}
          onResetFilters={resetFilters}
        />
      ) : isSearchNoMatch ? (
        <EmptyNotices
          isFiltered={true}
          onResetFilters={resetFilters}
        />
      ) : (
        <div className="notices-grid" role="region" aria-label="Corridor notices grid">
          {notices.map((notice) => (
            <NoticeCard
              key={notice.id}
              notice={notice}
              onCallClick={(n) => setSelectedCallNotice(n)}
            />
          ))}
        </div>
      )}

      {/* Accommodation Manager / Coordinator Bottom CTA */}
      <section className="owner-cta-banner" aria-label="Post notice call to action">
        <div className="cta-text-group">
          <div className="cta-icon-box" aria-hidden="true">
            📢
          </div>
          <div>
            <h3 className="cta-heading">
              Are you an accommodation manager or transport coordinator?
            </h3>
            <p className="cta-subtext">
              Publish your stay's road access, generator availability, and drinking water status in under 30 seconds. No account required for verified local numbers.
            </p>
          </div>
        </div>
        <Link to="/post" className="btn-cta-post">
          <span aria-hidden="true">✍️</span>
          <span>Post an operational notice</span>
        </Link>
      </section>

      {/* Mobile Filter Drawer */}
      <MobileFilterSheet
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        stats={stats}
        towns={towns}
        onApplyFilters={handleApplyMobileFilters}
        onResetFilters={resetFilters}
      />

      {/* Call Stay Confirmation Sheet */}
      <CallStayModal
        isOpen={Boolean(selectedCallNotice)}
        notice={selectedCallNotice}
        onClose={() => setSelectedCallNotice(null)}
      />
    </div>
  );
}
