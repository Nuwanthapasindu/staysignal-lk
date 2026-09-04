// auth feature — public surface

export { default as AuthProvider } from './context/AuthProvider';
export { HOME_BY_ROLE } from './context/authContext';

export { useAuth } from './hooks/useAuth';
export { useLogin } from './hooks/useLogin';
export { useSignup } from './hooks/useSignup';
export { useLogout } from './hooks/useLogout';

export { default as RequireAuth } from './guards/RequireAuth';
export { default as RequireRole } from './guards/RequireRole';
export { default as GuestOnly } from './guards/GuestOnly';

export { LoginPage } from './pages/LoginPage';
export { SignupTravellerPage } from './pages/SignupTravellerPage';
export { SignupOwnerPage } from './pages/SignupOwnerPage';
export { UnauthorizedPage } from './pages/UnauthorizedPage';

export { ROLES, ROLE_LABELS, readApiError } from './types';
