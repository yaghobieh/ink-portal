import type { ToolbarOption } from '@forgedevstack/ink';

export const HERO_EDITOR_HTML = `<h1>Ink 1.1.9</h1>
<p>A collaborative rich text editor with multi-document tabs, presence avatars, real-time cursors, and Ask Ink AI.</p>
<ul>
<li><b>Multi-doc tabs</b> — seamless tab navigation across documents with drag-and-drop.</li>
<li><b>Real-time Collab</b> — live presence stack, remote cursor tracking, and state sync.</li>
<li><b>Slash & Outline</b> — type / for callouts, tables, code, and jump headings on the rail.</li>
</ul>
<blockquote class="Ink-callout"><p>Write less configuration. Ship more product.</p></blockquote>
<h2>What is new in 1.1.9</h2>
<p>InkWorkspace with useInkWorkspace hook, real-time presence avatars, themeable collaboration constants, and modular plugin architecture.</p>
<h3>Ask Ink AI</h3>
<p>Rewrite, summarize, and Tab autocomplete on the canvas.</p>`;

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
