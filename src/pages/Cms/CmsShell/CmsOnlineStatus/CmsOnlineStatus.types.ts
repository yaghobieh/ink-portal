import type { CmsPresenceUser } from '../CmsLive.types';

export type CmsOnlineStatusProps = {
  users: CmsPresenceUser[];
  currentUserId: string;
  onOpenUser: (id: string) => void;
};
