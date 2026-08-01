import { ROUTES } from './routes.const';
import { SITE_URL } from './urls.const';

export const STRIPE_DASHBOARD_URL = 'https://dashboard.stripe.com';
export const STRIPE_PAYMENT_LINKS_URL = 'https://dashboard.stripe.com/payment-links';
export const STRIPE_APPLE_PAY_DOCS_URL = 'https://docs.stripe.com/apple-pay';
export const STRIPE_GOOGLE_PAY_DOCS_URL = 'https://docs.stripe.com/google-pay';
export const STRIPE_COUNTRIES_URL = 'https://stripe.com/global';
export const STRIPE_ATLAS_URL = 'https://stripe.com/atlas';
export const PAYPAL_BUSINESS_URL = 'https://www.paypal.com/business';
export const PAYPAL_BUTTONS_URL = 'https://www.paypal.com/buttons';

export const STRIPE_PAYMENT_LINK = import.meta.env.VITE_STRIPE_PAYMENT_LINK ?? '';
export const PAYPAL_PAYMENT_LINK = import.meta.env.VITE_PAYPAL_PAYMENT_LINK ?? '';

export const INK_PREMIUM_LICENSE_EXAMPLE = 'ink_prem_AB12_CD34_EF56_GH78';

export const PREMIUM_SUCCESS_URL = `${SITE_URL}${ROUTES.PREMIUM_SUCCESS}?paid=1`;
