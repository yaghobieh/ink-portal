import type { FC } from 'react';
import { Link } from '@forgedevstack/forge-compass/react';
import { Button, Typography } from '@forgedevstack/bear';
import { Layout } from '@components/Layout';
import { useI18n } from '@i18n/index';
import { ROUTES } from '@const/index';

export const GetStarted: FC = () => {
  const { t } = useI18n();

  return (
    <Layout>
      <div className="fade-in max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Typography variant="h1" className="text-4xl font-bold mb-3 tracking-tight">
          {t.getStarted.title}
        </Typography>
        <Typography variant="body1" className="text-slate-500 mb-8">
          {t.getStarted.description}
        </Typography>
        <Typography variant="h3" className="text-lg font-semibold mb-3">
          {t.getStarted.install}
        </Typography>
        <pre className="ink-code mb-8">{`npm install @forgedevstack/ink`}</pre>
        <pre className="ink-code mb-8">{`import { InkEditor } from '@forgedevstack/ink';
import '@forgedevstack/ink/styles.css';

<InkEditor value={html} onChange={setHtml} typoAutoFix />`}</pre>
        <Link to={ROUTES.DOCS}>
          <Button>{t.getStarted.next}</Button>
        </Link>
      </div>
    </Layout>
  );
};
