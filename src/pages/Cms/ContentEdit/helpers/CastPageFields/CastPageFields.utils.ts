import type { Messages } from '@i18n/types';
import {
  CAST_FIELD_TYPE_LABEL_KEY,
  CAST_FIELD_TYPE_VALUES,
} from './CastPageFields.const';
import type { CastTypeOption } from './CastPageFields.types';

export const castTypeOptions = (castCopy: Messages['cmsCast']): CastTypeOption[] =>
  CAST_FIELD_TYPE_VALUES.map((value) => ({
    value,
    label: castCopy[CAST_FIELD_TYPE_LABEL_KEY[value]],
  }));
