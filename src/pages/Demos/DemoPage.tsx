import { useMemo, useState, type FC } from 'react';
import { Link, useRoute } from '@forgedevstack/forge-compass/react';
import { Button, Flex, Typography } from '@forgedevstack/bear';
import { InkEditor, INK_COLLAB_TOOLBAR, INK_DEFAULT_TOOLBAR } from '@forgedevstack/ink';
import type { InkCommentThread, InkTrackChange } from '@forgedevstack/ink';
import { Layout } from '@components/Layout';
import { useInkPremium } from '@hooks/index';
import { useI18n } from '@i18n/index';
import {
  DEMO_HTML_AI,
  DEMO_HTML_COLLAB,
  DEMO_HTML_DOCUMENT,
  DEMO_HTML_FEATURE,
  DEMO_HTML_GRAPH,
  DEMO_HTML_SHEET,
  DEMO_HTML_TABLES,
  DEMO_HTML_TITLES,
  HERO_EDITOR_MIN_HEIGHT_PX,
  MOCK_COLLAB_COMMENTS,
  MOCK_COLLAB_TRACK,
  ROUTES,
  THEME_CLASS_SNOW,
} from '@const/index';

type DemoKind =
  | 'feature-rich'
  | 'ai'
  | 'collaborative'
  | 'document'
  | 'tables'
  | 'markdown'
  | 'mobile'
  | 'titles'
  | 'sheet'
  | 'graph';

const pathToKind = (path: string): DemoKind => {
  if (path.includes('/ai')) return 'ai';
  if (path.includes('/collaborative')) return 'collaborative';
  if (path.includes('/document')) return 'document';
  if (path.includes('/tables')) return 'tables';
  if (path.includes('/markdown')) return 'markdown';
  if (path.includes('/mobile')) return 'mobile';
  if (path.includes('/titles')) return 'titles';
  if (path.includes('/sheet')) return 'sheet';
  if (path.includes('/graph')) return 'graph';
  return 'feature-rich';
};

export const DemoPage: FC = () => {
  const { t } = useI18n();
  const { premium, active } = useInkPremium();
  const route = useRoute();
  const kind = pathToKind(route?.path ?? ROUTES.DEMO_FEATURE);
  const [value, setValue] = useState(() => {
    switch (kind) {
      case 'ai':
        return DEMO_HTML_AI;
      case 'collaborative':
        return DEMO_HTML_COLLAB;
      case 'document':
        return DEMO_HTML_DOCUMENT;
      case 'tables':
        return DEMO_HTML_TABLES;
      case 'titles':
        return DEMO_HTML_TITLES;
      case 'sheet':
        return DEMO_HTML_SHEET;
      case 'graph':
        return DEMO_HTML_GRAPH;
      case 'markdown':
      case 'mobile':
        return DEMO_HTML_FEATURE;
      default:
        return DEMO_HTML_FEATURE;
    }
  });
  const [comments, setComments] = useState<InkCommentThread[]>(
    kind === 'collaborative' ? (MOCK_COLLAB_COMMENTS as InkCommentThread[]) : [],
  );
  const [trackChanges, setTrackChanges] = useState<InkTrackChange[]>(
    kind === 'collaborative' ? (MOCK_COLLAB_TRACK as InkTrackChange[]) : [],
  );
  const [showSource, setShowSource] = useState(false);

  const title = useMemo(() => {
    switch (kind) {
      case 'ai':
        return t.demos.ai.title;
      case 'collaborative':
        return t.demos.collab.title;
      case 'document':
        return t.demos.document.title;
      case 'tables':
        return t.demos.tables.title;
      case 'markdown':
        return t.demos.markdown.title;
      case 'mobile':
        return t.demos.mobile.title;
      case 'titles':
        return t.demos.titles.title;
      case 'sheet':
        return t.demos.sheet.title;
      case 'graph':
        return t.demos.graph.title;
      default:
        return t.demos.featureRich.title;
    }
  }, [kind, t]);

  const description = useMemo(() => {
    switch (kind) {
      case 'ai':
        return t.demos.ai.description;
      case 'collaborative':
        return t.demos.collab.description;
      case 'document':
        return t.demos.document.description;
      case 'tables':
        return t.demos.tables.description;
      case 'markdown':
        return t.demos.markdown.description;
      case 'mobile':
        return t.demos.mobile.description;
      case 'titles':
        return t.demos.titles.description;
      case 'sheet':
        return t.demos.sheet.description;
      case 'graph':
        return t.demos.graph.description;
      default:
        return t.demos.featureRich.description;
    }
  }, [kind, t]);

  return (
    <Layout>
      <div className="fade-in max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link to={ROUTES.DEMOS} className="text-sm text-teal-800 mb-4 inline-block">
          ← {t.demos.back}
        </Link>
        <Typography variant="h1" className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          {title}
        </Typography>
        <Typography variant="body1" className="text-slate-500 mb-6 max-w-2xl">
          {description}
        </Typography>
        {kind === 'markdown' ? (
          <Flex gap={2} className="mb-4">
            <Button size="sm" variant={showSource ? 'inkOutline' : 'ink'} onClick={() => setShowSource(false)}>
              Editor
            </Button>
            <Button size="sm" variant={showSource ? 'ink' : 'inkOutline'} onClick={() => setShowSource(true)}>
              HTML
            </Button>
          </Flex>
        ) : null}
        <div className={`${THEME_CLASS_SNOW} ink-paper ink-hero-editor ${kind === 'mobile' ? 'max-w-md mx-auto' : ''}`}>
          {showSource ? (
            <pre className="ink-code m-0 rounded-xl">{value}</pre>
          ) : (
            <InkEditor
              value={value}
              onChange={setValue}
              minHeight={HERO_EDITOR_MIN_HEIGHT_PX}
              toolbar={kind === 'collaborative' ? INK_COLLAB_TOOLBAR : INK_DEFAULT_TOOLBAR}
              variant={kind === 'document' ? 'document' : 'classic'}
              premium={premium}
              pasteMode={active ? 'rich' : 'plain'}
              wysiwyg={active}
              features={{
                table: true,
                trackChanges: kind === 'collaborative' || kind === 'feature-rich',
                comments: kind === 'collaborative' || kind === 'ai' || kind === 'feature-rich',
                ai: kind === 'ai' || kind === 'feature-rich' || kind === 'graph',
                outline: true,
                blocks: kind === 'document' || kind === 'feature-rich',
                slash: true,
                titles: true,
                excel: true,
                graph: true,
              }}
              trackChanges={trackChanges}
              onTrackChangesChange={setTrackChanges}
              trackChangesEnabled={kind === 'collaborative'}
              comments={comments}
              onCommentsChange={setComments}
              showCommentsPanel={kind === 'collaborative' || kind === 'feature-rich'}
              ai={
                kind === 'ai' || kind === 'feature-rich' || kind === 'graph'
                  ? { enabled: true, placement: 'sidebar', openOnInit: kind === 'ai', showHistory: true }
                  : undefined
              }
              author={kind === 'collaborative' ? 'Lily' : 'You'}
              typoAutoFix
              showCharCount
            />
          )}
        </div>
      </div>
    </Layout>
  );
};
