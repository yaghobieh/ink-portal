import { useEffect, useState, type DragEvent, type FC } from 'react';
import { useNavigate, useParams } from '@forgedevstack/forge-compass/react';
import { useNucleus } from '@forgedevstack/synapse';
import {
  Badge,
  BearIcons,
  Button,
  Card,
  DatePicker,
  Drawer,
  Flex,
  Input,
  Spinner,
  TimePicker,
  Typography,
} from '@forgedevstack/bear';
import { InkEditor } from '@forgedevstack/ink';
import { cmsInkAiProps } from '@/ai/index';
import { useAuth } from '@hooks/index';
import { useI18n } from '@i18n/index';
import { DRAG_WIDGET_MIME, EMPTY_STRING, ROUTES, cmsBuilderPath, CMS_EDIT_SIDE_MAX_PX, CMS_EDIT_SIDE_MIN_PX, CMS_EDIT_SIDE_WIDTH_KEY, CMS_EDIT_SIDE_WIDTH_PX } from '@const/index';
import { CMS_ICON_SIZE } from '@const/numbers.const';
import { authNucleus, contentNucleus } from '@sdk/index';
import type { ContentStatus } from '@sdk/modules/content';
import { CmsShell, CMS_NAV_IDS } from '../CmsShell';
import { loadStoredWidth, saveStoredWidth, startHorizontalResize } from '../CmsShell/CmsShell.utils';
import {
  BEAR_WIDGET_CATALOG,
  CONTENT_EDIT_AUTHOR_ID,
  CONTENT_EDIT_CATEGORIES_ID,
  CONTENT_EDIT_EDITOR_MIN_HEIGHT_PX,
  CONTENT_EDIT_FEATURED_ID,
  CONTENT_EDIT_KIND,
  CONTENT_EDIT_PREVIEW_MIN_HEIGHT_PX,
  CONTENT_EDIT_OG_DESC_ID,
  CONTENT_EDIT_OG_IMAGE_ID,
  CONTENT_EDIT_OG_TITLE_ID,
  CONTENT_EDIT_REVISION_LIMIT,
  CONTENT_EDIT_SCHEDULE_DATE_ID,
  CONTENT_EDIT_SEO_DESC_ID,
  CONTENT_EDIT_SEO_KEYWORD_ID,
  CONTENT_EDIT_SEO_TITLE_ID,
  CONTENT_EDIT_SLUG_ID,
  CONTENT_EDIT_STATUS_ORDER,
  CONTENT_EDIT_SUBTITLE_ID,
  CONTENT_EDIT_TAGS_ID,
  CONTENT_EDIT_TITLE_ID,
  PAYLOAD_KEY_AUTHOR,
  PAYLOAD_KEY_CAST_FIELDS,
  PAYLOAD_KEY_CAST_VALUES,
  PAYLOAD_KEY_CATEGORIES,
  PAYLOAD_KEY_FEATURED,
  PAYLOAD_KEY_LAYOUT,
  PAYLOAD_KEY_OG_DESCRIPTION,
  PAYLOAD_KEY_OG_IMAGE,
  PAYLOAD_KEY_OG_TITLE,
  PAYLOAD_KEY_SCHEDULE,
  PAYLOAD_KEY_SEO_DESCRIPTION,
  PAYLOAD_KEY_SEO_KEYWORD,
  PAYLOAD_KEY_SEO_TITLE,
  PAYLOAD_KEY_SUBTITLE,
  PAYLOAD_KEY_TAGS,
  PAYLOAD_KEY_TEMPLATE,
} from './ContentEdit.const';
import type { BearWidgetDef } from './ContentEdit.types';
import {
  appendWidgetHtml,
  joinScheduleAt,
  loadSeoCollapsed,
  nowScheduleAt,
  payloadString,
  resolveEditTarget,
  saveSeoCollapsed,
  splitScheduleAt,
} from './ContentEdit.utils';
import { CastPageFields } from './helpers/CastPageFields';
import {
  CAST_VALUE_SUMMARY_JOIN,
  CAST_VALUE_SUMMARY_SEP,
} from './helpers/CastPageFields';
import {
  castFieldsFromPayload,
  castValuesFromPayload,
  findLinkedTemplate,
  mergeCastFields,
  pageOwnedCastFields,
  summarizeCastValues,
} from './castFields.utils';
import { createCastField } from '../CastPages/CastPages.utils';
import type { CastField } from '../CastPages/CastPages.types';
import {
  CONTENT_COLLECTION_PAGE_META,
  CONTENT_COLLECTION_PAGES,
  DOCUMENT_TEMPLATE_ID,
} from '../ContentPages/ContentPages.const';
import { loadCmsProfile } from '../SettingsPages';

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
  const [subtitle, setSubtitle] = useState(EMPTY_STRING);
  const [slug, setSlug] = useState(EMPTY_STRING);
  const [author, setAuthor] = useState(EMPTY_STRING);
  const [tags, setTags] = useState(EMPTY_STRING);
  const [categories, setCategories] = useState(EMPTY_STRING);
  const [featuredImage, setFeaturedImage] = useState(EMPTY_STRING);
  const [bodyHtml, setBodyHtml] = useState(EMPTY_STRING);
  const [status, setStatus] = useState<ContentStatus>('published');
  const [seoTitle, setSeoTitle] = useState(EMPTY_STRING);
  const [seoDescription, setSeoDescription] = useState(EMPTY_STRING);
  const [seoKeyword, setSeoKeyword] = useState(EMPTY_STRING);
  const [ogTitle, setOgTitle] = useState(EMPTY_STRING);
  const [ogDescription, setOgDescription] = useState(EMPTY_STRING);
  const [ogImage, setOgImage] = useState(EMPTY_STRING);
  const [scheduleAt, setScheduleAt] = useState(nowScheduleAt);
  const [revisions, setRevisions] = useState<ContentRevision[]>([]);
  const [preview, setPreview] = useState(false);
  const [saveOk, setSaveOk] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [seoCollapsed, setSeoCollapsed] = useState(() => loadSeoCollapsed());
  const [widgetsOpen, setWidgetsOpen] = useState(false);
  const [sideWidth, setSideWidth] = useState(() =>
    loadStoredWidth(
      CMS_EDIT_SIDE_WIDTH_KEY,
      CMS_EDIT_SIDE_WIDTH_PX,
      CMS_EDIT_SIDE_MIN_PX,
      CMS_EDIT_SIDE_MAX_PX,
    ),
  );
  const [previewWidth, setPreviewWidth] = useState(0);
  const [pageFields, setPageFields] = useState<CastField[]>([]);
  const [castValues, setCastValues] = useState<Record<string, string>>({});

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
    setSlug(target.slug);
    setBodyHtml(target.bodyHtml);
    setStatus((target.status as ContentStatus) || 'draft');
    setSubtitle(payloadString(target.payload, PAYLOAD_KEY_SUBTITLE));
    setAuthor(payloadString(target.payload, PAYLOAD_KEY_AUTHOR) || loadCmsProfile().displayName);
    setTags(payloadString(target.payload, PAYLOAD_KEY_TAGS));
    setCategories(payloadString(target.payload, PAYLOAD_KEY_CATEGORIES));
    setFeaturedImage(
      payloadString(target.payload, PAYLOAD_KEY_FEATURED) || target.mediaUrl || EMPTY_STRING,
    );
    setSeoTitle(payloadString(target.payload, PAYLOAD_KEY_SEO_TITLE) || target.title);
    setSeoDescription(payloadString(target.payload, PAYLOAD_KEY_SEO_DESCRIPTION));
    setSeoKeyword(payloadString(target.payload, PAYLOAD_KEY_SEO_KEYWORD));
    setOgTitle(payloadString(target.payload, PAYLOAD_KEY_OG_TITLE));
    setOgDescription(payloadString(target.payload, PAYLOAD_KEY_OG_DESCRIPTION));
    setOgImage(payloadString(target.payload, PAYLOAD_KEY_OG_IMAGE));
    setScheduleAt(payloadString(target.payload, PAYLOAD_KEY_SCHEDULE) || nowScheduleAt());
    const templateItem = findLinkedTemplate(items, target.payload, target.id);
    const templateFields = castFieldsFromPayload(templateItem?.payload);
    setPageFields(pageOwnedCastFields(castFieldsFromPayload(target.payload), templateFields));
    setCastValues(castValuesFromPayload(target.payload));
    setRevisions([]);
    setSaveOk(false);
    setHydrated(true);
  }, [target?.id, target?.kind, target?.bodyHtml, target?.title, target?.status, items]);

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

  const templateItem = findLinkedTemplate(items, target?.payload, target?.id);
  const templateFields = castFieldsFromPayload(templateItem?.payload);
  const displayFields = mergeCastFields(templateFields, pageFields);
  const lockedFieldIds = templateFields.map((field) => field.id);
  const existingTemplate =
    target?.payload && typeof target.payload[PAYLOAD_KEY_TEMPLATE] === 'string'
      ? String(target.payload[PAYLOAD_KEY_TEMPLATE])
      : templateItem?.id || EMPTY_STRING;
  const existingLayout =
    target?.payload && typeof target.payload[PAYLOAD_KEY_LAYOUT] === 'string'
      ? String(target.payload[PAYLOAD_KEY_LAYOUT])
      : EMPTY_STRING;

  const onFieldChange = (id: string, patch: Partial<CastField>) => {
    setPageFields((current) =>
      current.map((field) => {
        if (field.id !== id) return field;
        const next = { ...field, ...patch };
        if (patch.name && patch.name !== field.name) {
          setCastValues((values) => {
            const nextValues = { ...values };
            if (field.name && field.name in nextValues) {
              nextValues[next.name] = nextValues[field.name];
              delete nextValues[field.name];
            }
            return nextValues;
          });
        }
        return next;
      }),
    );
    setSaveOk(false);
  };

  const onSave = async () => {
    if (!activeToken || !target) return;
    setSaveOk(false);
    pushRevision();
    const extras = {
      [PAYLOAD_KEY_SUBTITLE]: subtitle,
      [PAYLOAD_KEY_SEO_TITLE]: seoTitle,
      [PAYLOAD_KEY_SEO_DESCRIPTION]: seoDescription,
      [PAYLOAD_KEY_SEO_KEYWORD]: seoKeyword,
      [PAYLOAD_KEY_OG_TITLE]: ogTitle,
      [PAYLOAD_KEY_OG_DESCRIPTION]: ogDescription,
      [PAYLOAD_KEY_OG_IMAGE]: ogImage,
      [PAYLOAD_KEY_TAGS]: tags,
      [PAYLOAD_KEY_CATEGORIES]: categories,
      [PAYLOAD_KEY_AUTHOR]: author,
      [PAYLOAD_KEY_SCHEDULE]: scheduleAt || null,
      [PAYLOAD_KEY_FEATURED]: featuredImage,
      [PAYLOAD_KEY_CAST_FIELDS]: pageFields,
      [PAYLOAD_KEY_CAST_VALUES]: castValues,
      [PAYLOAD_KEY_TEMPLATE]: existingTemplate || undefined,
      [PAYLOAD_KEY_LAYOUT]: existingLayout || undefined,
    };
    if (target.kind === CONTENT_EDIT_KIND.PAGE) {
      const okPage = await updatePage(activeToken, {
        id: target.id,
        title,
        bodyHtml,
        status,
        mediaUrl: featuredImage || target.mediaUrl,
      });
      const okMeta = await saveContent(activeToken, {
        collection: CONTENT_COLLECTION_PAGE_META,
        slug: target.id,
        locale: target.locale || 'en',
        title,
        payload: extras,
        status,
      });
      const contentPage = items.find(
        (entry) =>
          entry.collection === CONTENT_COLLECTION_PAGES &&
          (entry.id === target.id || entry.slug === target.slug),
      );
      const okItem = contentPage
        ? Boolean(
            await saveContent(activeToken, {
              collection: CONTENT_COLLECTION_PAGES,
              slug: contentPage.slug,
              locale: contentPage.locale || target.locale || 'en',
              title,
              payload: {
                ...contentPage.payload,
                ...extras,
                html: bodyHtml,
              },
              status,
            }),
          )
        : true;
      setSaveOk(okPage && Boolean(okMeta) && okItem);
      return;
    }
    const payload = {
      ...(target.payload || {}),
      html: bodyHtml,
      blocks: [{ type: 'html', html: bodyHtml }],
      ...extras,
      [PAYLOAD_KEY_TEMPLATE]: existingTemplate || DOCUMENT_TEMPLATE_ID,
    };
    const ok = await saveContent(activeToken, {
      collection: target.collection || EMPTY_STRING,
      slug,
      locale: target.locale || 'en',
      title,
      payload,
      status,
    });
    setSaveOk(ok);
  };

  return (
    <CmsShell activeNavId={CMS_NAV_IDS.PAGES}>
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
              variant={widgetsOpen ? 'ink' : 'outline'}
              onClick={() => setWidgetsOpen(true)}
            >
              {t.contentEdit.widgetsOpen}
            </Button>
            <Button
              size="sm"
              variant={preview ? 'ink' : 'outline'}
              onClick={() => setPreview((value) => !value)}
            >
              {preview ? t.contentEdit.editMode : t.contentEdit.preview}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                if (target) navigate(cmsBuilderPath({ doc: target.id }));
              }}
              disabled={!target}
            >
              {t.contentEdit.openStage}
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
          <div
            className="ink-cms-edit__layout"
            style={{ gridTemplateColumns: `minmax(0, 1fr) ${sideWidth}px` }}
          >
            <Card className="ink-cms-card ink-cms-edit__main">
              <Flex direction="column" gap={3}>
                <Input
                  id={CONTENT_EDIT_TITLE_ID}
                  className="ink-cms-edit__title"
                  label={t.contentEdit.titleField}
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                    setSaveOk(false);
                  }}
                />
                <Input
                  id={CONTENT_EDIT_SUBTITLE_ID}
                  label={t.contentEdit.subtitle}
                  value={subtitle}
                  onChange={(event) => {
                    setSubtitle(event.target.value);
                    setSaveOk(false);
                  }}
                />
                <Input
                  id={CONTENT_EDIT_SLUG_ID}
                  label={t.contentEdit.slug}
                  value={slug}
                  onChange={(event) => {
                    setSlug(event.target.value);
                    setSaveOk(false);
                  }}
                />
                {preview ? (
                  <div
                    className="ink-cms-preview-shell"
                    style={
                      previewWidth
                        ? { width: `${previewWidth}px` }
                        : undefined
                    }
                  >
                    <iframe
                      className="ink-cms-preview-frame"
                      title={t.contentEdit.preview}
                      srcDoc={`<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{margin:0;font-family:Inter,system-ui,sans-serif;padding:24px;color:#12141a;}</style></head><body>${bodyHtml}</body></html>`}
                    />
                    <button
                      type="button"
                      className="ink-cms-preview-resize"
                      aria-label={t.cmsBuilder.viewportLabel}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        const startX = event.clientX;
                        const startWidth = previewWidth || event.currentTarget.parentElement?.clientWidth || CONTENT_EDIT_PREVIEW_MIN_HEIGHT_PX;
                        const onMove = (moveEvent: globalThis.MouseEvent) => {
                          setPreviewWidth(Math.max(CONTENT_EDIT_PREVIEW_MIN_HEIGHT_PX, startWidth + moveEvent.clientX - startX));
                        };
                        const onUp = () => {
                          window.removeEventListener('mousemove', onMove);
                          window.removeEventListener('mouseup', onUp);
                        };
                        window.addEventListener('mousemove', onMove);
                        window.addEventListener('mouseup', onUp);
                      }}
                    />
                  </div>
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
                      features={{ blocks: true, slash: true, table: true, ai: true }}
                      ai={cmsInkAiProps()}
                    />
                  </div>
                )}
                {saveOk ? (
                  <Typography variant="caption" className="ink-cms-save-ok mb-0">
                    {t.dashboard.saved}
                  </Typography>
                ) : null}
                {preview && displayFields.length ? (
                  <Flex direction="column" gap={1}>
                    <Typography variant="h5" className="mb-0">
                      {t.contentEdit.castPreviewTitle}
                    </Typography>
                    <Typography variant="caption" className="ink-cms__muted mb-0">
                      {summarizeCastValues(
                        displayFields,
                        castValues,
                        CAST_VALUE_SUMMARY_JOIN,
                        CAST_VALUE_SUMMARY_SEP,
                      ) || t.contentEdit.castEmpty}
                    </Typography>
                  </Flex>
                ) : null}
              </Flex>
            </Card>

            <div className="ink-cms-builder__pane ink-cms-builder__pane--inspector">
            <button
              type="button"
              className="ink-cms-panel-resize"
              aria-label={t.contentEdit.widgetsTitle}
              onMouseDown={(event) => {
                event.preventDefault();
                startHorizontalResize(
                  event.clientX,
                  sideWidth,
                  CMS_EDIT_SIDE_MIN_PX,
                  CMS_EDIT_SIDE_MAX_PX,
                  true,
                  setSideWidth,
                  (width) => {
                    setSideWidth(width);
                    saveStoredWidth(CMS_EDIT_SIDE_WIDTH_KEY, width);
                  },
                );
              }}
            />
            <aside className="ink-cms-edit__side">
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
                  id={CONTENT_EDIT_AUTHOR_ID}
                  label={t.contentEdit.author}
                  value={author}
                  onChange={(event) => {
                    setAuthor(event.target.value);
                    setSaveOk(false);
                  }}
                />
                <Input
                  id={CONTENT_EDIT_FEATURED_ID}
                  label={t.contentEdit.featuredImage}
                  value={featuredImage}
                  onChange={(event) => {
                    setFeaturedImage(event.target.value);
                    setSaveOk(false);
                  }}
                />
                <Input
                  id={CONTENT_EDIT_TAGS_ID}
                  label={t.contentEdit.tags}
                  value={tags}
                  onChange={(event) => {
                    setTags(event.target.value);
                    setSaveOk(false);
                  }}
                />
                <Input
                  id={CONTENT_EDIT_CATEGORIES_ID}
                  label={t.contentEdit.categories}
                  value={categories}
                  onChange={(event) => {
                    setCategories(event.target.value);
                    setSaveOk(false);
                  }}
                />
                <Typography variant="h5" className="mt-3 mb-1">
                  {t.contentEdit.seoPanel}
                </Typography>
                <Input
                  id={CONTENT_EDIT_SEO_TITLE_ID}
                  label={t.contentEdit.seoTitle}
                  value={seoTitle}
                  onChange={(event) => {
                    setSeoTitle(event.target.value);
                    setSaveOk(false);
                  }}
                />
                <Input
                  id={CONTENT_EDIT_SEO_DESC_ID}
                  label={t.contentEdit.seoDescription}
                  value={seoDescription}
                  onChange={(event) => {
                    setSeoDescription(event.target.value);
                    setSaveOk(false);
                  }}
                />
                <Input
                  id={CONTENT_EDIT_SEO_KEYWORD_ID}
                  label={t.contentEdit.seoKeyword}
                  value={seoKeyword}
                  onChange={(event) => {
                    setSeoKeyword(event.target.value);
                    setSaveOk(false);
                  }}
                />
                <Typography variant="h5" className="mt-3 mb-1">
                  {t.contentEdit.socialPanel}
                </Typography>
                <Input
                  id={CONTENT_EDIT_OG_TITLE_ID}
                  label={t.contentEdit.ogTitle}
                  value={ogTitle}
                  onChange={(event) => {
                    setOgTitle(event.target.value);
                    setSaveOk(false);
                  }}
                />
                <Input
                  id={CONTENT_EDIT_OG_DESC_ID}
                  label={t.contentEdit.ogDescription}
                  value={ogDescription}
                  onChange={(event) => {
                    setOgDescription(event.target.value);
                    setSaveOk(false);
                  }}
                />
                <Input
                  id={CONTENT_EDIT_OG_IMAGE_ID}
                  label={t.contentEdit.ogImage}
                  value={ogImage}
                  onChange={(event) => {
                    setOgImage(event.target.value);
                    setSaveOk(false);
                  }}
                />
                <DatePicker
                  id={CONTENT_EDIT_SCHEDULE_DATE_ID}
                  label={t.contentEdit.scheduleDate}
                  value={splitScheduleAt(scheduleAt).date}
                  onChange={(date) => {
                    setScheduleAt(joinScheduleAt(date, splitScheduleAt(scheduleAt).time));
                    setSaveOk(false);
                  }}
                />
                <TimePicker
                  label={t.contentEdit.scheduleTime}
                  format="24h"
                  value={splitScheduleAt(scheduleAt).time}
                  onChange={(time) => {
                    const next = splitScheduleAt(scheduleAt);
                    setScheduleAt(joinScheduleAt(next.date, time || next.time));
                    setSaveOk(false);
                  }}
                />
                <Typography variant="caption" className="ink-cms__muted mt-2 mb-0 block">
                  {t.contentEdit.collabHint}
                </Typography>
                  </>
                )}
              </Card>

              <CastPageFields
                fields={displayFields}
                values={castValues}
                lockedFieldIds={lockedFieldIds}
                onAddField={() => {
                  setPageFields((current) => [...current, createCastField()]);
                  setSaveOk(false);
                }}
                onFieldChange={onFieldChange}
                onRemoveField={(id) => {
                  setPageFields((current) => current.filter((field) => field.id !== id));
                  setSaveOk(false);
                }}
                onValueChange={(name, value) => {
                  setCastValues((current) => ({ ...current, [name]: value }));
                  setSaveOk(false);
                }}
              />

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

            </aside>
            </div>
          </div>
        ) : null}
      </Flex>
      <Drawer
        isOpen={widgetsOpen}
        onClose={() => setWidgetsOpen(false)}
        title={t.contentEdit.widgetsTitle}
        side="left"
        size="sm"
      >
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
      </Drawer>
    </CmsShell>
  );
};
