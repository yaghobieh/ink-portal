export const CONTENT_KIND_PAGE = 'page';
export const CONTENT_KIND_ITEM = 'item';

export type ContentKind = typeof CONTENT_KIND_PAGE | typeof CONTENT_KIND_ITEM;

export const CONTENT_COLLECTION_DOCS = 'docs';
export const CONTENT_COLLECTION_PAGES = 'pages';
export const CONTENT_COLLECTION_TEMPLATES = 'templates';

export const DOCUMENT_TEMPLATE_ID = 'document';
export const DOCUMENT_SLUG_PREFIX = 'document-';
export const DOCUMENT_IMAGE_SRC = '/docs/toolbar.svg';
export const DOCUMENT_IMAGE_ALT = 'Toolbar presets and format controls';
export const DOCUMENT_DEFAULT_LOCALE = 'en';
export const DOCUMENT_STARTER_STATUS = 'draft' as const;

export const DOCUMENT_STARTER_BLOCKS = [
  {
    type: 'image',
    src: DOCUMENT_IMAGE_SRC,
    alt: DOCUMENT_IMAGE_ALT,
  },
  {
    type: 'p',
    text: 'Document is the default Ink CMS template. Replace this copy, keep the gif, and add code when the page needs a snippet.',
  },
  {
    type: 'code',
    language: 'tsx',
    code: `import { InkEditor } from '@forgedevstack/ink';

<InkEditor
  value={html}
  onChange={setHtml}
  toolbar={['headingDropdown', 'bold', 'italic', 'undo', 'redo']}
/>`,
  },
] as const;

export const CONTENT_COLUMN_IDS = {
  TITLE: 'title',
  SLUG: 'slug',
  COLLECTION: 'collection',
  TEMPLATE: 'template',
  STATUS: 'status',
  UPDATED: 'updated',
  ACTIONS: 'actions',
} as const;

export const CONTENT_DATE_LOCALE = 'en-CA';

export const CONTENT_NEW_PAGE_MENU_MIN_WIDTH = 220;
export const SAVED_TEMPLATES_DIVIDER_KEY = 'saved-templates-divider';
