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
    keywords: ['props', 'config', 'value', 'onchange', 'placeholder'],
    hash: 'configuration',
  },
  {
    id: 'toolbar',
    title: 'Toolbar & Formats',
    keywords: ['toolbar', 'formats', 'bold', 'heading', 'list'],
    hash: 'toolbar',
  },
  {
    id: 'modules',
    title: 'Modules',
    keywords: ['modules', 'typo', 'image', 'charcount', 'readonly'],
    hash: 'modules',
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
    title: 'AI plugin',
    keywords: ['ai', 'agent', 'plugin', 'rewrite'],
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
    keywords: ['wordpress', 'plugin', 'metabox'],
    hash: 'wordpress',
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    keywords: ['a11y', 'accessibility', 'keyboard', 'aria'],
    hash: 'accessibility',
  },
];

export const docsHref = (hash: string): string => `${ROUTES.DOCS}#${hash}`;
