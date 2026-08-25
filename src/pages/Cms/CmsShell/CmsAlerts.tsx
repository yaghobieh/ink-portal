import { useState, type FC } from 'react';
import { useNavigate } from '@forgedevstack/forge-compass/react';
import { Alert, Badge, BearIcons, Button, Dropdown, Flex, Typography } from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { CMS_ICON_SIZE } from '@const/numbers.const';
import { NUMBER_ZERO } from '@const/numbers';
import { CMS_ALERTS, CMS_ALERT_FILTERS, CMS_ALERT_IDS } from './CmsAlerts.const';
import type { CmsAlertFilter, CmsAlertId } from './CmsAlerts.types';
import { filterAlerts, loadSeenAlertIds, saveSeenAlertIds, unseenAlertCount } from './CmsAlerts.utils';

type CmsAlertsProps = {
  onOpen: () => void;
};

export const CmsAlerts: FC<CmsAlertsProps> = (props) => {
  const { onOpen } = props;
  const { t } = useI18n();
  const { navigate } = useNavigate();
  const [filter, setFilter] = useState<CmsAlertFilter>(CMS_ALERT_FILTERS.ALL);
  const [seen, setSeen] = useState<Set<CmsAlertId>>(() => loadSeenAlertIds());

  const alertCopy: Record<CmsAlertId, { title: string; body: string }> = {
    [CMS_ALERT_IDS.DOCUMENT]: {
      title: t.cmsShell.alertDocumentTitle,
      body: t.cmsShell.alertDocumentBody,
    },
    [CMS_ALERT_IDS.TOOLBAR]: {
      title: t.cmsShell.alertToolbarTitle,
      body: t.cmsShell.alertToolbarBody,
    },
    [CMS_ALERT_IDS.DATABASE]: {
      title: t.cmsShell.alertDatabaseTitle,
      body: t.cmsShell.alertDatabaseBody,
    },
    [CMS_ALERT_IDS.BUILDER]: {
      title: t.cmsShell.alertBuilderTitle,
      body: t.cmsShell.alertBuilderBody,
    },
  };

  const visible = filterAlerts(CMS_ALERTS, seen, filter);
  const unread = unseenAlertCount(seen);

  const markSeen = (id: CmsAlertId) => {
    const next = new Set(seen);
    next.add(id);
    setSeen(next);
    saveSeenAlertIds(next);
  };

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
      items={visible.map((alert) => ({
        key: alert.id,
        label: (
          <span className="ink-cms-alerts__item">
            <Alert severity={alert.severity} variant="standard" title={alertCopy[alert.id].title}>
              {alertCopy[alert.id].body}
            </Alert>
          </span>
        ),
        searchLabel: alertCopy[alert.id].title,
        onClick: () => {
          markSeen(alert.id);
          navigate(alert.href);
        },
      }))}
      emptyText={t.cmsShell.alertsEmpty}
    />
  );
};
