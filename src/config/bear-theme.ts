import type { BearThemeOverride, CustomVariantsMap } from '@forgedevstack/bear';

export const INK_COLORS = {
  primary: {
    50: '#eaf0fe',
    100: '#d5e0fc',
    200: '#abc1f9',
    300: '#7a9aef',
    400: '#4d73dc',
    500: '#2951c4',
    600: '#1f3f9e',
    700: '#1b3a8c',
    800: '#152c6b',
    900: '#0f1f4c',
    950: '#0a1433',
  },
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
} as const;

export const inkTheme: BearThemeOverride = {
  colors: {
    primary: INK_COLORS.primary,
    secondary: INK_COLORS.secondary,
  },
  typography: {
    fontFamily: {
      sans: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    },
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.625rem',
    xl: '0.875rem',
    '2xl': '1.25rem',
  },
};

export const inkVariants: CustomVariantsMap = {
  ink: {
    bg: '#2951c4',
    bgHover: '#1f3f9e',
    text: '#ffffff',
    ring: '#7a9aef',
  },
  inkOutline: {
    bg: 'transparent',
    bgHover: 'rgba(41, 81, 196, 0.08)',
    text: '#2951c4',
    border: '#2951c4',
  },
};
