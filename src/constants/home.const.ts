import type { ToolbarOption } from '@forgedevstack/ink';
import { INK_SIMPLE_TOOLBAR } from '@forgedevstack/ink';
import { EDITOR_DEMO_SRC } from './strings.const';

export const HERO_EDITOR_HTML = `<h1>Ink Editor</h1>
<p>A modern rich text editor built for <strong>performance</strong> and <em>simplicity</em>. Nestable blocks, slash commands, and a clean API — so writing just feels right.</p>
<ul>
<li><strong>Lightweight</strong> — tiny footprint, no bloat</li>
<li><strong>Extensible</strong> — plugins for AI, comments, and more</li>
<li><strong>Developer Friendly</strong> — TypeScript-first React API</li>
</ul>
<blockquote>Write less configuration. Ship more product.</blockquote>`;

export const STACK_LABELS = ['React', 'Vue', 'Svelte', 'Next.js', 'Angular'] as const;

export const HOME_FEATURE_IDS = ['lightweight', 'extensible', 'developer'] as const;

export const HOME_AI_MEDIA_SRC = EDITOR_DEMO_SRC;

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
  ...INK_SIMPLE_TOOLBAR,
  'divider',
  'blockquote',
  'link',
  'code',
  'divider',
  'signature',
  'findReplace',
  'horizontalRule',
];

export const HOME_GALLERY: Array<{
  src: string;
  altKey: 'galleryDemo';
  labelKey: 'galleryDemoLabel';
  tall: boolean;
  wide?: boolean;
}> = [
  {
    src: '/ink-editor-demo.gif',
    altKey: 'galleryDemo',
    labelKey: 'galleryDemoLabel',
    tall: false,
    wide: true,
  },
];

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
