import { useState } from 'react';
import { AUTH_TOKEN_STORAGE_KEY } from './auth.const';
import type { UseAuthResult } from './auth.types';

const readToken = (): string | null => {
  try {
    const value = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    if (!value) return null;
    return value;
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

export const useAuth = (): UseAuthResult => {
  const [token, setTokenState] = useState<string | null>(() => readToken());

  const setToken = (value: string) => {
    writeToken(value);
    setTokenState(value);
  };

  const clearToken = () => {
    writeToken(null);
    setTokenState(null);
  };

  return {
    token,
    isAuthenticated: Boolean(token),
    setToken,
    clearToken,
  };
};
