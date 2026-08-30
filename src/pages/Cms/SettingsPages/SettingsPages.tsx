import { useEffect, useState, type ChangeEvent, type FC } from 'react';
import {
  Alert,
  Avatar,
  Button,
  Card,
  FileUpload,
  Flex,
  Input,
  Select,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Typography,
  useBearMode,
} from '@forgedevstack/bear';
import { useAuth } from '@hooks/index';
import { ALL_LOCALES, useI18n } from '@i18n/index';
import type { Locale } from '@i18n/index';
import { fetchCrewRoles, fetchCrewUsers } from '@sdk/modules/cms';
import { CMS_LOOKS } from '../CmsLook';
import { hasTaskPermission } from '../TasksPages/TasksPages.utils';
import type { CrewRole, CrewUser } from '../CrewPages/CrewPages.const';
import { CMS_AVATAR_MAX_BYTES } from '@const/index';
import { dispatchCmsSave } from '@sdk/cmsSave';
import { useApi } from '@sdk/http';
import { setDefaultApiErrorMode } from '@sdk/http';
import { uploadAndRegisterMedia, fetchMediaConfig, saveMediaCloudName } from '@sdk/index';
import { parseCloudinaryCloudName } from '@sdk/modules/media/media.utils';
import { CmsShell, CMS_NAV_IDS } from '../CmsShell';
import {
  SETTINGS_AVATAR_ACCEPT,
  SETTINGS_CHAT_SIDES,
  SETTINGS_COLOR_INPUT_IDS,
  SETTINGS_COLOR_TYPE,
  SETTINGS_LOCALE_VALUES,
  SETTINGS_LOGO_MAX_FILES,
  SETTINGS_MCP_CONFIG_JSON,
  SETTINGS_MCP_INPUT_IDS,
  SETTINGS_MCP_TOOL_NAMES,
  SETTINGS_MEDIA_INPUT_IDS,
  SETTINGS_NAV_TOGGLE_IDS,
  SETTINGS_PERMALINK_VALUES,
  SETTINGS_API_ERROR_MODES,
  SETTINGS_API_FAIL_URL,
  SETTINGS_PROFILE_EMPTY,
  SETTINGS_PROFILE_INPUT_IDS,
  SETTINGS_SAVE_SOURCE,
  SETTINGS_SITE_INPUT_IDS,
  SETTINGS_TABS,
  SETTINGS_SITE_PANELS,
  SETTINGS_CHAT_COLOR_ID,
  SETTINGS_CHAT_PREFS_DEFAULTS,
  SETTINGS_CHAT_SHOW,
  SETTINGS_CHAT_SOUND,
  SETTINGS_THEME_DEFAULTS_DARK,
  SETTINGS_THEME_DEFAULTS_LIGHT,
  SETTINGS_TIMEZONE_OPTIONS,
  SETTINGS_DATE_FORMAT_OPTIONS,
} from './SettingsPages.const';
import type {
  CmsChatPrefs,
  CmsChatShowMode,
  CmsChatSide,
  CmsChatSoundMode,
  CmsMcp,
  CmsNotifyPrefs,
  CmsPermalinkStyle,
  CmsProfile,
  CmsSite,
  CmsThemeColors,
  SettingsSitePanelId,
} from './SettingsPages.types';
import {
  applyCmsThemeColors,
  loadCmsMcp,
  loadCmsProfile,
  loadCmsSite,
  loadCmsThemeColors,
  loadUserChatPrefs,
  loadUserNotifyPrefs,
  loadUserThemeColors,
  saveUserChatPrefs,
  profileInitials,
  saveCmsMcp,
  saveCmsProfile,
  saveCmsSite,
  saveCmsThemeColors,
  saveUserNotifyPrefs,
  saveUserThemeColors,
} from './SettingsPages.utils';
import { isCrewChatInstalled } from '../ExtensionsPages';
import { SettingsPasswordOtp } from './components/SettingsPasswordOtp';
import { SettingsSection } from './components/SettingsSection';
import { SettingsToggleRow } from './components/SettingsToggleRow';

export const SettingsPages: FC = () => {
  const { t, setLocale } = useI18n();
  const { mode } = useBearMode();
  const { token, user } = useAuth();
  const userKey = user?.email || user?.username || SETTINGS_PROFILE_EMPTY;
  const [colors, setColors] = useState<CmsThemeColors>(
    () => loadUserThemeColors(userKey) ?? loadCmsThemeColors(),
  );
  const [notifyPrefs, setNotifyPrefs] = useState<CmsNotifyPrefs>(() => loadUserNotifyPrefs(userKey));
  const [chatPrefs, setChatPrefs] = useState<CmsChatPrefs>(() => loadUserChatPrefs(userKey));
  const chatInstalled = isCrewChatInstalled();
  const [users, setUsers] = useState<CrewUser[]>([]);
  const [roles, setRoles] = useState<CrewRole[]>([]);
  const [profile, setProfile] = useState<CmsProfile>(() => loadCmsProfile());
  const [site, setSite] = useState<CmsSite>(() => loadCmsSite());
  const [mcp, setMcp] = useState<CmsMcp>(() => loadCmsMcp());
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [cloudName, setCloudName] = useState(SETTINGS_PROFILE_EMPTY);
  const [mediaConfigured, setMediaConfigured] = useState(false);
  const [mediaHasKey, setMediaHasKey] = useState(false);
  const [sitePanel, setSitePanel] = useState<SettingsSitePanelId>(SETTINGS_SITE_PANELS.GENERAL);

  useEffect(() => {
    if (!user) return;
    setProfile((current) => ({
      username: user.username || current.username,
      displayName: current.displayName || user.name || user.username || SETTINGS_PROFILE_EMPTY,
      avatarDataUrl: current.avatarDataUrl,
    }));
  }, [user]);

  useEffect(() => {
    if (!token) return;
    void Promise.all([fetchCrewUsers(token), fetchCrewRoles(token)]).then(([nextUsers, nextRoles]) => {
      if (nextUsers) setUsers(nextUsers);
      if (nextRoles) setRoles(nextRoles);
    });
  }, [token]);

  const isAdmin = user?.role === 'admin' || user?.role === 'crm_admin';
  const canEditSettings = hasTaskPermission(userKey, users, roles, 'settings:edit', isAdmin);

  useEffect(() => {
    if (!token) return;
    void fetchMediaConfig(token).then((config) => {
      if (!config) return;
      setCloudName(config.cloudName);
      setMediaConfigured(config.configured);
      setMediaHasKey(config.hasKey && config.hasSecret);
    });
  }, [token]);

  useEffect(() => {
    const root = document.querySelector('.ink-cms') as HTMLElement | null;
    applyCmsThemeColors(root, colors, mode);
  }, [colors, mode]);

  const onSaveAll = async () => {
    saveCmsProfile(profile);
    saveCmsThemeColors(colors);
    if (userKey) {
      saveUserThemeColors(userKey, colors);
      saveUserNotifyPrefs(userKey, notifyPrefs);
      saveUserChatPrefs(userKey, chatPrefs);
    }
    if (canEditSettings) {
      saveCmsSite(site);
      saveCmsMcp(mcp);
    }
    setLocale(site.locale);
    if (token && cloudName) {
      const ok = await saveMediaCloudName(token, cloudName);
      if (ok) setMediaConfigured(true);
    }
    setDefaultApiErrorMode(site.apiErrorMode);
    const root = document.querySelector('.ink-cms') as HTMLElement | null;
    applyCmsThemeColors(root, colors, mode);
    dispatchCmsSave({
      source: SETTINGS_SAVE_SOURCE,
      profile,
      theme: colors,
      site,
      mcp,
    });
    setSaved(true);
  };

  const navLabel = (id: string): string => {
    const labels: Record<string, string> = {
      [CMS_NAV_IDS.DASHBOARD]: t.cmsShell.dashboard,
      [CMS_NAV_IDS.PAGES]: t.cmsShell.pages,
      [CMS_NAV_IDS.AI_USAGE]: t.cmsShell.aiUsage,
      [CMS_NAV_IDS.BUNDLES]: t.cmsShell.bundles,
      [CMS_NAV_IDS.TEMPLATES]: t.cmsShell.templates,
      [CMS_NAV_IDS.MEDIA]: t.cmsShell.media,
      [CMS_NAV_IDS.CREW]: t.cmsShell.crew,
      [CMS_NAV_IDS.LIVE_EDIT]: t.cmsShell.liveEdit,
      [CMS_NAV_IDS.BUILDER]: t.cmsShell.builder,
      [CMS_NAV_IDS.CALENDAR]: t.cmsShell.calendar,
    };
    return labels[id] || id;
  };

  const onLogoFiles = (files: File[]) => {
    const file = files[0];
    if (!file) return;
    if (file.size > CMS_AVATAR_MAX_BYTES) {
      setAvatarError(true);
      return;
    }
    setAvatarError(false);
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : SETTINGS_PROFILE_EMPTY;
      setSite((current) => ({ ...current, logoDataUrl: result }));
      setSaved(false);
    };
    reader.readAsDataURL(file);
  };

  const applyAvatarUrl = (url: string) => {
    setProfile((current) => ({ ...current, avatarDataUrl: url }));
    setSaved(false);
  };

  const onAvatarFiles = (files: File[]) => {
    const file = files[0];
    if (!file) return;
    if (file.size > CMS_AVATAR_MAX_BYTES) {
      setAvatarError(true);
      return;
    }
    setAvatarError(false);
    if (token) {
      setAvatarUploading(true);
      void uploadAndRegisterMedia(token, file)
        .then((item) => {
          const url = item?.secureUrl || item?.url;
          if (url) {
            applyAvatarUrl(url);
            return;
          }
          const reader = new FileReader();
          reader.onload = () => {
            const result =
              typeof reader.result === 'string' ? reader.result : SETTINGS_PROFILE_EMPTY;
            applyAvatarUrl(result);
          };
          reader.readAsDataURL(file);
        })
        .finally(() => {
          setAvatarUploading(false);
        });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : SETTINGS_PROFILE_EMPTY;
      applyAvatarUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const onColorChange = (key: keyof CmsThemeColors) => (event: ChangeEvent<HTMLInputElement>) => {
    setColors((current) => ({
      ...current,
      [key]: event.target.value,
    }));
    markDirty();
  };

  const markDirty = () => setSaved(false);

  const onCopyMcp = () => {
    void navigator.clipboard.writeText(SETTINGS_MCP_CONFIG_JSON).then(() => {
      setCopied(true);
    });
  };

  const localeOptions = [
    { value: SETTINGS_LOCALE_VALUES.EN, label: t.settings.localeEn },
    { value: SETTINGS_LOCALE_VALUES.ES, label: t.settings.localeEs },
    { value: SETTINGS_LOCALE_VALUES.HE, label: t.settings.localeHe },
    { value: SETTINGS_LOCALE_VALUES.FR, label: t.settings.localeFr },
    { value: SETTINGS_LOCALE_VALUES.DE, label: t.settings.localeDe },
  ];
  const permalinkOptions = [
    { value: SETTINGS_PERMALINK_VALUES.TITLE, label: t.settings.permalinkTitle },
    { value: SETTINGS_PERMALINK_VALUES.ID, label: t.settings.permalinkId },
  ];
  const chatSideOptions = [
    { value: SETTINGS_CHAT_SIDES.RIGHT, label: t.settings.chatRight },
    { value: SETTINGS_CHAT_SIDES.LEFT, label: t.settings.chatLeft },
  ];
  const apiErrorOptions = [
    { value: SETTINGS_API_ERROR_MODES.SNACKBAR, label: t.settings.apiErrorSnackbar },
    { value: SETTINGS_API_ERROR_MODES.MODAL, label: t.settings.apiErrorModal },
    { value: SETTINGS_API_ERROR_MODES.PAGE, label: t.settings.apiErrorPage },
  ];

  const onTestApiFail = () => {
    void useApi(SETTINGS_API_FAIL_URL, undefined, {
      message: t.settings.apiTestFailMessage,
    });
  };

  return (
    <CmsShell activeNavId={CMS_NAV_IDS.SETTINGS}>
      <Flex direction="column" gap={0} className="ink-cms-page">
        <div>
          <Typography variant="h2" className="ink-cms-page__title mb-0">
            {t.settings.title}
          </Typography>
          <Typography variant="body2" className="ink-cms-page__sub mb-0">
            {t.settings.subtitle}
          </Typography>
        </div>

        <Card className="ink-cms-card ink-cms-settings">
          <Tabs defaultTab={SETTINGS_TABS.PROFILE} variant="line">
            <TabList className="mb-4">
              <Tab id={SETTINGS_TABS.PROFILE}>{t.settings.tabProfile}</Tab>
              {chatInstalled ? <Tab id={SETTINGS_TABS.CREW}>{t.settings.tabCrew}</Tab> : null}
              <Tab id={SETTINGS_TABS.SITE}>{t.settings.tabSite}</Tab>
              <Tab id={SETTINGS_TABS.THEME}>{t.settings.tabTheme}</Tab>
              <Tab id={SETTINGS_TABS.MEDIA}>{t.settings.tabMedia}</Tab>
              <Tab id={SETTINGS_TABS.MCP}>{t.settings.tabMcp}</Tab>
              <Tab id={SETTINGS_TABS.API}>{t.settings.tabApi}</Tab>
            </TabList>
            <TabPanel tabId={SETTINGS_TABS.PROFILE}>
              <div className="ink-cms-settings-box">
              <div className="ink-cms-settings-grid">
                <div>
                  <Input
                    id={SETTINGS_PROFILE_INPUT_IDS.USERNAME}
                    label={t.settings.userName}
                    value={profile.username || user?.username || SETTINGS_PROFILE_EMPTY}
                    disabled
                  />
                  <Input
                    id={SETTINGS_PROFILE_INPUT_IDS.DISPLAY_NAME}
                    label={t.settings.displayName}
                    value={profile.displayName}
                    onChange={(event) => {
                      setProfile((current) => ({
                        ...current,
                        displayName: event.target.value,
                      }));
                      markDirty();
                    }}
                  />
                  <SettingsPasswordOtp token={token || SETTINGS_PROFILE_EMPTY} email={user?.email || SETTINGS_PROFILE_EMPTY} />
                  <div className="ink-cms-settings-save">
                    <Button size="sm" variant="ink" onClick={onSaveAll}>
                      {t.settings.saveAll}
                    </Button>
                    {saved ? (
                      <Typography variant="caption" className="ink-cms-save-ok mb-0">
                        {t.settings.saved}
                      </Typography>
                    ) : null}
                  </div>
                </div>
                <div>
                  <div className="ink-cms-avatar-row">
                    <Avatar
                      src={profile.avatarDataUrl || undefined}
                      alt={t.settings.avatar}
                      initials={profileInitials(profile, t.cmsShell.accountFallback)}
                      size="lg"
                      variant="circle"
                    />
                    <div className="ink-cms-avatar-actions">
                      <Button
                        size="sm"
                        variant="outline"
                        className="ink-cms-ghost-btn"
                        disabled={avatarUploading}
                        onClick={() => {
                          const input = document.getElementById(SETTINGS_PROFILE_INPUT_IDS.AVATAR);
                          if (input instanceof HTMLInputElement) {
                            input.click();
                          }
                        }}
                      >
                        {t.settings.avatarUpload}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="ink-cms-ghost-btn"
                        onClick={() => {
                          applyAvatarUrl(SETTINGS_PROFILE_EMPTY);
                        }}
                      >
                        {t.settings.avatarRemove}
                      </Button>
                    </div>
                  </div>
                  <input
                    id={SETTINGS_PROFILE_INPUT_IDS.AVATAR}
                    type="file"
                    accept={SETTINGS_AVATAR_ACCEPT}
                    className="ink-cms-sr"
                    onChange={(event) => {
                      const files = event.target.files ? Array.from(event.target.files) : [];
                      onAvatarFiles(files);
                      event.target.value = SETTINGS_PROFILE_EMPTY;
                    }}
                  />
                  <div className="ink-cms-avatar-hint">
                    {avatarUploading ? t.settings.avatarUploading : t.settings.avatarHint}
                  </div>
                  {avatarError ? (
                    <Alert severity="error" variant="filled">
                      {t.settings.avatarTooLarge}
                    </Alert>
                  ) : null}
                </div>
              </div>
              </div>
            </TabPanel>
            {chatInstalled ? (
            <TabPanel tabId={SETTINGS_TABS.CREW}>
              <div className="ink-cms-settings-box">
                <Typography variant="h5" className="mb-2">
                  {t.settings.chatOptions}
                </Typography>
                <Select
                  label={t.settings.chatSound}
                  value={chatPrefs.sound}
                  onChange={(value) => {
                    setChatPrefs((current) => ({
                      ...current,
                      sound: value as CmsChatSoundMode,
                    }));
                    markDirty();
                  }}
                  options={[
                    { value: SETTINGS_CHAT_SOUND.OFF, label: t.settings.chatSoundOff },
                    { value: SETTINGS_CHAT_SOUND.PRIVATE, label: t.settings.chatSoundPrivate },
                    { value: SETTINGS_CHAT_SOUND.ROOM, label: t.settings.chatSoundRoom },
                    { value: SETTINGS_CHAT_SOUND.ALL, label: t.settings.chatSoundAll },
                  ]}
                  fullWidth
                />
                <Select
                  label={t.settings.chatShow}
                  value={chatPrefs.show}
                  onChange={(value) => {
                    setChatPrefs((current) => ({
                      ...current,
                      show: value as CmsChatShowMode,
                    }));
                    markDirty();
                  }}
                  options={[
                    { value: SETTINGS_CHAT_SHOW.DRAWER, label: t.settings.chatShowDrawer },
                    { value: SETTINGS_CHAT_SHOW.SNACKBAR, label: t.settings.chatShowSnackbar },
                    { value: SETTINGS_CHAT_SHOW.BOTH, label: t.settings.chatShowBoth },
                  ]}
                  fullWidth
                />
                <Input
                  id={SETTINGS_CHAT_COLOR_ID}
                  type={SETTINGS_COLOR_TYPE}
                  label={t.settings.chatColor}
                  value={chatPrefs.color || SETTINGS_CHAT_PREFS_DEFAULTS.color}
                  onChange={(event) => {
                    setChatPrefs((current) => ({ ...current, color: event.target.value }));
                    markDirty();
                  }}
                />
                <div className="ink-cms-settings-save">
                  <Button size="sm" variant="ink" onClick={onSaveAll}>
                    {t.settings.saveAll}
                  </Button>
                  {saved ? (
                    <Typography variant="caption" className="ink-cms-save-ok mb-0">
                      {t.settings.saved}
                    </Typography>
                  ) : null}
                </div>
              </div>
            </TabPanel>
            ) : null}
            <TabPanel tabId={SETTINGS_TABS.SITE}>
              <div className="ink-cms-settings-split">
                <nav className="ink-cms-settings-split__nav" aria-label={t.settings.tabSite}>
                  {(
                    [
                      [SETTINGS_SITE_PANELS.GENERAL, t.settings.sectionGeneral],
                      [SETTINGS_SITE_PANELS.WRITING, t.settings.sectionWriting],
                      [SETTINGS_SITE_PANELS.DISCUSSION, t.settings.sectionDiscussion],
                      [SETTINGS_SITE_PANELS.CHROME, t.settings.sectionChrome],
                      [SETTINGS_SITE_PANELS.READING, t.settings.sectionReading],
                      [SETTINGS_SITE_PANELS.MEDIA, t.settings.tabMedia],
                    ] as const
                  ).map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      className={`ink-cms-settings-split__tab${sitePanel === id ? ' ink-cms-settings-split__tab--active' : ''}`}
                      onClick={() => setSitePanel(id)}
                    >
                      {label}
                    </button>
                  ))}
                </nav>
                <div className="ink-cms-settings-split__box">
              <Flex direction="column" gap={0} className="ink-cms-settings__fields">
                {sitePanel === SETTINGS_SITE_PANELS.GENERAL ? (
                <SettingsSection
                  title={t.settings.sectionGeneral}
                  description={t.settings.sectionGeneralHint}
                >
                  <Input
                    id={SETTINGS_SITE_INPUT_IDS.SITE_NAME}
                    label={t.settings.siteName}
                    value={site.siteName}
                    onChange={(event) => {
                      setSite((current) => ({
                        ...current,
                        siteName: event.target.value,
                      }));
                      markDirty();
                    }}
                  />
                  <Input
                    id={SETTINGS_SITE_INPUT_IDS.TAGLINE}
                    label={t.settings.tagline}
                    value={site.tagline}
                    onChange={(event) => {
                      setSite((current) => ({
                        ...current,
                        tagline: event.target.value,
                      }));
                      markDirty();
                    }}
                  />
                  <Input
                    id={SETTINGS_SITE_INPUT_IDS.SEO_TITLE}
                    label={t.settings.seoTitle}
                    value={site.seoTitle}
                    onChange={(event) => {
                      setSite((current) => ({
                        ...current,
                        seoTitle: event.target.value,
                      }));
                      markDirty();
                    }}
                  />
                  <Input
                    id={SETTINGS_SITE_INPUT_IDS.SEO_DESCRIPTION}
                    label={t.settings.seoDescription}
                    value={site.seoDescription}
                    onChange={(event) => {
                      setSite((current) => ({
                        ...current,
                        seoDescription: event.target.value,
                      }));
                      markDirty();
                    }}
                  />
                  <FileUpload
                    id={SETTINGS_SITE_INPUT_IDS.LOGO}
                    label={t.settings.siteLogo}
                    accept={SETTINGS_AVATAR_ACCEPT}
                    multiple={false}
                    maxFiles={SETTINGS_LOGO_MAX_FILES}
                    maxSize={CMS_AVATAR_MAX_BYTES}
                    variant="dropzone"
                    helperText={t.settings.logoHint}
                    error={avatarError ? t.settings.avatarTooLarge : undefined}
                    onFilesSelect={onLogoFiles}
                  />
                  {site.logoDataUrl ? (
                    <img
                      src={site.logoDataUrl}
                      alt={t.settings.siteLogo}
                      className="ink-cms-site-logo"
                    />
                  ) : null}
                  <Select
                    id={SETTINGS_SITE_INPUT_IDS.PERMALINK}
                    label={t.settings.permalinkStyle}
                    options={permalinkOptions}
                    value={site.permalinkStyle}
                    onChange={(value) => {
                      const next: CmsPermalinkStyle =
                        value === SETTINGS_PERMALINK_VALUES.ID
                          ? SETTINGS_PERMALINK_VALUES.ID
                          : SETTINGS_PERMALINK_VALUES.TITLE;
                      setSite((current) => ({ ...current, permalinkStyle: next }));
                      markDirty();
                    }}
                    fullWidth
                  />
                  <Select
                    id={SETTINGS_SITE_INPUT_IDS.LOCALE}
                    label={t.settings.locale}
                    options={localeOptions}
                    value={site.locale}
                    onChange={(value) => {
                      const next = ALL_LOCALES.includes(value as Locale)
                        ? (value as Locale)
                        : SETTINGS_LOCALE_VALUES.EN;
                      setSite((current) => ({
                        ...current,
                        locale: next,
                      }));
                      markDirty();
                    }}
                    fullWidth
                  />
                </SettingsSection>
                ) : null}
                {sitePanel === SETTINGS_SITE_PANELS.WRITING ? (
                <SettingsSection
                  title={t.settings.sectionWriting}
                  description={t.settings.sectionWritingHint}
                >
                  <Select
                    id={SETTINGS_SITE_INPUT_IDS.TIMEZONE}
                    label={t.settings.timezone}
                    options={[...SETTINGS_TIMEZONE_OPTIONS]}
                    value={site.timezone}
                    onChange={(value) => {
                      setSite((current) => ({ ...current, timezone: value }));
                      markDirty();
                    }}
                    fullWidth
                  />
                  <Select
                    id={SETTINGS_SITE_INPUT_IDS.DATE_FORMAT}
                    label={t.settings.dateFormat}
                    options={[...SETTINGS_DATE_FORMAT_OPTIONS]}
                    value={site.dateFormat}
                    onChange={(value) => {
                      setSite((current) => ({ ...current, dateFormat: value }));
                      markDirty();
                    }}
                    fullWidth
                  />
                  <Input
                    id={SETTINGS_SITE_INPUT_IDS.FROM_EMAIL}
                    label={t.settings.fromEmail}
                    value={site.fromEmail}
                    onChange={(event) => {
                      setSite((current) => ({
                        ...current,
                        fromEmail: event.target.value,
                      }));
                      markDirty();
                    }}
                  />
                </SettingsSection>
                ) : null}
                {sitePanel === SETTINGS_SITE_PANELS.DISCUSSION ? (
                <SettingsSection
                  title={t.settings.sectionDiscussion}
                  description={t.settings.sectionDiscussionHint}
                >
                  <SettingsToggleRow
                    id={SETTINGS_SITE_INPUT_IDS.REGISTER}
                    label={t.settings.anyoneCanRegister}
                    description={t.settings.anyoneCanRegisterHint}
                    checked={site.anyoneCanRegister}
                    onCheckedChange={(checked) => {
                      setSite((current) => ({ ...current, anyoneCanRegister: checked }));
                      markDirty();
                    }}
                  />
                  <SettingsToggleRow
                    id={SETTINGS_SITE_INPUT_IDS.SEARCH_ENGINES}
                    label={t.settings.searchEngineVisible}
                    description={t.settings.searchEngineVisibleHint}
                    checked={site.searchEngineVisible}
                    onCheckedChange={(checked) => {
                      setSite((current) => ({ ...current, searchEngineVisible: checked }));
                      markDirty();
                    }}
                  />
                  <SettingsToggleRow
                    id={SETTINGS_SITE_INPUT_IDS.COMMENTS}
                    label={t.settings.allowComments}
                    description={t.settings.allowCommentsHint}
                    checked={site.allowComments}
                    onCheckedChange={(checked) => {
                      setSite((current) => ({ ...current, allowComments: checked }));
                      markDirty();
                    }}
                  />
                </SettingsSection>
                ) : null}
                {sitePanel === SETTINGS_SITE_PANELS.CHROME ? (
                <SettingsSection
                  title={t.settings.sectionChrome}
                  description={t.settings.sectionChromeHint}
                >
                  <SettingsToggleRow
                    id={SETTINGS_SITE_INPUT_IDS.TOP_NAV}
                    label={t.settings.showTopNav}
                    description={t.settings.showTopNavHint}
                    checked={site.showTopNav}
                    onCheckedChange={(checked) => {
                      setSite((current) => ({ ...current, showTopNav: checked }));
                      markDirty();
                    }}
                  />
                  <SettingsToggleRow
                    id={SETTINGS_SITE_INPUT_IDS.BOTTOM_NAV}
                    label={t.settings.showBottomNav}
                    description={t.settings.showBottomNavHint}
                    checked={site.showBottomNav}
                    onCheckedChange={(checked) => {
                      setSite((current) => ({ ...current, showBottomNav: checked }));
                      markDirty();
                    }}
                  />
                  <SettingsToggleRow
                    id={SETTINGS_SITE_INPUT_IDS.AGENT}
                    label={t.settings.showAgent}
                    description={t.settings.showAgentHint}
                    checked={site.showAgent}
                    onCheckedChange={(checked) => {
                      setSite((current) => ({ ...current, showAgent: checked }));
                      markDirty();
                    }}
                  />
                  <Select
                    id={SETTINGS_SITE_INPUT_IDS.CHAT_SIDE}
                    label={t.settings.chatSide}
                    options={chatSideOptions}
                    value={site.chatSide}
                    onChange={(value) => {
                      const next: CmsChatSide =
                        value === SETTINGS_CHAT_SIDES.LEFT
                          ? SETTINGS_CHAT_SIDES.LEFT
                          : SETTINGS_CHAT_SIDES.RIGHT;
                      setSite((current) => ({ ...current, chatSide: next }));
                      markDirty();
                    }}
                    fullWidth
                  />
                  <div>
                    <Typography variant="h5" className="mb-1">
                      {t.settings.navVisibility}
                    </Typography>
                    <Typography variant="caption" className="ink-cms__muted mb-2 block">
                      {t.settings.navHint}
                    </Typography>
                    <div className="ink-cms-settings__nav">
                      {SETTINGS_NAV_TOGGLE_IDS.map((id) => (
                        <Switch
                          key={id}
                          id={`ink-cms-nav-${id}`}
                          label={navLabel(id)}
                          checked={!site.hiddenNavIds.includes(id)}
                          onCheckedChange={(checked) => {
                            setSite((current) => ({
                              ...current,
                              hiddenNavIds: checked
                                ? current.hiddenNavIds.filter((item) => item !== id)
                                : [...current.hiddenNavIds, id],
                            }));
                            markDirty();
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </SettingsSection>
                ) : null}
                {sitePanel === SETTINGS_SITE_PANELS.READING ? (
                <SettingsSection
                  title={t.settings.sectionReading}
                  description={t.settings.sectionReadingHint}
                >
                  <Input
                    id={SETTINGS_SITE_INPUT_IDS.HOMEPAGE}
                    label={t.settings.homepagePath}
                    value={site.homepagePath}
                    onChange={(event) => {
                      setSite((current) => ({
                        ...current,
                        homepagePath: event.target.value,
                      }));
                      markDirty();
                    }}
                  />
                  <Input
                    id={SETTINGS_SITE_INPUT_IDS.POSTS_PER_PAGE}
                    label={t.settings.postsPerPage}
                    value={site.postsPerPage}
                    onChange={(event) => {
                      setSite((current) => ({
                        ...current,
                        postsPerPage: event.target.value,
                      }));
                      markDirty();
                    }}
                  />
                  <Input
                    id={SETTINGS_SITE_INPUT_IDS.LOADING_MESSAGE}
                    label={t.settings.loadingMessage}
                    value={site.loadingMessage}
                    onChange={(event) => {
                      setSite((current) => ({
                        ...current,
                        loadingMessage: event.target.value,
                      }));
                      markDirty();
                    }}
                  />
                  <Select
                    id={SETTINGS_SITE_INPUT_IDS.LOADING_SIZE}
                    label={t.settings.loadingSize}
                    options={[
                      { value: 'sm', label: t.settings.loadingSizeSm },
                      { value: 'md', label: t.settings.loadingSizeMd },
                      { value: 'lg', label: t.settings.loadingSizeLg },
                    ]}
                    value={site.loadingSize}
                    onChange={(value) => {
                      const next =
                        value === 'sm' || value === 'lg' || value === 'md' ? value : 'md';
                      setSite((current) => ({ ...current, loadingSize: next }));
                      markDirty();
                    }}
                    fullWidth
                  />
                </SettingsSection>
                ) : null}
                {sitePanel === SETTINGS_SITE_PANELS.MEDIA ? (
                <SettingsSection
                  title={t.settings.sectionMedia}
                  description={t.settings.sectionMediaHint}
                >
                  <Input
                    id={`${SETTINGS_MEDIA_INPUT_IDS.CLOUD_NAME}-site`}
                    label={t.settings.cloudName}
                    value={cloudName}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setCloudName(parseCloudinaryCloudName(event.target.value) || event.target.value);
                      setMediaConfigured(false);
                      markDirty();
                    }}
                  />
                  <Typography variant="caption" className="ink-cms__muted mb-0">
                    {t.settings.cloudNameHint}
                  </Typography>
                  {mediaHasKey && cloudName && mediaConfigured ? (
                    <Alert severity="success">{t.settings.mediaReady}</Alert>
                  ) : (
                    <Alert severity="warning">{t.settings.mediaNeedsCloudName}</Alert>
                  )}
                </SettingsSection>
                ) : null}
                <div className="ink-cms-settings-save">
                  <Button size="sm" variant="ink" disabled={!canEditSettings} onClick={onSaveAll}>
                    {t.settings.saveAll}
                  </Button>
                  {saved ? (
                    <Typography variant="caption" className="ink-cms-save-ok mb-0">
                      {t.settings.saved}
                    </Typography>
                  ) : null}
                </div>
              </Flex>
                </div>
              </div>
            </TabPanel>
            <TabPanel tabId={SETTINGS_TABS.THEME}>
              <div className="ink-cms-settings-box">
              <Flex direction="column" gap={3} className="ink-cms-settings__fields ink-cms-settings__fields--theme">
                <Typography variant="h5" className="mb-0">
                  {t.settings.themeTitle}
                </Typography>
                <Typography variant="caption" className="ink-cms__muted mb-0">
                  {t.settings.themeHint}
                </Typography>
                <Typography variant="caption" className="mb-0">
                  {t.settings.themeLooks}
                </Typography>
                <Flex gap={2} className="flex-wrap">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setColors({ ...SETTINGS_THEME_DEFAULTS_LIGHT });
                      markDirty();
                    }}
                  >
                    {t.settings.themePresetLight}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setColors({ ...SETTINGS_THEME_DEFAULTS_DARK });
                      markDirty();
                    }}
                  >
                    {t.settings.themePresetDark}
                  </Button>
                  {CMS_LOOKS.map((look) => (
                    <Button
                      key={look.id}
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setColors({
                          primary: look.primary,
                          accent: look.accent,
                          background: look.background,
                        });
                        markDirty();
                      }}
                    >
                      {look.id}
                    </Button>
                  ))}
                </Flex>
                <Typography variant="caption" className="mb-0">
                  {t.settings.notifyTitle}
                </Typography>
                <SettingsToggleRow
                  id="ink-cms-notify-in-app"
                  label={t.settings.notifyInApp}
                  description={t.settings.notifyInApp}
                  checked={notifyPrefs.inApp}
                  onCheckedChange={(checked) => {
                    setNotifyPrefs((current) => ({ ...current, inApp: checked }));
                    markDirty();
                  }}
                />
                <SettingsToggleRow
                  id="ink-cms-notify-email"
                  label={t.settings.notifyEmail}
                  description={t.settings.notifyEmail}
                  checked={notifyPrefs.email}
                  onCheckedChange={(checked) => {
                    setNotifyPrefs((current) => ({ ...current, email: checked }));
                    markDirty();
                  }}
                />
                <SettingsToggleRow
                  id="ink-cms-notify-preview"
                  label={t.settings.notifyPreview}
                  description={t.settings.notifyPreviewHint}
                  checked={notifyPrefs.showPreview}
                  onCheckedChange={(checked) => {
                    setNotifyPrefs((current) => ({ ...current, showPreview: checked }));
                    markDirty();
                  }}
                />
                <div className="ink-cms-theme-preview">
                  <div
                    className="ink-cms-theme-preview__bar"
                    style={{ background: colors.primary }}
                  />
                  <div
                    className="ink-cms-theme-preview__body"
                    style={{ background: colors.background }}
                  >
                    <span
                      className="ink-cms-theme-preview__chip"
                      style={{ background: colors.accent }}
                    >
                      {t.settings.themePreview}
                    </span>
                  </div>
                </div>
                <div className="ink-cms-theme-row">
                  <div className="ink-cms-theme-swatch">
                    <input
                      id={SETTINGS_COLOR_INPUT_IDS.PRIMARY}
                      type={SETTINGS_COLOR_TYPE}
                      value={colors.primary}
                      onChange={onColorChange('primary')}
                      aria-label={t.settings.primaryColor}
                    />
                  </div>
                  <Input
                    label={t.settings.primaryColor}
                    value={colors.primary}
                    onChange={onColorChange('primary')}
                  />
                </div>
                <div className="ink-cms-theme-row">
                  <div className="ink-cms-theme-swatch">
                    <input
                      id={SETTINGS_COLOR_INPUT_IDS.ACCENT}
                      type={SETTINGS_COLOR_TYPE}
                      value={colors.accent}
                      onChange={onColorChange('accent')}
                      aria-label={t.settings.accentColor}
                    />
                  </div>
                  <Input
                    label={t.settings.accentColor}
                    value={colors.accent}
                    onChange={onColorChange('accent')}
                  />
                </div>
                <div className="ink-cms-theme-row">
                  <div className="ink-cms-theme-swatch">
                    <input
                      id={SETTINGS_COLOR_INPUT_IDS.BACKGROUND}
                      type={SETTINGS_COLOR_TYPE}
                      value={colors.background}
                      onChange={onColorChange('background')}
                      aria-label={t.settings.backgroundColor}
                    />
                  </div>
                  <Input
                    label={t.settings.backgroundColor}
                    value={colors.background}
                    onChange={onColorChange('background')}
                  />
                </div>
                <div className="ink-cms-settings-save">
                  <Button size="sm" variant="ink" onClick={onSaveAll}>
                    {t.settings.saveAll}
                  </Button>
                  {saved ? (
                    <Typography variant="caption" className="ink-cms-save-ok mb-0">
                      {t.settings.saved}
                    </Typography>
                  ) : null}
                </div>
              </Flex>
              </div>
            </TabPanel>
            <TabPanel tabId={SETTINGS_TABS.MEDIA}>
              <div className="ink-cms-settings-box">
              <Flex direction="column" gap={3} className="ink-cms-settings__fields">
                <SettingsSection
                  title={t.settings.sectionMedia}
                  description={t.settings.sectionMediaHint}
                >
                  <Input
                    id={SETTINGS_MEDIA_INPUT_IDS.CLOUD_NAME}
                    label={t.settings.cloudName}
                    value={cloudName}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setCloudName(parseCloudinaryCloudName(event.target.value) || event.target.value);
                      setMediaConfigured(false);
                      markDirty();
                    }}
                  />
                  <Typography variant="caption" className="ink-cms__muted mb-0">
                    {t.settings.cloudNameHint}
                  </Typography>
                  {mediaHasKey && cloudName && mediaConfigured ? (
                    <Alert severity="success">{t.settings.mediaReady}</Alert>
                  ) : (
                    <Alert severity="warning">{t.settings.mediaNeedsCloudName}</Alert>
                  )}
                </SettingsSection>
                <div className="ink-cms-settings-save">
                  <Button size="sm" variant="ink" onClick={onSaveAll}>
                    {t.settings.mediaSaveCloud}
                  </Button>
                  {saved ? (
                    <Typography variant="caption" className="ink-cms-save-ok mb-0">
                      {t.settings.saved}
                    </Typography>
                  ) : null}
                </div>
              </Flex>
              </div>
            </TabPanel>
            <TabPanel tabId={SETTINGS_TABS.MCP}>
              <div className="ink-cms-settings-box">
              <Flex direction="column" gap={3} className="ink-cms-settings__fields">
                <Switch
                  id={SETTINGS_MCP_INPUT_IDS.ENABLED}
                  label={t.settings.mcpEnabled}
                  checked={mcp.enabled}
                  onCheckedChange={(checked) => {
                    setMcp({ enabled: checked });
                    markDirty();
                  }}
                />
                <div>
                  <Typography variant="h5" className="mb-2">
                    {t.settings.mcpTools}
                  </Typography>
                  <ul className="ink-cms-mcp-tools">
                    {SETTINGS_MCP_TOOL_NAMES.map((name) => (
                      <li key={name}>
                        <Typography variant="caption" className="mb-0">
                          {name}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Typography variant="h5" className="mb-2">
                    {t.settings.mcpConfig}
                  </Typography>
                  <pre className="ink-cms-code">{SETTINGS_MCP_CONFIG_JSON}</pre>
                  <Button size="sm" variant="outline" onClick={onCopyMcp}>
                    {copied ? t.settings.mcpCopied : t.settings.mcpCopy}
                  </Button>
                </div>
                <div className="ink-cms-settings-save">
                  <Button size="sm" variant="ink" onClick={onSaveAll}>
                    {t.settings.saveAll}
                  </Button>
                  {saved ? (
                    <Typography variant="caption" className="ink-cms-save-ok mb-0">
                      {t.settings.saved}
                    </Typography>
                  ) : null}
                </div>
              </Flex>
              </div>
            </TabPanel>
            <TabPanel tabId={SETTINGS_TABS.API}>
              <div className="ink-cms-settings-box">
              <Flex direction="column" gap={3} className="ink-cms-settings__fields">
                <SettingsSection
                  title={t.settings.sectionApi}
                  description={t.settings.sectionApiHint}
                >
                  <Select
                    id={SETTINGS_SITE_INPUT_IDS.API_ERROR}
                    label={t.settings.apiErrorMode}
                    options={apiErrorOptions}
                    value={site.apiErrorMode}
                    onChange={(value) => {
                      const next =
                        value === SETTINGS_API_ERROR_MODES.PAGE
                          ? SETTINGS_API_ERROR_MODES.PAGE
                          : value === SETTINGS_API_ERROR_MODES.MODAL
                            ? SETTINGS_API_ERROR_MODES.MODAL
                            : SETTINGS_API_ERROR_MODES.SNACKBAR;
                      setSite((current) => ({ ...current, apiErrorMode: next }));
                      markDirty();
                    }}
                    fullWidth
                  />
                  <Typography variant="caption" className="ink-cms__muted mb-0">
                    {t.settings.apiErrorHint}
                  </Typography>
                  <Button size="sm" variant="outline" onClick={onTestApiFail}>
                    {t.settings.apiTestFail}
                  </Button>
                </SettingsSection>
                <div className="ink-cms-settings-save">
                  <Button size="sm" variant="ink" onClick={onSaveAll}>
                    {t.settings.saveAll}
                  </Button>
                  {saved ? (
                    <Typography variant="caption" className="ink-cms-save-ok mb-0">
                      {t.settings.saved}
                    </Typography>
                  ) : null}
                </div>
              </Flex>
              </div>
            </TabPanel>
          </Tabs>
        </Card>
      </Flex>
    </CmsShell>
  );
};
