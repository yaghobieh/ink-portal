import { useState, type FC } from 'react';
import { Avatar, Button, Flex, Input, Typography } from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { EMPTY_STRING } from '@const/index';
import { CMS_AVATAR_INITIALS_LENGTH } from '../CmsShell.const';
import type { CmsPresenceUser } from '../CmsLive.types';
import { CREW_CHAT_TAG_ID } from './CmsCrewChat.const';

export type CmsOnlineRosterProps = {
  users: CmsPresenceUser[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onOpenUser: (id: string) => void;
  onCreateRoom: (tag: string) => void;
  canChat: boolean;
  onInstall: () => void;
};

const initialsFromName = (name: string): string => name.trim().slice(0, CMS_AVATAR_INITIALS_LENGTH).toUpperCase();

export const CmsOnlineRoster: FC<CmsOnlineRosterProps> = (props) => {
  const { users, selectedIds, onToggle, onOpenUser, onCreateRoom, canChat, onInstall } = props;
  const { t } = useI18n();
  const [tag, setTag] = useState(EMPTY_STRING);

  return (
    <div className="ink-cms__online-panel">
      <Typography variant="caption" className="mb-2">
        {t.cmsShell.online}
      </Typography>
      {canChat ? null : (
        <Button size="sm" variant="ink" onClick={onInstall}>
          {t.cmsShell.installChat}
        </Button>
      )}
      <Flex direction="column" gap={1}>
        {users.map((person) => (
          <Flex key={person.id} align="center" gap={2} justify="between">
            <button
              type="button"
              className="ink-cms__online-user"
              onClick={() => {
                if (canChat) onOpenUser(person.id);
                else onInstall();
              }}
            >
              <Avatar initials={initialsFromName(person.name)} size="sm" />
              <span>{person.name}</span>
            </button>
            <input
              type="checkbox"
              checked={selectedIds.includes(person.id)}
              onChange={() => onToggle(person.id)}
              aria-label={t.cmsShell.addToRoom}
            />
          </Flex>
        ))}
      </Flex>
      {canChat ? (
        <>
          <Input
            id={CREW_CHAT_TAG_ID}
            className="mt-2"
            label={t.cmsShell.addToRoom}
            value={tag}
            onChange={(event) => setTag(event.target.value)}
          />
          <Button
            size="sm"
            variant="ink"
            className="mt-2"
            disabled={selectedIds.length === 0}
            onClick={() => {
              onCreateRoom(tag.trim());
              setTag(EMPTY_STRING);
            }}
          >
            {t.cmsShell.newRoom}
          </Button>
        </>
      ) : null}
    </div>
  );
};
