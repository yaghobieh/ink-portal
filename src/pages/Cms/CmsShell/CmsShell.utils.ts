import {
  CMS_FALSE,
  CMS_MODE_DARK,
  CMS_MODE_LIGHT,
  CMS_MODE_STORAGE_KEY,
  CMS_MODE_SYSTEM,
  CMS_SIDEBAR_COLLAPSED_KEY,
  CMS_SIDEBAR_WIDTH_KEY,
  CMS_TRUE,
} from '@const/strings.const';
import {
  CMS_AVATAR_PALETTE,
  CMS_SIDEBAR_MAX_WIDTH_PX,
  CMS_SIDEBAR_MIN_WIDTH_PX,
  CMS_SIDEBAR_WIDTH_PX,
  POINTER_EVENT_MOVE,
  POINTER_EVENT_UP,
} from './CmsShell.const';
import type {
  CmsModePreference,
  CmsSidebarNavItem,
  FlattenSidebarGroupsParams,
} from './CmsShell.types';

const COLOR_SCHEME_DARK = '(prefers-color-scheme: dark)';

export const loadSidebarCollapsed = (): boolean => {
  try {
    return localStorage.getItem(CMS_SIDEBAR_COLLAPSED_KEY) === CMS_TRUE;
  } catch {
    return false;
  }
};

export const saveSidebarCollapsed = (collapsed: boolean): void => {
  localStorage.setItem(CMS_SIDEBAR_COLLAPSED_KEY, collapsed ? CMS_TRUE : CMS_FALSE);
};

export const loadSidebarWidth = (): number => {
  try {
    const raw = localStorage.getItem(CMS_SIDEBAR_WIDTH_KEY);
    if (!raw) return CMS_SIDEBAR_WIDTH_PX;
    const parsed = Number(raw);
    if (!Number.isFinite(parsed)) return CMS_SIDEBAR_WIDTH_PX;
    return Math.min(CMS_SIDEBAR_MAX_WIDTH_PX, Math.max(CMS_SIDEBAR_MIN_WIDTH_PX, parsed));
  } catch {
    return CMS_SIDEBAR_WIDTH_PX;
  }
};

export const saveSidebarWidth = (width: number): void => {
  localStorage.setItem(CMS_SIDEBAR_WIDTH_KEY, String(width));
};

export const clampSidebarWidth = (width: number): number =>
  Math.min(CMS_SIDEBAR_MAX_WIDTH_PX, Math.max(CMS_SIDEBAR_MIN_WIDTH_PX, width));

export const loadStoredWidth = (
  key: string,
  fallback: number,
  min: number,
  max: number,
): number => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = Number(raw);
    if (!Number.isFinite(parsed)) return fallback;
    return Math.min(max, Math.max(min, parsed));
  } catch {
    return fallback;
  }
};

export const saveStoredWidth = (key: string, width: number): void => {
  localStorage.setItem(key, String(width));
};

export const startHorizontalResize = (
  startX: number,
  startWidth: number,
  min: number,
  max: number,
  invert: boolean,
  onWidth: (width: number) => void,
  onCommit: (width: number) => void,
): void => {
  const nextWidth = (clientX: number): number => {
    const delta = invert ? startX - clientX : clientX - startX;
    return Math.min(max, Math.max(min, startWidth + delta));
  };
  const onMove = (moveEvent: globalThis.MouseEvent) => {
    onWidth(nextWidth(moveEvent.clientX));
  };
  const onUp = (upEvent: globalThis.MouseEvent) => {
    window.removeEventListener(POINTER_EVENT_MOVE, onMove);
    window.removeEventListener(POINTER_EVENT_UP, onUp);
    onCommit(nextWidth(upEvent.clientX));
  };
  window.addEventListener(POINTER_EVENT_MOVE, onMove);
  window.addEventListener(POINTER_EVENT_UP, onUp);
};

export const loadCmsModePreference = (): CmsModePreference => {
  try {
    const raw = localStorage.getItem(CMS_MODE_STORAGE_KEY);
    if (raw === CMS_MODE_DARK || raw === CMS_MODE_LIGHT || raw === CMS_MODE_SYSTEM) {
      return raw;
    }
  } catch {
    return CMS_MODE_LIGHT;
  }
  return CMS_MODE_LIGHT;
};

export const saveCmsModePreference = (mode: CmsModePreference): void => {
  localStorage.setItem(CMS_MODE_STORAGE_KEY, mode);
};

export const resolveCmsMode = (preference: CmsModePreference): 'light' | 'dark' => {
  if (preference === CMS_MODE_SYSTEM) {
    return window.matchMedia(COLOR_SCHEME_DARK).matches ? CMS_MODE_DARK : CMS_MODE_LIGHT;
  }
  return preference;
};

export const resolveSidebarNavItems = (
  params: FlattenSidebarGroupsParams,
): CmsSidebarNavItem[] => {
  const { groups, collapsed } = params;
  if (collapsed) {
    return groups.map((group) => ({
      id: group.id,
      label: group.label,
      icon: group.icon,
    }));
  }
  return groups;
};

export const avatarToneColor = (value: string): string => {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash + value.charCodeAt(index) * (index + 1)) % CMS_AVATAR_PALETTE.length;
  }
  return CMS_AVATAR_PALETTE[hash] ?? CMS_AVATAR_PALETTE[0];
};
