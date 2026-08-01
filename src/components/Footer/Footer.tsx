import type { FC } from 'react';
import { Flex, Typography } from '@forgedevstack/bear';
import { Link } from '@forgedevstack/forge-compass/react';
import { useI18n } from '@i18n/index';
import {
  BEAR_URL,
  FORGESTACK_URL,
  GITHUB_URL,
  LOGO_SRC,
  NPM_URL,
  RAIL_URL,
  ROUTES,
} from '@const/index';

const ECOSYSTEM = [
  { name: 'Bear UI', href: BEAR_URL },
  { name: 'Rail', href: RAIL_URL },
  { name: 'ForgeStack', href: FORGESTACK_URL },
];

export const Footer: FC = () => {
  const { t } = useI18n();

  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Flex align="center" gap={2} className="mb-3">
              <img src={LOGO_SRC} alt={t.brand} width={24} height={24} className="w-6 h-6 rounded object-cover" />
              <Typography variant="body2" className="font-semibold">
                {t.brand}
              </Typography>
            </Flex>
            <Typography variant="caption" className="text-slate-500">
              {t.tagline}
            </Typography>
          </div>

          <div>
            <Typography variant="body2" className="font-semibold mb-3">
              {t.footer.ecosystem}
            </Typography>
            <Flex direction="column" gap={1}>
              {ECOSYSTEM.map((lib) => (
                <a key={lib.name} href={lib.href} target="_blank" rel="noopener noreferrer">
                  <Typography variant="caption" className="text-slate-500 hover:text-teal-700">
                    {lib.name}
                  </Typography>
                </a>
              ))}
            </Flex>
          </div>

          <div>
            <Typography variant="body2" className="font-semibold mb-3">
              {t.footer.resources}
            </Typography>
            <Flex direction="column" gap={1}>
              <Link to={ROUTES.DOCS}>
                <Typography variant="caption" className="text-slate-500 hover:text-teal-700">
                  {t.ctaDocs}
                </Typography>
              </Link>
              <Link to={ROUTES.PLAYGROUND}>
                <Typography variant="caption" className="text-slate-500 hover:text-teal-700">
                  {t.ctaPlayground}
                </Typography>
              </Link>
              <a href={NPM_URL} target="_blank" rel="noopener noreferrer">
                <Typography variant="caption" className="text-slate-500 hover:text-teal-700">
                  npm
                </Typography>
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <Typography variant="caption" className="text-slate-500 hover:text-teal-700">
                  GitHub
                </Typography>
              </a>
            </Flex>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2">
          <Typography variant="caption" className="text-slate-400">
            {t.footer.mitLicense} · {t.footer.builtWith} ForgeStack
          </Typography>
          <Typography variant="caption" className="text-slate-400">
            {t.footer.domainNote}
          </Typography>
        </div>
      </div>
    </footer>
  );
};
