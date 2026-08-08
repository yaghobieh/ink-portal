import { INK_API_URL } from '@const/billing.const';
import { authHeaders } from '../auth/auth.api';
import type {
  CmsPageItem,
  ContentItem,
  ContentListResponse,
  ContentStatus,
  PagesListResponse,
} from './content.types';

export const CMS_CONTENT_PATH = '/api/cms/content';
export const CMS_PAGES_PATH = '/api/cms/pages';

export const fetchContentRequest = async (token: string): Promise<ContentItem[]> => {
  if (!INK_API_URL || !token) return [];
  const response = await fetch(`${INK_API_URL}${CMS_CONTENT_PATH}`, {
    headers: authHeaders(token),
  });
  if (!response.ok) return [];
  const data = (await response.json()) as ContentListResponse;
  return data.items ?? [];
};

export const fetchContentByCollectionRequest = async (
  token: string,
  collection: string,
): Promise<ContentItem[]> => {
  if (!INK_API_URL || !token || !collection) return [];
  const response = await fetch(`${INK_API_URL}${CMS_CONTENT_PATH}/${collection}`, {
    headers: authHeaders(token),
  });
  if (!response.ok) return [];
  const data = (await response.json()) as ContentListResponse;
  return data.items ?? [];
};

export const fetchPagesRequest = async (token: string): Promise<CmsPageItem[]> => {
  if (!INK_API_URL || !token) return [];
  const response = await fetch(`${INK_API_URL}${CMS_PAGES_PATH}`, {
    headers: authHeaders(token),
  });
  if (!response.ok) return [];
  const data = (await response.json()) as PagesListResponse;
  return data.pages ?? [];
};

export const saveContentRequest = async (
  token: string,
  input: {
    collection: string;
    slug: string;
    locale: string;
    title: string;
    payload: Record<string, unknown>;
    status: ContentStatus;
  },
): Promise<ContentItem | null> => {
  if (!INK_API_URL || !token) return null;
  const response = await fetch(`${INK_API_URL}${CMS_CONTENT_PATH}`, {
    method: 'POST',
    headers: {
      ...authHeaders(token),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  if (!response.ok) return null;
  const data = (await response.json()) as { item?: ContentItem };
  return data.item ?? null;
};

export const updatePageRequest = async (
  token: string,
  input: {
    id: string;
    title: string;
    bodyHtml: string;
    status: string;
    mediaUrl?: string | null;
  },
): Promise<CmsPageItem | null> => {
  if (!INK_API_URL || !token) return null;
  const response = await fetch(`${INK_API_URL}${CMS_PAGES_PATH}/${input.id}`, {
    method: 'PUT',
    headers: {
      ...authHeaders(token),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: input.title,
      bodyHtml: input.bodyHtml,
      status: input.status,
      mediaUrl: input.mediaUrl ?? null,
    }),
  });
  if (!response.ok) return null;
  const data = (await response.json()) as { page?: CmsPageItem };
  return data.page ?? null;
};
