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
    id: 'button',
    label: 'Button',
    bearComponent: 'Button',
    html: `<p ${DATA_BEAR_WIDGET_ATTR}="Button"><a href="#">Button</a></p>`,
  },
  {
    id: 'alert',
    label: 'Alert',
    bearComponent: 'Alert',
    html: `<div ${DATA_BEAR_WIDGET_ATTR}="Alert" class="ink-cms-widget-alert" role="alert"><strong class="ink-cms-widget-alert__title">Alert</strong><p class="ink-cms-widget-alert__body">Important notice — this is a working Bear Alert block.</p></div>`,
  },
  {
    id: 'badge',
    label: 'Badge',
    bearComponent: 'Badge',
    html: `<p><span ${DATA_BEAR_WIDGET_ATTR}="Badge"><strong>Badge</strong></span></p>`,
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
    html: `<p ${DATA_BEAR_WIDGET_ATTR}="Input"><em>[Input: Enter value]</em></p>`,
  },
] as const;

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
