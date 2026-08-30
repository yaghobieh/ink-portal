import { createContext, useContext, useEffect, useRef, useState, type FC, type ReactNode } from 'react';
import { NUMBER_TWO } from '@const/numbers.const';
import { EMPTY_STRING } from '@const/index';
import { useAuth } from '@hooks/index';
import { markNotificationReadRequest, type CmsNotification } from '@sdk/modules/cms';
import type { CmsTask, TaskBoardConfig } from '../TasksPages/TasksPages.types';
import {
  CMS_LIVE_CONNECTING,
  CMS_LIVE_DOWN,
  CMS_LIVE_OK,
  CMS_LIVE_PING_MS,
  CMS_LIVE_RECONNECT_MAX_MS,
  CMS_LIVE_RECONNECT_MS,
  CMS_LIVE_TYPE_CHAT_MESSAGE,
  CMS_LIVE_TYPE_CHAT_ROOM,
  CMS_LIVE_TYPE_CHAT_ROOMS,
  CMS_LIVE_TYPE_HEALTH,
  CMS_LIVE_TYPE_NOTIFICATION,
  CMS_LIVE_TYPE_NOTIFICATIONS,
  CMS_LIVE_TYPE_PRESENCE,
  CMS_LIVE_TYPE_PRESENCE_PING,
  CMS_LIVE_TYPE_TASKS,
  CMS_LIVE_TYPE_TASKS_UPDATE,
  CMS_LIVE_LOCAL_ROOM_PREFIX,
  CMS_LIVE_LOCAL_MSG_PREFIX,
} from './CmsLive.const';
import type {
  CmsChatRoom,
  CmsLiveContextValue,
  CmsLiveHealth,
  CmsPresenceUser,
} from './CmsLive.types';
import { mergeChatRooms, pingCmsHealth, sameMembers, toCmsLiveWsUrl } from './CmsLive.utils';

const CmsLiveContext = createContext<CmsLiveContextValue | null>(null);

const idleLive = (): CmsLiveContextValue => ({
  health: { status: CMS_LIVE_DOWN, db: false },
  items: [],
  unread: 0,
  selfId: EMPTY_STRING,
  onlineUsers: [],
  tasks: null,
  board: null,
  rooms: [],
  markRead: () => undefined,
  markAllRead: () => undefined,
  publishTasks: () => undefined,
  createRoom: () => EMPTY_STRING,
  sendChat: () => undefined,
});

export const CmsLiveProvider: FC<{ children: ReactNode }> = (props) => {
  const { token, user } = useAuth();
  const socketRef = useRef<WebSocket | null>(null);
  const [health, setHealth] = useState<CmsLiveHealth>({
    status: CMS_LIVE_CONNECTING,
    db: false,
  });
  const [items, setItems] = useState<CmsNotification[]>([]);
  const [unread, setUnread] = useState(0);
  const [selfId, setSelfId] = useState(EMPTY_STRING);
  const [onlineUsers, setOnlineUsers] = useState<CmsPresenceUser[]>([]);
  const [tasks, setTasks] = useState<CmsTask[] | null>(null);
  const [board, setBoard] = useState<TaskBoardConfig | null>(null);
  const [rooms, setRooms] = useState<CmsChatRoom[]>([]);
  const roomsRef = useRef<CmsChatRoom[]>([]);
  roomsRef.current = rooms;

  useEffect(() => {
    if (!token) {
      setHealth({ status: CMS_LIVE_DOWN, db: false });
      setOnlineUsers([]);
      setSelfId(EMPTY_STRING);
      return undefined;
    }
    let stopped = false;
    const applyHealth = (next: CmsLiveHealth) => {
      if (stopped) {
        return;
      }
      setHealth(next);
    };
    const poll = () => {
      void pingCmsHealth().then(applyHealth);
    };
    poll();
    const timer = window.setInterval(poll, CMS_LIVE_PING_MS);
    return () => {
      stopped = true;
      window.clearInterval(timer);
    };
  }, [token]);

  useEffect(() => {
    if (!token) {
      setOnlineUsers([]);
      setSelfId(EMPTY_STRING);
      return undefined;
    }
    let stopped = false;
    let socket: WebSocket | null = null;
    let pingTimer: number | null = null;
    let retryTimer: number | null = null;
    let delay = CMS_LIVE_RECONNECT_MS;

    const clearPing = () => {
      if (pingTimer !== null) {
        window.clearInterval(pingTimer);
        pingTimer = null;
      }
    };

    const applyMessage = (event: MessageEvent<string>) => {
      try {
        const payload = JSON.parse(String(event.data)) as {
          type?: string;
          db?: boolean;
          items?: CmsNotification[];
          unread?: number;
          item?: CmsNotification;
          users?: CmsPresenceUser[];
          selfId?: string;
          tasks?: CmsTask[];
          board?: TaskBoardConfig | null;
          rooms?: CmsChatRoom[];
        };
        if (payload.type === CMS_LIVE_TYPE_HEALTH) {
          setHealth({
            status: payload.db ? CMS_LIVE_OK : CMS_LIVE_DOWN,
            db: Boolean(payload.db),
          });
          return;
        }
        if (payload.type === CMS_LIVE_TYPE_NOTIFICATIONS && Array.isArray(payload.items)) {
          setItems(payload.items);
          setUnread(typeof payload.unread === 'number' ? payload.unread : 0);
          return;
        }
        if (payload.type === CMS_LIVE_TYPE_NOTIFICATION && payload.item) {
          setItems((current) => [payload.item as CmsNotification, ...current]);
          if (typeof payload.unread === 'number') setUnread(payload.unread);
          return;
        }
        if (payload.type === CMS_LIVE_TYPE_PRESENCE && Array.isArray(payload.users)) {
          setOnlineUsers(payload.users.filter((row) => row && typeof row.id === 'string'));
          if (typeof payload.selfId === 'string') setSelfId(payload.selfId);
          return;
        }
        if (payload.type === CMS_LIVE_TYPE_TASKS) {
          if (Array.isArray(payload.tasks)) setTasks(payload.tasks);
          if (payload.board) setBoard(payload.board);
          return;
        }
        if (payload.type === CMS_LIVE_TYPE_CHAT_ROOMS && Array.isArray(payload.rooms)) {
          setRooms((current) => mergeChatRooms(current, payload.rooms as CmsChatRoom[]));
        }
      } catch {
        return;
      }
    };

    const connect = () => {
      if (stopped) return;
      const next = new WebSocket(toCmsLiveWsUrl(token));
      socket = next;
      socketRef.current = next;
      next.onmessage = applyMessage;
      next.onopen = () => {
        delay = CMS_LIVE_RECONNECT_MS;
        clearPing();
        if (next.readyState === WebSocket.OPEN) {
          next.send(JSON.stringify({ type: CMS_LIVE_TYPE_PRESENCE_PING }));
        }
        pingTimer = window.setInterval(() => {
          if (next.readyState === WebSocket.OPEN) {
            next.send(JSON.stringify({ type: CMS_LIVE_TYPE_PRESENCE_PING }));
          }
        }, CMS_LIVE_PING_MS);
      };
      next.onerror = () => undefined;
      next.onclose = () => {
        clearPing();
        if (socketRef.current === next) socketRef.current = null;
        if (stopped) return;
        retryTimer = window.setTimeout(() => {
          delay = Math.min(delay * NUMBER_TWO, CMS_LIVE_RECONNECT_MAX_MS);
          connect();
        }, delay);
      };
    };

    connect();
    return () => {
      stopped = true;
      clearPing();
      if (retryTimer !== null) window.clearTimeout(retryTimer);
      socket?.close();
      setOnlineUsers([]);
      setSelfId(EMPTY_STRING);
    };
  }, [token]);

  const sendJson = (payload: unknown) => {
    const socket = socketRef.current;
    if (!socket || socket.readyState !== WebSocket.OPEN) return;
    socket.send(JSON.stringify(payload));
  };

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

  const publishTasks = (nextTasks: CmsTask[], nextBoard: TaskBoardConfig) => {
    setTasks(nextTasks);
    setBoard(nextBoard);
    sendJson({ type: CMS_LIVE_TYPE_TASKS_UPDATE, tasks: nextTasks, board: nextBoard });
  };

  const createRoom = (userIds: string[], tag?: string): string => {
    const unique = [...new Set(userIds.filter((id) => id.length > 0))];
    const channel = tag ?? EMPTY_STRING;
    const current = roomsRef.current;
    const existing = channel
      ? current.find((room) => room.tag === channel)
      : current.find((room) => !room.tag && sameMembers(room.userIds, unique));
    if (existing) {
      const merged = [...new Set([...existing.userIds, ...unique])];
      if (merged.length !== existing.userIds.length) {
        const next = { ...existing, userIds: merged };
        roomsRef.current = current.map((room) => (room.id === existing.id ? next : room));
        setRooms((roomsNow) => roomsNow.map((room) => (room.id === existing.id ? next : room)));
      }
      sendJson({ type: CMS_LIVE_TYPE_CHAT_ROOM, userIds: merged, tag: channel });
      return existing.id;
    }
    const nextId = `${CMS_LIVE_LOCAL_ROOM_PREFIX}${Date.now()}`;
    const nextRoom: CmsChatRoom = {
      id: nextId,
      userIds: unique,
      tag: channel,
      messages: [],
    };
    roomsRef.current = [...current, nextRoom];
    setRooms((roomsNow) => {
      if (channel && roomsNow.some((room) => room.tag === channel)) return roomsNow;
      if (!channel && roomsNow.some((room) => !room.tag && sameMembers(room.userIds, unique))) {
        return roomsNow;
      }
      return [...roomsNow, nextRoom];
    });
    sendJson({ type: CMS_LIVE_TYPE_CHAT_ROOM, userIds: unique, tag: channel });
    return nextId;
  };

  const sendChat = (roomId: string, body: string) => {
    const room = rooms.find((item) => item.id === roomId) ?? roomsRef.current.find((item) => item.id === roomId);
    const local = roomId.startsWith(CMS_LIVE_LOCAL_ROOM_PREFIX);
    sendJson({
      type: CMS_LIVE_TYPE_CHAT_MESSAGE,
      roomId: local ? EMPTY_STRING : roomId,
      userIds: room?.userIds ?? [],
      tag: room?.tag ?? EMPTY_STRING,
      body,
    });
    const userId = selfId || user?.id || EMPTY_STRING;
    const name = user?.name || user?.username || EMPTY_STRING;
    const message = {
      id: `${CMS_LIVE_LOCAL_MSG_PREFIX}${Date.now()}`,
      userId,
      name,
      body,
      at: new Date().toISOString(),
    };
    setRooms((current) =>
      current.map((item) =>
        item.id === roomId ? { ...item, messages: [...item.messages, message] } : item,
      ),
    );
  };

  return (
    <CmsLiveContext.Provider
      value={{
        health,
        items,
        unread,
        selfId,
        onlineUsers,
        tasks,
        board,
        rooms,
        markRead,
        markAllRead,
        publishTasks,
        createRoom,
        sendChat,
      }}
    >
      {props.children}
    </CmsLiveContext.Provider>
  );
};

export const useCmsLive = (): CmsLiveContextValue => {
  const context = useContext(CmsLiveContext);
  if (!context) {
    return idleLive();
  }
  return context;
};
