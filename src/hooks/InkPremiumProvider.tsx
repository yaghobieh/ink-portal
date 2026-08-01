import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type FC,
} from 'react';
import {
  isInkPremiumLicenseKey,
  mintInkPremiumLicenseKey,
} from '@forgedevstack/ink';
import { PREMIUM_LICENSE_STORAGE_KEY } from './premium.const';
import type { InkPremiumContextValue, InkPremiumProviderProps } from './premium.types';

const InkPremiumContext = createContext<InkPremiumContextValue | null>(null);

const readStoredLicense = (): string | null => {
  try {
    const value = localStorage.getItem(PREMIUM_LICENSE_STORAGE_KEY);
    return isInkPremiumLicenseKey(value ?? undefined) ? value : null;
  } catch {
    return null;
  }
};

const writeStoredLicense = (licenseKey: string | null) => {
  try {
    if (licenseKey) localStorage.setItem(PREMIUM_LICENSE_STORAGE_KEY, licenseKey);
    else localStorage.removeItem(PREMIUM_LICENSE_STORAGE_KEY);
  } catch {
    return;
  }
};

export const InkPremiumProvider: FC<InkPremiumProviderProps> = ({ children }) => {
  const [licenseKey, setLicenseKey] = useState<string | null>(() => readStoredLicense());

  const activate = useCallback((incoming?: string) => {
    const next =
      incoming && isInkPremiumLicenseKey(incoming) ? incoming.trim() : mintInkPremiumLicenseKey();
    writeStoredLicense(next);
    setLicenseKey(next);
    return next;
  }, []);

  const clear = useCallback(() => {
    writeStoredLicense(null);
    setLicenseKey(null);
  }, []);

  const value = useMemo<InkPremiumContextValue>(() => {
    const active = Boolean(licenseKey);
    return {
      active,
      licenseKey,
      premium: active && licenseKey ? { licenseKey } : undefined,
      activate,
      clear,
    };
  }, [activate, clear, licenseKey]);

  return <InkPremiumContext.Provider value={value}>{children}</InkPremiumContext.Provider>;
};

export const useInkPremium = (): InkPremiumContextValue => {
  const ctx = useContext(InkPremiumContext);
  if (!ctx) {
    throw new Error('useInkPremium must be used within InkPremiumProvider');
  }
  return ctx;
};
