import type { FC } from 'react';
import { Link } from '@forgedevstack/forge-compass/react';
import { Typography } from '@forgedevstack/bear';
import { Layout } from '@components/Layout';
import { useI18n } from '@i18n/index';
import { ROUTES } from '@const/index';

const SECTIONS = [
  'parties',
  'free',
  'pro',
  'grant',
  'restrictions',
  'delivery',
  'payment',
  'refunds',
  'privacy',
  'warranty',
  'liability',
  'termination',
  'changes',
  'law',
  'contact',
] as const;

export const Terms: FC = () => {
  const { t } = useI18n();

  return (
    <Layout>
      <div className="fade-in max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Typography variant="h1" className="text-4xl font-bold mb-3 tracking-tight">
          {t.terms.title}
        </Typography>
        <Typography variant="caption" className="ink-text-muted block mb-4">
          {t.terms.updated}
        </Typography>
        <Typography variant="body1" className="ink-text-muted mb-8">
          {t.terms.description}
        </Typography>

        <section className="space-y-6">
          {SECTIONS.map((id) => (
            <div key={id}>
              <Typography variant="h3" className="font-semibold mb-2">
                {t.terms[`${id}Title`]}
              </Typography>
              <Typography variant="body2" className="ink-text-muted mb-0">
                {t.terms[`${id}Body`]}
              </Typography>
            </div>
          ))}
        </section>

        <Typography variant="body2" className="mt-10">
          <Link to={ROUTES.PRICING} className="ink-doc-link">
            {t.terms.backPricing}
          </Link>
        </Typography>
      </div>
    </Layout>
  );
};
