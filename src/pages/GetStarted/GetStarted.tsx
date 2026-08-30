import type { FC } from 'react';
import { Link } from '@forgedevstack/forge-compass/react';
import { Button, Flex, Typography } from '@forgedevstack/bear';
import { Layout } from '@components/Layout';
import { useI18n } from '@i18n/index';
import { DEFAULT_DOCS_SLUG, docsPath } from '@const/index';
import {
  GET_STARTED_IMPORT,
  GET_STARTED_INSTALL,
  GET_STARTED_SIGN_PAD,
} from './GetStarted.const';

export const GetStarted: FC = () => {
  const { t } = useI18n();

  return (
    <Layout>
      <div className="fade-in ink-install max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Typography variant="caption" className="ink-install__eyebrow">
          {t.getStarted.install}
        </Typography>
        <Typography variant="h1" className="ink-install__title">
          {t.getStarted.title}
        </Typography>
        <Typography variant="body1" className="ink-text-muted mb-8">
          {t.getStarted.description}
        </Typography>
        <div className="ink-install__card">
          <Flex align="center" gap={2} className="ink-install__card-head">
            <span className="ink-install__dot" aria-hidden />
            <Typography variant="h3" className="ink-install__card-title">
              {t.getStarted.install}
            </Typography>
          </Flex>
          <pre className="ink-code mb-4">{GET_STARTED_INSTALL}</pre>
          <Typography variant="body2" className="ink-text-muted mb-0">
            {t.getStarted.body}
          </Typography>
        </div>
        <pre className="ink-code mb-8">{GET_STARTED_IMPORT}</pre>
        <Typography variant="h3" className="text-lg font-semibold mb-3">
          {t.getStarted.signPadTitle}
        </Typography>
        <pre className="ink-code mb-8">{GET_STARTED_SIGN_PAD}</pre>
        <Typography variant="body2" className="ink-text-muted mb-8">
          {t.getStarted.signPadHint}
        </Typography>
        <Link to={docsPath(DEFAULT_DOCS_SLUG)}>
          <Button variant="ink">{t.getStarted.next}</Button>
        </Link>
      </div>
    </Layout>
  );
};
