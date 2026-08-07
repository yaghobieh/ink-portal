import { useEffect, useState } from 'react';
import { INK_API_URL } from '@const/index';
import {
  AUTH_BEARER_PREFIX,
  AUTH_HEADER_AUTHORIZATION,
  AUTH_USAGE_PATH,
} from './auth.const';
import type { UsageResponse } from './auth.types';
import { useAuth } from './useAuth';
import type { AccountUsageState } from './useAccountUsage.types';
import { ACCOUNT_USAGE_INITIAL_STATE } from './useAccountUsage.const';

export const useAccountUsage = (): AccountUsageState => {
  const { token, isAuthenticated } = useAuth();
  const [state, setState] = useState<AccountUsageState>(ACCOUNT_USAGE_INITIAL_STATE);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      setState(ACCOUNT_USAGE_INITIAL_STATE);
      return;
    }

    let cancelled = false;

    const loadUsage = async () => {
      setState({ ...ACCOUNT_USAGE_INITIAL_STATE, loading: true });
      if (!INK_API_URL) {
        if (!cancelled) {
          setState({ ...ACCOUNT_USAGE_INITIAL_STATE, error: true });
        }
        return;
      }

      try {
        const response = await fetch(`${INK_API_URL}${AUTH_USAGE_PATH}`, {
          headers: {
            [AUTH_HEADER_AUTHORIZATION]: `${AUTH_BEARER_PREFIX}${token}`,
          },
        });

        if (!response.ok) {
          if (!cancelled) {
            setState({ ...ACCOUNT_USAGE_INITIAL_STATE, error: true });
          }
          return;
        }

        const usage = (await response.json()) as UsageResponse;
        if (!cancelled) {
          setState({
            loading: false,
            error: false,
            usage,
          });
        }
      } catch {
        if (!cancelled) {
          setState({ ...ACCOUNT_USAGE_INITIAL_STATE, error: true });
        }
      }
    };

    void loadUsage();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, token]);

  return state;
};
