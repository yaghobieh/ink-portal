import { useEffect, useState, type FC } from 'react';
import { useNucleus } from '@forgedevstack/synapse';
import {
  Badge,
  Button,
  Card,
  Flex,
  Input,
  Typography,
} from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { EMPTY_STRING } from '@const/index';
import { authNucleus } from '@sdk/index';
import {
  createCrewRoleRequest,
  createCrewUserRequest,
  fetchCrewRoles,
  fetchCrewUsers,
  updateCrewRoleRequest,
} from '@sdk/modules/cms';
import { CmsShell, CMS_NAV_IDS } from '../CmsShell';
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
              <label className="ink-cms__muted text-sm" htmlFor="crew-user-role">
                {t.cmsCrew.userRole}
              </label>
              <select
                id="crew-user-role"
                className="ink-cms-select"
                value={roleId}
                onChange={(event) => setRoleId(event.target.value)}
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
              <Button size="sm" variant="ink" onClick={() => void createUser()} disabled={saving}>
                {t.cmsCrew.createUser}
              </Button>
            </Flex>
            <Flex direction="column" gap={2}>
              {users.map((user) => (
                <Card key={user.id} className="ink-cms-card ink-cms-card--nested">
                  <Flex justify="between" align="center" className="gap-2 flex-wrap">
                    <div>
                      <Typography variant="body2" className="mb-0 font-medium">
                        {user.name}
                      </Typography>
                      <Typography variant="caption" className="ink-cms__muted mb-0">
                        {user.username} · {user.email}
                      </Typography>
                    </div>
                    <Flex gap={1} className="flex-wrap">
                      {user.roleIds.map((id) => (
                        <Badge key={id} variant="info" className="text-xs">
                          {roles.find((role) => role.id === id)?.name || id}
                        </Badge>
                      ))}
                    </Flex>
                  </Flex>
                </Card>
              ))}
            </Flex>
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
              <Button size="sm" variant="ink" onClick={() => void createRole()} disabled={saving}>
                {editingRoleId ? t.cmsCrew.saveRole : t.cmsCrew.createRole}
              </Button>
            </Flex>
            <Flex direction="column" gap={2}>
              {roles.map((role) => (
                <Card key={role.id} className="ink-cms-card ink-cms-card--nested">
                  <Flex justify="between" align="start" className="gap-2">
                    <div>
                      <Typography variant="body2" className="mb-0 font-medium">
                        {role.name}
                      </Typography>
                      <Typography variant="caption" className="ink-cms__muted mb-2 block">
                        {role.description}
                      </Typography>
                      <Typography variant="caption" className="mb-0">
                        {role.permissions.length} {t.cmsCrew.permissionsCount}
                      </Typography>
                    </div>
                    <Flex gap={1} className="flex-wrap">
                      {role.system ? (
                        <Badge variant="neutral" className="text-xs">
                          {t.cmsCrew.systemRole}
                        </Badge>
                      ) : null}
                      <Button size="sm" variant="outline" onClick={() => startEditRole(role)}>
                        {t.cmsCrew.editRole}
                      </Button>
                    </Flex>
                  </Flex>
                </Card>
              ))}
            </Flex>
          </Card>
        </div>
      </Flex>
    </CmsShell>
  );
};
