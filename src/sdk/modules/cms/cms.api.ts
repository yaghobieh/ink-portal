import { INK_API_URL } from '@const/billing.const';
import { authHeaders } from '../auth/auth.api';
import type { CmsDashboardResponse } from './cms.types';

export const CMS_DASHBOARD_PATH = '/api/cms/dashboard';

export const fetchDashboardRequest = async (
  token: string,
): Promise<CmsDashboardResponse | null> => {
  if (!INK_API_URL || !token) return null;
  const response = await fetch(`${INK_API_URL}${CMS_DASHBOARD_PATH}`, {
    headers: authHeaders(token),
  });
  if (!response.ok) return null;
  return (await response.json()) as CmsDashboardResponse;
};
