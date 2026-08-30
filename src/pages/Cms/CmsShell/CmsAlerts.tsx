import { useState, type FC } from 'react';
import { useNavigate } from '@forgedevstack/forge-compass/react';
import { Badge, BearIcons, Button, Dropdown, Flex, List, ListItem, Typography } from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { ROUTES } from '@const/index';
import { CMS_ICON_SIZE } from '@const/numbers.const';
import { NUMBER_ZERO } from '@const/numbers.const';
import { CMS_ALERT_FILTERS } from './CmsAlerts.const';
import type { CmsAlertFilter } from './CmsAlerts.types';
import { useCmsLive } from './CmsLiveProvider';

type CmsAlertsProps = {
  onOpen: () => void;
};

export const CmsAlerts: FC<CmsAlertsProps> = (props) => {
  const { onOpen } = props;
  const { t } = useI18n();
  const { navigate } = useNavigate();
  const { items, unread, markRead } = useCmsLive();
  const [filter, setFilter] = useState<CmsAlertFilter>(CMS_ALERT_FILTERS.ALL);

  const visible =
    filter === CMS_ALERT_FILTERS.UNSEEN
      ? items.filter((item) => !item.readAt)
      : filter === CMS_ALERT_FILTERS.SEEN
        ? items.filter((item) => item.readAt)
        : items;

  return (
    <Dropdown
      placement="bottom-end"
      minWidth={360}
      onOpenChange={(open) => {
        if (open) onOpen();
      }}
      header={
        <Flex direction="column" gap={2} className="ink-cms-alerts__header">
          <Typography variant="h5" className="mb-0">
            {t.cmsShell.notifications}
          </Typography>
          <Flex gap={1} className="flex-wrap">
            <Button
              size="sm"
              variant={filter === CMS_ALERT_FILTERS.ALL ? 'ink' : 'outline'}
              onClick={() => setFilter(CMS_ALERT_FILTERS.ALL)}
            >
              {t.cmsShell.alertsAll}
            </Button>
            <Button
              size="sm"
              variant={filter === CMS_ALERT_FILTERS.UNSEEN ? 'ink' : 'outline'}
              onClick={() => setFilter(CMS_ALERT_FILTERS.UNSEEN)}
            >
              {t.cmsShell.alertsUnseen}
            </Button>
            <Button
              size="sm"
              variant={filter === CMS_ALERT_FILTERS.SEEN ? 'ink' : 'outline'}
              onClick={() => setFilter(CMS_ALERT_FILTERS.SEEN)}
            >
              {t.cmsShell.alertsSeen}
            </Button>
          </Flex>
        </Flex>
      }
      trigger={
        <span className="ink-cms-alerts__trigger">
          <Button
            variant="ghost"
            size="sm"
            icon={<BearIcons.BellIcon size={CMS_ICON_SIZE} />}
            aria-label={t.cmsShell.notifications}
          />
          {unread > NUMBER_ZERO ? (
            <Badge variant="error" className="ink-cms-alerts__badge text-xs">
              {unread}
            </Badge>
          ) : null}
        </span>
      }
      items={[
        ...visible.map((item) => ({
          key: item.id,
          label: (
            <span className="ink-cms-alerts__list-wrap">
              <List hoverable dense>
                <ListItem
                  primary={item.title}
                  secondary={item.body}
                  selected={!item.readAt}
                />
              </List>
            </span>
          ),
          searchLabel: item.title,
          onClick: () => {
            if (!item.readAt) markRead(item.id);
            navigate(item.href);
          },
        })),
        {
          key: 'see-all',
          label: t.cmsNotifications.seeAll,
          onClick: () => navigate(ROUTES.CMS_NOTIFICATIONS),
        },
      ]}
      emptyText={t.cmsShell.alertsEmpty}
    />
  );
};
