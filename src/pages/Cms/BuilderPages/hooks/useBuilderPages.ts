import { useCallback, useEffect, useState, type DragEvent, type MouseEvent } from 'react';
import { useNavigate } from '@forgedevstack/forge-compass/react';
import { useNucleus } from '@forgedevstack/synapse';
import { useAuth } from '@hooks/index';
import { useI18n } from '@i18n/index';
import {
  BUILDER_QUERY_DOC,
  BUILDER_QUERY_LAYOUT,
  CMS_BUILDER_INSPECTOR_MAX_PX,
  CMS_BUILDER_INSPECTOR_MIN_PX,
  CMS_BUILDER_INSPECTOR_WIDTH_KEY,
  CMS_BUILDER_INSPECTOR_WIDTH_PX,
  CMS_BUILDER_PALETTE_MAX_PX,
  CMS_BUILDER_PALETTE_MIN_PX,
  CMS_BUILDER_PALETTE_WIDTH_KEY,
  CMS_BUILDER_PALETTE_WIDTH_PX,
  DRAG_WIDGET_MIME,
  ROUTES,
  cmsBuilderPath,
} from '@const/index';
import { authNucleus, contentNucleus } from '@sdk/index';
import { saveContentRequest } from '@sdk/modules/content';
import { loadStoredWidth, saveStoredWidth, startHorizontalResize } from '../../CmsShell';
import { BEAR_WIDGET_CATALOG, CAST_WIDGET_ID } from '../../ContentEdit/ContentEdit.const';
import {
  CONTENT_COLLECTION_DOCS,
  CONTENT_COLLECTION_PAGES,
  DOCUMENT_DEFAULT_LOCALE,
  DOCUMENT_STARTER_STATUS,
} from '../../ContentPages/ContentPages.const';
import { isBifDynamicInstalled } from '../../ExtensionsPages';
import {
  PAGE_LAYOUT_TEMPLATES,
  TEMPLATES_COLLECTION,
  TEMPLATE_SLUG_PREFIX,
} from '../../TemplatesPages/TemplatesPages.const';
import {
  BUILDER_DRAG_EFFECT_COPY,
  BUILDER_INSPECTOR_NONE,
  BUILDER_INSPECTOR_TAB,
  BUILDER_MENU_ACTION,
  BUILDER_MENU_OFFSET_PX,
  BUILDER_MOVE_BACK,
  BUILDER_MOVE_FORWARD,
  BUILDER_STAGE_TAB,
  BUILDER_STYLE_EMPTY,
  BUILDER_VIEWPORT,
  CANVAS_KIND,
  EMPTY_NODE_STYLES,
  LAYOUT_BLOCKS,
  LAYOUT_MIME,
} from '../BuilderPages.const';
import type {
  BuilderInspectorTab,
  BuilderStageTab,
  BuilderViewport,
  CanvasKind,
  CanvasMenuAction,
  CanvasMenuState,
  CanvasNode,
  PageCode,
} from '../BuilderPages.types';
import {
  canvasFromPayload,
  cloneCanvasTree,
  codeFromPayload,
  createColumnsSection,
  createLayoutNode,
  createWidgetNode,
  duplicateNode,
  findNode,
  flattenLayers,
  insertNode,
  isContainerKind,
  layoutBlockLabel,
  loadBuilderTree,
  moveNode,
  removeNode,
  saveBuilderTree,
  withCanvasPayload,
  wrapNode,
} from '../BuilderPages.utils';
import { createCustomWidget, loadCustomWidgets, saveCustomWidgets } from '../customWidgets.utils';

/**
 * Owns Stage canvas state, palette drops, inspector tabs, and save.
 * Keeps `BuilderPages.tsx` on render so widget/layout handlers stay in one hook.
 */
export const useBuilderPages = () => {
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
  const [viewport, setViewport] = useState<BuilderViewport>(BUILDER_VIEWPORT.DESKTOP);
  const [preview, setPreview] = useState(false);
  const [inspectorTab, setInspectorTab] = useState<BuilderInspectorTab>(
    BUILDER_INSPECTOR_TAB.CONTENT,
  );
  const [pageCode, setPageCode] = useState<PageCode>({
    css: BUILDER_STYLE_EMPTY,
    js: BUILDER_STYLE_EMPTY,
  });
  const [customWidgets, setCustomWidgets] = useState(() => loadCustomWidgets());
  const [customLabel, setCustomLabel] = useState(BUILDER_STYLE_EMPTY);
  const [customHtml, setCustomHtml] = useState(BUILDER_STYLE_EMPTY);
  const [previewWidth, setPreviewWidth] = useState(0);
  const [stageTab, setStageTab] = useState<BuilderStageTab>(BUILDER_STAGE_TAB.CANVAS);
  const [paletteWidth, setPaletteWidth] = useState(() =>
    loadStoredWidth(
      CMS_BUILDER_PALETTE_WIDTH_KEY,
      CMS_BUILDER_PALETTE_WIDTH_PX,
      CMS_BUILDER_PALETTE_MIN_PX,
      CMS_BUILDER_PALETTE_MAX_PX,
    ),
  );
  const [inspectorWidth, setInspectorWidth] = useState(() =>
    loadStoredWidth(
      CMS_BUILDER_INSPECTOR_WIDTH_KEY,
      CMS_BUILDER_INSPECTOR_WIDTH_PX,
      CMS_BUILDER_INSPECTOR_MIN_PX,
      CMS_BUILDER_INSPECTOR_MAX_PX,
    ),
  );

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
    setPageCode(codeFromPayload(item.payload));
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

  const addColumns = (count: number) => {
    const node = createColumnsSection(count);
    apply(insertNode(tree, node, dropParentId || undefined));
    setSelectedId(node.id);
  };

  const onDragStartWidget = (event: DragEvent<HTMLButtonElement>, widgetId: string) => {
    event.dataTransfer.setData(DRAG_WIDGET_MIME, widgetId);
    event.dataTransfer.effectAllowed = BUILDER_DRAG_EFFECT_COPY;
  };

  const onDragStartLayout = (event: DragEvent<HTMLButtonElement>, kind: CanvasKind) => {
    event.dataTransfer.setData(LAYOUT_MIME, kind);
    event.dataTransfer.effectAllowed = BUILDER_DRAG_EFFECT_COPY;
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

  const runMenu = (action: CanvasMenuAction) => {
    if (!menu) return;
    if (action === BUILDER_MENU_ACTION.DUPLICATE) apply(duplicateNode(tree, menu.nodeId));
    if (action === BUILDER_MENU_ACTION.DELETE) {
      apply(removeNode(tree, menu.nodeId));
      setSelectedId(BUILDER_INSPECTOR_NONE);
    }
    if (action === BUILDER_MENU_ACTION.WRAP_FLEX) {
      apply(wrapNode(tree, menu.nodeId, CANVAS_KIND.FLEX, layoutBlockLabel(CANVAS_KIND.FLEX)));
    }
    if (action === BUILDER_MENU_ACTION.WRAP_GRID) {
      apply(wrapNode(tree, menu.nodeId, CANVAS_KIND.GRID, layoutBlockLabel(CANVAS_KIND.GRID)));
    }
    if (action === BUILDER_MENU_ACTION.ADD_SECTION) {
      const node = createLayoutNode(CANVAS_KIND.SECTION, layoutBlockLabel(CANVAS_KIND.SECTION));
      apply(insertNode(tree, node, menu.nodeId));
    }
    if (action === BUILDER_MENU_ACTION.MOVE_UP) apply(moveNode(tree, menu.nodeId, BUILDER_MOVE_BACK));
    if (action === BUILDER_MENU_ACTION.MOVE_DOWN) {
      apply(moveNode(tree, menu.nodeId, BUILDER_MOVE_FORWARD));
    }
  };

  const onSave = useCallback(async () => {
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
          payload: withCanvasPayload(item.payload, tree, pageCode),
        });
        await fetchContent(activeToken);
      }
    }
    setSaved(true);
  }, [activeToken, fetchContent, items, pageCode, targetId, tree]);

  const onSaveAsTemplate = async () => {
    saveBuilderTree(tree);
    if (!activeToken) return;
    const item = await saveContentRequest(activeToken, {
      collection: TEMPLATES_COLLECTION,
      slug: `${TEMPLATE_SLUG_PREFIX}${Date.now()}`,
      locale: DOCUMENT_DEFAULT_LOCALE,
      title: t.cmsBuilder.saveAsTemplate,
      status: DOCUMENT_STARTER_STATUS,
      payload: withCanvasPayload({}, tree, pageCode),
    });
    if (!item) return;
    await fetchContent(activeToken);
    setTargetId(item.id);
    setSaved(true);
  };

  const onTargetChange = (value: string) => {
    setTargetId(value);
    navigate(value ? cmsBuilderPath({ doc: value }) : ROUTES.CMS_BUILDER);
    if (!value) {
      setTree(loadBuilderTree());
    }
  };

  const onStageTab = (tabId: string) => {
    const next = tabId as BuilderStageTab;
    setStageTab(next);
    if (next !== BUILDER_STAGE_TAB.CANVAS) {
      setInspectorTab(next);
    }
  };

  const onPaletteResize = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    startHorizontalResize(
      event.clientX,
      paletteWidth,
      CMS_BUILDER_PALETTE_MIN_PX,
      CMS_BUILDER_PALETTE_MAX_PX,
      false,
      setPaletteWidth,
      (width) => {
        setPaletteWidth(width);
        saveStoredWidth(CMS_BUILDER_PALETTE_WIDTH_KEY, width);
      },
    );
  };

  const onInspectorResize = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    startHorizontalResize(
      event.clientX,
      inspectorWidth,
      CMS_BUILDER_INSPECTOR_MIN_PX,
      CMS_BUILDER_INSPECTOR_MAX_PX,
      true,
      setInspectorWidth,
      (width) => {
        setInspectorWidth(width);
        saveStoredWidth(CMS_BUILDER_INSPECTOR_WIDTH_KEY, width);
      },
    );
  };

  const addCustomWidget = () => {
    const next = createCustomWidget(customLabel.trim(), customHtml.trim());
    const widgets = [...customWidgets, next];
    setCustomWidgets(widgets);
    saveCustomWidgets(widgets);
    setCustomLabel(BUILDER_STYLE_EMPTY);
    setCustomHtml(BUILDER_STYLE_EMPTY);
    addWidget(next.id);
  };

  const selectedStyles = {
    ...EMPTY_NODE_STYLES,
    ...(selected?.styles ?? {}),
  };
  const catalog = [...BEAR_WIDGET_CATALOG, ...customWidgets];
  const contentWidgets = catalog.filter((widget) => widget.id !== CAST_WIDGET_ID);
  const formWidgets = BEAR_WIDGET_CATALOG.filter((widget) => widget.id === CAST_WIDGET_ID);
  const layers = flattenLayers(tree);

  return {
    t,
    installed,
    tree,
    selectedId,
    setSelectedId,
    dropParentId,
    setDropParentId,
    menu,
    setMenu,
    saved,
    setSaved,
    targetId,
    viewport,
    setViewport,
    preview,
    setPreview,
    inspectorTab,
    setInspectorTab,
    pageCode,
    setPageCode,
    customLabel,
    setCustomLabel,
    customHtml,
    setCustomHtml,
    previewWidth,
    setPreviewWidth,
    stageTab,
    paletteWidth,
    inspectorWidth,
    selected,
    selectedStyles,
    targetOptions,
    contentWidgets,
    formWidgets,
    layers,
    apply,
    addLayout,
    addWidget,
    addColumns,
    addCustomWidget,
    onDragStartWidget,
    onDragStartLayout,
    acceptDrop,
    onContextMenu,
    runMenu,
    onSave,
    onSaveAsTemplate,
    onTargetChange,
    onStageTab,
    onPaletteResize,
    onInspectorResize,
    isContainerKind,
    navigate,
  };
};
