import type { ReactNode } from 'react';
import type { InkPremiumConfig } from '@forgedevstack/ink';

export interface InkPremiumContextValue {
  active: boolean;
  licenseKey: string | null;
  premium: InkPremiumConfig | undefined;
  activate: (licenseKey?: string) => string;
  clear: () => void;
}

export interface InkPremiumProviderProps {
  children: ReactNode;
}
