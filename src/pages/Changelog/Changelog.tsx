import type { FC } from 'react';
import { Typography } from '@forgedevstack/bear';
import { Layout } from '@components/Layout';
import { useI18n } from '@i18n/index';
import { CHANGELOG_ENTRIES, ROADMAP_1_1_5 } from '@const/index';

export const Changelog: FC = () => {
  const { t } = useI18n();

  return (
    <Layout>
      <div className="fade-in max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Typography variant="h1" className="text-4xl font-bold mb-3 tracking-tight">
          {t.changelog.title}
        </Typography>
        <Typography variant="body1" className="text-slate-500 mb-10">
          {t.changelog.description}
        </Typography>

        <section className="mb-12">
          <Typography variant="h2" className="text-xl font-bold mb-4">
            {t.changelog.roadmapTitle}
          </Typography>
          <Typography variant="body2" className="text-slate-500 mb-4">
            {t.changelog.roadmapBody}
          </Typography>
          <ul className="space-y-3">
            {ROADMAP_1_1_5.map((item) => (
              <li key={item.id} className="ink-paper p-4">
                <Typography variant="body2" className="font-semibold mb-1">
                  {item.title}
                </Typography>
                <Typography variant="caption" className="text-slate-500 mb-0">
                  {item.body}
                </Typography>
              </li>
            ))}
          </ul>
        </section>

        <div className="space-y-3">
          {CHANGELOG_ENTRIES.map((entry) => (
            <details key={entry.version} className="ink-paper p-4" open={entry.defaultOpen}>
              <summary className="cursor-pointer list-none font-semibold text-lg flex items-center justify-between">
                <span>{entry.version}</span>
                <span className="text-slate-400 text-sm font-normal">{t.changelog.toggleHint}</span>
              </summary>
              <ul className="list-disc pl-5 text-slate-600 space-y-1 mt-3">
                {entry.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </Layout>
  );
};
