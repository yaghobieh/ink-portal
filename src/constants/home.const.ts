import type { ToolbarOption } from '@forgedevstack/ink';

export const HERO_EDITOR_HTML = `<h1>Ink 1.2.0</h1>
<p>Select this sentence and ask Ink AI to improve it. Export the page as Markdown or Word when it is ready to share.</p>
<ul>
<li><b>Selection AI</b> — Improve, Shorter, Longer, Fix, Tone, and Translate on the highlight.</li>
<li><b>Markdown, Word, PDF</b> — import, export, and paste from Office without the styling junk.</li>
<li><b>Versions and @mentions</b> — save a snapshot, then mention a collaborator.</li>
</ul>
<blockquote class="Ink-callout"><p>The document can leave the editor.</p></blockquote>
<h2>What is new in 1.2.0</h2>
<p>Format painter, change case, image captions, comment resolve, and table cell merge are on the toolbar and the cell menu.</p>`;

export const STACK_LABELS = ['React', 'Vue', 'Svelte', 'Next.js', 'Angular'] as const;

export const HOME_FEATURE_IDS = ['lightweight', 'extensible', 'developer'] as const;

export const HOME_AI_GIF_SRC = '/ink-ai-demo.gif';

import type { HomeAiFeature, HomeAiFeatureBodyKey, HomeAiFeatureKey } from './home.types';

export type { HomeAiFeature, HomeAiFeatureBodyKey, HomeAiFeatureKey } from './home.types';

export const HOME_AI_FEATURES: HomeAiFeature[] = [
  {
    id: 'autocomplete',
    titleKey: 'aiAutocompleteTitle',
    bodyKey: 'aiAutocompleteBody',
  },
  {
    id: 'generate',
    titleKey: 'aiGenerateTitle',
    bodyKey: 'aiGenerateBody',
  },
  {
    id: 'hosted',
    titleKey: 'aiHostedTitle',
    bodyKey: 'aiHostedBody',
  },
  {
    id: 'byo',
    titleKey: 'aiByoTitle',
    bodyKey: 'aiByoBody',
  },
];

export const HOME_HERO_TOOLBAR: ToolbarOption[] = [
  'headingDropdown',
  'divider',
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'divider',
  'bulletList',
  'orderedList',
  'checklist' as ToolbarOption,
  'blockquote',
  'divider',
  'image',
  'link',
  'table',
  'code',
  'divider',
  'undo',
  'redo',
  'ai',
  'importMarkdown',
  'exportMarkdown',
  'exportDocx',
  'exportPdf',
  'versions',
  'formatPainter',
  'changeCase',
];

export const HOME_HERO_FEATURES = {
  table: true,
  trackChanges: true,
  comments: true,
  ai: true,
  blocks: true,
  slash: true,
  signature: true,
  findReplace: true,
  horizontalRule: true,
  markdown: true,
  export: true,
  versionHistory: true,
  mentions: true,
  formatPainter: true,
} as const;

export const HOME_SHARE_FEATURES = [
  {
    id: 'ai',
    titleKey: 'shareAiTitle' as const,
    bodyKey: 'shareAiBody' as const,
    image: '/docs/whats-new.svg',
    href: '/demos/ai',
  },
  {
    id: 'markdown',
    titleKey: 'shareMarkdownTitle' as const,
    bodyKey: 'shareMarkdownBody' as const,
    image: '/docs/whats-new-markdown.svg',
    href: '/demos/markdown',
  },
  {
    id: 'export',
    titleKey: 'shareExportTitle' as const,
    bodyKey: 'shareExportBody' as const,
    image: '/docs/whats-new-export.svg',
    href: '/demos/feature-rich',
  },
  {
    id: 'people',
    titleKey: 'sharePeopleTitle' as const,
    bodyKey: 'sharePeopleBody' as const,
    image: '/docs/whats-new-people.svg',
    href: '/demos/collaborative',
  },
] as const;

export const HOME_GALLERY_HIGHLIGHTS = [
  {
    id: 'toolbar',
    titleKey: 'galleryHighlightToolbarTitle' as const,
    bodyKey: 'galleryHighlightToolbarBody' as const,
  },
  {
    id: 'slash',
    titleKey: 'galleryHighlightSlashTitle' as const,
    bodyKey: 'galleryHighlightSlashBody' as const,
  },
  {
    id: 'ai',
    titleKey: 'galleryHighlightAiTitle' as const,
    bodyKey: 'galleryHighlightAiBody' as const,
  },
];

export const HOME_EXAMPLES = [
  {
    id: 'feature-rich',
    href: '/demos/feature-rich',
    titleKey: 'exampleFeatureTitle' as const,
    bodyKey: 'exampleFeatureBody' as const,
  },
  {
    id: 'ai',
    href: '/demos/ai',
    titleKey: 'exampleAiTitle' as const,
    bodyKey: 'exampleAiBody' as const,
  },
  {
    id: 'collaborative',
    href: '/demos/collaborative',
    titleKey: 'exampleCollabTitle' as const,
    bodyKey: 'exampleCollabBody' as const,
  },
] as const;
