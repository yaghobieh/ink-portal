import { useEffect, useState, type DragEvent, type FC, type MouseEvent } from 'react';
import { useNavigate } from '@forgedevstack/forge-compass/react';
import { useNucleus } from '@forgedevstack/synapse';
import { BearIcons, Button, Card, Flex, Select, Typography } from '@forgedevstack/bear';
import { InkEditor } from '@forgedevstack/ink';
import { useAuth } from '@hooks/index';
import { useI18n } from '@i18n/index';
import {
  BUILDER_QUERY_DOC,
  BUILDER_QUERY_LAYOUT,
  DRAG_WIDGET_MIME,
  ROUTES,
  cmsBuilderPath,
} from '@const/index';
import { CMS_ICON_SIZE } from '@const/numbers.const';
import { authNucleus, contentNucleus } from '@sdk/index';
import { saveContentRequest } from '@sdk/modules/content';
import { CmsShell, CMS_NAV_IDS } from '../CmsShell';
import { BEAR_WIDGET_CATALOG } from '../ContentEdit/ContentEdit.const';
import { CONTENT_COLLECTION_DOCS, CONTENT_COLLECTION_PAGES } from '../ContentPages/ContentPages.const';
import { isBifDynamicInstalled } from '../ExtensionsPages';
import { PAGE_LAYOUT_TEMPLATES, TEMPLATES_COLLECTION } from '../TemplatesPages/TemplatesPages.const';
import {
  BUILDER_INK_MIN_HEIGHT_PX,
  BUILDER_INSPECTOR_NONE,
  BUILDER_MENU_OFFSET_PX,
  CANVAS_KIND,
  DEFAULT_INK_FALLBACK,
  LAYOUT_BLOCKS,
  LAYOUT_MIME,
} from './BuilderPages.const';
import type { CanvasKind, CanvasMenuState, CanvasNode } from './BuilderPages.types';
import {
  canvasFromPayload,
  cloneCanvasTree,
  createLayoutNode,
  createWidgetNode,
  duplicateNode,
  findNode,
  insertNode,
  isContainerKind,
  loadBuilderTree,
  moveNode,
  removeNode,
  saveBuilderTree,
  updateNodeHtml,
  withCanvasPayload,
  wrapNode,
} from './BuilderPages.utils';

export const BuilderPages: FC = () => {
  const { t } = useI18n();
  const { navigate } = useNavigate();
  const { token: providerToken } = useAuth();
  const { token } = useNucleus(authNucleus);
  const { items, fetchContent } = useNucleus(contentNucleus);
  const activeToken = token || providerToken;
  const installed = isBifDynamicInstalled();
  const [tree, setTree] = useState<CanvasNode[]>(() => loadBuilderTree());
  const [selectedId, setSelectedId] = useState(BUILDER_INSPECTOR_NONE);
  const [dropParentId, setDropParentId] = useState(BUILDER_INSPECTOR_NONE);
  const [menu, setMenu] = useState<CanvasMenuState | null>(null);
  const [saved, setSaved] = useState(false);
  const [targetId, setTargetId] = useState(BUILDER_INSPECTOR_NONE);

  useEffect(() => {
    if (activeToken) {
      void fetchContent(activeToken);
    }
  }, [activeToken, fetchContent]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const docId = params.get(BUILDER_QUERY_DOC) || BUILDER_INSPECTOR_NONE;
    const layoutId = params.get(BUILDER_QUERY_LAYOUT);
    if (layoutId) {
      const layout = PAGE_LAYOUT_TEMPLATES.find((item) => item.id === layoutId);
      if (layout) {
        setTree(cloneCanvasTree(layout.tree));
        setTargetId(BUILDER_INSPECTOR_NONE);
        setSaved(false);
      }
      return;
    }
    if (docId) setTargetId(docId);
  }, []);

  useEffect(() => {
    if (!targetId) return;
    const item = items.find((entry) => entry.id === targetId);
    if (!item) return;
    const canvas = canvasFromPayload(item.payload);
    if (canvas) {
      setTree(cloneCanvasTree(canvas));
      setSaved(false);
    }
  }, [items, targetId]);

  const editableItems = items.filter(
    (item) =>
      item.collection === CONTENT_COLLECTION_PAGES ||
      item.collection === TEMPLATES_COLLECTION ||
      item.collection === CONTENT_COLLECTION_DOCS,
  );
  const targetOptions = [
    { value: BUILDER_INSPECTOR_NONE, label: t.cmsBuilder.scratch },
    ...editableItems.map((item) => ({
      value: item.id,
      label: `${item.title || item.slug} (${item.collection})`,
    })),
  ];

  const selected = selectedId ? findNode(tree, selectedId) : null;

  const apply = (next: CanvasNode[]) => {
    setTree(next);
    setSaved(false);
    setMenu(null);
  };

  const addLayout = (kind: CanvasKind) => {
    const block = LAYOUT_BLOCKS.find((item) => item.id === kind);
    if (!block) return;
    const node = createLayoutNode(kind, block.label);
    apply(insertNode(tree, node, dropParentId || undefined));
    setSelectedId(node.id);
  };

  const addWidget = (widgetId: string) => {
    const node = createWidgetNode(widgetId);
    if (!node) return;
    apply(insertNode(tree, node, dropParentId || undefined));
    setSelectedId(node.id);
  };

  const onDragStartWidget = (event: DragEvent<HTMLButtonElement>, widgetId: string) => {
    event.dataTransfer.setData(DRAG_WIDGET_MIME, widgetId);
    event.dataTransfer.effectAllowed = 'copy';
  };

  const onDragStartLayout = (event: DragEvent<HTMLButtonElement>, kind: CanvasKind) => {
    event.dataTransfer.setData(LAYOUT_MIME, kind);
    event.dataTransfer.effectAllowed = 'copy';
  };

  const acceptDrop = (event: DragEvent<HTMLElement>, parentId?: string) => {
    event.preventDefault();
    event.stopPropagation();
    const layoutKind = event.dataTransfer.getData(LAYOUT_MIME) as CanvasKind;
    if (layoutKind) {
      const block = LAYOUT_BLOCKS.find((item) => item.id === layoutKind);
      if (!block) return;
      const node = createLayoutNode(layoutKind, block.label);
      apply(insertNode(tree, node, parentId));
      setSelectedId(node.id);
      return;
    }
    const widgetId = event.dataTransfer.getData(DRAG_WIDGET_MIME);
    if (widgetId) {
      const node = createWidgetNode(widgetId);
      if (!node) return;
      apply(insertNode(tree, node, parentId));
      setSelectedId(node.id);
    }
  };

  const onContextMenu = (event: MouseEvent<HTMLElement>, nodeId: string) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedId(nodeId);
    setMenu({
      nodeId,
      x: event.clientX + BUILDER_MENU_OFFSET_PX,
      y: event.clientY + BUILDER_MENU_OFFSET_PX,
    });
  };

  const runMenu = (action: string) => {
    if (!menu) return;
    if (action === 'duplicate') apply(duplicateNode(tree, menu.nodeId));
    if (action === 'delete') {
      apply(removeNode(tree, menu.nodeId));
      setSelectedId(BUILDER_INSPECTOR_NONE);
    }
    if (action === 'wrap-flex') apply(wrapNode(tree, menu.nodeId, CANVAS_KIND.FLEX, 'Flex'));
    if (action === 'wrap-grid') apply(wrapNode(tree, menu.nodeId, CANVAS_KIND.GRID, 'Grid'));
    if (action === 'add-section') {
      const node = createLayoutNode(CANVAS_KIND.SECTION, 'Section');
      apply(insertNode(tree, node, menu.nodeId));
    }
    if (action === 'move-up') apply(moveNode(tree, menu.nodeId, -1));
    if (action === 'move-down') apply(moveNode(tree, menu.nodeId, 1));
  };

  const onSave = async () => {
    saveBuilderTree(tree);
    if (activeToken && targetId) {
      const item = items.find((entry) => entry.id === targetId);
      if (item) {
        await saveContentRequest(activeToken, {
          collection: item.collection,
          slug: item.slug,
          locale: item.locale,
          title: item.title,
          status: item.status,
          payload: withCanvasPayload(item.payload, tree),
        });
        await fetchContent(activeToken);
      }
    }
    setSaved(true);
  };

  const onTargetChange = (value: string) => {
    setTargetId(value);
    navigate(value ? cmsBuilderPath({ doc: value }) : ROUTES.CMS_BUILDER);
    if (!value) {
      setTree(loadBuilderTree());
    }
  };

  const renderNode = (node: CanvasNode) => {
    const selectedClass = node.id === selectedId ? ' ink-cms-canvas-node--selected' : '';
    const layoutClass = `ink-cms-canvas-node ink-cms-canvas-node--${node.kind}${selectedClass}`;
    return (
      <div
        key={node.id}
        className={layoutClass}
        onClick={(event) => {
          event.stopPropagation();
          setSelectedId(node.id);
          setDropParentId(isContainerKind(node.kind) ? node.id : BUILDER_INSPECTOR_NONE);
        }}
        onContextMenu={(event) => onContextMenu(event, node.id)}
        onDragOver={(event) => {
          if (isContainerKind(node.kind)) event.preventDefault();
        }}
        onDrop={(event) => {
          if (isContainerKind(node.kind)) acceptDrop(event, node.id);
        }}
      >
        <Typography variant="caption" className="ink-cms-canvas-node__label mb-0">
          {node.label}
        </Typography>
        {node.kind === CANVAS_KIND.INK ? (
          <InkEditor
            value={node.html || DEFAULT_INK_FALLBACK}
            onChange={(next) => apply(updateNodeHtml(tree, node.id, next))}
            colorMode="light"
            variant="document"
            minHeight={BUILDER_INK_MIN_HEIGHT_PX}
            features={{ blocks: true, slash: true }}
          />
        ) : node.html ? (
          <div dangerouslySetInnerHTML={{ __html: node.html }} />
        ) : null}
        {node.children.map(renderNode)}
      </div>
    );
  };

  return (
    <CmsShell activeNavId={CMS_NAV_IDS.BUILDER}>
      <Flex direction="column" gap={4} className="ink-cms-builder">
        <div>
          <Typography variant="h2" className="mb-1">
            {t.cmsBuilder.title}
          </Typography>
          <Typography variant="body2" className="ink-cms__muted mb-0">
            {t.cmsBuilder.subtitle}
          </Typography>
        </div>
        {!installed ? (
          <Card className="ink-cms-card">
            <Typography variant="h4" className="mb-2">
              {t.cmsBuilder.lockedTitle}
            </Typography>
            <Typography variant="body2" className="mb-3">
              {t.cmsBuilder.lockedBody}
            </Typography>
            <Button
              size="sm"
              variant="ink"
              icon={<BearIcons.PackageIcon size={CMS_ICON_SIZE} />}
              onClick={() => navigate(ROUTES.CMS_EXTENSIONS)}
            >
              {t.cmsBuilder.openStore}
            </Button>
          </Card>
        ) : (
          <div className="ink-cms-builder__layout">
            <Card className="ink-cms-card ink-cms-builder__palette">
              <Typography variant="h4" className="mb-1">
                {t.cmsBuilder.palette}
              </Typography>
              <Typography variant="caption" className="ink-cms__muted mb-3 block">
                {t.cmsBuilder.layoutHint}
              </Typography>
              <Flex direction="column" gap={2} className="mb-4">
                {LAYOUT_BLOCKS.map((block) => (
                  <button
                    key={block.id}
                    type="button"
                    className="ink-cms-widget-chip"
                    draggable
                    onDragStart={(event) => onDragStartLayout(event, block.id)}
                    onClick={() => addLayout(block.id)}
                  >
                    <Typography variant="body2" className="mb-0 font-medium">
                      {block.label}
                    </Typography>
                  </button>
                ))}
              </Flex>
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
                    onDragStart={(event) => onDragStartWidget(event, widget.id)}
                    onClick={() => addWidget(widget.id)}
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
            <Card className="ink-cms-card ink-cms-builder__canvas">
              <Flex justify="between" align="center" className="mb-3 gap-2 flex-wrap">
                <Typography variant="h4" className="mb-0">
                  {t.cmsBuilder.canvas}
                </Typography>
                <Flex gap={2} align="center" className="flex-wrap">
                  <Select
                    id="ink-cms-builder-target"
                    label={t.cmsBuilder.targetLabel}
                    options={targetOptions}
                    value={targetId}
                    onChange={onTargetChange}
                  />
                  <Button
                    size="sm"
                    variant="ink"
                    icon={<BearIcons.SaveIcon size={CMS_ICON_SIZE} />}
                    onClick={() => void onSave()}
                  >
                    {targetId ? t.cmsBuilder.saveToContent : t.cmsBuilder.saveCanvas}
                  </Button>
                </Flex>
              </Flex>
              <div
                className="ink-cms-builder__stage"
                onClick={() => {
                  setSelectedId(BUILDER_INSPECTOR_NONE);
                  setDropParentId(BUILDER_INSPECTOR_NONE);
                  setMenu(null);
                }}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => acceptDrop(event)}
                onContextMenu={(event) => {
                  event.preventDefault();
                  setMenu({
                    nodeId: BUILDER_INSPECTOR_NONE,
                    x: event.clientX + BUILDER_MENU_OFFSET_PX,
                    y: event.clientY + BUILDER_MENU_OFFSET_PX,
                  });
                }}
              >
                {tree.length === 0 ? (
                  <Typography variant="body2" className="ink-cms__muted mb-0">
                    {t.cmsBuilder.empty}
                  </Typography>
                ) : (
                  tree.map(renderNode)
                )}
              </div>
              {saved ? (
                <Typography variant="caption" className="ink-cms-save-ok mb-0">
                  {t.cmsBuilder.saved}
                </Typography>
              ) : null}
            </Card>
            <Card className="ink-cms-card ink-cms-builder__inspector">
              <Typography variant="h4" className="mb-2">
                {t.cmsBuilder.inspector}
              </Typography>
              {selected ? (
                <Flex direction="column" gap={1}>
                  <Typography variant="body2" className="mb-0 font-medium">
                    {selected.label}
                  </Typography>
                  <Typography variant="caption" className="ink-cms__muted mb-0">
                    {selected.kind}
                  </Typography>
                </Flex>
              ) : (
                <Typography variant="caption" className="ink-cms__muted mb-0">
                  {t.cmsBuilder.inspectorEmpty}
                </Typography>
              )}
            </Card>
          </div>
        )}
        {menu ? (
          <div
            className="ink-cms-canvas-menu"
            style={{ left: menu.x, top: menu.y }}
            onClick={(event) => event.stopPropagation()}
          >
            {menu.nodeId ? (
              <>
                <button type="button" onClick={() => runMenu('duplicate')}>
                  {t.cmsBuilder.menuDuplicate}
                </button>
                <button type="button" onClick={() => runMenu('wrap-flex')}>
                  {t.cmsBuilder.menuWrapFlex}
                </button>
                <button type="button" onClick={() => runMenu('wrap-grid')}>
                  {t.cmsBuilder.menuWrapGrid}
                </button>
                <button type="button" onClick={() => runMenu('add-section')}>
                  {t.cmsBuilder.menuAddSection}
                </button>
                <button type="button" onClick={() => runMenu('move-up')}>
                  {t.cmsBuilder.menuMoveUp}
                </button>
                <button type="button" onClick={() => runMenu('move-down')}>
                  {t.cmsBuilder.menuMoveDown}
                </button>
                <button type="button" onClick={() => runMenu('delete')}>
                  {t.cmsBuilder.menuDelete}
                </button>
              </>
            ) : (
              <button type="button" onClick={() => addLayout(CANVAS_KIND.SECTION)}>
                {t.cmsBuilder.menuAddSection}
              </button>
            )}
          </div>
        ) : null}
      </Flex>
    </CmsShell>
  );
};
