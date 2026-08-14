import { useState, type FC } from 'react';
import { Link } from '@forgedevstack/forge-compass/react';
import { Button, Flex, Typography } from '@forgedevstack/bear';
import {
  InkEditor,
  INK_AI_MODEL_CATALOG,
  INK_AI_OPENAI_MODEL_GPT_4_1_MINI,
  INK_COLLAB_TOOLBAR,
  type InkAiModelCatalogEntry,
} from '@forgedevstack/ink';
import { registerPortalAiProviders, resolvePortalAiProviderId } from '@/ai/index';
import { Layout } from '@components/Layout';
import { useInkPremium } from '@hooks/index';
import { useI18n } from '@i18n/index';
import { DEMO_HTML_AI, HERO_EDITOR_MIN_HEIGHT_PX, ROUTES, THEME_CLASS_SNOW } from '@const/index';

registerPortalAiProviders();

export const Ai: FC = () => {
  const { t } = useI18n();
  const { premium, active } = useInkPremium();
  const [value, setValue] = useState(DEMO_HTML_AI);
  const modelCatalog: InkAiModelCatalogEntry[] = INK_AI_MODEL_CATALOG;
  const providerId = resolvePortalAiProviderId();

  const features = [
    { title: t.ai.chatTitle, body: t.ai.chatBody },
    { title: t.ai.reviewTitle, body: t.ai.reviewBody },
    { title: t.ai.translateTitle, body: t.ai.translateBody },
    { title: t.ai.quickTitle, body: t.ai.quickBody },
    { title: t.ai.modelsTitle, body: t.ai.modelsBody },
    { title: t.ai.costTitle, body: t.ai.costBody },
    { title: t.ai.securityTitle, body: t.ai.securityBody },
  ];

  return (
    <Layout>
      <div className="fade-in">
        <section className="border-b border-slate-200/80 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <Typography variant="caption" className="text-teal-700 font-mono mb-3 block">
              @forgedevstack/ink/plugins/ai
            </Typography>
            <Typography variant="h1" className="text-4xl md:text-5xl font-bold tracking-tight mb-3 max-w-3xl">
              {t.ai.headline}
            </Typography>
            <Typography variant="body1" className="text-slate-500 max-w-2xl mb-4">
              {t.ai.description}
            </Typography>
            <Typography variant="body2" className="text-amber-900/80 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 max-w-3xl mb-8">
              {t.ai.honesty}
            </Typography>
            <Flex gap={2} className="mb-12 flex-wrap">
              <a href="#live-demo">
                <Button size="lg" variant="ink">
                  {t.ai.tryDemo}
                </Button>
              </a>
              <Link to={ROUTES.DOCS}>
                <Button size="lg" variant="inkOutline">
                  {t.ctaDocs}
                </Button>
              </Link>
            </Flex>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
              {features.map((feature) => (
                <article key={feature.title} className="ink-demo-card">
                  <Typography variant="h5" className="font-semibold mb-2">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" className="text-slate-500">
                    {feature.body}
                  </Typography>
                </article>
              ))}
            </div>

            <Typography variant="h3" className="text-xl font-semibold mb-3">
              {t.ai.modelsTitle}
            </Typography>
            <div className="ink-paper p-4 mb-12 overflow-x-auto">
              <div className="flex flex-wrap gap-2">
                {modelCatalog.slice(0, 16).map((model) => (
                  <span
                    key={model.id}
                    className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {model.label}
                  </span>
                ))}
              </div>
            </div>

            <Typography id="live-demo" variant="h3" className="text-xl font-semibold mb-3 scroll-mt-24">
              {t.ai.liveDemo}
            </Typography>
            <div className={`${THEME_CLASS_SNOW} ink-paper ink-hero-editor`}>
              <InkEditor
                value={value}
                onChange={setValue}
                minHeight={HERO_EDITOR_MIN_HEIGHT_PX}
                toolbar={INK_COLLAB_TOOLBAR}
                premium={premium}
                pasteMode={active ? 'rich' : 'plain'}
                wysiwyg={active}
                features={{
                  table: true,
                  trackChanges: false,
                  comments: false,
                  ai: true,
                  blocks: true,
                  slash: true,
                }}
                ai={{
                  enabled: true,
                  placement: 'sidebar',
                  openOnInit: true,
                  showHistory: true,
                  autocomplete: true,
                  providerId,
                  modelId: INK_AI_OPENAI_MODEL_GPT_4_1_MINI,
                }}
                typoAutoFix
              />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};
