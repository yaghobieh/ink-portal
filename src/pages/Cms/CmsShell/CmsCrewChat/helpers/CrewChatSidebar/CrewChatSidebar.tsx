import type { FC } from 'react';
import { Avatar, Badge, BearIcons, Button, Flex, Input, Typography } from '@forgedevstack/bear';
import { NUMBER_ZERO } from '@const/numbers.const';
import { CMS_AVATAR_INITIALS_LENGTH, CMS_ICON_SIZE, CMS_KEY_ENTER } from '../../../CmsShell.const';
import { CREW_JUMP_INPUT_ID, CREW_NEW_ROOM_INPUT_ID } from '../../CmsCrewChat.const';
import type { CrewChatSidebarProps } from '../../CmsCrewChat.types';
import {
  initialsFromName,
  lastMessageMine,
  lastMessagePreview,
  matchesJump,
  trailingOtherCount,
} from '../../CmsCrewChat.utils';

export const CrewChatSidebar: FC<CrewChatSidebarProps> = (props) => {
  const {
    title,
    jumpQuery,
    jumpPlaceholder,
    channelsLabel,
    directLabel,
    newRoomLabel,
    newRoomOpen,
    newRoomValue,
    hashPrefix,
    channels,
    directRooms,
    leftoverPeople,
    people,
    selectedPeopleIds,
    createRoomLabel,
    addPeopleLabel,
    emptyPeopleLabel,
    roomsEmptyLabel,
    activeRoomId,
    currentUserId,
    onlineUsers,
    emptyPreview,
    onlineLabel,
    offlineLabel,
    onJump,
    onToggleNewRoom,
    onNewRoomChange,
    onTogglePerson,
    onCreateRoom,
    onOpenChannel,
    onOpenRoom,
    onOpenUser,
    roomTitleFor,
  } = props;
  const visibleChannels = channels.filter((row) => matchesJump(row.tag, jumpQuery));
  const visibleRooms = directRooms.filter((room) => matchesJump(roomTitleFor(room), jumpQuery));
  const visiblePeople = leftoverPeople.filter((person) => matchesJump(person.name, jumpQuery));

  return (
    <Flex direction="column" gap={2} className="ink-cms-crew__nav">
      <Flex align="center" justify="between" gap={2}>
        <Typography variant="h4" className="mb-0">
          {title}
        </Typography>
        <Button size="sm" variant="ghost" onClick={onToggleNewRoom} aria-label={newRoomLabel}>
          <BearIcons.PlusIcon size={CMS_ICON_SIZE} />
        </Button>
      </Flex>
      {newRoomOpen && (
        <Flex direction="column" gap={2} className="ink-cms-crew__create">
          <Input
            id={CREW_NEW_ROOM_INPUT_ID}
            value={newRoomValue}
            placeholder={newRoomLabel}
            size="sm"
            fullWidth
            onChange={(event) => onNewRoomChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key !== CMS_KEY_ENTER) return;
              event.preventDefault();
              onCreateRoom();
            }}
          />
          <Typography variant="caption" className="ink-cms-crew__section mb-0">
            {addPeopleLabel}
          </Typography>
          {people.length === NUMBER_ZERO ? (
            <Typography variant="caption" className="ink-cms__muted mb-0">
              {emptyPeopleLabel}
            </Typography>
          ) : (
            <Flex wrap="wrap" gap={1}>
              {people.map((person) => {
                const selected = selectedPeopleIds.includes(person.id);
                return (
                  <Button
                    key={person.id}
                    type="button"
                    size="sm"
                    variant={selected ? 'ink' : 'outline'}
                    onClick={() => onTogglePerson(person.id)}
                  >
                    {person.name}
                  </Button>
                );
              })}
            </Flex>
          )}
          <Button
            type="button"
            size="sm"
            variant="ink"
            onClick={onCreateRoom}
            disabled={!newRoomValue.trim()}
          >
            {createRoomLabel}
          </Button>
        </Flex>
      )}
      <Input
        id={CREW_JUMP_INPUT_ID}
        value={jumpQuery}
        placeholder={jumpPlaceholder}
        size="sm"
        fullWidth
        prefix={<BearIcons.SearchIcon size={CMS_ICON_SIZE} />}
        onChange={(event) => onJump(event.target.value)}
      />
      <Typography variant="caption" className="ink-cms-crew__section mb-0">
        {channelsLabel}
      </Typography>
      <Flex direction="column" gap={1}>
        {visibleChannels.map((row) => {
          const unread =
            row.room && row.room.id !== activeRoomId
              ? trailingOtherCount(row.room, currentUserId)
              : NUMBER_ZERO;
          const active = Boolean(row.room && row.room.id === activeRoomId);
          return (
            <button
              key={row.tag}
              type="button"
              className={
                active ? 'ink-cms-crew__item ink-cms-crew__item--active' : 'ink-cms-crew__item'
              }
              onClick={() => onOpenChannel(row.tag)}
            >
              <span>
                {hashPrefix}
                {row.tag}
              </span>
              {unread > NUMBER_ZERO && <Badge variant="info">{unread}</Badge>}
            </button>
          );
        })}
        {visibleChannels.length === NUMBER_ZERO && (
          <Typography variant="caption" className="ink-cms__muted mb-0">
            {roomsEmptyLabel}
          </Typography>
        )}
      </Flex>
      <Typography variant="caption" className="ink-cms-crew__section mb-0">
        {directLabel}
      </Typography>
      <Flex direction="column" gap={1}>
        {visibleRooms.map((room) => {
          const name = roomTitleFor(room);
          const live = room.userIds.some(
            (id) => id !== currentUserId && onlineUsers.some((user) => user.id === id),
          );
          const unread =
            room.id === activeRoomId ? NUMBER_ZERO : trailingOtherCount(room, currentUserId);
          const sent = lastMessageMine(room, currentUserId);
          const active = room.id === activeRoomId;
          return (
            <button
              key={room.id}
              type="button"
              className={
                active
                  ? 'ink-cms-crew__item ink-cms-crew__person ink-cms-crew__item--active'
                  : 'ink-cms-crew__item ink-cms-crew__person'
              }
              onClick={() => onOpenRoom(room.id)}
            >
              <span className="ink-cms-crew__avatar-wrap">
                <Avatar initials={initialsFromName(name, CMS_AVATAR_INITIALS_LENGTH)} size="sm" />
                <span
                  className={live ? 'ink-cms-crew__dot ink-cms-crew__dot--on' : 'ink-cms-crew__dot'}
                />
              </span>
              <span className="ink-cms-crew__person-copy">
                <Typography variant="body2" className="mb-0">
                  {name}
                </Typography>
                <Typography variant="caption" className="ink-cms__muted mb-0">
                  {lastMessagePreview(room) || emptyPreview}
                </Typography>
              </span>
              {sent && <BearIcons.CheckIcon size={CMS_ICON_SIZE} />}
              {unread > NUMBER_ZERO && <Badge variant="info">{unread}</Badge>}
            </button>
          );
        })}
        {visiblePeople.map((person) => (
          <button
            key={person.id}
            type="button"
            className="ink-cms-crew__item ink-cms-crew__person"
            onClick={() => onOpenUser(person.id)}
          >
            <span className="ink-cms-crew__avatar-wrap">
              <Avatar
                initials={initialsFromName(person.name, CMS_AVATAR_INITIALS_LENGTH)}
                size="sm"
              />
              <span
                className={
                  person.online ? 'ink-cms-crew__dot ink-cms-crew__dot--on' : 'ink-cms-crew__dot'
                }
              />
            </span>
            <span className="ink-cms-crew__person-copy">
              <Typography variant="body2" className="mb-0">
                {person.name}
              </Typography>
              <Typography variant="caption" className="ink-cms__muted mb-0">
                {person.online ? onlineLabel : offlineLabel}
              </Typography>
            </span>
          </button>
        ))}
      </Flex>
    </Flex>
  );
};
