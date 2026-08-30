import {
  CMS_CHAT_SIDE_LEFT,
  CMS_CHAT_SIDE_RIGHT,
  CMS_CHAT_PREFS_EVENT,
  CMS_NOTIFY_PREFS_EVENT,
  CMS_PERMALINK_ID,
  CMS_PERMALINK_TITLE,
  CMS_PROFILE_STORAGE_KEY,
  CMS_THEME_STORAGE_KEY,
  CMS_SITE_STORAGE_KEY,
  CMS_MCP_STORAGE_KEY,
  CMS_PROFILE_EVENT,
  CMS_SITE_EVENT,
  EMPTY_STRING,
} from '@const/strings.const';
import { CMS_NAV_IDS } from '../CmsShell/CmsShell.const';
import { INK_API_URL } from '@const/billing.const';
import type { SettingsTabId } from './SettingsPages.types';

export const SETTINGS_THEME_STORAGE_KEY = CMS_THEME_STORAGE_KEY;
export const SETTINGS_PROFILE_STORAGE_KEY = CMS_PROFILE_STORAGE_KEY;
export const SETTINGS_SITE_STORAGE_KEY = CMS_SITE_STORAGE_KEY;
export const SETTINGS_MCP_STORAGE_KEY = CMS_MCP_STORAGE_KEY;
export const SETTINGS_PROFILE_EMPTY = EMPTY_STRING;
export const SETTINGS_PROFILE_EVENT = CMS_PROFILE_EVENT;
export const SETTINGS_SITE_EVENT = CMS_SITE_EVENT;
export const SETTINGS_CHAT_PREFS_EVENT = CMS_CHAT_PREFS_EVENT;
export const SETTINGS_NOTIFY_PREFS_EVENT = CMS_NOTIFY_PREFS_EVENT;

export const SETTINGS_TABS = {
  PROFILE: 'profile',
  CREW: 'crew',
  SITE: 'site',
  THEME: 'theme',
  MEDIA: 'media',
  MCP: 'mcp',
  API: 'api',
} as const satisfies Record<string, SettingsTabId>;

export const SETTINGS_SITE_PANELS = {
  GENERAL: 'general',
  WRITING: 'writing',
  DISCUSSION: 'discussion',
  CHROME: 'chrome',
  READING: 'reading',
  MEDIA: 'media',
} as const;

export const SETTINGS_SAVE_SOURCE = 'settings' as const;

export const SETTINGS_THEME_DEFAULTS_LIGHT = {
  primary: '#2951c4',
  accent: '#2951c4',
  background: '#f5f6f8',
} as const;

export const SETTINGS_THEME_DEFAULTS_DARK = {
  primary: '#54a0ff',
  accent: '#00d2d3',
  background: '#12192c',
} as const;

export const SETTINGS_THEME_DEFAULTS = SETTINGS_THEME_DEFAULTS_LIGHT;

export const SETTINGS_HEX_SHORT_LENGTH = 3;
export const SETTINGS_HEX_FULL_LENGTH = 6;
export const SETTINGS_HEX_RADIX = 16;
export const SETTINGS_RGB_MAX = 255;
export const SETTINGS_LUMINANCE_RED = 0.2126;
export const SETTINGS_LUMINANCE_GREEN = 0.7152;
export const SETTINGS_LUMINANCE_BLUE = 0.0722;
export const SETTINGS_DARK_LUMINANCE_MAX = 0.45;
export const SETTINGS_HEX_SLICE_RED_END = 2;
export const SETTINGS_HEX_SLICE_GREEN_END = 4;
export const SETTINGS_HEX_SLICE_BLUE_END = 6;

export const SETTINGS_SITE_DEFAULTS = {
  siteName: 'Ink CMS',
  tagline: EMPTY_STRING,
  seoTitle: 'Ink CMS',
  seoDescription: EMPTY_STRING,
  logoDataUrl: EMPTY_STRING,
  permalinkStyle: CMS_PERMALINK_TITLE,
  locale: 'en',
  timezone: 'UTC',
  dateFormat: 'YYYY-MM-DD',
  fromEmail: EMPTY_STRING,
  chatSide: CMS_CHAT_SIDE_RIGHT,
  hiddenNavIds: [] as string[],
  anyoneCanRegister: false,
  searchEngineVisible: true,
  allowComments: false,
  showTopNav: true,
  showBottomNav: false,
  showAgent: true,
  apiErrorMode: 'snackbar',
  postsPerPage: '10',
  homepagePath: '/',
  loadingMessage: EMPTY_STRING,
  loadingSize: 'md',
} as const;

export const SETTINGS_PERMALINK_VALUES = {
  ID: CMS_PERMALINK_ID,
  TITLE: CMS_PERMALINK_TITLE,
} as const;

export const SETTINGS_CHAT_SIDES = {
  LEFT: CMS_CHAT_SIDE_LEFT,
  RIGHT: CMS_CHAT_SIDE_RIGHT,
} as const;

export const SETTINGS_NAV_TOGGLE_IDS = [
  CMS_NAV_IDS.DASHBOARD,
  CMS_NAV_IDS.PAGES,
  CMS_NAV_IDS.AI_USAGE,
  CMS_NAV_IDS.BUNDLES,
  CMS_NAV_IDS.TEMPLATES,
  CMS_NAV_IDS.MEDIA,
  CMS_NAV_IDS.CREW,
  CMS_NAV_IDS.LIVE_EDIT,
  CMS_NAV_IDS.BUILDER,
  CMS_NAV_IDS.CALENDAR,
] as const;

export const SETTINGS_MCP_DEFAULTS = {
  enabled: true,
} as const;

export const SETTINGS_LOCALE_VALUES = {
  EN: 'en',
  ES: 'es',
  HE: 'he',
  FR: 'fr',
  DE: 'de',
} as const;

export const SETTINGS_NOTIFY_DEFAULTS = {
  inApp: true,
  email: false,
  showPreview: true,
} as const;

export const SETTINGS_USER_PREFS_KEY = 'ink-cms-user-prefs';

export const SETTINGS_CHAT_SOUND = {
  OFF: 'off',
  PRIVATE: 'private',
  ROOM: 'room',
  ALL: 'all',
} as const;

export const SETTINGS_CHAT_SHOW = {
  DRAWER: 'drawer',
  SNACKBAR: 'snackbar',
  BOTH: 'both',
} as const;

export const SETTINGS_CHAT_PREFS_DEFAULTS = {
  sound: SETTINGS_CHAT_SOUND.ALL,
  color: '#8b5cf6',
  show: SETTINGS_CHAT_SHOW.BOTH,
  roomSounds: {},
} as const;

export const SETTINGS_CHAT_COLOR_ID = 'ink-cms-chat-color';

export const SETTINGS_MCP_API_FALLBACK = 'http://localhost:4000';

export const SETTINGS_MCP_TOOL_NAMES = [
  'bifrost_install_status',
  'bifrost_install',
  'bifrost_api_health',
  'ink_cms_list_pages',
  'ink_cms_get_page',
  'ink_cms_create_page',
  'ink_cms_create_template',
  'ink_cms_create_document',
  'ink_cms_create_form',
  'ink_cms_delete_page',
  'ink_cms_list_tables',
] as const;

export const SETTINGS_MCP_JSON_INDENT = 2;

export const buildMcpConfigJson = (apiUrl: string): string =>
  JSON.stringify(
    {
      mcpServers: {
        bifrost: {
          command: 'npx',
          args: ['tsx', 'src/server.ts'],
          cwd: '<path-to>/bifrost/packages/mcp',
          env: {
            INK_API_URL: apiUrl || SETTINGS_MCP_API_FALLBACK,
            INK_CMS_USERNAME: EMPTY_STRING,
            INK_CMS_PASSWORD: EMPTY_STRING,
          },
        },
      },
    },
    null,
    SETTINGS_MCP_JSON_INDENT,
  );

export const SETTINGS_MCP_CONFIG_JSON = buildMcpConfigJson(INK_API_URL);

export const SETTINGS_COLOR_INPUT_IDS = {
  PRIMARY: 'ink-cms-theme-primary',
  ACCENT: 'ink-cms-theme-accent',
  BACKGROUND: 'ink-cms-theme-background',
} as const;

export const SETTINGS_PROFILE_INPUT_IDS = {
  USERNAME: 'ink-cms-profile-username',
  DISPLAY_NAME: 'ink-cms-profile-name',
  PASSWORD: 'ink-cms-profile-password',
  AVATAR: 'ink-cms-profile-avatar',
} as const;

export const SETTINGS_SITE_INPUT_IDS = {
  SITE_NAME: 'ink-cms-site-name',
  TAGLINE: 'ink-cms-site-tagline',
  SEO_TITLE: 'ink-cms-site-seo-title',
  SEO_DESCRIPTION: 'ink-cms-site-seo-description',
  LOGO: 'ink-cms-site-logo',
  PERMALINK: 'ink-cms-site-permalink',
  LOCALE: 'ink-cms-site-locale',
  TIMEZONE: 'ink-cms-site-timezone',
  DATE_FORMAT: 'ink-cms-site-date-format',
  FROM_EMAIL: 'ink-cms-site-from-email',
  CHAT_SIDE: 'ink-cms-site-chat-side',
  REGISTER: 'ink-cms-site-register',
  SEARCH_ENGINES: 'ink-cms-site-search-engines',
  COMMENTS: 'ink-cms-site-comments',
  TOP_NAV: 'ink-cms-site-top-nav',
  BOTTOM_NAV: 'ink-cms-site-bottom-nav',
  AGENT: 'ink-cms-site-agent',
  API_ERROR: 'ink-cms-site-api-error',
  POSTS_PER_PAGE: 'ink-cms-site-posts-per-page',
  HOMEPAGE: 'ink-cms-site-homepage',
  LOADING_MESSAGE: 'ink-cms-site-loading-message',
  LOADING_SIZE: 'ink-cms-site-loading-size',
} as const;

export const SETTINGS_MEDIA_INPUT_IDS = {
  CLOUD_NAME: 'ink-cms-media-cloud-name',
} as const;

export const SETTINGS_API_ERROR_MODES = {
  PAGE: 'page',
  MODAL: 'modal',
  SNACKBAR: 'snackbar',
} as const;

export const SETTINGS_API_FAIL_URL = 'https://cms.invalid.test/api/fail';

export const SETTINGS_TIMEZONE_OPTIONS = [
  { value: 'UTC', label: 'UTC' },
  { value: 'America/New_York', label: 'America/New_York' },
  { value: 'America/Los_Angeles', label: 'America/Los_Angeles' },
  { value: 'Europe/London', label: 'Europe/London' },
  { value: 'Europe/Madrid', label: 'Europe/Madrid' },
  { value: 'Asia/Jerusalem', label: 'Asia/Jerusalem' },
  { value: 'Asia/Tokyo', label: 'Asia/Tokyo' },
] as const;

export const SETTINGS_DATE_FORMAT_OPTIONS = [
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
] as const;

export const SETTINGS_MCP_INPUT_IDS = {
  ENABLED: 'ink-cms-mcp-enabled',
} as const;

export const SETTINGS_CSS_VARS = {
  PRIMARY: '--ink-cms-accent',
  ACCENT: '--ink-cms-bar-1',
  BACKGROUND: '--ink-cms-bg',
  ACCENT_SOFT: '--ink-cms-accent-soft',
  SIDEBAR: '--ink-cms-sidebar',
} as const;

export const SETTINGS_ACCENT_SOFT_LIGHT = '#eaf0fe';
export const SETTINGS_ACCENT_SOFT_DARK = 'rgba(41, 81, 196, 0.22)';
export const SETTINGS_SIDEBAR = '#14161c';

export const SETTINGS_LOGO_MAX_FILES = 1;
export const SETTINGS_AVATAR_ACCEPT = 'image/*';
export const SETTINGS_PASSWORD_TYPE = 'password';
export const SETTINGS_FILE_TYPE = 'file';
export const SETTINGS_COLOR_TYPE = 'color';
