import { EMPTY_STRING } from '@const/generals.const';

export const CMS_LOGIN_USERNAME_INITIAL = EMPTY_STRING;
export const CMS_LOGIN_PASSWORD_INITIAL = EMPTY_STRING;
export const CMS_LOGIN_NAME_INITIAL = EMPTY_STRING;
export const CMS_LOGIN_EMAIL_INITIAL = EMPTY_STRING;
export const CMS_OAUTH_GOOGLE = 'google';
export const CMS_OAUTH_GITHUB = 'github';

export const CMS_AUTH_MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
} as const;
