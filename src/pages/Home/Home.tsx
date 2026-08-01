import { useState, type FC } from 'react';
import { Link } from '@forgedevstack/forge-compass/react';
import { Badge, BearIcons, Button, Flex, Typography } from '@forgedevstack/bear';
import { InkEditor } from '@forgedevstack/ink';
import { Layout } from '@components/Layout';
import { useInkPremium } from '@hooks/index';
import { useI18n } from '@i18n/index';
import {
  GITHUB_URL,
  HERO_EDITOR_HTML,
  HOME_CUSTOMERS_SOON,
  HOME_EXAMPLES,
  HOME_FEATURE_IDS,
  HOME_GALLERY,
  HOME_HERO_EDITOR_MIN_HEIGHT_PX,
  HOME_HERO_TOOLBAR,
  LANDING_BG_SRC,
  LOGO_SRC,
  ROUTES,
  STACK_LABELS,
  THEME_CLASS_SNOW,
} from '@const/index';

export const Home: FC = () => {
  const { t } = useI18n();
  const { premium, active } = useInkPremium();
  const [value, setValue] = useState(HERO_EDITOR_HTML);

  const features = [
    {
      id: HOME_FEATURE_IDS[0],
      title: t.home.featureLightweightTitle,
      body: t.home.featureLightweightBody,
      Icon: BearIcons.ZapIcon,
    },
    {
      id: HOME_FEATURE_IDS[1],
      title: t.home.featureExtensibleTitle,
      body: t.home.featureExtensibleBody,
      Icon: BearIcons.LayersIcon,
    },
    {
      id: HOME_FEATURE_IDS[2],
      title: t.home.featureDeveloperTitle,
      body: t.home.featureDeveloperBody,
      Icon: BearIcons.EditIcon,
    },
  ];

  return (
    <Layout>
      <div className="fade-in ink-landing">
        <section className="ink-landing__hero">
          <div
            className="ink-landing__atmosphere"
            style={{ backgroundImage: `url(${LANDING_BG_SRC})` }}
            aria-hidden
          />
          <div className="ink-landing__veil" aria-hidden />

          <div className="ink-landing__grid">
            <div className="ink-landing__copy">
              <Flex align="center" gap={2} className="mb-8">
                <img
                  src={LOGO_SRC}
                  alt=""
                  width={40}
                  height={40}
                  className="ink-landing__mark"
                />
                <Typography variant="h5" className="ink-landing__brand">
                  {t.brand}
                </Typography>
              </Flex>

              <h1 className="ink-landing__headline">
                {t.home.headlineBefore}{' '}
                <span className="ink-landing__accent">{t.home.headlineAccent}</span>
              </h1>

              <Typography variant="body1" className="ink-landing__support">
                {t.heroSupport}
              </Typography>

              <ul className="ink-landing__features">
                {features.map(({ id, title, body, Icon }) => (
                  <li key={id} className="ink-landing__feature">
                    <span className="ink-landing__feature-icon" aria-hidden>
                      <Icon size="sm" />
                    </span>
                    <div>
                      <Typography variant="body1" className="font-semibold ink-text-strong">
                        {title}
                      </Typography>
                      <Typography variant="body2" className="ink-text-muted">
                        {body}
                      </Typography>
                    </div>
                  </li>
                ))}
              </ul>

              <Flex gap={3} className="ink-landing__ctas flex-wrap">
                <Link to={ROUTES.GET_STARTED}>
                  <Button size="lg" variant="ink">
                    {t.ctaGetStarted}
                  </Button>
                </Link>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    variant="inkOutline"
                    leftIcon={<BearIcons.GithubIcon size="sm" />}
                  >
                    {t.ctaGithub}
                  </Button>
                </a>
              </Flex>
            </div>

            <div className="ink-landing__editor-wrap">
              <div className={`ink-landing__editor ${THEME_CLASS_SNOW}`}>
                <InkEditor
                  value={value}
                  onChange={setValue}
                  minHeight={HOME_HERO_EDITOR_MIN_HEIGHT_PX}
                  toolbar={HOME_HERO_TOOLBAR}
                  typoAutoFix
                  showCharCount
                  variant="classic"
                  premium={premium}
                  pasteMode={active ? 'rich' : 'plain'}
                  wysiwyg={active}
                  features={{
                    table: true,
                    trackChanges: false,
                    comments: false,
                    ai: false,
                    blocks: true,
                    slash: true,
                  }}
                  placeholder="Start writing…"
                />
              </div>
            </div>
          </div>

          <div className="ink-landing__stack">
            <Typography variant="caption" className="ink-landing__stack-label">
              {t.home.stackTitle}
            </Typography>
            <Flex gap={6} justify="center" align="center" className="ink-landing__stack-row flex-wrap">
              {STACK_LABELS.map((label) => (
                <span key={label} className="ink-landing__stack-item">
                  {label}
                </span>
              ))}
            </Flex>
          </div>
        </section>

        <section className="ink-home-section">
          <div className="ink-home-section__inner">
            <Typography variant="h2" className="ink-home-section__title">
              {t.home.galleryTitle}
            </Typography>
            <Typography variant="body1" className="ink-home-section__body">
              {t.home.galleryBody}
            </Typography>
            <div className="ink-home-gallery">
              {HOME_GALLERY.map((item) => (
                <figure key={item.src} className="ink-home-gallery__item">
                  <img src={item.src} alt={t.home[item.altKey]} className="ink-home-gallery__img" />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="ink-home-section ink-home-section--muted">
          <div className="ink-home-section__inner">
            <Typography variant="h2" className="ink-home-section__title">
              {t.home.examplesTitle}
            </Typography>
            <Typography variant="body1" className="ink-home-section__body">
              {t.home.examplesBody}
            </Typography>
            <div className="ink-home-examples">
              {HOME_EXAMPLES.map((example) => (
                <Link key={example.id} to={example.href} className="ink-demo-card">
                  <Typography variant="h4" className="font-semibold mb-2">
                    {t.home[example.titleKey]}
                  </Typography>
                  <Typography variant="body2" className="ink-text-muted mb-4">
                    {t.home[example.bodyKey]}
                  </Typography>
                  <Typography variant="caption" className="ink-example-cta font-medium">
                    {t.home.exampleOpen} →
                  </Typography>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="ink-home-section">
          <div className="ink-home-section__inner">
            <Flex align="center" gap={2} className="mb-2">
              <Typography variant="h2" className="ink-home-section__title mb-0">
                {t.home.customersTitle}
              </Typography>
              <Badge variant="warning" className="text-xs">
                {t.home.customersSoon}
              </Badge>
            </Flex>
            <Typography variant="body1" className="ink-home-section__body">
              {t.home.customersBody}
            </Typography>
            <div className="ink-home-customers">
              {HOME_CUSTOMERS_SOON.map((name) => (
                <div key={name} className="ink-home-customers__card">
                  <Typography variant="body2" className="font-semibold ink-text-muted">
                    {name}
                  </Typography>
                  <Typography variant="caption" className="ink-text-muted">
                    {t.home.customersSoon}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};
