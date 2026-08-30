import { EMPTY_STRING } from '@const/generals.const';
import { INK_API_URL } from '@const/billing.const';
import {
  CMS_LOGIN_LOCAL_HOSTS,
  CMS_LOGIN_LOCAL_PASSWORD,
  CMS_LOGIN_LOCAL_USERNAME,
} from './CmsLogin.const';

export const isCmsLoginLocalHost = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  return (CMS_LOGIN_LOCAL_HOSTS as readonly string[]).includes(window.location.hostname);
};

export const cmsLoginInitialUsername = (): string =>
  isCmsLoginLocalHost() ? CMS_LOGIN_LOCAL_USERNAME : EMPTY_STRING;

export const cmsLoginInitialPassword = (): string =>
  isCmsLoginLocalHost() ? CMS_LOGIN_LOCAL_PASSWORD : EMPTY_STRING;

export const cmsLoginApiUrl = (path: string): string => `${INK_API_URL}${path}`;
