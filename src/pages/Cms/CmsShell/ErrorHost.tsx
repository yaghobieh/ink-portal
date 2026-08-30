import { useEffect, useState, type FC } from 'react';
import { Alert, Modal, Typography } from '@forgedevstack/bear';
import { CmsGlowLoader } from '../CmsGlowLoader';
import { CmsErrorPage } from '../CmsErrorPage';
import { useI18n } from '@i18n/index';
import type { ApiErrorPayload } from '@sdk/http';
import { CMS_SITE_EVENT, EMPTY_STRING } from '@const/index';
import { loadCmsSite } from '../SettingsPages';
import { LOADING_SHOW_DELAY_MS } from './ErrorHost.const';
import type { ErrorCopy } from './ErrorHost.types';
import { bindApiHost } from './ErrorHost.utils';

export const ErrorHost: FC = () => {
  const { t } = useI18n();
  const [snackbar, setSnackbar] = useState<ErrorCopy | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [pageError, setPageError] = useState<ApiErrorPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [site, setSite] = useState(() => loadCmsSite());

  useEffect(
    () =>
      bindApiHost({
        delay: LOADING_SHOW_DELAY_MS,
        errors: t.cmsErrors,
        onPage: setPageError,
        onModal: setModalMessage,
        onSnackbar: setSnackbar,
        onLoading: setLoading,
      }),
    [t],
  );

  useEffect(() => {
    const onSite = () => setSite(loadCmsSite());
    window.addEventListener(CMS_SITE_EVENT, onSite);
    return () => window.removeEventListener(CMS_SITE_EVENT, onSite);
  }, []);

  if (pageError) {
    return (
      <CmsErrorPage
        detail={pageError}
        onRetry={() => {
          setPageError(null);
          window.location.reload();
        }}
      />
    );
  }

  return (
    <div>
      {loading && <CmsGlowLoader label={site.loadingMessage || t.cmsErrors.loading} />}
      {snackbar && (
        <div className="ink-cms-error-toast">
          <Alert
            severity="error"
            variant="filled"
            closable
            onClose={() => setSnackbar(null)}
            title={snackbar.title}
          >
            {snackbar.body}
          </Alert>
        </div>
      )}
      <Modal
        isOpen={Boolean(modalMessage)}
        onClose={() => setModalMessage(null)}
        title={t.cmsErrors.modalTitle}
        size="sm"
      >
        <Typography variant="body2" className="mb-0">
          {modalMessage || EMPTY_STRING}
        </Typography>
      </Modal>
    </div>
  );
};
