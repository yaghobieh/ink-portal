import type { ReactNode } from 'react';
import type { CmsChatRoom, CmsPresenceUser } from '../CmsLive.types';
import type { CmsTask } from '../../TasksPages/TasksPages.types';

export type CrewMentionPerson = {
  id: string;
  name: string;
  online: boolean;
};

export type CrewChannelRow = {
  tag: string;
  room: CmsChatRoom | null;
};

export type CmsCrewChatProps = {
  isOpen: boolean;
  onClose: () => void;
  room: CmsChatRoom | null;
  rooms: CmsChatRoom[];
  onlineUsers: CmsPresenceUser[];
  currentUserId: string;
  token: string;
  tasks: CmsTask[];
  onSend: (roomId: string, body: string) => void;
  onOpenUser: (id: string) => void;
  onOpenRoom: (id: string) => void;
  onEnsureChannel: (tag: string, extraIds?: string[]) => string;
  side: 'left' | 'right';
  color: string;
  roomSoundOn: boolean;
  onToggleRoomSound: () => void;
};

export type CrewChatSidebarProps = {
  title: string;
  jumpQuery: string;
  jumpPlaceholder: string;
  channelsLabel: string;
  directLabel: string;
  newRoomLabel: string;
  newRoomOpen: boolean;
  newRoomValue: string;
  hashPrefix: string;
  channels: CrewChannelRow[];
  directRooms: CmsChatRoom[];
  leftoverPeople: CrewMentionPerson[];
  people: CrewMentionPerson[];
  selectedPeopleIds: string[];
  createRoomLabel: string;
  addPeopleLabel: string;
  emptyPeopleLabel: string;
  roomsEmptyLabel: string;
  activeRoomId: string;
  currentUserId: string;
  onlineUsers: CmsPresenceUser[];
  emptyPreview: string;
  onlineLabel: string;
  offlineLabel: string;
  onJump: (value: string) => void;
  onToggleNewRoom: () => void;
  onNewRoomChange: (value: string) => void;
  onTogglePerson: (id: string) => void;
  onCreateRoom: () => void;
  onOpenChannel: (tag: string) => void;
  onOpenRoom: (id: string) => void;
  onOpenUser: (id: string) => void;
  roomTitleFor: (room: CmsChatRoom) => string;
};

export type CrewChatPaneProps = {
  room: CmsChatRoom | null;
  title: string;
  online: boolean;
  currentUserId: string;
  youLabel: string;
  emptyLabel: string;
  connectedLabel: string;
  onlineLabel: string;
  offlineLabel: string;
  searchLabel: string;
  infoLabel: string;
  muteLabel: string;
  unmuteLabel: string;
  roomSoundOn: boolean;
  pickLabel: string;
  addPeopleLabel: string;
  invitePeople: CrewMentionPerson[];
  onInvitePerson: (id: string) => void;
  onToggleRoomSound: () => void;
  children: ReactNode;
};

export type CrewChatComposerProps = {
  body: string;
  placeholder: string;
  sendLabel: string;
  attachLabel: string;
  mentionHint: string;
  emojiLabel: string;
  people: CrewMentionPerson[];
  disabled: boolean;
  onBody: (value: string) => void;
  onSend: () => void;
  onMention: (person: CrewMentionPerson) => void;
};
