import { useEffect, type FC } from 'react';
import { useNucleus } from '@forgedevstack/synapse';
import { Badge, Button, Card, Flex, Spinner, Typography } from '@forgedevstack/bear';
import { PlanCompareTable } from '@components/PlanCompareTable';
import { useAuth } from '@hooks/index';
import { useI18n } from '@i18n/index';
import { authNucleus, plansNucleus } from '@sdk/index';
import { CmsShell, CMS_NAV_IDS } from '../CmsShell';

export const PlansPages: FC = () => {
  const { t } = useI18n();
  const { token: providerToken } = useAuth();
  const { token, fetchMe } = useNucleus(authNucleus);
  const { plans, activeUserPlan, loading, switching, error, fetchPlans, switchPlan } =
    useNucleus(plansNucleus);
  const activeToken = token || providerToken;

  useEffect(() => {
    if (activeToken) {
      void fetchPlans(activeToken);
    }
  }, [activeToken, fetchPlans]);

  const onSwitch = async (planId: string) => {
    if (!activeToken || planId === activeUserPlan) return;
    const ok = await switchPlan(activeToken, planId);
    if (ok) {
      void fetchMe();
      void fetchPlans(activeToken);
    }
  };

  return (
    <CmsShell activeNavId={CMS_NAV_IDS.PLANS}>
      <Flex direction="column" gap={4}>
        <div>
          <Typography variant="h2" className="mb-1">
            {t.dashboard.plansTitle}
          </Typography>
          <Typography variant="body2" className="ink-cms__muted mb-0">
            {t.dashboard.plansSubtitle}
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

        <div className="ink-cms-plans">
          {plans.map((plan) => {
            const isActive = activeUserPlan === plan.id;
            return (
              <Card
                key={plan.id}
                className={`ink-cms-card ink-cms-plan-card${
                  isActive ? ' ink-cms-plan-card--active' : ''
                }`}
              >
                <Flex justify="between" align="center" className="mb-2 gap-2">
                  <Typography variant="h3" className="mb-0">
                    {plan.title}
                  </Typography>
                  {isActive ? (
                    <Badge variant="success" className="text-xs">
                      {t.dashboard.plansActive}
                    </Badge>
                  ) : (
                    <Badge variant="info" className="text-xs">
                      {plan.portalTier}
                    </Badge>
                  )}
                </Flex>
                <Typography variant="h2" className="mb-1">
                  {plan.price.label}
                </Typography>
                <Typography variant="caption" className="ink-cms__muted block mb-3">
                  {plan.price.period} · AI: {plan.aiMode} · tokens: {plan.monthlyTokenLimit}
                  {plan.sitesLimit
                    ? ` · sites: ${plan.sitesLimit}`
                    : ''}
                </Typography>
                <ul className="ink-cms-plan-card__features">
                  {plan.licenseFeatures.length === 0 ? (
                    <li>{t.dashboard.plansFreeCore}</li>
                  ) : (
                    plan.licenseFeatures.map((feature) => <li key={feature}>{feature}</li>)
                  )}
                </ul>
                <div className="ink-cms-plan-card__action">
                  {isActive ? (
                    <Typography variant="caption" className="ink-cms-plan-card__current mb-0">
                      {t.dashboard.plansCurrent}
                    </Typography>
                  ) : (
                    <Button
                      size="sm"
                      variant="ink"
                      disabled={switching}
                      onClick={() => void onSwitch(plan.id)}
                    >
                      {t.dashboard.plansSwitch}
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {!loading && plans.length === 0 ? (
          <Typography variant="body2" className="ink-cms__muted mb-0">
            {t.dashboard.listEmpty}
          </Typography>
        ) : null}

        <Card className="ink-cms-card">
          <PlanCompareTable />
        </Card>
      </Flex>
    </CmsShell>
  );
};
