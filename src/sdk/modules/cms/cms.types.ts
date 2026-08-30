import type { AuthUser } from '../auth/auth.types';

export type CmsUsage = {
  tokensUsed: number;
  tokensLimit: number;
  periodStart: string;
  periodEnd: string;
};

export type CmsPagesSummary = {
  total: number;
  published: number;
  draft: number;
};

export type CmsHost = {
  apiBase: string;
  cmsPublicUrl: string;
};

export type CmsDistributionSlice = {
  label: string;
  value: number;
};

export type CmsIntegrationRow = {
  id: string;
  application: string;
  type: string;
  rate: number;
  profit: number;
  [key: string]: unknown;
};

export type CmsAnalytics = {
  documents: number;
  published: number;
  drafts: number;
  templates: number;
  media: number;
  tables: number;
  crew: number;
  unreadNotifications: number;
  tokensUsed: number;
  tokensLimit: number;
  documentsDelta: number;
  publishedDelta: number;
  draftsDelta: number;
  pageViews: number;
  pageViewsDelta: number;
  totalRevenue: number;
  revenueDelta: number;
  bounceRate: number;
  bounceDelta: number;
  subscribers: number;
  subscribersDelta: number;
  usageRate: number;
  salesOverview: number;
  weekly: number[];
  distribution: CmsDistributionSlice[];
  integrations: CmsIntegrationRow[];
};

export type CmsDashboardResponse = {
  user: AuthUser;
  usage: CmsUsage;
  pages: CmsPagesSummary;
  analytics?: CmsAnalytics;
  host: CmsHost;
};

export type CmsState = {
  dashboard: CmsDashboardResponse | null;
  analytics: CmsAnalytics | null;
  loading: boolean;
  error: boolean;
  fetchDashboard: (token: string) => Promise<boolean>;
  reset: () => void;
};
