import { EMPTY_STRING } from '@const/index';
import type { ContentItem, CmsPageItem } from '@sdk/modules/content';
import { CONTENT_EDIT_KIND } from './ContentEdit.const';
import type { ContentEditTarget } from './ContentEdit.types';

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const sectionToHtml = (section: unknown): string => {
  if (typeof section === 'string') {
    return `<p>${escapeHtml(section)}</p>`;
  }
  if (!section || typeof section !== 'object') {
    return EMPTY_STRING;
  }
  const entry = section as Record<string, unknown>;
  if (typeof entry.html === 'string') {
    return entry.html;
  }
  if (entry.type === 'html' && typeof entry.html === 'string') {
    return entry.html;
  }
  if (entry.type === 'header' && typeof entry.text === 'string') {
    const level =
      typeof entry.level === 'number' && entry.level >= 1 && entry.level <= 4
        ? entry.level
        : 2;
    return `<h${level}>${escapeHtml(entry.text)}</h${level}>`;
  }
  if (
    (entry.type === 'paragraph' || entry.type === 'p') &&
    typeof entry.text === 'string'
  ) {
    return `<p>${escapeHtml(entry.text)}</p>`;
  }
  if (typeof entry.text === 'string') {
    return `<p>${escapeHtml(entry.text)}</p>`;
  }
  if (entry.type === 'steps' && Array.isArray(entry.items)) {
    const title =
      typeof entry.title === 'string' && entry.title
        ? `<h3>${escapeHtml(entry.title)}</h3>`
        : EMPTY_STRING;
    const items = entry.items
      .map((item) => {
        if (!item || typeof item !== 'object') return EMPTY_STRING;
        const step = item as { title?: string; body?: string };
        const stepTitle = step.title ? escapeHtml(step.title) : EMPTY_STRING;
        const stepBody = step.body ? escapeHtml(step.body) : EMPTY_STRING;
        return `<li><strong>${stepTitle}</strong><br /><span>${stepBody}</span></li>`;
      })
      .filter(Boolean)
      .join(EMPTY_STRING);
    return `${title}<ol>${items}</ol>`;
  }
  if (entry.type === 'list' && Array.isArray(entry.items)) {
    const Tag = entry.ordered ? 'ol' : 'ul';
    const items = entry.items
      .map((item) =>
        typeof item === 'string' ? `<li>${escapeHtml(item)}</li>` : EMPTY_STRING,
      )
      .join(EMPTY_STRING);
    return `<${Tag}>${items}</${Tag}>`;
  }
  return EMPTY_STRING;
};

export const htmlFromPayload = (payload: Record<string, unknown>): string => {
  if (typeof payload.html === 'string' && payload.html) {
    return payload.html;
  }
  const sections = Array.isArray(payload.sections) ? payload.sections : null;
  if (sections && sections.length > 0) {
    return sections.map(sectionToHtml).filter(Boolean).join('\n');
  }
  const blocks = Array.isArray(payload.blocks) ? payload.blocks : null;
  if (blocks && blocks.length > 0) {
    return blocks.map(sectionToHtml).filter(Boolean).join('\n');
  }
  if (typeof payload.support === 'string') {
    return `<p>${escapeHtml(payload.support)}</p>`;
  }
  if (typeof payload.headline === 'string') {
    return `<h2>${escapeHtml(payload.headline)}</h2>`;
  }
  return EMPTY_STRING;
};

export const appendWidgetHtml = (bodyHtml: string, widgetHtml: string): string => {
  if (!bodyHtml) return widgetHtml;
  return `${bodyHtml}\n${widgetHtml}`;
};

export const resolveEditTarget = (
  id: string,
  pages: CmsPageItem[],
  items: ContentItem[],
): ContentEditTarget | null => {
  const page = pages.find((entry) => entry.id === id);
  if (page) {
    return {
      kind: CONTENT_EDIT_KIND.PAGE,
      id: page.id,
      title: page.title,
      slug: page.slug,
      status: page.status,
      bodyHtml: page.bodyHtml || EMPTY_STRING,
      mediaUrl: page.mediaUrl,
    };
  }
  const item = items.find((entry) => entry.id === id);
  if (item) {
    return {
      kind: CONTENT_EDIT_KIND.ITEM,
      id: item.id,
      title: item.title || item.slug,
      slug: item.slug,
      status: item.status,
      bodyHtml: htmlFromPayload(item.payload),
      collection: item.collection,
      locale: item.locale,
      payload: item.payload,
    };
  }
  return null;
};
