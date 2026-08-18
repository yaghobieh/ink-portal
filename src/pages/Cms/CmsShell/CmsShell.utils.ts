import {
  CMS_FALSE,
  CMS_MODE_DARK,
  CMS_MODE_LIGHT,
  CMS_MODE_STORAGE_KEY,
  CMS_MODE_SYSTEM,
  CMS_SIDEBAR_COLLAPSED_KEY,
  CMS_TRUE,
} from '@const/strings.const';
import type { CmsModePreference } from './CmsShell.types';

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
