import { Link } from 'react-router-dom';
import { useAuth, useLogout, ROLE_LABELS } from '../../features/auth';

export default function Header() {
  const { isReady, isAuthenticated, user } = useAuth();
  const logout = useLogout();

  return (
    <header className="site-header">
      <div className="site-header__bar">
        <Link to="/" className="brand">
          <span className="brand__mark" aria-hidden="true">✦</span>
          <span>
            <span className="brand__name">StaySignal LK</span>
            <br />
            <span className="brand__tag">Corridor Ledger</span>
          </span>
        </Link>

        <nav className="site-nav">
          <Link to="/notices">Disruption Ledger</Link>
          <Link to="/how-it-works">Guest Protocol</Link>
          <Link to="/problem">The Problem</Link>
          <Link to="/impact">Impact</Link>
        </nav>

        <div className="header-actions">
          {!isReady ? null : isAuthenticated ? (
            <div className="header-user">
              <span className="header-user__name">{user.name}</span>
              <span className="role-chip" data-role={user.role}>
                {ROLE_LABELS[user.role] ?? user.role}
              </span>
              {user.role === 'owner' && (
                <Link className="btn btn-ghost" to="/owner">
                  Owner desk
                </Link>
              )}
              <button className="linkbtn" type="button" onClick={logout}>
                Log out
              </button>
            </div>
          ) : (
            <div className="header-user">
              <Link to="/login">Log in</Link>
              <Link className="btn btn-ghost" to="/signup/traveller">
                Sign up
              </Link>
              <Link className="btn btn-primary" to="/signup/owner">
                I run a stay
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
