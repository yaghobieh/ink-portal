import { CMS_AVATAR_INITIALS_LENGTH } from '@const/numbers.const';
import {
  SETTINGS_CSS_VARS,
  SETTINGS_MCP_DEFAULTS,
  SETTINGS_MCP_STORAGE_KEY,
  SETTINGS_PROFILE_EMPTY,
  SETTINGS_PROFILE_EVENT,
  SETTINGS_PROFILE_STORAGE_KEY,
  SETTINGS_CHAT_SIDES,
  SETTINGS_PERMALINK_VALUES,
  SETTINGS_SITE_DEFAULTS,
  SETTINGS_SITE_EVENT,
  SETTINGS_SITE_STORAGE_KEY,
  SETTINGS_THEME_DEFAULTS,
  SETTINGS_THEME_STORAGE_KEY,
} from './SettingsPages.const';
import type {
  CmsChatSide,
  CmsMcp,
  CmsPermalinkStyle,
  CmsProfile,
  CmsSite,
  CmsThemeColors,
} from './SettingsPages.types';

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
  colorMode?: 'light' | 'dark',
): void => {
  if (!root) return;
  root.style.setProperty(SETTINGS_CSS_VARS.PRIMARY, colors.primary);
  root.style.setProperty(SETTINGS_CSS_VARS.ACCENT, colors.accent);
  const isDark =
    colorMode === 'dark' ||
    root.classList.contains('ink-cms--dark') ||
    root.getAttribute('data-color-mode') === 'dark';
  if (isDark) {
    root.style.removeProperty(SETTINGS_CSS_VARS.BACKGROUND);
  } else {
    root.style.setProperty(SETTINGS_CSS_VARS.BACKGROUND, colors.background);
  }
  root.style.setProperty(SETTINGS_CSS_VARS.ACCENT_SOFT, `${colors.primary}22`);
};

const emptyProfile = (): CmsProfile => ({
  username: SETTINGS_PROFILE_EMPTY,
  displayName: SETTINGS_PROFILE_EMPTY,
  avatarDataUrl: SETTINGS_PROFILE_EMPTY,
});

export const loadCmsProfile = (): CmsProfile => {
  try {
    const raw = localStorage.getItem(SETTINGS_PROFILE_STORAGE_KEY);
    if (!raw) return emptyProfile();
    const parsed = JSON.parse(raw) as Partial<CmsProfile>;
    const displayName =
      typeof parsed.displayName === 'string' ? parsed.displayName : SETTINGS_PROFILE_EMPTY;
    const username =
      typeof parsed.username === 'string' && parsed.username
        ? parsed.username
        : displayName;
    return {
      username,
      displayName,
      avatarDataUrl:
        typeof parsed.avatarDataUrl === 'string'
          ? parsed.avatarDataUrl
          : SETTINGS_PROFILE_EMPTY,
    };
  } catch {
    return emptyProfile();
  }
};

export const saveCmsProfile = (profile: CmsProfile): void => {
  localStorage.setItem(SETTINGS_PROFILE_STORAGE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event(SETTINGS_PROFILE_EVENT));
};

export const profileInitials = (profile: CmsProfile, fallback: string): string => {
  const source = profile.displayName || profile.username || fallback;
  return source.trim().slice(0, CMS_AVATAR_INITIALS_LENGTH).toUpperCase()
    || fallback.slice(0, CMS_AVATAR_INITIALS_LENGTH).toUpperCase();
};

const isLocale = (value: unknown): value is CmsSite['locale'] =>
  value === 'en' || value === 'es';

const isPermalink = (value: unknown): value is CmsPermalinkStyle =>
  value === SETTINGS_PERMALINK_VALUES.ID || value === SETTINGS_PERMALINK_VALUES.TITLE;

const isChatSide = (value: unknown): value is CmsChatSide =>
  value === SETTINGS_CHAT_SIDES.LEFT || value === SETTINGS_CHAT_SIDES.RIGHT;

const readHiddenNavIds = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [...SETTINGS_SITE_DEFAULTS.hiddenNavIds];
  return value.filter((id): id is string => typeof id === 'string');
};

const readString = (value: unknown, fallback: string): string =>
  typeof value === 'string' ? value : fallback;

const readBoolean = (value: unknown, fallback: boolean): boolean =>
  typeof value === 'boolean' ? value : fallback;

export const loadCmsSite = (): CmsSite => {
  try {
    const raw = localStorage.getItem(SETTINGS_SITE_STORAGE_KEY);
    if (!raw) {
      return {
        ...SETTINGS_SITE_DEFAULTS,
        hiddenNavIds: [...SETTINGS_SITE_DEFAULTS.hiddenNavIds],
      };
    }
    const parsed = JSON.parse(raw) as Partial<CmsSite>;
    return {
      siteName: readString(parsed.siteName, SETTINGS_SITE_DEFAULTS.siteName) || SETTINGS_SITE_DEFAULTS.siteName,
      tagline: readString(parsed.tagline, SETTINGS_SITE_DEFAULTS.tagline),
      seoTitle: readString(parsed.seoTitle, SETTINGS_SITE_DEFAULTS.seoTitle),
      seoDescription: readString(parsed.seoDescription, SETTINGS_SITE_DEFAULTS.seoDescription),
      logoDataUrl: readString(parsed.logoDataUrl, SETTINGS_SITE_DEFAULTS.logoDataUrl),
      permalinkStyle: isPermalink(parsed.permalinkStyle)
        ? parsed.permalinkStyle
        : SETTINGS_SITE_DEFAULTS.permalinkStyle,
      locale: isLocale(parsed.locale) ? parsed.locale : SETTINGS_SITE_DEFAULTS.locale,
      timezone: readString(parsed.timezone, SETTINGS_SITE_DEFAULTS.timezone),
      dateFormat: readString(parsed.dateFormat, SETTINGS_SITE_DEFAULTS.dateFormat),
      fromEmail: readString(parsed.fromEmail, SETTINGS_SITE_DEFAULTS.fromEmail),
      chatSide: isChatSide(parsed.chatSide)
        ? parsed.chatSide
        : SETTINGS_SITE_DEFAULTS.chatSide,
      hiddenNavIds: readHiddenNavIds(parsed.hiddenNavIds),
      anyoneCanRegister: readBoolean(
        parsed.anyoneCanRegister,
        SETTINGS_SITE_DEFAULTS.anyoneCanRegister,
      ),
      searchEngineVisible: readBoolean(
        parsed.searchEngineVisible,
        SETTINGS_SITE_DEFAULTS.searchEngineVisible,
      ),
      allowComments: readBoolean(parsed.allowComments, SETTINGS_SITE_DEFAULTS.allowComments),
      showTopNav: readBoolean(parsed.showTopNav, SETTINGS_SITE_DEFAULTS.showTopNav),
      showBottomNav: readBoolean(parsed.showBottomNav, SETTINGS_SITE_DEFAULTS.showBottomNav),
      showAgent: readBoolean(parsed.showAgent, SETTINGS_SITE_DEFAULTS.showAgent),
    };
  } catch {
    return {
      ...SETTINGS_SITE_DEFAULTS,
      hiddenNavIds: [...SETTINGS_SITE_DEFAULTS.hiddenNavIds],
    };
  }
};

export const saveCmsSite = (site: CmsSite): void => {
  localStorage.setItem(SETTINGS_SITE_STORAGE_KEY, JSON.stringify(site));
  window.dispatchEvent(new Event(SETTINGS_SITE_EVENT));
};

export const loadCmsMcp = (): CmsMcp => {
  try {
    const raw = localStorage.getItem(SETTINGS_MCP_STORAGE_KEY);
    if (!raw) return { ...SETTINGS_MCP_DEFAULTS };
    const parsed = JSON.parse(raw) as Partial<CmsMcp>;
    return {
      enabled:
        typeof parsed.enabled === 'boolean'
          ? parsed.enabled
          : SETTINGS_MCP_DEFAULTS.enabled,
    };
  } catch {
    return { ...SETTINGS_MCP_DEFAULTS };
  }
};

export const saveCmsMcp = (mcp: CmsMcp): void => {
  localStorage.setItem(SETTINGS_MCP_STORAGE_KEY, JSON.stringify(mcp));
};
