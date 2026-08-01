import type { ToolbarOption } from '@forgedevstack/ink';
import {
  THEME_CLASS_BUBBLE,
  THEME_CLASS_DARK,
  THEME_CLASS_MINIMAL,
  THEME_CLASS_SNOW,
} from '@const/index';
import type { PlaygroundConfig, PlaygroundTheme, PlaygroundToolbarMap } from './Playground.types';

export const DEFAULT_PLAYGROUND_HTML =
  '<h2>Playground</h2><p>Toggle <strong>Formats</strong>, <em>Modules</em>, and <u>Theme</u>. Try table, comments, track changes, and AI panels.</p>';

export const DEFAULT_CONFIG: PlaygroundConfig = {
  toolbarPreset: 'full',
  typoAutoFix: true,
  allowImagePaste: true,
  showCharCount: true,
  readOnly: false,
  table: true,
  trackChanges: false,
  comments: false,
  ai: false,
  blocks: true,
  theme: 'snow',
};

export const TOOLBAR_PRESETS: PlaygroundToolbarMap = {
  full: [
    'headingDropdown',
    'divider',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'divider',
    'textColor',
    'highlightColor',
    'divider',
    'bulletList',
    'orderedList',
    'divider',
    'link',
    'image',
    'table',
    'divider',
    'undo',
    'redo',
    'divider',
    'trackChanges',
    'comments',
    'ai',
    'divider',
    'clearFormat',
  ],
  simple: ['bold', 'italic', 'underline', 'divider', 'bulletList', 'orderedList'],
  minimal: ['bold', 'italic', 'link'],
};

export const THEME_CLASS_MAP: Record<PlaygroundTheme, string> = {
  snow: THEME_CLASS_SNOW,
  bubble: THEME_CLASS_BUBBLE,
  dark: THEME_CLASS_DARK,
  minimal: THEME_CLASS_MINIMAL,
};

export const TOOLBAR_OPTIONS: {
  value: PlaygroundConfig['toolbarPreset'];
  labelKey: 'toolbarFull' | 'toolbarSimple' | 'toolbarMinimal';
}[] = [
  { value: 'full', labelKey: 'toolbarFull' },
  { value: 'simple', labelKey: 'toolbarSimple' },
  { value: 'minimal', labelKey: 'toolbarMinimal' },
];

export const THEME_OPTIONS: {
  value: PlaygroundTheme;
  labelKey: 'themeSnow' | 'themeBubble' | 'themeDark' | 'themeMinimal';
}[] = [
  { value: 'snow', labelKey: 'themeSnow' },
  { value: 'bubble', labelKey: 'themeBubble' },
  { value: 'dark', labelKey: 'themeDark' },
  { value: 'minimal', labelKey: 'themeMinimal' },
];

export const resolveToolbar = (preset: PlaygroundConfig['toolbarPreset']): ToolbarOption[] =>
  TOOLBAR_PRESETS[preset];
