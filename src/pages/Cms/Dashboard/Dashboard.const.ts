import type { CmsAnalytics } from '@sdk/index';
import {
  CMS_BAR_MAX_HEIGHT_PX,
  CMS_PERCENT_BASE,
  CMS_RING_SIZE_PX,
} from '@const/numbers.const';
import { NUMBER_ZERO } from '@const/numbers';

export { CMS_BAR_MAX_HEIGHT_PX, CMS_PERCENT_BASE, CMS_RING_SIZE_PX };

export const WEEKDAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

export const SALES_STACK_KEYS = ['primary', 'secondary', 'tertiary'] as const;

export const FALLBACK_ANALYTICS: CmsAnalytics = {
  pageViews: 8450,
  pageViewsDelta: 15.8,
  totalRevenue: 363.95,
  revenueDelta: -34.0,
  bounceRate: 86.5,
  bounceDelta: -24.2,
  subscribers: 24473,
  subscribersDelta: 8.3,
  usageRate: 42,
  salesOverview: 9257.51,
  weekly: [42, 68, 91, 55, 74, 63, 48],
  distribution: [
    { label: 'Website', value: 374.82 },
    { label: 'Mobile App', value: 241.6 },
    { label: 'Other', value: 213.42 },
  ],
  integrations: [
    { id: 'stripe', application: 'Stripe', type: 'Finance', rate: 40, profit: 650 },
    { id: 'zapier', application: 'Zapier', type: 'CRM', rate: 80, profit: 720.5 },
    { id: 'shopify', application: 'Shopify', type: 'Marketplace', rate: 20, profit: 432.25 },
  ],
};

export const SALES_MONTHLY_STACKS = [
  [55, 30, 20],
  [70, 40, 25],
  [45, 35, 28],
  [80, 50, 30],
  [60, 42, 22],
  [75, 48, 35],
  [50, 38, 26],
  [90, 55, 40],
  [65, 44, 30],
  [72, 46, 32],
  [58, 36, 24],
  [85, 52, 38],
];

export const MONTH_KEYS = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
] as const;

export const barHeightPercent = (value: number, max: number): number => {
  if (max <= NUMBER_ZERO) return NUMBER_ZERO;
  return Math.round((value / max) * CMS_PERCENT_BASE);
};

export const formatDelta = (value: number): string => {
  const sign = value > NUMBER_ZERO ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
};

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export const formatNumber = (value: number): string =>
  new Intl.NumberFormat('en-US').format(value);
