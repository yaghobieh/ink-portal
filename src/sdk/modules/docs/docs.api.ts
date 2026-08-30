import { INK_API_URL } from '@const/billing.const';
import { getMessages } from '@i18n/index';
import { useApi } from '@sdk/http';
import { PUBLIC_DOCS_PATH } from './docs.const';
import type {
  PublicDocBySlugResponse,
  PublicDocPage,
  PublicDocsListResponse,
} from './docs.types';

const normalizePage = (raw: PublicDocPage | undefined | null): PublicDocPage | null => {
  if (!raw || typeof raw.slug !== 'string') return null;
  return {
    ...raw,
    title: raw.title || raw.slug,
    payload: raw.payload ?? {},
  };
};

export const fetchPublicDocsRequest = async (): Promise<PublicDocPage[]> => {
  try {
    const response = await useApi(
      `${INK_API_URL}${PUBLIC_DOCS_PATH}`,
      undefined,
      { message: getMessages().docs.loadList },
    );
    if (!response.ok) return [];
    const data = (await response.json()) as PublicDocsListResponse;
    const list = data.pages ?? data.items ?? [];
    return list.map((page) => normalizePage(page)).filter((page): page is PublicDocPage => Boolean(page));
  } catch {
    return [];
  }
};

export const fetchPublicDocBySlugRequest = async (
  slug: string,
): Promise<PublicDocPage | null> => {
  if (!slug) return null;
  try {
    const response = await useApi(
      `${INK_API_URL}${PUBLIC_DOCS_PATH}/${encodeURIComponent(slug)}`,
      undefined,
      { message: getMessages().docs.loadPage },
    );
    if (!response.ok) return null;
    const data = (await response.json()) as PublicDocBySlugResponse;
    return normalizePage(data.page ?? data.item ?? null);
  } catch {
    return null;
  }
};
