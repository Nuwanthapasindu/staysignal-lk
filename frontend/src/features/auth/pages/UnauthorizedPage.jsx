import React from 'react';
import { Link } from 'react-router-dom';

export const UnauthorizedPage = () => {
  return (
    <div className="narrow-page">
      <h1>Restricted Area</h1>
      <p>This workspace is restricted to registered stay owners and desk operators.</p>
      <div className="narrow-page__actions">
        <Link to="/notices" className="btn btn-primary">Browse Notices</Link>
        <Link to="/login" className="btn btn-secondary">Desk Login</Link>
      </div>
    </div>
  );
};
