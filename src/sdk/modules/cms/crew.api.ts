import { INK_API_URL } from '@const/billing.const';
import { authHeaders } from '../auth/auth.api';
import type { CrewRole, CrewUser } from '../../../pages/Cms/CrewPages/CrewPages.const';

export const CMS_USERS_PATH = '/api/cms/users';
export const CMS_ROLES_PATH = '/api/cms/roles';

type CrewUsersResponse = { users: CrewUser[] };
type CrewRolesResponse = { roles: CrewRole[] };
type CrewUserResponse = { user: CrewUser };
type CrewRoleResponse = { role: CrewRole };

export const fetchCrewUsers = async (token: string): Promise<CrewUser[] | null> => {
  if (!INK_API_URL || !token) return null;
  const response = await fetch(`${INK_API_URL}${CMS_USERS_PATH}`, {
    headers: authHeaders(token),
  });
  if (!response.ok) return null;
  const data = (await response.json()) as CrewUsersResponse;
  return data.users ?? [];
};

export const fetchCrewRoles = async (token: string): Promise<CrewRole[] | null> => {
  if (!INK_API_URL || !token) return null;
  const response = await fetch(`${INK_API_URL}${CMS_ROLES_PATH}`, {
    headers: authHeaders(token),
  });
  if (!response.ok) return null;
  const data = (await response.json()) as CrewRolesResponse;
  return data.roles ?? [];
};

export const createCrewUserRequest = async (
  token: string,
  body: { name: string; email: string; username: string; password: string; roleId: string },
): Promise<CrewUser | null> => {
  if (!INK_API_URL || !token) return null;
  const response = await fetch(`${INK_API_URL}${CMS_USERS_PATH}`, {
    method: 'POST',
    headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) return null;
  const data = (await response.json()) as CrewUserResponse;
  return data.user ?? null;
};

export const createCrewRoleRequest = async (
  token: string,
  body: { name: string; description: string; permissions: string[] },
): Promise<CrewRole | null> => {
  if (!INK_API_URL || !token) return null;
  const response = await fetch(`${INK_API_URL}${CMS_ROLES_PATH}`, {
    method: 'POST',
    headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) return null;
  const data = (await response.json()) as CrewRoleResponse;
  return data.role ?? null;
};

export const updateCrewRoleRequest = async (
  token: string,
  roleId: string,
  body: { name?: string; description?: string; permissions?: string[] },
): Promise<CrewRole | null> => {
  if (!INK_API_URL || !token) return null;
  const response = await fetch(`${INK_API_URL}${CMS_ROLES_PATH}/${roleId}`, {
    method: 'PATCH',
    headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) return null;
  const data = (await response.json()) as CrewRoleResponse;
  return data.role ?? null;
};
