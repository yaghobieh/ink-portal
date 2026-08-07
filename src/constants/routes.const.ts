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
  LOGIN: '/login',
} as const;

export const INK_VERSION = '1.1.3';

export const NAV_LINKS = [
  { id: 'docs' as const, href: ROUTES.DOCS },
  { id: 'demos' as const, href: ROUTES.DEMOS },
  { id: 'ai' as const, href: ROUTES.AI },
  { id: 'playground' as const, href: ROUTES.PLAYGROUND },
  { id: 'pricing' as const, href: ROUTES.PRICING },
  { id: 'getStarted' as const, href: ROUTES.GET_STARTED },
  { id: 'changelog' as const, href: ROUTES.CHANGELOG },
];
