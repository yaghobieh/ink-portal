import { INK_API_URL } from '@const/billing.const';
import { HTTP_METHOD_POST } from '@const/http.const';
import { ROUTES } from '@const/index';
import { CONTENT_TYPE_JSON } from '@const/strings.const';
import { EMPTY_STRING } from '@const/generals.const';
import {
  AUTH_BEARER_PREFIX,
  AUTH_HEADER_AUTHORIZATION,
  AUTH_LOGIN_PATH,
  AUTH_ME_PATH,
  AUTH_PASSWORD_CHANGE_PATH,
  AUTH_PASSWORD_OTP_PATH,
  AUTH_REGISTER_PATH,
} from '@hooks/auth.const';
import { HTTP_UNAUTHORIZED, useApi } from '@sdk/http';
import { DEFAULT_ERROR_MESSAGE } from '@sdk/http/useApi.const';
import type {
  AuthLoginRequest,
  AuthLoginResponse,
  AuthMeResponse,
  AuthPasswordChangeRequest,
  AuthPasswordOtpRequest,
  AuthPasswordOtpResponse,
  AuthRegisterRequest,
  AuthUser,
  FetchMeResult,
} from './auth.types';

let inflightMe: { token: string; promise: Promise<FetchMeResult> } | null = null;

export const loginRequest = async (
  body: AuthLoginRequest,
): Promise<{ token: string; user: AuthUser | null } | null> => {
  const response = await useApi(
    `${INK_API_URL}${AUTH_LOGIN_PATH}`,
    {
      method: HTTP_METHOD_POST,
      headers: { 'Content-Type': CONTENT_TYPE_JSON },
      body: JSON.stringify(body),
    },
    { silent: true, onError: () => undefined },
  );
  if (!response.ok) return null;
  const data = (await response.json()) as AuthLoginResponse;
  if (!data.token) return null;
  return { token: data.token, user: data.user ?? null };
};

export const registerRequest = async (
  body: AuthRegisterRequest,
): Promise<{ token: string; user: AuthUser | null } | null> => {
  const response = await useApi(
    `${INK_API_URL}${AUTH_REGISTER_PATH}`,
    {
      method: HTTP_METHOD_POST,
      headers: { 'Content-Type': CONTENT_TYPE_JSON },
      body: JSON.stringify(body),
    },
    { silent: true, onError: () => undefined },
  );
  if (!response.ok) return null;
  const data = (await response.json()) as AuthLoginResponse;
  if (!data.token) return null;
  return { token: data.token, user: data.user ?? null };
};

const loadCurrentUser = async (token: string): Promise<FetchMeResult> => {
  const url = `${INK_API_URL}${AUTH_ME_PATH}`;
  const response = await useApi(
    url,
    {
      headers: {
        [AUTH_HEADER_AUTHORIZATION]: `${AUTH_BEARER_PREFIX}${token}`,
      },
    },
    {
      silent: true,
      onError: () => undefined,
      code: 'current-user',
      message: 'Could not load the current user.',
      href: ROUTES.CMS_LOGIN,
    },
  );
  if (response.status === HTTP_UNAUTHORIZED) {
    return { user: null, unauthorized: true, error: null };
  }
  if (!response.ok) {
    const body = await response.text().catch(() => EMPTY_STRING);
    return {
      user: null,
      unauthorized: false,
      error: {
        url,
        status: response.status,
        reason: response.statusText || DEFAULT_ERROR_MESSAGE,
        response: body,
      },
    };
  }
  const data = (await response.json()) as AuthMeResponse;
  if (!data.user) {
    return { user: null, unauthorized: true, error: null };
  }
  return { user: data.user, unauthorized: false, error: null };
};

export const fetchMeRequest = async (token: string): Promise<FetchMeResult> => {
  if (!token) {
    return { user: null, unauthorized: true, error: null };
  }
  if (inflightMe && inflightMe.token === token) {
    return inflightMe.promise;
  }
  const promise = loadCurrentUser(token).finally(() => {
    if (inflightMe?.promise === promise) {
      inflightMe = null;
    }
  });
  inflightMe = { token, promise };
  return promise;
};

export const authHeaders = (token: string): Record<string, string> => ({
  [AUTH_HEADER_AUTHORIZATION]: `${AUTH_BEARER_PREFIX}${token || EMPTY_STRING}`,
});

export const requestPasswordOtpRequest = async (
  token: string,
  body: AuthPasswordOtpRequest,
): Promise<AuthPasswordOtpResponse | null> => {
  if (!token) return null;
  const response = await useApi(
    `${INK_API_URL}${AUTH_PASSWORD_OTP_PATH}`,
    {
      method: HTTP_METHOD_POST,
      headers: { ...authHeaders(token), 'Content-Type': CONTENT_TYPE_JSON },
      body: JSON.stringify(body),
    },
    { silent: true, onError: () => undefined },
  );
  if (!response.ok) return null;
  return (await response.json()) as AuthPasswordOtpResponse;
};

export const confirmPasswordChangeRequest = async (
  token: string,
  body: AuthPasswordChangeRequest,
): Promise<boolean> => {
  if (!token) return false;
  const response = await useApi(
    `${INK_API_URL}${AUTH_PASSWORD_CHANGE_PATH}`,
    {
      method: HTTP_METHOD_POST,
      headers: { ...authHeaders(token), 'Content-Type': CONTENT_TYPE_JSON },
      body: JSON.stringify(body),
    },
    { silent: true, onError: () => undefined },
  );
  return response.ok;
};
