import type { UsageResponse } from './auth.types';

export interface AccountUsageState {
  loading: boolean;
  error: boolean;
  usage: UsageResponse | null;
}
