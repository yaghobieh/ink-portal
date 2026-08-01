import { useState, type FC } from 'react';
import { Link } from '@forgedevstack/forge-compass/react';
import { Button, Flex, Typography } from '@forgedevstack/bear';
import { InkEditor, INK_DEFAULT_TOOLBAR } from '@forgedevstack/ink';
import type { InkCommentThread } from '@forgedevstack/ink';
import { Layout } from '@components/Layout';
import { useI18n } from '@i18n/index';
import {
  HERO_EDITOR_MIN_HEIGHT_PX,
  HERO_IMG_SRC,
  INK_VERSION,
  LOGO_SRC,
  ROUTES,
  THEME_CLASS_SNOW,
} from '@const/index';

const HERO_DEFAULT =
  '<h2>Ink 1.1</h2><p>Write with <strong>ForgeStack</strong> — CKEditor-inspired shell, comments archive, and Ink AI with a local demo provider.</p><p>Select text to comment, open AI for rewrite / review / translate, or type <code>/</code> for slash commands.</p>';

export const Home: FC = () => {
  const { t } = useI18n();
  const [value, setValue] = useState(HERO_DEFAULT);
  const [comments, setComments] = useState<InkCommentThread[]>([]);

  return (
    <Layout>
      <div className="fade-in">
        <section className="relative overflow-hidden border-b border-slate-200/80 bg-white">
          <div
            className="absolute inset-0 opacity-[0.4] pointer-events-none"
            style={{
              backgroundImage: `url(${HERO_IMG_SRC})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/90 to-[#fafafa]" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 md:pt-20 pb-12 text-center">
            <img
              src={LOGO_SRC}
              alt={t.brand}
              width={88}
              height={88}
              className="mx-auto mb-5 w-20 h-20 md:w-22 md:h-22 rounded-2xl object-cover shadow-sm"
            />
            <Typography
              variant="h1"
              className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-3"
            >
              {t.brand}
            </Typography>
            <Typography variant="h3" className="text-xl md:text-2xl font-medium text-slate-800 mb-3">
              {t.tagline}
            </Typography>
            <Typography variant="body1" className="text-slate-500 max-w-2xl mx-auto mb-6">
              {t.heroSupport}
            </Typography>
            <Typography variant="caption" className="text-teal-700/80 mb-8 block font-mono">
              @forgedevstack/ink@{INK_VERSION}
            </Typography>
            <Flex gap={2} justify="center" className="mb-10 flex-wrap">
              <Link to={ROUTES.DEMOS}>
                <Button size="lg">{t.ctaDemos}</Button>
              </Link>
              <Link to={ROUTES.AI}>
                <Button size="lg" variant="outline">
                  {t.ctaAi}
                </Button>
              </Link>
              <Link to={ROUTES.DOCS}>
                <Button size="lg" variant="outline">
                  {t.ctaDocs}
                </Button>
              </Link>
            </Flex>
            <Typography variant="caption" className="text-slate-400 mb-3 block">
              {t.home.liveDemo}
            </Typography>
            <div className={`ink-paper ink-hero-editor text-left ${THEME_CLASS_SNOW}`}>
              <InkEditor
                value={value}
                onChange={setValue}
                minHeight={HERO_EDITOR_MIN_HEIGHT_PX}
                toolbar={INK_DEFAULT_TOOLBAR}
                typoAutoFix
                showCharCount
                features={{
                  table: true,
                  trackChanges: true,
                  comments: true,
                  ai: true,
                  blocks: true,
                  slash: true,
                }}
                comments={comments}
                onCommentsChange={setComments}
                showCommentsPanel
                ai={{ enabled: true, placement: 'sidebar', openOnInit: true, showHistory: true }}
                placeholder="Start writing…"
              />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};
