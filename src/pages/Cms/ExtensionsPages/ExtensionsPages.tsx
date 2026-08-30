import { useState, type FC } from 'react';
import { useNavigate } from '@forgedevstack/forge-compass/react';
import {
  BearIcons,
  Button,
  Card,
  Flex,
  Input,
  Modal,
  Select,
  Typography,
} from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { CMS_ICON_SIZE } from '@const/numbers.const';
import { ROUTES } from '@const/routes.const';
import { CMS_CREW_OPEN_EVENT } from '@const/index';
import { CmsShell, CMS_NAV_IDS } from '../CmsShell';
import {
  BIF_DYNAMIC_EXTENSION_ID,
  CALENDAR_EXTENSION_ID,
  CREW_CHAT_EXTENSION_ID,
  EXTENSION_AUTHOR_SELECT_ID,
  EXTENSION_BIF_MARK,
  EXTENSION_EXTERNAL_INPUT_ID,
  EXTENSION_FILTER_ALL,
  EXTENSION_GIT_SELECT_ID,
  EXTENSION_HIGHLIGHT_PREVIEW,
  EXTENSION_INSTALL_DELAY_MS,
  EXTENSION_KIND_SELECT_ID,
  EXTENSION_KINDS,
  EXTENSION_MODAL_SIZE,
  EXTENSION_SEARCH_EMPTY,
  EXTENSION_SEARCH_INPUT_ID,
} from './ExtensionsPages.const';
import type { ExtensionItem, ExtensionKind } from './ExtensionsPages.types';
import {
  createExternalPlugin,
  extensionMark,
  filterStoreItems,
  isGitHttpsUrl,
  loadExternalPlugins,
  mergeCatalogWithInstalled,
  saveExternalPlugins,
  saveInstalledExtensionIds,
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
  const [externalUrl, setExternalUrl] = useState(EXTENSION_SEARCH_EMPTY);
  const [externalNotice, setExternalNotice] = useState(EXTENSION_SEARCH_EMPTY);
  const [selected, setSelected] = useState<ExtensionItem | null>(null);

  const persistInstalled = (next: ExtensionItem[]) => {
    const ids = next.filter((item) => item.status === 'installed').map((item) => item.id);
    saveInstalledExtensionIds(ids);
  };

  const openInstalled = (id: string) => {
    if (id === BIF_DYNAMIC_EXTENSION_ID) {
      navigate(ROUTES.CMS_BUILDER);
      return;
    }
    if (id === CALENDAR_EXTENSION_ID) {
      navigate(ROUTES.CMS_CALENDAR);
      return;
    }
    if (id === CREW_CHAT_EXTENSION_ID) {
      window.dispatchEvent(new Event(CMS_CREW_OPEN_EVENT));
      return;
    }
    navigate(ROUTES.CMS_SETTINGS);
  };

  const install = (id: string) => {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, status: 'installing' } : item)),
    );
    window.setTimeout(() => {
      setItems((current) => {
        const next = current.map((item) =>
          item.id === id ? { ...item, status: 'installed' as const } : item,
        );
        persistInstalled(next);
        return next;
      });
      openInstalled(id);
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
    <CmsShell activeNavId={CMS_NAV_IDS.BUNDLES}>
      <Flex direction="column" gap={0} className="ink-cms-page">
        <Typography variant="h2" className="ink-cms-page__title mb-0">
          {t.cmsExtensions.title}
        </Typography>
        <Typography variant="body2" className="ink-cms-page__sub mb-0">
          {t.cmsExtensions.subtitle}
        </Typography>
        <div className="ink-cms-store-filter">
          <Input
            id={EXTENSION_SEARCH_INPUT_ID}
            placeholder={t.cmsExtensions.search}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Select
            id={EXTENSION_KIND_SELECT_ID}
            options={kindOptions}
            value={kind}
            onChange={setKind}
          />
          <Select
            id={EXTENSION_AUTHOR_SELECT_ID}
            options={authorOptions}
            value={author}
            onChange={setAuthor}
          />
          <Select
            id={EXTENSION_GIT_SELECT_ID}
            options={gitOptions}
            value={git}
            onChange={setGit}
          />
          <div className="ink-cms-store-filter__add">
            <Input
              id={EXTENSION_EXTERNAL_INPUT_ID}
              placeholder={t.cmsExtensions.externalPlaceholder}
              value={externalUrl}
              onChange={(event) => setExternalUrl(event.target.value)}
            />
            <Button size="sm" variant="ink" onClick={onAddExternal}>
              {t.cmsExtensions.addExternalAction}
            </Button>
          </div>
        </div>
        {externalNotice ? (
          <Typography variant="caption" className="ink-cms__muted mb-0">
            {externalNotice}
          </Typography>
        ) : null}
        <div className="ink-cms-store-guide">
          <div className="ink-cms-store-guide__step">
            <span className="ink-cms-store-guide__num">1</span>
            <Typography variant="body2" className="mb-0">
              {t.cmsExtensions.installGuide1}
            </Typography>
          </div>
          <div className="ink-cms-store-guide__step">
            <span className="ink-cms-store-guide__num">2</span>
            <Typography variant="body2" className="mb-0">
              {t.cmsExtensions.installGuide2}
            </Typography>
          </div>
          <div className="ink-cms-store-guide__step">
            <span className="ink-cms-store-guide__num">3</span>
            <Typography variant="body2" className="mb-0">
              {t.cmsExtensions.installGuide3}
            </Typography>
          </div>
        </div>
        {visible.length === 0 ? (
          <Typography variant="body2" className="ink-cms__muted mb-0">
            {t.cmsExtensions.empty}
          </Typography>
        ) : (
          <div className="ink-cms-ext-grid">
            {visible.map((item) => {
              const installed = item.status === 'installed';
              const mark =
                item.id === BIF_DYNAMIC_EXTENSION_ID ? EXTENSION_BIF_MARK : extensionMark(item.name);
              const onCardClick = () => setSelected(item);
              return (
                <div key={item.id} className="ink-cms-ext-hit" onClick={onCardClick}>
                <Card className="ink-cms-card ink-cms-ext">
                  <div className="ink-cms-ext__head">
                    <span className={`ink-cms-ext__mark${installed ? ' ink-cms-ext__mark--in' : ''}`}>
                      {mark}
                    </span>
                    <div>
                      <div className="ink-cms-ext__name">{item.name}</div>
                      <div className="ink-cms-ext__dev">{item.author}</div>
                    </div>
                  </div>
                  <div className="ink-cms-ext__desc">{item.description}</div>
                  <div className="ink-cms-ext__tags">
                    {item.highlights.slice(0, EXTENSION_HIGHLIGHT_PREVIEW).map((highlight) => (
                      <span key={highlight} className="ink-cms-ext__tag">
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <div className="ink-cms-ext__foot">
                    {installed ? (
                      <span className="ink-cms-ext__status">
                        <BearIcons.CheckIcon size={CMS_ICON_SIZE} />
                        {statusLabel(item.status)}
                      </span>
                    ) : (
                      <span />
                    )}
                    {item.status === 'available' ? (
                      <span onClick={(event) => event.stopPropagation()}>
                        <Button size="sm" variant="ink" onClick={() => install(item.id)}>
                          {t.cmsExtensions.install}
                        </Button>
                      </span>
                    ) : null}
                    {item.status === 'installing' ? (
                      <Button size="sm" variant="ink" disabled>
                        {statusLabel(item.status)}
                      </Button>
                    ) : null}
                    {installed ? (
                      <span onClick={(event) => event.stopPropagation()}>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openInstalled(item.id)}
                        >
                          {t.cmsExtensions.configure}
                        </Button>
                      </span>
                    ) : null}
                  </div>
                </Card>
                </div>
              );
            })}
          </div>
        )}
        <Modal
          isOpen={Boolean(selected)}
          onClose={() => setSelected(null)}
          title={selected?.name || t.cmsExtensions.viewDetails}
          size={EXTENSION_MODAL_SIZE}
        >
          {selected ? (
            <div className="ink-cms-ext-modal">
              <div className="ink-cms-ext__head">
                <span
                  className={`ink-cms-ext__mark${selected.status === 'installed' ? ' ink-cms-ext__mark--in' : ''}`}
                >
                  {selected.id === BIF_DYNAMIC_EXTENSION_ID
                    ? EXTENSION_BIF_MARK
                    : extensionMark(selected.name)}
                </span>
                <div>
                  <div className="ink-cms-ext__dev">{selected.author}</div>
                  <Typography variant="caption" className="ink-cms__muted mb-0">
                    {kindLabel(selected.kind)}
                  </Typography>
                </div>
              </div>
              <Typography variant="body2" className="mb-0">
                {selected.longDescription}
              </Typography>
              <div className="ink-cms-ext__tags">
                {selected.highlights.map((highlight) => (
                  <span key={highlight} className="ink-cms-ext__tag">
                    {highlight}
                  </span>
                ))}
              </div>
              <div className="ink-cms-ext-modal__actions">
                {selected.status === 'available' ? (
                  <Button
                    size="sm"
                    variant="ink"
                    onClick={() => {
                      install(selected.id);
                      setSelected(null);
                    }}
                  >
                    {t.cmsExtensions.install}
                  </Button>
                ) : null}
                {selected.status === 'installed' ? (
                  <Button
                    size="sm"
                    variant="ink"
                    onClick={() => {
                      setSelected(null);
                      openInstalled(selected.id);
                    }}
                  >
                    {t.cmsExtensions.configure}
                  </Button>
                ) : null}
                <Button size="sm" variant="outline" className="ink-cms-ghost-btn" onClick={() => setSelected(null)}>
                  {t.cmsExtensions.close}
                </Button>
              </div>
            </div>
          ) : null}
        </Modal>
      </Flex>
    </CmsShell>
  );
};
