import { EMPTY_STRING } from '@const/index';
import { isPlainObject, isStringValue } from '@utils';
import type { ContentItem } from '@sdk/modules/content';
import { CONTENT_COLLECTION_TEMPLATES } from '../ContentPages/ContentPages.const';
import { fieldsFromPayload } from '../CastPages/CastPages.utils';
import type { CastField } from '../CastPages/CastPages.types';
import {
  PAYLOAD_KEY_CAST_FIELDS,
  PAYLOAD_KEY_CAST_VALUES,
  PAYLOAD_KEY_LAYOUT,
  PAYLOAD_KEY_TEMPLATE,
} from './ContentEdit.const';

export const castFieldsFromPayload = (
  payload: Record<string, unknown> | undefined,
): CastField[] => {
  if (!payload) return [];
  const named = payload[PAYLOAD_KEY_CAST_FIELDS];
  if (Array.isArray(named)) {
    return fieldsFromPayload({ fields: named });
  }
  return fieldsFromPayload(payload);
};

export const castValuesFromPayload = (
  payload: Record<string, unknown> | undefined,
): Record<string, string> => {
  if (!payload) return {};
  const raw = payload[PAYLOAD_KEY_CAST_VALUES];
  if (!isPlainObject(raw)) return {};
  return Object.entries(raw).reduce<Record<string, string>>((acc, [key, value]) => {
    acc[key] = isStringValue(value) ? value : EMPTY_STRING;
    return acc;
  }, {});
};

export const mergeCastFields = (templateFields: CastField[], pageFields: CastField[]): CastField[] => {
  const seen = new Set<string>();
  const next: CastField[] = [];
  [...templateFields, ...pageFields].forEach((field) => {
    const key = field.name || field.id;
    if (seen.has(key)) return;
    seen.add(key);
    next.push(field);
  });
  return next;
};

export const findLinkedTemplate = (
  items: ContentItem[],
  payload: Record<string, unknown> | undefined,
  currentId?: string,
): ContentItem | undefined => {
  if (!payload) return undefined;
  const templateValue = payload[PAYLOAD_KEY_TEMPLATE];
  const layoutValue = payload[PAYLOAD_KEY_LAYOUT];
  const templateRef = isStringValue(templateValue) ? templateValue : EMPTY_STRING;
  const layoutRef = isStringValue(layoutValue) ? layoutValue : EMPTY_STRING;
  const ref = templateRef || layoutRef;
  if (!ref) return undefined;
  return items.find((item) => {
    if (item.collection !== CONTENT_COLLECTION_TEMPLATES) return false;
    if (currentId && item.id === currentId) return false;
    return item.id === ref || item.slug === ref || item.payload[PAYLOAD_KEY_LAYOUT] === ref;
  });
};

export const pageOwnedCastFields = (
  pageFields: CastField[],
  templateFields: CastField[],
): CastField[] => {
  const locked = new Set(templateFields.map((field) => field.name || field.id));
  return pageFields.filter((field) => !locked.has(field.name || field.id));
};

export const summarizeCastValues = (
  fields: CastField[],
  values: Record<string, string>,
  join: string,
  sep: string,
): string =>
  fields
    .map((field) => {
      const value = values[field.name];
      if (!value) return EMPTY_STRING;
      return `${field.label || field.name}${sep}${value}`;
    })
    .filter(Boolean)
    .join(join);
