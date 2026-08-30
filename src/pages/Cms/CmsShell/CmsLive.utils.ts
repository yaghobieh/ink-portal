import { EMPTY_STRING, INK_API_URL } from '@const/index';
import {
  CMS_HEALTH_PATH,
  CMS_LIVE_DOWN,
  CMS_LIVE_HTTP_PROTOCOL,
  CMS_LIVE_LOCAL_MSG_PREFIX,
  CMS_LIVE_LOCAL_ROOM_PREFIX,
  CMS_LIVE_OK,
  CMS_LIVE_PATH,
  CMS_LIVE_TOKEN_QUERY,
  CMS_LIVE_WS_PROTOCOL,
} from './CmsLive.const';
import type { CmsChatRoom, CmsLiveHealth } from './CmsLive.types';

export const cmsApiOrigin = (): string => {
  if (INK_API_URL) {
    return INK_API_URL;
  }
  if (typeof window === 'undefined') {
    return EMPTY_STRING;
  }
  return window.location.origin;
};

export const toCmsLiveWsUrl = (token: string): string => {
  const base = cmsApiOrigin().replace(CMS_LIVE_HTTP_PROTOCOL, CMS_LIVE_WS_PROTOCOL);
  const params = new URLSearchParams({ [CMS_LIVE_TOKEN_QUERY]: token });
  return `${base}${CMS_LIVE_PATH}?${params.toString()}`;
};

export const pingCmsHealth = async (): Promise<CmsLiveHealth> => {
  try {
    const response = await fetch(`${cmsApiOrigin()}${CMS_HEALTH_PATH}`);
    if (!response.ok) {
      return { status: CMS_LIVE_DOWN, db: false };
    }
    const data = (await response.json()) as { db?: boolean };
    if (data.db) {
      return { status: CMS_LIVE_OK, db: true };
    }
    return { status: CMS_LIVE_DOWN, db: false };
  } catch {
    return { status: CMS_LIVE_DOWN, db: false };
  }
};

export const sameMembers = (left: string[], right: string[]): boolean => {
  if (left.length !== right.length) return false;
  const seen = new Set(left);
  return right.every((id) => seen.has(id));
};

export const matchRoom = (left: CmsChatRoom, right: CmsChatRoom): boolean => {
  if (left.tag && right.tag) return left.tag === right.tag;
  if (left.tag || right.tag) return false;
  return sameMembers(left.userIds, right.userIds);
};

export const mergeChatRooms = (current: CmsChatRoom[], incoming: CmsChatRoom[]): CmsChatRoom[] => {
  if (incoming.length === 0) return current;
  const locals = current.filter((room) => room.id.startsWith(CMS_LIVE_LOCAL_ROOM_PREFIX));
  const merged = incoming.map((room) => {
    const local = locals.find((item) => matchRoom(item, room));
    const known = current.find((item) => item.id === room.id || matchRoom(item, room));
    const prior = local ?? known;
    if (!prior || prior.messages.length === 0) return room;
    const seen = new Set(room.messages.map((message) => message.id));
    const extra = prior.messages.filter((message) => {
      if (seen.has(message.id)) return false;
      if (!message.id.startsWith(CMS_LIVE_LOCAL_MSG_PREFIX) || room.messages.length === 0) {
        return true;
      }
      return !room.messages.some(
        (item) => item.userId === message.userId && item.body === message.body,
      );
    });
    if (extra.length === 0) return room;
    return { ...room, messages: [...room.messages, ...extra] };
  });
  current.forEach((room) => {
    if (!incoming.some((item) => item.id === room.id || matchRoom(item, room))) {
      merged.push(room);
    }
  });
  return merged;
};

export const findDirectRoom = (
  rooms: CmsChatRoom[],
  currentUserId: string,
  otherId: string,
): CmsChatRoom | undefined =>
  rooms.find(
    (room) =>
      !room.tag &&
      room.userIds.includes(otherId) &&
      (!currentUserId || room.userIds.includes(currentUserId)),
  );

export const findServerMatch = (rooms: CmsChatRoom[], local: CmsChatRoom): CmsChatRoom | undefined =>
  rooms.find(
    (room) => !room.id.startsWith(CMS_LIVE_LOCAL_ROOM_PREFIX) && matchRoom(local, room),
  );
