export const ROUTES = {
  HOME: '/',
  DOCS: '/docs',
  PLAYGROUND: '/playground',
  GET_STARTED: '/get-started',
  CHANGELOG: '/changelog',
  AI: '/ai',
} as const;

export const INK_VERSION = '1.0.1';

export const NAV_LINKS = [
  { id: 'docs' as const, href: ROUTES.DOCS },
  { id: 'playground' as const, href: ROUTES.PLAYGROUND },
  { id: 'getStarted' as const, href: ROUTES.GET_STARTED },
  { id: 'changelog' as const, href: ROUTES.CHANGELOG },
];
