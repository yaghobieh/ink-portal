import { useEffect, type FC, type ReactNode } from 'react';
import { useNavigate } from '@forgedevstack/forge-compass/react';
import { useAuth } from '@hooks/index';
import { useI18n } from '@i18n/index';
import { ROUTES } from '@const/index';
import { CmsErrorPage } from '../CmsErrorPage';
import { CmsGlowLoader } from '../CmsGlowLoader';
import { CmsLiveProvider } from '../CmsShell/CmsLiveProvider';
import { registerPortalAiProviders } from '@/ai/index';

registerPortalAiProviders();

type CmsGateProps = {
  children: ReactNode;
};

export const CmsGate: FC<CmsGateProps> = (props) => {
  const { t } = useI18n();
  const { navigate } = useNavigate();
  const { isAuthenticated, userLoading, sessionError, retrySession } = useAuth();

  useEffect(() => {
    if (userLoading || sessionError) return;
    if (!isAuthenticated) {
      navigate(ROUTES.CMS_LOGIN, { replace: true });
    }
  }, [isAuthenticated, userLoading, sessionError, navigate]);

  if (sessionError) {
    return <CmsErrorPage detail={sessionError} onRetry={retrySession} />;
  }

  if (userLoading) {
    return <CmsGlowLoader label={t.cmsShell.sessionChecking} />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <CmsLiveProvider>{props.children}</CmsLiveProvider>;
};

export const withCmsGate = (Page: FC): FC => {
  const Gated: FC = () => (
    <CmsGate>
      <Page />
    </CmsGate>
  );
  return Gated;
};
