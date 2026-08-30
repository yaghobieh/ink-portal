import { NUMBER_ZERO } from '@const/numbers.const';

export const COMPARE_YES = '√';
export const COMPARE_NO = '—';

export const PLAN_COMPARE_COLUMN_IDS = {
  FEATURE: 'feature',
  FREE: 'free',
  PRO: 'pro',
  AI: 'ai',
} as const;

export const PLAN_COMPARE_ROW_KEYS = [
  'compareCoreEditor',
  'compareTablesCollab',
  'compareCssThemes',
  'comparePremiumLicense',
  'compareByoAi',
  'compareHostedAi',
  'compareAiTokens',
  'compareAutocomplete',
  'compareSiteToken',
  'compareSites',
  'compareCreditsPool',
  'compareUsageDashboard',
  'compareNpmAccess',
  'compareLicensePath',
] as const;

export type PlanCompareRowKey = (typeof PLAN_COMPARE_ROW_KEYS)[number];

export type PlanCompareCell = typeof COMPARE_YES | typeof COMPARE_NO | string;

export type PlanCompareMatrixRow = {
  id: PlanCompareRowKey;
  free: PlanCompareCell;
  pro: PlanCompareCell;
  ai: PlanCompareCell;
};

export const PLAN_COMPARE_MATRIX: PlanCompareMatrixRow[] = [
  {
    id: 'compareCoreEditor',
    free: COMPARE_YES,
    pro: COMPARE_YES,
    ai: COMPARE_YES,
  },
  {
    id: 'compareTablesCollab',
    free: COMPARE_YES,
    pro: COMPARE_YES,
    ai: COMPARE_YES,
  },
  {
    id: 'compareCssThemes',
    free: COMPARE_YES,
    pro: COMPARE_YES,
    ai: COMPARE_YES,
  },
  {
    id: 'comparePremiumLicense',
    free: COMPARE_NO,
    pro: COMPARE_YES,
    ai: COMPARE_YES,
  },
  {
    id: 'compareByoAi',
    free: COMPARE_NO,
    pro: COMPARE_YES,
    ai: COMPARE_YES,
  },
  {
    id: 'compareHostedAi',
    free: COMPARE_NO,
    pro: COMPARE_NO,
    ai: COMPARE_YES,
  },
  {
    id: 'compareAiTokens',
    free: COMPARE_NO,
    pro: COMPARE_NO,
    ai: COMPARE_YES,
  },
  {
    id: 'compareAutocomplete',
    free: COMPARE_NO,
    pro: COMPARE_NO,
    ai: COMPARE_YES,
  },
  {
    id: 'compareSiteToken',
    free: COMPARE_NO,
    pro: COMPARE_YES,
    ai: COMPARE_YES,
  },
  {
    id: 'compareSites',
    free: '1',
    pro: '1',
    ai: '5',
  },
  {
    id: 'compareCreditsPool',
    free: COMPARE_NO,
    pro: COMPARE_NO,
    ai: COMPARE_YES,
  },
  {
    id: 'compareUsageDashboard',
    free: COMPARE_NO,
    pro: COMPARE_YES,
    ai: COMPARE_YES,
  },
  {
    id: 'compareNpmAccess',
    free: COMPARE_YES,
    pro: COMPARE_YES,
    ai: COMPARE_YES,
  },
  {
    id: 'compareLicensePath',
    free: COMPARE_YES,
    pro: COMPARE_YES,
    ai: COMPARE_YES,
  },
];

export const PLAN_COMPARE_EMPTY_INDEX = NUMBER_ZERO;
