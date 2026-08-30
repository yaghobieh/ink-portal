import type { ToolbarOption } from '@forgedevstack/ink';
import type { HomeAiFeatureBodyKey, HomeAiFeatureKey } from './home.types';

export const VERSION_PLACEHOLDER = '{version}';
export const INK_CALLOUT_CLASS = 'Ink-callout';

export const STACK_LABELS = ['React', 'Vue', 'Svelte', 'Next.js', 'Angular'] as const;

export const HOME_FEATURE_IDS = ['lightweight', 'extensible', 'developer'] as const;

export const HOME_AI_GIF_SRC = '/ink-ai-demo.gif';

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
