import type { AccountUsageState } from './useAccountUsage.types';

export const ACCOUNT_USAGE_INITIAL_STATE: AccountUsageState = {
  loading: false,
  error: false,
  usage: null,
};
