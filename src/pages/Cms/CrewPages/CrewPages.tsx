import { useEffect, useState, type FC } from 'react';
import { useNucleus } from '@forgedevstack/synapse';
import {
  Button,
  Card,
  Flex,
  Input,
  Select,
  Typography,
} from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { EMPTY_STRING } from '@const/index';
import { authNucleus } from '@sdk/index';
import {
  createCrewRoleRequest,
  createCrewUserRequest,
  deleteCrewRoleRequest,
  fetchCrewRoles,
  fetchCrewUsers,
  updateCrewRoleRequest,
  updateCrewUserRoleRequest,
} from '@sdk/modules/cms';
import { CmsGridTable, CmsShell, CMS_NAV_IDS } from '../CmsShell';
import {
  CREW_PERMISSIONS,
  DEFAULT_CREW_ROLES,
  type CrewPermission,
  type CrewRole,
  type CrewUser,
} from './CrewPages.const';

export const CrewPages: FC = () => {
  const { t } = useI18n();
  const { token } = useNucleus(authNucleus);
  const [users, setUsers] = useState<CrewUser[]>([]);
  const [roles, setRoles] = useState<CrewRole[]>(DEFAULT_CREW_ROLES);
  const [name, setName] = useState(EMPTY_STRING);
  const [email, setEmail] = useState(EMPTY_STRING);
  const [username, setUsername] = useState(EMPTY_STRING);
  const [password, setPassword] = useState(EMPTY_STRING);
  const [roleId, setRoleId] = useState(EMPTY_STRING);
  const [roleName, setRoleName] = useState(EMPTY_STRING);
  const [roleDescription, setRoleDescription] = useState(EMPTY_STRING);
  const [selectedPermissions, setSelectedPermissions] = useState<CrewPermission[]>([
    'page:read',
    'page:edit',
  ]);
  const [editingRoleId, setEditingRoleId] = useState(EMPTY_STRING);
  const [editingUserId, setEditingUserId] = useState(EMPTY_STRING);
  const [loadError, setLoadError] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadCrew = async () => {
    if (!token) return;
    const [nextUsers, nextRoles] = await Promise.all([
      fetchCrewUsers(token),
      fetchCrewRoles(token),
    ]);
    if (!nextUsers || !nextRoles) {
      setLoadError(true);
      return;
    }
    setLoadError(false);
    setUsers(nextUsers);
    setRoles(nextRoles);
    if (!roleId && nextRoles[0]) setRoleId(nextRoles[0].id);
  };

  useEffect(() => {
    void loadCrew();
  }, [token]);

  const togglePermission = (permission: CrewPermission) => {
    setSelectedPermissions((current) =>
      current.includes(permission)
        ? current.filter((item) => item !== permission)
        : [...current, permission],
    );
  };

  const createUser = async () => {
    if (!token || !name.trim() || !email.trim() || !username.trim() || !password || !roleId) return;
    setSaving(true);
    const next = await createCrewUserRequest(token, {
      name: name.trim(),
      email: email.trim(),
      username: username.trim(),
      password,
      roleId,
    });
    setSaving(false);
    if (!next) {
      setLoadError(true);
      return;
    }
    setUsers((current) => [next, ...current]);
    setName(EMPTY_STRING);
    setEmail(EMPTY_STRING);
    setUsername(EMPTY_STRING);
    setPassword(EMPTY_STRING);
  };

  const createRole = async () => {
    if (!token || !roleName.trim() || selectedPermissions.length === 0) return;
    setSaving(true);
    if (editingRoleId) {
      const updated = await updateCrewRoleRequest(token, editingRoleId, {
        name: roleName.trim(),
        description: roleDescription.trim(),
        permissions: selectedPermissions,
      });
      setSaving(false);
      if (!updated) {
        setLoadError(true);
        return;
      }
      setRoles((current) => current.map((role) => (role.id === updated.id ? updated : role)));
      setEditingRoleId(EMPTY_STRING);
      setRoleName(EMPTY_STRING);
      setRoleDescription(EMPTY_STRING);
      return;
    }
    const next = await createCrewRoleRequest(token, {
      name: roleName.trim(),
      description: roleDescription.trim() || t.cmsCrew.roleCustomHint,
      permissions: selectedPermissions,
    });
    setSaving(false);
    if (!next) {
      setLoadError(true);
      return;
    }
    setRoles((current) => [next, ...current]);
    setRoleName(EMPTY_STRING);
    setRoleDescription(EMPTY_STRING);
  };

  const startEditRole = (role: CrewRole) => {
    setEditingRoleId(role.id);
    setRoleName(role.name);
    setRoleDescription(role.description);
    setSelectedPermissions(role.permissions);
  };

  const cancelEditRole = () => {
    setEditingRoleId(EMPTY_STRING);
    setRoleName(EMPTY_STRING);
    setRoleDescription(EMPTY_STRING);
  };

  const saveUserRole = async (userId: string, nextRoleId: string) => {
    if (!token || !nextRoleId) return;
    setSaving(true);
    const updated = await updateCrewUserRoleRequest(token, userId, nextRoleId);
    setSaving(false);
    if (!updated) {
      setLoadError(true);
      return;
    }
    setUsers((current) => current.map((user) => (user.id === updated.id ? updated : user)));
    setEditingUserId(EMPTY_STRING);
  };

  const removeRole = async (role: CrewRole) => {
    if (!token || role.system) return;
    setSaving(true);
    const ok = await deleteCrewRoleRequest(token, role.id);
    setSaving(false);
    if (!ok) {
      setLoadError(true);
      return;
    }
    setRoles((current) => current.filter((item) => item.id !== role.id));
    if (editingRoleId === role.id) cancelEditRole();
  };

  return (
    <CmsShell activeNavId={CMS_NAV_IDS.CREW}>
      <Flex direction="column" gap={4}>
        <div>
          <Typography variant="h2" className="mb-1">
            {t.cmsCrew.title}
          </Typography>
          <Typography variant="body2" className="ink-cms__muted mb-0">
            {t.cmsCrew.subtitle}
          </Typography>
        </div>
        {loadError ? (
          <Typography variant="body2" className="ink-cms-dashboard__error mb-0">
            {t.cmsCrew.loadError}
          </Typography>
        ) : null}

        <div className="ink-cms-edit__layout">
          <Card className="ink-cms-card">
            <Typography variant="h4" className="mb-3">
              {t.cmsCrew.usersTitle}
            </Typography>
            <Flex direction="column" gap={2} className="mb-4">
              <Input
                id="crew-user-name"
                label={t.cmsCrew.userName}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <Input
                id="crew-user-email"
                label={t.cmsCrew.userEmail}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Input
                id="crew-user-username"
                label={t.cmsCrew.userUsername}
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <Input
                id="crew-user-password"
                type="password"
                label={t.cmsCrew.userPassword}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
              />
              <Select
                id="crew-user-role"
                label={t.cmsCrew.userRole}
                options={roles.map((role) => ({ value: role.id, label: role.name }))}
                value={roleId}
                onChange={(value) => setRoleId(value)}
                fullWidth
              />
              <Button size="sm" variant="ink" onClick={() => void createUser()} disabled={saving}>
                {t.cmsCrew.createUser}
              </Button>
            </Flex>
            <CmsGridTable
              data={users.map((user) => ({
                id: user.id,
                name: user.name,
                email: user.email,
                username: user.username,
                roles: user.roleIds
                  .map((id) => roles.find((role) => role.id === id)?.name || id)
                  .join(', '),
              }))}
              columns={[
                { id: 'name', accessor: 'name', header: t.cmsCrew.userName, sortable: true },
                { id: 'username', accessor: 'username', header: t.cmsCrew.userUsername, sortable: true },
                { id: 'email', accessor: 'email', header: t.cmsCrew.userEmail, sortable: true },
                { id: 'roles', accessor: 'roles', header: t.cmsCrew.userRole },
                {
                  id: 'edit',
                  accessor: 'id',
                  header: t.cmsCrew.editRole,
                  render: (_value, row) =>
                    editingUserId === row.id ? (
                      <Select
                        options={roles.map((role) => ({ value: role.id, label: role.name }))}
                        value={
                          users.find((user) => user.id === row.id)?.roleIds[0] || roleId
                        }
                        onChange={(value) => void saveUserRole(String(row.id), value)}
                      />
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingUserId(String(row.id))}
                      >
                        {t.cmsCrew.editRole}
                      </Button>
                    ),
                },
              ]}
            />
          </Card>

          <Card className="ink-cms-card">
            <Typography variant="h4" className="mb-3">
              {t.cmsCrew.rolesTitle}
            </Typography>
            <Flex direction="column" gap={2} className="mb-4">
              <Input
                id="crew-role-name"
                label={t.cmsCrew.roleName}
                value={roleName}
                onChange={(event) => setRoleName(event.target.value)}
              />
              <Input
                id="crew-role-description"
                label={t.cmsCrew.roleDescription}
                value={roleDescription}
                onChange={(event) => setRoleDescription(event.target.value)}
              />
              <Typography variant="caption" className="ink-cms__muted mb-0">
                {t.cmsCrew.permissions}
              </Typography>
              <Flex gap={1} className="flex-wrap">
                {CREW_PERMISSIONS.map((permission) => {
                  const active = selectedPermissions.includes(permission);
                  return (
                    <Button
                      key={permission}
                      size="sm"
                      variant={active ? 'ink' : 'outline'}
                      onClick={() => togglePermission(permission)}
                    >
                      {permission}
                    </Button>
                  );
                })}
              </Flex>
              <Flex gap={2}>
                <Button size="sm" variant="ink" onClick={() => void createRole()} disabled={saving}>
                  {editingRoleId ? t.cmsCrew.saveRole : t.cmsCrew.createRole}
                </Button>
                {editingRoleId ? (
                  <Button size="sm" variant="outline" onClick={cancelEditRole} disabled={saving}>
                    {t.cmsCrew.cancelRole}
                  </Button>
                ) : null}
              </Flex>
            </Flex>
            <CmsGridTable
              data={roles.map((role) => ({
                id: role.id,
                name: role.name,
                description: role.description,
                permissions: String(role.permissions.length),
                system: role.system ? t.cmsCrew.systemRole : EMPTY_STRING,
              }))}
              columns={[
                { id: 'name', accessor: 'name', header: t.cmsCrew.roleName, sortable: true },
                { id: 'description', accessor: 'description', header: t.cmsCrew.roleDescription },
                { id: 'permissions', accessor: 'permissions', header: t.cmsCrew.permissions },
                { id: 'system', accessor: 'system', header: t.cmsCrew.systemRole },
                {
                  id: 'actions',
                  accessor: 'id',
                  header: t.cmsCrew.editRole,
                  render: (_value, row) => {
                    const role = roles.find((item) => item.id === row.id);
                    if (!role) return null;
                    return (
                      <Flex gap={1}>
                        <Button
                          size="sm"
                          variant={editingRoleId === role.id ? 'ink' : 'outline'}
                          onClick={() => startEditRole(role)}
                        >
                          {t.cmsCrew.editRole}
                        </Button>
                        {role.system ? null : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => void removeRole(role)}
                            disabled={saving}
                          >
                            {t.cmsCrew.deleteRole}
                          </Button>
                        )}
                      </Flex>
                    );
                  },
                },
              ]}
            />
          </Card>
        </div>
      </Flex>
    </CmsShell>
  );
};
