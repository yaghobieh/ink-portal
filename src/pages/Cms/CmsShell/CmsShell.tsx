import { useEffect, useRef, useState, type FC, type MouseEvent } from 'react';
import { useNavigate } from '@forgedevstack/forge-compass/react';
import { useNucleus } from '@forgedevstack/synapse';
import {
  Alert,
  AppBar,
  Avatar,
  BearIcons,
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
  CMS_CHAT_PREFS_EVENT,
  CMS_NOTIFY_PREFS_EVENT,
  CMS_EXTENSIONS_EVENT,
  CMS_CREW_OPEN_EVENT,
  EMPTY_STRING,
  LOGO_SRC,
  ROUTES,
  cmsBuilderPath,
} from '@const/index';
import { NUMBER_ONE } from '@const/numbers.const';
import { CMS_LOGO_SIZE_PX } from '@const/numbers.const';
import { authNucleus } from '@sdk/index';
import { setDefaultApiErrorMode } from '@sdk/http';
import {
  applyCmsThemeColors,
  loadCmsProfile,
  loadCmsSite,
  loadCmsThemeColors,
  loadUserChatPrefs,
  loadUserNotifyPrefs,
  saveUserChatPrefs,
} from '../SettingsPages';
import { SETTINGS_CHAT_SHOW } from '../SettingsPages/SettingsPages.const';
import { isCrewChatInstalled } from '../ExtensionsPages';
import { playChatSound, shouldPlayChatSound } from './CmsCrewChat/cmsChatSound.utils';
import { CmsAgentBar } from './CmsAgentBar';
import { CmsAgentDock } from './CmsAgentDock';
import { CmsAlerts } from './CmsAlerts';
import { CmsChat } from './CmsChat';
import { CmsCrewChat } from './CmsCrewChat';
import { CmsOnlineStatus } from './CmsOnlineStatus';
import { CmsGlowLoader } from '../CmsGlowLoader';
import { CmsHealthDot } from './CmsHealthDot';
import { dispatchAgentApply } from './cmsAgent.utils';
import { USER_MENU_MIN_WIDTH } from './cmsAgent.const';
import {
  CMS_AVATAR_INITIALS_LENGTH,
  CMS_ICON_SIZE,
  CMS_NAV_IDS,
  CMS_NAV_ROUTES,
  CMS_NAV_SECTIONS,
  CMS_SEARCH_INPUT_ID,
  CMS_SEARCH_KEY,
  CMS_KEY_ENTER,
  CMS_SIDEBAR_COLLAPSED_WIDTH_PX,
  CMS_CREW_PENDING_PREFIX,
  CMS_CREW_DRAWER_OPEN,
} from './CmsShell.const';
import type { CmsModePreference, CmsShellProps, CmsSidebarNavItem } from './CmsShell.types';
import {
  clampSidebarWidth,
  loadCmsModePreference,
  loadSidebarCollapsed,
  loadSidebarWidth,
  resolveCmsMode,
  resolveSidebarNavItems,
  saveCmsModePreference,
  saveSidebarCollapsed,
  saveSidebarWidth,
} from './CmsShell.utils';
import { ErrorHost } from './ErrorHost';
import { useCmsLive } from './CmsLiveProvider';
import { CMS_LIVE_LOCAL_ROOM_PREFIX } from './CmsLive.const';
import { findDirectRoom, findServerMatch } from './CmsLive.utils';

const initialsFromName = (name: string): string => {
  const trimmed = name.trim();
  if (!trimmed) return EMPTY_STRING;
  return trimmed.slice(0, CMS_AVATAR_INITIALS_LENGTH).toUpperCase();
};

export const CmsShell: FC<CmsShellProps> = (props) => {
  const { children, activeNavId } = props;
  const { t } = useI18n();
  const { navigate } = useNavigate();
  const shellRef = useRef<HTMLDivElement>(null);
  const { mode, setMode } = useBearMode();
  const {
    token: providerToken,
    user: providerUser,
    isAuthenticated,
    userLoading,
    clearToken,
    setToken,
  } = useAuth();
  const { token, user, logout } = useNucleus(authNucleus);
  const [collapsed, setCollapsed] = useState(() => loadSidebarCollapsed());
  const [sidebarWidth, setSidebarWidth] = useState(() => loadSidebarWidth());
  const [modePreference, setModePreference] = useState<CmsModePreference>(() =>
    loadCmsModePreference(),
  );
  const [chatOpen, setChatOpen] = useState(false);
  const [crewRoomId, setCrewRoomId] = useState<string | null>(null);
  const [flyoutId, setFlyoutId] = useState<string | null>(null);
  const { onlineUsers, rooms, createRoom, sendChat, selfId, tasks } = useCmsLive();
  const [site, setSite] = useState(() => loadCmsSite());
  const [searchQuery, setSearchQuery] = useState(EMPTY_STRING);
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
    if (userLoading) return;
    if (!isAuthenticated) {
      navigate(ROUTES.CMS_LOGIN, { replace: true });
    }
  }, [isAuthenticated, userLoading, navigate]);

  useEffect(() => {
    setDefaultApiErrorMode(site.apiErrorMode);
  }, [site.apiErrorMode]);

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

  const [profile, setProfile] = useState(() => loadCmsProfile());
  const displayUser = user ?? providerUser;
  const currentUserId = selfId || displayUser?.id || EMPTY_STRING;
  const prefsUserKey = displayUser?.email || displayUser?.username || EMPTY_STRING;
  const [chatPrefs, setChatPrefs] = useState(() => loadUserChatPrefs(prefsUserKey));
  const [notifyPrefs, setNotifyPrefs] = useState(() => loadUserNotifyPrefs(prefsUserKey));
  const [chatToast, setChatToast] = useState<{ text: string; roomId: string } | null>(null);
  const lastChatRef = useRef<Record<string, string>>({});
  const chatPrimedRef = useRef(false);
  const [chatInstalled, setChatInstalled] = useState(() => isCrewChatInstalled());
  const canCrewChat = chatInstalled;

  useEffect(() => {
    setChatPrefs(loadUserChatPrefs(prefsUserKey));
    setNotifyPrefs(loadUserNotifyPrefs(prefsUserKey));
  }, [prefsUserKey]);

  useEffect(() => {
    const onExtensions = () => setChatInstalled(isCrewChatInstalled());
    const onCrewOpen = () => {
      setChatInstalled(true);
      setCrewRoomId((current) => current ?? CMS_CREW_DRAWER_OPEN);
    };
    window.addEventListener(CMS_EXTENSIONS_EVENT, onExtensions);
    window.addEventListener(CMS_CREW_OPEN_EVENT, onCrewOpen);
    return () => {
      window.removeEventListener(CMS_EXTENSIONS_EVENT, onExtensions);
      window.removeEventListener(CMS_CREW_OPEN_EVENT, onCrewOpen);
    };
  }, []);

  useEffect(() => {
    if (!canCrewChat) return;
    rooms.forEach((room) => {
      const newest = room.messages[room.messages.length - NUMBER_ONE];
      if (!newest) return;
      const previous = lastChatRef.current[room.id];
      lastChatRef.current[room.id] = newest.id;
      if (!chatPrimedRef.current) return;
      if (newest.userId === currentUserId || previous === newest.id) return;
      const viewing = crewRoomId === room.id;
      if (viewing) return;
      if (
        chatPrefs.show === SETTINGS_CHAT_SHOW.SNACKBAR || chatPrefs.show === SETTINGS_CHAT_SHOW.BOTH
      ) {
        setChatToast({
          text: notifyPrefs.showPreview ? `${newest.name}: ${newest.body}` : newest.name,
          roomId: room.id,
        });
      }
      if (shouldPlayChatSound(chatPrefs, room)) {
        playChatSound();
      }
    });
    chatPrimedRef.current = true;
  }, [rooms, canCrewChat, chatPrefs, notifyPrefs, crewRoomId, currentUserId]);

  useEffect(() => {
    if (!crewRoomId) return;
    if (crewRoomId.startsWith(CMS_CREW_PENDING_PREFIX)) {
      const otherId = crewRoomId.slice(CMS_CREW_PENDING_PREFIX.length);
      const found = findDirectRoom(rooms, currentUserId, otherId);
      if (found) setCrewRoomId(found.id);
      return;
    }
    if (crewRoomId.startsWith(CMS_LIVE_LOCAL_ROOM_PREFIX)) {
      const local = rooms.find((room) => room.id === crewRoomId);
      const found = local ? findServerMatch(rooms, local) : undefined;
      if (found) setCrewRoomId(found.id);
    }
  }, [rooms, crewRoomId, currentUserId]);

  useEffect(() => {
    const onProfile = () => setProfile(loadCmsProfile());
    const onSite = () => setSite(loadCmsSite());
    const onChatPrefs = () => setChatPrefs(loadUserChatPrefs(prefsUserKey));
    const onNotifyPrefs = () => setNotifyPrefs(loadUserNotifyPrefs(prefsUserKey));
    window.addEventListener(CMS_PROFILE_EVENT, onProfile);
    window.addEventListener(CMS_SITE_EVENT, onSite);
    window.addEventListener(CMS_CHAT_PREFS_EVENT, onChatPrefs);
    window.addEventListener(CMS_NOTIFY_PREFS_EVENT, onNotifyPrefs);
    return () => {
      window.removeEventListener(CMS_PROFILE_EVENT, onProfile);
      window.removeEventListener(CMS_SITE_EVENT, onSite);
      window.removeEventListener(CMS_CHAT_PREFS_EVENT, onChatPrefs);
      window.removeEventListener(CMS_NOTIFY_PREFS_EVENT, onNotifyPrefs);
    };
  }, [prefsUserKey]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey)) return;
      if (event.key.toLowerCase() !== CMS_SEARCH_KEY) return;
      event.preventDefault();
      const targetId = CMS_SEARCH_INPUT_ID;
      document.getElementById(targetId)?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [site.showTopNav]);
  const displayName =
    profile.displayName ||
    displayUser?.name ||
    displayUser?.username ||
    t.cmsShell.accountFallback;
  const avatarInitials =
    initialsFromName(displayName) ||
    t.cmsShell.accountFallback.slice(0, CMS_AVATAR_INITIALS_LENGTH);
  const avatarSrc = profile.avatarDataUrl || undefined;
  const activeToken = token || providerToken || EMPTY_STRING;

  const onCollapsedChange = (next: boolean) => {
    setCollapsed(next);
    setFlyoutId(null);
    saveSidebarCollapsed(next);
  };

  const onResizeStart = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const startX = event.clientX;
    const startWidth = sidebarWidth;
    const onMove = (moveEvent: globalThis.MouseEvent) => {
      const next = clampSidebarWidth(startWidth + moveEvent.clientX - startX);
      setSidebarWidth(next);
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      setSidebarWidth((current) => {
        saveSidebarWidth(current);
        return current;
      });
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const onThemeSelect = (next: CmsModePreference) => {
    setModePreference(next);
    saveCmsModePreference(next);
    setMode(resolveCmsMode(next));
  };

  const hiddenNav = new Set(site.hiddenNavIds);
  const visibleLeaf = (item: CmsSidebarNavItem): boolean => !hiddenNav.has(item.id);
  const overviewChildren: CmsSidebarNavItem[] = [
    {
      id: CMS_NAV_IDS.DASHBOARD,
      label: t.cmsShell.dashboard,
      icon: <BearIcons.DashboardIcon size={CMS_ICON_SIZE} />,
      href: CMS_NAV_ROUTES[CMS_NAV_IDS.DASHBOARD],
    },
    {
      id: CMS_NAV_IDS.PLANS,
      label: t.cmsShell.plans,
      icon: <BearIcons.BarChartIcon size={CMS_ICON_SIZE} />,
      href: CMS_NAV_ROUTES[CMS_NAV_IDS.PLANS],
    },
    {
      id: CMS_NAV_IDS.PAGES,
      label: t.cmsShell.pages,
      icon: <BearIcons.FileTextIcon size={CMS_ICON_SIZE} />,
      href: CMS_NAV_ROUTES[CMS_NAV_IDS.PAGES],
    },
    {
      id: CMS_NAV_IDS.TASKS,
      label: t.cmsShell.tasks,
      icon: <BearIcons.GridIcon size={CMS_ICON_SIZE} />,
      href: CMS_NAV_ROUTES[CMS_NAV_IDS.TASKS],
    },
    {
      id: CMS_NAV_IDS.NOTIFICATIONS,
      label: t.cmsShell.notifications,
      icon: <BearIcons.BellIcon size={CMS_ICON_SIZE} />,
      href: CMS_NAV_ROUTES[CMS_NAV_IDS.NOTIFICATIONS],
    },
    {
      id: CMS_NAV_IDS.CHAT,
      label: t.cmsShell.chat,
      icon: <BearIcons.ChatIcon size={CMS_ICON_SIZE} />,
      onClick: () => setChatOpen(true),
    },
    {
      id: CMS_NAV_IDS.BUNDLES,
      label: t.cmsShell.bundles,
      icon: <BearIcons.PackageIcon size={CMS_ICON_SIZE} />,
      href: CMS_NAV_ROUTES[CMS_NAV_IDS.BUNDLES],
    },
  ].filter(visibleLeaf);
  const designChildren: CmsSidebarNavItem[] = [
    {
      id: CMS_NAV_IDS.BUILDER,
      label: t.cmsShell.contentTypeBuilder,
      icon: <BearIcons.GridIcon size={CMS_ICON_SIZE} />,
      href: CMS_NAV_ROUTES[CMS_NAV_IDS.BUILDER],
    },
    {
      id: CMS_NAV_IDS.CAST,
      label: t.cmsShell.cast,
      icon: <BearIcons.FileTextIcon size={CMS_ICON_SIZE} />,
      href: CMS_NAV_ROUTES[CMS_NAV_IDS.CAST],
    },
    {
      id: CMS_NAV_IDS.MEDIA,
      label: t.cmsShell.mediaLibrary,
      icon: <BearIcons.ImageIcon size={CMS_ICON_SIZE} />,
      href: CMS_NAV_ROUTES[CMS_NAV_IDS.MEDIA],
    },
    {
      id: CMS_NAV_IDS.TEMPLATES,
      label: t.cmsShell.templates,
      icon: <BearIcons.LayersIcon size={CMS_ICON_SIZE} />,
      href: CMS_NAV_ROUTES[CMS_NAV_IDS.TEMPLATES],
    },
    {
      id: CMS_NAV_IDS.LIVE_EDIT,
      label: t.cmsShell.liveEdit,
      icon: <BearIcons.EditIcon size={CMS_ICON_SIZE} />,
      href: CMS_NAV_ROUTES[CMS_NAV_IDS.LIVE_EDIT],
    },
  ].filter(visibleLeaf);
  const generalChildren: CmsSidebarNavItem[] = [
    {
      id: CMS_NAV_IDS.SETTINGS,
      label: t.cmsShell.projectSettings,
      icon: <BearIcons.SettingsIcon size={CMS_ICON_SIZE} />,
      href: CMS_NAV_ROUTES[CMS_NAV_IDS.SETTINGS],
    },
    {
      id: CMS_NAV_IDS.CREW,
      label: t.cmsShell.crew,
      icon: <BearIcons.UsersIcon size={CMS_ICON_SIZE} />,
      href: CMS_NAV_ROUTES[CMS_NAV_IDS.CREW],
    },
    {
      id: CMS_NAV_IDS.CALENDAR,
      label: t.cmsShell.calendar,
      icon: <BearIcons.CalendarIcon size={CMS_ICON_SIZE} />,
      href: CMS_NAV_ROUTES[CMS_NAV_IDS.CALENDAR],
    },
    {
      id: CMS_NAV_IDS.HELP,
      label: t.cmsShell.help,
      icon: <BearIcons.InfoIcon size={CMS_ICON_SIZE} />,
      href: CMS_NAV_ROUTES[CMS_NAV_IDS.HELP],
    },
  ].filter(visibleLeaf);
  const sidebarGroups: CmsSidebarNavItem[] = [
    {
      id: CMS_NAV_SECTIONS.OVERVIEW,
      label: t.cmsShell.allContent,
      icon: <BearIcons.DashboardIcon size={CMS_ICON_SIZE} />,
      children: overviewChildren,
    },
    {
      id: CMS_NAV_SECTIONS.DESIGN,
      label: t.cmsShell.designContent,
      icon: <BearIcons.GridIcon size={CMS_ICON_SIZE} />,
      children: designChildren,
    },
    {
      id: CMS_NAV_SECTIONS.GENERAL,
      label: t.cmsShell.general,
      icon: <BearIcons.SettingsIcon size={CMS_ICON_SIZE} />,
      children: generalChildren,
    },
  ].filter((group) => (group.children?.length ?? 0) > 0);
  const sidebarItems: CmsSidebarNavItem[] = resolveSidebarNavItems({
    groups: sidebarGroups,
    collapsed,
  });
  const leafItems = sidebarGroups.flatMap((group) => group.children ?? []);
  const flyoutGroup = sidebarGroups.find((group) => group.id === flyoutId);

  const onItemClick = (item: CmsSidebarNavItem) => {
    if (item.disabled) return;
    if (collapsed && sidebarGroups.some((group) => group.id === item.id)) {
      setFlyoutId((current) => (current === item.id ? null : item.id));
      return;
    }
    if (item.onClick) {
      item.onClick();
      setFlyoutId(null);
      return;
    }
    const href = item.href || CMS_NAV_ROUTES[item.id];
    if (!href) return;
    setFlyoutId(null);
    navigate(href);
  };

  useEffect(() => {
    const rail = shellRef.current?.querySelector('.ink-cms__rail');
    if (!rail) return undefined;
    const onClick = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest('a.Bear-Sidebar__item');
      if (!link) return;
      event.preventDefault();
    };
    rail.addEventListener('click', onClick);
    return () => rail.removeEventListener('click', onClick);
  }, [isAuthenticated, token]);

  const searchHits = leafItems.filter((item) => {
    if (item.disabled || !CMS_NAV_ROUTES[item.id]) return false;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return false;
    return item.label.toLowerCase().includes(query);
  });

  const onSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const onSearchSubmit = () => {
    const first = searchHits[0];
    if (!first) return;
    onItemClick(first);
    setSearchQuery(EMPTY_STRING);
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

  const openCrewWithUser = (id: string) => {
    const roomId = createRoom([id, currentUserId]);
    setCrewRoomId(roomId || `${CMS_CREW_PENDING_PREFIX}${id}`);
  };

  const openCrewInbox = () => {
    setCrewRoomId((current) => (current ? null : CMS_CREW_DRAWER_OPEN));
  };

  const crewUnread = rooms.reduce((total, room) => {
    const newest = room.messages[room.messages.length - NUMBER_ONE];
    if (!newest || newest.userId === currentUserId) return total;
    if (crewRoomId === room.id) return total;
    return total + 1;
  }, 0);

  const showAgentBar =
    site.showAgent &&
    (activeNavId === CMS_NAV_IDS.BUILDER || activeNavId === CMS_NAV_IDS.CONTENT);

  if (userLoading) {
    return <CmsGlowLoader label={t.cmsShell.sessionChecking} />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div
      ref={shellRef}
      className={`ink-cms ink-cms--${resolvedMode}`}
      data-color-mode={resolvedMode}
    >
      <div className="ink-cms__rail">
      <div className="ink-cms__rail-stack">
      <Sidebar
        items={sidebarItems}
        activeItemId={activeNavId}
        onItemClick={onItemClick}
        width={sidebarWidth}
        collapsedWidth={CMS_SIDEBAR_COLLAPSED_WIDTH_PX}
        collapsed={collapsed}
        onCollapsedChange={onCollapsedChange}
        fullHeight
        activeVariant="indicator"
        variant="default"
        position="left"
        className="ink-cms__sidebar"
        header={
          <Flex direction="column" gap={2} className="ink-cms__brand-block">
            <Flex align="center" gap={2}>
              <img
                src={site.logoDataUrl || LOGO_SRC}
                alt={t.brand}
                className="ink-cms__logo"
                width={CMS_LOGO_SIZE_PX}
                height={CMS_LOGO_SIZE_PX}
              />
              {collapsed ? null : (
                <Typography variant="h6" className="ink-cms__brand mb-0">
                  {site.siteName || t.cmsShell.brand}
                </Typography>
              )}
            </Flex>
          </Flex>
        }
      />
      <div className="ink-cms__rail-footer">
          <Flex direction="column" gap={2} className="ink-cms__footer">
            <Flex align="center" gap={2} className="ink-cms__footer-user">
              <span className="ink-cms__avatar-swatch">
                <Avatar src={avatarSrc} initials={avatarInitials} size="sm" />
              </span>
              {collapsed ? null : (
                <Typography variant="caption" className="ink-cms__footer-name mb-0">
                  {displayName}
                </Typography>
              )}
            </Flex>
            <Button
              size="sm"
              variant="outline"
              className="ink-cms__logout"
              icon={<BearIcons.LogoutIcon size={CMS_ICON_SIZE} />}
              aria-label={t.cmsShell.signOut}
              onClick={onSignOut}
            >
              {collapsed ? EMPTY_STRING : t.cmsShell.signOut}
            </Button>
          </Flex>
      </div>
      </div>
      {collapsed ? null : (
        <button
          type="button"
          className="ink-cms__resize"
          aria-label={t.cmsShell.resizeNav}
          onMouseDown={onResizeStart}
        />
      )}
      {collapsed && flyoutGroup ? (
        <div className="ink-cms__nav-flyout" role="menu">
          <Typography variant="caption" className="ink-cms__nav-flyout-title mb-0">
            {flyoutGroup.label}
          </Typography>
          {(flyoutGroup.children ?? []).map((child) => (
            <button
              key={child.id}
              type="button"
              className="ink-cms__nav-flyout-item"
              onClick={() => onItemClick(child)}
            >
              {child.icon}
              <span>{child.label}</span>
            </button>
          ))}
        </div>
      ) : null}
      </div>
      <div className="ink-cms__main">
        {site.showTopNav ? (
          <AppBar
            position="sticky"
            variant="default"
            color="default"
            className="ink-cms__appbar"
            leftContent={
              <div className="ink-cms__search-wrap">
                <Input
                  id={CMS_SEARCH_INPUT_ID}
                  size="sm"
                  fullWidth
                  prefix={<BearIcons.SearchIcon size={CMS_ICON_SIZE} />}
                  placeholder={t.cmsShell.search}
                  className="ink-cms__search"
                  aria-label={t.cmsShell.search}
                  value={searchQuery}
                  onChange={(event) => onSearchChange(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === CMS_KEY_ENTER) {
                      event.preventDefault();
                      onSearchSubmit();
                    }
                  }}
                />
                {searchQuery.trim() ? (
                  <div className="ink-cms__search-results" role="listbox">
                    {searchHits.length === 0 ? (
                      <Typography variant="caption" className="mb-0 ink-cms__muted">
                        {t.cmsShell.searchEmpty}
                      </Typography>
                    ) : (
                      searchHits.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className="ink-cms__search-hit"
                          onClick={() => {
                            onItemClick(item);
                            setSearchQuery(EMPTY_STRING);
                          }}
                        >
                          {item.label}
                        </button>
                      ))
                    )}
                  </div>
                ) : null}
              </div>
            }
            centerContent={
              showAgentBar ? <CmsAgentBar onApply={onAgentApply} /> : undefined
            }
            rightContent={
              <Flex align="center" gap={3}>
                <CmsHealthDot />
                <CmsOnlineStatus
                  users={onlineUsers}
                  currentUserId={currentUserId}
                  onOpenUser={openCrewWithUser}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  icon={
                    resolvedMode === CMS_MODE_DARK ? (
                      <BearIcons.SunIcon size={CMS_ICON_SIZE} />
                    ) : (
                      <BearIcons.MoonIcon size={CMS_ICON_SIZE} />
                    )
                  }
                  aria-label={
                    resolvedMode === CMS_MODE_DARK ? t.cmsShell.themeLight : t.cmsShell.themeDark
                  }
                  onClick={() =>
                    onThemeSelect(resolvedMode === CMS_MODE_DARK ? CMS_MODE_LIGHT : CMS_MODE_DARK)
                  }
                />
                <CmsAlerts onOpen={() => undefined} />
                <Dropdown
                  placement="bottom-end"
                  minWidth={USER_MENU_MIN_WIDTH}
                  trigger={
                    <button
                      type="button"
                      className="ink-cms__appbar-user ink-cms__avatar-trigger"
                      aria-label={displayName}
                    >
                      <Avatar src={avatarSrc} initials={avatarInitials} size="sm" />
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
        <ErrorHost />
        {chatToast ? (
          <div className="ink-cms-error-toast">
            <Alert
              severity="info"
              variant="filled"
              closable
              onClose={() => setChatToast(null)}
              title={t.cmsShell.chatSnackbar}
            >
              <button
                type="button"
                className="ink-cms-error-toast__open"
                onClick={() => {
                  setCrewRoomId(chatToast.roomId);
                  setChatToast(null);
                }}
              >
                {chatToast.text}
              </button>
            </Alert>
          </div>
        ) : null}
        <main className="ink-cms__content fade-in">{children}</main>
      </div>
      <CmsAgentDock
        side={site.chatSide}
        onOpenAi={() => setChatOpen(true)}
        onOpenCrew={openCrewInbox}
        crewUnread={crewUnread}
        crewOpen={Boolean(crewRoomId)}
        crewPanel={
          <CmsCrewChat
            isOpen={Boolean(crewRoomId)}
            onClose={() => setCrewRoomId(null)}
            room={rooms.find((item) => item.id === crewRoomId) ?? null}
            rooms={rooms}
            onlineUsers={onlineUsers}
            currentUserId={currentUserId}
            token={activeToken}
            tasks={tasks ?? []}
            onSend={sendChat}
            onOpenUser={openCrewWithUser}
            onOpenRoom={(id) => setCrewRoomId(id)}
            onEnsureChannel={(tag, extraIds) =>
              createRoom([currentUserId, ...(extraIds ?? [])], tag)
            }
            side={site.chatSide}
            color={chatPrefs.color}
            roomSoundOn={
              Boolean(crewRoomId) &&
              crewRoomId !== CMS_CREW_DRAWER_OPEN &&
              chatPrefs.roomSounds[crewRoomId ?? EMPTY_STRING] !== false
            }
            onToggleRoomSound={() => {
              if (!crewRoomId || !prefsUserKey) return;
              const muted = chatPrefs.roomSounds[crewRoomId] === false;
              const roomSounds = { ...chatPrefs.roomSounds };
              if (muted) {
                delete roomSounds[crewRoomId];
              } else {
                roomSounds[crewRoomId] = false;
              }
              const next = { ...chatPrefs, roomSounds };
              setChatPrefs(next);
              saveUserChatPrefs(prefsUserKey, next);
            }}
          />
        }
      />
      <CmsChat
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        token={activeToken}
        side={site.chatSide}
        crewAvailable={canCrewChat}
        onOpenCrew={() => {
          setChatOpen(false);
          setCrewRoomId(CMS_CREW_DRAWER_OPEN);
        }}
      />
    </div>
  );
};
