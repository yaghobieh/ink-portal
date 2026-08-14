import type { ApiErrorPayload } from './http.types';

type ApiErrorListener = (payload: ApiErrorPayload) => void;

let listener: ApiErrorListener | null = null;

export const setApiErrorHandler = (next: ApiErrorListener | null): void => {
  listener = next;
};

export const reportApiError = (payload: ApiErrorPayload): void => {
  listener?.(payload);
};
