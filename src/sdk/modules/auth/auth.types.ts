export type AuthUser = {
  id: string;
  email: string;
  name: string;
  username?: string | null;
  plan: string;
  premium: boolean;
  role?: string;
};

export type AuthLoginRequest = {
  username: string;
  password: string;
};

export type AuthLoginResponse = {
  token?: string;
  user?: AuthUser;
};

export type AuthMeResponse = {
  user: AuthUser;
};

export type AuthState = {
  token: string | null;
  user: AuthUser | null;
  loading: boolean;
  error: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  fetchMe: () => Promise<boolean>;
  setToken: (token: string) => void;
  logout: () => void;
};
