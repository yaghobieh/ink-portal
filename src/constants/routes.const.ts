import { ENABLE_LAB } from './env.const';
import packageJson from '../../package.json';

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
  DEMO_TITLES: '/demos/titles',
  DEMO_EXCEL: '/demos/sheet',
  DEMO_GRAPH: '/demos/graph',
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
  CMS_SETTINGS: '/cms/settings',
  LAB: '/lab',
} as const;

export const cmsEditPath = (id: string): string =>
  `/cms/edit/${encodeURIComponent(id)}`;

export const INK_VERSION = packageJson.version;
export const PORTAL_VERSION = packageJson.version;

const NAV_LINKS_BASE = [
  { id: 'docs' as const, href: ROUTES.DOCS },
  { id: 'demos' as const, href: ROUTES.DEMOS },
  { id: 'pricing' as const, href: ROUTES.PRICING },
  { id: 'plugins' as const, href: `${ROUTES.DOCS}/plugins` },
];

export const NAV_LINKS = ENABLE_LAB
  ? [...NAV_LINKS_BASE, { id: 'lab' as const, href: ROUTES.LAB }]
  : NAV_LINKS_BASE;
