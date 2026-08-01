import { useState, type FC, type ReactNode } from 'react';
import { Link, useParams } from '@forgedevstack/forge-compass/react';
import { BearIcons, Typography } from '@forgedevstack/bear';
import { Layout } from '../Layout';
import { DOCS_TOC, DEFAULT_DOCS_SLUG, docsPath } from '@const/index';
import { useI18n } from '@i18n/index';

interface DocLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export const DocLayout: FC<DocLayoutProps> = (props) => {
  const { children, title, description } = props;
  const { t } = useI18n();
  const params = useParams<{ slug?: string }>();
  const activeSlug = params.slug ?? DEFAULT_DOCS_SLUG;
  const [tocOpen, setTocOpen] = useState(false);

  const nav = (
    <nav className="space-y-1">
      {DOCS_TOC.map((item) => {
        const active = item.id === activeSlug;
        return (
          <Link
            key={item.id}
            to={docsPath(item.id)}
            className="ink-doc-nav-link"
            data-active={active ? 'true' : 'false'}
            onClick={() => setTocOpen(false)}
          >
            {t.docs[item.labelKey]}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex gap-10">
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24 ink-doc-aside">
              <Typography variant="caption" className="ink-muted-label uppercase tracking-widest font-semibold mb-3 block">
                {t.docs.title}
              </Typography>
              {nav}
            </div>
          </aside>

          <button
            type="button"
            className="lg:hidden fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-teal-700 text-white shadow-lg flex items-center justify-center"
            onClick={() => setTocOpen(!tocOpen)}
            aria-label={t.docs.onThisPage}
          >
            <BearIcons.MenuIcon size="sm" />
          </button>

          {tocOpen && (
            <div
              className="lg:hidden fixed inset-0 z-40 flex items-end justify-center p-4 ink-mobile-scrim"
              onClick={() => setTocOpen(false)}
            >
              <div
                className="w-full max-w-sm rounded-2xl p-6 shadow-2xl max-h-[70vh] overflow-auto ink-mobile-sheet"
                onClick={(e) => e.stopPropagation()}
              >
                <Typography variant="body2" className="font-semibold mb-3">
                  {t.docs.title}
                </Typography>
                {nav}
              </div>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <Typography variant="h1" className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
              {title ?? t.docs.title}
            </Typography>
            {description && (
              <Typography variant="body1" className="mb-10 text-lg ink-text-muted">
                {description}
              </Typography>
            )}
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
};
