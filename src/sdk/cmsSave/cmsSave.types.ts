import type { CmsMcp, CmsSite, CmsThemeColors } from '@pages/Cms/SettingsPages/SettingsPages.types';

export type CmsSaveSource = 'settings';

export type CmsSaveProfile = {
  username: string;
  displayName: string;
  avatarDataUrl: string;
};

export type CmsSavePayload = {
  source: CmsSaveSource;
  profile: CmsSaveProfile;
  password?: string;
  theme?: CmsThemeColors;
  site?: CmsSite;
  mcp?: CmsMcp;
};
