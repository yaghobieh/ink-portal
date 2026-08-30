export type ExtensionStatus = 'available' | 'installed' | 'coming' | 'installing';

export type ExtensionKind =
  | 'theme'
  | 'seo'
  | 'editor'
  | 'collab'
  | 'publish'
  | 'bridge'
  | 'builder'
  | 'form'
  | 'fields'
  | 'calendar';

export type ExtensionPrice = 'free' | 'paid';

export type ExtensionItem = {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  highlights: string[];
  previewSrc: string;
  version: string;
  kind: ExtensionKind;
  tags: string[];
  status: ExtensionStatus;
  author: string;
  git: string;
  website: string;
  dependencies: string[];
  price: ExtensionPrice;
  likes: number;
  installs: number;
  isNew?: boolean;
};

export type ExtensionTabId = 'store' | 'docs';

export type ExtensionStoreFilters = {
  query: string;
  kind: string;
  author: string;
  git: string;
};
