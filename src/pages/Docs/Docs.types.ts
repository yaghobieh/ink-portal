import type { DocsBlock } from '@const/docsContent.types';
import type { PublicDocBlock, PublicDocPage } from '@sdk/modules/docs';

export type DocsRenderSource = 'api' | 'none';

export type DocsResolvedPage = {
  source: DocsRenderSource;
  slug: string;
  title: string;
  labelKey?: string;
  blocks: Array<DocsBlock | PublicDocBlock>;
  apiPage?: PublicDocPage | null;
};
