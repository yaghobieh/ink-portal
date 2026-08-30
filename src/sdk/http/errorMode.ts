import type { ApiErrorMode } from './http.types';

const API_ERROR_MODE_SNACKBAR: ApiErrorMode = 'snackbar';

let defaultMode: ApiErrorMode = API_ERROR_MODE_SNACKBAR;

export const setDefaultApiErrorMode = (mode: ApiErrorMode): void => {
  defaultMode = mode === 'toast' ? API_ERROR_MODE_SNACKBAR : mode;
};

export const getDefaultApiErrorMode = (): ApiErrorMode => defaultMode;

export const resolveApiErrorMode = (mode?: ApiErrorMode): ApiErrorMode => {
  const next = mode ?? defaultMode;
  return next === 'toast' ? API_ERROR_MODE_SNACKBAR : next;
};
