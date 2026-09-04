import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function RequireRole({ role, children }) {
  const { isReady, isAuthenticated, user } = useAuth();
  const location = useLocation();
  const allowed = Array.isArray(role) ? role : [role];

  if (!isReady) return null;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  if (!allowed.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
}
