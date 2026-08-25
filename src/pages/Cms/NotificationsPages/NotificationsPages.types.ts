import type { NOTIFICATIONS_FILTER } from './NotificationsPages.const';
import type { CmsNotification } from '@sdk/modules/cms';

export type NotificationsFilter =
  (typeof NOTIFICATIONS_FILTER)[keyof typeof NOTIFICATIONS_FILTER];

export type NotificationDayGroup = {
  key: string;
  label: string;
  items: CmsNotification[];
};
