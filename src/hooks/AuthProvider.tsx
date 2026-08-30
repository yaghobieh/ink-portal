import { createContext, useContext, useEffect, useState, type FC, type ReactNode } from 'react';
import { AUTH_TOKEN_STORAGE_KEY } from './auth.const';
import { fetchMeRequest } from '@sdk/modules/auth/auth.api';
import type { AuthSessionError, MeUser, UseAuthResult } from './auth.types';

const AuthContext = createContext<UseAuthResult | null>(null);

const readToken = (): string | null => {
  try {
    return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
};

const writeToken = (token: string | null) => {
  try {
    if (token) localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
    else localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  } catch {
    return;
  }
};

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(() => readToken());
  const [user, setUser] = useState<MeUser | null>(null);
  const [userLoading, setUserLoading] = useState(Boolean(readToken()));
  const [sessionError, setSessionError] = useState<AuthSessionError | null>(null);
  const [sessionTick, setSessionTick] = useState(0);

  useEffect(() => {
    if (!token) {
      setUser(null);
      setUserLoading(false);
      setSessionError(null);
      return;
    }

    let cancelled = false;
    setUserLoading(true);

    const load = async () => {
      const result = await fetchMeRequest(token);
      if (cancelled) return;
      if (result.user) {
        setUser(result.user);
        setSessionError(null);
        setUserLoading(false);
        return;
      }
      if (result.unauthorized) {
        writeToken(null);
        setTokenState(null);
        setUser(null);
        setSessionError(null);
        setUserLoading(false);
        return;
      }
      setUser(null);
      setSessionError(result.error);
      setUserLoading(false);
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [token, sessionTick]);

  const setToken = (value: string) => {
    writeToken(value);
    setSessionError(null);
    setTokenState(value);
  };

  const clearToken = () => {
    writeToken(null);
    setTokenState(null);
    setUser(null);
    setSessionError(null);
  };

  const setUserFromLogin = (next: MeUser | null) => {
    setUser(next);
    setSessionError(null);
  };

  const retrySession = () => {
    setSessionError(null);
    setSessionTick((current) => current + 1);
  };

  const value: UseAuthResult = {
    token,
    user,
    userLoading,
    isAuthenticated: Boolean(token && user),
    sessionError,
    retrySession,
    setToken,
    clearToken,
    setUserFromLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): UseAuthResult => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
