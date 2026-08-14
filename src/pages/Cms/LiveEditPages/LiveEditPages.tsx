import { useState, type FC } from 'react';
import { Button, Card, Flex, Input, Typography } from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { EMPTY_STRING } from '@const/index';
import { CmsShell, CMS_NAV_IDS } from '../CmsShell';
import {
  DEFAULT_CUSTOMER_SITE_URL,
  LIVE_EDIT_QUERY,
  LIVE_EDIT_QUERY_VALUE,
} from './LiveEditPages.const';

const buildLiveEditUrl = (siteUrl: string, pageId: string): string => {
  try {
    const url = new URL(siteUrl);
    url.searchParams.set(LIVE_EDIT_QUERY, LIVE_EDIT_QUERY_VALUE);
    if (pageId.trim()) {
      url.searchParams.set('pageId', pageId.trim());
    }
    return url.toString();
  } catch {
    return EMPTY_STRING;
  }
};

export const LiveEditPages: FC = () => {
  const { t } = useI18n();
  const [siteUrl, setSiteUrl] = useState(DEFAULT_CUSTOMER_SITE_URL);
  const [pageId, setPageId] = useState(EMPTY_STRING);
  const [copied, setCopied] = useState(false);
  const liveUrl = buildLiveEditUrl(siteUrl, pageId);

  const copyLink = async () => {
    if (!liveUrl || !navigator.clipboard) return;
    await navigator.clipboard.writeText(liveUrl);
    setCopied(true);
  };

  return (
    <CmsShell activeNavId={CMS_NAV_IDS.LIVE_EDIT}>
      <Flex direction="column" gap={4}>
        <div>
          <Typography variant="h2" className="mb-1">
            {t.cmsLiveEdit.title}
          </Typography>
          <Typography variant="body2" className="ink-cms__muted mb-0">
            {t.cmsLiveEdit.subtitle}
          </Typography>
        </div>

        <Card className="ink-cms-card">
          <Typography variant="h4" className="mb-2">
            {t.cmsLiveEdit.sessionTitle}
          </Typography>
          <Typography variant="body2" className="ink-cms__muted mb-3">
            {t.cmsLiveEdit.sessionBody}
          </Typography>
          <Flex direction="column" gap={2}>
            <Input
              id="live-edit-site"
              label={t.cmsLiveEdit.siteUrl}
              value={siteUrl}
              onChange={(event) => {
                setSiteUrl(event.target.value);
                setCopied(false);
              }}
            />
            <Input
              id="live-edit-page"
              label={t.cmsLiveEdit.pageId}
              value={pageId}
              onChange={(event) => {
                setPageId(event.target.value);
                setCopied(false);
              }}
            />
            <Card className="ink-cms-card ink-cms-card--nested">
              <Typography variant="caption" className="ink-cms__muted mb-1 block">
                {t.cmsLiveEdit.generatedLink}
              </Typography>
              <Typography variant="body2" className="mb-0 break-all">
                {liveUrl || t.cmsLiveEdit.invalidUrl}
              </Typography>
            </Card>
            <Flex gap={2} className="flex-wrap">
              <Button size="sm" variant="ink" onClick={() => void copyLink()} disabled={!liveUrl}>
                {copied ? t.cmsLiveEdit.copied : t.cmsLiveEdit.copyLink}
              </Button>
              {liveUrl ? (
                <a href={liveUrl} target="_blank" rel="noreferrer">
                  <Button size="sm" variant="outline">
                    {t.cmsLiveEdit.openSite}
                  </Button>
                </a>
              ) : null}
            </Flex>
          </Flex>
        </Card>

        <Card className="ink-cms-card">
          <Typography variant="h4" className="mb-2">
            {t.cmsLiveEdit.howTitle}
          </Typography>
          <ol className="ink-cms-steps">
            <li>{t.cmsLiveEdit.step1}</li>
            <li>{t.cmsLiveEdit.step2}</li>
            <li>{t.cmsLiveEdit.step3}</li>
            <li>{t.cmsLiveEdit.step4}</li>
          </ol>
        </Card>
      </Flex>
    </CmsShell>
  );
};
