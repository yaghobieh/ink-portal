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

export type AuthRegisterRequest = {
  email: string;
  name: string;
  password: string;
  username?: string;
};

export type AuthLoginResponse = {
  token?: string;
  user?: AuthUser;
};

export type AuthMeResponse = {
  user: AuthUser;
};

export type AuthSessionError = {
  url: string;
  status: number;
  reason: string;
  response: string;
};

export type AuthOtpChannel = 'email' | 'phone';

export type AuthPasswordOtpRequest = {
  channel: AuthOtpChannel;
  phone?: string;
};

export type AuthPasswordOtpResponse = {
  sent: boolean;
  channel: AuthOtpChannel;
  destination: string;
};

export type AuthPasswordChangeRequest = {
  otp: string;
  password: string;
};

export type FetchMeResult = {
  user: AuthUser | null;
  unauthorized: boolean;
  error: AuthSessionError | null;
};

export type AuthState = {
  token: string | null;
  user: AuthUser | null;
  loading: boolean;
  error: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (input: AuthRegisterRequest) => Promise<boolean>;
  fetchMe: () => Promise<boolean>;
  setToken: (token: string) => void;
  logout: () => void;
};
