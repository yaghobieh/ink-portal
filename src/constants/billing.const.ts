import { ROUTES } from './routes.const';
import { SITE_URL } from './urls.const';

export const INK_PREMIUM_LICENSE_EXAMPLE = 'ink_prem_AB12_CD34_EF56_GH78';

export const PREMIUM_SUCCESS_URL = `${SITE_URL}${ROUTES.PREMIUM_SUCCESS}`;

export const INK_API_URL = import.meta.env.VITE_INK_API_URL ?? '';

/** Ink Pro on the Alloy Lemon Squeezy store. Public checkout link. */
export const LEMON_PRO_CHECKOUT_URL =
  'https://alloy-ai.lemonsqueezy.com/checkout/buy/f18d9ba7-5d9b-4263-a108-66f69ab0a55b';

export const inkProCheckoutHref = (redirectTo: string): string => {
  const url = new URL(LEMON_PRO_CHECKOUT_URL);
  url.searchParams.set('checkout[redirect_url]', redirectTo);
  return url.toString();
};
