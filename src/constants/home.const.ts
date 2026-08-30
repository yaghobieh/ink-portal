import type { ToolbarOption } from '@forgedevstack/ink';

export const HERO_EDITOR_HTML = `<h1>Ink 1.1.7</h1>
<p>A document editor with a grouped toolbar, outline rail, slash commands, and Ask Ink AI.</p>
<ul>
<li><b>Toolbar</b> — paragraph styles, format cluster, lists, media, undo, Ask Ink AI.</li>
<li><b>Slash</b> — type / for headings, tables, quotes, callouts, and image.</li>
<li><b>Outline</b> — jump headings from the rail while you write.</li>
</ul>
<blockquote class="Ink-callout"><p>Write less configuration. Ship more product.</p></blockquote>
<h2>What is new</h2>
<p>Light heading menu. Thin-stroke icons. Status bar for words, characters, and synced.</p>
<h3>Ask Ink AI</h3>
<p>Rewrite, summarize, and Tab autocomplete on the canvas.</p>`;

export const STACK_LABELS = ['React', 'Vue', 'Svelte', 'Next.js', 'Angular'] as const;

export const HOME_FEATURE_IDS = ['lightweight', 'extensible', 'developer'] as const;

export const HOME_AI_GIF_SRC = '/ink-ai-demo.gif';

export type HomeAiFeatureKey =
  | 'aiAutocompleteTitle'
  | 'aiGenerateTitle'
  | 'aiHostedTitle'
  | 'aiByoTitle';

export type HomeAiFeatureBodyKey =
  | 'aiAutocompleteBody'
  | 'aiGenerateBody'
  | 'aiHostedBody'
  | 'aiByoBody';

export const HOME_AI_FEATURES: Array<{
  id: string;
  titleKey: HomeAiFeatureKey;
  bodyKey: HomeAiFeatureBodyKey;
}> = [
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
} as const;

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
