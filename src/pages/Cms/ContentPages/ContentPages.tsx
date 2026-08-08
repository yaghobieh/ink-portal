import { useEffect, useState, type FC } from 'react';
import { useNucleus } from '@forgedevstack/synapse';
import { Badge, Button, Card, Flex, Input, Spinner, Typography } from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import type { ColumnDefinition } from '@forgedevstack/grid-table';
import { InkEditor } from '@forgedevstack/ink';
import { useAuth } from '@hooks/index';
import { useI18n } from '@i18n/index';
import { EMPTY_STRING } from '@const/index';
import { authNucleus, contentNucleus } from '@sdk/index';
import type { CmsPageItem, ContentItem, ContentStatus } from '@sdk/modules/content';
import { CmsShell, CMS_NAV_IDS } from '../CmsShell';
import {
  CONTENT_COLLECTION_PAGES,
  CONTENT_COLUMN_IDS,
  CONTENT_DATE_LOCALE,
  CONTENT_EDITOR_MIN_HEIGHT_PX,
  CONTENT_KIND_ITEM,
  CONTENT_KIND_PAGE,
} from './ContentPages.const';
import type { ContentSelection, ContentTableRow } from './ContentPages.types';
import { formatContentUpdated, openContentRowTarget } from './ContentPages.utils';

const htmlFromPayload = (payload: Record<string, unknown>): string => {
  if (typeof payload.html === 'string') return payload.html;
  if (typeof payload.support === 'string') return `<p>${payload.support}</p>`;
  if (typeof payload.headline === 'string') return `<h2>${payload.headline}</h2>`;
  return EMPTY_STRING;
};

export const ContentPages: FC = () => {
  const { t } = useI18n();
  const { token: providerToken } = useAuth();
  const { token } = useNucleus(authNucleus);
  const {
    items,
    pages,
    loading,
    saving,
    error,
    fetchContent,
    fetchPages,
    saveContent,
    updatePage,
  } = useNucleus(contentNucleus);
  const activeToken = token || providerToken;
  const [selection, setSelection] = useState<ContentSelection>(null);
  const [title, setTitle] = useState(EMPTY_STRING);
  const [bodyHtml, setBodyHtml] = useState(EMPTY_STRING);
  const [status, setStatus] = useState<ContentStatus>('published');
  const [saveOk, setSaveOk] = useState(false);

  useEffect(() => {
    if (!activeToken) return;
    void fetchContent(activeToken);
    void fetchPages(activeToken);
  }, [activeToken, fetchContent, fetchPages]);

  const rows: ContentTableRow[] = [
    ...pages.map((page) => ({
      id: page.id,
      kind: CONTENT_KIND_PAGE as typeof CONTENT_KIND_PAGE,
      title: page.title,
      slug: page.slug,
      collection: CONTENT_COLLECTION_PAGES,
      status: page.status,
      updatedAt: page.updatedAt,
      updated: formatContentUpdated(page.updatedAt, CONTENT_DATE_LOCALE),
    })),
    ...items.map((item) => ({
      id: item.id,
      kind: CONTENT_KIND_ITEM as typeof CONTENT_KIND_ITEM,
      title: item.title || item.slug,
      slug: item.slug,
      collection: item.collection,
      status: item.status,
      updatedAt: item.updatedAt,
      updated: formatContentUpdated(item.updatedAt, CONTENT_DATE_LOCALE),
    })),
  ];

  const selectedPage: CmsPageItem | undefined =
    selection?.kind === CONTENT_KIND_PAGE
      ? pages.find((page) => page.id === selection.id)
      : undefined;
  const selectedItem: ContentItem | undefined =
    selection?.kind === CONTENT_KIND_ITEM
      ? items.find((item) => item.id === selection.id)
      : undefined;

  useEffect(() => {
    if (selectedPage) {
      setTitle(selectedPage.title);
      setBodyHtml(selectedPage.bodyHtml || EMPTY_STRING);
      setStatus((selectedPage.status as ContentStatus) || 'draft');
      setSaveOk(false);
      return;
    }
    if (selectedItem) {
      setTitle(selectedItem.title || selectedItem.slug);
      setBodyHtml(htmlFromPayload(selectedItem.payload));
      setStatus(selectedItem.status);
      setSaveOk(false);
    }
  }, [selectedPage, selectedItem]);

  const columns: ColumnDefinition<ContentTableRow>[] = [
    {
      id: CONTENT_COLUMN_IDS.TITLE,
      accessor: 'title',
      header: t.dashboard.contentColTitle,
      sortable: true,
    },
    {
      id: CONTENT_COLUMN_IDS.SLUG,
      accessor: 'slug',
      header: t.dashboard.contentColSlug,
      sortable: true,
    },
    {
      id: CONTENT_COLUMN_IDS.COLLECTION,
      accessor: 'collection',
      header: t.dashboard.contentColCollection,
      sortable: true,
    },
    {
      id: CONTENT_COLUMN_IDS.STATUS,
      accessor: 'status',
      header: t.dashboard.contentColStatus,
      sortable: true,
    },
    {
      id: CONTENT_COLUMN_IDS.UPDATED,
      accessor: 'updated',
      header: t.dashboard.contentColUpdated,
      sortable: true,
    },
  ];

  const onRowClick = (row: ContentTableRow) => {
    setSelection({ kind: row.kind, id: row.id });
    setSaveOk(false);
    openContentRowTarget(row);
  };

  const onSave = async () => {
    if (!activeToken || !selection) return;
    setSaveOk(false);
    if (selection.kind === CONTENT_KIND_PAGE && selectedPage) {
      const ok = await updatePage(activeToken, {
        id: selectedPage.id,
        title,
        bodyHtml,
        status,
        mediaUrl: selectedPage.mediaUrl,
      });
      setSaveOk(ok);
      return;
    }
    if (selection.kind === CONTENT_KIND_ITEM && selectedItem) {
      const payload = {
        ...selectedItem.payload,
        html: bodyHtml,
      };
      const ok = await saveContent(activeToken, {
        collection: selectedItem.collection,
        slug: selectedItem.slug,
        locale: selectedItem.locale,
        title,
        payload,
        status,
      });
      setSaveOk(ok);
    }
  };

  return (
    <CmsShell activeNavId={CMS_NAV_IDS.CONTENT}>
      <Flex direction="column" gap={4}>
        <div>
          <Typography variant="h2" className="mb-1">
            {t.dashboard.contentTitle}
          </Typography>
          <Typography variant="body2" className="ink-cms__muted mb-0">
            {t.dashboard.contentSubtitle}
          </Typography>
        </div>

        {loading ? (
          <Flex align="center" gap={2}>
            <Spinner size="sm" />
            <Typography variant="body2" className="mb-0">
              {t.dashboard.loading}
            </Typography>
          </Flex>
        ) : null}

        {error ? (
          <Typography variant="body2" className="ink-cms-dashboard__error mb-0">
            {t.dashboard.error}
          </Typography>
        ) : null}

        <div className="ink-cms-content-layout">
          <Card className="ink-cms-card ink-cms-content-table">
            <Typography variant="caption" className="ink-cms__muted mb-3 block">
              {t.dashboard.contentOpenHint}
            </Typography>
            <GridTable
              data={rows}
              columns={columns}
              loading={loading}
              emptyContent={
                <Typography variant="body2" className="ink-cms__muted mb-0">
                  {t.dashboard.listEmpty}
                </Typography>
              }
              showPagination={false}
              showFilter
              showGlobalFilter
              onRowClick={onRowClick}
              tableEffects={{ hover: true, sort: true, row: true }}
            />
          </Card>

          <Card className="ink-cms-card ink-cms-content-editor">
            {!selection ? (
              <Typography variant="body2" className="ink-cms__muted mb-0">
                {t.dashboard.contentSelect}
              </Typography>
            ) : (
              <Flex direction="column" gap={3}>
                <Flex justify="between" align="center" className="gap-2 flex-wrap">
                  <Typography variant="h4" className="mb-0">
                    {t.dashboard.contentEdit}
                  </Typography>
                  <Badge variant="info" className="text-xs">
                    {selectedPage ? `/${selectedPage.slug}` : selectedItem?.slug}
                  </Badge>
                </Flex>
                <Input
                  id="cms-content-title"
                  label={t.dashboard.contentTitleField}
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
                <div className="ink-cms-editor-stage ink-theme-snow">
                  <InkEditor
                    value={bodyHtml}
                    onChange={setBodyHtml}
                    colorMode="light"
                    variant="document"
                    minHeight={CONTENT_EDITOR_MIN_HEIGHT_PX}
                    features={{ blocks: true, slash: true, table: true }}
                  />
                </div>
                <Flex gap={2} align="center" className="flex-wrap">
                  <Button
                    size="sm"
                    variant="ink"
                    onClick={() => void onSave()}
                    disabled={saving}
                  >
                    {saving ? t.dashboard.saving : t.dashboard.save}
                  </Button>
                  {saveOk ? (
                    <Typography variant="caption" className="ink-cms-save-ok mb-0">
                      {t.dashboard.saved}
                    </Typography>
                  ) : null}
                </Flex>
              </Flex>
            )}
          </Card>
        </div>
      </Flex>
    </CmsShell>
  );
};
