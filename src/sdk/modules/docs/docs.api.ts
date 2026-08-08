import { INK_API_URL } from '@const/billing.const';
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
  if (!INK_API_URL) return [];
  try {
    const response = await fetch(`${INK_API_URL}${PUBLIC_DOCS_PATH}`);
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
  if (!INK_API_URL || !slug) return null;
  try {
    const response = await fetch(`${INK_API_URL}${PUBLIC_DOCS_PATH}/${encodeURIComponent(slug)}`);
    if (!response.ok) return null;
    const data = (await response.json()) as PublicDocBySlugResponse;
    return normalizePage(data.page ?? data.item ?? null);
  } catch {
    return null;
  }
};
