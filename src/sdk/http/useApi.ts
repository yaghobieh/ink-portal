import axios, { AxiosError } from 'axios';
import {
  EMPTY_STRING,
  HTTP_METHOD_GET,
  HTTP_NETWORK_STATUS,
  HTTP_UNAUTHORIZED,
} from '@const/index';
import { resolveApiErrorMode } from './errorMode';
import { beginApiLoading, endApiLoading } from './loadingBus';
import type { ApiErrorPayload, UseApiOptions } from './http.types';
import type { UseApiInit } from './useApi.types';
import {
  API_ERROR_MODE_PAGE,
  DEFAULT_ERROR_MESSAGE,
  NETWORK_ERROR_MESSAGE,
} from './useApi.const';
import {
  bodyFromAxiosData,
  emitApiError,
  parseRequestData,
  reasonFromUnknown,
  requestHeaders,
  snippet,
  toFetchResponseStatus,
} from './useApi.utils';

export const useApi = async (
  url: string,
  init?: UseApiInit,
  options?: UseApiOptions,
): Promise<Response> => {
  if (!options?.silent) {
    beginApiLoading();
  }
  try {
    const data = parseRequestData(init);
    const result = await axios.request({
      url,
      method: init?.method ?? HTTP_METHOD_GET,
      headers: requestHeaders(init, data),
      data,
      validateStatus: () => true,
    });
    const body = bodyFromAxiosData(result.data);
    if (result.status < 200 || result.status >= 300) {
      const unauthorized = result.status === HTTP_UNAUTHORIZED;
      const payload: ApiErrorPayload = {
        mode: unauthorized && !options?.silent ? API_ERROR_MODE_PAGE : resolveApiErrorMode(options?.mode),
        message: options?.message || `${DEFAULT_ERROR_MESSAGE} (${result.status})`,
        code: options?.code,
        href: options?.href,
        url,
        status: result.status,
        reason: result.statusText || DEFAULT_ERROR_MESSAGE,
        response: snippet(body),
      };
      emitApiError(payload, options?.onError);
    }
    return new Response(body, {
      status: toFetchResponseStatus(result.status),
      statusText: result.statusText,
    });
  } catch (error: unknown) {
    const axiosError = error instanceof AxiosError ? error : null;
    const reason = reasonFromUnknown(error);
    const payload: ApiErrorPayload = {
      mode: resolveApiErrorMode(options?.mode),
      message: options?.message || NETWORK_ERROR_MESSAGE,
      code: options?.code,
      href: options?.href,
      url,
      status: axiosError?.response?.status ?? HTTP_NETWORK_STATUS,
      reason,
      response: snippet(bodyFromAxiosData(axiosError?.response?.data) || EMPTY_STRING),
    };
    emitApiError(payload, options?.onError);
    return new Response(null, {
      status: toFetchResponseStatus(payload.status),
      statusText: reason,
    });
  } finally {
    if (!options?.silent) {
      endApiLoading();
    }
  }
};
