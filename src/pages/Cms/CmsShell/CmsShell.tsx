import { useEffect, type FC } from 'react';
import { useNavigate, useRoute } from '@forgedevstack/forge-compass/react';
import { useNucleus } from '@forgedevstack/synapse';
import {
  AppBar,
  Avatar,
  Badge,
  BearIcons,
  Button,
  Flex,
  Input,
  Sidebar,
  Typography,
  useBearMode,
} from '@forgedevstack/bear';
import { useAuth } from '@hooks/index';
import { useI18n } from '@i18n/index';
import { EMPTY_STRING, LOGO_SRC, ROUTES } from '@const/index';
import { CMS_LOGO_SIZE_PX } from '@const/numbers.const';
import { authNucleus } from '@sdk/index';
import {
  CMS_AVATAR_INITIALS_LENGTH,
  CMS_ICON_SIZE,
  CMS_NAV_IDS,
  CMS_NAV_ROUTES,
  CMS_SEARCH_INPUT_ID,
  CMS_SIDEBAR_WIDTH_PX,
} from './CmsShell.const';
import type { CmsShellProps, CmsSidebarNavItem } from './CmsShell.types';

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
  const { mode, setMode } = useBearMode();
  const { token: providerToken, user: providerUser, isAuthenticated, clearToken, setToken } =
    useAuth();
  const { token, user, fetchMe, logout } = useNucleus(authNucleus);

  useEffect(() => {
    if (mode !== 'light') {
      setMode('light');
    }
  }, [mode, setMode]);

  useEffect(() => {
    if (!isAuthenticated && !token) {
      navigate(ROUTES.CMS_LOGIN, { replace: true });
    }
  }, [isAuthenticated, token, navigate]);

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

  const displayUser = user ?? providerUser;
  const displayName = displayUser?.name || displayUser?.username || t.cmsShell.accountFallback;
  const planLabel = displayUser?.plan || t.cmsShell.planFallback;
  const avatarInitials =
    initialsFromName(displayName) ||
    t.cmsShell.accountFallback.slice(0, CMS_AVATAR_INITIALS_LENGTH);

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
      id: CMS_NAV_IDS.MEDIA,
      label: t.cmsShell.media,
      icon: <BearIcons.ImageIcon size={CMS_ICON_SIZE} />,
    },
    {
      id: CMS_NAV_IDS.EDITORS,
      label: t.cmsShell.editors,
      icon: <BearIcons.UsersIcon size={CMS_ICON_SIZE} />,
    },
    {
      id: CMS_NAV_IDS.PLANS,
      label: t.cmsShell.plans,
      icon: <BearIcons.PackageIcon size={CMS_ICON_SIZE} />,
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
      disabled: true,
    },
  ];

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

  if (!isAuthenticated && !token) {
    return null;
  }

  return (
    <div className="ink-cms ink-cms--light" data-color-mode="light">
      <Sidebar
        items={sidebarItems}
        activeItemId={activeNavId}
        onItemClick={onItemClick}
        width={CMS_SIDEBAR_WIDTH_PX}
        fullHeight
        activeVariant="fill"
        variant="default"
        position="left"
        className="ink-cms__sidebar"
        header={
          <Flex align="center" gap={2}>
            <img
              src={LOGO_SRC}
              alt={t.brand}
              className="ink-cms__logo"
              width={CMS_LOGO_SIZE_PX}
              height={CMS_LOGO_SIZE_PX}
            />
            <Typography variant="h6" className="ink-cms__brand mb-0">
              {t.cmsShell.brand}
            </Typography>
          </Flex>
        }
        footer={
          <Flex direction="column" gap={2} className="ink-cms__footer">
            <Typography variant="caption" className="ink-cms__section-label mb-0">
              {t.cmsShell.team}
            </Typography>
            <Flex align="center" gap={2}>
              <Avatar initials={avatarInitials} size="sm" />
              <div className="ink-cms__user-meta">
                <Typography variant="body2" className="mb-0 font-medium">
                  {displayName}
                </Typography>
                <Typography variant="caption" className="ink-cms__muted mb-0">
                  {planLabel}
                </Typography>
              </div>
            </Flex>
            <Button size="sm" variant="outline" onClick={onSignOut}>
              {t.cmsShell.signOut}
            </Button>
          </Flex>
        }
      />
      <div className="ink-cms__main">
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
          rightContent={
            <Flex align="center" gap={3}>
              <Button
                variant="ghost"
                size="sm"
                icon={<BearIcons.BellIcon size={CMS_ICON_SIZE} />}
                aria-label={t.cmsShell.notifications}
              />
              <Flex align="center" gap={2} className="ink-cms__appbar-user">
                <Avatar initials={avatarInitials} size="sm" />
                <div>
                  <Typography variant="body2" className="mb-0 font-medium">
                    {displayName}
                  </Typography>
                  <Typography variant="caption" className="ink-cms__muted mb-0">
                    {planLabel}
                  </Typography>
                </div>
              </Flex>
            </Flex>
          }
        />
        <main className="ink-cms__content fade-in">{children}</main>
      </div>
    </div>
  );
};
