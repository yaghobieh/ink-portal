import { INK_API_URL } from '@const/billing.const';
import { useApi } from '@sdk/http';
import { PAGES_PATH } from './pages.const';
import type { CmsPageResponse, CmsPortalPage, FetchPageOptions } from './pages.types';

const normalizePage = (raw: CmsPortalPage | undefined | null): CmsPortalPage | null => {
  if (!raw || typeof raw.name !== 'string') return null;
  return {
    ...raw,
    title: raw.title || raw.name,
    payload: raw.payload ?? {},
  };
};

export const fetchCmsPageRequest = async (
  options: FetchPageOptions,
): Promise<CmsPortalPage | null> => {
  if (!options.name || !options.type) return null;
  const params = new URLSearchParams({
    name: options.name,
    type: options.type,
  });
  try {
    const response = await useApi(
      `${INK_API_URL}${PAGES_PATH}?${params.toString()}`,
      undefined,
      { message: 'Failed to load page' },
    );
    if (!response.ok) return null;
    const data = (await response.json()) as CmsPageResponse;
    return normalizePage(data.page ?? null);
  } catch {
    return null;
  }
};

export const fetchCmsPagesListRequest = async (type?: string): Promise<CmsPortalPage[]> => {
  const params = new URLSearchParams();
  if (type) params.set('type', type);
  const suffix = params.toString() ? `?${params.toString()}` : '';
  try {
    const response = await useApi(
      `${INK_API_URL}${PAGES_PATH}${suffix}`,
      undefined,
      { message: 'Failed to load pages' },
    );
    if (!response.ok) return [];
    const data = (await response.json()) as CmsPageResponse;
    return (data.pages ?? [])
      .map((page) => normalizePage(page))
      .filter((page): page is CmsPortalPage => Boolean(page));
  } catch {
    return [];
  }
};
