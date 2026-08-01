import { useEffect, useState, type FC } from 'react';
import { Link } from '@forgedevstack/forge-compass/react';
import { Badge, Button, Flex, Typography } from '@forgedevstack/bear';
import { Layout } from '@components/Layout';
import { PREMIUM_LICENSE_QUERY, useInkPremium } from '@hooks/index';
import { useI18n } from '@i18n/index';
import { ROUTES } from '@const/index';

export const PremiumSuccess: FC = () => {
  const { t } = useI18n();
  const { activate, licenseKey, active } = useInkPremium();
  const [key, setKey] = useState<string | null>(licenseKey);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get(PREMIUM_LICENSE_QUERY);
    const next = fromQuery ? activate(fromQuery) : active && licenseKey ? licenseKey : activate();
    setKey(next);
    if (params.has(PREMIUM_LICENSE_QUERY) || params.has('paid')) {
      params.delete(PREMIUM_LICENSE_QUERY);
      params.delete('paid');
      const search = params.toString();
      window.history.replaceState({}, '', `${window.location.pathname}${search ? `?${search}` : ''}`);
    }
  }, [activate, active, licenseKey]);

  return (
    <Layout>
      <div className="fade-in max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Badge variant="success" className="mb-4">
          {t.premiumSuccess.badge}
        </Badge>
        <Typography variant="h1" className="text-4xl font-bold mb-3 tracking-tight">
          {t.premiumSuccess.title}
        </Typography>
        <Typography variant="body1" className="ink-text-muted mb-6 text-lg">
          {t.premiumSuccess.body}
        </Typography>
        {key ? <pre className="ink-code mb-6">{key}</pre> : null}
        <Typography variant="body2" className="ink-text-muted mb-8">
          {t.premiumSuccess.npmNote}
        </Typography>
        <Flex gap={3} className="flex-wrap">
          <Link to={ROUTES.PLAYGROUND}>
            <Button variant="ink">{t.premiumSuccess.ctaPlayground}</Button>
          </Link>
          <Link to={ROUTES.DEMOS}>
            <Button variant="inkOutline">{t.premiumSuccess.ctaDemos}</Button>
          </Link>
        </Flex>
      </div>
    </Layout>
  );
};
