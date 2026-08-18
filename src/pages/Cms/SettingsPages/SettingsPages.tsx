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
import { useI18n } from '@i18n/index';
import { CMS_AVATAR_MAX_BYTES } from '@const/index';
import { dispatchCmsSave } from '@sdk/cmsSave';
import { CmsShell, CMS_NAV_IDS } from '../CmsShell';
import {
  SETTINGS_AVATAR_ACCEPT,
  SETTINGS_CHAT_SIDES,
  SETTINGS_COLOR_INPUT_IDS,
  SETTINGS_COLOR_TYPE,
  SETTINGS_FILE_TYPE,
  SETTINGS_LOCALE_VALUES,
  SETTINGS_LOGO_MAX_FILES,
  SETTINGS_MCP_CONFIG_JSON,
  SETTINGS_MCP_INPUT_IDS,
  SETTINGS_MCP_TOOL_NAMES,
  SETTINGS_NAV_TOGGLE_IDS,
  SETTINGS_PASSWORD_TYPE,
  SETTINGS_PERMALINK_VALUES,
  SETTINGS_PROFILE_EMPTY,
  SETTINGS_PROFILE_INPUT_IDS,
  SETTINGS_SAVE_SOURCE,
  SETTINGS_SITE_INPUT_IDS,
  SETTINGS_TABS,
  SETTINGS_TIMEZONE_OPTIONS,
  SETTINGS_DATE_FORMAT_OPTIONS,
} from './SettingsPages.const';
import type { CmsChatSide, CmsPermalinkStyle } from './SettingsPages.types';
import type { CmsMcp, CmsProfile, CmsSite, CmsThemeColors } from './SettingsPages.types';
import {
  applyCmsThemeColors,
  loadCmsMcp,
  loadCmsProfile,
  loadCmsSite,
  loadCmsThemeColors,
  profileInitials,
  saveCmsMcp,
  saveCmsProfile,
  saveCmsSite,
  saveCmsThemeColors,
} from './SettingsPages.utils';
import { SettingsSection } from './components/SettingsSection';
import { SettingsToggleRow } from './components/SettingsToggleRow';

export const SettingsPages: FC = () => {
  const { t } = useI18n();
  const { mode } = useBearMode();
  const [colors, setColors] = useState<CmsThemeColors>(() => loadCmsThemeColors());
  const [profile, setProfile] = useState<CmsProfile>(() => loadCmsProfile());
  const [site, setSite] = useState<CmsSite>(() => loadCmsSite());
  const [mcp, setMcp] = useState<CmsMcp>(() => loadCmsMcp());
  const [password, setPassword] = useState(SETTINGS_PROFILE_EMPTY);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  useEffect(() => {
    const root = document.querySelector('.ink-cms') as HTMLElement | null;
    applyCmsThemeColors(root, colors, mode);
  }, [colors, mode]);

  const onSaveAll = () => {
    saveCmsProfile(profile);
    saveCmsThemeColors(colors);
    saveCmsSite(site);
    saveCmsMcp(mcp);
    const root = document.querySelector('.ink-cms') as HTMLElement | null;
    applyCmsThemeColors(root, colors, mode);
    dispatchCmsSave({
      source: SETTINGS_SAVE_SOURCE,
      profile,
      password: password || undefined,
      theme: colors,
      site,
      mcp,
    });
    setPassword(SETTINGS_PROFILE_EMPTY);
    setSaved(true);
  };

  const navLabel = (id: string): string => {
    const labels: Record<string, string> = {
      [CMS_NAV_IDS.DASHBOARD]: t.cmsShell.dashboard,
      [CMS_NAV_IDS.CONTENT]: t.cmsShell.content,
      [CMS_NAV_IDS.TEMPLATES]: t.cmsShell.templates,
      [CMS_NAV_IDS.MEDIA]: t.cmsShell.media,
      [CMS_NAV_IDS.CREW]: t.cmsShell.crew,
      [CMS_NAV_IDS.LIVE_EDIT]: t.cmsShell.liveEdit,
      [CMS_NAV_IDS.BUILDER]: t.cmsShell.builder,
      [CMS_NAV_IDS.EXTENSIONS]: t.cmsShell.extensions,
      [CMS_NAV_IDS.PLANS]: t.cmsShell.plans,
      [CMS_NAV_IDS.DATABASE]: t.cmsShell.database,
      [CMS_NAV_IDS.ANALYTICS]: t.cmsShell.analytics,
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

  const onAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > CMS_AVATAR_MAX_BYTES) {
      setAvatarError(true);
      return;
    }
    setAvatarError(false);
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : SETTINGS_PROFILE_EMPTY;
      setProfile((current) => ({ ...current, avatarDataUrl: result }));
      setSaved(false);
    };
    reader.readAsDataURL(file);
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
  ];
  const permalinkOptions = [
    { value: SETTINGS_PERMALINK_VALUES.TITLE, label: t.settings.permalinkTitle },
    { value: SETTINGS_PERMALINK_VALUES.ID, label: t.settings.permalinkId },
  ];
  const chatSideOptions = [
    { value: SETTINGS_CHAT_SIDES.RIGHT, label: t.settings.chatRight },
    { value: SETTINGS_CHAT_SIDES.LEFT, label: t.settings.chatLeft },
  ];

  return (
    <CmsShell activeNavId={CMS_NAV_IDS.SETTINGS}>
      <Flex direction="column" gap={4}>
        <div>
          <Typography variant="h2" className="mb-1">
            {t.settings.title}
          </Typography>
          <Typography variant="body2" className="ink-cms__muted mb-0">
            {t.settings.subtitle}
          </Typography>
        </div>

        <Card className="ink-cms-card ink-cms-settings">
          <Tabs defaultTab={SETTINGS_TABS.PROFILE} variant="line">
            <TabList className="mb-4">
              <Tab id={SETTINGS_TABS.PROFILE}>{t.settings.tabProfile}</Tab>
              <Tab id={SETTINGS_TABS.SITE}>{t.settings.tabSite}</Tab>
              <Tab id={SETTINGS_TABS.THEME}>{t.settings.tabTheme}</Tab>
              <Tab id={SETTINGS_TABS.MCP}>{t.settings.tabMcp}</Tab>
            </TabList>
            <TabPanel tabId={SETTINGS_TABS.PROFILE}>
              <Flex direction="column" gap={3} className="ink-cms-settings__fields">
                <Input
                  id={SETTINGS_PROFILE_INPUT_IDS.USERNAME}
                  label={t.settings.userName}
                  value={profile.username}
                  onChange={(event) => {
                    setProfile((current) => ({
                      ...current,
                      username: event.target.value,
                    }));
                    markDirty();
                  }}
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
                <Input
                  id={SETTINGS_PROFILE_INPUT_IDS.PASSWORD}
                  type={SETTINGS_PASSWORD_TYPE}
                  label={t.settings.password}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    markDirty();
                  }}
                />
                <Flex align="center" gap={3}>
                  <Avatar
                    src={profile.avatarDataUrl || undefined}
                    alt={t.settings.avatar}
                    initials={profileInitials(profile, t.cmsShell.accountFallback)}
                    size="lg"
                    variant="circle"
                  />
                  <Input
                    id={SETTINGS_PROFILE_INPUT_IDS.AVATAR}
                    type={SETTINGS_FILE_TYPE}
                    label={t.settings.avatar}
                    accept={SETTINGS_AVATAR_ACCEPT}
                    onChange={onAvatar}
                  />
                </Flex>
                {avatarError ? (
                  <Alert severity="error" variant="filled">
                    {t.settings.avatarTooLarge}
                  </Alert>
                ) : null}
              </Flex>
            </TabPanel>
            <TabPanel tabId={SETTINGS_TABS.SITE}>
              <Flex direction="column" gap={0} className="ink-cms-settings__fields">
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
                      setSite((current) => ({
                        ...current,
                        locale: value === SETTINGS_LOCALE_VALUES.ES
                          ? SETTINGS_LOCALE_VALUES.ES
                          : SETTINGS_LOCALE_VALUES.EN,
                      }));
                      markDirty();
                    }}
                    fullWidth
                  />
                </SettingsSection>
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
              </Flex>
            </TabPanel>
            <TabPanel tabId={SETTINGS_TABS.THEME}>
              <Flex direction="column" gap={3} className="ink-cms-settings__fields">
                <Input
                  id={SETTINGS_COLOR_INPUT_IDS.PRIMARY}
                  type={SETTINGS_COLOR_TYPE}
                  label={t.settings.primaryColor}
                  value={colors.primary}
                  onChange={(event) => {
                    setColors((current) => ({
                      ...current,
                      primary: event.target.value,
                    }));
                    markDirty();
                  }}
                />
                <Input
                  id={SETTINGS_COLOR_INPUT_IDS.ACCENT}
                  type={SETTINGS_COLOR_TYPE}
                  label={t.settings.accentColor}
                  value={colors.accent}
                  onChange={(event) => {
                    setColors((current) => ({
                      ...current,
                      accent: event.target.value,
                    }));
                    markDirty();
                  }}
                />
                <Input
                  id={SETTINGS_COLOR_INPUT_IDS.BACKGROUND}
                  type={SETTINGS_COLOR_TYPE}
                  label={t.settings.backgroundColor}
                  value={colors.background}
                  onChange={(event) => {
                    setColors((current) => ({
                      ...current,
                      background: event.target.value,
                    }));
                    markDirty();
                  }}
                />
              </Flex>
            </TabPanel>
            <TabPanel tabId={SETTINGS_TABS.MCP}>
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
              </Flex>
            </TabPanel>
          </Tabs>
          <Flex gap={2} align="center" className="mt-4">
            <Button size="sm" variant="ink" onClick={onSaveAll}>
              {t.settings.saveAll}
            </Button>
            {saved ? (
              <Typography variant="caption" className="ink-cms-save-ok mb-0">
                {t.settings.saved}
              </Typography>
            ) : null}
          </Flex>
        </Card>
      </Flex>
    </CmsShell>
  );
};
