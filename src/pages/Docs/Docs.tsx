import { useEffect, type FC } from 'react';
import { Link, useNavigate, useParams } from '@forgedevstack/forge-compass/react';
import { Typography } from '@forgedevstack/bear';
import { DocLayout } from '@components/DocLayout';
import { useI18n } from '@i18n/index';
import {
  DEFAULT_DOCS_SLUG,
  DOCS_PAGE_BY_ID,
  docsPath,
  ROUTES,
} from '@const/index';

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
          Doc not found.
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
        {page.blocks.map((block, index) => {
          if (block.type === 'code') {
            return (
              <pre key={`${page.id}-code-${index}`} className="ink-code">
                {block.code}
              </pre>
            );
          }
          if (block.type === 'html') {
            return (
              <div
                key={`${page.id}-html-${index}`}
                className="ink-doc-body"
                dangerouslySetInnerHTML={{ __html: block.html }}
              />
            );
          }
          return (
            <Typography key={`${page.id}-p-${index}`} variant="body1" className="ink-doc-body">
              {block.text}
            </Typography>
          );
        })}
        <Typography variant="caption" className="ink-text-muted block pt-6">
          {t.docs.title} · {ROUTES.DOCS}/{page.id}
        </Typography>
      </div>
    </DocLayout>
  );
};
