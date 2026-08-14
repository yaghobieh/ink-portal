import { reportApiError } from './errorBus';
import type { RequestWithErrorOptions } from './http.types';

const DEFAULT_ERROR_MESSAGE = 'Request failed';

export const requestWithError = async (
  input: RequestInfo | URL,
  init?: RequestInit,
  options?: RequestWithErrorOptions,
): Promise<Response> => {
  const response = await fetch(input, init);
  if (!response.ok) {
    const payload = {
      mode: options?.mode ?? ('toast' as const),
      message: options?.message || `${DEFAULT_ERROR_MESSAGE} (${response.status})`,
    };
    if (options?.onError) {
      options.onError(payload);
    } else {
      reportApiError(payload);
    }
  }
  return response;
};
