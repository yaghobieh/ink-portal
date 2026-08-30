import { useEffect, useState, type FC } from 'react';
import { BearIcons, Button, Card, Flex } from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { CMS_CHAT_SIDE_LEFT, EMPTY_STRING, HASH_PREFIX } from '@const/index';
import { fetchCrewUsers } from '@sdk/modules/cms';
import type { CrewUser } from '@pages/Cms/CrewPages/CrewPages.const';
import { loadTasks } from '@pages/Cms/TasksPages/TasksPages.utils';
import { CMS_ICON_SIZE } from '@pages/Cms/CmsShell/CmsShell.const';
import type { CmsCrewChatProps } from './CmsCrewChat.types';
import {
  CREW_BLOB_CLASS,
  CREW_BLOB_CLOSE_CLASS,
  CREW_BLOB_LEFT_CLASS,
  CREW_NAME_TOKEN,
  CREW_PANEL_CLASS,
} from './CmsCrewChat.const';
import {
  collectMentionPeople,
  directRooms,
  fillName,
  insertMention,
  listedChannels,
  partnerOnline,
  peopleNotInRoom,
  peopleWithoutDm,
  roomTitle,
  slugChannelTag,
  toggleSelectedId,
} from './CmsCrewChat.utils';
import { CrewChatComposer } from './helpers/CrewChatComposer';
import { CrewChatPane } from './helpers/CrewChatPane';
import { CrewChatSidebar } from './helpers/CrewChatSidebar';

export const CmsCrewChat: FC<CmsCrewChatProps> = (props) => {
  const {
    isOpen,
    onClose,
    room,
    rooms,
    onlineUsers,
    currentUserId,
    token,
    tasks,
    onSend,
    onOpenUser,
    onOpenRoom,
    onEnsureChannel,
    side,
    color,
    roomSoundOn,
    onToggleRoomSound,
  } = props;
  const { t } = useI18n();
  const [body, setBody] = useState(EMPTY_STRING);
  const [jumpQuery, setJumpQuery] = useState(EMPTY_STRING);
  const [newRoomOpen, setNewRoomOpen] = useState(false);
  const [newRoomValue, setNewRoomValue] = useState(EMPTY_STRING);
  const [newMemberIds, setNewMemberIds] = useState<string[]>([]);
  const [crew, setCrew] = useState<CrewUser[]>([]);
  const mentionTasks = tasks.length > 0 ? tasks : loadTasks();
  const people = collectMentionPeople(onlineUsers, crew, mentionTasks, currentUserId);
  const title = room
    ? roomTitle(room, onlineUsers, currentUserId, t.cmsShell.crewChat, people)
    : t.cmsShell.crewChat;
  const blobClass = side === CMS_CHAT_SIDE_LEFT ? CREW_BLOB_LEFT_CLASS : CREW_BLOB_CLASS;

  useEffect(() => {
    if (!isOpen || !token) return undefined;
    let active = true;
    void fetchCrewUsers(token).then((users) => {
      if (active && users) setCrew(users);
    });
    return () => {
      active = false;
    };
  }, [isOpen, token]);

  if (!isOpen) return null;

  const onCreateNamedRoom = () => {
    const tag = slugChannelTag(newRoomValue);
    if (!tag) return;
    onOpenRoom(onEnsureChannel(tag, newMemberIds));
    setNewRoomValue(EMPTY_STRING);
    setNewMemberIds([]);
    setNewRoomOpen(false);
  };

  const sendBody = () => {
    if (!room || !body.trim()) return;
    onSend(room.id, body.trim());
    setBody(EMPTY_STRING);
  };

  return (
    <Card className={blobClass} padding="none">
      <Button
        type="button"
        size="sm"
        variant="ghost"
        className={CREW_BLOB_CLOSE_CLASS}
        onClick={onClose}
        aria-label={t.cmsShell.crewClose}
      >
        <BearIcons.XIcon size={CMS_ICON_SIZE} />
      </Button>
      <Flex
        direction="row"
        className={CREW_PANEL_CLASS}
        style={{ ['--ink-cms-chat-color' as string]: color }}
      >
        <CrewChatSidebar
          title={t.cmsShell.crewChat}
          jumpQuery={jumpQuery}
          jumpPlaceholder={t.cmsShell.jumpTo}
          channelsLabel={t.cmsShell.channels}
          directLabel={t.cmsShell.directMessages}
          newRoomLabel={t.cmsShell.newRoom}
          newRoomOpen={newRoomOpen}
          newRoomValue={newRoomValue}
          hashPrefix={HASH_PREFIX}
          channels={listedChannels(rooms)}
          directRooms={directRooms(rooms)}
          leftoverPeople={peopleWithoutDm(people, rooms, currentUserId)}
          people={people}
          selectedPeopleIds={newMemberIds}
          createRoomLabel={t.cmsShell.createRoomAction}
          addPeopleLabel={t.cmsShell.addPeople}
          emptyPeopleLabel={t.cmsShell.noPeopleToAdd}
          roomsEmptyLabel={t.cmsShell.roomsEmpty}
          activeRoomId={room?.id ?? EMPTY_STRING}
          currentUserId={currentUserId}
          onlineUsers={onlineUsers}
          emptyPreview={t.cmsShell.crewEmpty}
          onlineLabel={t.cmsShell.online}
          offlineLabel={t.cmsShell.offline}
          onJump={setJumpQuery}
          onToggleNewRoom={() => {
            setNewRoomOpen((open) => !open);
            setNewMemberIds([]);
          }}
          onNewRoomChange={setNewRoomValue}
          onTogglePerson={(id) => setNewMemberIds((current) => toggleSelectedId(current, id))}
          onCreateRoom={onCreateNamedRoom}
          onOpenChannel={(tag) => onOpenRoom(onEnsureChannel(tag))}
          onOpenRoom={onOpenRoom}
          onOpenUser={onOpenUser}
          roomTitleFor={(item) =>
            roomTitle(item, onlineUsers, currentUserId, t.cmsShell.crewChat, people)
          }
        />
        <CrewChatPane
          room={room}
          title={title}
          online={room ? partnerOnline(room, onlineUsers, currentUserId) : false}
          currentUserId={currentUserId}
          youLabel={t.cmsShell.chatYou}
          emptyLabel={t.cmsShell.crewEmpty}
          connectedLabel={fillName(t.cmsShell.connectedViaCrew, title, CREW_NAME_TOKEN)}
          onlineLabel={t.cmsShell.online}
          offlineLabel={t.cmsShell.offline}
          searchLabel={t.cmsShell.roomSearch}
          infoLabel={t.cmsShell.roomInfo}
          muteLabel={t.cmsShell.muteRoom}
          unmuteLabel={t.cmsShell.unmuteRoom}
          roomSoundOn={roomSoundOn}
          pickLabel={t.cmsShell.noConversation}
          addPeopleLabel={t.cmsShell.addToRoom}
          invitePeople={peopleNotInRoom(people, room)}
          onInvitePerson={(id) => {
            if (!room?.tag) return;
            onEnsureChannel(room.tag, [id]);
          }}
          onToggleRoomSound={onToggleRoomSound}
        >
          <CrewChatComposer
            body={body}
            placeholder={
              room
                ? fillName(t.cmsShell.messagePerson, title, CREW_NAME_TOKEN)
                : t.cmsShell.crewPlaceholder
            }
            sendLabel={t.cmsShell.chatSend}
            attachLabel={t.cmsShell.crewAttach}
            mentionHint={t.cmsShell.mentionHint}
            emojiLabel={t.cmsShell.emoji}
            people={people}
            disabled={!room || !body.trim()}
            onBody={setBody}
            onSend={sendBody}
            onMention={(person) => setBody(insertMention(body, person.name))}
          />
        </CrewChatPane>
      </Flex>
    </Card>
  );
};
