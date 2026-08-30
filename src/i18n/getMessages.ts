import { I18N_CATALOGS } from './catalogs';
import { ALL_LOCALES, LOCALE_DEFAULT, LOCALE_STORAGE_KEY } from './i18n.const';
import type { Locale, Messages } from './types';

const isLocale = (value: string): value is Locale => ALL_LOCALES.includes(value as Locale);

export const getMessages = (): Messages => {
  try {
    const raw = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (raw && isLocale(raw)) return I18N_CATALOGS[raw];
  } catch {
    return I18N_CATALOGS[LOCALE_DEFAULT];
  }
  return I18N_CATALOGS[LOCALE_DEFAULT];
};
