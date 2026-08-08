import { ROUTES } from '@const/routes.const';
import {
  CMS_AVATAR_INITIALS_LENGTH,
  CMS_ICON_SIZE,
  CMS_SIDEBAR_WIDTH_PX,
} from '@const/numbers.const';

export {
  CMS_AVATAR_INITIALS_LENGTH,
  CMS_ICON_SIZE,
  CMS_SIDEBAR_WIDTH_PX,
};

export const CMS_NAV_IDS = {
  DASHBOARD: 'dashboard',
  CONTENT: 'content',
  MEDIA: 'media',
  EDITORS: 'editors',
  PLANS: 'plans',
  ANALYTICS: 'analytics',
  SETTINGS: 'settings',
} as const;

export const CMS_NAV_ROUTES: Record<string, string> = {
  [CMS_NAV_IDS.DASHBOARD]: ROUTES.CMS,
  [CMS_NAV_IDS.CONTENT]: ROUTES.CMS_CONTENT,
  [CMS_NAV_IDS.MEDIA]: ROUTES.CMS_MEDIA,
  [CMS_NAV_IDS.EDITORS]: ROUTES.CMS_EDITORS,
  [CMS_NAV_IDS.PLANS]: ROUTES.CMS_PLANS,
};

export const CMS_SEARCH_INPUT_ID = 'ink-cms-search';
