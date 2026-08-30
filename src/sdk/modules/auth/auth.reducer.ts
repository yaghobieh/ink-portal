import { createNucleus } from '@forgedevstack/synapse';
import { AUTH_TOKEN_STORAGE_KEY } from '@hooks/auth.const';
import { fetchMeRequest, loginRequest, registerRequest } from './auth.api';
import type { AuthRegisterRequest, AuthState } from './auth.types';

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

export const authNucleus = createNucleus<AuthState>((set, get) => ({
  token: readToken(),
  user: null,
  loading: false,
  error: false,

  setToken: (token: string) => {
    writeToken(token);
    set({ token, error: false });
  },

  logout: () => {
    writeToken(null);
    set({ token: null, user: null, loading: false, error: false });
  },

  register: async (input: AuthRegisterRequest) => {
    set({ loading: true, error: false });
    try {
      const result = await registerRequest(input);
      if (!result) {
        set({ loading: false, error: true });
        return false;
      }
      writeToken(result.token);
      set({
        token: result.token,
        user: result.user,
        loading: false,
        error: false,
      });
      return true;
    } catch {
      set({ loading: false, error: true });
      return false;
    }
  },

  login: async (username: string, password: string) => {
    set({ loading: true, error: false });
    try {
      const result = await loginRequest({ username, password });
      if (!result) {
        set({ loading: false, error: true });
        return false;
      }
      writeToken(result.token);
      set({
        token: result.token,
        user: result.user,
        loading: false,
        error: false,
      });
      return true;
    } catch {
      set({ loading: false, error: true });
      return false;
    }
  },

  fetchMe: async () => {
    const token = get().token;
    if (!token) {
      set({ user: null, loading: false });
      return false;
    }
    set({ loading: true, error: false });
    try {
      const result = await fetchMeRequest(token);
      if (result.unauthorized) {
        writeToken(null);
        set({ token: null, user: null, loading: false, error: true });
        return false;
      }
      if (!result.user) {
        set({ loading: false, error: true });
        return false;
      }
      set({ user: result.user, loading: false, error: false });
      return true;
    } catch {
      set({ loading: false, error: true });
      return false;
    }
  },
}));
