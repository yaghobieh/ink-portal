import type { CONTENT_KIND_PAGE, CONTENT_KIND_ITEM } from './ContentPages.const';

export type ContentKind = typeof CONTENT_KIND_PAGE | typeof CONTENT_KIND_ITEM;

export type ContentSelection =
  | { kind: 'page'; id: string }
  | { kind: 'item'; id: string }
  | null;

export type ContentTableRow = {
  id: string;
  kind: ContentKind;
  title: string;
  slug: string;
  collection: string;
  status: string;
  updated: string;
  updatedAt: string;
};
