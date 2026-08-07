import type { MeUser, UsageResponse } from '@hooks/auth.types';

export interface LoginPageState {
  loading: boolean;
  error: boolean;
}

export interface LoginStatsState {
  loading: boolean;
  error: boolean;
  user: MeUser | null;
  usage: UsageResponse | null;
}
