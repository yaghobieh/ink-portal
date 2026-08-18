import { useState, type FC, type MouseEvent } from 'react';
import { useNavigate } from '@forgedevstack/forge-compass/react';
import {
  Avatar,
  Badge,
  BearIcons,
  Button,
  Card,
  Flex,
  Input,
  Modal,
  Select,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Typography,
} from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { CMS_ICON_SIZE } from '@const/numbers.const';
import { ROUTES } from '@const/routes.const';
import { CmsShell, CMS_NAV_IDS } from '../CmsShell';
import {
  BIF_DYNAMIC_EXTENSION_ID,
  EXTENSION_AUTHOR_SELECT_ID,
  EXTENSION_EXTERNAL_INPUT_ID,
  EXTENSION_FILTER_ALL,
  EXTENSION_GIT_SELECT_ID,
  EXTENSION_INSTALL_DELAY_MS,
  EXTENSION_KIND_SELECT_ID,
  EXTENSION_KINDS,
  EXTENSION_PRICE_FREE,
  EXTENSION_SEARCH_EMPTY,
  EXTENSION_SEARCH_INPUT_ID,
  EXTENSION_TABS,
} from './ExtensionsPages.const';
import {
  EXTENSION_CSS_SAMPLE,
  EXTENSION_EVENT_SAMPLE,
  EXTENSION_JS_SAMPLE,
  EXTENSION_MANIFEST_SAMPLE,
  EXTENSION_REACT_SAMPLE,
  EXTENSION_SCAFFOLD_TREE,
} from './ExtensionsPages.docs.const';
import type { ExtensionItem, ExtensionKind } from './ExtensionsPages.types';
import {
  createExternalPlugin,
  extensionInitials,
  filterStoreItems,
  formatCompactCount,
  isGitHttpsUrl,
  loadExternalPlugins,
  mergeCatalogWithInstalled,
  saveExternalPlugins,
  saveInstalledExtensionIds,
  storeIconTone,
  uniqueAuthors,
  uniqueGitRepos,
} from './ExtensionsPages.utils';

export const ExtensionsPages: FC = () => {
  const { t } = useI18n();
  const { navigate } = useNavigate();
  const [items, setItems] = useState<ExtensionItem[]>(() => mergeCatalogWithInstalled());
  const [query, setQuery] = useState(EXTENSION_SEARCH_EMPTY);
  const [kind, setKind] = useState(EXTENSION_FILTER_ALL);
  const [author, setAuthor] = useState(EXTENSION_FILTER_ALL);
  const [git, setGit] = useState(EXTENSION_FILTER_ALL);
  const [selected, setSelected] = useState<ExtensionItem | null>(null);
  const [externalUrl, setExternalUrl] = useState(EXTENSION_SEARCH_EMPTY);
  const [externalNotice, setExternalNotice] = useState(EXTENSION_SEARCH_EMPTY);

  const persistInstalled = (next: ExtensionItem[]) => {
    const ids = next.filter((item) => item.status === 'installed').map((item) => item.id);
    saveInstalledExtensionIds(ids);
  };

  const install = (id: string) => {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, status: 'installing' } : item)),
    );
    setSelected((current) =>
      current && current.id === id ? { ...current, status: 'installing' } : current,
    );
    window.setTimeout(() => {
      setItems((current) => {
        const next = current.map((item) =>
          item.id === id ? { ...item, status: 'installed' as const } : item,
        );
        persistInstalled(next);
        return next;
      });
      setSelected((current) =>
        current && current.id === id ? { ...current, status: 'installed' } : current,
      );
      if (id === BIF_DYNAMIC_EXTENSION_ID) {
        navigate(ROUTES.CMS_BUILDER);
      }
    }, EXTENSION_INSTALL_DELAY_MS);
  };

  const statusLabel = (status: ExtensionItem['status']): string => {
    if (status === 'installed') return t.cmsExtensions.statusInstalled;
    if (status === 'coming') return t.cmsExtensions.statusComing;
    if (status === 'installing') return t.cmsExtensions.statusInstalling;
    return t.cmsExtensions.statusAvailable;
  };

  const kindLabel = (value: ExtensionKind): string => {
    if (value === EXTENSION_KINDS.THEME) return t.cmsExtensions.kindTheme;
    if (value === EXTENSION_KINDS.SEO) return t.cmsExtensions.kindSeo;
    if (value === EXTENSION_KINDS.EDITOR) return t.cmsExtensions.kindEditor;
    if (value === EXTENSION_KINDS.COLLAB) return t.cmsExtensions.kindCollab;
    if (value === EXTENSION_KINDS.PUBLISH) return t.cmsExtensions.kindPublish;
    if (value === EXTENSION_KINDS.BUILDER) return t.cmsExtensions.kindBuilder;
    if (value === EXTENSION_KINDS.FORM) return t.cmsExtensions.kindForm;
    return t.cmsExtensions.kindBridge;
  };

  const onAddExternal = () => {
    const nextUrl = externalUrl.trim();
    if (!isGitHttpsUrl(nextUrl)) {
      setExternalNotice(t.cmsExtensions.externalInvalid);
      return;
    }
    const plugin = createExternalPlugin(nextUrl);
    const existing = loadExternalPlugins();
    if (existing.some((item) => item.id === plugin.id || item.git === plugin.git)) {
      setExternalNotice(t.cmsExtensions.externalAdded);
      return;
    }
    saveExternalPlugins([...existing, plugin]);
    setItems(mergeCatalogWithInstalled());
    setExternalUrl(EXTENSION_SEARCH_EMPTY);
    setExternalNotice(t.cmsExtensions.externalAdded);
  };

  const onInstallClick = (event: MouseEvent, id: string) => {
    event.stopPropagation();
    install(id);
  };

  const visible = filterStoreItems(items, { query, kind, author, git });
  const kindOptions = [
    { value: EXTENSION_FILTER_ALL, label: t.cmsExtensions.filterAllTypes },
    ...Object.values(EXTENSION_KINDS).map((value) => ({
      value,
      label: kindLabel(value),
    })),
  ];
  const authorOptions = [
    { value: EXTENSION_FILTER_ALL, label: t.cmsExtensions.filterAllDevelopers },
    ...uniqueAuthors(items).map((value) => ({ value, label: value })),
  ];
  const gitOptions = [
    { value: EXTENSION_FILTER_ALL, label: t.cmsExtensions.filterAllGit },
    ...uniqueGitRepos(items).map((value) => ({ value, label: value })),
  ];

  return (
    <CmsShell activeNavId={CMS_NAV_IDS.EXTENSIONS}>
      <Flex direction="column" gap={4}>
        <Flex justify="between" align="end" className="gap-3 flex-wrap">
          <div>
            <Typography variant="h2" className="mb-1">
              {t.cmsExtensions.title}
            </Typography>
            <Typography variant="body2" className="ink-cms__muted mb-0">
              {t.cmsExtensions.subtitle}
            </Typography>
          </div>
        </Flex>
        <Tabs defaultTab={EXTENSION_TABS.STORE} variant="line">
          <TabList className="mb-4">
            <Tab id={EXTENSION_TABS.STORE}>{t.cmsExtensions.tabStore}</Tab>
            <Tab id={EXTENSION_TABS.DOCS}>{t.cmsExtensions.tabDocs}</Tab>
          </TabList>
          <TabPanel tabId={EXTENSION_TABS.DOCS}>
            <Card className="ink-cms-card">
              <Typography variant="h4" className="mb-2">
                {t.cmsExtensions.docsTitle}
              </Typography>
              <Typography variant="body2" className="mb-3">
                {t.cmsExtensions.docsIntro}
              </Typography>
              <Typography variant="h5" className="mb-2">
                {t.cmsExtensions.docsStructureTitle}
              </Typography>
              <pre className="ink-cms-code">{EXTENSION_SCAFFOLD_TREE}</pre>
              <Typography variant="h5" className="mb-2">
                {t.cmsExtensions.docsManifestTitle}
              </Typography>
              <pre className="ink-cms-code">{EXTENSION_MANIFEST_SAMPLE}</pre>
              <Typography variant="h5" className="mb-2">
                {t.cmsExtensions.docsReactTitle}
              </Typography>
              <pre className="ink-cms-code">{EXTENSION_REACT_SAMPLE}</pre>
              <Typography variant="h5" className="mb-2">
                {t.cmsExtensions.docsJsTitle}
              </Typography>
              <pre className="ink-cms-code">{EXTENSION_JS_SAMPLE}</pre>
              <Typography variant="h5" className="mb-2">
                {t.cmsExtensions.docsEventTitle}
              </Typography>
              <Typography variant="body2" className="mb-2">
                {t.cmsExtensions.docsEventBody}
              </Typography>
              <pre className="ink-cms-code">{EXTENSION_EVENT_SAMPLE}</pre>
              <Typography variant="h5" className="mb-2">
                {t.cmsExtensions.docsCssTitle}
              </Typography>
              <Typography variant="body2" className="mb-2">
                {t.cmsExtensions.docsCssBody}
              </Typography>
              <pre className="ink-cms-code">{EXTENSION_CSS_SAMPLE}</pre>
            </Card>
          </TabPanel>
          <TabPanel tabId={EXTENSION_TABS.STORE}>
            <Card className="ink-cms-card ink-cms-store-toolbar">
              <Flex direction="column" gap={3}>
                <Input
                  id={EXTENSION_SEARCH_INPUT_ID}
                  label={t.cmsExtensions.search}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <Flex gap={2} align="end" className="flex-wrap">
                  <Input
                    id={EXTENSION_EXTERNAL_INPUT_ID}
                    label={t.cmsExtensions.addExternal}
                    placeholder={t.cmsExtensions.externalPlaceholder}
                    value={externalUrl}
                    onChange={(event) => setExternalUrl(event.target.value)}
                  />
                  <Button size="sm" variant="outline" onClick={onAddExternal}>
                    {t.cmsExtensions.addExternalAction}
                  </Button>
                </Flex>
                {externalNotice ? (
                  <Typography variant="caption" className="ink-cms__muted mb-0">
                    {externalNotice}
                  </Typography>
                ) : null}
                <div className="ink-cms-store-filters">
                  <Select
                    id={EXTENSION_KIND_SELECT_ID}
                    label={t.cmsExtensions.filterType}
                    options={kindOptions}
                    value={kind}
                    onChange={setKind}
                    fullWidth
                  />
                  <Select
                    id={EXTENSION_AUTHOR_SELECT_ID}
                    label={t.cmsExtensions.filterDeveloper}
                    options={authorOptions}
                    value={author}
                    onChange={setAuthor}
                    fullWidth
                  />
                  <Select
                    id={EXTENSION_GIT_SELECT_ID}
                    label={t.cmsExtensions.filterGit}
                    options={gitOptions}
                    value={git}
                    onChange={setGit}
                    fullWidth
                  />
                </div>
              </Flex>
            </Card>
            {visible.length === 0 ? (
              <Typography variant="body2" className="ink-cms__muted mb-0">
                {t.cmsExtensions.empty}
              </Typography>
            ) : (
              <div className="ink-cms-store-list">
                {visible.map((item) => (
                  <div key={item.id} className="ink-cms-store-card">
                    <span
                      className={`ink-cms-store-card__icon ink-cms-store-card__icon--${storeIconTone(item.id)}`}
                      aria-hidden="true"
                    >
                      {extensionInitials(item.name)}
                    </span>
                    <div className="ink-cms-store-card__body">
                      <Flex align="center" gap={2} className="flex-wrap">
                        <Typography variant="h4" className="mb-0">
                          {item.name}
                        </Typography>
                        <Typography variant="caption" className="ink-cms__muted mb-0">
                          {kindLabel(item.kind)}
                        </Typography>
                        {item.isNew && item.status !== 'installed' ? (
                          <Badge variant="warning" className="text-xs">
                            {t.cmsExtensions.badgeNew}
                          </Badge>
                        ) : null}
                      </Flex>
                      <Typography variant="body2" className="ink-cms__muted mb-0">
                        {item.description}
                      </Typography>
                    </div>
                    <div className="ink-cms-store-card__stats">
                      <Avatar initials={extensionInitials(item.author)} size="sm" />
                      <Typography variant="caption" className="mb-0">
                        {item.price === EXTENSION_PRICE_FREE
                          ? t.cmsExtensions.priceFree
                          : t.cmsExtensions.pricePaid}
                      </Typography>
                      <Flex align="center" gap={1}>
                        <BearIcons.HeartIcon size={CMS_ICON_SIZE} />
                        <Typography variant="caption" className="mb-0">
                          {formatCompactCount(item.likes)}
                        </Typography>
                      </Flex>
                      <Flex align="center" gap={1}>
                        <BearIcons.UsersIcon size={CMS_ICON_SIZE} />
                        <Typography variant="caption" className="mb-0">
                          {formatCompactCount(item.installs)}
                        </Typography>
                      </Flex>
                    </div>
                    <div className="ink-cms-store-card__actions">
                      {item.status === 'available' ? (
                        <Button
                          size="sm"
                          variant="ink"
                          icon={<BearIcons.DownloadIcon size={CMS_ICON_SIZE} />}
                          onClick={(event) => onInstallClick(event, item.id)}
                        >
                          {t.cmsExtensions.install}
                        </Button>
                      ) : (
                        <Badge
                          variant={item.status === 'installed' ? 'success' : 'info'}
                          className="text-xs"
                        >
                          {statusLabel(item.status)}
                        </Badge>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelected(item)}
                      >
                        {t.cmsExtensions.viewDetails}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabPanel>
        </Tabs>
      </Flex>
      <Modal
        isOpen={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected?.name}
        size="xl"
        footer={
          selected ? (
            <Flex gap={2} justify="end">
              {selected.status === 'available' ? (
                <Button
                  size="sm"
                  variant="ink"
                  icon={<BearIcons.DownloadIcon size={CMS_ICON_SIZE} />}
                  onClick={() => install(selected.id)}
                >
                  {t.cmsExtensions.install}
                </Button>
              ) : null}
              <Button size="sm" variant="outline" onClick={() => setSelected(null)}>
                {t.cmsExtensions.close}
              </Button>
            </Flex>
          ) : null
        }
      >
        {selected ? (
          <div className="ink-cms-store-detail">
            <img
              src={selected.previewSrc}
              alt={selected.name}
              className="ink-cms-store-detail__preview"
            />
            <Flex gap={1} align="center" className="flex-wrap">
              {selected.isNew && selected.status !== 'installed' ? (
                <Badge variant="warning" className="text-xs">
                  {t.cmsExtensions.badgeNew}
                </Badge>
              ) : null}
              <Badge
                variant={selected.status === 'installed' ? 'success' : 'info'}
                className="text-xs"
              >
                {statusLabel(selected.status)}
              </Badge>
              <Badge variant="neutral" className="text-xs">
                {kindLabel(selected.kind)}
              </Badge>
              <Badge variant="neutral" className="text-xs">
                {selected.price === EXTENSION_PRICE_FREE
                  ? t.cmsExtensions.priceFree
                  : t.cmsExtensions.pricePaid}
              </Badge>
            </Flex>
            <Typography variant="body1" className="mb-0">
              {selected.longDescription}
            </Typography>
            <ul className="ink-cms-store-detail__highlights">
              {selected.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <Flex gap={4} align="center" className="flex-wrap">
              <Flex align="center" gap={1}>
                <BearIcons.HeartIcon size={CMS_ICON_SIZE} />
                <Typography variant="caption" className="mb-0">
                  {formatCompactCount(selected.likes)} {t.cmsExtensions.likes}
                </Typography>
              </Flex>
              <Flex align="center" gap={1}>
                <BearIcons.UsersIcon size={CMS_ICON_SIZE} />
                <Typography variant="caption" className="mb-0">
                  {formatCompactCount(selected.installs)} {t.cmsExtensions.installs}
                </Typography>
              </Flex>
              <Typography variant="caption" className="mb-0">
                v{selected.version}
              </Typography>
            </Flex>
            <Typography variant="caption" className="mb-0">
              {t.cmsExtensions.author}: {selected.author}
            </Typography>
            {selected.dependencies.length ? (
              <Typography variant="caption" className="mb-0">
                {t.cmsExtensions.dependencies}: {selected.dependencies.join(', ')}
              </Typography>
            ) : null}
            <div className="ink-cms-store-card__links">
              <a href={selected.git} target="_blank" rel="noreferrer">
                {t.cmsExtensions.git}
              </a>
              <a href={selected.website} target="_blank" rel="noreferrer">
                <Flex align="center" gap={1}>
                  <BearIcons.GlobeIcon size={CMS_ICON_SIZE} />
                  {t.cmsExtensions.website}
                </Flex>
              </a>
            </div>
            {selected.status === 'installing' ? (
              <Flex align="center" gap={2}>
                <Spinner size="sm" />
                <Typography variant="caption" className="mb-0">
                  {t.cmsExtensions.statusInstalling}
                </Typography>
              </Flex>
            ) : null}
            {selected.status === 'coming' ? (
              <Typography variant="caption" className="ink-cms__muted mb-0">
                {t.cmsExtensions.comingHint}
              </Typography>
            ) : null}
          </div>
        ) : null}
      </Modal>
    </CmsShell>
  );
};
