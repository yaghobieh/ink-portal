import { CAST_FIELD_TYPE, CAST_NONE, CAST_SLUG_EDGE, CAST_SLUG_REPLACE } from './CastPages.const';
import type { CastField, CastFieldType, CastGroupPayload } from './CastPages.types';

const createFieldId = (): string => `f-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const createCastField = (): CastField => ({
  id: createFieldId(),
  name: CAST_NONE,
  label: CAST_NONE,
  type: CAST_FIELD_TYPE.TEXT,
  required: false,
  emailFormat: true,
  min: CAST_NONE,
  max: CAST_NONE,
});

export const slugFromLabel = (label: string): string =>
  label.trim().toLowerCase().replace(CAST_SLUG_REPLACE, '_').replace(CAST_SLUG_EDGE, '');

export const fieldsFromPayload = (payload: Record<string, unknown> | undefined): CastField[] => {
  if (!payload) return [];
  const fields = payload.fields;
  if (!Array.isArray(fields)) return [];
  return fields.filter((item): item is CastField => {
    if (!item || typeof item !== 'object') return false;
    const field = item as CastField;
    return typeof field.id === 'string' && typeof field.name === 'string';
  }).map((field) => ({
    ...createCastField(),
    ...field,
    required: Boolean(field.required),
    emailFormat: field.emailFormat !== false,
    min: field.min ?? CAST_NONE,
    max: field.max ?? CAST_NONE,
  }));
};

export const withCastPayload = (fields: CastField[]): CastGroupPayload => ({ fields });

export const isCastFieldType = (value: string): value is CastFieldType =>
  value === CAST_FIELD_TYPE.TEXT ||
  value === CAST_FIELD_TYPE.TEXTAREA ||
  value === CAST_FIELD_TYPE.NUMBER ||
  value === CAST_FIELD_TYPE.EMAIL ||
  value === CAST_FIELD_TYPE.IMAGE ||
  value === CAST_FIELD_TYPE.RICH;
