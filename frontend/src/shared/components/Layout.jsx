import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content" id="main-content">
        <Outlet />
      </main>
      <Footer />

      {/* Mobile Sticky Bottom Action Bar (390px viewport) */}
      <aside className="mobile-bottom-bar" aria-label="Quick actions">
        <div className="mobile-bottom-bar-inner">
          <a href="tel:117" className="btn-emergency">
            <span aria-hidden="true">📞</span>
            <span>Emergency Desk</span>
          </a>
          <Link to="/post" className="btn-report-disruption">
            <span aria-hidden="true">📢</span>
            <span>Report Disruption</span>
          </Link>
        </div>
      </aside>
    </div>
  );
}
