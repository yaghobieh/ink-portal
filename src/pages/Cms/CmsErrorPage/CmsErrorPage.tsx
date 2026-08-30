import { useEffect, useState, type FC } from 'react';
import { Button, Card, Flex, List, ListItem, Typography } from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { HTTP_UNAUTHORIZED } from '@sdk/http';
import { CMS_ERROR_DEV_KEY, CMS_ERROR_EMPTY_STATUS } from './CmsErrorPage.const';
import type { CmsErrorPageProps } from './CmsErrorPage.types';

export const CmsErrorPage: FC<CmsErrorPageProps> = (props) => {
  const { detail, onRetry } = props;
  const { t } = useI18n();
  const [devOpen, setDevOpen] = useState(false);
  const unauthorized = detail?.status === HTTP_UNAUTHORIZED;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || !event.shiftKey) return;
      if (event.key.toLowerCase() !== CMS_ERROR_DEV_KEY) return;
      event.preventDefault();
      setDevOpen((current) => !current);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="ink-cms-error-page">
      <Card className="ink-cms-card ink-cms-error-page__card">
        <Flex direction="column" gap={3} align="center">
          <Typography variant="h2" className="mb-0">
            {unauthorized ? t.cmsErrors.unauthorizedTitle : t.cmsErrors.oopsTitle}
          </Typography>
          <Typography variant="body1" className="ink-cms__muted mb-0">
            {unauthorized ? t.cmsErrors.unauthorizedBody : t.cmsErrors.oopsBody}
          </Typography>
          {onRetry ? (
            <Button variant="ink" onClick={onRetry}>
              {t.cmsErrors.retry}
            </Button>
          ) : null}
          <Typography variant="caption" className="ink-cms__muted mb-0">
            {t.cmsErrors.devHint}
          </Typography>
          {devOpen ? (
            <List className="ink-cms-error-page__dev">
              <ListItem
                primary={t.cmsErrors.devApi}
                secondary={detail?.url || CMS_ERROR_EMPTY_STATUS}
              />
              <ListItem
                primary={t.cmsErrors.devStatus}
                secondary={
                  typeof detail?.status === 'number'
                    ? String(detail.status)
                    : CMS_ERROR_EMPTY_STATUS
                }
              />
              <ListItem
                primary={t.cmsErrors.devReason}
                secondary={detail?.reason || CMS_ERROR_EMPTY_STATUS}
              />
              <ListItem
                primary={t.cmsErrors.devResponse}
                secondary={detail?.response || t.cmsErrors.devEmpty}
              />
            </List>
          ) : null}
        </Flex>
      </Card>
    </div>
  );
};
