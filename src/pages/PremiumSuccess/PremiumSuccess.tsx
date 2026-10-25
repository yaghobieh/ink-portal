import { useEffect, useState, type FC, type FormEvent } from 'react';
import { Link } from '@forgedevstack/forge-compass/react';
import { Badge, Button, Flex, Typography } from '@forgedevstack/bear';
import { Layout } from '@components/Layout';
import { useInkPremium } from '@hooks/index';
import { useI18n } from '@i18n/index';
import { ROUTES } from '@const/index';

export const PremiumSuccess: FC = () => {
  const { t } = useI18n();
  const { licenseKey, active, activate } = useInkPremium();
  const [draft, setDraft] = useState('');
  const [rejected, setRejected] = useState(false);

  useEffect(() => {
    const fromReceipt = new URLSearchParams(window.location.search).get('license_key');
    if (fromReceipt) activate(fromReceipt);
  }, [activate]);

  const save = (event: FormEvent) => {
    event.preventDefault();
    const saved = activate(draft);
    setRejected(!saved);
    if (saved) setDraft('');
  };

  return (
    <Layout>
      <div className="fade-in max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Badge variant={active ? 'success' : 'info'} className="mb-4">
          {t.premiumSuccess.badge}
        </Badge>
        <Typography variant="h1" className="text-4xl font-bold mb-3 tracking-tight">
          {t.premiumSuccess.title}
        </Typography>
        <Typography variant="body1" className="ink-text-muted mb-6 text-lg">
          {t.premiumSuccess.body}
        </Typography>
        {licenseKey ? <pre className="ink-code mb-6">{licenseKey}</pre> : null}
        <form onSubmit={save} className="mb-8">
          <label className="block mb-2" htmlFor="ink-license-key">
            <Typography variant="body2" className="font-semibold mb-0">
              {t.premiumSuccess.pasteLabel}
            </Typography>
          </label>
          <Flex gap={2} className="flex-wrap">
            <input
              id="ink-license-key"
              className="ink-code flex-1 min-w-[16rem]"
              value={draft}
              autoComplete="off"
              spellCheck={false}
              onChange={(event) => {
                setDraft(event.target.value);
                setRejected(false);
              }}
            />
            <Button variant="ink" type="submit">
              {t.premiumSuccess.pasteButton}
            </Button>
          </Flex>
          {rejected ? (
            <Typography variant="caption" className="block mt-2 text-red-600">
              {t.premiumSuccess.pasteError}
            </Typography>
          ) : null}
        </form>
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
          <Link to={ROUTES.PRICING}>
            <Button variant="ghost">{t.nav.pricing}</Button>
          </Link>
        </Flex>
      </div>
    </Layout>
  );
};
