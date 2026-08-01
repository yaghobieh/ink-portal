import type { FC } from 'react';
import { Link } from '@forgedevstack/forge-compass/react';
import { Badge, Button, Card, Flex, Typography } from '@forgedevstack/bear';
import { Layout } from '@components/Layout';
import { useInkPremium } from '@hooks/index';
import { useI18n } from '@i18n/index';
import {
  INK_PREMIUM_LICENSE_EXAMPLE,
  PAYPAL_BUSINESS_URL,
  PAYPAL_BUTTONS_URL,
  PAYPAL_PAYMENT_LINK,
  PREMIUM_SUCCESS_URL,
  ROUTES,
  STRIPE_PAYMENT_LINK,
} from '@const/index';

export const Pricing: FC = () => {
  const { t } = useI18n();
  const { active, licenseKey, clear } = useInkPremium();
  const checkoutHref = PAYPAL_PAYMENT_LINK || PAYPAL_BUTTONS_URL;
  const stripeHref = STRIPE_PAYMENT_LINK;

  return (
    <Layout>
      <div className="fade-in max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
            {licenseKey ? <pre className="ink-code mb-4">{licenseKey}</pre> : null}
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
            <Typography variant="h3" className="font-semibold mb-2">
              {t.pricing.freeTitle}
            </Typography>
            <Typography variant="body2" className="ink-text-muted mb-4">
              {t.pricing.freeBody}
            </Typography>
            <ul className="ink-pricing-list">
              <li>{t.pricing.freeItemEditor}</li>
              <li>{t.pricing.freeItemToolbar}</li>
              <li>{t.pricing.freeItemCss}</li>
              <li>{t.pricing.freeItemAiDemo}</li>
            </ul>
            <Badge variant="info" className="mt-4">
              {t.pricing.freeBadge}
            </Badge>
          </Card>

          <Card className="ink-pricing-card ink-pricing-card--premium p-6">
            <Flex align="center" gap={2} className="mb-2">
              <Typography variant="h3" className="font-semibold mb-0">
                {t.pricing.premiumTitle}
              </Typography>
              <Badge variant="success">{t.pricing.premiumBadge}</Badge>
            </Flex>
            <Typography variant="body2" className="ink-text-muted mb-4">
              {t.pricing.premiumBody}
            </Typography>
            <ul className="ink-pricing-list">
              <li>{t.pricing.premiumItemTheme}</li>
              <li>{t.pricing.premiumItemIcons}</li>
              <li>{t.pricing.premiumItemPaste}</li>
              <li>{t.pricing.premiumItemUpload}</li>
              <li>{t.pricing.premiumItemWysiwyg}</li>
              <li>{t.pricing.premiumItemAuto}</li>
            </ul>
            <Flex gap={2} className="mt-6 flex-wrap">
              <a href={checkoutHref} target="_blank" rel="noopener noreferrer">
                <Button variant="ink">{t.pricing.ctaPaypal}</Button>
              </a>
              {stripeHref ? (
                <a href={stripeHref} target="_blank" rel="noopener noreferrer">
                  <Button variant="inkOutline">{t.pricing.ctaStripe}</Button>
                </a>
              ) : null}
              <Link to={ROUTES.PREMIUM_SUCCESS}>
                <Button variant="ghost">{t.pricing.ctaSimulate}</Button>
              </Link>
            </Flex>
            {!PAYPAL_PAYMENT_LINK ? (
              <Typography variant="caption" className="ink-text-muted block mt-3">
                {t.pricing.ctaPaypalHint}
              </Typography>
            ) : null}
          </Card>
        </div>

        <section className="ink-paper p-6 mb-8">
          <Typography variant="h4" className="font-semibold mb-3">
            {t.pricing.autoTitle}
          </Typography>
          <ol className="ink-pricing-steps mb-4">
            <li>{t.pricing.autoStep1}</li>
            <li>{t.pricing.autoStep2}</li>
            <li>{t.pricing.autoStep3}</li>
            <li>{t.pricing.autoStep4}</li>
          </ol>
          <Typography variant="caption" className="ink-text-muted block mb-2">
            {t.pricing.autoReturnLabel}
          </Typography>
          <pre className="ink-code">{PREMIUM_SUCCESS_URL}</pre>
        </section>

        <section className="ink-paper p-6 mb-8">
          <Typography variant="h4" className="font-semibold mb-3">
            {t.pricing.paypalTitle}
          </Typography>
          <ol className="ink-pricing-steps mb-4">
            <li>{t.pricing.paypalStep1}</li>
            <li>{t.pricing.paypalStep2}</li>
            <li>{t.pricing.paypalStep3}</li>
            <li>{t.pricing.paypalStep4}</li>
          </ol>
          <Flex gap={4} className="flex-wrap">
            <a href={PAYPAL_BUSINESS_URL} target="_blank" rel="noopener noreferrer" className="ink-doc-link">
              {t.pricing.paypalBusiness}
            </a>
            <a href={PAYPAL_BUTTONS_URL} target="_blank" rel="noopener noreferrer" className="ink-doc-link">
              {t.pricing.paypalButtons}
            </a>
          </Flex>
        </section>

        <section className="ink-paper p-6">
          <Typography variant="h4" className="font-semibold mb-3">
            {t.pricing.howTitle}
          </Typography>
          <Typography variant="body2" className="ink-text-muted mb-4">
            {t.pricing.howPortalNote}
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
      </div>
    </Layout>
  );
};
