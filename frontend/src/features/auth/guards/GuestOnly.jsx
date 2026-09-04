import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { HOME_BY_ROLE } from '../context/authContext';

export default function GuestOnly({ children }) {
  const { isReady, isAuthenticated, user } = useAuth();

  if (!isReady) return null;
  if (isAuthenticated) {
    return <Navigate to={HOME_BY_ROLE[user.role] || '/'} replace />;
  }
  return children;
}
