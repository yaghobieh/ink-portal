import { useEffect, useState, type FC, type FormEvent } from 'react';
import { useNavigate } from '@forgedevstack/forge-compass/react';
import { Button, Flex, Input, Spinner, Typography } from '@forgedevstack/bear';
import { Layout } from '@components/Layout';
import {
  AUTH_BEARER_PREFIX,
  AUTH_GOOGLE_PATH,
  AUTH_HEADER_AUTHORIZATION,
  AUTH_LOGIN_PATH,
  AUTH_ME_PATH,
  AUTH_USAGE_PATH,
} from '@hooks/auth.const';
import type {
  GoogleAuthStartResponse,
  MeResponse,
  MeUser,
  UsageResponse,
} from '@hooks/auth.types';
import { useAuth } from '@hooks/useAuth';
import { useI18n } from '@i18n/index';
import { INK_API_URL, ROUTES } from '@const/index';
import {
  LOGIN_INITIAL_STATE,
  LOGIN_PASSWORD_INITIAL,
  LOGIN_STATS_INITIAL_STATE,
  LOGIN_USERNAME_INITIAL,
} from './Login.const';
import { formatTokenUsage, formatUsagePeriod } from './Login.utils';
import type { LoginStatsState } from './Login.types';

export const Login: FC = () => {
  const { t } = useI18n();
  const { token, isAuthenticated, setToken, clearToken, setUserFromLogin } = useAuth();
  const { navigate } = useNavigate();
  const [state, setState] = useState(LOGIN_INITIAL_STATE);
  const [username, setUsername] = useState(LOGIN_USERNAME_INITIAL);
  const [password, setPassword] = useState(LOGIN_PASSWORD_INITIAL);
  const [stats, setStats] = useState<LoginStatsState>(LOGIN_STATS_INITIAL_STATE);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const oauthToken = params.get('token');
    if (oauthToken) {
      setToken(oauthToken);
      params.delete('token');
      const next = `${window.location.pathname}${params.toString() ? `?${params}` : ''}`;
      window.history.replaceState({}, '', next);
    }
  }, [setToken]);

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

  const onPasswordLogin = async (event: FormEvent) => {
    event.preventDefault();
    setState({ loading: true, error: false });
    try {
      if (!INK_API_URL) {
        setState({ loading: false, error: true });
        return;
      }
      const response = await fetch(`${INK_API_URL}${AUTH_LOGIN_PATH}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        setState({ loading: false, error: true });
        return;
      }
      const data = (await response.json()) as { token?: string; user?: MeUser };
      if (!data.token) {
        setState({ loading: false, error: true });
        return;
      }
      if (data.user) setUserFromLogin(data.user);
      setToken(data.token);
      setPassword(LOGIN_PASSWORD_INITIAL);
      setState({ loading: false, error: false });
      navigate(ROUTES.CMS);
    } catch {
      setState({ loading: false, error: true });
    }
  };

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
        <div className="ink-login-card p-8">
          <Flex direction="column" gap={4}>
            <Typography variant="h1" className="ink-login-card__title text-3xl font-bold tracking-tight mb-0">
              {isAuthenticated ? t.login.statsTitle : t.login.title}
            </Typography>
            <Typography variant="body1" className="ink-login-card__body mb-0">
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

                <Button variant="ink" onClick={() => navigate(ROUTES.CMS)}>
                  {t.login.openCms}
                </Button>
                <Button variant="outline" onClick={clearToken}>
                  {t.login.signOut}
                </Button>
              </>
            ) : (
              <>
                <form className="ink-login-form" onSubmit={onPasswordLogin}>
                  <Flex direction="column" gap={3}>
                    <Input
                      id="ink-login-username"
                      label={t.login.username}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="username"
                      required
                    />
                    <Input
                      id="ink-login-password"
                      type="password"
                      label={t.login.password}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                    />
                    <Button type="submit" variant="ink" disabled={state.loading}>
                      {state.loading ? t.login.signingIn : t.login.signIn}
                    </Button>
                  </Flex>
                </form>
                <Button variant="inkOutline" onClick={onGoogleLogin} disabled={state.loading}>
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
        </div>
      </div>
    </Layout>
  );
};
