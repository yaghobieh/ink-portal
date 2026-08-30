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
  MONTH_KEYS,
  SALES_MONTHLY_STACKS,
  SALES_STACK_KEYS,
  WEEKDAY_KEYS,
  barHeightPercent,
  formatCurrency,
  formatDelta,
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

  const data = analytics ?? FALLBACK_ANALYTICS;
  const weeklyMax = Math.max(...data.weekly, NUMBER_ZERO);
  const distributionTotal = data.distribution.reduce((sum, slice) => sum + slice.value, NUMBER_ZERO);

  const integrationColumns: ColumnDefinition<CmsIntegrationRow>[] = [
    { id: 'application', accessor: 'application', header: t.dashboard.colApplication, sortable: true },
    { id: 'type', accessor: 'type', header: t.dashboard.colType, sortable: true },
    { id: 'rate', accessor: 'rate', header: t.dashboard.colRate, sortable: true },
    { id: 'profit', accessor: 'profit', header: t.dashboard.colProfit, sortable: true },
  ];

  const kpiTone = (delta: number) => (delta >= NUMBER_ZERO ? 'up' : 'down');

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

        <div className="ink-cms-dashboard__kpis">
          <Card className="ink-cms-card">
            <Typography variant="caption" className="ink-cms__muted mb-1">
              {t.dashboard.pageViews}
            </Typography>
            <Typography variant="h3" className="mb-1">
              {formatNumber(data.pageViews)}
            </Typography>
            <Badge variant={kpiTone(data.pageViewsDelta) === 'up' ? 'success' : 'error'} className="text-xs">
              {formatDelta(data.pageViewsDelta)}
            </Badge>
          </Card>
          <Card className="ink-cms-card">
            <Typography variant="caption" className="ink-cms__muted mb-1">
              {t.dashboard.revenue}
            </Typography>
            <Typography variant="h3" className="mb-1">
              {formatCurrency(data.totalRevenue)}
            </Typography>
            <Badge variant={kpiTone(data.revenueDelta) === 'up' ? 'success' : 'error'} className="text-xs">
              {formatDelta(data.revenueDelta)}
            </Badge>
          </Card>
          <Card className="ink-cms-card">
            <Typography variant="caption" className="ink-cms__muted mb-1">
              {t.dashboard.bounce}
            </Typography>
            <Typography variant="h3" className="mb-1">
              {data.bounceRate.toFixed(1)}%
            </Typography>
            <Badge variant={kpiTone(data.bounceDelta) === 'up' ? 'error' : 'success'} className="text-xs">
              {formatDelta(data.bounceDelta)}
            </Badge>
          </Card>
        </div>

        <div className="ink-cms-dashboard__charts">
          <Card className="ink-cms-card ink-cms-dashboard__sales">
            <Flex justify="between" align="center" className="mb-4">
              <Typography variant="h4" className="mb-0">
                {t.dashboard.salesOverview}
              </Typography>
              <Typography variant="h5" className="mb-0">
                {formatCurrency(data.salesOverview)}
              </Typography>
            </Flex>
            <div className="ink-cms-bars ink-cms-bars--stacked">
              {(() => {
                const stackTotals = SALES_MONTHLY_STACKS.map((stack) =>
                  stack.reduce((sum, part) => sum + part, NUMBER_ZERO),
                );
                const salesMax = Math.max(...stackTotals, NUMBER_ZERO);
                return SALES_MONTHLY_STACKS.map((stack, index) => {
                  const total = stackTotals[index];
                  const columnHeight = barHeightPercent(total, salesMax);
                  const columnStyle = { '--ink-cms-bar-h': `${columnHeight}%` } as CSSProperties;
                  return (
                    <div key={MONTH_KEYS[index]} className="ink-cms-bars__col">
                      <div className="ink-cms-bars__stack-wrap">
                        <div className="ink-cms-bars__stack" style={columnStyle}>
                          {stack.map((part, partIndex) => {
                            const height = barHeightPercent(part, total || CMS_PERCENT_BASE);
                            const style = { '--ink-cms-bar-h': `${height}%` } as CSSProperties;
                            return (
                              <span
                                key={SALES_STACK_KEYS[partIndex]}
                                className={`ink-cms-bars__segment ink-cms-bars__segment--${SALES_STACK_KEYS[partIndex]}`}
                                style={style}
                              />
                            );
                          })}
                        </div>
                      </div>
                      <Typography variant="caption" className="ink-cms__muted mb-0">
                        {t.dashboard.months[MONTH_KEYS[index]]}
                      </Typography>
                    </div>
                  );
                });
              })()}
            </div>
          </Card>

          <Card className="ink-cms-card">
            <Flex justify="between" align="center" className="mb-4">
              <Typography variant="h4" className="mb-0">
                {t.dashboard.subscribers}
              </Typography>
              <Badge variant="success" className="text-xs">
                {formatDelta(data.subscribersDelta)}
              </Badge>
            </Flex>
            <Typography variant="h3" className="mb-4">
              {formatNumber(data.subscribers)}
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
                      {formatCurrency(slice.value)}
                    </Typography>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <Card className="ink-cms-card">
          <Typography variant="h4" className="mb-4">
            {t.dashboard.integrations}
          </Typography>
          <GridTable
            data={data.integrations}
            columns={integrationColumns}
            showPagination={false}
            showFilter={false}
            tableEffects={{ hover: true, sort: true, row: true }}
          />
        </Card>
      </Flex>
    </CmsShell>
  );
};
