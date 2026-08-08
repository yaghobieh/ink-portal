export const CONTENT_EDITOR_MIN_HEIGHT_PX = 280;

export const CONTENT_KIND_PAGE = 'page';
export const CONTENT_KIND_ITEM = 'item';

export type ContentKind = typeof CONTENT_KIND_PAGE | typeof CONTENT_KIND_ITEM;

export const CONTENT_COLLECTION_DOCS = 'docs';
export const CONTENT_COLLECTION_PAGES = 'pages';

export const CONTENT_COLUMN_IDS = {
  TITLE: 'title',
  SLUG: 'slug',
  COLLECTION: 'collection',
  STATUS: 'status',
  UPDATED: 'updated',
} as const;

export const CONTENT_DATE_LOCALE = 'en-CA';
