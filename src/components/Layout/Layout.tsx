import type { ReactNode } from 'react';
import { Link, useRoute } from '@forgedevstack/forge-compass/react';
import { Flex, Typography, Button } from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { GITHUB_URL, NPM_URL, ROUTES, SITE_URL } from '@const/index';

const NAV = [
  { path: ROUTES.HOME, key: 'navHome' as const },
  { path: ROUTES.GET_STARTED, key: 'navGetStarted' as const },
  { path: ROUTES.DEMOS, key: 'navDemos' as const },
  { path: ROUTES.API, key: 'navApi' as const },
  { path: ROUTES.AI, key: 'navAi' as const },
  { path: ROUTES.CHANGELOG, key: 'navChangelog' as const },
];

export const Layout = ({ children }: { children: ReactNode }) => {
  const { t } = useI18n();
  const route = useRoute();
  const activePath = route?.path ?? ROUTES.HOME;

  return (
    <div className="ink-shell">
      <Flex
        justify="between"
        align="center"
        className="px-5 py-4 border-b border-teal-900/60 bg-black/20 backdrop-blur"
      >
        <Flex align="center" gap={3}>
          <Typography variant="h5" className="text-teal-300 tracking-wide">
            {t.brand}
          </Typography>
          <nav className="ink-nav hidden md:block">
            {NAV.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                data-active={activePath === item.path ? 'true' : 'false'}
              >
                {t[item.key]}
              </Link>
            ))}
          </nav>
        </Flex>
        <Flex gap={2}>
          <Button
            size="sm"
            variant="outline"
            onClick={() => window.open(NPM_URL, '_blank', 'noopener,noreferrer')}
          >
            {t.ctaNpm}
          </Button>
          <Button
            size="sm"
            onClick={() => window.open(SITE_URL, '_blank', 'noopener,noreferrer')}
          >
            {t.ctaDocs}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => window.open(GITHUB_URL, '_blank', 'noopener,noreferrer')}
          >
            GitHub
          </Button>
        </Flex>
      </Flex>
      <main className="ink-main">{children}</main>
      <footer className="px-5 py-6 text-sm text-zinc-400 text-center">
        {t.domainNote}
      </footer>
    </div>
  );
};
