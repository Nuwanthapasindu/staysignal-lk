import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Ticker from '../../features/notices/components/Ticker';
import { fetchTicker } from '../../features/notices/api/noticesApi';
import { useAuth, useLogout, ROLE_LABELS } from '../../features/auth';

export default function Header() {
  const location = useLocation();
  const [tickerData, setTickerData] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isReady, isAuthenticated, user } = useAuth();
  const logout = useLogout();

  useEffect(() => {
    fetchTicker()
      .then((data) => setTickerData(data))
      .catch((err) => console.warn('Ticker load in header:', err));
  }, [location.pathname]);

  // Close mobile drawer on route navigation
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/notices' && (location.pathname === '/notices' || location.pathname.startsWith('/notices/'))) {
      return true;
    }
    return location.pathname === path;
  };

  const isOwner = isAuthenticated && user.role === 'owner';

  const authCluster = !isReady ? null : isAuthenticated ? (
    <div className="header-auth">
      <span className="header-auth__name">{user.name}</span>
      <span className="role-chip" data-role={user.role}>
        {ROLE_LABELS[user.role] ?? user.role}
      </span>
      <button type="button" className="linkbtn" onClick={logout}>
        Log out
      </button>
    </div>
  ) : (
    <div className="header-auth">
      <Link to="/login" className="nav-link">
        Log in
      </Link>
      <Link to="/signup/owner" className="btn-report-disruption">
        <span aria-hidden="true">🔑</span>
        <span>Sign up</span>
      </Link>
    </div>
  );

  return (
    <header className="site-header">
      {/* Live Ticker Alert Bar */}
      <Ticker tickerData={tickerData} />

      {/* Main Navigation Bar */}
      <div className="header-main">
        <div className="header-brand-group">
          <Link to="/notices" className="logo-link" aria-label="StaySignal LK Home">
            <div className="logo-icon-box" aria-hidden="true">
              📶
            </div>
            <span className="brand-title">StaySignal LK</span>
          </Link>

          <div className="mesh-status-badge hide-on-mobile-sm">
            <span className="status-dot" aria-hidden="true" />
            <span>Central & South Mesh</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="site-nav hide-on-tablet" aria-label="Primary Navigation">
          <Link to="/notices" className={`nav-link ${isActive('/notices') ? 'active' : ''}`}>
            Disruption Ledger
          </Link>
          <Link to="/towns/ella" className={`nav-link ${isActive('/towns/ella') ? 'active' : ''}`}>
            Corridor Status
          </Link>
          <Link to="/how-it-works" className={`nav-link ${isActive('/how-it-works') ? 'active' : ''}`}>
            Guest Protocol
          </Link>
          <Link to="/problem" className={`nav-link ${isActive('/problem') ? 'active' : ''}`}>
            The Problem
          </Link>
          {isOwner && (
            <Link to="/owner" className={`nav-link ${isActive('/owner') ? 'active' : ''}`}>
              Owner Desk
            </Link>
          )}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="header-actions hide-on-tablet">
          {authCluster}
          <a href="tel:117" className="btn-emergency" title="Disaster Management Centre 117">
            <span aria-hidden="true">📞</span>
            <span>Emergency Desk</span>
          </a>
          {isOwner && (
            <Link to="/post" className="btn-report-disruption">
              <span aria-hidden="true">📢</span>
              <span>Report Disruption</span>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          className="btn-hamburger show-on-tablet"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Slide-down Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer show-on-tablet" role="dialog" aria-modal="true">
          <div className="mobile-nav-inner">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-light)' }}>
              <span className="mesh-status-badge">
                <span className="status-dot" />
                <span>Central & South Mesh Active</span>
              </span>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <nav className="mobile-nav-links" aria-label="Mobile Navigation">
              <Link to="/notices" className={`mobile-nav-item ${isActive('/notices') ? 'active' : ''}`}>
                <span>📋</span>
                <span>Disruption Ledger (Public Feed)</span>
              </Link>
              <Link to="/towns/ella" className={`mobile-nav-item ${isActive('/towns/ella') ? 'active' : ''}`}>
                <span>🏔️</span>
                <span>Corridor Status & Passes</span>
              </Link>
              <Link to="/how-it-works" className={`mobile-nav-item ${isActive('/how-it-works') ? 'active' : ''}`}>
                <span>⚙️</span>
                <span>Guest Protocol & 2G Architecture</span>
              </Link>
              <Link to="/problem" className={`mobile-nav-item ${isActive('/problem') ? 'active' : ''}`}>
                <span>📊</span>
                <span>The Problem & Field Metrics</span>
              </Link>
              {isOwner && (
                <Link to="/owner" className={`mobile-nav-item ${isActive('/owner') ? 'active' : ''}`}>
                  <span>🔑</span>
                  <span>Owner & Host Desk</span>
                </Link>
              )}
            </nav>

            <div className="mobile-nav-actions" style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '14px', borderTop: '1px solid var(--border-light)' }}>
              {isReady && isAuthenticated ? (
                <>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    Signed in as <strong>{user.name}</strong> ({ROLE_LABELS[user.role] ?? user.role})
                  </span>
                  {isOwner && (
                    <Link to="/post" className="btn-report-disruption" style={{ justifyContent: 'center', width: '100%', height: '42px' }}>
                      <span aria-hidden="true">✍️</span>
                      <span>Post Operational Notice</span>
                    </Link>
                  )}
                  <button
                    type="button"
                    className="btn-emergency"
                    style={{ justifyContent: 'center', width: '100%', height: '42px' }}
                    onClick={logout}
                  >
                    <span>Log out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-report-disruption" style={{ justifyContent: 'center', width: '100%', height: '42px' }}>
                    <span aria-hidden="true">🔓</span>
                    <span>Log in</span>
                  </Link>
                  <Link to="/signup/owner" className="btn-emergency" style={{ justifyContent: 'center', width: '100%', height: '42px' }}>
                    <span aria-hidden="true">🔑</span>
                    <span>Sign up your stay</span>
                  </Link>
                </>
              )}
              <a href="tel:117" className="btn-emergency" style={{ justifyContent: 'center', width: '100%', height: '42px' }}>
                <span aria-hidden="true">📞</span>
                <span>DMC Emergency Helpline (117)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
