export const PLAN_IDS = ['free', 'pro'] as const;

import type { PlanId } from './pricing.types';

export type { PlanId } from './pricing.types';

export const PLAN_PRICES = {
  free: { amount: 0, period: 'forever' as const, label: '$0' },
  pro: { amount: 10, period: 'once' as const, label: '$10' },
} as const;

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
    'proItemSplit',
    'proItemByoAi',
  ] as const,
} as const;
