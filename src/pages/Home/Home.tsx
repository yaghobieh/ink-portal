import { useState, type FC } from 'react';
import { Link } from '@forgedevstack/forge-compass/react';
import { Button, Flex, Typography } from '@forgedevstack/bear';
import { InkEditor } from '@forgedevstack/ink';
import { Layout } from '@components/Layout';
import { useI18n } from '@i18n/index';
import {
  HERO_EDITOR_MIN_HEIGHT_PX,
  HERO_IMG_SRC,
  INK_VERSION,
  ROUTES,
  THEME_CLASS_SNOW,
} from '@const/index';

const HERO_DEFAULT =
  '<h2>Ink</h2><p>Write with <strong>ForgeStack</strong>. Try typing <em>teh</em> then blur — typo auto-fix kicks in.</p><p>Bold, lists, links, colors — a light Quill-inspired editor for React.</p>';

export const Home: FC = () => {
  const { t } = useI18n();
  const [value, setValue] = useState(HERO_DEFAULT);

  return (
    <Layout>
      <div className="fade-in">
        <section className="relative overflow-hidden border-b border-slate-200/80 bg-white">
          <div
            className="absolute inset-0 opacity-[0.35] pointer-events-none"
            style={{
              backgroundImage: `url(${HERO_IMG_SRC})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/92 to-[#fafafa]" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-10 text-center">
            <Typography
              variant="h1"
              className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-4"
            >
              {t.brand}
            </Typography>
            <Typography variant="h3" className="text-xl md:text-2xl font-medium text-slate-800 mb-3">
              {t.tagline}
            </Typography>
            <Typography variant="body1" className="text-slate-500 max-w-2xl mx-auto mb-8">
              {t.heroSupport}
            </Typography>
            <Typography variant="caption" className="text-teal-700/80 mb-8 block font-mono">
              @forgedevstack/ink@{INK_VERSION}
            </Typography>
            <Flex gap={2} justify="center" className="mb-12">
              <Link to={ROUTES.DOCS}>
                <Button size="lg">{t.ctaDocs}</Button>
              </Link>
              <Link to={ROUTES.PLAYGROUND}>
                <Button size="lg" variant="outline">
                  {t.ctaPlayground}
                </Button>
              </Link>
            </Flex>
            <div className={`ink-paper ink-hero-editor text-left ${THEME_CLASS_SNOW}`}>
              <InkEditor
                value={value}
                onChange={setValue}
                minHeight={HERO_EDITOR_MIN_HEIGHT_PX}
                typoAutoFix
                showCharCount
                placeholder="Start writing…"
              />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};
