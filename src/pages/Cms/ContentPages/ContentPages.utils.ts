import { docsPath, EMPTY_STRING, SITE_URL } from '@const/index';
import { isStringValue } from '@utils';
import {
  PAYLOAD_KEY_LAYOUT,
  PAYLOAD_KEY_TEMPLATE,
} from '@pages/Cms/ContentEdit/ContentEdit.const';
import type { Messages } from '@i18n/types';
import {
  CONTENT_COLLECTION_DOCS,
  CONTENT_STATUS_CLASS,
  CONTENT_STATUS_CLASS_FALLBACK,
  CONTENT_STATUS_DRAFT,
  CONTENT_STATUS_PUBLISHED,
} from './ContentPages.const';
import type { ContentTableRow } from './ContentPages.types';

export const formatContentUpdated = (iso: string, locale: string): string => {
  if (!iso) return EMPTY_STRING;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString(locale);
};

export const resolveDocsPublicUrl = (slug: string): string => {
  if (import.meta.env.DEV) {
    return docsPath(slug);
  }
  return `${SITE_URL}${docsPath(slug)}`;
};

export const templateFromPayload = (payload: Record<string, unknown>): string => {
  const template = payload[PAYLOAD_KEY_TEMPLATE];
  if (isStringValue(template) && template) return template;
  const layout = payload[PAYLOAD_KEY_LAYOUT];
  if (isStringValue(layout) && layout) return layout;
  return EMPTY_STRING;
};

export const openContentRowTarget = (row: ContentTableRow): void => {
  if (row.collection !== CONTENT_COLLECTION_DOCS) return;
  const url = resolveDocsPublicUrl(row.slug);
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const contentStatusClass = (status: string): string => {
  const key = status.toLowerCase();
  if (key === CONTENT_STATUS_PUBLISHED) return CONTENT_STATUS_CLASS[CONTENT_STATUS_PUBLISHED];
  if (key === CONTENT_STATUS_DRAFT) return CONTENT_STATUS_CLASS[CONTENT_STATUS_DRAFT];
  return CONTENT_STATUS_CLASS_FALLBACK;
};

export const contentStatusLabel = (status: string, copy: Messages['dashboard']): string => {
  const key = status.toLowerCase();
  if (key === CONTENT_STATUS_PUBLISHED) return copy.contentStatusPublished;
  if (key === CONTENT_STATUS_DRAFT) return copy.contentStatusDraft;
  return status;
};
