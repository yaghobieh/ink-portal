import { EMPTY_STRING } from '@const/generals.const';

export const CMS_LOGIN_LOCAL_USERNAME = 'yaghobieh';
export const CMS_LOGIN_LOCAL_PASSWORD = 'admin123';
export const CMS_LOGIN_HOST_LOCALHOST = 'localhost';
export const CMS_LOGIN_HOST_LOOPBACK = '127.0.0.1';
export const CMS_LOGIN_LOCAL_HOSTS = [CMS_LOGIN_HOST_LOCALHOST, CMS_LOGIN_HOST_LOOPBACK] as const;
export const CMS_LOGIN_USERNAME_INITIAL = EMPTY_STRING;
export const CMS_LOGIN_PASSWORD_INITIAL = EMPTY_STRING;
export const CMS_LOGIN_NAME_INITIAL = EMPTY_STRING;
export const CMS_LOGIN_EMAIL_INITIAL = EMPTY_STRING;
export const CMS_OAUTH_GOOGLE = 'google';
export const CMS_OAUTH_GITHUB = 'github';
export const CMS_LOGIN_BRAND_MARK_SIZE_PX = 26;

export const CMS_AUTH_MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
} as const;

export const CMS_LOGIN_TERMS_UNCHECKED = false;
