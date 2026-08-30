import { INK_API_URL } from '@const/billing.const';
import { HTTP_METHOD_DELETE, HTTP_METHOD_PATCH, HTTP_METHOD_POST } from '@const/http.const';
import { CONTENT_TYPE_JSON } from '@const/strings.const';
import { useApi } from '@sdk/http';
import { authHeaders } from '../auth/auth.api';
import type { CrewRole, CrewUser } from '../../../pages/Cms/CrewPages/CrewPages.const';
import {
  CMS_ROLE_CREATE_PATH,
  CMS_ROLE_DELETE_PATH,
  CMS_ROLE_UPDATE_PATH,
  CMS_ROLES_PATH,
  CMS_USER_CREATE_PATH,
  CMS_USER_ROLE_PATH,
  CMS_USERS_PATH,
} from './cms.const';

type CrewUsersResponse = { users: CrewUser[] };
type CrewRolesResponse = { roles: CrewRole[] };
type CrewUserResponse = { user: CrewUser };
type CrewRoleResponse = { role: CrewRole };

const CREW_ERROR = { code: 'crew' as const, message: 'Could not load crew from the API.' };

export const fetchCrewUsers = async (token: string): Promise<CrewUser[] | null> => {
  if (!token) return null;
  const response = await useApi(
    `${INK_API_URL}${CMS_USERS_PATH}`,
    { headers: authHeaders(token) },
    CREW_ERROR,
  );
  if (!response.ok) return null;
  const data = (await response.json()) as CrewUsersResponse;
  return data.users ?? [];
};

export const fetchCrewRoles = async (token: string): Promise<CrewRole[] | null> => {
  if (!token) return null;
  const response = await useApi(
    `${INK_API_URL}${CMS_ROLES_PATH}`,
    { headers: authHeaders(token) },
    CREW_ERROR,
  );
  if (!response.ok) return null;
  const data = (await response.json()) as CrewRolesResponse;
  return data.roles ?? [];
};

export const createCrewUserRequest = async (
  token: string,
  body: { name: string; email: string; username: string; password: string; roleId: string },
): Promise<CrewUser | null> => {
  if (!token) return null;
  const response = await useApi(
    `${INK_API_URL}${CMS_USER_CREATE_PATH}`,
    {
      method: HTTP_METHOD_POST,
      headers: { ...authHeaders(token), 'Content-Type': CONTENT_TYPE_JSON },
      body: JSON.stringify(body),
    },
    CREW_ERROR,
  );
  if (!response.ok) return null;
  const data = (await response.json()) as CrewUserResponse;
  return data.user ?? null;
};

export const createCrewRoleRequest = async (
  token: string,
  body: { name: string; description: string; permissions: string[] },
): Promise<CrewRole | null> => {
  if (!token) return null;
  const response = await useApi(
    `${INK_API_URL}${CMS_ROLE_CREATE_PATH}`,
    {
      method: HTTP_METHOD_POST,
      headers: { ...authHeaders(token), 'Content-Type': CONTENT_TYPE_JSON },
      body: JSON.stringify(body),
    },
    CREW_ERROR,
  );
  if (!response.ok) return null;
  const data = (await response.json()) as CrewRoleResponse;
  return data.role ?? null;
};

export const updateCrewRoleRequest = async (
  token: string,
  roleId: string,
  body: { name?: string; description?: string; permissions?: string[] },
): Promise<CrewRole | null> => {
  if (!token) return null;
  const response = await useApi(
    `${INK_API_URL}${CMS_ROLE_UPDATE_PATH}/${roleId}`,
    {
      method: HTTP_METHOD_PATCH,
      headers: { ...authHeaders(token), 'Content-Type': CONTENT_TYPE_JSON },
      body: JSON.stringify(body),
    },
    CREW_ERROR,
  );
  if (!response.ok) return null;
  const data = (await response.json()) as CrewRoleResponse;
  return data.role ?? null;
};

export const deleteCrewRoleRequest = async (token: string, roleId: string): Promise<boolean> => {
  if (!token) return false;
  const response = await useApi(
    `${INK_API_URL}${CMS_ROLE_DELETE_PATH}/${roleId}`,
    { method: HTTP_METHOD_DELETE, headers: authHeaders(token) },
    CREW_ERROR,
  );
  return response.ok;
};

export const updateCrewUserRoleRequest = async (
  token: string,
  userId: string,
  roleId: string,
): Promise<CrewUser | null> => {
  if (!token) return null;
  const response = await useApi(
    `${INK_API_URL}${CMS_USER_ROLE_PATH}/${userId}`,
    {
      method: HTTP_METHOD_PATCH,
      headers: { ...authHeaders(token), 'Content-Type': CONTENT_TYPE_JSON },
      body: JSON.stringify({ roleId }),
    },
    CREW_ERROR,
  );
  if (!response.ok) return null;
  const data = (await response.json()) as CrewUserResponse;
  return data.user ?? null;
};
