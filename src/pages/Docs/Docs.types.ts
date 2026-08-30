import type { DocsBlock } from '@const/docsContent.types';

export type DocsRenderSource = 'static' | 'none';

export type DocsResolvedPage = {
  source: DocsRenderSource;
  slug: string;
  title: string;
  labelKey?: string;
  blocks: DocsBlock[];
};
