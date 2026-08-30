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
import { PluginCatalogRow } from '@components/PluginCatalogRow';
import { fetchPluginCatalog } from '@sdk/modules/plugins';
import { fetchVersionInfo, type VersionInfo } from '@sdk/modules/version';
import type { InkPluginCatalogEntry } from '@const/plugins.const';
import { useAuth, useInkPremium } from '@hooks/index';
import { useI18n } from '@i18n/index';
import type { Locale } from '@i18n/types';
import {
  CHANGELOG_ENTRIES,
  DOCS_INDEX,
  EMPTY_STRING,
  GITHUB_URL,
  LOGO_SRC,
  NAV_LINKS,
  NPM_URL,
  ROUTES,
  SEARCH_ARIA_LABEL,
  SEARCH_INPUT_ID,
  SEARCH_MAX_RESULTS,
  NAV_LOGO_SIZE_PX,
  docsHref,
  docsPath,
} from '@const/index';

const PLUGINS_NAV_ID = 'plugins';
const PLUGINS_DOCS_HREF = `${ROUTES.DOCS}/plugins`;
const CHANGELOG_PREVIEW_COUNT = 4;

const LOCALE_META: Record<Locale, { flag: string; label: string }> = {
  en: { flag: '\u{1F1FA}\u{1F1F8}', label: 'English' },
  es: { flag: '\u{1F1EA}\u{1F1F8}', label: 'Español' },
  he: { flag: '\u{1F1EE}\u{1F1F1}', label: 'עברית' },
  fr: { flag: '\u{1F1EB}\u{1F1F7}', label: 'Français' },
  de: { flag: '\u{1F1E9}\u{1F1EA}', label: 'Deutsch' },
};

export const Navbar: FC = () => {
  const { mode, toggleMode } = useBear();
  const { t, locale, setLocale } = useI18n();
  const { active: premiumActive } = useInkPremium();
  const { isAuthenticated, user } = useAuth();
  const route = useRoute();
  const accountLabel = user?.name || user?.username || t.nav.account;
  const activePath = route?.path ?? ROUTES.HOME;
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [plugins, setPlugins] = useState<InkPluginCatalogEntry[]>([]);
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);
  const isDark = mode === 'dark';
  const inkVersion = versionInfo?.ink || versionInfo?.version || EMPTY_STRING;

  useEffect(() => {
    void fetchPluginCatalog().then((items) => setPlugins(items));
  }, []);

  useEffect(() => {
    void fetchVersionInfo().then((info) => setVersionInfo(info));
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isChord = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
      if (!isChord) return;
      event.preventDefault();
      setSearchOpen(true);
      window.requestAnimationFrame(() => {
        const desktop = document.getElementById(SEARCH_INPUT_ID) as HTMLInputElement | null;
        if (desktop) {
          desktop.focus();
          return;
        }
        setMenuOpen(true);
        window.requestAnimationFrame(() => {
          (document.getElementById(`${SEARCH_INPUT_ID}-mobile`) as HTMLInputElement | null)?.focus();
        });
      });
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

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

  const latestChangelog = CHANGELOG_ENTRIES.find((entry) =>
    inkVersion ? entry.version.startsWith(inkVersion) : false,
  )
    ?? CHANGELOG_ENTRIES[0];
  const changelogItems = [
    ...(latestChangelog?.items.slice(0, CHANGELOG_PREVIEW_COUNT).map((item, index) => ({
      key: `cl-${index}`,
      label: item,
      disabled: true,
    })) ?? []),
    {
      key: 'changelog-full',
      label: t.nav.changelog,
      onClick: () => window.location.assign(ROUTES.CHANGELOG),
    },
  ];

  const pluginItems = [
    ...plugins.map((plugin) => ({
      key: plugin.id,
      label: plugin.packageName,
      description: plugin.description || t.nav.pluginPackInk,
      onClick: () => window.location.assign(docsPath('plugins')),
    })),
    {
      key: 'plugins-docs',
      label: t.docs.tocPlugins,
      description: t.nav.pluginInstallDocs,
      onClick: () => window.location.assign(docsPath('plugins')),
    },
  ];

  const goToResult = (path: string) => {
    setQuery('');
    setSearchOpen(false);
    setMenuOpen(false);
    window.location.assign(docsHref(path));
  };

  const navActive = (href: string) =>
    href === ROUTES.DOCS
      ? activePath === ROUTES.DOCS || activePath.startsWith(`${ROUTES.DOCS}/`)
      : activePath === href || (href === PLUGINS_DOCS_HREF && activePath.startsWith(PLUGINS_DOCS_HREF));

  return (
    <nav className="ink-navbar sticky top-0 z-50">
      <div className="ink-navbar__inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
        <Flex align="center" gap={3} className="ink-navbar__brand flex-shrink-0">
          <Link to={ROUTES.HOME} className="ink-navbar__brand-link flex items-center gap-2.5">
            <img
              src={LOGO_SRC}
              alt={t.brand}
              width={NAV_LOGO_SIZE_PX}
              height={NAV_LOGO_SIZE_PX}
              className="ink-navbar__logo"
            />
            <Typography variant="h5" className="font-bold tracking-tight">
              {t.brand}
            </Typography>
          </Link>
          <Dropdown
            placement="bottom-start"
            size="sm"
            minWidth={320}
            closeOnSelect
            trigger={
              <button type="button" className="ink-version-trigger hidden md:inline-flex">
                <Badge variant="info" className="text-xs font-mono">
                  v{inkVersion}
                </Badge>
              </button>
            }
            header={
              <div className="ink-plugins-dropdown__header">
                <Typography variant="caption" className="ink-text-muted m-0">
                  {t.nav.changelog}
                </Typography>
              </div>
            }
            items={changelogItems}
          />
          {premiumActive ? (
            <Badge variant="success" className="hidden md:inline-flex text-xs">
              {t.nav.premium}
            </Badge>
          ) : null}
        </Flex>

        <Flex align="center" gap={5} className="hidden md:flex flex-1 justify-center">
          {NAV_LINKS.map((item) => {
            if (item.id === PLUGINS_NAV_ID) {
              return (
                <Dropdown
                  key={item.id}
                  placement="bottom-start"
                  size="sm"
                  minWidth={300}
                  closeOnSelect
                  trigger={
                    <button
                      type="button"
                      className="ink-nav-link ink-nav-link--btn"
                      data-active={navActive(PLUGINS_DOCS_HREF) ? 'true' : 'false'}
                    >
                      <Typography variant="body2" className="whitespace-nowrap">
                        {t.nav.plugins}
                      </Typography>
                    </button>
                  }
                  header={
                    <div className="ink-plugins-dropdown__header ink-plugins-dropdown__stack">
                      {plugins.map((plugin) => (
                        <PluginCatalogRow
                          key={plugin.id}
                          name={plugin.packageName}
                          npmUrl={plugin.npmUrl}
                          gitUrl={plugin.gitUrl}
                          npmLabel={t.nav.pluginNpm}
                          gitLabel={t.nav.pluginGit}
                        />
                      ))}
                    </div>
                  }
                  items={pluginItems}
                />
              );
            }

            return (
              <Link
                key={item.id}
                to={item.href}
                className="ink-nav-link"
                data-active={navActive(item.href) ? 'true' : 'false'}
              >
                <Typography variant="body2" className="whitespace-nowrap">
                  {t.nav[item.id]}
                </Typography>
              </Link>
            );
          })}
        </Flex>

        <div className="relative hidden lg:block w-64">
          <Input
            id={SEARCH_INPUT_ID}
            size="sm"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => window.setTimeout(() => setSearchOpen(false), 150)}
            placeholder={`${t.nav.searchPlaceholder} ${t.nav.searchShortcut}`}
            aria-label={SEARCH_ARIA_LABEL}
          />
          {searchOpen && query.trim() && (
            <div className="ink-search-panel">
              {results.length === 0 ? (
                <Typography variant="caption" className="block px-3 py-3 ink-text-muted">
                  {t.nav.searchEmpty}
                </Typography>
              ) : (
                results.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    className="ink-search-item"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => goToResult(entry.path)}
                  >
                    <Typography variant="body2" className="font-medium">
                      {entry.title}
                    </Typography>
                    <Typography variant="caption" className="ink-text-muted">
                      {entry.path}
                    </Typography>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        <Flex align="center" gap={2} className="ink-navbar__actions flex-shrink-0 ml-auto">
          <a href={NPM_URL} target="_blank" rel="noopener noreferrer" className="ink-navbar__icon-link">
            <Button variant="ghost" size="sm" icon={<BearIcons.PackageIcon size="sm" />} aria-label="npm" />
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="ink-navbar__icon-link">
            <Button variant="ghost" size="sm" icon={<BearIcons.GithubIcon size="sm" />} aria-label="GitHub" />
          </a>
          <Dropdown
            trigger={
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<BearIcons.GlobeIcon size="sm" />}
                className="font-mono text-xs ink-navbar__icon-btn"
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
            className="ink-navbar__icon-btn"
            icon={isDark ? <BearIcons.SunIcon size="sm" /> : <BearIcons.MoonIcon size="sm" />}
          />
          {false && !isAuthenticated ? (
            <Link to={ROUTES.LOGIN_PUBLIC} className="hidden sm:inline-flex">
              <Button size="sm" variant="inkOutline">
                {t.nav.login}
              </Button>
            </Link>
          ) : null}
          {false && isAuthenticated ? (
            <Link to={ROUTES.CMS} className="hidden sm:inline-flex">
              <Button size="sm" variant="inkOutline">
                {accountLabel}
              </Button>
            </Link>
          ) : null}
          <Link to={ROUTES.PLAYGROUND} className="hidden sm:inline-flex">
            <Button size="sm" variant="ink">
              {t.ctaPlayground}
            </Button>
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 ink-nav-menu-btn"
            aria-label="Menu"
          >
            {menuOpen ? <BearIcons.CloseIcon size="sm" /> : <BearIcons.MenuIcon size="sm" />}
          </button>
        </Flex>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-1 ink-navbar__mobile">
          <div className="py-3">
            <Input
              id={`${SEARCH_INPUT_ID}-mobile`}
              size="sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`${t.nav.searchPlaceholder} ${t.nav.searchShortcut}`}
              aria-label={SEARCH_ARIA_LABEL}
            />
            {query.trim() && (
              <div className="mt-2 rounded-lg overflow-hidden ink-search-panel ink-search-panel--inline">
                {results.length === 0 ? (
                  <Typography variant="caption" className="block px-3 py-3 ink-text-muted">
                    {t.nav.searchEmpty}
                  </Typography>
                ) : (
                  results.map((entry) => (
                    <button
                      key={entry.id}
                      type="button"
                      className="ink-search-item"
                      onClick={() => goToResult(entry.path)}
                    >
                      {entry.title}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
          {NAV_LINKS.map((item) => {
            if (item.id === PLUGINS_NAV_ID) {
              return (
                <div key={item.id} className="ink-navbar__mobile-plugins">
                  <Typography variant="body2" className="block px-3 py-2 font-semibold">
                    {t.nav.plugins}
                  </Typography>
                  {plugins.map((plugin) => (
                    <div key={plugin.id} className="px-3 py-2">
                      <PluginCatalogRow
                        name={plugin.packageName}
                        npmUrl={plugin.npmUrl}
                        gitUrl={plugin.gitUrl}
                        npmLabel={t.nav.pluginNpm}
                        gitLabel={t.nav.pluginGit}
                      />
                    </div>
                  ))}
                  <Link to={item.href} onClick={() => setMenuOpen(false)}>
                    <Typography variant="body2" className="block px-3 py-2 rounded-lg ink-nav-mobile-link">
                      {t.nav.pluginInstallDocs}
                    </Typography>
                  </Link>
                </div>
              );
            }

            return (
              <Link key={item.id} to={item.href} onClick={() => setMenuOpen(false)}>
                <Typography variant="body2" className="block px-3 py-2 rounded-lg ink-nav-mobile-link">
                  {t.nav[item.id]}
                </Typography>
              </Link>
            );
          })}
          {false && !isAuthenticated ? (
            <Link to={ROUTES.LOGIN_PUBLIC} onClick={() => setMenuOpen(false)}>
              <Typography variant="body2" className="block px-3 py-2 rounded-lg ink-nav-mobile-link">
                {t.nav.login}
              </Typography>
            </Link>
          ) : null}
          {false && isAuthenticated ? (
            <Link to={ROUTES.CMS} onClick={() => setMenuOpen(false)}>
              <Typography variant="body2" className="block px-3 py-2 rounded-lg ink-nav-mobile-link">
                {accountLabel}
              </Typography>
            </Link>
          ) : null}
        </div>
      )}
    </nav>
  );
};
