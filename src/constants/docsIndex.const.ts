import { ROUTES } from './routes.const';

export interface DocsIndexEntry {
  id: string;
  title: string;
  keywords: string[];
  hash: string;
}

export const DOCS_TOC = [
  { id: 'installation', labelKey: 'tocInstallation' as const },
  { id: 'quickstart', labelKey: 'tocQuickstart' as const },
  { id: 'configuration', labelKey: 'tocConfiguration' as const },
  { id: 'toolbar', labelKey: 'tocToolbar' as const },
  { id: 'modules', labelKey: 'tocModules' as const },
  { id: 'tables', labelKey: 'tocTables' as const },
  { id: 'track-changes', labelKey: 'tocTrackChanges' as const },
  { id: 'comments', labelKey: 'tocComments' as const },
  { id: 'blocks', labelKey: 'tocBlocks' as const },
  { id: 'themes', labelKey: 'tocThemes' as const },
  { id: 'typo', labelKey: 'tocTypo' as const },
  { id: 'ai', labelKey: 'tocAi' as const },
  { id: 'angular', labelKey: 'tocAngular' as const },
  { id: 'wordpress', labelKey: 'tocWordpress' as const },
  { id: 'accessibility', labelKey: 'tocA11y' as const },
] as const;

export const DOCS_INDEX: DocsIndexEntry[] = [
  {
    id: 'installation',
    title: 'Installation',
    keywords: ['install', 'npm', 'package', 'setup'],
    hash: 'installation',
  },
  {
    id: 'quickstart',
    title: 'Quickstart',
    keywords: ['quickstart', 'hello', 'basic', 'example'],
    hash: 'quickstart',
  },
  {
    id: 'configuration',
    title: 'Configuration',
    keywords: ['props', 'config', 'value', 'onchange', 'variant', 'features'],
    hash: 'configuration',
  },
  {
    id: 'toolbar',
    title: 'Toolbar & Formats',
    keywords: ['toolbar', 'formats', 'bold', 'heading', 'list', 'table'],
    hash: 'toolbar',
  },
  {
    id: 'modules',
    title: 'Modules & features',
    keywords: ['modules', 'features', 'table', 'comments', 'track', 'ai'],
    hash: 'modules',
  },
  {
    id: 'tables',
    title: 'Tables',
    keywords: ['table', 'grid', 'cells'],
    hash: 'tables',
  },
  {
    id: 'track-changes',
    title: 'Track changes',
    keywords: ['track', 'changes', 'ins', 'del', 'accept', 'reject'],
    hash: 'track-changes',
  },
  {
    id: 'comments',
    title: 'Comments',
    keywords: ['comments', 'threads', 'archive', 'highlight'],
    hash: 'comments',
  },
  {
    id: 'blocks',
    title: 'Blocks & slash',
    keywords: ['blocks', 'slash', 'handles', 'document'],
    hash: 'blocks',
  },
  {
    id: 'themes',
    title: 'Themes',
    keywords: ['theme', 'css', 'variables', 'snow', 'dark', 'minimal'],
    hash: 'themes',
  },
  {
    id: 'typo',
    title: 'Typo auto-fix',
    keywords: ['typo', 'spell', 'autofix', 'dictionary'],
    hash: 'typo',
  },
  {
    id: 'ai',
    title: 'Ink AI',
    keywords: ['ai', 'provider', 'chat', 'review', 'translate', 'demo'],
    hash: 'ai',
  },
  {
    id: 'angular',
    title: 'Angular',
    keywords: ['angular', 'adapter', 'bridge'],
    hash: 'angular',
  },
  {
    id: 'wordpress',
    title: 'WordPress',
    keywords: ['wordpress', 'plugin', 'gutenberg'],
    hash: 'wordpress',
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    keywords: ['a11y', 'aria', 'keyboard'],
    hash: 'accessibility',
  },
  {
    id: 'demos',
    title: 'Demos',
    keywords: ['demos', 'examples', 'ckeditor'],
    hash: ROUTES.DEMOS.replace('/', ''),
  },
];

export const docsHref = (hash: string): string =>
  hash.startsWith('/') ? hash : `${ROUTES.DOCS}#${hash}`;
