import {
  SETTINGS_CSS_VARS,
  SETTINGS_THEME_DEFAULTS,
  SETTINGS_THEME_STORAGE_KEY,
} from './SettingsPages.const';
import type { CmsThemeColors } from './SettingsPages.types';

const isHexColor = (value: unknown): value is string =>
  typeof value === 'string' && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value);

export const loadCmsThemeColors = (): CmsThemeColors => {
  try {
    const raw = localStorage.getItem(SETTINGS_THEME_STORAGE_KEY);
    if (!raw) return { ...SETTINGS_THEME_DEFAULTS };
    const parsed = JSON.parse(raw) as Partial<CmsThemeColors>;
    return {
      primary: isHexColor(parsed.primary)
        ? parsed.primary
        : SETTINGS_THEME_DEFAULTS.primary,
      accent: isHexColor(parsed.accent)
        ? parsed.accent
        : SETTINGS_THEME_DEFAULTS.accent,
      background: isHexColor(parsed.background)
        ? parsed.background
        : SETTINGS_THEME_DEFAULTS.background,
    };
  } catch {
    return { ...SETTINGS_THEME_DEFAULTS };
  }
};

export const saveCmsThemeColors = (colors: CmsThemeColors): void => {
  localStorage.setItem(SETTINGS_THEME_STORAGE_KEY, JSON.stringify(colors));
};

export const applyCmsThemeColors = (
  root: HTMLElement | null,
  colors: CmsThemeColors,
): void => {
  if (!root) return;
  root.style.setProperty(SETTINGS_CSS_VARS.PRIMARY, colors.primary);
  root.style.setProperty(SETTINGS_CSS_VARS.ACCENT, colors.accent);
  root.style.setProperty(SETTINGS_CSS_VARS.BACKGROUND, colors.background);
  root.style.setProperty(SETTINGS_CSS_VARS.ACCENT_SOFT, `${colors.primary}22`);
};
