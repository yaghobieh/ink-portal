import {
  HTML_TAG_H2,
  HTML_TAG_P,
  HERO_IMG_SRC,
} from '@const/strings.const';
import {
  NUMBER_FOUR_HUNDRED_TWENTY,
  NUMBER_THREE_HUNDRED_EIGHTY,
  NUMBER_THREE_HUNDRED_TWENTY,
  NUMBER_TWELVE,
} from '@const/numbers.const';
import { bearWidgetHtml } from './bearWidget.utils';
import type { BearWidgetDef } from './ContentEdit.types';

export const CONTENT_EDIT_EDITOR_MIN_HEIGHT_PX = NUMBER_FOUR_HUNDRED_TWENTY;
export const CONTENT_EDIT_DRAWER_WIDTH_PX = NUMBER_THREE_HUNDRED_EIGHTY;
export const CONTENT_EDIT_PREVIEW_MIN_HEIGHT_PX = NUMBER_THREE_HUNDRED_TWENTY;

export const BEAR_WIDGET_COMPONENT = {
  TYPOGRAPHY: 'Typography',
  CARD: 'Card',
  FLEX: 'Flex',
  GRID: 'Grid',
  BUTTON: 'Button',
  ALERT: 'Alert',
  BADGE: 'Badge',
  CHIP: 'Chip',
  AVATAR: 'Avatar',
  DIVIDER: 'Divider',
  INPUT: 'Input',
  SELECT: 'Select',
  CHECKBOX: 'Checkbox',
  SWITCH: 'Switch',
  TABS: 'Tabs',
  ACCORDION: 'Accordion',
  PROGRESS: 'Progress',
  RATING: 'Rating',
  SPINNER: 'Spinner',
  TABLE: 'Table',
  CAROUSEL: 'Carousel',
  IMAGE: 'Image',
  QUOTE: 'Quote',
  STAT: 'Stat',
  CAST: 'Cast',
  CODE_EDITOR: 'CodeEditor',
  DRAWER: 'Drawer',
  MODAL: 'Modal',
  DROPDOWN: 'Dropdown',
  FILE_UPLOAD: 'FileUpload',
  COLOR_PICKER: 'ColorPicker',
  DATE_PICKER: 'DatePicker',
  PAGINATION: 'Pagination',
  APP_BAR: 'AppBar',
  GRID_TABLE: 'GridTable',
} as const;

export const BEAR_WIDGET_CATALOG: readonly BearWidgetDef[] = [
  {
    id: 'typography',
    label: BEAR_WIDGET_COMPONENT.TYPOGRAPHY,
    bearComponent: BEAR_WIDGET_COMPONENT.TYPOGRAPHY,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.TYPOGRAPHY, '<strong>Heading</strong> — body text block.'),
  },
  {
    id: 'card',
    label: BEAR_WIDGET_COMPONENT.CARD,
    bearComponent: BEAR_WIDGET_COMPONENT.CARD,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.CARD, '<p><strong>Card</strong></p><p>Card body content.</p>'),
  },
  {
    id: 'flex',
    label: BEAR_WIDGET_COMPONENT.FLEX,
    bearComponent: BEAR_WIDGET_COMPONENT.FLEX,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.FLEX, '<p>Flex item A</p><p>Flex item B</p>'),
  },
  {
    id: 'grid',
    label: BEAR_WIDGET_COMPONENT.GRID,
    bearComponent: BEAR_WIDGET_COMPONENT.GRID,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.GRID, '<p>Grid A</p><p>Grid B</p><p>Grid C</p>'),
  },
  {
    id: 'button',
    label: BEAR_WIDGET_COMPONENT.BUTTON,
    bearComponent: BEAR_WIDGET_COMPONENT.BUTTON,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.BUTTON, '<a href="#">Button</a>'),
  },
  {
    id: 'alert',
    label: BEAR_WIDGET_COMPONENT.ALERT,
    bearComponent: BEAR_WIDGET_COMPONENT.ALERT,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.ALERT, '<strong>Alert</strong><p>Important notice.</p>'),
  },
  {
    id: 'badge',
    label: BEAR_WIDGET_COMPONENT.BADGE,
    bearComponent: BEAR_WIDGET_COMPONENT.BADGE,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.BADGE, '<strong>Badge</strong>'),
  },
  {
    id: 'chip',
    label: BEAR_WIDGET_COMPONENT.CHIP,
    bearComponent: BEAR_WIDGET_COMPONENT.CHIP,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.CHIP, 'Chip'),
  },
  {
    id: 'avatar',
    label: BEAR_WIDGET_COMPONENT.AVATAR,
    bearComponent: BEAR_WIDGET_COMPONENT.AVATAR,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.AVATAR, 'YA'),
  },
  {
    id: 'divider',
    label: BEAR_WIDGET_COMPONENT.DIVIDER,
    bearComponent: BEAR_WIDGET_COMPONENT.DIVIDER,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.DIVIDER, ''),
  },
  {
    id: 'input',
    label: BEAR_WIDGET_COMPONENT.INPUT,
    bearComponent: BEAR_WIDGET_COMPONENT.INPUT,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.INPUT, '[Input]'),
  },
  {
    id: 'select',
    label: BEAR_WIDGET_COMPONENT.SELECT,
    bearComponent: BEAR_WIDGET_COMPONENT.SELECT,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.SELECT, '[Select]'),
  },
  {
    id: 'checkbox',
    label: BEAR_WIDGET_COMPONENT.CHECKBOX,
    bearComponent: BEAR_WIDGET_COMPONENT.CHECKBOX,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.CHECKBOX, '<label><input type="checkbox" /> Checkbox</label>'),
  },
  {
    id: 'switch',
    label: BEAR_WIDGET_COMPONENT.SWITCH,
    bearComponent: BEAR_WIDGET_COMPONENT.SWITCH,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.SWITCH, '<label><input type="checkbox" /> Switch</label>'),
  },
  {
    id: 'tabs',
    label: BEAR_WIDGET_COMPONENT.TABS,
    bearComponent: BEAR_WIDGET_COMPONENT.TABS,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.TABS, '<span>Tab A</span><span>Tab B</span><span>Tab C</span>'),
  },
  {
    id: 'accordion',
    label: BEAR_WIDGET_COMPONENT.ACCORDION,
    bearComponent: BEAR_WIDGET_COMPONENT.ACCORDION,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.ACCORDION, '<summary>Accordion</summary><p>Expandable section.</p>'),
  },
  {
    id: 'progress',
    label: BEAR_WIDGET_COMPONENT.PROGRESS,
    bearComponent: BEAR_WIDGET_COMPONENT.PROGRESS,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.PROGRESS, '<span></span>'),
  },
  {
    id: 'rating',
    label: BEAR_WIDGET_COMPONENT.RATING,
    bearComponent: BEAR_WIDGET_COMPONENT.RATING,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.RATING, '★★★★☆'),
  },
  {
    id: 'spinner',
    label: BEAR_WIDGET_COMPONENT.SPINNER,
    bearComponent: BEAR_WIDGET_COMPONENT.SPINNER,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.SPINNER, 'Loading…'),
  },
  {
    id: 'table',
    label: BEAR_WIDGET_COMPONENT.TABLE,
    bearComponent: BEAR_WIDGET_COMPONENT.TABLE,
    html: bearWidgetHtml(
      BEAR_WIDGET_COMPONENT.TABLE,
      '<thead><tr><th>Col A</th><th>Col B</th></tr></thead><tbody><tr><td>One</td><td>Two</td></tr></tbody>',
    ),
  },
  {
    id: 'carousel',
    label: BEAR_WIDGET_COMPONENT.CAROUSEL,
    bearComponent: BEAR_WIDGET_COMPONENT.CAROUSEL,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.CAROUSEL, '<div>Slide 1</div><div>Slide 2</div><div>Slide 3</div>'),
  },
  {
    id: 'image',
    label: BEAR_WIDGET_COMPONENT.IMAGE,
    bearComponent: BEAR_WIDGET_COMPONENT.IMAGE,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.IMAGE, `<img src="${HERO_IMG_SRC}" alt="${BEAR_WIDGET_COMPONENT.IMAGE}" />`),
  },
  {
    id: 'quote',
    label: BEAR_WIDGET_COMPONENT.QUOTE,
    bearComponent: BEAR_WIDGET_COMPONENT.QUOTE,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.QUOTE, 'A pull quote for the page.'),
  },
  {
    id: 'stat',
    label: BEAR_WIDGET_COMPONENT.STAT,
    bearComponent: BEAR_WIDGET_COMPONENT.STAT,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.STAT, '<strong>24</strong><span>Pages</span>'),
  },
  {
    id: 'cast',
    label: BEAR_WIDGET_COMPONENT.CAST,
    bearComponent: BEAR_WIDGET_COMPONENT.CAST,
    html: bearWidgetHtml(
      BEAR_WIDGET_COMPONENT.CAST,
      '<label>Email</label><input type="email" /><label>Name</label><input type="text" /><button type="submit">Send</button>',
    ),
  },
  {
    id: 'code-editor',
    label: BEAR_WIDGET_COMPONENT.CODE_EDITOR,
    bearComponent: BEAR_WIDGET_COMPONENT.CODE_EDITOR,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.CODE_EDITOR, '<code>const page = \'Ink CMS\';</code>'),
  },
  {
    id: 'drawer',
    label: BEAR_WIDGET_COMPONENT.DRAWER,
    bearComponent: BEAR_WIDGET_COMPONENT.DRAWER,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.DRAWER, '<strong>Drawer</strong><p>Side panel content.</p>'),
  },
  {
    id: 'modal',
    label: BEAR_WIDGET_COMPONENT.MODAL,
    bearComponent: BEAR_WIDGET_COMPONENT.MODAL,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.MODAL, '<strong>Modal</strong><p>Dialog body.</p>'),
  },
  {
    id: 'dropdown',
    label: BEAR_WIDGET_COMPONENT.DROPDOWN,
    bearComponent: BEAR_WIDGET_COMPONENT.DROPDOWN,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.DROPDOWN, '[Dropdown]'),
  },
  {
    id: 'file-upload',
    label: BEAR_WIDGET_COMPONENT.FILE_UPLOAD,
    bearComponent: BEAR_WIDGET_COMPONENT.FILE_UPLOAD,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.FILE_UPLOAD, '[File upload]'),
  },
  {
    id: 'color-picker',
    label: BEAR_WIDGET_COMPONENT.COLOR_PICKER,
    bearComponent: BEAR_WIDGET_COMPONENT.COLOR_PICKER,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.COLOR_PICKER, '<input type="color" />'),
  },
  {
    id: 'date-picker',
    label: BEAR_WIDGET_COMPONENT.DATE_PICKER,
    bearComponent: BEAR_WIDGET_COMPONENT.DATE_PICKER,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.DATE_PICKER, '<input type="date" />'),
  },
  {
    id: 'pagination',
    label: BEAR_WIDGET_COMPONENT.PAGINATION,
    bearComponent: BEAR_WIDGET_COMPONENT.PAGINATION,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.PAGINATION, '1 2 3'),
  },
  {
    id: 'app-bar',
    label: BEAR_WIDGET_COMPONENT.APP_BAR,
    bearComponent: BEAR_WIDGET_COMPONENT.APP_BAR,
    html: bearWidgetHtml(BEAR_WIDGET_COMPONENT.APP_BAR, 'App bar'),
  },
  {
    id: 'grid-table',
    label: BEAR_WIDGET_COMPONENT.GRID_TABLE,
    bearComponent: BEAR_WIDGET_COMPONENT.GRID_TABLE,
    html: bearWidgetHtml(
      BEAR_WIDGET_COMPONENT.GRID_TABLE,
      '<thead><tr><th>Title</th><th>Status</th></tr></thead><tbody><tr><td>Installation</td><td>Published</td></tr></tbody>',
    ),
  },
];

export const CAST_WIDGET_ID = 'cast';

export const CONTENT_EDIT_KIND = {
  PAGE: 'page',
  ITEM: 'item',
} as const;

export const CONTENT_EDIT_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const;

export const CONTENT_EDIT_STATUS_ORDER = [
  CONTENT_EDIT_STATUS.DRAFT,
  CONTENT_EDIT_STATUS.PUBLISHED,
  CONTENT_EDIT_STATUS.ARCHIVED,
] as const;

export const CONTENT_EDIT_REVISION_LIMIT = NUMBER_TWELVE;

export const SECTION_TYPE = {
  HTML: 'html',
  HEADER: 'header',
  PARAGRAPH: 'paragraph',
  P: 'p',
  IMAGE: 'image',
  CODE: 'code',
  STEPS: 'steps',
  LIST: 'list',
} as const;

export const PAYLOAD_HTML_KEY = 'html';
export const PAYLOAD_SECTIONS_KEY = 'sections';
export const PAYLOAD_BLOCKS_KEY = 'blocks';
export const PAYLOAD_SUPPORT_KEY = 'support';
export const PAYLOAD_HEADLINE_KEY = 'headline';
export const PAYLOAD_TEXT_KEY = 'text';
export const PAYLOAD_TYPE_KEY = 'type';
export const PAYLOAD_LEVEL_KEY = 'level';
export const PAYLOAD_SRC_KEY = 'src';
export const PAYLOAD_ALT_KEY = 'alt';
export const PAYLOAD_CODE_KEY = 'code';
export const PAYLOAD_TITLE_KEY = 'title';
export const PAYLOAD_ITEMS_KEY = 'items';
export const PAYLOAD_ORDERED_KEY = 'ordered';
export const PAYLOAD_BODY_KEY = 'body';

export const PAYLOAD_HTML_LIST_KEYS = [PAYLOAD_SECTIONS_KEY, PAYLOAD_BLOCKS_KEY] as const;

export const PAYLOAD_HTML_FALLBACK = [
  { key: PAYLOAD_SUPPORT_KEY, tag: HTML_TAG_P },
  { key: PAYLOAD_HEADLINE_KEY, tag: HTML_TAG_H2 },
] as const;

export const PAYLOAD_KEY_SUBTITLE = 'subtitle';
export const PAYLOAD_KEY_SEO_TITLE = 'seoTitle';
export const PAYLOAD_KEY_SEO_DESCRIPTION = 'seoDescription';
export const PAYLOAD_KEY_SEO_KEYWORD = 'seoKeyword';
export const PAYLOAD_KEY_OG_TITLE = 'ogTitle';
export const PAYLOAD_KEY_OG_DESCRIPTION = 'ogDescription';
export const PAYLOAD_KEY_OG_IMAGE = 'ogImage';
export const PAYLOAD_KEY_TAGS = 'tags';
export const PAYLOAD_KEY_CATEGORIES = 'categories';
export const PAYLOAD_KEY_AUTHOR = 'author';
export const PAYLOAD_KEY_SCHEDULE = 'scheduleAt';
export const PAYLOAD_KEY_FEATURED = 'featuredImage';
export const PAYLOAD_KEY_CAST_FIELDS = 'castFields';
export const PAYLOAD_KEY_CAST_VALUES = 'castValues';
export const PAYLOAD_KEY_TEMPLATE = 'template';
export const PAYLOAD_KEY_LAYOUT = 'layoutId';
export const CONTENT_EDIT_TITLE_ID = 'cms-edit-title';
export const CONTENT_EDIT_SUBTITLE_ID = 'cms-edit-subtitle';
export const CONTENT_EDIT_SLUG_ID = 'cms-edit-slug';
export const CONTENT_EDIT_AUTHOR_ID = 'cms-edit-author';
export const CONTENT_EDIT_TAGS_ID = 'cms-edit-tags';
export const CONTENT_EDIT_CATEGORIES_ID = 'cms-edit-categories';
export const CONTENT_EDIT_FEATURED_ID = 'cms-edit-featured';
export const CONTENT_EDIT_SEO_TITLE_ID = 'cms-edit-seo-title';
export const CONTENT_EDIT_SEO_DESC_ID = 'cms-edit-seo-description';
export const CONTENT_EDIT_SEO_KEYWORD_ID = 'cms-edit-seo-keyword';
export const CONTENT_EDIT_OG_TITLE_ID = 'cms-edit-og-title';
export const CONTENT_EDIT_OG_DESC_ID = 'cms-edit-og-description';
export const CONTENT_EDIT_OG_IMAGE_ID = 'cms-edit-og-image';
export const CONTENT_EDIT_SCHEDULE_ID = 'cms-edit-schedule';
export const CONTENT_EDIT_SCHEDULE_DATE_ID = 'cms-edit-schedule-date';
export const CONTENT_EDIT_SCHEDULE_TIME_ID = 'cms-edit-schedule-time';
export const SCHEDULE_DEFAULT_TIME = '09:00';
