import { useEffect, useRef, useState, type FC } from 'react';
import { useNavigate, useRoute } from '@forgedevstack/forge-compass/react';
import { useNucleus } from '@forgedevstack/synapse';
import {
  AppBar,
  Avatar,
  Badge,
  BearIcons,
  BottomNavigation,
  Button,
  Dropdown,
  Flex,
  Input,
  Sidebar,
  Typography,
  useBearMode,
} from '@forgedevstack/bear';
import { useAuth } from '@hooks/index';
import { useI18n } from '@i18n/index';
import {
  BIFROST_INSTALLMENT_URL,
  CMS_MODE_DARK,
  CMS_MODE_LIGHT,
  CMS_MODE_SYSTEM,
  CMS_PROFILE_EVENT,
  CMS_SITE_EVENT,
  EMPTY_STRING,
  LOGO_SRC,
  ROUTES,
  cmsBuilderPath,
} from '@const/index';
import { CMS_LOGO_SIZE_PX } from '@const/numbers.const';
import { authNucleus } from '@sdk/index';
import {
  applyCmsThemeColors,
  loadCmsProfile,
  loadCmsSite,
  loadCmsThemeColors,
} from '../SettingsPages';
import { CmsAgentBar } from './CmsAgentBar';
import { CmsAgentDock } from './CmsAgentDock';
import { CmsAlerts } from './CmsAlerts';
import { CmsChat } from './CmsChat';
import { dispatchAgentApply } from './cmsAgent.utils';
import { BOTTOM_NAV_SHOW_LABELS, USER_MENU_MIN_WIDTH } from './cmsAgent.const';
import {
  CMS_AVATAR_INITIALS_LENGTH,
  CMS_BOTTOM_NAV_CLASS,
  CMS_BOTTOM_NAV_IDS,
  CMS_ICON_SIZE,
  CMS_NAV_IDS,
  CMS_NAV_ROUTES,
  CMS_SEARCH_INPUT_ID,
  CMS_SHELL_BOTTOM_NAV_CLASS,
  CMS_SIDEBAR_COLLAPSED_WIDTH_PX,
  CMS_SIDEBAR_WIDTH_PX,
} from './CmsShell.const';
import type { CmsModePreference, CmsShellProps, CmsSidebarNavItem } from './CmsShell.types';
import {
  loadCmsModePreference,
  loadSidebarCollapsed,
  resolveCmsMode,
  saveCmsModePreference,
  saveSidebarCollapsed,
} from './CmsShell.utils';
import { ErrorHost } from './ErrorHost';

const initialsFromName = (name: string): string => {
  const trimmed = name.trim();
  if (!trimmed) return EMPTY_STRING;
  return trimmed.slice(0, CMS_AVATAR_INITIALS_LENGTH).toUpperCase();
};

export const CmsShell: FC<CmsShellProps> = (props) => {
  const { children, activeNavId } = props;
  const { t } = useI18n();
  const { navigate } = useNavigate();
  const route = useRoute();
  const shellRef = useRef<HTMLDivElement>(null);
  const { mode, setMode } = useBearMode();
  const { token: providerToken, user: providerUser, isAuthenticated, clearToken, setToken } =
    useAuth();
  const { token, user, fetchMe, logout } = useNucleus(authNucleus);
  const [collapsed, setCollapsed] = useState(() => loadSidebarCollapsed());
  const [modePreference, setModePreference] = useState<CmsModePreference>(() =>
    loadCmsModePreference(),
  );
  const [chatOpen, setChatOpen] = useState(false);
  const [site, setSite] = useState(() => loadCmsSite());
  const resolvedMode = resolveCmsMode(modePreference);

  useEffect(() => {
    if (mode !== resolvedMode) {
      setMode(resolvedMode);
    }
  }, [mode, resolvedMode, setMode]);

  useEffect(() => {
    if (modePreference !== CMS_MODE_SYSTEM) return undefined;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => setMode(resolveCmsMode(CMS_MODE_SYSTEM));
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [modePreference, setMode]);

  useEffect(() => {
    if (!isAuthenticated && !token) {
      navigate(ROUTES.CMS_LOGIN, { replace: true });
    }
  }, [isAuthenticated, token, navigate]);

  useEffect(() => {
    applyCmsThemeColors(shellRef.current, loadCmsThemeColors(), resolvedMode);
  }, [isAuthenticated, token, resolvedMode]);

  useEffect(() => {
    if (providerToken && providerToken !== token) {
      authNucleus.get().setToken(providerToken);
    }
  }, [providerToken, token]);

  useEffect(() => {
    if (token && token !== providerToken) {
      setToken(token);
    }
  }, [token, providerToken, setToken]);

  useEffect(() => {
    if (token) {
      void fetchMe();
    }
  }, [token, fetchMe]);

  const [profile, setProfile] = useState(() => loadCmsProfile());
  const displayUser = user ?? providerUser;

  useEffect(() => {
    const onProfile = () => setProfile(loadCmsProfile());
    const onSite = () => setSite(loadCmsSite());
    window.addEventListener(CMS_PROFILE_EVENT, onProfile);
    window.addEventListener(CMS_SITE_EVENT, onSite);
    return () => {
      window.removeEventListener(CMS_PROFILE_EVENT, onProfile);
      window.removeEventListener(CMS_SITE_EVENT, onSite);
    };
  }, []);
  const displayName =
    profile.displayName ||
    displayUser?.name ||
    displayUser?.username ||
    t.cmsShell.accountFallback;
  const planLabel = displayUser?.plan || t.cmsShell.planFallback;
  const avatarInitials =
    initialsFromName(displayName) ||
    t.cmsShell.accountFallback.slice(0, CMS_AVATAR_INITIALS_LENGTH);
  const avatarSrc = profile.avatarDataUrl || undefined;
  const activeToken = token || providerToken || EMPTY_STRING;

  const onCollapsedChange = (next: boolean) => {
    setCollapsed(next);
    saveSidebarCollapsed(next);
  };

  const onThemeSelect = (next: CmsModePreference) => {
    setModePreference(next);
    saveCmsModePreference(next);
    setMode(resolveCmsMode(next));
  };

  const hiddenNav = new Set(site.hiddenNavIds);
  const sidebarItems: CmsSidebarNavItem[] = [
    {
      id: 'sec-general',
      label: t.cmsShell.general,
      disabled: true,
    },
    {
      id: CMS_NAV_IDS.DASHBOARD,
      label: t.cmsShell.dashboard,
      icon: <BearIcons.DashboardIcon size={CMS_ICON_SIZE} />,
    },
    {
      id: CMS_NAV_IDS.CONTENT,
      label: t.cmsShell.content,
      icon: <BearIcons.FileTextIcon size={CMS_ICON_SIZE} />,
    },
    {
      id: CMS_NAV_IDS.TEMPLATES,
      label: t.cmsShell.templates,
      icon: <BearIcons.LayersIcon size={CMS_ICON_SIZE} />,
    },
    {
      id: CMS_NAV_IDS.MEDIA,
      label: t.cmsShell.media,
      icon: <BearIcons.ImageIcon size={CMS_ICON_SIZE} />,
    },
    {
      id: CMS_NAV_IDS.CREW,
      label: t.cmsShell.crew,
      icon: <BearIcons.UsersIcon size={CMS_ICON_SIZE} />,
    },
    {
      id: CMS_NAV_IDS.LIVE_EDIT,
      label: t.cmsShell.liveEdit,
      icon: <BearIcons.EditIcon size={CMS_ICON_SIZE} />,
    },
    {
      id: CMS_NAV_IDS.BUILDER,
      label: t.cmsShell.builder,
      icon: <BearIcons.GridIcon size={CMS_ICON_SIZE} />,
    },
    {
      id: CMS_NAV_IDS.EXTENSIONS,
      label: t.cmsShell.extensions,
      icon: <BearIcons.PackageIcon size={CMS_ICON_SIZE} />,
    },
    {
      id: CMS_NAV_IDS.PLANS,
      label: t.cmsShell.plans,
      icon: <BearIcons.PackageIcon size={CMS_ICON_SIZE} />,
    },
    {
      id: CMS_NAV_IDS.DATABASE,
      label: t.cmsShell.database,
      icon: <BearIcons.DatabaseIcon size={CMS_ICON_SIZE} />,
    },
    {
      id: 'sec-tools',
      label: t.cmsShell.tools,
      disabled: true,
    },
    {
      id: CMS_NAV_IDS.ANALYTICS,
      label: t.cmsShell.analytics,
      icon: <BearIcons.BarChartIcon size={CMS_ICON_SIZE} />,
      badge: (
        <Badge variant="info" className="text-xs">
          {t.cmsShell.beta}
        </Badge>
      ),
      disabled: true,
    },
    {
      id: 'sec-support',
      label: t.cmsShell.support,
      disabled: true,
    },
    {
      id: CMS_NAV_IDS.SETTINGS,
      label: t.cmsShell.settings,
      icon: <BearIcons.SettingsIcon size={CMS_ICON_SIZE} />,
    },
  ].filter((item) => item.disabled || !hiddenNav.has(item.id));

  const onItemClick = (item: CmsSidebarNavItem) => {
    if (item.disabled) return;
    const href = CMS_NAV_ROUTES[item.id];
    if (href && href !== route?.path) {
      navigate(href);
    }
  };

  const onSignOut = () => {
    logout();
    clearToken();
    navigate(ROUTES.CMS_LOGIN);
  };

  const onOpenInstallment = () => {
    window.open(BIFROST_INSTALLMENT_URL, '_blank', 'noopener,noreferrer');
  };

  const onAgentApply = (templateId: string) => {
    dispatchAgentApply(templateId);
    navigate(cmsBuilderPath({ layout: templateId }));
  };

  const onAgentCreate = () => {
    navigate(ROUTES.CMS_CONTENT);
  };

  const onBottomNavChange = (id: string) => {
    const href = CMS_NAV_ROUTES[id];
    if (href && href !== route?.path) {
      navigate(href);
    }
  };

  const showAgentBar =
    site.showAgent &&
    (activeNavId === CMS_NAV_IDS.BUILDER || activeNavId === CMS_NAV_IDS.CONTENT);

  const bottomNavItems = CMS_BOTTOM_NAV_IDS.filter((id) => !hiddenNav.has(id)).flatMap((id) => {
    const item = sidebarItems.find((entry) => entry.id === id);
    if (!item?.icon) return [];
    return [{ id, label: item.label, icon: item.icon }];
  });

  if (!isAuthenticated && !token) {
    return null;
  }

  return (
    <div
      ref={shellRef}
      className={`ink-cms ink-cms--${resolvedMode}${site.showBottomNav ? ` ${CMS_SHELL_BOTTOM_NAV_CLASS}` : ''}`}
      data-color-mode={resolvedMode}
    >
      <Sidebar
        items={sidebarItems}
        activeItemId={activeNavId}
        onItemClick={onItemClick}
        width={CMS_SIDEBAR_WIDTH_PX}
        collapsedWidth={CMS_SIDEBAR_COLLAPSED_WIDTH_PX}
        collapsed={collapsed}
        onCollapsedChange={onCollapsedChange}
        fullHeight
        activeVariant="fill"
        variant="default"
        position="left"
        className="ink-cms__sidebar"
        header={
          <Flex align="center" gap={2}>
            <img
              src={site.logoDataUrl || LOGO_SRC}
              alt={t.brand}
              className="ink-cms__logo"
              width={CMS_LOGO_SIZE_PX}
              height={CMS_LOGO_SIZE_PX}
            />
            <Typography variant="h6" className="ink-cms__brand mb-0">
              {site.siteName || t.cmsShell.brand}
            </Typography>
          </Flex>
        }
        footer={
          <Flex direction="column" gap={2} className="ink-cms__footer">
            <Typography variant="caption" className="ink-cms__section-label mb-0">
              {t.cmsShell.team}
            </Typography>
            <Flex align="center" gap={2}>
              <Avatar src={avatarSrc} initials={avatarInitials} size="sm" />
              <div className="ink-cms__user-meta">
                <Typography variant="body2" className="mb-0 font-medium">
                  {displayName}
                </Typography>
                <Typography variant="caption" className="ink-cms__muted mb-0">
                  {planLabel}
                </Typography>
              </div>
            </Flex>
            <Button
              size="sm"
              variant="outline"
              icon={<BearIcons.LogoutIcon size={CMS_ICON_SIZE} />}
              onClick={onSignOut}
            >
              {t.cmsShell.signOut}
            </Button>
          </Flex>
        }
      />
      <div className="ink-cms__main">
        {site.showTopNav ? (
          <AppBar
            position="sticky"
            variant="default"
            color="default"
            className="ink-cms__appbar"
            leftContent={
              <Input
                id={CMS_SEARCH_INPUT_ID}
                size="sm"
                placeholder={t.cmsShell.search}
                className="ink-cms__search"
                aria-label={t.cmsShell.search}
              />
            }
            centerContent={
              showAgentBar ? <CmsAgentBar onApply={onAgentApply} /> : undefined
            }
            rightContent={
              <Flex align="center" gap={3}>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<BearIcons.ChatIcon size={CMS_ICON_SIZE} />}
                  aria-label={t.cmsShell.chat}
                  onClick={() => setChatOpen(true)}
                />
                <CmsAlerts onOpen={() => undefined} />
                <Dropdown
                  placement="bottom-end"
                  minWidth={USER_MENU_MIN_WIDTH}
                  trigger={
                    <button type="button" className="ink-cms__appbar-user ink-cms__avatar-trigger">
                      <Avatar src={avatarSrc} initials={avatarInitials} size="sm" />
                      <div>
                        <Typography variant="body2" className="mb-0 font-medium">
                          {displayName}
                        </Typography>
                        <Typography variant="caption" className="ink-cms__muted mb-0">
                          {planLabel}
                        </Typography>
                      </div>
                      <BearIcons.ChevronDownIcon size={CMS_ICON_SIZE} />
                    </button>
                  }
                  items={[
                    {
                      key: 'install',
                      label: t.cmsShell.installment,
                      icon: <BearIcons.DownloadIcon size={CMS_ICON_SIZE} />,
                      onClick: onOpenInstallment,
                    },
                    {
                      key: 'create-user',
                      label: t.cmsShell.createUser,
                      icon: <BearIcons.UsersIcon size={CMS_ICON_SIZE} />,
                      onClick: () => navigate(ROUTES.CMS_CREW),
                    },
                    {
                      key: 'settings',
                      label: t.cmsShell.settings,
                      icon: <BearIcons.SettingsIcon size={CMS_ICON_SIZE} />,
                      onClick: () => navigate(ROUTES.CMS_SETTINGS),
                    },
                    { key: 'theme-div', label: EMPTY_STRING, divider: true },
                    { key: 'theme-header', label: t.cmsShell.themeMenu, header: true },
                    {
                      key: CMS_MODE_LIGHT,
                      label: t.cmsShell.themeLight,
                      icon: <BearIcons.SunIcon size={CMS_ICON_SIZE} />,
                      selected: modePreference === CMS_MODE_LIGHT,
                      onClick: () => onThemeSelect(CMS_MODE_LIGHT),
                    },
                    {
                      key: CMS_MODE_DARK,
                      label: t.cmsShell.themeDark,
                      icon: <BearIcons.MoonIcon size={CMS_ICON_SIZE} />,
                      selected: modePreference === CMS_MODE_DARK,
                      onClick: () => onThemeSelect(CMS_MODE_DARK),
                    },
                    {
                      key: CMS_MODE_SYSTEM,
                      label: t.cmsShell.themeSystem,
                      icon: <BearIcons.MonitorIcon size={CMS_ICON_SIZE} />,
                      selected: modePreference === CMS_MODE_SYSTEM,
                      onClick: () => onThemeSelect(CMS_MODE_SYSTEM),
                    },
                    { key: 'out-div', label: EMPTY_STRING, divider: true },
                    {
                      key: 'sign-out',
                      label: t.cmsShell.signOut,
                      danger: true,
                      onClick: onSignOut,
                    },
                  ]}
                />
              </Flex>
            }
          />
        ) : null}
        <main className="ink-cms__content fade-in">{children}</main>
        {site.showBottomNav ? (
          <BottomNavigation
            className={CMS_BOTTOM_NAV_CLASS}
            items={bottomNavItems}
            value={activeNavId}
            onChange={onBottomNavChange}
            showLabels={BOTTOM_NAV_SHOW_LABELS}
            variant="elevated"
          />
        ) : null}
        <ErrorHost />
      </div>
      {site.showAgent ? (
        <CmsAgentDock
          side={site.chatSide}
          onApply={onAgentApply}
          onCreate={onAgentCreate}
        />
      ) : null}
      <CmsChat
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        token={activeToken}
        side={site.chatSide}
      />
    </div>
  );
};
