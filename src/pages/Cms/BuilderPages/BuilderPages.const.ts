import { CMS_BUILDER_CANVAS_KEY, EMPTY_STRING } from '@const/strings.const';
import type { CanvasKind, CanvasNode, CanvasNodeStyles } from './BuilderPages.types';

export const BUILDER_CANVAS_KEY = CMS_BUILDER_CANVAS_KEY;
export const BUILDER_CANVAS_EMPTY = EMPTY_STRING;
export const BUILDER_INSPECTOR_NONE = EMPTY_STRING;
export const BUILDER_INK_MIN_HEIGHT_PX = 220;
export const BUILDER_MENU_OFFSET_PX = 4;

export const CANVAS_KIND = {
  SECTION: 'section',
  COLUMN: 'column',
  FLEX: 'flex',
  GRID: 'grid',
  MASONRY: 'masonry',
  INK: 'ink',
  WIDGET: 'widget',
  FORM: 'form',
} as const satisfies Record<string, CanvasKind>;

export const LAYOUT_BLOCKS: readonly { id: CanvasKind; label: string }[] = [
  { id: CANVAS_KIND.SECTION, label: 'Section' },
  { id: CANVAS_KIND.COLUMN, label: 'Column' },
  { id: CANVAS_KIND.FLEX, label: 'Flex' },
  { id: CANVAS_KIND.GRID, label: 'Grid' },
  { id: CANVAS_KIND.MASONRY, label: 'Masonry' },
  { id: CANVAS_KIND.INK, label: 'Ink' },
  { id: CANVAS_KIND.FORM, label: 'Form' },
];

export const BUILDER_VIEWPORT = {
  DESKTOP: 'desktop',
  TABLET: 'tablet',
  MOBILE: 'mobile',
} as const;

export const BUILDER_VIEWPORT_WIDTH_PX = {
  desktop: 0,
  tablet: 768,
  mobile: 390,
} as const;

export const BUILDER_INSPECTOR_TAB = {
  CONTENT: 'content',
  STYLE: 'style',
  CODE: 'code',
} as const;

export const BUILDER_STAGE_TAB = {
  CANVAS: 'canvas',
  CONTENT: 'content',
  STYLE: 'style',
  CODE: 'code',
} as const;

export const BUILDER_STYLE_EMPTY = EMPTY_STRING;
export const EMPTY_NODE_STYLES: CanvasNodeStyles = {
  padding: EMPTY_STRING,
  margin: EMPTY_STRING,
  width: EMPTY_STRING,
  height: EMPTY_STRING,
  fontSize: EMPTY_STRING,
  fontWeight: EMPTY_STRING,
  lineHeight: EMPTY_STRING,
  letterSpacing: EMPTY_STRING,
  textAlign: EMPTY_STRING,
  border: EMPTY_STRING,
  borderRadius: EMPTY_STRING,
  boxShadow: EMPTY_STRING,
  display: EMPTY_STRING,
  flexDirection: EMPTY_STRING,
  gap: EMPTY_STRING,
  alignItems: EMPTY_STRING,
  justifyContent: EMPTY_STRING,
  opacity: EMPTY_STRING,
  zIndex: EMPTY_STRING,
  background: EMPTY_STRING,
  color: EMPTY_STRING,
};
export const BUILDER_PREVIEW_MIN_WIDTH_PX = 320;
export const BUILDER_RESIZE_HANDLE = 'se';
export const STYLE_FIELD_KEYS: ReadonlyArray<keyof CanvasNodeStyles> = [
  'padding',
  'margin',
  'width',
  'height',
  'fontSize',
  'fontWeight',
  'lineHeight',
  'letterSpacing',
  'textAlign',
  'display',
  'flexDirection',
  'gap',
  'alignItems',
  'justifyContent',
  'background',
  'color',
  'border',
  'borderRadius',
  'boxShadow',
  'opacity',
  'zIndex',
];
export const AI_STYLE_SUGGESTIONS = [
  {
    id: 'type-hero',
    styles: { fontSize: '2.5rem', fontWeight: '700', lineHeight: '1.2' },
  },
  {
    id: 'type-body',
    styles: { fontSize: '1rem', fontWeight: '400', lineHeight: '1.6' },
  },
  {
    id: 'space-block',
    styles: { padding: '1.5rem', margin: '0 0 1rem' },
  },
  {
    id: 'accent-panel',
    styles: {
      background: '#eaf0fe',
      color: '#12141a',
      padding: '1rem',
      borderRadius: '0.5rem',
    },
  },
] as const;

export const EMPTY_CANVAS_TREE: CanvasNode[] = [];
export const BUILDER_TWO_COLUMNS = 2;
export const BUILDER_THREE_COLUMNS = 3;
export const BUILDER_LAYER_ROOT_DEPTH = 0;
export const BUILDER_LAYER_DEPTH_STEP = 1;
export const BUILDER_LAYER_MAX_DEPTH = 8;

export const LAYOUT_MIME = 'application/x-ink-layout';
export const BUILDER_DRAG_EFFECT_COPY = 'copy';
export const BUILDER_MENU_ACTION = {
  DUPLICATE: 'duplicate',
  DELETE: 'delete',
  WRAP_FLEX: 'wrap-flex',
  WRAP_GRID: 'wrap-grid',
  ADD_SECTION: 'add-section',
  MOVE_UP: 'move-up',
  MOVE_DOWN: 'move-down',
} as const;
export const BUILDER_MOVE_BACK = -1;
export const BUILDER_MOVE_FORWARD = 1;
export const DEFAULT_INK_HTML = '<p>Write with Ink.</p>';
export const DEFAULT_INK_FALLBACK = '<p></p>';
export const DEFAULT_FORM_HTML =
  '<form class="ink-cms-widget-form"><label>Name</label><input type="text" /><label>Email</label><input type="email" /><button type="submit">Send</button></form>';
