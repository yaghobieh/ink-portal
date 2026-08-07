import { useState, type FC } from 'react';
import { Button, Card, Flex, Typography } from '@forgedevstack/bear';
import { Layout } from '@components/Layout';
import { AUTH_GOOGLE_PATH } from '@hooks/auth.const';
import type { GoogleAuthStartResponse } from '@hooks/auth.types';
import { useI18n } from '@i18n/index';
import { INK_API_URL } from '@const/index';
import { LOGIN_INITIAL_STATE } from './Login.const';
import type { LoginPageState } from './Login.types';

export const Login: FC = () => {
  const { t } = useI18n();
  const [state, setState] = useState<LoginPageState>(LOGIN_INITIAL_STATE);

  const onGoogleLogin = async () => {
    setState({ loading: true, error: false });
    try {
      if (!INK_API_URL) {
        setState({ loading: false, error: true });
        return;
      }
      const response = await fetch(`${INK_API_URL}${AUTH_GOOGLE_PATH}`);
      if (!response.ok) {
        setState({ loading: false, error: true });
        return;
      }
      const data = (await response.json()) as GoogleAuthStartResponse;
      if (!data.url) {
        setState({ loading: false, error: true });
        return;
      }
      window.location.href = data.url;
    } catch {
      setState({ loading: false, error: true });
    }
  };

  return (
    <Layout>
      <div className="fade-in max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="p-8">
          <Flex direction="column" gap={4}>
            <Typography variant="h1" className="text-3xl font-bold tracking-tight mb-0">
              {t.login.title}
            </Typography>
            <Typography variant="body1" className="ink-text-muted mb-0">
              {t.login.description}
            </Typography>
            <Button
              variant="ink"
              onClick={onGoogleLogin}
              disabled={state.loading}
            >
              {state.loading ? t.login.googleLoading : t.login.google}
            </Button>
            {state.error ? (
              <Typography variant="body2" className="text-red-600 mb-0">
                {t.login.error}
              </Typography>
            ) : null}
          </Flex>
        </Card>
      </div>
    </Layout>
  );
};
