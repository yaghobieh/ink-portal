export type CmsThemeColors = {
  primary: string;
  accent: string;
  background: string;
};

export type CmsProfile = {
  username: string;
  displayName: string;
  avatarDataUrl: string;
};

export type CmsLocale = 'en' | 'es' | 'he' | 'fr' | 'de';

export type CmsNotifyPrefs = {
  inApp: boolean;
  email: boolean;
  showPreview: boolean;
};

export type CmsChatSoundMode = 'off' | 'private' | 'room' | 'all';

export type CmsChatShowMode = 'drawer' | 'snackbar' | 'both';

export type CmsChatPrefs = {
  sound: CmsChatSoundMode;
  color: string;
  show: CmsChatShowMode;
  roomSounds: Record<string, boolean>;
};

export type CmsPermalinkStyle = 'id' | 'title';

export type CmsChatSide = 'left' | 'right';

export type CmsApiErrorMode = 'page' | 'modal' | 'snackbar';

export type CmsSite = {
  siteName: string;
  tagline: string;
  seoTitle: string;
  seoDescription: string;
  logoDataUrl: string;
  permalinkStyle: CmsPermalinkStyle;
  locale: CmsLocale;
  timezone: string;
  dateFormat: string;
  fromEmail: string;
  chatSide: CmsChatSide;
  hiddenNavIds: string[];
  anyoneCanRegister: boolean;
  searchEngineVisible: boolean;
  allowComments: boolean;
  showTopNav: boolean;
  showBottomNav: boolean;
  showAgent: boolean;
  apiErrorMode: CmsApiErrorMode;
  postsPerPage: string;
  homepagePath: string;
  loadingMessage: string;
  loadingSize: 'sm' | 'md' | 'lg';
};

export type CmsMcp = {
  enabled: boolean;
};

export type SettingsTabId = 'profile' | 'crew' | 'site' | 'theme' | 'media' | 'mcp' | 'api';

export type SettingsSitePanelId =
  | 'general'
  | 'writing'
  | 'discussion'
  | 'chrome'
  | 'reading'
  | 'media';
