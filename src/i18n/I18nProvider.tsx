import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { en } from './en';
import { es } from './es';
import type { Locale, Messages } from './types';

const catalogs: Record<Locale, Messages> = { en, es };

interface I18nValue {
  locale: Locale;
  t: Messages;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nValue | null>(null);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>('en');
  const value = useMemo(
    () => ({ locale, t: catalogs[locale], setLocale }),
    [locale],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nValue => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n requires I18nProvider');
  return ctx;
};
