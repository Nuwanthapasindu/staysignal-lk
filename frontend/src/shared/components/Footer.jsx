import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <h3>StaySignal LK</h3>
        <p>
          Human-verified corridor intelligence and incident logging for hospitality operators in Sri Lanka. A community
          board, not an official DMC feed.
        </p>
        <div className="site-footer__links">
          <Link to="/notices">Disruption Ledger</Link>
          <Link to="/how-it-works">Guest Protocol</Link>
          <Link to="/problem">The Problem</Link>
          <Link to="/impact">Impact</Link>
          <Link to="/signup/owner">Register your stay</Link>
        </div>
      </div>
    </footer>
  );
}
