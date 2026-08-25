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

export type CmsPermalinkStyle = 'id' | 'title';

export type CmsChatSide = 'left' | 'right';

export type CmsSite = {
  siteName: string;
  tagline: string;
  seoTitle: string;
  seoDescription: string;
  logoDataUrl: string;
  permalinkStyle: CmsPermalinkStyle;
  locale: 'en' | 'es';
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
};

export type CmsMcp = {
  enabled: boolean;
};

export type SettingsTabId = 'profile' | 'site' | 'theme' | 'mcp';
