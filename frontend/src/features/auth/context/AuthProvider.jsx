import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { setAuthAccessor } from '../../../shared/api/client';
import * as authApi from '../api/auth.api';
import { AuthContext } from './authContext';

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

  // Silent refresh used by the axios interceptor on a 401.
  const refreshSession = useCallback(async () => {
    const { user: u, accessToken } = await authApi.refresh();
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

  // Boot: try to restore a session from the refresh cookie.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { user: u, accessToken } = await authApi.refresh();
        if (cancelled) return;
        setSession(u, accessToken);
        try {
          const fresh = await authApi.me();
          if (!cancelled) setUser(fresh.user);
        } catch {
          /* keep the user from refresh */
        }
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

  const signup = useCallback(
    async (role, body) => {
      const call = role === 'owner' ? authApi.signupOwner : authApi.signupTraveller;
      const { user: u, accessToken } = await call(body);
      setSession(u, accessToken);
      return u;
    },
    [setSession]
  );

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
