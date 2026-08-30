import type { CmsNotification } from '@sdk/modules/cms';
import type { CmsTask, TaskBoardConfig } from '../TasksPages/TasksPages.types';

export type CmsLiveStatus = 'connecting' | 'ok' | 'down';

export type CmsLiveHealth = {
  status: CmsLiveStatus;
  db: boolean;
};

export type CmsPresenceUser = {
  id: string;
  name: string;
};

export type CmsChatMessage = {
  id: string;
  userId: string;
  name: string;
  body: string;
  at: string;
};

export type CmsChatRoom = {
  id: string;
  userIds: string[];
  tag: string;
  messages: CmsChatMessage[];
};

export type CmsLiveContextValue = {
  health: CmsLiveHealth;
  items: CmsNotification[];
  unread: number;
  selfId: string;
  onlineUsers: CmsPresenceUser[];
  tasks: CmsTask[] | null;
  board: TaskBoardConfig | null;
  rooms: CmsChatRoom[];
  markRead: (id: string) => void;
  markAllRead: () => void;
  publishTasks: (tasks: CmsTask[], board: TaskBoardConfig) => void;
  createRoom: (userIds: string[], tag?: string) => string;
  sendChat: (roomId: string, body: string) => void;
};
