export const PLAN_IDS = ['free', 'pro', 'ai'] as const;

export type PlanId = (typeof PLAN_IDS)[number];

export const PLAN_PRICES = {
  free: { amount: 0, period: 'forever' as const, label: '$0' },
  pro: { amount: 29, period: 'once' as const, label: '$29' },
  ai: { amount: 19, period: 'month' as const, label: '$19' },
} as const;

export const PLAN_AI_TOKENS_MONTHLY = 100_000;

export const PLAN_FEATURE_KEYS = {
  free: [
    'freeItemEditor',
    'freeItemToolbar',
    'freeItemCss',
    'freeItemNoAi',
  ] as const,
  pro: [
    'proItemTheme',
    'proItemIcons',
    'proItemPaste',
    'proItemUpload',
    'proItemWysiwyg',
    'proItemByoAi',
    'proItemTypo',
  ] as const,
  ai: [
    'aiItemAllPro',
    'aiItemHosted',
    'aiItemTokens',
    'aiItemAutocomplete',
    'aiItemGenerate',
    'aiItemUsage',
  ] as const,
} as const;
