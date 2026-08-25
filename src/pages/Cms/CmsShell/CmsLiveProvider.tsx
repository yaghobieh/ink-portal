import { createContext, useContext, useEffect, useState, type FC, type ReactNode } from 'react';
import { INK_API_URL } from '@const/index';
import { useAuth } from '@hooks/index';
import { markNotificationReadRequest, type CmsNotification } from '@sdk/modules/cms';
import { CMS_LIVE_CONNECTING, CMS_LIVE_DOWN, CMS_LIVE_OK, CMS_LIVE_PATH } from './CmsLive.const';
import type { CmsLiveContextValue, CmsLiveHealth, CmsPresenceUser } from './CmsLive.types';

const CmsLiveContext = createContext<CmsLiveContextValue | null>(null);

const toWsUrl = (httpUrl: string, token: string): string => {
  const base = httpUrl.replace(/^http/i, 'ws');
  return `${base}${CMS_LIVE_PATH}?token=${encodeURIComponent(token)}`;
};

export const CmsLiveProvider: FC<{ children: ReactNode }> = (props) => {
  const { token } = useAuth();
  const [health, setHealth] = useState<CmsLiveHealth>({
    status: CMS_LIVE_CONNECTING,
    db: false,
  });
  const [items, setItems] = useState<CmsNotification[]>([]);
  const [unread, setUnread] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState<CmsPresenceUser[]>([]);

  useEffect(() => {
    if (!INK_API_URL || !token) {
      setHealth({ status: CMS_LIVE_DOWN, db: false });
      return undefined;
    }
    setHealth({ status: CMS_LIVE_CONNECTING, db: false });
    const socket = new WebSocket(toWsUrl(INK_API_URL, token));
    socket.onmessage = (event) => {
      try {
        const payload = JSON.parse(String(event.data)) as {
          type?: string;
          db?: boolean;
          items?: CmsNotification[];
          unread?: number;
          item?: CmsNotification;
          users?: CmsPresenceUser[];
        };
        if (payload.type === 'health') {
          setHealth({
            status: payload.db ? CMS_LIVE_OK : CMS_LIVE_DOWN,
            db: Boolean(payload.db),
          });
          return;
        }
        if (payload.type === 'notifications' && Array.isArray(payload.items)) {
          setItems(payload.items);
          setUnread(typeof payload.unread === 'number' ? payload.unread : 0);
          return;
        }
        if (payload.type === 'notification' && payload.item) {
          setItems((current) => [payload.item as CmsNotification, ...current]);
          if (typeof payload.unread === 'number') setUnread(payload.unread);
          return;
        }
        if (payload.type === 'presence' && Array.isArray(payload.users)) {
          setOnlineUsers(payload.users.filter((row) => row && typeof row.id === 'string'));
        }
      } catch {
        return;
      }
    };
    socket.onerror = () => {
      setHealth({ status: CMS_LIVE_DOWN, db: false });
    };
    socket.onclose = () => {
      setHealth((current) =>
        current.status === CMS_LIVE_CONNECTING
          ? { status: CMS_LIVE_DOWN, db: false }
          : current,
      );
    };
    return () => {
      socket.close();
    };
  }, [token]);

  const markRead = (id: string) => {
    if (!token) return;
    void markNotificationReadRequest(token, id);
    setItems((current) =>
      current.map((row) =>
        row.id === id ? { ...row, readAt: new Date().toISOString() } : row,
      ),
    );
    setUnread((current) => Math.max(0, current - 1));
  };

  const markAllRead = () => {
    items
      .filter((row) => !row.readAt)
      .forEach((row) => {
        markRead(row.id);
      });
  };

  return (
    <CmsLiveContext.Provider value={{ health, items, unread, onlineUsers, markRead, markAllRead }}>
      {props.children}
    </CmsLiveContext.Provider>
  );
};

export const useCmsLive = (): CmsLiveContextValue => {
  const context = useContext(CmsLiveContext);
  if (!context) {
    return {
      health: { status: CMS_LIVE_DOWN, db: false },
      items: [],
      unread: 0,
      onlineUsers: [],
      markRead: () => undefined,
      markAllRead: () => undefined,
    };
  }
  return context;
};
