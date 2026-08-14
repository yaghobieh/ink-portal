import { useEffect, useState, type FC } from 'react';
import { Alert, Modal, Typography } from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { setApiErrorHandler } from '@sdk/http';
import type { ApiErrorPayload } from '@sdk/http';
import { EMPTY_STRING } from '@const/index';

export const ErrorHost: FC = () => {
  const { t } = useI18n();
  const [toast, setToast] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  useEffect(() => {
    setApiErrorHandler((payload: ApiErrorPayload) => {
      if (payload.mode === 'modal') {
        setModalMessage(payload.message);
        return;
      }
      setToast(payload.message);
    });
    return () => {
      setApiErrorHandler(null);
    };
  }, []);

  return (
    <>
      {toast ? (
        <div className="ink-cms-error-toast">
          <Alert
            severity="error"
            closable
            onClose={() => setToast(null)}
            title={t.cmsErrors.toastTitle}
          >
            {toast}
          </Alert>
        </div>
      ) : null}
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
    </>
  );
};
