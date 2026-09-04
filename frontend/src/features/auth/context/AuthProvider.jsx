import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { setAuthAccessor } from '../../../shared/api/client';
import * as authApi from '../api/auth.api';
import { AuthContext } from './authContext';

// Module-level single-flight: React StrictMode double-invokes effects in dev, and
// the axios interceptor can also ask for a refresh — all of them must share ONE
// network call so the refresh token is rotated exactly once.
let pendingRefresh = null;
const runRefresh = () => {
  if (!pendingRefresh) {
    pendingRefresh = authApi.refresh().finally(() => {
      pendingRefresh = null;
    });
  }
  return pendingRefresh;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const tokenRef = useRef(null);

  const setSession = useCallback((nextUser, accessToken) => {
    tokenRef.current = accessToken ?? null;
    setUser(nextUser ?? null);
  }, []);

  const clearSession = useCallback(() => {
    tokenRef.current = null;
    setUser(null);
  }, []);

  // Used by the axios interceptor on a 401.
  const refreshSession = useCallback(async () => {
    const { user: u, accessToken } = await runRefresh();
    setSession(u, accessToken);
    return accessToken;
  }, [setSession]);

  useEffect(() => {
    setAuthAccessor({
      getToken: () => tokenRef.current,
      refresh: refreshSession,
      onLogout: clearSession,
    });
  }, [refreshSession, clearSession]);

  // Boot: restore a session from the refresh cookie (if any).
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { user: u, accessToken } = await runRefresh();
        if (!cancelled) setSession(u, accessToken);
      } catch {
        if (!cancelled) clearSession();
      } finally {
        if (!cancelled) setIsReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [setSession, clearSession]);

  const login = useCallback(
    async (credentials) => {
      const { user: u, accessToken } = await authApi.login(credentials);
      setSession(u, accessToken);
      return u;
    },
    [setSession]
  );

  // Signup creates the account only — no session. The caller redirects to /login.
  const signup = useCallback(async (role, body) => {
    const call = role === 'owner' ? authApi.signupOwner : authApi.signupTraveller;
    const { user: u } = await call(body);
    return u;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      clearSession();
    }
  }, [clearSession]);

  const value = useMemo(
    () => ({ user, isReady, isAuthenticated: !!user, login, signup, logout }),
    [user, isReady, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
