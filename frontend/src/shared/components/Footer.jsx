import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand-summary">
            <div className="footer-logo">📶 StaySignal LK</div>
            <p style={{ lineHeight: '1.6', marginBottom: '12px' }}>
              Operational field ledger for hospitality desks across Sri Lanka. Human-verified corridor intelligence
              designed for low-bandwidth hill country networks. A community board, not an official DMC feed.
            </p>
            <div className="mesh-status-badge" style={{ backgroundColor: '#E2EBE5' }}>
              <span className="status-dot" />
              <span>Mesh Radio &amp; GSM Gateway Synchronized</span>
            </div>
          </div>

          <div className="footer-links-grid">
            <div>
              <h4 className="footer-column-title">Corridors</h4>
              <ul className="footer-link-list">
                <li><Link to="/notices">Disruption Ledger</Link></li>
                <li><Link to="/towns/ella">Ella &amp; Badulla Valley</Link></li>
                <li><Link to="/towns/nuwara-eliya">Nuwara Eliya Passages</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-column-title">Directories</h4>
              <ul className="footer-link-list">
                <li><Link to="/tourism">Tourism Places</Link></li>
                <li><Link to="/impact">Impact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-column-title">Field Protocols</h4>
              <ul className="footer-link-list">
                <li><Link to="/how-it-works">Community Protocol</Link></li>
                <li><Link to="/problem">Why StaySignal Exists</Link></li>
                <li><Link to="/login">Host Desk Login</Link></li>
                <li><a href="tel:117">DMC Helpline (117)</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2026 StaySignal LK. Operational field ledger for hospitality desks across Sri Lanka.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>Colombo Central Time (GMT+5:30)</span>
            <span>2G / Mesh Cache Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
