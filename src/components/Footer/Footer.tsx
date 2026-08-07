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
    <footer className="ink-footer mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Flex align="center" gap={2} className="mb-3">
              <img src={LOGO_SRC} alt={t.brand} width={24} height={24} className="w-6 h-6 rounded object-cover" />
              <Typography variant="body2" className="font-semibold">
                {t.brand}
              </Typography>
            </Flex>
            <Typography variant="caption" className="ink-text-muted">
              {t.tagline}
            </Typography>
          </div>

          <div>
            <Typography variant="body2" className="font-semibold mb-3">
              {t.footer.ecosystem}
            </Typography>
            <Flex direction="column" gap={1}>
              {ECOSYSTEM.map((lib) => (
                <a key={lib.name} href={lib.href} target="_blank" rel="noopener noreferrer" className="ink-footer-link">
                  <Typography variant="caption">{lib.name}</Typography>
                </a>
              ))}
            </Flex>
          </div>

          <div>
            <Typography variant="body2" className="font-semibold mb-3">
              {t.footer.resources}
            </Typography>
            <Flex direction="column" gap={1}>
              <Link to={ROUTES.DOCS} className="ink-footer-link">
                <Typography variant="caption">{t.ctaDocs}</Typography>
              </Link>
              <a href={NPM_URL} target="_blank" rel="noopener noreferrer" className="ink-footer-link">
                <Typography variant="caption">npm</Typography>
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="ink-footer-link">
                <Typography variant="caption">GitHub</Typography>
              </a>
            </Flex>
          </div>
        </div>

        <div className="ink-footer__bottom mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <Typography variant="caption" className="ink-text-muted">
            {t.footer.mitLicense} · {t.footer.builtWith} ForgeStack
          </Typography>
          <Typography variant="caption" className="ink-text-muted">
            {t.footer.domainNote}
          </Typography>
        </div>
      </div>
    </footer>
  );
};
