import { INK_API_URL } from '@const/billing.const';
import { HTTP_METHOD_PATCH } from '@const/http.const';
import { CONTENT_TYPE_JSON } from '@const/strings.const';
import { useApi } from '@sdk/http';
import {
  AUTH_BEARER_PREFIX,
  AUTH_HEADER_AUTHORIZATION,
} from '@hooks/auth.const';
import type { CmsPlan } from './plans.types';
import { PLANS_PATH } from './plans.const';

export const fetchPlansRequest = async (
  token: string,
): Promise<{ plans: CmsPlan[]; activeUserPlan: string | null }> => {
  const response = await useApi(
    `${INK_API_URL}${PLANS_PATH}`,
    {
      headers: {
        [AUTH_HEADER_AUTHORIZATION]: `${AUTH_BEARER_PREFIX}${token}`,
      },
    },
    { code: 'plans', message: 'Could not load plans.' },
  );
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
  if (!token) return null;
  const response = await useApi(
    `${INK_API_URL}${PLANS_PATH}`,
    {
      method: HTTP_METHOD_PATCH,
      headers: {
        [AUTH_HEADER_AUTHORIZATION]: `${AUTH_BEARER_PREFIX}${token}`,
        'Content-Type': CONTENT_TYPE_JSON,
      },
      body: JSON.stringify({ plan }),
    },
    { code: 'plans', message: 'Could not switch plan.' },
  );
  if (!response.ok) return null;
  const data = (await response.json()) as { activeUserPlan?: string };
  return data.activeUserPlan ?? plan;
};
