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
        </div>

        <div className="footer-bottom">
          <div>
            StaySignal LK operates independently in coordination with regional estate superintendents, DWC wild rangers, and Divisional Secretariats. Not an automated social scraper; human-curated field updates exclusively.
          </div>
          <div style={{ whiteSpace: 'nowrap' }}>
            Sri Lanka Tourism Development Authority (SLTDA) Partner Desk
          </div>
        </div>
      </div>
    </footer>
  );
}
