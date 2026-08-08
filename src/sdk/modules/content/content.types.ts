export type ContentStatus = 'draft' | 'published' | 'archived';

export type ContentItem = {
  id: string;
  collection: string;
  slug: string;
  locale: string;
  title: string;
  payload: Record<string, unknown>;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
};

export type CmsPageItem = {
  id: string;
  slug: string;
  title: string;
  bodyHtml: string;
  status: string;
  mediaUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ContentListResponse = {
  items?: ContentItem[];
  collection?: string;
};

export type PagesListResponse = {
  pages?: CmsPageItem[];
};

export type ContentSaveInput = {
  collection: string;
  slug: string;
  locale: string;
  title: string;
  payload: Record<string, unknown>;
  status: ContentStatus;
};

export type PageUpdateInput = {
  id: string;
  title: string;
  bodyHtml: string;
  status: string;
  mediaUrl?: string | null;
};

export type ContentState = {
  items: ContentItem[];
  pages: CmsPageItem[];
  loading: boolean;
  saving: boolean;
  error: boolean;
  fetchContent: (token: string) => Promise<boolean>;
  fetchContentByCollection: (token: string, collection: string) => Promise<boolean>;
  fetchPages: (token: string) => Promise<boolean>;
  saveContent: (token: string, input: ContentSaveInput) => Promise<boolean>;
  updatePage: (token: string, input: PageUpdateInput) => Promise<boolean>;
  reset: () => void;
};
