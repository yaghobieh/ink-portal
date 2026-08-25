import type { CmsNotification } from '@sdk/modules/cms';
import { NOTIFICATIONS_GROUP_SEP } from './NotificationsPages.const';
import type { NotificationDayGroup } from './NotificationsPages.types';

const dayKey = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const dayLabel = (iso: string, locale: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const today = new Date();
  const sameDay =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();
  const weekday = date.toLocaleDateString(locale, { weekday: 'long' }).toUpperCase();
  const stamp = date.toLocaleDateString(locale, { month: 'short', day: 'numeric' }).toUpperCase();
  return sameDay ? `TODAY${NOTIFICATIONS_GROUP_SEP}${stamp}` : `${weekday}${NOTIFICATIONS_GROUP_SEP}${stamp}`;
};

export const groupNotificationsByDay = (
  items: CmsNotification[],
  locale: string,
): NotificationDayGroup[] => {
  const groups = new Map<string, NotificationDayGroup>();
  items.forEach((item) => {
    const key = dayKey(item.createdAt);
    const current = groups.get(key);
    if (current) {
      current.items.push(item);
      return;
    }
    groups.set(key, {
      key,
      label: dayLabel(item.createdAt, locale),
      items: [item],
    });
  });
  return [...groups.values()];
};
