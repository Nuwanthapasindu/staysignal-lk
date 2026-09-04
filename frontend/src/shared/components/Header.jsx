import { useState, useEffect, useRef } from 'react';
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
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    if (!userMenuOpen) return;
    const onDocClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false);
    };
    const onEsc = (e) => e.key === 'Escape' && setUserMenuOpen(false);
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [userMenuOpen]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUserMenuOpen(false);
  }, [location.pathname]);

  const getInitials = (name = '') => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  useEffect(() => {
    fetchTicker()
      .then((data) => setTickerData(data))
      .catch((err) => console.warn('Ticker load in header:', err));
  }, [location.pathname]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/notices' && location.pathname.startsWith('/notices')) return true;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isOwner = isAuthenticated && user.role === 'owner';

  const navLinks = (
    <>
      <Link to="/notices" className={`nav-link ${isActive('/notices') ? 'active' : ''}`}>Disruption Ledger</Link>
      <Link to="/tourism" className={`nav-link ${isActive('/tourism') ? 'active' : ''}`}>Tourism</Link>
      <Link to="/how-it-works" className={`nav-link ${isActive('/how-it-works') ? 'active' : ''}`}>Guest Protocol</Link>
      <Link to="/problem" className={`nav-link ${isActive('/problem') ? 'active' : ''}`}>The Problem</Link>
      {isOwner && <Link to="/owner" className={`nav-link ${isActive('/owner') ? 'active' : ''}`}>Owner Desk</Link>}
    </>
  );

  const authCluster = !isReady ? null : isAuthenticated ? (
    <div className="header-user" ref={userMenuRef} style={{ position: 'relative' }}>
      <button
        type="button"
        className="header-user__avatar"
        onClick={() => setUserMenuOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={userMenuOpen}
        aria-label="Account menu"
        title={user.name}
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          border: '1px solid var(--border-medium, #d8d2c4)',
          background: 'var(--brand-forest, #163A29)',
          color: '#fff',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '0.5px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {getInitials(user.name)}
      </button>

      {userMenuOpen && (
        <div
          role="menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            minWidth: '220px',
            background: '#fff',
            border: '1px solid var(--border-medium, #d8d2c4)',
            borderRadius: '10px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.14)',
            padding: '14px',
            zIndex: 60,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span
              aria-hidden="true"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'var(--brand-forest, #163A29)',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {getInitials(user.name)}
            </span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary, #1c1c1c)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user.name}
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-secondary, #6b6b6b)' }}>
                {ROLE_LABELS[user.role] ?? user.role}
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn-emergency"
            onClick={() => {
              setUserMenuOpen(false);
              logout();
            }}
            style={{ width: '100%', justifyContent: 'center', height: '38px' }}
          >
            <span>Log out</span>
          </button>
        </div>
      )}
    </div>
  ) : (
    <div className="header-auth">
      <Link to="/login" className="nav-link">Log in</Link>
      <Link to="/signup/owner" className="btn-report-disruption"><span aria-hidden="true">🔑</span><span>Sign up</span></Link>
    </div>
  );

  return (
    <header className="site-header">
      <Ticker tickerData={tickerData} />

      <div className="header-main">
        <div className="header-brand-group">
          <Link to="/notices" className="logo-link" aria-label="StaySignal LK Home">
            <div className="logo-icon-box" aria-hidden="true">📶</div>
            <span className="brand-title">StaySignal LK</span>
          </Link>
          <div className="mesh-status-badge hide-on-mobile-sm">
            <span className="status-dot" aria-hidden="true" />
            <span>Central &amp; South Mesh</span>
          </div>
        </div>

        <nav className="site-nav hide-on-tablet" aria-label="Primary Navigation">{navLinks}</nav>

        <div className="header-actions hide-on-tablet">
          {authCluster}
          <a href="tel:117" className="btn-emergency" title="Disaster Management Centre 117">
            <span aria-hidden="true">📞</span><span>Emergency Desk</span>
          </a>
          {isOwner && (
            <Link to="/post" className="btn-report-disruption">
              <span aria-hidden="true">📢</span><span>Report Disruption</span>
            </Link>
          )}
        </div>

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

      {mobileMenuOpen && (
        <div className="mobile-nav-drawer show-on-tablet" role="dialog" aria-modal="true">
          <div className="mobile-nav-inner">
            <nav className="mobile-nav-links" aria-label="Mobile Navigation">{navLinks}</nav>
            <div className="mobile-nav-actions" style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '14px', borderTop: '1px solid var(--border-light)' }}>
              {isReady && isAuthenticated ? (
                <>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    Signed in as <strong>{user.name}</strong> ({ROLE_LABELS[user.role] ?? user.role})
                  </span>
                  <button type="button" className="btn-emergency" style={{ justifyContent: 'center', width: '100%', height: '42px' }} onClick={logout}>
                    <span>Log out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-report-disruption" style={{ justifyContent: 'center', width: '100%', height: '42px' }}>Log in</Link>
                  <Link to="/signup/owner" className="btn-emergency" style={{ justifyContent: 'center', width: '100%', height: '42px' }}>Sign up your stay</Link>
                </>
              )}
              <a href="tel:117" className="btn-emergency" style={{ justifyContent: 'center', width: '100%', height: '42px' }}>
                <span aria-hidden="true">📞</span><span>DMC Emergency Helpline (117)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
