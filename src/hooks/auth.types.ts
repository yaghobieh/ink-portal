export interface GoogleAuthStartResponse {
  url: string;
  state: string;
  stub: boolean;
}

export interface MeUser {
  id: string;
  email: string;
  name: string;
  plan: string;
  premium: boolean;
  role?: string;
}

export interface MeResponse {
  user: MeUser;
}

export interface UsageResponse {
  tokensUsed: number;
  tokensLimit: number;
  periodStart: string;
  periodEnd: string;
}

export interface UseAuthResult {
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  clearToken: () => void;
}
