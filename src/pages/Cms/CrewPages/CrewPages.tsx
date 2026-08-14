import { useState, type FC } from 'react';
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
import { CmsShell, CMS_NAV_IDS } from '../CmsShell';
import {
  CREW_PERMISSIONS,
  DEFAULT_CREW_ROLES,
  DEFAULT_CREW_USERS,
  type CrewPermission,
  type CrewRole,
  type CrewUser,
} from './CrewPages.const';

export const CrewPages: FC = () => {
  const { t } = useI18n();
  const [users, setUsers] = useState<CrewUser[]>(DEFAULT_CREW_USERS);
  const [roles, setRoles] = useState<CrewRole[]>(DEFAULT_CREW_ROLES);
  const [name, setName] = useState(EMPTY_STRING);
  const [email, setEmail] = useState(EMPTY_STRING);
  const [username, setUsername] = useState(EMPTY_STRING);
  const [roleId, setRoleId] = useState('officer');
  const [roleName, setRoleName] = useState(EMPTY_STRING);
  const [roleDescription, setRoleDescription] = useState(EMPTY_STRING);
  const [selectedPermissions, setSelectedPermissions] = useState<CrewPermission[]>([
    'page:read',
    'page:edit',
  ]);

  const togglePermission = (permission: CrewPermission) => {
    setSelectedPermissions((current) =>
      current.includes(permission)
        ? current.filter((item) => item !== permission)
        : [...current, permission],
    );
  };

  const createUser = () => {
    if (!name.trim() || !email.trim() || !username.trim()) return;
    const next: CrewUser = {
      id: `u-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      username: username.trim(),
      roleIds: [roleId],
      active: true,
    };
    setUsers((current) => [next, ...current]);
    setName(EMPTY_STRING);
    setEmail(EMPTY_STRING);
    setUsername(EMPTY_STRING);
  };

  const createRole = () => {
    if (!roleName.trim() || selectedPermissions.length === 0) return;
    const next: CrewRole = {
      id: `role-${Date.now()}`,
      name: roleName.trim(),
      description: roleDescription.trim() || t.cmsCrew.roleCustomHint,
      permissions: selectedPermissions,
      system: false,
    };
    setRoles((current) => [next, ...current]);
    setRoleName(EMPTY_STRING);
    setRoleDescription(EMPTY_STRING);
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
              <Button size="sm" variant="ink" onClick={createUser}>
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
              <Button size="sm" variant="ink" onClick={createRole}>
                {t.cmsCrew.createRole}
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
                    {role.system ? (
                      <Badge variant="neutral" className="text-xs">
                        {t.cmsCrew.systemRole}
                      </Badge>
                    ) : null}
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
