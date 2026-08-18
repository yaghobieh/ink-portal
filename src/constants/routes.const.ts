import { ENABLE_LAB } from './env.const';

export const ROUTES = {
  HOME: '/',
  DOCS: '/docs',
  DOC_PAGE: '/docs/:slug',
  DEMOS: '/demos',
  DEMO_FEATURE: '/demos/feature-rich',
  DEMO_AI: '/demos/ai',
  DEMO_COLLAB: '/demos/collaborative',
  DEMO_DOCUMENT: '/demos/document',
  DEMO_TABLES: '/demos/tables',
  DEMO_MARKDOWN: '/demos/markdown',
  DEMO_MOBILE: '/demos/mobile',
  PLAYGROUND: '/playground',
  GET_STARTED: '/get-started',
  CHANGELOG: '/changelog',
  AI: '/ai',
  PRICING: '/pricing',
  PREMIUM_SUCCESS: '/pricing/success',
  TERMS: '/terms',
  LOGIN: '/cms/login',
  CMS: '/cms',
  CMS_LOGIN: '/cms/login',
  CMS_CONTENT: '/cms/content',
  CMS_EDIT: '/cms/edit/:id',
  CMS_MEDIA: '/cms/media',
  CMS_EDITORS: '/cms/editors',
  CMS_CREW: '/cms/crew',
  CMS_LIVE_EDIT: '/cms/live-edit',
  CMS_EXTENSIONS: '/cms/extensions',
  CMS_PLANS: '/cms/plans',
  CMS_DATABASE: '/cms/database',
  CMS_SETTINGS: '/cms/settings',
  CMS_TEMPLATES: '/cms/templates',
  CMS_BUILDER: '/cms/builder',
  SENSORS: '/sensors',
  PAGES: '/pages',
  NOT_FOUND: '/404',
  LAB: '/lab',
} as const;

export const cmsEditPath = (id: string): string =>
  `/cms/edit/${encodeURIComponent(id)}`;

export const BUILDER_QUERY_DOC = 'doc';
export const BUILDER_QUERY_LAYOUT = 'layout';

export const cmsBuilderPath = (query?: { doc?: string; layout?: string }): string => {
  const params = new URLSearchParams();
  if (query?.doc) params.set(BUILDER_QUERY_DOC, query.doc);
  if (query?.layout) params.set(BUILDER_QUERY_LAYOUT, query.layout);
  const search = params.toString();
  return search ? `${ROUTES.CMS_BUILDER}?${search}` : ROUTES.CMS_BUILDER;
};

export const INK_VERSION = '1.1.6';
export const PORTAL_VERSION = '1.1.6';

const NAV_LINKS_BASE = [
  { id: 'docs' as const, href: ROUTES.DOCS },
  { id: 'demos' as const, href: ROUTES.DEMOS },
  { id: 'pricing' as const, href: ROUTES.PRICING },
  { id: 'plugins' as const, href: `${ROUTES.DOCS}/plugins` },
];

export const NAV_LINKS = ENABLE_LAB
  ? [...NAV_LINKS_BASE, { id: 'lab' as const, href: ROUTES.LAB }]
  : NAV_LINKS_BASE;
