import type { ReactNode } from 'react';

export type CmsShellProps = {
  children: ReactNode;
  activeNavId: string;
};

export type CmsSidebarNavItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  children?: CmsSidebarNavItem[];
  badge?: ReactNode;
  disabled?: boolean;
};

export type CmsModePreference = 'light' | 'dark' | 'system';

export type FlattenSidebarGroupsParams = {
  groups: CmsSidebarNavItem[];
  collapsed: boolean;
};
