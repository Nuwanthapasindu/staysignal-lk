import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';

export const SignupTravellerPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const { signup, error, fieldErrors, loading } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup('traveller', formData);
  };

  return (
    <div className="auth-shell">
      <div className="auth-grid" style={{ maxWidth: '440px', margin: '40px auto' }}>
        <div className="auth-card">
          <div className="auth-card__row">
            <span className="auth-card__eyebrow">Traveller Portal</span>
          </div>
          <h2>Create Account</h2>
          <p className="auth-card__intro">Join to view alerts and get updates for your journey.</p>
          
          {error && !Object.keys(fieldErrors).length && <div className="form-alert">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Full Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} aria-invalid={!!fieldErrors.name} />
              {fieldErrors.name && <div className="field-error">{fieldErrors.name}</div>}
            </div>
            <div className="field">
              <label>Email Address</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} aria-invalid={!!fieldErrors.email} />
              {fieldErrors.email && <div className="field-error">{fieldErrors.email}</div>}
            </div>
            <div className="field">
              <label>Phone (Optional)</label>
              <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} aria-invalid={!!fieldErrors.phone} />
              {fieldErrors.phone && <div className="field-error">{fieldErrors.phone}</div>}
            </div>
            <div className="field-row">
              <div className="field">
                <label>Password</label>
                <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} aria-invalid={!!fieldErrors.password} />
                {fieldErrors.password && <div className="field-error">{fieldErrors.password}</div>}
              </div>
              <div className="field">
                <label>Confirm</label>
                <input type="password" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} aria-invalid={!!fieldErrors.confirmPassword} />
                {fieldErrors.confirmPassword && <div className="field-error">{fieldErrors.confirmPassword}</div>}
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary btn-block" style={{ marginTop: '16px' }}>
              {loading ? 'Creating...' : 'Register as Traveller'}
            </button>
          </form>
          
          <div className="auth-card__foot">
            <span>Already have an account?</span>
            <Link to="/login">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
