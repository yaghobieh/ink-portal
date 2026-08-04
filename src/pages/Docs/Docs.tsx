import { useEffect, type FC } from 'react';
import { Link, useNavigate, useParams } from '@forgedevstack/forge-compass/react';
import { Typography } from '@forgedevstack/bear';
import { DocLayout } from '@components/DocLayout';
import { DocDemo } from '@components/DocDemo';
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
          if (block.type === 'demo') {
            return <DocDemo key={`${page.id}-demo-${block.id}`} {...block} />;
          }
          if (block.type === 'payload') {
            return (
              <div key={`${page.id}-payload-${index}`} className="space-y-2">
                <Typography variant="body2" className="font-semibold m-0">
                  {block.label}
                </Typography>
                <pre className="ink-code">{JSON.stringify(block.data, null, 2)}</pre>
              </div>
            );
          }
          if (block.type === 'steps') {
            return (
              <div key={`${page.id}-steps-${index}`} className="space-y-3">
                {block.title ? (
                  <Typography variant="h3" className="text-lg font-semibold m-0">
                    {block.title}
                  </Typography>
                ) : null}
                <ol className="list-decimal pl-5 space-y-2 ink-doc-body">
                  {block.items.map((item) => (
                    <li key={item.title}>
                      <Typography variant="body1" className="font-semibold m-0">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" className="ink-text-muted m-0">
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
