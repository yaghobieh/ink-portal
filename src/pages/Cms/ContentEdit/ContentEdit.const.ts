import { DATA_BEAR_WIDGET_ATTR } from '@const/strings.const';
import type { BearWidgetDef } from './ContentEdit.types';

export const CONTENT_EDIT_EDITOR_MIN_HEIGHT_PX = 420;
export const CONTENT_EDIT_DRAWER_WIDTH_PX = 380;
export const CONTENT_EDIT_PREVIEW_MIN_HEIGHT_PX = 320;

export const BEAR_WIDGET_CATALOG: readonly BearWidgetDef[] = [
  {
    id: 'typography',
    label: 'Typography',
    bearComponent: 'Typography',
    html: `<p ${DATA_BEAR_WIDGET_ATTR}="Typography"><strong>Heading</strong> — body text block.</p>`,
  },
  {
    id: 'card',
    label: 'Card',
    bearComponent: 'Card',
    html: `<div ${DATA_BEAR_WIDGET_ATTR}="Card" class="ink-cms-widget-card"><p><strong>Card</strong></p><p>Card body content.</p></div>`,
  },
  {
    id: 'flex',
    label: 'Flex',
    bearComponent: 'Flex',
    html: `<div ${DATA_BEAR_WIDGET_ATTR}="Flex" class="ink-cms-widget-flex"><p>Flex item A</p><p>Flex item B</p></div>`,
  },
  {
    id: 'grid',
    label: 'Grid',
    bearComponent: 'Grid',
    html: `<div ${DATA_BEAR_WIDGET_ATTR}="Grid" class="ink-cms-widget-grid-block"><p>Grid A</p><p>Grid B</p><p>Grid C</p></div>`,
  },
  {
    id: 'button',
    label: 'Button',
    bearComponent: 'Button',
    html: `<p ${DATA_BEAR_WIDGET_ATTR}="Button"><a href="#">Button</a></p>`,
  },
  {
    id: 'alert',
    label: 'Alert',
    bearComponent: 'Alert',
    html: `<div ${DATA_BEAR_WIDGET_ATTR}="Alert" class="ink-cms-widget-alert" role="alert"><strong class="ink-cms-widget-alert__title">Alert</strong><p class="ink-cms-widget-alert__body">Important notice.</p></div>`,
  },
  {
    id: 'badge',
    label: 'Badge',
    bearComponent: 'Badge',
    html: `<p><span ${DATA_BEAR_WIDGET_ATTR}="Badge"><strong>Badge</strong></span></p>`,
  },
  {
    id: 'chip',
    label: 'Chip',
    bearComponent: 'Chip',
    html: `<p><span ${DATA_BEAR_WIDGET_ATTR}="Chip" class="ink-cms-widget-chip-token">Chip</span></p>`,
  },
  {
    id: 'avatar',
    label: 'Avatar',
    bearComponent: 'Avatar',
    html: `<p ${DATA_BEAR_WIDGET_ATTR}="Avatar" class="ink-cms-widget-avatar">YA</p>`,
  },
  {
    id: 'divider',
    label: 'Divider',
    bearComponent: 'Divider',
    html: `<hr ${DATA_BEAR_WIDGET_ATTR}="Divider" />`,
  },
  {
    id: 'input',
    label: 'Input',
    bearComponent: 'Input',
    html: `<p ${DATA_BEAR_WIDGET_ATTR}="Input"><em>[Input]</em></p>`,
  },
  {
    id: 'select',
    label: 'Select',
    bearComponent: 'Select',
    html: `<p ${DATA_BEAR_WIDGET_ATTR}="Select"><em>[Select]</em></p>`,
  },
  {
    id: 'checkbox',
    label: 'Checkbox',
    bearComponent: 'Checkbox',
    html: `<p ${DATA_BEAR_WIDGET_ATTR}="Checkbox"><label><input type="checkbox" /> Checkbox</label></p>`,
  },
  {
    id: 'switch',
    label: 'Switch',
    bearComponent: 'Switch',
    html: `<p ${DATA_BEAR_WIDGET_ATTR}="Switch"><label><input type="checkbox" /> Switch</label></p>`,
  },
  {
    id: 'tabs',
    label: 'Tabs',
    bearComponent: 'Tabs',
    html: `<div ${DATA_BEAR_WIDGET_ATTR}="Tabs" class="ink-cms-widget-tabs"><span>Tab A</span><span>Tab B</span><span>Tab C</span></div>`,
  },
  {
    id: 'accordion',
    label: 'Accordion',
    bearComponent: 'Accordion',
    html: `<details ${DATA_BEAR_WIDGET_ATTR}="Accordion" open><summary>Accordion</summary><p>Expandable section.</p></details>`,
  },
  {
    id: 'progress',
    label: 'Progress',
    bearComponent: 'Progress',
    html: `<div ${DATA_BEAR_WIDGET_ATTR}="Progress" class="ink-cms-widget-progress"><span style="width:40%"></span></div>`,
  },
  {
    id: 'rating',
    label: 'Rating',
    bearComponent: 'Rating',
    html: `<p ${DATA_BEAR_WIDGET_ATTR}="Rating">★★★★☆</p>`,
  },
  {
    id: 'spinner',
    label: 'Spinner',
    bearComponent: 'Spinner',
    html: `<p ${DATA_BEAR_WIDGET_ATTR}="Spinner">Loading…</p>`,
  },
  {
    id: 'table',
    label: 'Table',
    bearComponent: 'Table',
    html: `<table ${DATA_BEAR_WIDGET_ATTR}="Table" class="ink-cms-widget-table"><thead><tr><th>Col A</th><th>Col B</th></tr></thead><tbody><tr><td>One</td><td>Two</td></tr></tbody></table>`,
  },
  {
    id: 'carousel',
    label: 'Carousel',
    bearComponent: 'Carousel',
    html: `<div ${DATA_BEAR_WIDGET_ATTR}="Carousel" class="ink-cms-widget-carousel"><div class="ink-cms-widget-carousel__track"><div>Slide 1</div><div>Slide 2</div><div>Slide 3</div></div></div>`,
  },
  {
    id: 'image',
    label: 'Image',
    bearComponent: 'Image',
    html: `<p ${DATA_BEAR_WIDGET_ATTR}="Image"><img src="/ink-hero.png" alt="Image" /></p>`,
  },
  {
    id: 'quote',
    label: 'Quote',
    bearComponent: 'Quote',
    html: `<blockquote ${DATA_BEAR_WIDGET_ATTR}="Quote">A pull quote for the page.</blockquote>`,
  },
  {
    id: 'stat',
    label: 'Stat',
    bearComponent: 'Stat',
    html: `<div ${DATA_BEAR_WIDGET_ATTR}="Stat" class="ink-cms-widget-stat"><strong>24</strong><span>Pages</span></div>`,
  },
  {
    id: 'cast',
    label: 'Cast form',
    bearComponent: 'Cast',
    html: `<form ${DATA_BEAR_WIDGET_ATTR}="Cast" class="ink-cms-widget-form"><label>Email</label><input type="email" /><label>Name</label><input type="text" /><button type="submit">Send</button></form>`,
  },
  {
    id: 'code-editor',
    label: 'Code editor',
    bearComponent: 'CodeEditor',
    html: `<pre ${DATA_BEAR_WIDGET_ATTR}="CodeEditor"><code>const page = 'Ink CMS';</code></pre>`,
  },
  {
    id: 'drawer',
    label: 'Drawer',
    bearComponent: 'Drawer',
    html: `<aside ${DATA_BEAR_WIDGET_ATTR}="Drawer" class="ink-cms-widget-drawer"><strong>Drawer</strong><p>Side panel content.</p></aside>`,
  },
  {
    id: 'modal',
    label: 'Modal',
    bearComponent: 'Modal',
    html: `<div ${DATA_BEAR_WIDGET_ATTR}="Modal" class="ink-cms-widget-card"><strong>Modal</strong><p>Dialog body.</p></div>`,
  },
  {
    id: 'dropdown',
    label: 'Dropdown',
    bearComponent: 'Dropdown',
    html: `<p ${DATA_BEAR_WIDGET_ATTR}="Dropdown"><em>[Dropdown]</em></p>`,
  },
  {
    id: 'file-upload',
    label: 'File upload',
    bearComponent: 'FileUpload',
    html: `<p ${DATA_BEAR_WIDGET_ATTR}="FileUpload"><em>[File upload]</em></p>`,
  },
  {
    id: 'color-picker',
    label: 'Color picker',
    bearComponent: 'ColorPicker',
    html: `<p ${DATA_BEAR_WIDGET_ATTR}="ColorPicker"><input type="color" /></p>`,
  },
  {
    id: 'date-picker',
    label: 'Date picker',
    bearComponent: 'DatePicker',
    html: `<p ${DATA_BEAR_WIDGET_ATTR}="DatePicker"><input type="date" /></p>`,
  },
  {
    id: 'pagination',
    label: 'Pagination',
    bearComponent: 'Pagination',
    html: `<p ${DATA_BEAR_WIDGET_ATTR}="Pagination">1 2 3</p>`,
  },
  {
    id: 'app-bar',
    label: 'App bar',
    bearComponent: 'AppBar',
    html: `<header ${DATA_BEAR_WIDGET_ATTR}="AppBar" class="ink-cms-widget-card">App bar</header>`,
  },
  {
    id: 'grid-table',
    label: 'Grid table',
    bearComponent: 'GridTable',
    html: `<table ${DATA_BEAR_WIDGET_ATTR}="GridTable" class="ink-cms-widget-table"><thead><tr><th>Title</th><th>Status</th></tr></thead><tbody><tr><td>Installation</td><td>Published</td></tr></tbody></table>`,
  },
] as const;

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

export const CONTENT_EDIT_REVISION_LIMIT = 12;

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
export const SCHEDULE_PAD_LENGTH = 2;
export const SCHEDULE_DEFAULT_TIME = '09:00';
