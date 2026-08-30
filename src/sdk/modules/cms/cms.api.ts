import { INK_API_URL } from '@const/billing.const';
import { ROUTES } from '@const/index';
import { useApi } from '@sdk/http';
import { authHeaders } from '../auth/auth.api';
import type { CmsDashboardResponse } from './cms.types';
import { CMS_DASHBOARD_PATH } from './cms.const';

export const fetchDashboardRequest = async (
  token: string,
): Promise<CmsDashboardResponse | null> => {
  if (!token) return null;
  const response = await useApi(
    `${INK_API_URL}${CMS_DASHBOARD_PATH}`,
    { headers: authHeaders(token) },
    {
      code: 'live-analytics',
      message: 'Could not load live analytics. Showing empty metrics.',
      href: ROUTES.CMS,
    },
  );
  if (!response.ok) return null;
  try {
    const data = (await response.json()) as CmsDashboardResponse;
    if (!data || typeof data !== 'object' || !data.user) return null;
    return data;
  } catch {
    return null;
  }
};
