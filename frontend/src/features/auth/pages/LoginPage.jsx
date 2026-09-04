import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, loading } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="auth-shell">
      <div className="auth-grid" style={{ maxWidth: '440px', margin: '40px auto' }}>
        <div className="auth-card">
          <div className="auth-card__row">
            <span className="auth-card__eyebrow">Desk Operator</span>
            <span className="auth-card__lock">Secure</span>
          </div>
          <h2>Log in to Stay Desk</h2>
          <p className="auth-card__intro">Enter your credentials to manage your property's notices.</p>
          
          {error && <div className="form-alert">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Email Address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="hello@stay.lk" />
            </div>
            <div className="field">
              <label>Password</label>
              <div className="password-field">
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary btn-block" style={{ marginTop: '24px' }}>
              {loading ? 'Authenticating...' : 'Log In'}
            </button>
          </form>
          
          <div className="auth-card__foot">
            <span>No account yet?</span>
            <div>
              <Link to="/signup/traveller" style={{ marginRight: '16px' }}>Traveller</Link>
              <Link to="/signup/owner">Run a Stay</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
