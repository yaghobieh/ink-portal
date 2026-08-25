import { useEffect, type FC } from 'react';
import { useNavigate } from '@forgedevstack/forge-compass/react';
import { useNucleus } from '@forgedevstack/synapse';
import { Button, Card, Dropdown, Flex, Typography } from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import type { ColumnDefinition } from '@forgedevstack/grid-table';
import { useAuth } from '@hooks/index';
import { useI18n } from '@i18n/index';
import { cmsBuilderPath, cmsEditPath, EMPTY_STRING } from '@const/index';
import { authNucleus, contentNucleus } from '@sdk/index';
import { saveContentRequest } from '@sdk/modules/content';
import { CmsShell, CMS_NAV_IDS } from '../CmsShell';
import {
  CONTENT_COLLECTION_PAGES,
  CONTENT_COLUMN_IDS,
  CONTENT_DATE_LOCALE,
  CONTENT_KIND_ITEM,
  CONTENT_LIST_COLLECTIONS,
  CONTENT_MORE_MENU_MIN_WIDTH,
  CONTENT_NEW_PAGE_MENU_MIN_WIDTH,
  CONTENT_STATUS_DRAFT,
  CONTENT_STATUS_PUBLISHED,
  CONTENT_TEMPLATE_EMPTY,
  DOCUMENT_DEFAULT_LOCALE,
  DOCUMENT_STARTER_STATUS,
  SAVED_TEMPLATES_DIVIDER_KEY,
} from './ContentPages.const';
import type { ContentTableRow } from './ContentPages.types';
import {
  formatContentUpdated,
  templateFromPayload,
} from './ContentPages.utils';
import { cloneCanvasTree, canvasFromPayload } from '../BuilderPages/BuilderPages.utils';
import {
  PAYLOAD_KEY_CAST_FIELDS,
  PAYLOAD_KEY_CAST_VALUES,
  PAYLOAD_KEY_LAYOUT,
  PAYLOAD_KEY_TEMPLATE,
} from '../ContentEdit/ContentEdit.const';
import {
  CAST_VALUE_SUMMARY_JOIN,
  CAST_VALUE_SUMMARY_SEP,
} from '../ContentEdit/CastPageFields.const';
import {
  castFieldsFromPayload,
  castValuesFromPayload,
  findLinkedTemplate,
  mergeCastFields,
  summarizeCastValues,
} from '../ContentEdit/castFields.utils';
import {
  PAGE_LAYOUT_TEMPLATES,
  PAGE_SLUG_PREFIX,
  TEMPLATES_COLLECTION,
} from '../TemplatesPages/TemplatesPages.const';

export const ContentPages: FC = () => {
  const { t } = useI18n();
  const { navigate } = useNavigate();
  const { token: providerToken } = useAuth();
  const { token } = useNucleus(authNucleus);
  const { items, loading, error, saving, fetchContent } =
    useNucleus(contentNucleus);
  const activeToken = token || providerToken;

  useEffect(() => {
    if (!activeToken) return;
    void fetchContent(activeToken);
  }, [activeToken, fetchContent]);

  const rows: ContentTableRow[] = items
    .filter((item) =>
      CONTENT_LIST_COLLECTIONS.includes(
        item.collection as (typeof CONTENT_LIST_COLLECTIONS)[number],
      ),
    )
    .map((item) => ({
      id: item.id,
      kind: CONTENT_KIND_ITEM as typeof CONTENT_KIND_ITEM,
      title: item.title || item.slug,
      slug: item.slug,
      collection: item.collection,
      template: templateFromPayload(item.payload),
      fields: summarizeCastValues(
        mergeCastFields(
          castFieldsFromPayload(findLinkedTemplate(items, item.payload, item.id)?.payload),
          castFieldsFromPayload(item.payload),
        ),
        castValuesFromPayload(item.payload),
        CAST_VALUE_SUMMARY_JOIN,
        CAST_VALUE_SUMMARY_SEP,
      ),
      status: item.status,
      updatedAt: item.updatedAt,
      updated: formatContentUpdated(item.updatedAt, CONTENT_DATE_LOCALE),
    }));

  const onNewPage = async (layoutId: string) => {
    if (!activeToken) return;
    const layout = PAGE_LAYOUT_TEMPLATES.find((item) => item.id === layoutId);
    const saved = items.find((item) => item.id === layoutId);
    const fromSaved = saved ? canvasFromPayload(saved.payload) : null;
    const canvas = layout
      ? cloneCanvasTree(layout.tree)
      : fromSaved
        ? cloneCanvasTree(fromSaved)
        : [];
    const title = layout?.title || saved?.title || t.dashboard.newPageBlank;
    const slug = `${PAGE_SLUG_PREFIX}${Date.now()}`;
    const item = await saveContentRequest(activeToken, {
      collection: CONTENT_COLLECTION_PAGES,
      slug,
      locale: DOCUMENT_DEFAULT_LOCALE,
      title,
      status: DOCUMENT_STARTER_STATUS,
      payload: {
        canvas,
        [PAYLOAD_KEY_LAYOUT]: layout?.id || layoutId,
        [PAYLOAD_KEY_TEMPLATE]: saved?.id,
        [PAYLOAD_KEY_CAST_FIELDS]: [],
        [PAYLOAD_KEY_CAST_VALUES]: {},
      },
    });
    if (!item) return;
    await fetchContent(activeToken);
    navigate(saved ? cmsEditPath(item.id) : cmsBuilderPath({ doc: item.id }));
  };

  const savedTemplates = items.filter((item) => item.collection === TEMPLATES_COLLECTION);
  const newPageItems = [
    ...PAGE_LAYOUT_TEMPLATES.map((layout) => ({
      key: layout.id,
      label: layout.title,
      onClick: () => {
        void onNewPage(layout.id);
      },
    })),
    ...(savedTemplates.length
      ? [{ key: SAVED_TEMPLATES_DIVIDER_KEY, label: EMPTY_STRING, divider: true as const }]
      : []),
    ...savedTemplates.map((item) => ({
      key: item.id,
      label: item.title || item.slug,
      onClick: () => {
        void onNewPage(item.id);
      },
    })),
  ];

  const statusClass = (status: string): string => {
    const key = status.toLowerCase();
    if (key === CONTENT_STATUS_PUBLISHED) return 'ink-cms-status ink-cms-status--published';
    if (key === CONTENT_STATUS_DRAFT) return 'ink-cms-status ink-cms-status--draft';
    return 'ink-cms-status';
  };

  const statusLabel = (status: string): string => {
    const key = status.toLowerCase();
    if (key === CONTENT_STATUS_PUBLISHED) return t.dashboard.contentStatusPublished;
    if (key === CONTENT_STATUS_DRAFT) return t.dashboard.contentStatusDraft;
    return status;
  };

  return (
    <CmsShell activeNavId={CMS_NAV_IDS.PAGES}>
      <Flex direction="column" gap={0} className="ink-cms-page">
        <Typography variant="h2" className="ink-cms-page__title mb-0">
          {t.dashboard.contentTitle}
        </Typography>
        <Typography variant="body2" className="ink-cms-page__sub mb-0">
          {t.dashboard.contentSubtitle}
        </Typography>

        <Card className="ink-cms-card ink-cms-startpage">
          <div>
            <div className="ink-cms-startpage__title">{t.dashboard.templatesTitle}</div>
            <div className="ink-cms-startpage__desc">{t.dashboard.templatesSubtitle}</div>
          </div>
          <Flex gap={2} align="center">
            <Dropdown
              placement="bottom-end"
              minWidth={CONTENT_NEW_PAGE_MENU_MIN_WIDTH}
              trigger={
                <Button size="sm" variant="ink" disabled={saving || !activeToken}>
                  {t.dashboard.newPage}
                </Button>
              }
              items={newPageItems}
            />
          </Flex>
        </Card>

        {error ? (
          <Typography variant="body2" className="ink-cms-dashboard__error mb-0">
            {t.dashboard.error}
          </Typography>
        ) : null}

        <div className="ink-cms-card ink-cms-pages-wrap">
          <GridTable
            data={rows}
            loading={loading}
            stickyHeader
            showPagination={false}
            showFilter={false}
            emptyContent={
              <Typography variant="body2" className="ink-cms__muted mb-0">
                {t.dashboard.listEmpty}
              </Typography>
            }
            onRowClick={(row) => navigate(cmsEditPath(String(row.id)))}
            columns={
              [
                {
                  id: CONTENT_COLUMN_IDS.TITLE,
                  accessor: 'title',
                  header: t.dashboard.contentColTitle,
                  sortable: true,
                  render: (value) => <b>{String(value ?? EMPTY_STRING)}</b>,
                },
                {
                  id: CONTENT_COLUMN_IDS.SLUG,
                  accessor: 'slug',
                  header: t.dashboard.contentColSlug,
                  sortable: true,
                },
                {
                  id: CONTENT_COLUMN_IDS.TEMPLATE,
                  accessor: 'template',
                  header: t.dashboard.contentColTemplate,
                  render: (value) => String(value || CONTENT_TEMPLATE_EMPTY),
                },
                {
                  id: CONTENT_COLUMN_IDS.FIELDS,
                  accessor: 'fields',
                  header: t.dashboard.contentColFields,
                  render: (value) => String(value || CONTENT_TEMPLATE_EMPTY),
                },
                {
                  id: CONTENT_COLUMN_IDS.STATUS,
                  accessor: 'status',
                  header: t.dashboard.contentColStatus,
                  render: (_value, row) => (
                    <span className={statusClass(String(row.status))}>{statusLabel(String(row.status))}</span>
                  ),
                },
                {
                  id: CONTENT_COLUMN_IDS.UPDATED,
                  accessor: 'updated',
                  header: t.dashboard.contentColUpdated,
                  sortable: true,
                },
                {
                  id: CONTENT_COLUMN_IDS.ACTIONS,
                  accessor: 'id',
                  header: EMPTY_STRING,
                  sortable: false,
                  render: (_value, row) => (
                    <div className="ink-cms-pages__actions">
                      <button
                        type="button"
                        className="ink-cms-link"
                        onClick={(event) => {
                          event.stopPropagation();
                          navigate(cmsEditPath(String(row.id)));
                        }}
                      >
                        {t.dashboard.contentOpen}
                      </button>
                      <Dropdown
                        placement="bottom-end"
                        minWidth={CONTENT_MORE_MENU_MIN_WIDTH}
                        trigger={
                          <button type="button" className="ink-cms-icon-btn" aria-label={t.dashboard.contentMore}>
                            ⋯
                          </button>
                        }
                        items={[
                          {
                            key: 'stage',
                            label: t.cmsBuilder.editInStage,
                            onClick: () => navigate(cmsBuilderPath({ doc: String(row.id) })),
                          },
                        ]}
                      />
                    </div>
                  ),
                },
              ] as ColumnDefinition<ContentTableRow>[]
            }
          />
        </div>
      </Flex>
    </CmsShell>
  );
};
