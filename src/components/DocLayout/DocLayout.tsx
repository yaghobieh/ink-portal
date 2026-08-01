import { useState, type FC, type ReactNode } from 'react';
import { BearIcons, Typography } from '@forgedevstack/bear';
import { Layout } from '../Layout';
import { DOCS_TOC } from '@const/index';
import { useI18n } from '@i18n/index';

interface DocLayoutProps {
  children: ReactNode;
}

export const DocLayout: FC<DocLayoutProps> = (props) => {
  const { children } = props;
  const { t } = useI18n();
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex gap-10">
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24 ink-doc-aside">
              <Typography
                variant="caption"
                className="uppercase tracking-widest font-semibold mb-3 block text-slate-400"
              >
                {t.docs.title}
              </Typography>
              <nav className="space-y-1 mb-6 pb-4 border-b border-slate-200">
                {DOCS_TOC.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block py-1 text-sm text-slate-500 transition-colors"
                  >
                    {t.docs[item.labelKey]}
                  </a>
                ))}
              </nav>
              <Typography
                variant="caption"
                className="uppercase tracking-widest font-semibold mb-3 block text-slate-400"
              >
                {t.docs.onThisPage}
              </Typography>
              <nav className="space-y-1">
                {DOCS_TOC.map((item) => (
                  <a
                    key={`toc-${item.id}`}
                    href={`#${item.id}`}
                    className="block py-1 text-sm text-slate-500 transition-colors"
                  >
                    {t.docs[item.labelKey]}
                  </a>
                ))}
              </nav>
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
              className="lg:hidden fixed inset-0 z-40 flex items-end justify-center p-4 bg-slate-900/20"
              onClick={() => setTocOpen(false)}
            >
              <div
                className="w-full max-w-sm rounded-2xl p-6 shadow-2xl max-h-[70vh] overflow-auto bg-white border border-slate-200"
                onClick={(e) => e.stopPropagation()}
              >
                <Typography variant="body2" className="font-semibold mb-3">
                  {t.docs.title}
                </Typography>
                <nav className="space-y-2">
                  {DOCS_TOC.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block py-1 text-sm text-slate-600"
                      onClick={() => setTocOpen(false)}
                    >
                      {t.docs[item.labelKey]}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <Typography variant="h1" className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
              {t.docs.title}
            </Typography>
            <Typography variant="body1" className="mb-12 text-lg text-slate-500">
              {t.docs.description}
            </Typography>
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
};
