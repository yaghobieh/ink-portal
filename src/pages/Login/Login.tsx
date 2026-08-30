import { useEffect, useState, type FC, type FormEvent } from 'react';
import { useNavigate } from '@forgedevstack/forge-compass/react';
import { Alert, Button, Flex, Input, Spinner, Typography } from '@forgedevstack/bear';
import {
  AUTH_BEARER_PREFIX,
  AUTH_GITHUB_PATH,
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
} from './Login.const';
import { formatTokenUsage, formatUsagePeriod } from './Login.utils';
import type { LoginStatsState } from './Login.types';
import { cmsLoginInitialPassword, cmsLoginInitialUsername } from '@pages/Cms/CmsLogin/CmsLogin.utils';
import { GithubMark, GoogleMark } from '@pages/Cms/CmsLogin/CmsLogin.icons';
import { CmsLoginBrand } from '@pages/Cms/CmsLogin/helpers/CmsLoginBrand';

export const Login: FC = () => {
  const { t } = useI18n();
  const { token, isAuthenticated, setToken, clearToken, setUserFromLogin } = useAuth();
  const { navigate } = useNavigate();
  const [state, setState] = useState(LOGIN_INITIAL_STATE);
  const [username, setUsername] = useState(cmsLoginInitialUsername());
  const [password, setPassword] = useState(cmsLoginInitialPassword());
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

  const startOauth = async (path: string) => {
    setState({ loading: true, error: false });
    try {
      const response = await fetch(`${INK_API_URL}${path}`);
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

  const onGoogleLogin = async () => {
    await startOauth(AUTH_GOOGLE_PATH);
  };

  const onGithubLogin = async () => {
    await startOauth(AUTH_GITHUB_PATH);
  };

  const submitLabel = state.loading ? t.login.signingIn : t.login.signIn;

  return (
    <div className="ink-cms-login">
      <div className="ink-cms-login__split">
        <CmsLoginBrand
          brand={t.cmsShell.brand}
          headline={t.cmsShell.loginHeadline}
          body={t.cmsShell.loginBrandBody}
          quote={t.cmsShell.loginQuote}
          quoteBy={t.cmsShell.loginQuoteBy}
        />
        <div className="ink-cms-login__form-panel">
          <Flex direction="column" gap={3} className="ink-cms-login__formbox">
            <Typography variant="h3" className="ink-cms-login__title mb-0">
              {isAuthenticated ? t.login.statsTitle : t.cmsShell.loginTitle}
            </Typography>
            <Typography variant="body2" className="ink-cms-login__lead mb-0">
              {isAuthenticated ? t.login.statsDescription : t.login.description}
            </Typography>
            {isAuthenticated ? (
              <Flex direction="column" gap={3}>
                {stats.loading && (
                  <Flex align="center" gap={2}>
                    <Spinner size="sm" />
                    <Typography variant="body2" className="mb-0">
                      {t.login.statsLoading}
                    </Typography>
                  </Flex>
                )}
                {stats.error && (
                  <Alert severity="error" variant="outlined">
                    {t.login.statsError}
                  </Alert>
                )}
                {stats.user && (
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
                )}
                {stats.usage && (
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
                )}
                <Button className="ink-cms-login__submit" onClick={() => navigate(ROUTES.CMS)}>
                  {t.login.openCms}
                </Button>
                <Button variant="outline" onClick={clearToken}>
                  {t.login.signOut}
                </Button>
              </Flex>
            ) : (
              <Flex direction="column" gap={3}>
                {state.error && (
                  <Alert severity="error" variant="outlined">
                    {t.login.error}
                  </Alert>
                )}
                <form className="ink-cms-login__form" onSubmit={onPasswordLogin}>
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
                    <Button type="submit" className="ink-cms-login__submit" disabled={state.loading}>
                      {submitLabel}
                    </Button>
                  </Flex>
                </form>
                <div className="ink-cms-login__divider">
                  <span className="ink-cms-login__divider-line" />
                  <Typography variant="caption" className="ink-cms-login__divider-label mb-0">
                    {t.login.oauthDivider}
                  </Typography>
                  <span className="ink-cms-login__divider-line" />
                </div>
                <Flex direction="column" gap={2} className="ink-cms-login__oauth">
                  <Button
                    type="button"
                    variant="outline"
                    className="ink-cms-login__oauth-btn"
                    icon={<GoogleMark />}
                    onClick={() => void onGoogleLogin()}
                    disabled={state.loading}
                  >
                    {t.login.google}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="ink-cms-login__oauth-btn"
                    icon={<GithubMark />}
                    onClick={() => void onGithubLogin()}
                    disabled={state.loading}
                  >
                    {t.login.github}
                  </Button>
                </Flex>
              </Flex>
            )}
          </Flex>
        </div>
      </div>
    </div>
  );
};
