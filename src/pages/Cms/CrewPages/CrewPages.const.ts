export const CREW_PERMISSIONS = [
  'page:read',
  'page:create',
  'page:edit',
  'page:delete',
  'page:publish',
  'page:live-edit',
  'media:read',
  'media:upload',
  'user:read',
  'user:create',
  'role:read',
  'role:create',
  'extension:read',
  'extension:install',
  'settings:read',
  'settings:edit',
  'task:edit',
  'task:status',
  'task:fields',
] as const;

export type CrewPermission = (typeof CREW_PERMISSIONS)[number];

export type CrewRole = {
  id: string;
  name: string;
  description: string;
  permissions: CrewPermission[];
  system: boolean;
};

export type CrewUser = {
  id: string;
  name: string;
  email: string;
  username: string;
  roleIds: string[];
  active: boolean;
};

export const DEFAULT_CREW_ROLES: CrewRole[] = [
  {
    id: 'captain',
    name: 'Captain',
    description: 'Full CMS control — users, roles, publish, live edit.',
    permissions: [...CREW_PERMISSIONS],
    system: true,
  },
  {
    id: 'officer',
    name: 'Officer',
    description: 'Edit and publish content; no role administration.',
    permissions: [
      'page:read',
      'page:create',
      'page:edit',
      'page:publish',
      'page:live-edit',
      'media:read',
      'media:upload',
      'extension:read',
      'settings:read',
      'task:edit',
      'task:status',
      'task:fields',
    ],
    system: true,
  },
  {
    id: 'crew',
    name: 'Crew',
    description: 'Draft and edit; cannot publish or manage users.',
    permissions: ['page:read', 'page:create', 'page:edit', 'media:read', 'media:upload', 'task:edit'],
    system: true,
  },
  {
    id: 'guest',
    name: 'Guest',
    description: 'Read-only published content.',
    permissions: ['page:read', 'media:read'],
    system: true,
  },
];

export const DEFAULT_CREW_USERS: CrewUser[] = [
  {
    id: 'u-captain',
    name: 'John Yaghobieh',
    email: 'captain@inkforgejs.com',
    username: 'yaghobieh',
    roleIds: ['captain'],
    active: true,
  },
];
