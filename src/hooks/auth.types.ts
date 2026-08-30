export interface GoogleAuthStartResponse {
  url: string;
  state: string;
  stub: boolean;
}

export interface MeUser {
  id: string;
  email: string;
  name: string;
  username?: string | null;
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

export interface CmsDashboardResponse {
  user: MeUser;
  usage: UsageResponse;
  pages: {
    total: number;
    published: number;
    draft: number;
  };
  host: {
    apiBase: string;
    cmsPublicUrl: string;
  };
}

export interface CmsPage {
  id: string;
  slug: string;
  title: string;
  bodyHtml: string;
  status: string;
  mediaUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSessionError {
  url: string;
  status: number;
  reason: string;
  response: string;
}

export interface UseAuthResult {
  token: string | null;
  user: MeUser | null;
  userLoading: boolean;
  isAuthenticated: boolean;
  sessionError: AuthSessionError | null;
  retrySession: () => void;
  setToken: (token: string) => void;
  clearToken: () => void;
  setUserFromLogin: (user: MeUser | null) => void;
}
