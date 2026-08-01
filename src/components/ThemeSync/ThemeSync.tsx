import { useEffect, type FC, type ReactNode } from 'react';
import { useBear } from '@forgedevstack/bear';

interface ThemeSyncProps {
  children: ReactNode;
}

export const ThemeSync: FC<ThemeSyncProps> = ({ children }) => {
  const { mode } = useBear();
  const isDark = mode === 'dark';

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    document.body.classList.toggle('dark', isDark);
    document.body.classList.toggle('light', !isDark);
  }, [isDark]);

  return children;
};
