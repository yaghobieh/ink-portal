import { EMPTY_STRING } from '@const/index';
import type { Messages } from '@i18n/types';
import {
  HTTP_UNAUTHORIZED,
  pushClientAlert,
  setApiErrorHandler,
  setApiLoadingHandler,
} from '@sdk/http';
import type { ApiErrorPayload } from '@sdk/http';
import { ERROR_COPY_KEYS, ERROR_MODE_MODAL, ERROR_MODE_PAGE } from './ErrorHost.const';
import type { ErrorCopy } from './ErrorHost.types';

export const resolveErrorCopy = (
  payload: ApiErrorPayload,
  fallback: string,
  errors: Messages['cmsErrors'],
): ErrorCopy => {
  if (payload.status === HTTP_UNAUTHORIZED) {
    return { title: errors.unauthorizedTitle, body: errors.unauthorizedBody };
  }
  if (payload.code) {
    const keys = ERROR_COPY_KEYS[payload.code];
    if (keys) {
      return { title: errors[keys.title], body: errors[keys.body] };
    }
  }
  return { title: errors.snackbarTitle, body: fallback };
};

export const bindApiHost = (options: {
  delay: number;
  errors: Messages['cmsErrors'];
  onPage: (payload: ApiErrorPayload) => void;
  onModal: (body: string) => void;
  onSnackbar: (copy: ErrorCopy) => void;
  onLoading: (visible: boolean) => void;
}): (() => void) => {
  const { delay, errors, onPage, onModal, onSnackbar, onLoading } = options;
  let timer = 0;
  setApiErrorHandler((payload: ApiErrorPayload) => {
    const copy = resolveErrorCopy(payload, payload.message, errors);
    pushClientAlert({
      code: payload.code,
      title: copy.title,
      body: copy.body,
      href: payload.href || EMPTY_STRING,
    });
    if (payload.mode === ERROR_MODE_PAGE) {
      onPage(payload);
      onLoading(false);
      return;
    }
    if (payload.mode === ERROR_MODE_MODAL) {
      onModal(copy.body);
      return;
    }
    onSnackbar(copy);
  });
  setApiLoadingHandler((count) => {
    window.clearTimeout(timer);
    if (count > 0) {
      timer = window.setTimeout(() => onLoading(true), delay);
      return;
    }
    onLoading(false);
  });
  return () => {
    window.clearTimeout(timer);
    setApiErrorHandler(null);
    setApiLoadingHandler(null);
  };
};
