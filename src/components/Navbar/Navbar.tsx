import { useEffect, useMemo, useState, type FC } from 'react';
import { Link, useRoute } from '@forgedevstack/forge-compass/react';
import {
  Badge,
  BearIcons,
  Button,
  Dropdown,
  Flex,
  Input,
  Typography,
  useBear,
} from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import type { Locale } from '@i18n/types';
import {
  DOCS_INDEX,
  GITHUB_URL,
  INK_VERSION,
  LOGO_SRC,
  NAV_LINKS,
  NPM_URL,
  ROUTES,
  SEARCH_ARIA_LABEL,
  SEARCH_MAX_RESULTS,
  docsHref,
} from '@const/index';

const LOCALE_META: Record<Locale, { flag: string; label: string }> = {
  en: { flag: '\u{1F1FA}\u{1F1F8}', label: 'English' },
  es: { flag: '\u{1F1EA}\u{1F1F8}', label: 'Español' },
};

export const Navbar: FC = () => {
  const { mode, toggleMode } = useBear();
  const { t, locale, setLocale } = useI18n();
  const route = useRoute();
  const activePath = route?.path ?? ROUTES.HOME;
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('light', mode === 'light');
  }, [mode]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return DOCS_INDEX.filter((entry) => {
      const hay = `${entry.title} ${entry.keywords.join(' ')}`.toLowerCase();
      return hay.includes(q);
    }).slice(0, SEARCH_MAX_RESULTS);
  }, [query]);

  const localeItems = (Object.keys(LOCALE_META) as Locale[]).map((loc) => ({
    key: loc,
    label: `${LOCALE_META[loc].flag}  ${LOCALE_META[loc].label}`,
    onClick: () => setLocale(loc),
  }));

  const goToResult = (hash: string) => {
    setQuery('');
    setSearchOpen(false);
    setMenuOpen(false);
    window.location.assign(docsHref(hash));
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
        <Flex align="center" gap={3} className="flex-shrink-0">
          <Link to={ROUTES.HOME} className="flex items-center gap-2.5">
            <img src={LOGO_SRC} alt={t.brand} width={32} height={32} className="w-8 h-8 rounded-lg object-cover" />
            <Typography variant="h5" className="font-bold tracking-tight">
              {t.brand}
            </Typography>
          </Link>
          <Badge variant="info" className="hidden md:inline-flex text-xs font-mono">
            v{INK_VERSION}
          </Badge>
        </Flex>

        <Flex align="center" gap={5} className="hidden md:flex flex-1 justify-center">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className="ink-nav-link"
              data-active={activePath === item.href ? 'true' : 'false'}
            >
              <Typography variant="body2" className="whitespace-nowrap">
                {t.nav[item.id]}
              </Typography>
            </Link>
          ))}
        </Flex>

        <div className="relative hidden lg:block w-56">
          <Input
            size="sm"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => window.setTimeout(() => setSearchOpen(false), 150)}
            placeholder={t.nav.searchPlaceholder}
            aria-label={SEARCH_ARIA_LABEL}
          />
          {searchOpen && query.trim() && (
            <div className="ink-search-panel">
              {results.length === 0 ? (
                <Typography variant="caption" className="block px-3 py-3 text-slate-500">
                  {t.nav.searchEmpty}
                </Typography>
              ) : (
                results.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    className="ink-search-item"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => goToResult(entry.hash)}
                  >
                    <Typography variant="body2" className="font-medium">
                      {entry.title}
                    </Typography>
                    <Typography variant="caption" className="text-slate-500">
                      /docs#{entry.hash}
                    </Typography>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        <Flex align="center" gap={2} className="flex-shrink-0 ml-auto">
          <a href={NPM_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm" icon={<BearIcons.PackageIcon size="xs" />} aria-label="npm" />
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm" icon={<BearIcons.GithubIcon size="xs" />} aria-label="GitHub" />
          </a>
          <Dropdown
            trigger={
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<BearIcons.GlobeIcon size="xs" />}
                className="font-mono text-xs"
              >
                {LOCALE_META[locale].flag}
              </Button>
            }
            items={localeItems}
            placement="bottom-end"
            size="sm"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMode}
            aria-label={t.nav.toggleTheme}
            icon={mode === 'dark' ? <BearIcons.SunIcon size="xs" /> : <BearIcons.MoonIcon size="xs" />}
          />
          <Link to={ROUTES.PLAYGROUND} className="hidden sm:inline-flex">
            <Button size="sm">{t.ctaPlayground}</Button>
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-slate-500 hover:text-teal-700"
            aria-label="Menu"
          >
            {menuOpen ? <BearIcons.CloseIcon size="sm" /> : <BearIcons.MenuIcon size="sm" />}
          </button>
        </Flex>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-1 border-t border-slate-200/80 bg-white">
          <div className="py-3">
            <Input
              size="sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.nav.searchPlaceholder}
              aria-label={SEARCH_ARIA_LABEL}
            />
            {query.trim() && (
              <div className="mt-2 rounded-lg border border-slate-200 overflow-hidden">
                {results.length === 0 ? (
                  <Typography variant="caption" className="block px-3 py-3 text-slate-500">
                    {t.nav.searchEmpty}
                  </Typography>
                ) : (
                  results.map((entry) => (
                    <button
                      key={entry.id}
                      type="button"
                      className="ink-search-item"
                      onClick={() => goToResult(entry.hash)}
                    >
                      {entry.title}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
          {NAV_LINKS.map((item) => (
            <Link key={item.id} to={item.href} onClick={() => setMenuOpen(false)}>
              <Typography variant="body2" className="block px-3 py-2 rounded-lg text-slate-600 hover:text-teal-700">
                {t.nav[item.id]}
              </Typography>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};
