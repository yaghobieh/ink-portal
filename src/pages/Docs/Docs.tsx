import { useEffect, useState, type FC, type ReactNode } from 'react';
import { Link, useNavigate, useParams } from '@forgedevstack/forge-compass/react';
import { Flex, Spinner, Typography } from '@forgedevstack/bear';
import { DocLayout } from '@components/DocLayout';
import { DocDemo } from '@components/DocDemo';
import { DocHeroMedia } from '@components/DocHeroMedia';
import { useI18n } from '@i18n/index';
import {
  DEFAULT_DOCS_SLUG,
  DOCS_PAGE_BY_ID,
  docsPath,
  EMPTY_STRING,
  getDocsPageMedia,
  ROUTES,
} from '@const/index';
import type { DocsBlock } from '@const/docsContent.types';
import { fetchPublicDocBySlugRequest, PUBLIC_DOCS_BLOCK_TYPES } from '@sdk/modules/docs';
import type { PublicDocBlock, PublicDocStepsBlock } from '@sdk/modules/docs';
import {
  DOCS_HEADER_LEVEL_H2,
  DOCS_HEADER_LEVEL_H3,
  DOCS_HEADER_LEVEL_H4,
  DOCS_JSON_INDENT,
} from './Docs.const';
import { resolveDemoBlock, resolveDocsPage } from './Docs.utils';
import type { DocsResolvedPage } from './Docs.types';

const cmsBlocksHaveImage = (blocks: PublicDocBlock[]): boolean =>
  blocks.some((block) => block.type === PUBLIC_DOCS_BLOCK_TYPES.IMAGE);

const headerVariant = (level?: number): 'h2' | 'h3' | 'h4' => {
  if (level === DOCS_HEADER_LEVEL_H4) return 'h4';
  if (level === DOCS_HEADER_LEVEL_H3) return 'h3';
  if (level === DOCS_HEADER_LEVEL_H2) return 'h2';
  return 'h2';
};

const renderStaticBlock = (
  pageId: string,
  block: DocsBlock,
  index: number,
): ReactNode => {
  if (block.type === 'demo') {
    return <DocDemo key={`${pageId}-demo-${block.id}`} {...block} />;
  }
  if (block.type === 'payload') {
    return (
      <div key={`${pageId}-payload-${index}`} className="space-y-2">
        <Typography variant="body2" className="font-semibold m-0">
          {block.label}
        </Typography>
        <pre className="ink-code">{JSON.stringify(block.data, null, DOCS_JSON_INDENT)}</pre>
      </div>
    );
  }
  if (block.type === 'steps') {
    return (
      <div key={`${pageId}-steps-${index}`} className="ink-doc-page__topics space-y-3">
        <Typography variant="h3" className="ink-doc-page__topics-title">
          {block.title || 'Topics'}
        </Typography>
        <ol className="ink-doc-page__topics-list">
          {block.items.map((item) => (
            <li key={item.title} className="ink-doc-page__topic">
              <Typography variant="body1" className="ink-doc-page__topic-title">
                {item.title}
              </Typography>
              <Typography variant="body2" className="ink-doc-page__topic-body">
                {item.body}
              </Typography>
            </li>
          ))}
        </ol>
      </div>
    );
  }
  if (block.type === 'code') {
    return (
      <pre key={`${pageId}-code-${index}`} className="ink-code">
        {block.code}
      </pre>
    );
  }
  if (block.type === 'html') {
    return (
      <div
        key={`${pageId}-html-${index}`}
        className="ink-doc-body"
        dangerouslySetInnerHTML={{ __html: block.html }}
      />
    );
  }
  return (
    <Typography key={`${pageId}-p-${index}`} variant="body1" className="ink-doc-body ink-doc-page__paragraph">
      {block.text}
    </Typography>
  );
};

const renderTopicsBlock = (
  pageId: string,
  block: PublicDocStepsBlock,
  index: number,
  topicsLabel: string,
): ReactNode => (
  <div key={`${pageId}-topics-${index}`} className="ink-doc-page__topics space-y-3">
    <Typography variant="h3" className="ink-doc-page__topics-title">
      {block.title || topicsLabel}
    </Typography>
    <ol className="ink-doc-page__topics-list">
      {block.items.map((item) => (
        <li key={item.title} className="ink-doc-page__topic">
          <Typography variant="body1" className="ink-doc-page__topic-title">
            {item.title}
          </Typography>
          <Typography variant="body2" className="ink-doc-page__topic-body">
            {item.body}
          </Typography>
        </li>
      ))}
    </ol>
  </div>
);

const renderCmsBlock = (
  pageId: string,
  block: PublicDocBlock,
  index: number,
  topicsLabel: string,
): ReactNode => {
  if (block.type === PUBLIC_DOCS_BLOCK_TYPES.DEMO) {
    const demo = resolveDemoBlock(block);
    if (!demo) return null;
    return <DocDemo key={`${pageId}-demo-${demo.id}-${index}`} {...demo} />;
  }
  if (block.type === PUBLIC_DOCS_BLOCK_TYPES.HEADER) {
    return (
      <Typography
        key={`${pageId}-header-${index}`}
        variant={headerVariant(block.level)}
        className="font-semibold m-0"
      >
        {block.text}
      </Typography>
    );
  }
  if (block.type === PUBLIC_DOCS_BLOCK_TYPES.LIST) {
    const ListTag = block.ordered ? 'ol' : 'ul';
    return (
      <ListTag
        key={`${pageId}-list-${index}`}
        className={`${block.ordered ? 'list-decimal' : 'list-disc'} pl-5 space-y-1 ink-doc-body`}
      >
        {block.items.map((item) => (
          <li key={item}>
            <Typography variant="body1" className="m-0">
              {item}
            </Typography>
          </li>
        ))}
      </ListTag>
    );
  }
  if (block.type === PUBLIC_DOCS_BLOCK_TYPES.IMAGE) {
    return (
      <img
        key={`${pageId}-img-${index}`}
        src={block.src}
        alt={block.alt || EMPTY_STRING}
        className="ink-doc-image max-w-full rounded-lg"
      />
    );
  }
  if (block.type === PUBLIC_DOCS_BLOCK_TYPES.PARAGRAPH || block.type === PUBLIC_DOCS_BLOCK_TYPES.P) {
    return (
      <Typography
        key={`${pageId}-para-${index}`}
        variant="body1"
        className="ink-doc-body ink-doc-page__paragraph"
      >
        {block.text}
      </Typography>
    );
  }
  if (block.type === PUBLIC_DOCS_BLOCK_TYPES.CODE) {
    return (
      <pre key={`${pageId}-code-${index}`} className="ink-code">
        {block.code}
      </pre>
    );
  }
  if (block.type === PUBLIC_DOCS_BLOCK_TYPES.HTML) {
    return (
      <div
        key={`${pageId}-html-${index}`}
        className="ink-doc-body"
        dangerouslySetInnerHTML={{ __html: block.html }}
      />
    );
  }
  if (block.type === PUBLIC_DOCS_BLOCK_TYPES.STEPS) {
    return renderTopicsBlock(pageId, block, index, topicsLabel);
  }
  if (block.type === PUBLIC_DOCS_BLOCK_TYPES.PAYLOAD) {
    return renderStaticBlock(pageId, block, index);
  }
  return null;
};

export const Docs: FC = () => {
  const { t } = useI18n();
  const params = useParams<{ slug?: string }>();
  const { navigate } = useNavigate();
  const slug = params.slug;
  const [resolved, setResolved] = useState<DocsResolvedPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      navigate(docsPath(DEFAULT_DOCS_SLUG), { replace: true });
    }
  }, [slug, navigate]);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    const staticPage = DOCS_PAGE_BY_ID[slug];
    setLoading(true);
    setResolved(resolveDocsPage(slug, null, staticPage));

    void fetchPublicDocBySlugRequest(slug)
      .then((apiPage) => {
        if (cancelled) return;
        setResolved(resolveDocsPage(slug, apiPage, staticPage));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!slug) {
    return null;
  }

  if (loading && (!resolved || resolved.source === 'none')) {
    return (
      <DocLayout title={t.docs.title} description={t.docs.description}>
        <Flex align="center" gap={2} className="mb-4">
          <Spinner size="sm" />
          <Typography variant="body2" className="mb-0">
            {t.docs.loading}
          </Typography>
        </Flex>
      </DocLayout>
    );
  }

  if (!resolved || resolved.source === 'none') {
    return (
      <DocLayout title={t.docs.title} description={t.docs.description}>
        {loading ? (
          <Flex align="center" gap={2} className="mb-4">
            <Spinner size="sm" />
            <Typography variant="body2" className="mb-0">
              {t.docs.loading}
            </Typography>
          </Flex>
        ) : null}
        <Typography variant="body1" className="ink-text-muted mb-4">
          {t.docs.notFound}
        </Typography>
        <Link to={docsPath(DEFAULT_DOCS_SLUG)} className="ink-doc-link">
          {t.docs.tocInstallation}
        </Link>
      </DocLayout>
    );
  }

  const title =
    resolved.labelKey && resolved.labelKey in t.docs
      ? t.docs[resolved.labelKey as keyof typeof t.docs]
      : resolved.title;

  const isCms = resolved.source === 'api';
  const pageClassName = isCms
    ? 'fade-in ink-doc-page ink-doc-page--cms space-y-6'
    : 'fade-in ink-doc-page space-y-5';
  const showHeroGif =
    Boolean(getDocsPageMedia(resolved.slug)) &&
    !(isCms && cmsBlocksHaveImage(resolved.blocks as PublicDocBlock[]));

  return (
    <DocLayout title={title} description={t.docs.description}>
      <div className={pageClassName}>
        {loading ? (
          <Flex align="center" gap={2}>
            <Spinner size="sm" />
            <Typography variant="caption" className="ink-text-muted mb-0">
              {t.docs.loading}
            </Typography>
          </Flex>
        ) : null}
        {showHeroGif ? (
          <DocHeroMedia slug={resolved.slug} guidLabel={t.docs.guidLabel} />
        ) : null}
        {resolved.blocks.map((block, index) => {
          if (resolved.source === 'api') {
            return renderCmsBlock(
              resolved.slug,
              block as PublicDocBlock,
              index,
              t.docs.topics,
            );
          }
          return renderStaticBlock(resolved.slug, block as DocsBlock, index);
        })}
        <Typography variant="caption" className="ink-doc-page__footer">
          {t.docs.title} · {ROUTES.DOCS}/{resolved.slug}
          {isCms ? ` · ${t.docs.fromCms}` : EMPTY_STRING}
        </Typography>
      </div>
    </DocLayout>
  );
};
