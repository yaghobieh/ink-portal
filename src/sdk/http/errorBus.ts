import type { ApiErrorPayload } from './http.types';

type ApiErrorListener = (payload: ApiErrorPayload) => void;

let listener: ApiErrorListener | null = null;
let pending: ApiErrorPayload[] = [];

export const setApiErrorHandler = (next: ApiErrorListener | null): void => {
  listener = next;
  if (!listener || pending.length === 0) return;
  const queued = pending;
  pending = [];
  queued.forEach((payload) => listener?.(payload));
};

export const reportApiError = (payload: ApiErrorPayload): void => {
  if (listener) {
    listener(payload);
    return;
  }
  pending = [...pending, payload];
};
