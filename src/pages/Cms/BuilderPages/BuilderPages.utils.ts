import { BEAR_WIDGET_CATALOG } from '../ContentEdit/ContentEdit.const';
import { loadCustomWidgets } from './customWidgets.utils';
import {
  BUILDER_CANVAS_EMPTY,
  BUILDER_CANVAS_KEY,
  BUILDER_LAYER_DEPTH_STEP,
  BUILDER_LAYER_ROOT_DEPTH,
  CANVAS_KIND,
  DEFAULT_FORM_HTML,
  DEFAULT_INK_HTML,
  EMPTY_CANVAS_TREE,
  LAYOUT_BLOCKS,
} from './BuilderPages.const';
import type { CanvasKind, CanvasNode, CanvasNodeStyles, PageCode } from './BuilderPages.types';

const createId = (): string => `n-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const cloneNode = (node: CanvasNode): CanvasNode => ({
  ...node,
  id: createId(),
  children: node.children.map(cloneNode),
});

export const cloneCanvasTree = (nodes: CanvasNode[]): CanvasNode[] => nodes.map(cloneNode);

export const createLayoutNode = (kind: CanvasKind, label: string): CanvasNode => ({
  id: createId(),
  kind,
  label,
  html: kind === CANVAS_KIND.INK ? DEFAULT_INK_HTML : kind === CANVAS_KIND.FORM ? DEFAULT_FORM_HTML : undefined,
  children: [],
});

export const createWidgetNode = (widgetId: string): CanvasNode | null => {
  const widget =
    BEAR_WIDGET_CATALOG.find((entry) => entry.id === widgetId) ||
    loadCustomWidgets().find((entry) => entry.id === widgetId);
  if (!widget) return null;
  return {
    id: createId(),
    kind: CANVAS_KIND.WIDGET,
    label: widget.label,
    widgetId: widget.id,
    html: widget.html,
    children: [],
  };
};

const mapTree = (
  nodes: CanvasNode[],
  matcher: (node: CanvasNode) => boolean,
  update: (node: CanvasNode, siblings: CanvasNode[], index: number) => CanvasNode[] | null,
): CanvasNode[] => {
  const next: CanvasNode[] = [];
  nodes.forEach((node, index) => {
    if (matcher(node)) {
      const replaced = update(node, nodes, index);
      if (replaced) next.push(...replaced);
      return;
    }
    next.push({ ...node, children: mapTree(node.children, matcher, update) });
  });
  return next;
};

export const insertNode = (nodes: CanvasNode[], node: CanvasNode, parentId?: string): CanvasNode[] => {
  if (!parentId) return [...nodes, node];
  return mapTree(nodes, (current) => current.id === parentId, (current) => [
    { ...current, children: [...current.children, node] },
  ]);
};

export const removeNode = (nodes: CanvasNode[], nodeId: string): CanvasNode[] =>
  mapTree(nodes, (current) => current.id === nodeId, () => []);

export const duplicateNode = (nodes: CanvasNode[], nodeId: string): CanvasNode[] =>
  mapTree(nodes, (current) => current.id === nodeId, (current, _siblings, _index) => [
    current,
    cloneNode(current),
  ]);

export const wrapNode = (nodes: CanvasNode[], nodeId: string, kind: CanvasKind, label: string): CanvasNode[] =>
  mapTree(nodes, (current) => current.id === nodeId, (current) => [
    {
      id: createId(),
      kind,
      label,
      children: [current],
    },
  ]);

export const moveNode = (nodes: CanvasNode[], nodeId: string, direction: -1 | 1): CanvasNode[] => {
  const index = nodes.findIndex((node) => node.id === nodeId);
  if (index >= 0) {
    const target = index + direction;
    if (target < 0 || target >= nodes.length) return nodes;
    const next = [...nodes];
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item);
    return next;
  }
  return nodes.map((node) => ({ ...node, children: moveNode(node.children, nodeId, direction) }));
};

export const updateNodeHtml = (nodes: CanvasNode[], nodeId: string, html: string): CanvasNode[] =>
  mapTree(nodes, (current) => current.id === nodeId, (current) => [{ ...current, html }]);

export const findNode = (nodes: CanvasNode[], nodeId: string): CanvasNode | null => {
  for (const node of nodes) {
    if (node.id === nodeId) return node;
    const nested = findNode(node.children, nodeId);
    if (nested) return nested;
  }
  return null;
};

export const isContainerKind = (kind: CanvasKind): boolean =>
  kind === CANVAS_KIND.SECTION ||
  kind === CANVAS_KIND.COLUMN ||
  kind === CANVAS_KIND.FLEX ||
  kind === CANVAS_KIND.GRID ||
  kind === CANVAS_KIND.MASONRY;

export const updateNodeLabel = (nodes: CanvasNode[], nodeId: string, label: string): CanvasNode[] =>
  mapTree(nodes, (current) => current.id === nodeId, (current) => [{ ...current, label }]);

export const updateNodeStyles = (
  nodes: CanvasNode[],
  nodeId: string,
  styles: CanvasNodeStyles,
): CanvasNode[] =>
  mapTree(nodes, (current) => current.id === nodeId, (current) => [{ ...current, styles }]);

export const updateNodeCss = (nodes: CanvasNode[], nodeId: string, css: string): CanvasNode[] =>
  mapTree(nodes, (current) => current.id === nodeId, (current) => [{ ...current, css }]);

export const updateNodeJs = (nodes: CanvasNode[], nodeId: string, js: string): CanvasNode[] =>
  mapTree(nodes, (current) => current.id === nodeId, (current) => [{ ...current, js }]);

export const createColumnsSection = (columnCount: number): CanvasNode => {
  const columns: CanvasNode[] = Array.from({ length: columnCount }, () =>
    createLayoutNode(CANVAS_KIND.COLUMN, 'Column'),
  );
  return {
    id: createId(),
    kind: CANVAS_KIND.SECTION,
    label: 'Section',
    children: columns,
  };
};

export type BuilderLayerRow = {
  id: string;
  label: string;
  kind: CanvasKind;
  depth: number;
};

export const flattenLayers = (
  nodes: CanvasNode[],
  depth = BUILDER_LAYER_ROOT_DEPTH,
): BuilderLayerRow[] =>
  nodes.flatMap((node) => [
    { id: node.id, label: node.label, kind: node.kind, depth },
    ...flattenLayers(node.children, depth + BUILDER_LAYER_DEPTH_STEP),
  ]);

export const nodeStyleObject = (styles?: CanvasNodeStyles): Record<string, string> => {
  if (!styles) return {};
  const next: Record<string, string> = {};
  (Object.keys(styles) as Array<keyof CanvasNodeStyles>).forEach((key) => {
    const value = styles[key];
    if (value) next[key] = value;
  });
  return next;
};

export const loadBuilderTree = (): CanvasNode[] => {
  try {
    const raw = localStorage.getItem(BUILDER_CANVAS_KEY);
    if (!raw) return EMPTY_CANVAS_TREE;
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) return parsed as CanvasNode[];
    if (typeof parsed === 'string' && parsed.trim()) {
      return [
        {
          id: createId(),
          kind: CANVAS_KIND.WIDGET,
          label: 'Legacy',
          html: parsed,
          children: [],
        },
      ];
    }
    return EMPTY_CANVAS_TREE;
  } catch {
    return EMPTY_CANVAS_TREE;
  }
};

export const saveBuilderTree = (nodes: CanvasNode[]): void => {
  localStorage.setItem(BUILDER_CANVAS_KEY, JSON.stringify(nodes));
};

const isCanvasNode = (value: unknown): value is CanvasNode => {
  if (!value || typeof value !== 'object') return false;
  const node = value as CanvasNode;
  return typeof node.id === 'string' && typeof node.kind === 'string' && Array.isArray(node.children);
};

export const canvasFromPayload = (payload: Record<string, unknown> | undefined): CanvasNode[] | null => {
  if (!payload) return null;
  const canvas = payload.canvas;
  if (!Array.isArray(canvas)) return null;
  if (!canvas.every(isCanvasNode)) return null;
  return canvas;
};

export const withCanvasPayload = (
  payload: Record<string, unknown>,
  tree: CanvasNode[],
  code?: PageCode,
): Record<string, unknown> => ({
  ...payload,
  canvas: tree,
  code: code ?? payload.code,
});

export const codeFromPayload = (payload: Record<string, unknown> | undefined): PageCode => {
  if (!payload) {
    return { css: BUILDER_CANVAS_EMPTY, js: BUILDER_CANVAS_EMPTY };
  }
  const code = payload.code;
  if (!code || typeof code !== 'object') {
    return { css: BUILDER_CANVAS_EMPTY, js: BUILDER_CANVAS_EMPTY };
  }
  const record = code as Record<string, unknown>;
  return {
    css: typeof record.css === 'string' ? record.css : BUILDER_CANVAS_EMPTY,
    js: typeof record.js === 'string' ? record.js : BUILDER_CANVAS_EMPTY,
  };
};

export const layoutBlockLabel = (kind: CanvasKind): string =>
  LAYOUT_BLOCKS.find((block) => block.id === kind)?.label ?? BUILDER_CANVAS_EMPTY;
