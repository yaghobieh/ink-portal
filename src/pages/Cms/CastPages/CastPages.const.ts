import { EMPTY_STRING } from '@const/strings.const';
import type { CastFieldType } from './CastPages.types';

export const CAST_COLLECTION = 'cast';
export const CAST_SLUG_PREFIX = 'cast-';
export const CAST_FIELD_EMPTY = EMPTY_STRING;
export const CAST_NONE = EMPTY_STRING;
export const CAST_TITLE_FIELD = 'title';
export const CAST_NAME_PREFIX = 'name-';
export const CAST_LABEL_PREFIX = 'label-';
export const CAST_TYPE_PREFIX = 'type-';
export const CAST_TITLE_MIN_LENGTH = 2;
export const CAST_NAME_MIN_LENGTH = 2;
export const CAST_NAME_PATTERN = /^[a-zA-Z][a-zA-Z0-9_]*$/;

export const CAST_FIELD_TYPE = {
  TEXT: 'text',
  TEXTAREA: 'textarea',
  NUMBER: 'number',
  EMAIL: 'email',
  IMAGE: 'image',
  RICH: 'rich',
} as const satisfies Record<string, CastFieldType>;

export const CAST_SLUG_REPLACE = /[^a-z0-9]+/g;
export const CAST_SLUG_EDGE = /^_|_$/g;

export const CAST_FIELD_TYPE_OPTIONS: readonly { value: CastFieldType; labelKey: CastFieldType }[] = [
  { value: CAST_FIELD_TYPE.TEXT, labelKey: CAST_FIELD_TYPE.TEXT },
  { value: CAST_FIELD_TYPE.TEXTAREA, labelKey: CAST_FIELD_TYPE.TEXTAREA },
  { value: CAST_FIELD_TYPE.NUMBER, labelKey: CAST_FIELD_TYPE.NUMBER },
  { value: CAST_FIELD_TYPE.EMAIL, labelKey: CAST_FIELD_TYPE.EMAIL },
  { value: CAST_FIELD_TYPE.IMAGE, labelKey: CAST_FIELD_TYPE.IMAGE },
  { value: CAST_FIELD_TYPE.RICH, labelKey: CAST_FIELD_TYPE.RICH },
];
