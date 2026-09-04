import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';

export const SignupOwnerPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const { signup, error, fieldErrors, loading } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup('owner', formData);
  };

  return (
    <div className="auth-shell">
      <div className="auth-grid" style={{ maxWidth: '800px', margin: '40px auto', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px' }}>
        
        <div className="auth-card">
          <div className="auth-card__row">
            <span className="auth-card__eyebrow">Form ST-2024-REG</span>
          </div>
          <h2>Register your Stay or Desk</h2>
          <p className="auth-card__intro">Register as an owner to post official disruption notices for your property area.</p>
          
          {error && !Object.keys(fieldErrors).length && <div className="form-alert">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Owner / Manager Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} aria-invalid={!!fieldErrors.name} />
              {fieldErrors.name && <div className="field-error">{fieldErrors.name}</div>}
            </div>
            
            <div className="field-row">
              <div className="field">
                <label>Email Address</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} aria-invalid={!!fieldErrors.email} />
                {fieldErrors.email && <div className="field-error">{fieldErrors.email}</div>}
              </div>
              <div className="field">
                <label>Mobile Number</label>
                <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="07X XXX XXXX" aria-invalid={!!fieldErrors.phone} />
                {fieldErrors.phone && <div className="field-error">{fieldErrors.phone}</div>}
                <div className="field__hint">Required for owner verification.</div>
              </div>
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
              {loading ? 'Creating...' : 'Submit Registration'}
            </button>
          </form>
          
          <div className="auth-card__foot">
            <span>Already registered?</span>
            <Link to="/login">Access Desk</Link>
          </div>
        </div>

        <aside className="auth-aside">
          <div className="auth-aside__row">
            <span className="auth-aside__spec">VERIFICATION</span>
          </div>
          <h2>Why register?</h2>
          <p>StaySignal LK is a trusted network. Only verified stay operators can broadcast alerts.</p>
          <ul className="auth-aside__list">
            <li>
              <strong>Post Alerts</strong>
              <span>Broadcast road, water, or power disruptions instantly to travellers.</span>
            </li>
            <li>
              <strong>Update Status</strong>
              <span>Resolve notices when the disruption is clear.</span>
            </li>
          </ul>
        </aside>

      </div>
    </div>
  );
};
