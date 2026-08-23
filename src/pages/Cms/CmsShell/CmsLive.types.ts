import type { CmsNotification } from '@sdk/modules/cms';

export type CmsLiveStatus = 'connecting' | 'ok' | 'down';

export type CmsLiveHealth = {
  status: CmsLiveStatus;
  db: boolean;
};

export type CmsPresenceUser = {
  id: string;
  name: string;
};

export type CmsLiveContextValue = {
  health: CmsLiveHealth;
  items: CmsNotification[];
  unread: number;
  onlineUsers: CmsPresenceUser[];
  markRead: (id: string) => void;
  markAllRead: () => void;
};
