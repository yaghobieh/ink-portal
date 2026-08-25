import { CMS_BUILDER_CANVAS_KEY, EMPTY_STRING } from '@const/strings.const';
import type { CanvasKind, CanvasNode } from './BuilderPages.types';

export const BUILDER_CANVAS_KEY = CMS_BUILDER_CANVAS_KEY;
export const BUILDER_CANVAS_EMPTY = EMPTY_STRING;
export const BUILDER_INSPECTOR_NONE = EMPTY_STRING;
export const BUILDER_INK_MIN_HEIGHT_PX = 220;
export const BUILDER_MENU_OFFSET_PX = 4;

export const CANVAS_KIND = {
  SECTION: 'section',
  FLEX: 'flex',
  GRID: 'grid',
  MASONRY: 'masonry',
  INK: 'ink',
  WIDGET: 'widget',
  FORM: 'form',
} as const satisfies Record<string, CanvasKind>;

export const LAYOUT_BLOCKS: readonly { id: CanvasKind; label: string }[] = [
  { id: CANVAS_KIND.SECTION, label: 'Section' },
  { id: CANVAS_KIND.FLEX, label: 'Flex' },
  { id: CANVAS_KIND.GRID, label: 'Grid' },
  { id: CANVAS_KIND.MASONRY, label: 'Masonry' },
  { id: CANVAS_KIND.INK, label: 'Ink' },
  { id: CANVAS_KIND.FORM, label: 'Form' },
];

export const EMPTY_CANVAS_TREE: CanvasNode[] = [];

export const LAYOUT_MIME = 'application/x-ink-layout';
export const DEFAULT_INK_HTML = '<p>Write with Ink.</p>';
export const DEFAULT_INK_FALLBACK = '<p></p>';
export const DEFAULT_FORM_HTML =
  '<form class="ink-cms-widget-form"><label>Name</label><input type="text" /><label>Email</label><input type="email" /><button type="submit">Send</button></form>';
