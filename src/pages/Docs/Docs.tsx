import { useEffect, type FC, type ReactNode } from 'react';
import { Link, useNavigate, useParams } from '@forgedevstack/forge-compass/react';
import { Typography } from '@forgedevstack/bear';
import { DocLayout } from '@components/DocLayout';
import { DocDemo } from '@components/DocDemo';
import { DocHeroMedia } from '@components/DocHeroMedia';
import { useI18n } from '@i18n/index';
import {
  DEFAULT_DOCS_SLUG,
  DOCS_PAGE_BY_ID,
  docsPath,
  getDocsPageMedia,
  ROUTES,
} from '@const/index';
import type { DocsBlock } from '@const/docsContent.types';
import { DOCS_JSON_INDENT } from './Docs.const';

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
        {block.title ? (
          <Typography variant="h3" className="ink-doc-page__topics-title">
            {block.title}
          </Typography>
        ) : null}
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

export const Docs: FC = () => {
  const { t } = useI18n();
  const params = useParams<{ slug?: string }>();
  const { navigate } = useNavigate();
  const slug = params.slug;
  const page = slug ? DOCS_PAGE_BY_ID[slug] : undefined;

  useEffect(() => {
    if (!slug) {
      navigate(docsPath(DEFAULT_DOCS_SLUG), { replace: true });
    }
  }, [slug, navigate]);

  if (!slug) {
    return null;
  }

  if (!page) {
    return (
      <DocLayout title={t.docs.title} description={t.docs.description}>
        <Typography variant="body1" className="ink-text-muted mb-4">
          {t.docs.notFound}
        </Typography>
        <Link to={docsPath(DEFAULT_DOCS_SLUG)} className="ink-doc-link">
          {t.docs.tocInstallation}
        </Link>
      </DocLayout>
    );
  }

  return (
    <DocLayout title={t.docs[page.labelKey]} description={t.docs.description}>
      <div className="fade-in ink-doc-page space-y-5">
        {getDocsPageMedia(page.id) ? (
          <DocHeroMedia slug={page.id} guidLabel={t.docs.guidLabel} />
        ) : null}
        {page.blocks.map((block, index) => renderStaticBlock(page.id, block, index))}
        <Typography variant="caption" className="ink-doc-page__footer">
          {t.docs.title} · {ROUTES.DOCS}/{page.id}
        </Typography>
      </div>
    </DocLayout>
  );
};
