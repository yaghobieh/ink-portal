import type { ContentKind } from './ContentPages.const';

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
  template: string;
  fields: string;
  status: string;
  updated: string;
  updatedAt: string;
  [key: string]: unknown;
};
