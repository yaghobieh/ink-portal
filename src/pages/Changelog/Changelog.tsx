import type { FC } from 'react';
import { Typography } from '@forgedevstack/bear';
import { Layout } from '@components/Layout';
import { useI18n } from '@i18n/index';

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

        <section className="mb-10">
          <Typography variant="h2" className="text-xl font-bold mb-2">
            1.1.2
          </Typography>
          <ul className="list-disc pl-5 text-slate-600 space-y-1">
            <li>Sign pad, keep-in-memory drafts, find and replace, horizontal rule</li>
            <li>Docs pages + code examples for sign pad / memory / find-replace</li>
            <li>Product copy cleanup — Ink-only voice</li>
          </ul>
        </section>

        <section className="mb-10">
          <Typography variant="h2" className="text-xl font-bold mb-2">
            1.1.0
          </Typography>
          <ul className="list-disc pl-5 text-slate-600 space-y-1">
            <li>Document shell, document variant, block handles, slash commands</li>
            <li>Tables, track changes, comments archive, undo/redo toolbar</li>
            <li>Ink AI suite — chat, quick actions, review, translate, demo provider, model catalog</li>
            <li>Portal demos hub, AI marketing page, playground module toggles</li>
          </ul>
        </section>

        <section className="mb-10">
          <Typography variant="h2" className="text-xl font-bold mb-2">
            1.0.1
          </Typography>
          <ul className="list-disc pl-5 text-slate-600 space-y-1">
            <li>Expanded README: props, toolbar options, CSS variables</li>
            <li>Theme CSS classes documented for snow / bubble / dark / minimal</li>
            <li>Portal docs + playground ship alongside</li>
          </ul>
        </section>

        <section>
          <Typography variant="h2" className="text-xl font-bold mb-2">
            1.0.0
          </Typography>
          <ul className="list-disc pl-5 text-slate-600 space-y-1">
            <li>Initial InkEditor release with toolbar, typo auto-fix MVP, AI stub</li>
            <li>Angular helpers and WordPress plugin stub</li>
          </ul>
        </section>
      </div>
    </Layout>
  );
};
