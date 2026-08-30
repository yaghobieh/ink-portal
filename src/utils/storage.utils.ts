import { CMS_FALSE, CMS_TRUE, CMS_ONBOARDING_STORAGE_KEY, CMS_SEO_COLLAPSED_KEY } from '@const/strings.const';
import { EMPTY_STRING } from '@const/generals.const';

export const readStorage = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const writeStorage = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

export const readStorageFlag = (key: string): boolean => readStorage(key) === CMS_TRUE;

export const writeStorageFlag = (key: string, on: boolean): void => {
  writeStorage(key, on ? CMS_TRUE : CMS_FALSE);
};

export const readStorageString = (key: string, fallback = EMPTY_STRING): string =>
  readStorage(key) ?? fallback;

export const loadOnboardingDone = (): boolean => readStorageFlag(CMS_ONBOARDING_STORAGE_KEY);

export const saveOnboardingDone = (): void => writeStorageFlag(CMS_ONBOARDING_STORAGE_KEY, true);

export const loadSeoCollapsed = (): boolean => readStorageFlag(CMS_SEO_COLLAPSED_KEY);

export const saveSeoCollapsed = (collapsed: boolean): void => {
  writeStorageFlag(CMS_SEO_COLLAPSED_KEY, collapsed);
};
