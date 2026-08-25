import { docsPath, EMPTY_STRING, SITE_URL } from '@const/index';
import { CONTENT_COLLECTION_DOCS } from './ContentPages.const';
import type { ContentTableRow } from './ContentPages.types';

export const formatContentUpdated = (iso: string, locale: string): string => {
  if (!iso) return '';
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
  if (typeof payload.template === 'string' && payload.template) return payload.template;
  if (typeof payload.layoutId === 'string' && payload.layoutId) return payload.layoutId;
  return EMPTY_STRING;
};

export const openContentRowTarget = (row: ContentTableRow): void => {
  if (row.collection !== CONTENT_COLLECTION_DOCS) return;
  const url = resolveDocsPublicUrl(row.slug);
  window.open(url, '_blank', 'noopener,noreferrer');
};
