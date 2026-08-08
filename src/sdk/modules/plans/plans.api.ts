import { INK_API_URL } from '@const/billing.const';
import {
  AUTH_BEARER_PREFIX,
  AUTH_HEADER_AUTHORIZATION,
} from '@hooks/auth.const';
import type { CmsPlan } from './plans.types';

const PLANS_PATH = '/api/cms/plans';

export const fetchPlansRequest = async (
  token: string,
): Promise<{ plans: CmsPlan[]; activeUserPlan: string | null }> => {
  if (!INK_API_URL) throw new Error('missing api url');
  const response = await fetch(`${INK_API_URL}${PLANS_PATH}`, {
    headers: {
      [AUTH_HEADER_AUTHORIZATION]: `${AUTH_BEARER_PREFIX}${token}`,
    },
  });
  if (!response.ok) throw new Error('plans failed');
  const data = (await response.json()) as {
    plans?: CmsPlan[];
    activeUserPlan?: string;
  };
  return {
    plans: data.plans ?? [],
    activeUserPlan: data.activeUserPlan ?? null,
  };
};

export const switchPlanRequest = async (
  token: string,
  plan: string,
): Promise<string | null> => {
  if (!INK_API_URL || !token) return null;
  const response = await fetch(`${INK_API_URL}${PLANS_PATH}`, {
    method: 'PATCH',
    headers: {
      [AUTH_HEADER_AUTHORIZATION]: `${AUTH_BEARER_PREFIX}${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ plan }),
  });
  if (!response.ok) return null;
  const data = (await response.json()) as { activeUserPlan?: string };
  return data.activeUserPlan ?? plan;
};
