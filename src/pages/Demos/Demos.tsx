import type { FC } from 'react';
import { Link } from '@forgedevstack/forge-compass/react';
import { Button, Flex, Typography } from '@forgedevstack/bear';
import { Layout } from '@components/Layout';
import { useI18n } from '@i18n/index';
import { DEMO_CARDS, ROUTES } from '@const/index';

export const Demos: FC = () => {
  const { t } = useI18n();

  return (
    <Layout>
      <div className="fade-in max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <Typography variant="h1" className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
          {t.demos.title}
        </Typography>
        <Typography variant="body1" className="ink-text-muted max-w-2xl mb-4">
          {t.demos.description}
        </Typography>
        <Typography variant="caption" className="ink-text-muted block mb-10">
          {t.demos.mobileNote}
        </Typography>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEMO_CARDS.map((card) => {
            const copy = t.demos[card.id];
            return (
              <Link key={card.id} to={card.href} className="ink-demo-card group">
                <Typography variant="h5" className="font-semibold mb-2">
                  {copy.title}
                </Typography>
                <Typography variant="body2" className="ink-text-muted mb-4">
                  {copy.description}
                </Typography>
                <Flex>
                  <Button size="sm" variant="outline">
                    {t.demos.open}
                  </Button>
                </Flex>
              </Link>
            );
          })}
        </div>
        <Flex className="mt-10" gap={2}>
          <Link to={ROUTES.AI}>
            <Button variant="outline">{t.ctaAi}</Button>
          </Link>
          <Link to={ROUTES.PLAYGROUND}>
            <Button>{t.ctaPlayground}</Button>
          </Link>
        </Flex>
      </div>
    </Layout>
  );
};
