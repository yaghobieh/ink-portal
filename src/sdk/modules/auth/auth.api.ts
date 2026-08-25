import { INK_API_URL } from '@const/billing.const';
import { AUTH_BEARER_PREFIX, AUTH_HEADER_AUTHORIZATION, AUTH_LOGIN_PATH, AUTH_ME_PATH, AUTH_REGISTER_PATH } from '@hooks/auth.const';
import { EMPTY_STRING } from '@const/generals.const';
import type { AuthLoginRequest, AuthLoginResponse, AuthMeResponse, AuthRegisterRequest, AuthUser } from './auth.types';

const CONTENT_TYPE_JSON = 'application/json';

export const loginRequest = async (
  body: AuthLoginRequest,
): Promise<{ token: string; user: AuthUser | null } | null> => {
  if (!INK_API_URL) return null;
  const response = await fetch(`${INK_API_URL}${AUTH_LOGIN_PATH}`, {
    method: 'POST',
    headers: { 'Content-Type': CONTENT_TYPE_JSON },
    body: JSON.stringify(body),
  });
  if (!response.ok) return null;
  const data = (await response.json()) as AuthLoginResponse;
  if (!data.token) return null;
  return { token: data.token, user: data.user ?? null };
};

export const registerRequest = async (
  body: AuthRegisterRequest,
): Promise<{ token: string; user: AuthUser | null } | null> => {
  if (!INK_API_URL) return null;
  const response = await fetch(`${INK_API_URL}${AUTH_REGISTER_PATH}`, {
    method: 'POST',
    headers: { 'Content-Type': CONTENT_TYPE_JSON },
    body: JSON.stringify(body),
  });
  if (!response.ok) return null;
  const data = (await response.json()) as AuthLoginResponse;
  if (!data.token) return null;
  return { token: data.token, user: data.user ?? null };
};

export const fetchMeRequest = async (token: string): Promise<AuthUser | null> => {
  if (!INK_API_URL || !token) return null;
  const response = await fetch(`${INK_API_URL}${AUTH_ME_PATH}`, {
    headers: {
      [AUTH_HEADER_AUTHORIZATION]: `${AUTH_BEARER_PREFIX}${token}`,
    },
  });
  if (!response.ok) return null;
  const data = (await response.json()) as AuthMeResponse;
  return data.user ?? null;
};

export const authHeaders = (token: string): Record<string, string> => ({
  [AUTH_HEADER_AUTHORIZATION]: `${AUTH_BEARER_PREFIX}${token || EMPTY_STRING}`,
});
