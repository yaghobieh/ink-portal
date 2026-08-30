import { useEffect, useRef, useState, type FC } from 'react';
import { Avatar, Badge, Button, Flex, Typography } from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { NUMBER_ZERO } from '@const/numbers.const';
import { CMS_AVATAR_INITIALS_LENGTH } from '../CmsShell.const';
import { CMS_ONLINE_PAGE_SIZE } from './CmsOnlineStatus.const';
import type { CmsOnlineStatusProps } from './CmsOnlineStatus.types';

const initialsFromName = (name: string): string =>
  name.trim().slice(NUMBER_ZERO, CMS_AVATAR_INITIALS_LENGTH).toUpperCase();

export const CmsOnlineStatus: FC<CmsOnlineStatusProps> = (props) => {
  const { users, currentUserId, onOpenUser } = props;
  const { t } = useI18n();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(CMS_ONLINE_PAGE_SIZE);
  const others = users.filter((person) => person.id !== currentUserId);
  const visible = others.slice(NUMBER_ZERO, visibleCount);
  const remaining = others.length - visible.length;

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  return (
    <div ref={rootRef} className="ink-cms-online-status-wrap">
      <button
        type="button"
        className="ink-cms-online-status"
        aria-label={t.cmsShell.online}
        onClick={() => {
          setOpen((current) => !current);
          setVisibleCount(CMS_ONLINE_PAGE_SIZE);
        }}
      >
        <span
          className={
            others.length > NUMBER_ZERO
              ? 'ink-cms-online-status__dot ink-cms-online-status__dot--on'
              : 'ink-cms-online-status__dot'
          }
        />
        <span>{t.cmsShell.online}</span>
        {others.length > NUMBER_ZERO ? (
          <Badge variant="success" className="ink-cms-online-status__badge text-xs">
            {others.length}
          </Badge>
        ) : null}
      </button>
      {open ? (
        <div className="ink-cms-online-status__menu" role="listbox">
          <Typography variant="caption" className="ink-cms__muted mb-2">
            {t.cmsShell.online} · {others.length}
          </Typography>
          {others.length === NUMBER_ZERO ? (
            <Typography variant="body2" className="ink-cms__muted mb-0">
              {t.cmsShell.onlineEmpty}
            </Typography>
          ) : (
            <Flex direction="column" gap={1}>
              {visible.map((person) => (
                <button
                  key={person.id}
                  type="button"
                  className="ink-cms__online-user"
                  onClick={() => {
                    onOpenUser(person.id);
                    setOpen(false);
                  }}
                >
                  <span className="ink-cms-online-status__live" />
                  <Avatar initials={initialsFromName(person.name)} size="sm" />
                  <span>{person.name}</span>
                </button>
              ))}
              {remaining > NUMBER_ZERO ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setVisibleCount((current) => current + CMS_ONLINE_PAGE_SIZE)}
                >
                  {t.cmsShell.onlineLoadMore}
                </Button>
              ) : null}
            </Flex>
          )}
        </div>
      ) : null}
    </div>
  );
};
