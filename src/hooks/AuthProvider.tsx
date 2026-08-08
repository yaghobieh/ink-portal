import { createContext, useContext, useEffect, useState, type FC, type ReactNode } from 'react';
import { INK_API_URL } from '@const/index';
import {
  AUTH_BEARER_PREFIX,
  AUTH_HEADER_AUTHORIZATION,
  AUTH_ME_PATH,
  AUTH_TOKEN_STORAGE_KEY,
} from './auth.const';
import type { MeResponse, MeUser, UseAuthResult } from './auth.types';

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

  useEffect(() => {
    if (!token) {
      setUser(null);
      setUserLoading(false);
      return;
    }
    if (!INK_API_URL) {
      setUser(null);
      setUserLoading(false);
      return;
    }

    let cancelled = false;
    setUserLoading(true);

    const load = async () => {
      try {
        const response = await fetch(`${INK_API_URL}${AUTH_ME_PATH}`, {
          headers: {
            [AUTH_HEADER_AUTHORIZATION]: `${AUTH_BEARER_PREFIX}${token}`,
          },
        });
        if (!response.ok) {
          if (!cancelled) {
            writeToken(null);
            setTokenState(null);
            setUser(null);
            setUserLoading(false);
          }
          return;
        }
        const data = (await response.json()) as MeResponse;
        if (!cancelled) {
          setUser(data.user ?? null);
          setUserLoading(false);
        }
      } catch {
        if (!cancelled) {
          setUser(null);
          setUserLoading(false);
        }
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const setToken = (value: string) => {
    writeToken(value);
    setTokenState(value);
  };

  const clearToken = () => {
    writeToken(null);
    setTokenState(null);
    setUser(null);
  };

  const setUserFromLogin = (next: MeUser | null) => {
    setUser(next);
  };

  const value: UseAuthResult = {
    token,
    user,
    userLoading,
    isAuthenticated: Boolean(token),
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
