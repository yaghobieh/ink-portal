import type { Locale } from './types';

export const LOCALE_STORAGE_KEY = 'ink-cms-locale';
export const LOCALE_DEFAULT: Locale = 'en';
export const LOCALE_DIR_RTL = 'rtl';
export const LOCALE_DIR_LTR = 'ltr';
export const RTL_LOCALES: readonly Locale[] = ['he'];
export const ALL_LOCALES: readonly Locale[] = ['en', 'es', 'he', 'fr', 'de'];
