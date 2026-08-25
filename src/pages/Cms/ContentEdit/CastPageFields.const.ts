import { CAST_FIELD_TYPE } from '../CastPages/CastPages.const';

export const CAST_PAGE_VALUE_PREFIX = 'cast-value-';

export const CAST_VALUE_INPUT_TYPE = {
  [CAST_FIELD_TYPE.TEXT]: 'text',
  [CAST_FIELD_TYPE.TEXTAREA]: 'text',
  [CAST_FIELD_TYPE.NUMBER]: 'number',
  [CAST_FIELD_TYPE.EMAIL]: 'email',
  [CAST_FIELD_TYPE.IMAGE]: 'url',
  [CAST_FIELD_TYPE.RICH]: 'text',
} as const;

export const CAST_VALUE_SUMMARY_JOIN = ' · ';
export const CAST_VALUE_SUMMARY_SEP = ': ';
