import type { FC } from 'react';
import { Link } from '@forgedevstack/forge-compass/react';
import { Badge, Button, Card, Flex, Typography } from '@forgedevstack/bear';
import { Layout } from '@components/Layout';
import { PlanCompareTable } from '@components/PlanCompareTable';
import { useInkPremium } from '@hooks/index';
import { useI18n } from '@i18n/index';
import {
  INK_API_URL,
  INK_PREMIUM_LICENSE_EXAMPLE,
  PLAN_AI_TOKENS_MONTHLY,
  PLAN_FEATURE_KEYS,
  PLAN_PRICES,
  ROUTES,
} from '@const/index';

export const Pricing: FC = () => {
  const { t } = useI18n();
  const { active, clear } = useInkPremium();
  const tokenLabel = PLAN_AI_TOKENS_MONTHLY.toLocaleString();

  return (
    <Layout>
      <div className="fade-in max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Typography variant="h1" className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
          {t.pricing.title}
        </Typography>
        <Typography variant="body1" className="ink-text-muted mb-10 max-w-2xl text-lg">
          {t.pricing.description}
        </Typography>

        {active ? (
          <section className="ink-paper p-6 mb-10">
            <Flex align="center" gap={2} className="mb-2">
              <Badge variant="success">{t.pricing.activeBadge}</Badge>
              <Typography variant="h4" className="font-semibold mb-0">
                {t.pricing.activeTitle}
              </Typography>
            </Flex>
            <Typography variant="body2" className="ink-text-muted mb-4">
              {t.pricing.activeBody}
            </Typography>
            <Flex gap={2} className="flex-wrap">
              <Link to={ROUTES.PLAYGROUND}>
                <Button variant="ink" size="sm">
                  {t.pricing.activeCta}
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={clear}>
                {t.pricing.activeClear}
              </Button>
            </Flex>
          </section>
        ) : null}

        <div className="ink-pricing-grid mb-12">
          <Card className="ink-pricing-card p-6">
            <Typography variant="caption" className="ink-text-muted uppercase tracking-wide">
              {t.pricing.freeBadge}
            </Typography>
            <Typography variant="h3" className="font-semibold mb-1 mt-1">
              {t.pricing.freeTitle}
            </Typography>
            <Typography variant="h2" className="text-3xl font-bold mb-2">
              {PLAN_PRICES.free.label}
            </Typography>
            <Typography variant="body2" className="ink-text-muted mb-4">
              {t.pricing.freeBody}
            </Typography>
            <ul className="ink-pricing-list">
              {PLAN_FEATURE_KEYS.free.map((key) => (
                <li key={key}>{t.pricing[key]}</li>
              ))}
            </ul>
            <Link to={ROUTES.GET_STARTED} className="inline-flex mt-6">
              <Button variant="inkOutline">{t.pricing.ctaFree}</Button>
            </Link>
          </Card>

          <Card className="ink-pricing-card ink-pricing-card--pro p-6">
            <Flex align="center" gap={2} className="mb-1">
              <Typography variant="h3" className="font-semibold mb-0">
                {t.pricing.proTitle}
              </Typography>
              <Badge variant="info">{t.pricing.proBadge}</Badge>
            </Flex>
            <Typography variant="h2" className="text-3xl font-bold mb-1">
              {PLAN_PRICES.pro.label}
              <Typography variant="caption" className="ink-text-muted ml-2 font-normal">
                {t.pricing.proPeriod}
              </Typography>
            </Typography>
            <Typography variant="body2" className="ink-text-muted mb-4">
              {t.pricing.proBody}
            </Typography>
            <ul className="ink-pricing-list">
              {PLAN_FEATURE_KEYS.pro.map((key) => (
                <li key={key}>{t.pricing[key]}</li>
              ))}
            </ul>
            <Button variant="ink" className="mt-6" disabled>
              {t.pricing.ctaCheckoutSoon}
            </Button>
            <Typography variant="caption" className="ink-text-muted block mt-3">
              {t.pricing.checkoutHint}
            </Typography>
          </Card>

          <Card className="ink-pricing-card ink-pricing-card--ai p-6">
            <Flex align="center" gap={2} className="mb-1">
              <Typography variant="h3" className="font-semibold mb-0">
                {t.pricing.aiTitle}
              </Typography>
              <Badge variant="success">{t.pricing.aiBadge}</Badge>
            </Flex>
            <Typography variant="h2" className="text-3xl font-bold mb-1">
              {PLAN_PRICES.ai.label}
              <Typography variant="caption" className="ink-text-muted ml-2 font-normal">
                {t.pricing.aiPeriod}
              </Typography>
            </Typography>
            <Typography variant="body2" className="ink-text-muted mb-4">
              {t.pricing.aiBody.replace('{tokens}', tokenLabel)}
            </Typography>
            <ul className="ink-pricing-list">
              {PLAN_FEATURE_KEYS.ai.map((key) => (
                <li key={key}>
                  {key === 'aiItemTokens'
                    ? t.pricing.aiItemTokens.replace('{tokens}', tokenLabel)
                    : t.pricing[key]}
                </li>
              ))}
            </ul>
            <Button variant="ink" className="mt-6" disabled>
              {t.pricing.ctaCheckoutSoon}
            </Button>
            <Typography variant="caption" className="ink-text-muted block mt-3">
              {t.pricing.checkoutHint}
            </Typography>
          </Card>
        </div>

        <section className="ink-paper p-6 mb-8">
          <PlanCompareTable />
        </section>

        <section className="ink-paper p-6 mb-8">
          <Typography variant="h4" className="font-semibold mb-3">
            {t.pricing.apiTitle}
          </Typography>
          <Typography variant="body2" className="ink-text-muted mb-4">
            {t.pricing.apiBody}
          </Typography>
          <pre className="ink-code mb-3">{`VITE_INK_API_URL=${INK_API_URL || 'https://api.inkforgejs.com'}
Authorization: Bearer <jwt>`}</pre>
          <Typography variant="caption" className="ink-text-muted block">
            {t.pricing.apiAuthNote}
          </Typography>
        </section>

        <section className="ink-paper p-6">
          <Typography variant="h4" className="font-semibold mb-3">
            {t.pricing.howTitle}
          </Typography>
          <Typography variant="body2" className="ink-text-muted mb-4">
            {t.pricing.howNpmNote}
          </Typography>
          <pre className="ink-code mt-2">{`import { InkEditor } from '@forgedevstack/ink';

<InkEditor
  premium={{ licenseKey: '${INK_PREMIUM_LICENSE_EXAMPLE}' }}
  theme={{ accent: '#0f766e', radius: '1rem' }}
  pasteMode="rich"
  wysiwyg
/>`}</pre>
        </section>

        <Typography variant="caption" className="ink-text-muted block mt-10 text-center">
          <Link to={ROUTES.TERMS} className="ink-doc-link">
            {t.pricing.termsLink}
          </Link>
        </Typography>
      </div>
    </Layout>
  );
};
