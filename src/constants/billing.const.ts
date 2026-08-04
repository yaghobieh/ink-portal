import { ROUTES } from './routes.const';
import { SITE_URL } from './urls.const';

export const INK_PREMIUM_LICENSE_EXAMPLE = 'ink_prem_AB12_CD34_EF56_GH78';

export const PREMIUM_SUCCESS_URL = `${SITE_URL}${ROUTES.PREMIUM_SUCCESS}`;

export const INK_API_URL = import.meta.env.VITE_INK_API_URL ?? '';
