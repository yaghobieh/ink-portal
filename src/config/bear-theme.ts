import type { BearThemeOverride, CustomVariantsMap } from '@forgedevstack/bear';

export const INK_COLORS = {
  primary: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#22A585',
    500: '#0E8A6E',
    600: '#0B6E58',
    700: '#0a4a45',
    800: '#083b37',
    900: '#062e2b',
    950: '#04201e',
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
      mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
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
    bg: '#0E8A6E',
    bgHover: '#0B6E58',
    text: '#ffffff',
    ring: '#22A585',
  },
  inkOutline: {
    bg: 'transparent',
    bgHover: 'rgba(14, 138, 110, 0.08)',
    text: '#0E8A6E',
    border: '#0E8A6E',
  },
};
