import type { DocDemoBlock, DocsBlock } from '@const/docsContent.types';
import { DOCS_PAGE_BY_ID } from '@const/index';
import { DOC_DEMO_BY_ID, EMPTY_DOC_HTML } from './Docs.const';
import type { DocsResolvedPage } from './Docs.types';

export const resolveDemoBlock = (block: DocDemoBlock): DocDemoBlock | null => {
  if (block.id && DOC_DEMO_BY_ID[block.id]) {
    return DOC_DEMO_BY_ID[block.id];
  }
  if (block.initialHtml && block.code) {
    return block;
  }
  return null;
};

export const resolveDocsPage = (slug: string): DocsResolvedPage => {
  const page = DOCS_PAGE_BY_ID[slug];
  if (!page) {
    return {
      source: 'none',
      slug,
      title: slug,
      blocks: [],
    };
  }
  return {
    source: 'static',
    slug,
    title: page.id,
    labelKey: page.labelKey,
    blocks: page.blocks,
  };
};

export const isDocsBlock = (block: DocsBlock): boolean =>
  block.type === 'p' ||
  block.type === 'code' ||
  block.type === 'html' ||
  block.type === 'steps' ||
  block.type === 'demo' ||
  block.type === 'payload';

export const fallbackDemoHtml = (): string => EMPTY_DOC_HTML;
