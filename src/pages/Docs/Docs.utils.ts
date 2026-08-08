import type { DocDemoBlock, DocsBlock, DocsPageContent } from '@const/docsContent.types';
import { EMPTY_STRING } from '@const/index';
import type { PublicDocBlock, PublicDocDemoBlock, PublicDocPage } from '@sdk/modules/docs';
import { PUBLIC_DOCS_BLOCK_TYPES } from '@sdk/modules/docs';
import { DOC_DEMO_BY_ID, EMPTY_DOC_HTML } from './Docs.const';
import type { DocsResolvedPage } from './Docs.types';

export const extractCmsBlocks = (page: PublicDocPage | null): PublicDocBlock[] => {
  if (!page) return [];
  const fromBlocks = Array.isArray(page.payload?.blocks) ? page.payload.blocks : [];
  if (fromBlocks.length > 0) return fromBlocks;
  const fromSections = Array.isArray(page.payload?.sections) ? page.payload.sections : [];
  if (fromSections.length > 0) return fromSections;
  if (typeof page.payload?.html === 'string' && page.payload.html) {
    return [{ type: PUBLIC_DOCS_BLOCK_TYPES.HTML, html: page.payload.html }];
  }
  if (typeof page.bodyHtml === 'string' && page.bodyHtml) {
    return [{ type: PUBLIC_DOCS_BLOCK_TYPES.HTML, html: page.bodyHtml }];
  }
  return [];
};

export const resolveDemoBlock = (block: PublicDocDemoBlock): DocDemoBlock | null => {
  if (block.id && DOC_DEMO_BY_ID[block.id]) {
    return DOC_DEMO_BY_ID[block.id];
  }
  if (block.initialHtml && block.code) {
    return {
      type: 'demo',
      id: block.id || 'cms-demo',
      title: block.title,
      description: block.description,
      initialHtml: block.initialHtml,
      code: block.code,
      editor: block.editor,
      payload: block.payload,
      showLiveHtml: block.showLiveHtml,
    };
  }
  if (block.initialHtml) {
    return {
      type: 'demo',
      id: block.id || 'cms-demo',
      title: block.title,
      description: block.description,
      initialHtml: block.initialHtml,
      code: block.code || EMPTY_STRING,
      editor: block.editor,
      payload: block.payload,
      showLiveHtml: block.showLiveHtml,
    };
  }
  return null;
};

export const resolveDocsPage = (
  slug: string,
  apiPage: PublicDocPage | null,
  staticPage: DocsPageContent | undefined,
): DocsResolvedPage => {
  const cmsBlocks = extractCmsBlocks(apiPage);
  if (apiPage && cmsBlocks.length > 0) {
    return {
      source: 'api',
      slug,
      title: apiPage.title || staticPage?.id || slug,
      labelKey: staticPage?.labelKey,
      blocks: cmsBlocks,
      apiPage,
    };
  }
  if (staticPage) {
    return {
      source: 'static',
      slug,
      title: staticPage.id,
      labelKey: staticPage.labelKey,
      blocks: staticPage.blocks,
      apiPage,
    };
  }
  return {
    source: 'none',
    slug,
    title: slug,
    blocks: [],
    apiPage,
  };
};

export const isDocsBlock = (block: DocsBlock | PublicDocBlock): block is DocsBlock =>
  block.type === 'p' ||
  block.type === 'code' ||
  block.type === 'html' ||
  block.type === 'steps' ||
  block.type === 'demo' ||
  block.type === 'payload';

export const fallbackDemoHtml = (): string => EMPTY_DOC_HTML;
