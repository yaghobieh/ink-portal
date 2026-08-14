import { CMS_THEME_STORAGE_KEY } from '@const/strings.const';

export const SETTINGS_THEME_STORAGE_KEY = CMS_THEME_STORAGE_KEY;

export const SETTINGS_THEME_DEFAULTS = {
  primary: '#2563eb',
  accent: '#0ea5e9',
  background: '#f4f5f7',
} as const;

export const SETTINGS_COLOR_INPUT_IDS = {
  PRIMARY: 'ink-cms-theme-primary',
  ACCENT: 'ink-cms-theme-accent',
  BACKGROUND: 'ink-cms-theme-background',
} as const;

export const SETTINGS_CSS_VARS = {
  PRIMARY: '--ink-cms-accent',
  ACCENT: '--ink-cms-bar-1',
  BACKGROUND: '--ink-cms-bg',
  ACCENT_SOFT: '--ink-cms-accent-soft',
} as const;
