import { useEffect, useState, type DragEvent, type FC } from 'react';
import { useNavigate, useParams } from '@forgedevstack/forge-compass/react';
import { useNucleus } from '@forgedevstack/synapse';
import {
  Badge,
  BearIcons,
  Button,
  Card,
  Flex,
  Input,
  Spinner,
  Typography,
} from '@forgedevstack/bear';
import { InkEditor } from '@forgedevstack/ink';
import { useAuth } from '@hooks/index';
import { useI18n } from '@i18n/index';
import { DRAG_WIDGET_MIME, EMPTY_STRING, ROUTES } from '@const/index';
import { CMS_ICON_SIZE } from '@const/numbers.const';
import { authNucleus, contentNucleus } from '@sdk/index';
import type { ContentStatus } from '@sdk/modules/content';
import { CmsShell, CMS_NAV_IDS } from '../CmsShell';
import {
  BEAR_WIDGET_CATALOG,
  CONTENT_EDIT_EDITOR_MIN_HEIGHT_PX,
  CONTENT_EDIT_KIND,
  CONTENT_EDIT_REVISION_LIMIT,
  CONTENT_EDIT_STATUS_ORDER,
} from './ContentEdit.const';
import type { BearWidgetDef } from './ContentEdit.types';
import {
  appendWidgetHtml,
  loadSeoCollapsed,
  nowScheduleAt,
  resolveEditTarget,
  saveSeoCollapsed,
} from './ContentEdit.utils';
import { DOCUMENT_TEMPLATE_ID } from '../ContentPages/ContentPages.const';

type ContentRevision = {
  id: string;
  title: string;
  bodyHtml: string;
  status: ContentStatus;
  savedAt: string;
};

export const ContentEdit: FC = () => {
  const { t } = useI18n();
  const params = useParams<{ id?: string }>();
  const { navigate } = useNavigate();
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
  const id = params.id || EMPTY_STRING;

  const [title, setTitle] = useState(EMPTY_STRING);
  const [bodyHtml, setBodyHtml] = useState(EMPTY_STRING);
  const [status, setStatus] = useState<ContentStatus>('published');
  const [seoTitle, setSeoTitle] = useState(EMPTY_STRING);
  const [seoDescription, setSeoDescription] = useState(EMPTY_STRING);
  const [scheduleAt, setScheduleAt] = useState(nowScheduleAt);
  const [revisions, setRevisions] = useState<ContentRevision[]>([]);
  const [preview, setPreview] = useState(false);
  const [saveOk, setSaveOk] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [seoCollapsed, setSeoCollapsed] = useState(() => loadSeoCollapsed());

  useEffect(() => {
    if (!activeToken) return;
    void fetchContent(activeToken);
    void fetchPages(activeToken);
  }, [activeToken, fetchContent, fetchPages]);

  const target = id ? resolveEditTarget(id, pages, items) : null;

  useEffect(() => {
    if (!target) {
      setHydrated(false);
      return;
    }
    setTitle(target.title);
    setBodyHtml(target.bodyHtml);
    setStatus((target.status as ContentStatus) || 'draft');
    setSeoTitle(
      typeof target.payload?.seoTitle === 'string' ? target.payload.seoTitle : target.title,
    );
    setSeoDescription(
      typeof target.payload?.seoDescription === 'string'
        ? target.payload.seoDescription
        : EMPTY_STRING,
    );
    const storedSchedule =
      typeof target.payload?.scheduleAt === 'string' ? target.payload.scheduleAt : EMPTY_STRING;
    setScheduleAt(storedSchedule || nowScheduleAt());
    setRevisions([]);
    setSaveOk(false);
    setHydrated(true);
  }, [target?.id, target?.kind, target?.bodyHtml, target?.title, target?.status]);

  const insertWidget = (widget: BearWidgetDef) => {
    setBodyHtml((current) => appendWidgetHtml(current, widget.html));
    setSaveOk(false);
  };

  const onDragStart = (event: DragEvent<HTMLButtonElement>, widgetId: string) => {
    event.dataTransfer.setData(DRAG_WIDGET_MIME, widgetId);
    event.dataTransfer.effectAllowed = 'copy';
  };

  const onEditorDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const widgetId = event.dataTransfer.getData(DRAG_WIDGET_MIME);
    const widget = BEAR_WIDGET_CATALOG.find((entry) => entry.id === widgetId);
    if (widget) {
      insertWidget(widget);
    }
  };

  const pushRevision = () => {
    const revision: ContentRevision = {
      id: `rev-${Date.now()}`,
      title,
      bodyHtml,
      status,
      savedAt: new Date().toISOString(),
    };
    setRevisions((current) => [revision, ...current].slice(0, CONTENT_EDIT_REVISION_LIMIT));
  };

  const restoreRevision = (revision: ContentRevision) => {
    setTitle(revision.title);
    setBodyHtml(revision.bodyHtml);
    setStatus(revision.status);
    setSaveOk(false);
  };

  const onSave = async () => {
    if (!activeToken || !target) return;
    setSaveOk(false);
    pushRevision();
    if (target.kind === CONTENT_EDIT_KIND.PAGE) {
      const ok = await updatePage(activeToken, {
        id: target.id,
        title,
        bodyHtml,
        status,
        mediaUrl: target.mediaUrl,
      });
      setSaveOk(ok);
      return;
    }
    const existingTemplate =
      target.payload && typeof target.payload.template === 'string'
        ? target.payload.template
        : EMPTY_STRING;
    const payload = {
      ...(target.payload || {}),
      html: bodyHtml,
      blocks: [{ type: 'html', html: bodyHtml }],
      seoTitle,
      seoDescription,
      scheduleAt: scheduleAt || null,
      template: existingTemplate || DOCUMENT_TEMPLATE_ID,
    };
    const ok = await saveContent(activeToken, {
      collection: target.collection || EMPTY_STRING,
      slug: target.slug,
      locale: target.locale || 'en',
      title,
      payload,
      status,
    });
    setSaveOk(ok);
  };

  return (
    <CmsShell activeNavId={CMS_NAV_IDS.CONTENT}>
      <Flex direction="column" gap={4} className="ink-cms-edit">
        <Flex
          justify="between"
          align="center"
          className="ink-cms-edit__topbar gap-2 flex-wrap"
        >
          <Flex align="center" gap={2} className="flex-wrap">
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate(ROUTES.CMS_CONTENT)}
            >
              {t.contentEdit.backToContent}
            </Button>
            <Typography variant="h3" className="mb-0 ink-cms-edit__heading">
              {title || t.contentEdit.title}
            </Typography>
            {target ? (
              <Badge variant="info" className="text-xs">
                {target.slug}
              </Badge>
            ) : null}
          </Flex>
          <Flex align="center" gap={2} className="flex-wrap">
            <Button
              size="sm"
              variant={preview ? 'ink' : 'outline'}
              onClick={() => setPreview((value) => !value)}
            >
              {preview ? t.contentEdit.editMode : t.contentEdit.preview}
            </Button>
            <Button
              size="sm"
              variant="ink"
              icon={<BearIcons.SaveIcon size={CMS_ICON_SIZE} />}
              onClick={() => void onSave()}
              disabled={!target || saving}
            >
              {saving ? t.dashboard.saving : t.dashboard.save}
            </Button>
          </Flex>
        </Flex>

        {loading && !hydrated ? (
          <Flex align="center" gap={2}>
            <Spinner size="sm" />
            <Typography variant="body2" className="mb-0">
              {t.contentEdit.loading}
            </Typography>
          </Flex>
        ) : null}

        {error ? (
          <Typography variant="body2" className="ink-cms-dashboard__error mb-0">
            {t.contentEdit.loadError}
          </Typography>
        ) : null}

        {!loading && !target && id ? (
          <Typography variant="body2" className="ink-cms__muted mb-0">
            {t.contentEdit.notFound}
          </Typography>
        ) : null}

        {target ? (
          <div className="ink-cms-edit__layout">
            <Card className="ink-cms-card ink-cms-edit__main">
              <Flex direction="column" gap={3}>
                <Input
                  id="cms-edit-title"
                  label={t.dashboard.contentTitleField}
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                    setSaveOk(false);
                  }}
                />
                {preview ? (
                  <div
                    className="ink-cms-editor-stage ink-cms-edit__preview"
                    dangerouslySetInnerHTML={{ __html: bodyHtml }}
                  />
                ) : (
                  <div
                    className="ink-cms-editor-stage ink-theme-snow"
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={onEditorDrop}
                  >
                    <InkEditor
                      value={bodyHtml}
                      onChange={(next) => {
                        setBodyHtml(next);
                        setSaveOk(false);
                      }}
                      colorMode="light"
                      variant="document"
                      minHeight={CONTENT_EDIT_EDITOR_MIN_HEIGHT_PX}
                      features={{ blocks: true, slash: true, table: true }}
                    />
                  </div>
                )}
                {saveOk ? (
                  <Typography variant="caption" className="ink-cms-save-ok mb-0">
                    {t.dashboard.saved}
                  </Typography>
                ) : null}
              </Flex>
            </Card>

            <aside className="ink-cms-edit__drawer">
              <Card className="ink-cms-card mb-3 ink-cms-edit__seo">
                <button
                  type="button"
                  className="ink-cms-edit__seo-toggle"
                  onClick={() => {
                    const next = !seoCollapsed;
                    setSeoCollapsed(next);
                    saveSeoCollapsed(next);
                  }}
                >
                  <Typography variant="h4" className="mb-0">
                    {t.contentEdit.publishTitle}
                  </Typography>
                  {seoCollapsed ? (
                    <BearIcons.ChevronRightIcon size={CMS_ICON_SIZE} />
                  ) : (
                    <BearIcons.ChevronDownIcon size={CMS_ICON_SIZE} />
                  )}
                </button>
                {seoCollapsed ? null : (
                  <>
                <Typography variant="caption" className="ink-cms__muted mb-2 block">
                  {t.contentEdit.statusLabel}
                </Typography>
                <Flex gap={1} className="flex-wrap mb-3">
                  {CONTENT_EDIT_STATUS_ORDER.map((value) => (
                    <Button
                      key={value}
                      size="sm"
                      variant={status === value ? 'ink' : 'outline'}
                      onClick={() => {
                        setStatus(value);
                        setSaveOk(false);
                      }}
                    >
                      {value}
                    </Button>
                  ))}
                </Flex>
                <Input
                  id="cms-edit-seo-title"
                  label={t.contentEdit.seoTitle}
                  value={seoTitle}
                  onChange={(event) => {
                    setSeoTitle(event.target.value);
                    setSaveOk(false);
                  }}
                />
                <Input
                  id="cms-edit-seo-description"
                  label={t.contentEdit.seoDescription}
                  value={seoDescription}
                  onChange={(event) => {
                    setSeoDescription(event.target.value);
                    setSaveOk(false);
                  }}
                />
                <Input
                  id="cms-edit-schedule"
                  label={t.contentEdit.scheduleAt}
                  type="datetime-local"
                  value={scheduleAt}
                  onChange={(event) => {
                    setScheduleAt(event.target.value);
                    setSaveOk(false);
                  }}
                />
                <Typography variant="caption" className="ink-cms__muted mt-2 mb-0 block">
                  {t.contentEdit.collabHint}
                </Typography>
                  </>
                )}
              </Card>

              <Card className="ink-cms-card mb-3">
                <Typography variant="h4" className="mb-1">
                  {t.contentEdit.revisionsTitle}
                </Typography>
                <Typography variant="caption" className="ink-cms__muted mb-3 block">
                  {t.contentEdit.revisionsHint}
                </Typography>
                {revisions.length === 0 ? (
                  <Typography variant="caption" className="ink-cms__muted mb-0">
                    {t.contentEdit.revisionsEmpty}
                  </Typography>
                ) : (
                  <Flex direction="column" gap={2}>
                    {revisions.map((revision) => (
                      <button
                        key={revision.id}
                        type="button"
                        className="ink-cms-widget-chip"
                        onClick={() => restoreRevision(revision)}
                      >
                        <Typography variant="body2" className="mb-0 font-medium">
                          {revision.status}
                        </Typography>
                        <Typography variant="caption" className="ink-cms__muted mb-0">
                          {new Date(revision.savedAt).toLocaleString()}
                        </Typography>
                      </button>
                    ))}
                  </Flex>
                )}
              </Card>

              <Card className="ink-cms-card">
                <Typography variant="h4" className="mb-1">
                  {t.contentEdit.widgetsTitle}
                </Typography>
                <Typography variant="caption" className="ink-cms__muted mb-3 block">
                  {t.contentEdit.widgetsHint}
                </Typography>
                <Flex direction="column" gap={2}>
                  {BEAR_WIDGET_CATALOG.map((widget) => (
                    <button
                      key={widget.id}
                      type="button"
                      className="ink-cms-widget-chip"
                      draggable
                      onDragStart={(event) => onDragStart(event, widget.id)}
                      onClick={() => insertWidget(widget)}
                    >
                      <Typography variant="body2" className="mb-0 font-medium">
                        {widget.label}
                      </Typography>
                      <Typography variant="caption" className="ink-cms__muted mb-0">
                        {widget.bearComponent}
                      </Typography>
                    </button>
                  ))}
                </Flex>
              </Card>
            </aside>
          </div>
        ) : null}
      </Flex>
    </CmsShell>
  );
};
