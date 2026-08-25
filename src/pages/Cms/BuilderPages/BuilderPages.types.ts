export type CanvasKind = 'section' | 'flex' | 'grid' | 'masonry' | 'ink' | 'widget' | 'form';

export type CanvasNode = {
  id: string;
  kind: CanvasKind;
  label: string;
  widgetId?: string;
  html?: string;
  children: CanvasNode[];
};

export type CanvasMenuAction =
  | 'duplicate'
  | 'delete'
  | 'wrap-flex'
  | 'wrap-grid'
  | 'add-section'
  | 'move-up'
  | 'move-down';

export type CanvasMenuState = {
  nodeId: string;
  x: number;
  y: number;
};

export type BuilderPagesProps = Record<string, never>;
