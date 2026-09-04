import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Radio, 
  ShieldCheck, 
  PlusCircle, 
  ChevronDown,
  MapPin
} from 'lucide-react';

export default function Header() {
  const location = useLocation();
  const path = location.pathname;

  const isCamping = path.includes('/camping');
  const isTourism = path.includes('/tourism');
  const isAdmin = path.includes('/admin') || path.includes('/owner');

  return (
    <>
      {/* Top Telemetry Ticker */}
      <div className="top-ticker-bar">
        <div className="ticker-items">
          <span className="ticker-dot pulse"></span>
          {isCamping ? (
            <>
              <span>Knuckles Conservation Zone</span>
              <span>•</span>
              <span>DWC Monitored Site #03</span>
              <span>•</span>
              <span>2G Mesh Synced</span>
            </>
          ) : isTourism ? (
            <>
              <span>LIVE FIELD LEDGER</span>
              <span>•</span>
              <span>DWC & SLTDA TELEMETRY FEED</span>
              <span>•</span>
              <span>NODE: MAT-SIG-01</span>
            </>
          ) : (
            <>
              <span>SLTDA-DWC FEDERATED DESK</span>
              <span>•</span>
              <span>Central Highlands Gateway Active</span>
              <span>•</span>
              <span>All 9 Provinces Online</span>
            </>
          )}
        </div>
        <div className="ticker-items">
          {isCamping ? (
            <>
              <span>Elevation: 1,480m ASL</span>
              <span>•</span>
              <span>Temperature: 16°C (Mist)</span>
            </>
          ) : isTourism ? (
            <>
              <span>Weather: Clear Sunrise</span>
              <span>•</span>
              <span>Wind: 8 km/h NE</span>
              <span>•</span>
              <span>Verified: 07:15 SLST</span>
            </>
          ) : (
            <>
              <span>Verified Station ID: LK-DWC-7702</span>
              <span>•</span>
              <span>Session Active (Mesh Synced)</span>
            </>
          )}
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="site-header">
        <div className="header-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/" className="brand-wrapper">
              <div className="brand-logo-mark">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 3L3 25H29L16 3Z" fill="#164734" />
                  <path d="M16 11L8 25H24L16 11Z" fill="#fbf9f4" />
                  <circle cx="16" cy="20" r="2.5" fill="#22c55e" />
                </svg>
              </div>
              <div className="brand-text">
                <span className="brand-title">StaySignal<span style={{ color: '#164734', fontWeight: 800 }}> LK</span></span>
              </div>
            </Link>

            {isAdmin && (
              <span className="brand-badge">ADMIN LEDGER</span>
            )}
            {isTourism && !isAdmin && (
              <div className="badge-tag" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={11} /> Central Province
              </div>
            )}
          </div>

          <nav className="site-nav">
            <Link 
              to="/owner" 
              className={`nav-link ${path === '/owner' ? 'active' : ''}`}
            >
              Operational Field Ledger
            </Link>

            <Link 
              to="/notices" 
              className={`nav-link ${path.startsWith('/notices') ? 'active' : ''}`}
            >
              Disruption Ledger
            </Link>

            <Link 
              to="/problem" 
              className={`nav-link ${path === '/problem' ? 'active' : ''}`}
            >
              Corridor Status
            </Link>

            <Link 
              to="/admin/tourism" 
              className={`nav-link ${isTourism ? 'active' : ''}`}
            >
              Tourism Places
            </Link>

            <Link 
              to="/admin/camping" 
              className={`nav-link ${isCamping ? 'active' : ''}`}
            >
              Camping Places
            </Link>

            <Link 
              to="/how-it-works" 
              className={`nav-link ${path === '/how-it-works' ? 'active' : ''}`}
            >
              Guest Protocol
            </Link>

            <Link 
              to="/towns/kandy" 
              className={`nav-link ${path.startsWith('/towns') ? 'active' : ''}`}
            >
              Town Directory
            </Link>
          </nav>

          <div className="header-actions">
            <Link to="/owner" className="officer-badge" title="Authorized Field Officer Profile">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: 1.1 }}>
                <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a2721', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  Officer Silva <ShieldCheck size={12} color="#164734" />
                </span>
                <span style={{ fontSize: '9.5px', color: '#65746b' }}>DWC / SLTDA AUTHORIZED</span>
              </div>
              <div className="officer-avatar">OS</div>
              <ChevronDown size={12} color="#65746b" />
            </Link>

            <button className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Radio size={13} color="#bf5338" />
              Emergency Desk
            </button>

            <Link to="/post" className="btn btn-primary btn-sm">
              <PlusCircle size={14} />
              Report Disruption
            </Link>
          </div>
        </div>
      </header>
    </>
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Ticker from '../../features/notices/components/Ticker';
import { fetchTicker } from '../../features/notices/api/noticesApi';

export default function Header() {
  const location = useLocation();
  const [tickerData, setTickerData] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchTicker()
      .then((data) => setTickerData(data))
      .catch((err) => console.warn('Ticker load in header:', err));
  }, [location.pathname]);

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/notices' && (location.pathname === '/notices' || location.pathname.startsWith('/notices/'))) {
      return true;
    }
    return location.pathname === path;
  };

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
          <Link
            to="/notices"
            className={`nav-link ${isActive('/notices') ? 'active' : ''}`}
          >
            Disruption Ledger
          </Link>
          <Link
            to="/towns/ella"
            className={`nav-link ${isActive('/towns/ella') ? 'active' : ''}`}
          >
            Corridor Status
          </Link>
          <Link
            to="/how-it-works"
            className={`nav-link ${isActive('/how-it-works') ? 'active' : ''}`}
          >
            Guest Protocol
          </Link>
          <Link
            to="/problem"
            className={`nav-link ${isActive('/problem') ? 'active' : ''}`}
          >
            The Problem
          </Link>
          <Link
            to="/owner"
            className={`nav-link ${isActive('/owner') ? 'active' : ''}`}
          >
            Owner Desk
          </Link>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="header-actions hide-on-tablet">
          <a href="tel:117" className="btn-emergency" title="Disaster Management Centre 117">
            <span aria-hidden="true">📞</span>
            <span>Emergency Desk</span>
          </a>

          <Link to="/post" className="btn-report-disruption">
            <span aria-hidden="true">📢</span>
            <span>Report Disruption</span>
          </Link>
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
              <Link
                to="/notices"
                className={`mobile-nav-item ${isActive('/notices') ? 'active' : ''}`}
              >
                <span>📋</span>
                <span>Disruption Ledger (Public Feed)</span>
              </Link>
              <Link
                to="/towns/ella"
                className={`mobile-nav-item ${isActive('/towns/ella') ? 'active' : ''}`}
              >
                <span>🏔️</span>
                <span>Corridor Status & Passes</span>
              </Link>
              <Link
                to="/how-it-works"
                className={`mobile-nav-item ${isActive('/how-it-works') ? 'active' : ''}`}
              >
                <span>⚙️</span>
                <span>Guest Protocol & 2G Architecture</span>
              </Link>
              <Link
                to="/problem"
                className={`mobile-nav-item ${isActive('/problem') ? 'active' : ''}`}
              >
                <span>📊</span>
                <span>The Problem & Field Metrics</span>
              </Link>
              <Link
                to="/owner"
                className={`mobile-nav-item ${isActive('/owner') ? 'active' : ''}`}
              >
                <span>🔑</span>
                <span>Owner & Host Desk</span>
              </Link>
            </nav>

            <div className="mobile-nav-actions" style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '14px', borderTop: '1px solid var(--border-light)' }}>
              <Link to="/post" className="btn-report-disruption" style={{ justifyContent: 'center', width: '100%', height: '42px' }}>
                <span aria-hidden="true">✍️</span>
                <span>Post Operational Notice</span>
              </Link>
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
