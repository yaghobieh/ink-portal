import type { FC } from 'react';
import { Badge, Button, Card, Flex, Typography } from '@forgedevstack/bear';
import { Layout } from '@components/Layout';
import { useI18n } from '@i18n/index';
import {
  INK_PREMIUM_LICENSE_EXAMPLE,
  STRIPE_APPLE_PAY_DOCS_URL,
  STRIPE_ATLAS_URL,
  STRIPE_COUNTRIES_URL,
  STRIPE_DASHBOARD_URL,
  STRIPE_GOOGLE_PAY_DOCS_URL,
  STRIPE_PAYMENT_LINK,
  STRIPE_PAYMENT_LINKS_URL,
} from '@const/index';

export const Pricing: FC = () => {
  const { t } = useI18n();
  const checkoutHref = STRIPE_PAYMENT_LINK || STRIPE_PAYMENT_LINKS_URL;

  return (
    <Layout>
      <div className="fade-in max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Typography variant="h1" className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
          {t.pricing.title}
        </Typography>
        <Typography variant="body1" className="ink-text-muted mb-10 max-w-2xl text-lg">
          {t.pricing.description}
        </Typography>

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
            </ul>
            <Flex gap={2} className="mt-6 flex-wrap">
              <a href={checkoutHref} target="_blank" rel="noopener noreferrer">
                <Button variant="ink">{t.pricing.ctaStripe}</Button>
              </a>
              <a href={STRIPE_DASHBOARD_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="inkOutline">{t.pricing.ctaDashboard}</Button>
              </a>
            </Flex>
            {!STRIPE_PAYMENT_LINK ? (
              <Typography variant="caption" className="ink-text-muted block mt-3">
                {t.pricing.ctaStripeHint}
              </Typography>
            ) : null}
          </Card>
        </div>

        <section className="ink-paper p-6 mb-8">
          <Typography variant="h4" className="font-semibold mb-3">
            {t.pricing.stripeTitle}
          </Typography>
          <ol className="ink-pricing-steps mb-4">
            <li>{t.pricing.stripeStep1}</li>
            <li>{t.pricing.stripeStep2}</li>
            <li>{t.pricing.stripeStep3}</li>
            <li>{t.pricing.stripeStep4}</li>
            <li>{t.pricing.stripeStep5}</li>
            <li>{t.pricing.stripeStep6}</li>
          </ol>
          <Flex gap={4} className="flex-wrap">
            <a href={STRIPE_PAYMENT_LINKS_URL} target="_blank" rel="noopener noreferrer" className="ink-doc-link">
              {t.pricing.stripeLinks}
            </a>
            <a href={STRIPE_APPLE_PAY_DOCS_URL} target="_blank" rel="noopener noreferrer" className="ink-doc-link">
              {t.pricing.stripeApple}
            </a>
            <a href={STRIPE_GOOGLE_PAY_DOCS_URL} target="_blank" rel="noopener noreferrer" className="ink-doc-link">
              {t.pricing.stripeGoogle}
            </a>
          </Flex>
        </section>

        <section className="ink-paper p-6 mb-8">
          <Typography variant="h4" className="font-semibold mb-3">
            {t.pricing.israelTitle}
          </Typography>
          <Typography variant="body1" className="ink-doc-body mb-3">
            {t.pricing.israelBody}
          </Typography>
          <Typography variant="body2" className="ink-text-muted mb-4">
            {t.pricing.israelStripe}
          </Typography>
          <Flex gap={4} className="flex-wrap">
            <a href={STRIPE_COUNTRIES_URL} target="_blank" rel="noopener noreferrer" className="ink-doc-link">
              {t.pricing.israelCountries}
            </a>
            <a href={STRIPE_ATLAS_URL} target="_blank" rel="noopener noreferrer" className="ink-doc-link">
              {t.pricing.israelAtlas}
            </a>
          </Flex>
        </section>

        <section className="ink-paper p-6">
          <Typography variant="h4" className="font-semibold mb-3">
            {t.pricing.howTitle}
          </Typography>
          <ol className="ink-pricing-steps">
            <li>{t.pricing.howStep1}</li>
            <li>{t.pricing.howStep2}</li>
            <li>{t.pricing.howStep3}</li>
            <li>{t.pricing.howStep4}</li>
          </ol>
          <pre className="ink-code mt-6">{`import { InkEditor } from '@forgedevstack/ink';

<InkEditor
  premium={{ licenseKey: '${INK_PREMIUM_LICENSE_EXAMPLE}' }}
  theme={{ accent: '#0f766e', radius: '1rem' }}
  pasteMode="rich"
  wysiwyg
  onImageUpload={async (file) => uploadToYourCdn(file)}
/>`}</pre>
        </section>
      </div>
    </Layout>
  );
};
