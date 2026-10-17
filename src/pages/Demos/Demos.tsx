import type { FC } from 'react';
import { Link } from '@forgedevstack/forge-compass/react';
import { Button, Flex, Typography } from '@forgedevstack/bear';
import { Layout } from '@components/Layout';
import { useI18n } from '@i18n/index';
import { DEMO_CARDS, HOME_SHARE_FEATURES, ROUTES } from '@const/index';

export const Demos: FC = () => {
  const { t } = useI18n();

  return (
    <Layout>
      <div className="fade-in max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="ink-demos-hero">
          <div>
            <Typography variant="caption" className="text-teal-800 dark:text-teal-300 font-semibold tracking-wide">
              {t.demos.eyebrow}
            </Typography>
            <Typography variant="h1" className="text-4xl md:text-5xl font-bold tracking-tight mt-2 mb-3">
              {t.demos.featuredTitle}
            </Typography>
            <Typography variant="body1" className="ink-text-muted max-w-xl mb-6">
              {t.demos.description}
            </Typography>
            <Flex gap={2} className="flex-wrap">
              <Link to={ROUTES.DOCS}>
                <Button>{t.ctaDocs}</Button>
              </Link>
              <Link to={ROUTES.DEMO_AI}>
                <Button variant="outline">{t.demos.open}</Button>
              </Link>
            </Flex>
          </div>
          <img
            className="ink-demos-hero__shot"
            src="/docs/whats-new.svg"
            alt={t.home.shareAiTitle}
            width={720}
            height={400}
          />
        </div>

        <Typography variant="h2" className="text-2xl font-semibold mb-4">
          {t.demos.featuredTitle}
        </Typography>
        <div className="ink-demos-featured">
          {HOME_SHARE_FEATURES.slice(0, 3).map((feature) => (
            <Link key={feature.id} to={feature.href} className="ink-share-card">
              <img src={feature.image} alt="" className="ink-share-card__shot" />
              <Typography variant="h5" className="font-semibold mb-2">
                {t.home[feature.titleKey]}
              </Typography>
              <Typography variant="body2" className="ink-text-muted mb-0">
                {t.home[feature.bodyKey]}
              </Typography>
            </Link>
          ))}
        </div>

        <Typography variant="h2" className="text-2xl font-semibold mb-2">
          {t.demos.catalogTitle}
        </Typography>
        <Typography variant="caption" className="ink-text-muted block mb-6">
          {t.demos.mobileNote}
        </Typography>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEMO_CARDS.map((card) => {
            const copy = t.demos[card.id];
            return (
              <Link key={card.id} to={card.href} className="ink-demo-card group">
                <Typography variant="h5" className="font-semibold mb-2 group-hover:text-teal-800">
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
      </div>
    </Layout>
  );
};
