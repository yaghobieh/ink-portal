import type { FC } from 'react';
import { Link } from '@forgedevstack/forge-compass/react';
import { Typography } from '@forgedevstack/bear';
import { Layout } from '@components/Layout';
import { useI18n } from '@i18n/index';
import { ROUTES } from '@const/index';

export const Terms: FC = () => {
  const { t } = useI18n();

  return (
    <Layout>
      <div className="fade-in max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Typography variant="h1" className="text-4xl font-bold mb-3 tracking-tight">
          {t.terms.title}
        </Typography>
        <Typography variant="body1" className="ink-text-muted mb-8">
          {t.terms.description}
        </Typography>

        <section className="space-y-6">
          <div>
            <Typography variant="h3" className="font-semibold mb-2">
              {t.terms.licensesTitle}
            </Typography>
            <Typography variant="body2" className="ink-text-muted mb-0">
              {t.terms.licensesBody}
            </Typography>
          </div>
          <div>
            <Typography variant="h3" className="font-semibold mb-2">
              {t.terms.refundsTitle}
            </Typography>
            <Typography variant="body2" className="ink-text-muted mb-0">
              {t.terms.refundsBody}
            </Typography>
          </div>
          <div>
            <Typography variant="h3" className="font-semibold mb-2">
              {t.terms.aiTitle}
            </Typography>
            <Typography variant="body2" className="ink-text-muted mb-0">
              {t.terms.aiBody}
            </Typography>
          </div>
          <div>
            <Typography variant="h3" className="font-semibold mb-2">
              {t.terms.lawTitle}
            </Typography>
            <Typography variant="body2" className="ink-text-muted mb-0">
              {t.terms.lawBody}
            </Typography>
          </div>
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
