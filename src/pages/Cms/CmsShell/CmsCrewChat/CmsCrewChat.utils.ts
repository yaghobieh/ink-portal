import { NUMBER_ONE, NUMBER_ZERO } from '@const/numbers.const';
import { EMPTY_STRING } from '@const/index';
import type { CrewUser } from '../../CrewPages/CrewPages.const';
import type { CmsTask } from '../../TasksPages/TasksPages.types';
import { userDisplayName } from '../../TasksPages/TasksPages.utils';
import type { CmsChatRoom, CmsPresenceUser } from '../CmsLive.types';
import {
  CREW_CHANNEL_SLUG_DASH,
  CREW_CHANNEL_SLUG_KEEP,
  CREW_CHANNEL_SLUG_SPACE,
  CREW_MENTION_AT,
  CREW_TOKEN_SPACE,
} from './CmsCrewChat.const';
import type { CrewChannelRow, CrewMentionPerson } from './CmsCrewChat.types';

export const initialsFromName = (name: string, length: number): string =>
  name.trim().slice(NUMBER_ZERO, length).toUpperCase();

export const roomTitle = (
  room: CmsChatRoom,
  onlineUsers: CmsPresenceUser[],
  currentUserId: string,
  fallback: string,
  people: CrewMentionPerson[] = [],
): string => {
  if (room.tag) return room.tag;
  const names = room.userIds
    .filter((id) => id !== currentUserId)
    .map(
      (id) =>
        people.find((person) => person.id === id)?.name ||
        onlineUsers.find((user) => user.id === id)?.name ||
        id,
    )
    .filter((name) => name.length > 0);
  return names.join(', ') || fallback;
};

export const formatChatTime = (value: string): string => {
  if (!value) return EMPTY_STRING;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return EMPTY_STRING;
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const lastMessagePreview = (room: CmsChatRoom): string => {
  const newest = room.messages[room.messages.length - NUMBER_ONE];
  if (!newest) return EMPTY_STRING;
  return newest.body;
};

export const lastMessageMine = (room: CmsChatRoom, currentUserId: string): boolean => {
  const newest = room.messages[room.messages.length - NUMBER_ONE];
  return Boolean(newest && newest.userId === currentUserId);
};

export const trailingOtherCount = (room: CmsChatRoom, currentUserId: string): number => {
  let count = NUMBER_ZERO;
  for (let index = room.messages.length - NUMBER_ONE; index >= NUMBER_ZERO; index -= NUMBER_ONE) {
    if (room.messages[index]?.userId === currentUserId) break;
    count += NUMBER_ONE;
  }
  return count;
};

export const slugChannelTag = (value: string): string =>
  value.trim().toLowerCase().replace(CREW_CHANNEL_SLUG_SPACE, CREW_CHANNEL_SLUG_DASH).replace(CREW_CHANNEL_SLUG_KEEP, EMPTY_STRING);

export const listedChannels = (rooms: CmsChatRoom[]): CrewChannelRow[] =>
  rooms.filter((item) => item.tag).map((room) => ({ tag: room.tag, room }));

export const directRooms = (rooms: CmsChatRoom[]): CmsChatRoom[] => rooms.filter((room) => !room.tag);

export const matchesJump = (value: string, query: string): boolean => {
  if (!query) return true;
  return value.toLowerCase().includes(query.toLowerCase());
};

export const collectMentionPeople = (
  onlineUsers: CmsPresenceUser[],
  crew: CrewUser[],
  tasks: CmsTask[],
  currentUserId: string,
): CrewMentionPerson[] => {
  const byId = new Map<string, CrewMentionPerson>();
  const onlineIds = new Set(onlineUsers.map((user) => user.id));
  onlineUsers.forEach((user) => {
    if (user.id === currentUserId) return;
    byId.set(user.id, { id: user.id, name: user.name, online: true });
  });
  crew.forEach((user) => {
    if (user.id === currentUserId) return;
    const name = userDisplayName(user);
    const existing = byId.get(user.id);
    if (existing) {
      byId.set(user.id, { ...existing, name: name || existing.name });
      return;
    }
    byId.set(user.id, { id: user.id, name, online: onlineIds.has(user.id) });
  });
  tasks.forEach((task) => {
    task.agentIds.forEach((agentId) => {
      if (!agentId || agentId === currentUserId || byId.has(agentId)) return;
      byId.set(agentId, {
        id: agentId,
        name: agentId,
        online: onlineIds.has(agentId),
      });
    });
  });
  return [...byId.values()];
};

export const peopleWithoutDm = (
  people: CrewMentionPerson[],
  rooms: CmsChatRoom[],
  currentUserId: string,
): CrewMentionPerson[] => {
  const partnerIds = new Set(
    rooms
      .filter((room) => !room.tag)
      .flatMap((room) => room.userIds.filter((id) => id !== currentUserId)),
  );
  return people.filter((person) => !partnerIds.has(person.id));
};

export const peopleNotInRoom = (
  people: CrewMentionPerson[],
  room: CmsChatRoom | null,
): CrewMentionPerson[] => {
  if (!room) return people;
  const memberIds = new Set(room.userIds);
  return people.filter((person) => !memberIds.has(person.id));
};

export const toggleSelectedId = (ids: string[], id: string): string[] =>
  ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];

export const mentionNeedle = (body: string): string | null => {
  const index = body.lastIndexOf(CREW_MENTION_AT);
  if (index < NUMBER_ZERO) return null;
  const rest = body.slice(index + CREW_MENTION_AT.length);
  if (rest.includes(CREW_TOKEN_SPACE)) return null;
  return rest.toLowerCase();
};

export const insertMention = (body: string, name: string): string => {
  const index = body.lastIndexOf(CREW_MENTION_AT);
  if (index < NUMBER_ZERO) {
    return `${body}${CREW_MENTION_AT}${name}${CREW_TOKEN_SPACE}`;
  }
  return `${body.slice(NUMBER_ZERO, index)}${CREW_MENTION_AT}${name}${CREW_TOKEN_SPACE}`;
};

export const partnerOnline = (
  room: CmsChatRoom,
  onlineUsers: CmsPresenceUser[],
  currentUserId: string,
): boolean => {
  if (room.tag) {
    return room.userIds.some((id) => id !== currentUserId && onlineUsers.some((user) => user.id === id));
  }
  return room.userIds
    .filter((id) => id !== currentUserId)
    .some((id) => onlineUsers.some((user) => user.id === id));
};

export const fillName = (template: string, name: string, token: string): string => template.replace(token, name);
