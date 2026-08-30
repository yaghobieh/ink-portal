import { NUMBER_TWO_HUNDRED } from '@const/numbers.const';
import type { ApiErrorCode } from '@sdk/http';
import type { Messages } from '@i18n/types';

export const ERROR_MODE_PAGE = 'page';
export const ERROR_MODE_MODAL = 'modal';
export const LOADING_SHOW_DELAY_MS = NUMBER_TWO_HUNDRED;

export const ERROR_CODE = {
  LIVE_ANALYTICS: 'live-analytics',
  CURRENT_USER: 'current-user',
  PAGES: 'pages',
  PAGE_CONTENT: 'page-content',
} as const satisfies Record<string, ApiErrorCode>;

type CmsErrorCopyKey = keyof Messages['cmsErrors'];

export const ERROR_COPY_KEYS: Partial<
  Record<ApiErrorCode, { title: CmsErrorCopyKey; body: CmsErrorCopyKey }>
> = {
  [ERROR_CODE.LIVE_ANALYTICS]: { title: 'liveAnalyticsTitle', body: 'liveAnalytics' },
  [ERROR_CODE.CURRENT_USER]: { title: 'sessionTitle', body: 'session' },
  [ERROR_CODE.PAGES]: { title: 'pagesTitle', body: 'pages' },
  [ERROR_CODE.PAGE_CONTENT]: { title: 'pagesTitle', body: 'pages' },
};
