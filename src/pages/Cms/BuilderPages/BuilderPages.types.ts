export type CanvasKind =
  | 'section'
  | 'column'
  | 'flex'
  | 'grid'
  | 'masonry'
  | 'ink'
  | 'widget'
  | 'form';

export type BuilderViewport = 'desktop' | 'tablet' | 'mobile';

export type BuilderInspectorTab = 'content' | 'style' | 'code';

export type BuilderStageTab = 'canvas' | BuilderInspectorTab;

export type CanvasNodeStyles = {
  padding: string;
  margin: string;
  width: string;
  height: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: string;
  textAlign: string;
  border: string;
  borderRadius: string;
  boxShadow: string;
  display: string;
  flexDirection: string;
  gap: string;
  alignItems: string;
  justifyContent: string;
  opacity: string;
  zIndex: string;
  background: string;
  color: string;
};

export type PageCode = {
  css: string;
  js: string;
};

export type CanvasNode = {
  id: string;
  kind: CanvasKind;
  label: string;
  widgetId?: string;
  html?: string;
  css?: string;
  js?: string;
  styles?: CanvasNodeStyles;
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
