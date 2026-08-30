import { INK_API_URL } from '@const/billing.const';
import { ROUTES, CONTENT_TYPE_JSON, HTTP_METHOD_POST, HTTP_METHOD_PUT } from '@const/index';
import { useApi } from '@sdk/http';
import { authHeaders } from '../auth/auth.api';
import type {
  CmsPageItem,
  ContentItem,
  ContentListResponse,
  ContentStatus,
  PagesListResponse,
} from './content.types';
import {
  CMS_CONTENT_PATH,
  CMS_PAGES_PATH,
  CMS_PAGE_CONTENT_PATH,
  CMS_PAGE_UPDATE_PATH,
} from './content.const';

export const fetchContentRequest = async (token: string): Promise<ContentItem[]> => {
  if (!token) return [];
  const response = await useApi(
    `${INK_API_URL}${CMS_CONTENT_PATH}`,
    { headers: authHeaders(token) },
    { code: 'content', message: 'Failed to load content' },
  );
  if (!response.ok) return [];
  try {
    const data = (await response.json()) as ContentListResponse;
    if (!data || !Array.isArray(data.items)) return [];
    return data.items;
  } catch {
    return [];
  }
};

export const fetchContentByCollectionRequest = async (
  token: string,
  collection: string,
): Promise<ContentItem[]> => {
  if (!token || !collection) return [];
  const response = await useApi(
    `${INK_API_URL}${CMS_CONTENT_PATH}/${collection}`,
    { headers: authHeaders(token) },
    { message: 'Failed to load collection', code: 'content' },
  );
  if (!response.ok) return [];
  try {
    const data = (await response.json()) as ContentListResponse;
    if (!data || !Array.isArray(data.items)) return [];
    return data.items;
  } catch {
    return [];
  }
};

export const fetchPagesRequest = async (token: string): Promise<CmsPageItem[]> => {
  if (!token) return [];
  const response = await useApi(
    `${INK_API_URL}${CMS_PAGES_PATH}`,
    { headers: authHeaders(token) },
    { message: 'Failed to load pages', code: 'pages', href: ROUTES.CMS_CONTENT },
  );
  if (!response.ok) return [];
  const data = (await response.json()) as PagesListResponse;
  return data.pages ?? [];
};

export const fetchPageContentRequest = async (
  token: string,
  id: string,
): Promise<CmsPageItem | null> => {
  if (!token || !id) return null;
  const response = await useApi(
    `${INK_API_URL}${CMS_PAGE_CONTENT_PATH}/${id}`,
    { headers: authHeaders(token) },
    { message: 'Failed to load page content', code: 'page-content' },
  );
  if (!response.ok) return null;
  const data = (await response.json()) as { page?: CmsPageItem };
  return data.page ?? null;
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
  if (!token) return null;
  const response = await useApi(
    `${INK_API_URL}${CMS_CONTENT_PATH}`,
    {
      method: HTTP_METHOD_POST,
      headers: {
        ...authHeaders(token),
        'Content-Type': CONTENT_TYPE_JSON,
      },
      body: JSON.stringify(input),
    },
    { message: 'Failed to save content' },
  );
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
  if (!token) return null;
  const response = await useApi(
    `${INK_API_URL}${CMS_PAGE_UPDATE_PATH}/${input.id}`,
    {
      method: HTTP_METHOD_PUT,
      headers: {
        ...authHeaders(token),
        'Content-Type': CONTENT_TYPE_JSON,
      },
      body: JSON.stringify({
        title: input.title,
        bodyHtml: input.bodyHtml,
        status: input.status,
        mediaUrl: input.mediaUrl ?? null,
      }),
    },
    { message: 'Failed to update page', code: 'page-content' },
  );
  if (!response.ok) return null;
  const data = (await response.json()) as { page?: CmsPageItem };
  return data.page ?? null;
};
