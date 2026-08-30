import type { CmsAnalytics } from '@sdk/index';
import {
  CMS_BAR_MAX_HEIGHT_PX,
  CMS_PERCENT_BASE,
  CMS_RING_SIZE_PX,
} from '@const/numbers.const';
import { NUMBER_ZERO } from '@const/numbers.const';

export { CMS_BAR_MAX_HEIGHT_PX, CMS_PERCENT_BASE, CMS_RING_SIZE_PX };

export const WEEKDAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

export const CMS_KPI_TONES = {
  PAGES: 'pages',
  PUBLISHED: 'published',
  DRAFTS: 'drafts',
  TEMPLATES: 'templates',
  MEDIA: 'media',
  TOKENS: 'tokens',
  TABLES: 'tables',
  CREW: 'crew',
  ALERTS: 'alerts',
} as const;

export const FALLBACK_ANALYTICS: CmsAnalytics = {
  documents: 0,
  published: 0,
  drafts: 0,
  templates: 0,
  media: 0,
  tables: 0,
  crew: 0,
  unreadNotifications: 0,
  tokensUsed: 0,
  tokensLimit: 0,
  documentsDelta: 0,
  publishedDelta: 0,
  draftsDelta: 0,
  pageViews: 0,
  pageViewsDelta: 0,
  totalRevenue: 0,
  revenueDelta: 0,
  bounceRate: 0,
  bounceDelta: 0,
  subscribers: 0,
  subscribersDelta: 0,
  usageRate: 0,
  salesOverview: 0,
  weekly: [0, 0, 0, 0, 0, 0, 0],
  distribution: [],
  integrations: [],
};

export const barHeightPercent = (value: number, max: number): number => {
  if (max <= NUMBER_ZERO) return NUMBER_ZERO;
  return Math.round((value / max) * CMS_PERCENT_BASE);
};

export const formatDelta = (value: number): string => {
  const sign = value > NUMBER_ZERO ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
};

export const formatNumber = (value: number): string =>
  new Intl.NumberFormat('en-US').format(value);
