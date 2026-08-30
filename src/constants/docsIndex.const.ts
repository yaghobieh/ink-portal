import { ROUTES } from './routes.const';
import { DEFAULT_DOCS_SLUG, DOCS_PAGES } from './docsContent.const';
import type { DocsIndexEntry } from './docsIndex.types';

export const DOCS_TOC = DOCS_PAGES.map((page) => ({
  id: page.id,
  labelKey: page.labelKey,
}));

export const DOCS_INDEX: DocsIndexEntry[] = [
  {
    id: 'installation',
    title: 'Installation',
    keywords: ['install', 'npm', 'package', 'setup'],
    path: `${ROUTES.DOCS}/installation`,
  },
  {
    id: 'quickstart',
    title: 'Quickstart',
    keywords: ['quickstart', 'hello', 'basic', 'example'],
    path: `${ROUTES.DOCS}/quickstart`,
  },
  {
    id: 'configuration',
    title: 'Configuration',
    keywords: ['props', 'config', 'value', 'onchange', 'variant', 'features'],
    path: `${ROUTES.DOCS}/configuration`,
  },
  {
    id: 'toolbar',
    title: 'Toolbar & Formats',
    keywords: ['toolbar', 'formats', 'bold', 'heading', 'list', 'table'],
    path: `${ROUTES.DOCS}/toolbar`,
  },
  {
    id: 'modules',
    title: 'Modules & features',
    keywords: ['modules', 'features', 'table', 'comments', 'track', 'ai'],
    path: `${ROUTES.DOCS}/modules`,
  },
  {
    id: 'tables',
    title: 'Tables',
    keywords: ['table', 'grid', 'cells'],
    path: `${ROUTES.DOCS}/tables`,
  },
  {
    id: 'track-changes',
    title: 'Track changes',
    keywords: ['track', 'changes', 'ins', 'del', 'accept', 'reject'],
    path: `${ROUTES.DOCS}/track-changes`,
  },
  {
    id: 'comments',
    title: 'Comments',
    keywords: ['comments', 'threads', 'archive', 'highlight'],
    path: `${ROUTES.DOCS}/comments`,
  },
  {
    id: 'blocks',
    title: 'Blocks & slash',
    keywords: ['blocks', 'slash', 'handles', 'document'],
    path: `${ROUTES.DOCS}/blocks`,
  },
  {
    id: 'sign-pad',
    title: 'Sign pad',
    keywords: ['signature', 'sign', 'pad', 'canvas', 'png', 'image'],
    path: `${ROUTES.DOCS}/sign-pad`,
  },
  {
    id: 'keep-in-memory',
    title: 'Keep in memory',
    keywords: ['memory', 'localstorage', 'draft', 'persist', 'keepInMemory'],
    path: `${ROUTES.DOCS}/keep-in-memory`,
  },
  {
    id: 'find-replace',
    title: 'Find & replace',
    keywords: ['find', 'replace', 'search', 'text'],
    path: `${ROUTES.DOCS}/find-replace`,
  },
  {
    id: 'themes',
    title: 'Themes',
    keywords: ['theme', 'css', 'variables', 'snow', 'dark', 'minimal'],
    path: `${ROUTES.DOCS}/themes`,
  },
  {
    id: 'typo',
    title: 'Typo auto-fix',
    keywords: ['typo', 'spell', 'autofix', 'dictionary'],
    path: `${ROUTES.DOCS}/typo`,
  },
  {
    id: 'ai',
    title: 'Ink AI',
    keywords: ['ai', 'provider', 'chat', 'review', 'translate', 'demo'],
    path: `${ROUTES.DOCS}/ai`,
  },
  {
    id: 'plugins',
    title: 'Plugins',
    keywords: ['plugin', 'excel', 'ink-excel', 'csv', 'npm', 'git', '.ink'],
    path: `${ROUTES.DOCS}/plugins`,
  },
  {
    id: 'angular',
    title: 'Angular',
    keywords: ['angular', 'adapter', 'bridge'],
    path: `${ROUTES.DOCS}/angular`,
  },
  {
    id: 'wordpress',
    title: 'WordPress',
    keywords: ['wordpress', 'plugin', 'gutenberg'],
    path: `${ROUTES.DOCS}/wordpress`,
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    keywords: ['a11y', 'aria', 'keyboard'],
    path: `${ROUTES.DOCS}/accessibility`,
  },
  {
    id: 'premium',
    title: 'Premium',
    keywords: ['premium', 'license', 'theme', 'icons', 'paste', 'polar', 'billing'],
    path: `${ROUTES.DOCS}/premium`,
  },
  {
    id: 'demos',
    title: 'Demos',
    keywords: ['demos', 'examples', 'editor'],
    path: ROUTES.DEMOS,
  },
  {
    id: 'pricing',
    title: 'Pricing',
    keywords: ['pricing', 'polar', 'lemon', 'israel', 'stripe', 'apple pay'],
    path: ROUTES.PRICING,
  },
];

export const docsHref = (slugOrPath: string): string => {
  if (slugOrPath.startsWith('/')) return slugOrPath;
  return `${ROUTES.DOCS}/${slugOrPath || DEFAULT_DOCS_SLUG}`;
};

export const docsPath = (slug: string): string => `${ROUTES.DOCS}/${slug}`;
