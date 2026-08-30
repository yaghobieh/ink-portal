import { useEffect, useState, type FC, type ReactNode } from 'react';
import { useNavigate } from '@forgedevstack/forge-compass/react';
import { Badge, BearIcons, Button, Card, DateRangePicker, Flex, Typography } from '@forgedevstack/bear';
import { useAuth } from '@hooks/index';
import { useI18n } from '@i18n/index';
import { CMS_ICON_SIZE } from '@const/numbers.const';
import { fetchNotifications, type CmsNotification } from '@sdk/modules/cms';
import { CmsShell, CMS_NAV_IDS } from '../CmsShell';
import { useCmsLive } from '../CmsShell/CmsLiveProvider';
import {
  NOTIFICATIONS_DAYS,
  NOTIFICATIONS_FILTER,
  NOTIFICATIONS_MS_PER_DAY,
  NOTIFICATIONS_RANGE_ID,
} from './NotificationsPages.const';
import { groupNotificationsByDay } from './NotificationsPages.utils';

const defaultRange = (): [Date, Date] => {
  const to = new Date();
  const from = new Date(to.getTime() - NOTIFICATIONS_DAYS * NOTIFICATIONS_MS_PER_DAY);
  return [from, to];
};

const severityIcon = (severity: CmsNotification['severity']): ReactNode => {
  if (severity === 'warning' || severity === 'error') {
    return <BearIcons.WarningIcon size={CMS_ICON_SIZE} />;
  }
  if (severity === 'success') {
    return <BearIcons.FileTextIcon size={CMS_ICON_SIZE} />;
  }
  return <BearIcons.UsersIcon size={CMS_ICON_SIZE} />;
};

export const NotificationsPages: FC = () => {
  const { t, locale } = useI18n();
  const { navigate } = useNavigate();
  const { token } = useAuth();
  const { markRead, markAllRead } = useCmsLive();
  const [range, setRange] = useState<[Date | null, Date | null]>(defaultRange);
  const [seeAll, setSeeAll] = useState(false);
  const [filter, setFilter] = useState<(typeof NOTIFICATIONS_FILTER)[keyof typeof NOTIFICATIONS_FILTER]>(
    NOTIFICATIONS_FILTER.ALL,
  );
  const [items, setItems] = useState<CmsNotification[]>([]);

  useEffect(() => {
    if (!token) return;
    const query = seeAll || !range[0] || !range[1]
      ? undefined
      : { from: range[0].toISOString(), to: range[1].toISOString() };
    void fetchNotifications(token, query).then((next) => {
      if (next) setItems(next.items);
    });
  }, [token, range, seeAll]);

  const unreadCount = items.filter((item) => !item.readAt).length;
  const visible =
    filter === NOTIFICATIONS_FILTER.UNREAD ? items.filter((item) => !item.readAt) : items;
  const groups = groupNotificationsByDay(visible, locale);

  const markItem = (id: string) => {
    markRead(id);
    setItems((current) =>
      current.map((row) =>
        row.id === id ? { ...row, readAt: new Date().toISOString() } : row,
      ),
    );
  };

  return (
    <CmsShell activeNavId={CMS_NAV_IDS.NOTIFICATIONS}>
      <Flex direction="column" gap={4}>
        <div>
          <Typography variant="h2" className="mb-1">
            {t.cmsNotifications.title}
          </Typography>
          <Typography variant="body2" className="ink-cms__muted mb-0">
            {seeAll ? t.cmsNotifications.seeAllHint : t.cmsNotifications.subtitle}
          </Typography>
        </div>
        <Flex justify="between" align="center" className="gap-3 flex-wrap">
          <Flex gap={1} className="flex-wrap">
            <Button
              size="sm"
              variant={filter === NOTIFICATIONS_FILTER.ALL ? 'ink' : 'outline'}
              onClick={() => setFilter(NOTIFICATIONS_FILTER.ALL)}
            >
              {t.cmsShell.alertsAll}
            </Button>
            <Button
              size="sm"
              variant={filter === NOTIFICATIONS_FILTER.UNREAD ? 'ink' : 'outline'}
              onClick={() => setFilter(NOTIFICATIONS_FILTER.UNREAD)}
            >
              {t.cmsNotifications.unread} · {unreadCount}
            </Button>
          </Flex>
          <Flex align="center" gap={2} className="flex-wrap ink-cms-notifications__actions">
            {seeAll ? null : (
              <DateRangePicker
                id={NOTIFICATIONS_RANGE_ID}
                value={{ start: range[0], end: range[1] }}
                onChange={(next) => setRange([next.start, next.end])}
                className="ink-cms-notifications__range"
                size="sm"
              />
            )}
            <Button
              size="sm"
              variant={seeAll ? 'ink' : 'outline'}
              onClick={() => setSeeAll((value) => !value)}
            >
              {t.cmsNotifications.seeAll}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              disabled={unreadCount === 0}
              onClick={() => {
                markAllRead();
                setItems((current) =>
                  current.map((row) => ({ ...row, readAt: row.readAt || new Date().toISOString() })),
                );
              }}
            >
              {t.cmsNotifications.markAllRead}
            </Button>
          </Flex>
        </Flex>
        {groups.length === 0 ? (
          <Typography variant="body2" className="ink-cms__muted mb-0">
            {t.cmsShell.alertsEmpty}
          </Typography>
        ) : (
          groups.map((group) => (
            <Flex key={group.key} direction="column" gap={2}>
              <Typography variant="caption" className="ink-cms__muted mb-0">
                {group.label}
              </Typography>
              {group.items.map((item) => (
                <Card
                  key={item.id}
                  className="ink-cms-card"
                  onClick={() => {
                    markItem(item.id);
                    if (item.href) navigate(item.href);
                  }}
                >
                  <Flex align="start" gap={3}>
                    {item.readAt ? null : (
                      <Badge variant="info" className="text-xs">
                        {t.cmsNotifications.unread}
                      </Badge>
                    )}
                    {severityIcon(item.severity)}
                    <Flex direction="column" gap={1}>
                      <Typography variant="body2" className="mb-0 font-medium">
                        {item.title}
                      </Typography>
                      <Typography variant="caption" className="ink-cms__muted mb-0">
                        {item.body}
                      </Typography>
                      <Typography variant="caption" className="ink-cms__muted mb-0">
                        {new Date(item.createdAt).toLocaleString()}
                      </Typography>
                    </Flex>
                  </Flex>
                </Card>
              ))}
            </Flex>
          ))
        )}
      </Flex>
    </CmsShell>
  );
};
