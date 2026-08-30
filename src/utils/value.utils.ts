import { TYPE_NUMBER, TYPE_OBJECT, TYPE_STRING } from '@const/strings.const';

export const isStringValue = (value: unknown): value is string => typeof value === TYPE_STRING;

export const isNumberValue = (value: unknown): value is number => typeof value === TYPE_NUMBER;

export const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === TYPE_OBJECT && value !== null && !Array.isArray(value);
