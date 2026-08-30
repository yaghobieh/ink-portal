import { ROUTES } from './routes.const';
import { SITE_URL } from './urls.const';

export const INK_PREMIUM_LICENSE_EXAMPLE = 'ink_prem_AB12_CD34_EF56_GH78';

export const PREMIUM_SUCCESS_URL = `${SITE_URL}${ROUTES.PREMIUM_SUCCESS}`;

const API_URL_FALLBACK = 'http://localhost:4001';
const API_URL_FALLBACK_V4 = 'http://127.0.0.1:4001';
const API_URL_CMS_API = 'http://localhost:4000';
const API_URL_CMS_API_V4 = 'http://127.0.0.1:4000';
const BIFROST_API_FALLBACK = 'http://localhost:4100';
const SAME_ORIGIN_API = '';
const LOCAL_API_URLS = [
  API_URL_FALLBACK,
  API_URL_FALLBACK_V4,
  API_URL_CMS_API,
  API_URL_CMS_API_V4,
] as const;
const apiUrlRaw = import.meta.env.VITE_INK_API_URL;
const apiUrlTrimmed = typeof apiUrlRaw === 'string' ? apiUrlRaw.trim() : '';
export const INK_API_URL =
  apiUrlTrimmed && !LOCAL_API_URLS.includes(apiUrlTrimmed as (typeof LOCAL_API_URLS)[number])
    ? apiUrlTrimmed
    : SAME_ORIGIN_API;
const bifrostUrlRaw = import.meta.env.VITE_BIFROST_API_URL;
export const BIFROST_API_URL =
  typeof bifrostUrlRaw === 'string' && bifrostUrlRaw.trim()
    ? bifrostUrlRaw.trim()
    : BIFROST_API_FALLBACK;
