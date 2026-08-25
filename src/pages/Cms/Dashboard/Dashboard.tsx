import { useEffect, type CSSProperties, type FC } from 'react';
import { useNucleus } from '@forgedevstack/synapse';
import { Badge, Card, Flex, Spinner, Typography } from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import type { ColumnDefinition } from '@forgedevstack/grid-table';
import { useAuth } from '@hooks/index';
import { useI18n } from '@i18n/index';
import { NUMBER_ZERO } from '@const/numbers';
import { authNucleus, cmsNucleus } from '@sdk/index';
import type { CmsIntegrationRow } from '@sdk/index';
import { CmsShell, CMS_NAV_IDS } from '../CmsShell';
import {
  CMS_PERCENT_BASE,
  FALLBACK_ANALYTICS,
  WEEKDAY_KEYS,
  barHeightPercent,
  formatNumber,
} from './Dashboard.const';

export const Dashboard: FC = () => {
  const { t } = useI18n();
  const { token: providerToken } = useAuth();
  const { token } = useNucleus(authNucleus);
  const { analytics, loading, error, fetchDashboard } = useNucleus(cmsNucleus);
  const activeToken = token || providerToken;

  useEffect(() => {
    if (activeToken) {
      void fetchDashboard(activeToken);
    }
  }, [activeToken, fetchDashboard]);

  const data = analytics ? { ...FALLBACK_ANALYTICS, ...analytics } : FALLBACK_ANALYTICS;
  const weeklyMax = Math.max(...data.weekly, NUMBER_ZERO);
  const distributionTotal = data.distribution.reduce((sum, slice) => sum + slice.value, NUMBER_ZERO);

  const collectionColumns: ColumnDefinition<CmsIntegrationRow>[] = [
    { id: 'application', accessor: 'application', header: t.dashboard.colCollection, sortable: true },
    { id: 'type', accessor: 'type', header: t.dashboard.colPublishedMix, sortable: true },
    { id: 'rate', accessor: 'rate', header: t.dashboard.colRate, sortable: true },
    { id: 'profit', accessor: 'profit', header: t.dashboard.colItems, sortable: true },
  ];

  return (
    <CmsShell activeNavId={CMS_NAV_IDS.DASHBOARD}>
      <Flex direction="column" gap={4} className="ink-cms-dashboard">
        <div>
          <Typography variant="h2" className="ink-cms-dashboard__title mb-1">
            {t.dashboard.title}
          </Typography>
          <Typography variant="body2" className="ink-cms__muted mb-0">
            {t.dashboard.subtitle}
          </Typography>
        </div>

        {loading ? (
          <Flex align="center" gap={2}>
            <Spinner size="sm" />
            <Typography variant="body2" className="mb-0">
              {t.dashboard.loading}
            </Typography>
          </Flex>
        ) : null}

        {error ? (
          <Typography variant="body2" className="ink-cms-dashboard__error mb-0">
            {t.dashboard.error}
          </Typography>
        ) : null}

        <div className="ink-cms-dashboard__kpis ink-cms-dashboard__kpis--wide">
          <Card className="ink-cms-card">
            <Typography variant="caption" className="ink-cms__muted mb-1">
              {t.dashboard.documents}
            </Typography>
            <Typography variant="h3" className="mb-0">
              {formatNumber(data.documents)}
            </Typography>
          </Card>
          <Card className="ink-cms-card">
            <Typography variant="caption" className="ink-cms__muted mb-1">
              {t.dashboard.publishedCount}
            </Typography>
            <Typography variant="h3" className="mb-0">
              {formatNumber(data.published)}
            </Typography>
          </Card>
          <Card className="ink-cms-card">
            <Typography variant="caption" className="ink-cms__muted mb-1">
              {t.dashboard.drafts}
            </Typography>
            <Typography variant="h3" className="mb-0">
              {formatNumber(data.drafts)}
            </Typography>
          </Card>
          <Card className="ink-cms-card">
            <Typography variant="caption" className="ink-cms__muted mb-1">
              {t.dashboard.templatesCount}
            </Typography>
            <Typography variant="h3" className="mb-0">
              {formatNumber(data.templates)}
            </Typography>
          </Card>
          <Card className="ink-cms-card">
            <Typography variant="caption" className="ink-cms__muted mb-1">
              {t.dashboard.mediaCount}
            </Typography>
            <Typography variant="h3" className="mb-0">
              {formatNumber(data.media)}
            </Typography>
          </Card>
          <Card className="ink-cms-card">
            <Typography variant="caption" className="ink-cms__muted mb-1">
              {t.dashboard.tablesCount}
            </Typography>
            <Typography variant="h3" className="mb-0">
              {formatNumber(data.tables)}
            </Typography>
          </Card>
        </div>

        <div className="ink-cms-dashboard__charts">
          <Card className="ink-cms-card ink-cms-dashboard__sales">
            <Flex justify="between" align="center" className="mb-4">
              <Typography variant="h4" className="mb-0">
                {t.dashboard.tokens}
              </Typography>
              <Typography variant="h5" className="mb-0">
                {formatNumber(data.tokensUsed)} / {formatNumber(data.tokensLimit)}
              </Typography>
            </Flex>
            <Badge variant="info" className="text-xs">
              {data.usageRate.toFixed(1)}%
            </Badge>
          </Card>

          <Card className="ink-cms-card">
            <Typography variant="h4" className="mb-4">
              {t.dashboard.activity}
            </Typography>
            <div className="ink-cms-bars ink-cms-bars--weekly">
              {data.weekly.map((value, index) => {
                const height = barHeightPercent(value, weeklyMax);
                const style = { '--ink-cms-bar-h': `${height}%` } as CSSProperties;
                return (
                  <div key={WEEKDAY_KEYS[index]} className="ink-cms-bars__col">
                    <div className="ink-cms-bars__track">
                      <span className="ink-cms-bars__fill" style={style} />
                    </div>
                    <Typography variant="caption" className="ink-cms__muted mb-0">
                      {t.dashboard.weekdays[WEEKDAY_KEYS[index]]}
                    </Typography>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="ink-cms-card">
            <Typography variant="h4" className="mb-4">
              {t.dashboard.distribution}
            </Typography>
            {data.distribution.length === NUMBER_ZERO ? (
              <Typography variant="body2" className="ink-cms__muted mb-0">
                {t.dashboard.listEmpty}
              </Typography>
            ) : (
              <div className="ink-cms-rings">
                {data.distribution.map((slice) => {
                  const percent =
                    distributionTotal > NUMBER_ZERO
                      ? Math.round((slice.value / distributionTotal) * CMS_PERCENT_BASE)
                      : NUMBER_ZERO;
                  const style = {
                    '--ink-cms-ring': `${percent}`,
                  } as CSSProperties;
                  return (
                    <div key={slice.label} className="ink-cms-rings__item">
                      <div className="ink-cms-rings__ring" style={style}>
                        <Typography variant="body2" className="mb-0 font-medium">
                          {percent}%
                        </Typography>
                      </div>
                      <Typography variant="caption" className="ink-cms__muted mb-0">
                        {slice.label}
                      </Typography>
                      <Typography variant="body2" className="mb-0">
                        {formatNumber(slice.value)}
                      </Typography>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>

        <Card className="ink-cms-card">
          <Typography variant="h4" className="mb-4">
            {t.dashboard.collections}
          </Typography>
          <GridTable
            data={data.integrations}
            columns={collectionColumns}
            showPagination={false}
            showFilter={false}
            emptyContent={
              <Typography variant="body2" className="ink-cms__muted mb-0">
                {t.dashboard.listEmpty}
              </Typography>
            }
            tableEffects={{ hover: true, sort: true, row: true }}
          />
        </Card>
      </Flex>
    </CmsShell>
  );
};
