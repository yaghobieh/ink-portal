import {
  EMPTY_STRING,
  HTTP_SERVICE_UNAVAILABLE,
  HTTP_STATUS_MAX,
  HTTP_STATUS_MIN,
  RESPONSE_SNIPPET_MAX,
} from '@const/index';
import {
  NETWORK_ERROR_MESSAGE,
  HEADER_CONTENT_TYPE,
  HEADER_CONTENT_TYPE_LOWER,
} from './useApi.const';
import type { UseApiInit } from './useApi.types';
import type { ApiErrorPayload } from './http.types';
import { reportApiError } from './errorBus';

export const snippet = (value: string): string =>
  value.length > RESPONSE_SNIPPET_MAX ? value.slice(0, RESPONSE_SNIPPET_MAX) : value;

export const reasonFromUnknown = (error: unknown): string =>
  error instanceof Error && error.message ? error.message : NETWORK_ERROR_MESSAGE;

export const requestHeaders = (init?: UseApiInit, data?: unknown): Record<string, string> | undefined => {
  if (!init?.headers) return undefined;
  if (typeof FormData === 'undefined' || !(data instanceof FormData)) return init.headers;
  const headers = { ...init.headers };
  delete headers[HEADER_CONTENT_TYPE];
  delete headers[HEADER_CONTENT_TYPE_LOWER];
  return headers;
};

export const parseRequestData = (init?: UseApiInit): unknown => {
  if (init?.data !== undefined) return init.data;
  if (!init?.body) return undefined;
  if (typeof FormData !== 'undefined' && init.body instanceof FormData) return init.body;
  if (typeof init.body !== 'string') return init.body;
  try {
    return JSON.parse(init.body) as unknown;
  } catch {
    return init.body;
  }
};

export const bodyFromAxiosData = (data: unknown): string => {
  if (data === undefined || data === null) return EMPTY_STRING;
  if (typeof data === 'string') return data;
  try {
    return JSON.stringify(data);
  } catch {
    return EMPTY_STRING;
  }
};

export const emitApiError = (
  payload: ApiErrorPayload,
  onError?: (payload: ApiErrorPayload) => void,
): void => {
  if (onError) {
    onError(payload);
    return;
  }
  reportApiError(payload);
};

export const toFetchResponseStatus = (status: number | undefined): number => {
  if (
    typeof status === 'number' &&
    status >= HTTP_STATUS_MIN &&
    status <= HTTP_STATUS_MAX
  ) {
    return status;
  }
  return HTTP_SERVICE_UNAVAILABLE;
};
