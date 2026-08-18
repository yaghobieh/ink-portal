import type { PublicDocBlock, PublicDocPayload } from '../docs/docs.types';

export type CmsPageType = 'doc' | 'page' | 'system' | 'blog' | string;

export type CmsPortalPage = {
  id?: string;
  name: string;
  type: CmsPageType;
  title: string;
  status?: string;
  locale?: string;
  payload: PublicDocPayload & {
    blocks?: PublicDocBlock[];
    html?: string;
    labelKey?: string;
  };
  updatedAt?: string;
};

export type CmsPageResponse = {
  page?: CmsPortalPage;
  pages?: CmsPortalPage[];
  error?: string;
};

export type FetchPageOptions = {
  name: string;
  type: CmsPageType;
};
