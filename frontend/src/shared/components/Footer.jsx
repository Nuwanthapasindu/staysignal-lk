import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container">
        <div className="footer-top">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 3L3 25H29L16 3Z" fill="#164734" />
                <path d="M16 11L8 25H24L16 11Z" fill="#fbf9f4" />
                <circle cx="16" cy="20" r="2.5" fill="#22c55e" />
              </svg>
              <span style={{ fontWeight: 700, fontSize: '14px', color: '#164734' }}>StaySignal LK</span>
            </div>
            <p style={{ fontSize: '12px', color: '#56645d', maxWidth: '680px' }}>
              © 2024 StaySignal LK. Operational field ledger for hospitality desks across Sri Lanka. Human-verified corridor intelligence.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span className="badge-tag" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span className="ticker-dot pulse"></span>
              Field Desk Sync: Live
            </span>
            <span className="badge-tag" style={{ fontFamily: 'var(--font-mono)' }}>
              FIELD TERMINAL: NUW-SEC-NODE-04
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
          <div className="footer-links">
            <Link to="/towns/kandy">Kandy & Central Highlands</Link>
            <span>•</span>
            <Link to="/towns/nuwara-eliya">Nuwara Eliya Passages</Link>
            <span>•</span>
            <Link to="/towns/ella">Ella & Badulla Valley</Link>
            <span>•</span>
            <Link to="/towns/southern">Southern Coastal Belt</Link>
            <span>•</span>
            <Link to="/impact">Divisional Secretariat Feeds</Link>
            <span>•</span>
            <Link to="/problem">Report Discrepancy</Link>
            <span>•</span>
            <Link to="/how-it-works">Community Operational Protocol</Link>
          </div>

          <span style={{ fontSize: '11px', color: '#727e77', fontFamily: 'var(--font-mono)' }}>
            DWC-GEO-REF // REGION-CENTRAL-04
          </span>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand-summary">
            <div className="footer-logo">📶 StaySignal LK</div>
            <p style={{ lineHeight: '1.6', marginBottom: '12px' }}>
              Operational field ledger for hospitality desks across Sri Lanka. Human-verified corridor intelligence designed for low-bandwidth hill country networks.
            </p>
            <div className="mesh-status-badge" style={{ backgroundColor: '#E2EBE5' }}>
              <span className="status-dot" />
              <span>Mesh Radio & GSM Gateway Synchronized</span>
            </div>
          </div>

          <div className="footer-links-grid">
            <div>
              <h4 className="footer-column-title">Highland Corridors</h4>
              <ul className="footer-link-list">
                <li><Link to="/notices?town=ella">Ella & Badulla Valley</Link></li>
                <li><Link to="/notices?town=nuwara-eliya">Nuwara Eliya Passages</Link></li>
                <li><Link to="/notices?town=haputale">Haputale & Beragala</Link></li>
                <li><Link to="/notices?town=hatton">Hatton & Adam's Peak</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-column-title">Coastal & Knuckles</h4>
              <ul className="footer-link-list">
                <li><Link to="/notices?town=meemure">Knuckles & Heen Ganga</Link></li>
                <li><Link to="/notices?town=arugam-bay">Arugam Bay & Panama</Link></li>
                <li><Link to="/notices?town=galle">Southern Expressway & Galle</Link></li>
                <li><Link to="/notices?town=mirissa">Mirissa & Weligama</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-column-title">Field Protocols</h4>
              <ul className="footer-link-list">
                <li><Link to="/how-it-works">Community Protocol</Link></li>
                <li><Link to="/problem">Why StaySignal Exists</Link></li>
                <li><Link to="/owner">Host Desk Login</Link></li>
                <li><a href="tel:117">DMC Helpline (117)</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            StaySignal LK operates independently in coordination with regional estate superintendents, DWC wild rangers, and Divisional Secretariats. Not an automated social scraper; human-curated field updates exclusively.
          </div>
          <div style={{ whiteSpace: 'nowrap' }}>
            Sri Lanka Tourism Development Authority (SLTDA) Partner Desk
            © 2026 StaySignal LK. Operational field ledger for hospitality desks across Sri Lanka.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>Colombo Central Time (GMT+5:30)</span>
            <span>2G / Mesh Cache Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
