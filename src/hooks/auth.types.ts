export interface GoogleAuthStartResponse {
  url: string;
  state: string;
  stub: boolean;
}

export interface UseAuthResult {
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  clearToken: () => void;
}
