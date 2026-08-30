import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { I18N_CATALOGS } from './catalogs';
import {
  ALL_LOCALES,
  LOCALE_DEFAULT,
  LOCALE_DIR_LTR,
  LOCALE_DIR_RTL,
  LOCALE_STORAGE_KEY,
  RTL_LOCALES,
} from './i18n.const';
import type { Locale, Messages } from './types';

const isLocale = (value: string): value is Locale =>
  ALL_LOCALES.includes(value as Locale);

const readStoredLocale = (): Locale => {
  try {
    const raw = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (raw && isLocale(raw)) return raw;
  } catch {
    return LOCALE_DEFAULT;
  }
  return LOCALE_DEFAULT;
};

interface I18nValue {
  locale: Locale;
  t: Messages;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nValue | null>(null);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(() => readStoredLocale());

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(LOCALE_STORAGE_KEY, next);
  };

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = RTL_LOCALES.includes(locale) ? LOCALE_DIR_RTL : LOCALE_DIR_LTR;
  }, [locale]);

  const value = useMemo(
    () => ({ locale, t: I18N_CATALOGS[locale] ?? I18N_CATALOGS[LOCALE_DEFAULT], setLocale }),
    [locale],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nValue => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n requires I18nProvider');
  return ctx;
};
