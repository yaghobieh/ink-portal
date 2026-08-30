import {
  EMPTY_STRING,
  HTML_NEWLINE,
  HTML_TAG_H,
  HTML_TAG_H3,
  HTML_TAG_IMG,
  HTML_TAG_LI,
  HTML_TAG_OL,
  HTML_TAG_P,
  HTML_TAG_PRE,
  HTML_TAG_UL,
  ISO_DATE_SEP,
  ISO_MIDNIGHT_CLOCK,
  PAD_CHAR_ZERO,
} from '@const/index';
import { NUMBER_FIVE, NUMBER_FOUR, NUMBER_ONE, NUMBER_TWO, NUMBER_ZERO } from '@const/numbers.const';
import { isNumberValue, isPlainObject, isStringValue } from '@utils';
import type { ContentItem, CmsPageItem } from '@sdk/modules/content';
import {
  CONTENT_COLLECTION_PAGE_META,
  CONTENT_COLLECTION_PAGES,
} from '@pages/Cms/ContentPages/ContentPages.const';
import {
  CONTENT_EDIT_KIND,
  PAYLOAD_ALT_KEY,
  PAYLOAD_BODY_KEY,
  PAYLOAD_CODE_KEY,
  PAYLOAD_HTML_FALLBACK,
  PAYLOAD_HTML_KEY,
  PAYLOAD_HTML_LIST_KEYS,
  PAYLOAD_ITEMS_KEY,
  PAYLOAD_LEVEL_KEY,
  PAYLOAD_ORDERED_KEY,
  PAYLOAD_SRC_KEY,
  PAYLOAD_TEXT_KEY,
  PAYLOAD_TITLE_KEY,
  PAYLOAD_TYPE_KEY,
  SCHEDULE_DEFAULT_TIME,
  SECTION_TYPE,
} from './ContentEdit.const';
import type { ContentEditTarget } from './ContentEdit.types';

const HEADER_DEFAULT_LEVEL = NUMBER_TWO;
const HEADER_MAX_LEVEL = NUMBER_FOUR;

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const wrapTag = (tag: string, inner: string): string => `<${tag}>${inner}</${tag}>`;

const asRecord = (value: unknown): Record<string, unknown> | null =>
  isPlainObject(value) ? value : null;

const stringField = (entry: Record<string, unknown>, key: string): string => {
  const value = entry[key];
  return isStringValue(value) ? value : EMPTY_STRING;
};

const headerHtml = (entry: Record<string, unknown>): string => {
  const text = stringField(entry, PAYLOAD_TEXT_KEY);
  if (!text) return EMPTY_STRING;
  const raw = entry[PAYLOAD_LEVEL_KEY];
  const level =
    isNumberValue(raw) && raw >= NUMBER_ONE && raw <= HEADER_MAX_LEVEL
      ? raw
      : HEADER_DEFAULT_LEVEL;
  return wrapTag(`${HTML_TAG_H}${level}`, escapeHtml(text));
};

const paragraphHtml = (entry: Record<string, unknown>): string => {
  const text = stringField(entry, PAYLOAD_TEXT_KEY);
  return text ? wrapTag(HTML_TAG_P, escapeHtml(text)) : EMPTY_STRING;
};

const imageHtml = (entry: Record<string, unknown>): string => {
  const src = stringField(entry, PAYLOAD_SRC_KEY);
  if (!src) return EMPTY_STRING;
  const alt = escapeHtml(stringField(entry, PAYLOAD_ALT_KEY));
  return `<${HTML_TAG_IMG} src="${escapeHtml(src)}" alt="${alt}" />`;
};

const codeHtml = (entry: Record<string, unknown>): string => {
  const code = stringField(entry, PAYLOAD_CODE_KEY);
  return code ? wrapTag(HTML_TAG_PRE, escapeHtml(code)) : EMPTY_STRING;
};

const stepsHtml = (entry: Record<string, unknown>): string => {
  const items = entry[PAYLOAD_ITEMS_KEY];
  if (!Array.isArray(items)) return EMPTY_STRING;
  const title = stringField(entry, PAYLOAD_TITLE_KEY);
  const heading = title ? wrapTag(HTML_TAG_H3, escapeHtml(title)) : EMPTY_STRING;
  const rows = items
    .map((item) => {
      const step = asRecord(item);
      if (!step) return EMPTY_STRING;
      const stepTitle = escapeHtml(stringField(step, PAYLOAD_TITLE_KEY));
      const stepBody = escapeHtml(stringField(step, PAYLOAD_BODY_KEY));
      return `<${HTML_TAG_LI}><strong>${stepTitle}</strong><br /><span>${stepBody}</span></${HTML_TAG_LI}>`;
    })
    .filter(Boolean)
    .join(EMPTY_STRING);
  return `${heading}${wrapTag(HTML_TAG_OL, rows)}`;
};

const listHtml = (entry: Record<string, unknown>): string => {
  const items = entry[PAYLOAD_ITEMS_KEY];
  if (!Array.isArray(items)) return EMPTY_STRING;
  const tag = entry[PAYLOAD_ORDERED_KEY] ? HTML_TAG_OL : HTML_TAG_UL;
  const rows = items
    .map((item) =>
      isStringValue(item) ? wrapTag(HTML_TAG_LI, escapeHtml(item)) : EMPTY_STRING,
    )
    .join(EMPTY_STRING);
  return wrapTag(tag, rows);
};

const SECTION_HTML: Record<string, (entry: Record<string, unknown>) => string> = {
  [SECTION_TYPE.HTML]: (entry) => stringField(entry, PAYLOAD_HTML_KEY),
  [SECTION_TYPE.HEADER]: headerHtml,
  [SECTION_TYPE.PARAGRAPH]: paragraphHtml,
  [SECTION_TYPE.P]: paragraphHtml,
  [SECTION_TYPE.IMAGE]: imageHtml,
  [SECTION_TYPE.CODE]: codeHtml,
  [SECTION_TYPE.STEPS]: stepsHtml,
  [SECTION_TYPE.LIST]: listHtml,
};

const sectionToHtml = (section: unknown): string => {
  if (isStringValue(section)) {
    return wrapTag(HTML_TAG_P, escapeHtml(section));
  }
  const entry = asRecord(section);
  if (!entry) return EMPTY_STRING;
  const html = stringField(entry, PAYLOAD_HTML_KEY);
  if (html) return html;
  const type = stringField(entry, PAYLOAD_TYPE_KEY);
  const handler = SECTION_HTML[type] ?? paragraphHtml;
  return handler(entry);
};

export const htmlFromPayload = (payload: Record<string, unknown>): string => {
  const html = payload[PAYLOAD_HTML_KEY];
  if (isStringValue(html) && html) return html;
  const list = PAYLOAD_HTML_LIST_KEYS.map((key) => payload[key]).find(
    (value) => Array.isArray(value) && value.length > NUMBER_ZERO,
  );
  if (Array.isArray(list)) {
    return list.map(sectionToHtml).filter(Boolean).join(HTML_NEWLINE);
  }
  const fallback = PAYLOAD_HTML_FALLBACK.find(({ key }) => isStringValue(payload[key]));
  if (!fallback) return EMPTY_STRING;
  const value = payload[fallback.key];
  return isStringValue(value) ? wrapTag(fallback.tag, escapeHtml(value)) : EMPTY_STRING;
};

export const appendWidgetHtml = (bodyHtml: string, widgetHtml: string): string => {
  if (!bodyHtml) return widgetHtml;
  return `${bodyHtml}${HTML_NEWLINE}${widgetHtml}`;
};

export { loadSeoCollapsed, saveSeoCollapsed } from '@utils';

export const resolveEditTarget = (
  id: string,
  pages: CmsPageItem[],
  items: ContentItem[],
): ContentEditTarget | null => {
  const page = pages.find((entry) => entry.id === id);
  if (page) {
    const meta = items.find(
      (entry) => entry.collection === CONTENT_COLLECTION_PAGE_META && entry.slug === page.id,
    );
    const contentPage = items.find(
      (entry) =>
        entry.collection === CONTENT_COLLECTION_PAGES &&
        (entry.id === page.id || entry.slug === page.slug),
    );
    return {
      kind: CONTENT_EDIT_KIND.PAGE,
      id: page.id,
      title: page.title,
      slug: page.slug,
      status: page.status,
      bodyHtml: page.bodyHtml || EMPTY_STRING,
      mediaUrl: page.mediaUrl,
      collection: CONTENT_COLLECTION_PAGES,
      locale: contentPage?.locale || meta?.locale,
      payload: {
        ...(contentPage?.payload || {}),
        ...(meta?.payload || {}),
      },
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

export const payloadString = (
  payload: Record<string, unknown> | undefined,
  key: string,
): string => {
  const value = payload?.[key];
  return isStringValue(value) ? value : EMPTY_STRING;
};

const pad = (value: number): string => String(value).padStart(NUMBER_TWO, PAD_CHAR_ZERO);

export const nowScheduleAt = (): string => {
  const now = new Date();
  const day = `${now.getFullYear()}-${pad(now.getMonth() + NUMBER_ONE)}-${pad(now.getDate())}`;
  const clock = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  return `${day}${ISO_DATE_SEP}${clock}`;
};

export const splitScheduleAt = (value: string): { date: Date | null; time: string } => {
  const source = value && value.includes(ISO_DATE_SEP) ? value : nowScheduleAt();
  const [day, clock] = source.split(ISO_DATE_SEP);
  const date = new Date(`${day}${ISO_DATE_SEP}${ISO_MIDNIGHT_CLOCK}`);
  return {
    date: Number.isNaN(date.getTime()) ? null : date,
    time: clock.slice(NUMBER_ZERO, NUMBER_FIVE) || SCHEDULE_DEFAULT_TIME,
  };
};

export const joinScheduleAt = (date: Date | null, time: string): string => {
  if (!date) return EMPTY_STRING;
  const day = `${date.getFullYear()}-${pad(date.getMonth() + NUMBER_ONE)}-${pad(date.getDate())}`;
  const clock =
    time && time.length >= NUMBER_FOUR ? time.slice(NUMBER_ZERO, NUMBER_FIVE) : SCHEDULE_DEFAULT_TIME;
  return `${day}${ISO_DATE_SEP}${clock}`;
};
