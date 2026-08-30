import { INK_API_URL } from '@const/billing.const';
import { HTTP_METHOD_PATCH, HTTP_METHOD_POST } from '@const/http.const';
import { CONTENT_TYPE_JSON } from '@const/strings.const';
import { authHeaders } from '../auth/auth.api';
import { useApi } from '@sdk/http';
import {
  CMS_NOTIFICATION_READ_PATH,
  CMS_NOTIFICATIONS_PATH,
  CMS_TASK_NOTIFY_PATH,
} from './cms.const';

export type CmsNotificationSeverity = 'success' | 'info' | 'warning' | 'error';

export type CmsNotification = {
  id: string;
  title: string;
  body: string;
  href: string;
  severity: CmsNotificationSeverity;
  readAt: string | null;
  createdAt: string;
};

export const fetchNotifications = async (
  token: string,
  range?: { from?: string; to?: string },
): Promise<{ items: CmsNotification[]; unread: number; redis: boolean } | null> => {
  if (!token) return null;
  const params = new URLSearchParams();
  if (range?.from) params.set('from', range.from);
  if (range?.to) params.set('to', range.to);
  const suffix = params.toString() ? `?${params.toString()}` : '';
  const response = await useApi(
    `${INK_API_URL}${CMS_NOTIFICATIONS_PATH}${suffix}`,
    { headers: authHeaders(token) },
    { code: 'notifications', message: 'Could not load notifications.' },
  );
  if (!response.ok) return null;
  return (await response.json()) as { items: CmsNotification[]; unread: number; redis: boolean };
};

export const notifyTaskAgentsRequest = async (
  token: string,
  input: { title: string; body: string; agentIds: string[] },
): Promise<boolean> => {
  if (!token) return false;
  const response = await useApi(
    `${INK_API_URL}${CMS_TASK_NOTIFY_PATH}`,
    {
      method: HTTP_METHOD_POST,
      headers: { ...authHeaders(token), 'Content-Type': CONTENT_TYPE_JSON },
      body: JSON.stringify(input),
    },
    { code: 'notifications', message: 'Could not notify agents.' },
  );
  return response.ok;
};

export const markNotificationReadRequest = async (
  token: string,
  id: string,
): Promise<boolean> => {
  if (!token) return false;
  const response = await useApi(
    `${INK_API_URL}${CMS_NOTIFICATION_READ_PATH}/${id}`,
    {
      method: HTTP_METHOD_PATCH,
      headers: { ...authHeaders(token), 'Content-Type': CONTENT_TYPE_JSON },
      body: JSON.stringify({ read: true }),
    },
    { code: 'notifications', message: 'Could not update notification.' },
  );
  return response.ok;
};
