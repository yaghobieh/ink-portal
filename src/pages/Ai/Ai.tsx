import type { FC } from 'react';
import { Link } from '@forgedevstack/forge-compass/react';
import { Button, Typography } from '@forgedevstack/bear';
import { Layout } from '@components/Layout';
import { useI18n } from '@i18n/index';
import { ROUTES } from '@const/index';

export const Ai: FC = () => {
  const { t } = useI18n();

  return (
    <Layout>
      <div className="fade-in max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Typography variant="h1" className="text-4xl font-bold mb-3 tracking-tight">
          {t.ai.title}
        </Typography>
        <Typography variant="body1" className="text-slate-500 mb-8">
          {t.ai.description}
        </Typography>
        <pre className="ink-code mb-8">{`import { inkAi } from '@forgedevstack/ink/plugins/ai';

inkAi.register({
  id: 'my-agent',
  name: 'My Agent',
  capabilities: ['rewrite'],
  async run({ html }) {
    return { html };
  },
});`}</pre>
        <Link to={`${ROUTES.DOCS}#ai`}>
          <Button variant="outline">{t.ai.redirect}</Button>
        </Link>
      </div>
    </Layout>
  );
};
