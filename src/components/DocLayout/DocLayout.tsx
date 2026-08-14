import { useState, type FC } from 'react';
import { Link, useParams } from '@forgedevstack/forge-compass/react';
import { BearIcons, Typography } from '@forgedevstack/bear';
import { Layout } from '../Layout';
import { DOCS_TOC, DEFAULT_DOCS_SLUG, docsPath } from '@const/index';
import { useI18n } from '@i18n/index';
import type { DocLayoutProps } from './DocLayout.types';

export const DocLayout: FC<DocLayoutProps> = (props) => {
  const { children, title, description } = props;
  const { t } = useI18n();
  const params = useParams<{ slug?: string }>();
  const activeSlug = params.slug ?? DEFAULT_DOCS_SLUG;
  const [tocOpen, setTocOpen] = useState(false);

  const nav = (
    <nav className="ink-doc-toc-nav space-y-1">
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
      <div className="ink-doc-layout">
        <div className="ink-doc-layout__row">
          <aside className="ink-doc-aside-wrap">
            <div className="sticky top-24 ink-doc-aside">
              <Typography
                variant="caption"
                className="ink-muted-label uppercase tracking-widest font-semibold mb-3 block"
              >
                {t.docs.title}
              </Typography>
              {nav}
            </div>
          </aside>

          <div className="ink-doc-layout__content">
            <div className="ink-doc-mobile-toc">
              <button
                type="button"
                className="ink-doc-mobile-toc__toggle"
                onClick={() => setTocOpen(!tocOpen)}
                aria-expanded={tocOpen}
                aria-controls="ink-doc-mobile-toc-panel"
              >
                <BearIcons.MenuIcon size="sm" />
                <span>{t.docs.onThisPage}</span>
              </button>
              {tocOpen ? (
                <div
                  id="ink-doc-mobile-toc-panel"
                  className="ink-doc-mobile-toc__panel"
                >
                  {nav}
                </div>
              ) : null}
            </div>

            <Typography
              variant="h1"
              className="ink-doc-page__title text-4xl md:text-5xl font-bold mb-3 tracking-tight"
            >
              {title ?? t.docs.title}
            </Typography>
            {description && (
              <Typography
                variant="body1"
                className="ink-doc-page__subtitle mb-10 text-lg ink-text-muted"
              >
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
