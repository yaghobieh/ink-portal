import { useEffect, useState, type FC } from 'react';
import { Button, Card, Flex, Spinner, Typography } from '@forgedevstack/bear';
import { Layout } from '@components/Layout';
import {
  AUTH_BEARER_PREFIX,
  AUTH_GOOGLE_PATH,
  AUTH_HEADER_AUTHORIZATION,
  AUTH_ME_PATH,
  AUTH_USAGE_PATH,
} from '@hooks/auth.const';
import type { GoogleAuthStartResponse, MeResponse, UsageResponse } from '@hooks/auth.types';
import { useAuth } from '@hooks/useAuth';
import { useI18n } from '@i18n/index';
import { INK_API_URL } from '@const/index';
import { LOGIN_INITIAL_STATE, LOGIN_STATS_INITIAL_STATE } from './Login.const';
import { formatTokenUsage, formatUsagePeriod } from './Login.utils';
import type { LoginStatsState } from './Login.types';

export const Login: FC = () => {
  const { t } = useI18n();
  const { token, isAuthenticated, clearToken } = useAuth();
  const [state, setState] = useState(LOGIN_INITIAL_STATE);
  const [stats, setStats] = useState<LoginStatsState>(LOGIN_STATS_INITIAL_STATE);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      setStats(LOGIN_STATS_INITIAL_STATE);
      return;
    }

    let cancelled = false;

    const loadStats = async () => {
      setStats({ ...LOGIN_STATS_INITIAL_STATE, loading: true });
      if (!INK_API_URL) {
        if (!cancelled) {
          setStats({ ...LOGIN_STATS_INITIAL_STATE, error: true });
        }
        return;
      }

      const headers = {
        [AUTH_HEADER_AUTHORIZATION]: `${AUTH_BEARER_PREFIX}${token}`,
      };

      try {
        const [meResult, usageResult] = await Promise.all([
          fetch(`${INK_API_URL}${AUTH_ME_PATH}`, { headers }),
          fetch(`${INK_API_URL}${AUTH_USAGE_PATH}`, { headers }),
        ]);

        let user: MeResponse['user'] | null = null;
        let usage: UsageResponse | null = null;

        if (meResult.ok) {
          const meData = (await meResult.json()) as MeResponse;
          user = meData.user ?? null;
        }

        if (usageResult.ok) {
          usage = (await usageResult.json()) as UsageResponse;
        }

        if (cancelled) return;

        if (!user && !usage) {
          setStats({ ...LOGIN_STATS_INITIAL_STATE, error: true });
          return;
        }

        setStats({
          loading: false,
          error: !user || !usage,
          user,
          usage,
        });
      } catch {
        if (!cancelled) {
          setStats({ ...LOGIN_STATS_INITIAL_STATE, error: true });
        }
      }
    };

    void loadStats();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, token]);

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
              {isAuthenticated ? t.login.statsTitle : t.login.title}
            </Typography>
            <Typography variant="body1" className="ink-text-muted mb-0">
              {isAuthenticated ? t.login.statsDescription : t.login.description}
            </Typography>

            {isAuthenticated ? (
              <>
                {stats.loading ? (
                  <Flex align="center" gap={2}>
                    <Spinner size="sm" />
                    <Typography variant="body2" className="mb-0">
                      {t.login.statsLoading}
                    </Typography>
                  </Flex>
                ) : null}

                {stats.error ? (
                  <Typography variant="body2" className="text-red-600 mb-0">
                    {t.login.statsError}
                  </Typography>
                ) : null}

                {stats.user ? (
                  <Flex direction="column" gap={2}>
                    <Typography variant="body2" className="mb-0">
                      {t.login.name}: {stats.user.name}
                    </Typography>
                    <Typography variant="body2" className="mb-0">
                      {t.login.email}: {stats.user.email}
                    </Typography>
                    <Typography variant="body2" className="mb-0">
                      {t.login.plan}: {stats.user.plan}
                    </Typography>
                  </Flex>
                ) : null}

                {stats.usage ? (
                  <Flex direction="column" gap={2}>
                    <Typography variant="body2" className="mb-0">
                      {t.login.tokens}:{' '}
                      {formatTokenUsage(stats.usage.tokensUsed, stats.usage.tokensLimit)}
                    </Typography>
                    <Typography variant="body2" className="mb-0">
                      {t.login.period}:{' '}
                      {formatUsagePeriod(stats.usage.periodStart, stats.usage.periodEnd)}
                    </Typography>
                  </Flex>
                ) : null}

                <Button variant="outline" onClick={clearToken}>
                  {t.login.signOut}
                </Button>
              </>
            ) : (
              <>
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
              </>
            )}
          </Flex>
        </Card>
      </div>
    </Layout>
  );
};
