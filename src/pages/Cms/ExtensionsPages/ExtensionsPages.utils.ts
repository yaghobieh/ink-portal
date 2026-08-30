import { CMS_AVATAR_INITIALS_LENGTH, CMS_STORE_ICON_TONES } from '@const/numbers.const';
import { NUMBER_ONE_THOUSAND, NUMBER_TWO, NUMBER_ZERO } from '@const/numbers.const';
import { CMS_EXTENSIONS_EVENT, CMS_EXTERNAL_PLUGINS_KEY, EMPTY_STRING } from '@const/strings.const';
import {
  BIF_DYNAMIC_EXTENSION_ID,
  CAST_EXTENSION_ID,
  CREW_CHAT_EXTENSION_ID,
  EXTENSION_CATALOG,
  EXTENSION_FILTER_ALL,
  EXTENSION_GIT_HTTPS_PREFIX,
  EXTENSION_KINDS,
  EXTENSION_PRICE_FREE,
  EXTENSIONS_STORAGE_KEY,
  THEMING_EXTENSION_ID,
} from './ExtensionsPages.const';
import type {
  ExtensionItem,
  ExtensionStoreFilters,
} from './ExtensionsPages.types';

const readInstalledIds = (): string[] => {
  try {
    const raw = localStorage.getItem(EXTENSIONS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === 'string');
  } catch {
    return [];
  }
};

export const saveInstalledExtensionIds = (ids: string[]): void => {
  localStorage.setItem(EXTENSIONS_STORAGE_KEY, JSON.stringify(ids));
};

const isExtensionItem = (value: unknown): value is ExtensionItem => {
  if (!value || typeof value !== 'object') return false;
  const item = value as ExtensionItem;
  return typeof item.id === 'string' && typeof item.git === 'string' && typeof item.name === 'string';
};

export const loadExternalPlugins = (): ExtensionItem[] => {
  try {
    const raw = localStorage.getItem(CMS_EXTERNAL_PLUGINS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isExtensionItem);
  } catch {
    return [];
  }
};

export const saveExternalPlugins = (items: ExtensionItem[]): void => {
  localStorage.setItem(CMS_EXTERNAL_PLUGINS_KEY, JSON.stringify(items));
};

export const isGitHttpsUrl = (value: string): boolean => {
  if (!value.startsWith(EXTENSION_GIT_HTTPS_PREFIX)) return false;
  try {
    const url = new URL(value);
    return Boolean(url.hostname) && Boolean(url.pathname.replace('/', EMPTY_STRING));
  } catch {
    return false;
  }
};

export const createExternalPlugin = (gitUrl: string): ExtensionItem => {
  const parsed = new URL(gitUrl);
  const segments = parsed.pathname.split('/').filter(Boolean);
  const name = segments[segments.length - 1]?.replace(/\.git$/, EMPTY_STRING) || parsed.hostname;
  return {
    id: `ext-${parsed.hostname}-${name}`.toLowerCase(),
    name,
    description: gitUrl,
    longDescription: gitUrl,
    highlights: [gitUrl],
    previewSrc: '/ink-hero.png',
    version: '0.0.0',
    kind: EXTENSION_KINDS.BRIDGE,
    tags: ['external'],
    status: 'available',
    author: parsed.hostname,
    git: gitUrl,
    website: gitUrl,
    dependencies: [],
    price: EXTENSION_PRICE_FREE,
    likes: NUMBER_ZERO,
    installs: NUMBER_ZERO,
    isNew: true,
  };
};

export const mergeCatalogWithInstalled = (
  catalog: ExtensionItem[] = EXTENSION_CATALOG,
): ExtensionItem[] => {
  const external = loadExternalPlugins();
  const merged = [
    ...catalog,
    ...external.filter((item) => !catalog.some((entry) => entry.id === item.id)),
  ];
  const installed = new Set([
    ...merged.filter((item) => item.status === 'installed').map((item) => item.id),
    ...readInstalledIds(),
  ]);
  return merged.map((item) => {
    if (item.status === 'coming') return item;
    if (installed.has(item.id)) return { ...item, status: 'installed' };
    return { ...item, status: 'available' };
  });
};

export const isThemingExtensionInstalled = (): boolean =>
  mergeCatalogWithInstalled().some(
    (item) => item.id === THEMING_EXTENSION_ID && item.status === 'installed',
  );

export const isBifDynamicInstalled = (): boolean =>
  mergeCatalogWithInstalled().some(
    (item) => item.id === BIF_DYNAMIC_EXTENSION_ID && item.status === 'installed',
  );

export const isCastInstalled = (): boolean =>
  mergeCatalogWithInstalled().some(
    (item) => item.id === CAST_EXTENSION_ID && item.status === 'installed',
  );

export const isCrewChatInstalled = (): boolean =>
  mergeCatalogWithInstalled().some(
    (item) => item.id === CREW_CHAT_EXTENSION_ID && item.status === 'installed',
  );

export const extensionInitials = (name: string): string =>
  name.trim().slice(0, CMS_AVATAR_INITIALS_LENGTH).toUpperCase();

export const formatCompactCount = (value: number): string => {
  if (value < NUMBER_ONE_THOUSAND) return String(value);
  const compact = value / NUMBER_ONE_THOUSAND;
  const rounded = compact.toFixed(1).replace(/\.0$/, '');
  return `${rounded}k`;
};

export const storeIconTone = (id: string): number => {
  let hash = NUMBER_ZERO;
  for (let index = NUMBER_ZERO; index < id.length; index += 1) {
    hash = (hash + id.charCodeAt(index)) % CMS_STORE_ICON_TONES;
  }
  return hash;
};

export const uniqueAuthors = (items: ExtensionItem[]): string[] =>
  [...new Set(items.map((item) => item.author))].sort();

export const uniqueGitRepos = (items: ExtensionItem[]): string[] =>
  [...new Set(items.map((item) => item.git))].sort();

export const filterStoreItems = (
  items: ExtensionItem[],
  filters: ExtensionStoreFilters,
): ExtensionItem[] => {
  const query = filters.query.trim().toLowerCase();
  return items.filter((item) => {
    const matchesQuery =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.author.toLowerCase().includes(query) ||
      item.git.toLowerCase().includes(query);
    const matchesKind =
      filters.kind === EXTENSION_FILTER_ALL || item.kind === filters.kind;
    const matchesAuthor =
      filters.author === EXTENSION_FILTER_ALL || item.author === filters.author;
    const matchesGit =
      filters.git === EXTENSION_FILTER_ALL || item.git === filters.git;
    return matchesQuery && matchesKind && matchesAuthor && matchesGit;
  });
};

export const extensionMark = (name: string): string => {
  const parts = name.trim().split(/\s+/).filter((part) => part.length > NUMBER_ZERO);
  if (parts.length >= NUMBER_TWO) {
    return `${parts[0].charAt(NUMBER_ZERO)}${parts[1].charAt(NUMBER_ZERO)}`.toUpperCase();
  }
  return name.slice(NUMBER_ZERO, CMS_AVATAR_INITIALS_LENGTH);
};
