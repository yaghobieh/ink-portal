import { CMS_AVATAR_INITIALS_LENGTH } from '@const/numbers.const';
import {
  SETTINGS_CSS_VARS,
  SETTINGS_DARK_LUMINANCE_MAX,
  SETTINGS_HEX_FULL_LENGTH,
  SETTINGS_HEX_RADIX,
  SETTINGS_HEX_SHORT_LENGTH,
  SETTINGS_HEX_SLICE_BLUE_END,
  SETTINGS_HEX_SLICE_GREEN_END,
  SETTINGS_HEX_SLICE_RED_END,
  SETTINGS_LUMINANCE_BLUE,
  SETTINGS_LUMINANCE_GREEN,
  SETTINGS_LUMINANCE_RED,
  SETTINGS_MCP_DEFAULTS,
  SETTINGS_MCP_STORAGE_KEY,
  SETTINGS_PROFILE_EMPTY,
  SETTINGS_PROFILE_EVENT,
  SETTINGS_PROFILE_STORAGE_KEY,
  SETTINGS_ACCENT_SOFT_DARK,
  SETTINGS_ACCENT_SOFT_LIGHT,
  SETTINGS_API_ERROR_MODES,
  SETTINGS_SIDEBAR,
  SETTINGS_CHAT_SIDES,
  SETTINGS_PERMALINK_VALUES,
  SETTINGS_RGB_MAX,
  SETTINGS_SITE_DEFAULTS,
  SETTINGS_SITE_EVENT,
  SETTINGS_SITE_STORAGE_KEY,
  SETTINGS_THEME_DEFAULTS,
  SETTINGS_THEME_DEFAULTS_DARK,
  SETTINGS_THEME_DEFAULTS_LIGHT,
  SETTINGS_THEME_STORAGE_KEY,
  SETTINGS_CHAT_PREFS_DEFAULTS,
  SETTINGS_CHAT_PREFS_EVENT,
  SETTINGS_CHAT_SHOW,
  SETTINGS_CHAT_SOUND,
  SETTINGS_NOTIFY_DEFAULTS,
  SETTINGS_NOTIFY_PREFS_EVENT,
  SETTINGS_USER_PREFS_KEY,
} from './SettingsPages.const';
import type {
  CmsApiErrorMode,
  CmsChatPrefs,
  CmsChatShowMode,
  CmsChatSide,
  CmsChatSoundMode,
  CmsMcp,
  CmsNotifyPrefs,
  CmsPermalinkStyle,
  CmsProfile,
  CmsSite,
  CmsThemeColors,
} from './SettingsPages.types';

const isHexColor = (value: unknown): value is string =>
  typeof value === 'string' && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value);

const expandHex = (hex: string): string => {
  const raw = hex.replace('#', '');
  if (raw.length === SETTINGS_HEX_SHORT_LENGTH) {
    return raw
      .split('')
      .map((char) => `${char}${char}`)
      .join('');
  }
  return raw.padEnd(SETTINGS_HEX_FULL_LENGTH, '0').slice(0, SETTINGS_HEX_FULL_LENGTH);
};

const hexLuminance = (hex: string): number => {
  const raw = expandHex(hex);
  const red = parseInt(raw.slice(0, SETTINGS_HEX_SLICE_RED_END), SETTINGS_HEX_RADIX) / SETTINGS_RGB_MAX;
  const green =
    parseInt(raw.slice(SETTINGS_HEX_SLICE_RED_END, SETTINGS_HEX_SLICE_GREEN_END), SETTINGS_HEX_RADIX) /
    SETTINGS_RGB_MAX;
  const blue =
    parseInt(raw.slice(SETTINGS_HEX_SLICE_GREEN_END, SETTINGS_HEX_SLICE_BLUE_END), SETTINGS_HEX_RADIX) /
    SETTINGS_RGB_MAX;
  return (
    red * SETTINGS_LUMINANCE_RED +
    green * SETTINGS_LUMINANCE_GREEN +
    blue * SETTINGS_LUMINANCE_BLUE
  );
};

const isDarkThemeBackground = (hex: string): boolean =>
  hexLuminance(hex) < SETTINGS_DARK_LUMINANCE_MAX;

export const applyCmsThemeColors = (
  root: HTMLElement | null,
  colors: CmsThemeColors,
  colorMode?: 'light' | 'dark',
): void => {
  if (!root) return;
  root.style.setProperty(SETTINGS_CSS_VARS.PRIMARY, colors.primary);
  root.style.setProperty(SETTINGS_CSS_VARS.ACCENT, colors.primary);
  root.style.setProperty(SETTINGS_CSS_VARS.SIDEBAR, SETTINGS_SIDEBAR);
  const isDark =
    colorMode === 'dark' ||
    root.classList.contains('ink-cms--dark') ||
    root.getAttribute('data-color-mode') === 'dark';
  if (isDark) {
    if (isDarkThemeBackground(colors.background)) {
      root.style.setProperty(SETTINGS_CSS_VARS.BACKGROUND, colors.background);
    } else {
      root.style.setProperty(
        SETTINGS_CSS_VARS.BACKGROUND,
        SETTINGS_THEME_DEFAULTS_DARK.background,
      );
    }
  } else if (isDarkThemeBackground(colors.background)) {
    root.style.setProperty(
      SETTINGS_CSS_VARS.BACKGROUND,
      SETTINGS_THEME_DEFAULTS_LIGHT.background,
    );
  } else {
    root.style.setProperty(SETTINGS_CSS_VARS.BACKGROUND, colors.background);
  }
  root.style.setProperty(
    SETTINGS_CSS_VARS.ACCENT_SOFT,
    isDark ? SETTINGS_ACCENT_SOFT_DARK : SETTINGS_ACCENT_SOFT_LIGHT,
  );
};

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
  value === 'en' ||
  value === 'es' ||
  value === 'he' ||
  value === 'fr' ||
  value === 'de';

const isPermalink = (value: unknown): value is CmsPermalinkStyle =>
  value === SETTINGS_PERMALINK_VALUES.ID || value === SETTINGS_PERMALINK_VALUES.TITLE;

const isChatSide = (value: unknown): value is CmsChatSide =>
  value === SETTINGS_CHAT_SIDES.LEFT || value === SETTINGS_CHAT_SIDES.RIGHT;

const isApiErrorMode = (value: unknown): value is CmsApiErrorMode =>
  value === SETTINGS_API_ERROR_MODES.PAGE ||
  value === SETTINGS_API_ERROR_MODES.MODAL ||
  value === SETTINGS_API_ERROR_MODES.SNACKBAR;

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
      apiErrorMode: isApiErrorMode(parsed.apiErrorMode)
        ? parsed.apiErrorMode
        : SETTINGS_SITE_DEFAULTS.apiErrorMode,
      postsPerPage: readString(parsed.postsPerPage, SETTINGS_SITE_DEFAULTS.postsPerPage),
      homepagePath: readString(parsed.homepagePath, SETTINGS_SITE_DEFAULTS.homepagePath),
      loadingMessage: readString(parsed.loadingMessage, SETTINGS_SITE_DEFAULTS.loadingMessage),
      loadingSize:
        parsed.loadingSize === 'sm' || parsed.loadingSize === 'lg' || parsed.loadingSize === 'md'
          ? parsed.loadingSize
          : SETTINGS_SITE_DEFAULTS.loadingSize,
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

const prefsKey = (userKey: string): string => `${SETTINGS_USER_PREFS_KEY}:${userKey}`;

export const loadUserNotifyPrefs = (userKey: string): CmsNotifyPrefs => {
  try {
    const raw = localStorage.getItem(prefsKey(userKey));
    if (!raw) return { ...SETTINGS_NOTIFY_DEFAULTS };
    const parsed = JSON.parse(raw) as Partial<CmsNotifyPrefs>;
    return {
      inApp: typeof parsed.inApp === 'boolean' ? parsed.inApp : SETTINGS_NOTIFY_DEFAULTS.inApp,
      email: typeof parsed.email === 'boolean' ? parsed.email : SETTINGS_NOTIFY_DEFAULTS.email,
      showPreview:
        typeof parsed.showPreview === 'boolean'
          ? parsed.showPreview
          : SETTINGS_NOTIFY_DEFAULTS.showPreview,
    };
  } catch {
    return { ...SETTINGS_NOTIFY_DEFAULTS };
  }
};

export const saveUserNotifyPrefs = (userKey: string, prefs: CmsNotifyPrefs): void => {
  localStorage.setItem(prefsKey(userKey), JSON.stringify(prefs));
  window.dispatchEvent(new Event(SETTINGS_NOTIFY_PREFS_EVENT));
};

export const loadUserThemeColors = (userKey: string): CmsThemeColors | null => {
  try {
    const raw = localStorage.getItem(`${prefsKey(userKey)}:theme`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CmsThemeColors>;
    if (!isHexColor(parsed.primary) || !isHexColor(parsed.accent) || !isHexColor(parsed.background)) {
      return null;
    }
    return {
      primary: parsed.primary,
      accent: parsed.accent,
      background: parsed.background,
    };
  } catch {
    return null;
  }
};

export const saveUserThemeColors = (userKey: string, colors: CmsThemeColors): void => {
  localStorage.setItem(`${prefsKey(userKey)}:theme`, JSON.stringify(colors));
};

const isChatSound = (value: unknown): value is CmsChatSoundMode =>
  value === SETTINGS_CHAT_SOUND.OFF ||
  value === SETTINGS_CHAT_SOUND.PRIVATE ||
  value === SETTINGS_CHAT_SOUND.ROOM ||
  value === SETTINGS_CHAT_SOUND.ALL;

const isChatShow = (value: unknown): value is CmsChatShowMode =>
  value === SETTINGS_CHAT_SHOW.DRAWER ||
  value === SETTINGS_CHAT_SHOW.SNACKBAR ||
  value === SETTINGS_CHAT_SHOW.BOTH;

export const loadUserChatPrefs = (userKey: string): CmsChatPrefs => {
  try {
    const raw = localStorage.getItem(`${prefsKey(userKey)}:chat`);
    if (!raw) {
      return {
        sound: SETTINGS_CHAT_PREFS_DEFAULTS.sound,
        color: SETTINGS_CHAT_PREFS_DEFAULTS.color,
        show: SETTINGS_CHAT_PREFS_DEFAULTS.show,
        roomSounds: {},
      };
    }
    const parsed = JSON.parse(raw) as Partial<CmsChatPrefs>;
    return {
      sound: isChatSound(parsed.sound) ? parsed.sound : SETTINGS_CHAT_PREFS_DEFAULTS.sound,
      color: typeof parsed.color === 'string' ? parsed.color : SETTINGS_CHAT_PREFS_DEFAULTS.color,
      show: isChatShow(parsed.show) ? parsed.show : SETTINGS_CHAT_PREFS_DEFAULTS.show,
      roomSounds:
        parsed.roomSounds && typeof parsed.roomSounds === 'object' ? parsed.roomSounds : {},
    };
  } catch {
    return {
      sound: SETTINGS_CHAT_PREFS_DEFAULTS.sound,
      color: SETTINGS_CHAT_PREFS_DEFAULTS.color,
      show: SETTINGS_CHAT_PREFS_DEFAULTS.show,
      roomSounds: {},
    };
  }
};

export const saveUserChatPrefs = (userKey: string, prefs: CmsChatPrefs): void => {
  localStorage.setItem(`${prefsKey(userKey)}:chat`, JSON.stringify(prefs));
  window.dispatchEvent(new Event(SETTINGS_CHAT_PREFS_EVENT));
};
