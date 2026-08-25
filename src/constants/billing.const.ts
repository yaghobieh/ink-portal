import { ROUTES } from './routes.const';
import { SITE_URL } from './urls.const';

export const INK_PREMIUM_LICENSE_EXAMPLE = 'ink_prem_AB12_CD34_EF56_GH78';

export const PREMIUM_SUCCESS_URL = `${SITE_URL}${ROUTES.PREMIUM_SUCCESS}`;

const INK_API_URL_FALLBACK = 'http://localhost:4000';
const BIFROST_API_URL_FALLBACK = 'http://localhost:4100';

const apiUrlRaw = import.meta.env.VITE_INK_API_URL;
export const INK_API_URL =
  typeof apiUrlRaw === 'string' && apiUrlRaw.trim() ? apiUrlRaw.trim() : INK_API_URL_FALLBACK;

const bifrostUrlRaw = import.meta.env.VITE_BIFROST_API_URL;
export const BIFROST_API_URL =
  typeof bifrostUrlRaw === 'string' && bifrostUrlRaw.trim()
    ? bifrostUrlRaw.trim()
    : BIFROST_API_URL_FALLBACK;
