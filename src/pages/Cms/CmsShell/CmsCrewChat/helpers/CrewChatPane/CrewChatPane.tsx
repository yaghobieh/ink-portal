import { useLayoutEffect, useRef, type FC } from 'react';
import { Avatar, BearIcons, Button, Flex, Typography } from '@forgedevstack/bear';
import { EMPTY_STRING } from '@const/index';
import { NUMBER_ZERO } from '@const/numbers.const';
import { CMS_AVATAR_INITIALS_LENGTH, CMS_ICON_SIZE } from '../../../CmsShell.const';
import { CREW_SCROLL_STICK_PX } from '../../CmsCrewChat.const';
import type { CrewChatPaneProps } from '../../CmsCrewChat.types';
import { formatChatTime, initialsFromName } from '../../CmsCrewChat.utils';

export const CrewChatPane: FC<CrewChatPaneProps> = (props) => {
  const {
    room,
    title,
    online,
    currentUserId,
    youLabel,
    emptyLabel,
    connectedLabel,
    onlineLabel,
    offlineLabel,
    searchLabel,
    infoLabel,
    muteLabel,
    unmuteLabel,
    roomSoundOn,
    pickLabel,
    addPeopleLabel,
    invitePeople,
    onInvitePerson,
    onToggleRoomSound,
    children,
  } = props;
  const threadRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef(true);
  const roomIdRef = useRef(room?.id);

  useLayoutEffect(() => {
    const thread = threadRef.current;
    if (!thread) return undefined;
    const onScroll = () => {
      const distance = thread.scrollHeight - thread.scrollTop - thread.clientHeight;
      stickRef.current = distance <= CREW_SCROLL_STICK_PX;
    };
    thread.addEventListener('scroll', onScroll, { passive: true });
    return () => thread.removeEventListener('scroll', onScroll);
  }, [room?.id]);

  useLayoutEffect(() => {
    const thread = threadRef.current;
    if (!thread) return;
    const roomChanged = roomIdRef.current !== room?.id;
    roomIdRef.current = room?.id;
    if (!roomChanged && !stickRef.current) return;
    thread.scrollTop = thread.scrollHeight;
    stickRef.current = true;
  }, [room?.id, room?.messages.length]);

  if (!room) {
    return (
      <Flex direction="column" className="ink-cms-crew__pane">
        <Flex align="center" justify="center" className="ink-cms-crew__empty">
          <Typography variant="body2" className="ink-cms__muted mb-0">
            {pickLabel}
          </Typography>
        </Flex>
      </Flex>
    );
  }

  const messages = room.messages ?? [];

  return (
    <Flex direction="column" className="ink-cms-crew__pane">
      <Flex align="center" justify="between" gap={2} className="ink-cms-crew__pane-head">
        <Flex direction="column" gap={1}>
          <Typography variant="h4" className="mb-0">
            {title}
          </Typography>
          <Typography variant="caption" className="ink-cms__muted mb-0">
            {online ? onlineLabel : offlineLabel}
          </Typography>
        </Flex>
        <Flex align="center" gap={1}>
          <Button size="sm" variant="ghost" aria-label={searchLabel}>
            <BearIcons.SearchIcon size={CMS_ICON_SIZE} />
          </Button>
          <Button size="sm" variant="ghost" aria-label={infoLabel}>
            <BearIcons.InfoIcon size={CMS_ICON_SIZE} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onToggleRoomSound}
            aria-label={roomSoundOn ? muteLabel : unmuteLabel}
          >
            {roomSoundOn ? (
              <BearIcons.VolumeHighIcon size={CMS_ICON_SIZE} />
            ) : (
              <BearIcons.VolumeOffIcon size={CMS_ICON_SIZE} />
            )}
          </Button>
        </Flex>
      </Flex>
      {room.tag && invitePeople.length > NUMBER_ZERO && (
        <Flex wrap="wrap" align="center" gap={1} className="ink-cms-crew__invites">
          <Typography variant="caption" className="ink-cms__muted mb-0">
            {addPeopleLabel}
          </Typography>
          {invitePeople.map((person) => (
            <Button
              key={person.id}
              type="button"
              size="sm"
              variant="outline"
              onClick={() => onInvitePerson(person.id)}
            >
              {person.name}
            </Button>
          ))}
        </Flex>
      )}
      <div ref={threadRef} className="ink-cms-crew__thread">
        <Typography variant="caption" className="ink-cms-crew__system mb-0">
          {connectedLabel}
        </Typography>
        {messages.length === NUMBER_ZERO && (
          <Typography variant="caption" className="ink-cms__muted mb-0">
            {emptyLabel}
          </Typography>
        )}
        {messages.map((message) => {
          const mine = message.userId === currentUserId;
          const stamp = formatChatTime(message.at);
          return (
            <div
              key={message.id}
              className={mine ? 'ink-cms-crew__row ink-cms-crew__row--mine' : 'ink-cms-crew__row'}
            >
              {!mine && (
                <Avatar
                  initials={initialsFromName(message.name, CMS_AVATAR_INITIALS_LENGTH)}
                  size="sm"
                />
              )}
              <div
                className={
                  mine ? 'ink-cms-crew__bubble ink-cms-crew__bubble--mine' : 'ink-cms-crew__bubble'
                }
              >
                <Typography variant="caption" className="mb-0">
                  {mine ? youLabel : message.name}
                  {stamp ? ` · ${stamp}` : EMPTY_STRING}
                </Typography>
                <Typography variant="body2" className="mb-0">
                  {message.body}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>
      {children}
    </Flex>
  );
};
