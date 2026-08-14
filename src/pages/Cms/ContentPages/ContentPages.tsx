import { useEffect, type FC, type MouseEvent } from 'react';
import { useNavigate } from '@forgedevstack/forge-compass/react';
import { useNucleus } from '@forgedevstack/synapse';
import { Button, Card, Flex, Spinner, Typography } from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import type { ColumnDefinition } from '@forgedevstack/grid-table';
import { useAuth } from '@hooks/index';
import { useI18n } from '@i18n/index';
import { cmsEditPath, EMPTY_STRING } from '@const/index';
import { authNucleus, contentNucleus } from '@sdk/index';
import { CmsShell, CMS_NAV_IDS } from '../CmsShell';
import {
  CONTENT_COLLECTION_DOCS,
  CONTENT_COLLECTION_PAGES,
  CONTENT_COLUMN_IDS,
  CONTENT_DATE_LOCALE,
  CONTENT_KIND_ITEM,
  CONTENT_KIND_PAGE,
} from './ContentPages.const';
import type { ContentTableRow } from './ContentPages.types';
import { formatContentUpdated, openContentRowTarget } from './ContentPages.utils';

export const ContentPages: FC = () => {
  const { t } = useI18n();
  const { navigate } = useNavigate();
  const { token: providerToken } = useAuth();
  const { token } = useNucleus(authNucleus);
  const { items, pages, loading, error, fetchContent, fetchPages } =
    useNucleus(contentNucleus);
  const activeToken = token || providerToken;

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

  const onOpenDocs = (event: MouseEvent, row: ContentTableRow) => {
    event.stopPropagation();
    openContentRowTarget(row);
  };

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
    {
      id: CONTENT_COLUMN_IDS.ACTIONS,
      accessor: 'id',
      header: t.dashboard.contentColActions,
      sortable: false,
      render: (_value, row) => {
        const entry = row as ContentTableRow;
        if (entry.collection !== CONTENT_COLLECTION_DOCS) {
          return EMPTY_STRING;
        }
        return (
          <Button
            size="sm"
            variant="ghost"
            onClick={(event) => onOpenDocs(event, entry)}
          >
            {t.dashboard.contentOpenDocs}
          </Button>
        );
      },
    },
  ];

  const onRowClick = (row: ContentTableRow) => {
    navigate(cmsEditPath(row.id));
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
      </Flex>
    </CmsShell>
  );
};
