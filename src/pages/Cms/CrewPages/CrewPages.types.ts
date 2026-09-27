import type { CREW_PERMISSIONS } from './CrewPages.const';

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
