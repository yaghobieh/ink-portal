import { useEffect, useState, type FC, type FormEvent } from 'react';
import { useNavigate } from '@forgedevstack/forge-compass/react';
import { useNucleus } from '@forgedevstack/synapse';
import { Button, Flex, Input, Typography } from '@forgedevstack/bear';
import { useAuth } from '@hooks/index';
import {
  AUTH_GITHUB_PATH,
  AUTH_GOOGLE_PATH,
} from '@hooks/auth.const';
import type { GoogleAuthStartResponse } from '@hooks/auth.types';
import { useI18n } from '@i18n/index';
import { AUTH_OAUTH_TOKEN_PARAM, INK_API_URL, ROUTES } from '@const/index';
import { authNucleus } from '@sdk/index';
import {
  CMS_AUTH_MODE,
  CMS_LOGIN_EMAIL_INITIAL,
  CMS_LOGIN_NAME_INITIAL,
  CMS_LOGIN_PASSWORD_INITIAL,
  CMS_LOGIN_USERNAME_INITIAL,
  CMS_OAUTH_GITHUB,
  CMS_OAUTH_GOOGLE,
} from './CmsLogin.const';

export const CmsLogin: FC = () => {
  const { t } = useI18n();
  const { navigate } = useNavigate();
  const { setToken, setUserFromLogin, isAuthenticated } = useAuth();
  const { login, register, loading, error, token, user } = useNucleus(authNucleus);
  const [mode, setMode] = useState<(typeof CMS_AUTH_MODE)[keyof typeof CMS_AUTH_MODE]>(
    CMS_AUTH_MODE.LOGIN,
  );
  const [username, setUsername] = useState(CMS_LOGIN_USERNAME_INITIAL);
  const [password, setPassword] = useState(CMS_LOGIN_PASSWORD_INITIAL);
  const [name, setName] = useState(CMS_LOGIN_NAME_INITIAL);
  const [email, setEmail] = useState(CMS_LOGIN_EMAIL_INITIAL);
  const [oauthError, setOauthError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const oauthToken = params.get(AUTH_OAUTH_TOKEN_PARAM);
    if (!oauthToken) return;
    setToken(oauthToken);
    params.delete(AUTH_OAUTH_TOKEN_PARAM);
    const next = `${window.location.pathname}${params.toString() ? `?${params}` : ''}`;
    window.history.replaceState({}, '', next);
  }, [setToken]);

  useEffect(() => {
    if (isAuthenticated || token) {
      navigate(ROUTES.CMS, { replace: true });
    }
  }, [isAuthenticated, token, navigate]);

  const applySession = () => {
    const state = authNucleus.get();
    if (state.token) setToken(state.token);
    if (state.user) {
      setUserFromLogin({
        id: state.user.id,
        email: state.user.email,
        name: state.user.name,
        username: state.user.username,
        plan: state.user.plan,
        premium: state.user.premium,
        role: state.user.role,
      });
    }
    setPassword(CMS_LOGIN_PASSWORD_INITIAL);
    navigate(ROUTES.CMS);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (mode === CMS_AUTH_MODE.REGISTER) {
      const ok = await register({
        email,
        name,
        password,
        username: username || undefined,
      });
      if (!ok) return;
      applySession();
      return;
    }
    const ok = await login(username, password);
    if (!ok) return;
    applySession();
  };

  const onOauth = async (provider: typeof CMS_OAUTH_GOOGLE | typeof CMS_OAUTH_GITHUB) => {
    setOauthError(false);
    try {
      if (!INK_API_URL) {
        setOauthError(true);
        return;
      }
      const path = provider === CMS_OAUTH_GITHUB ? AUTH_GITHUB_PATH : AUTH_GOOGLE_PATH;
      const response = await fetch(`${INK_API_URL}${path}`);
      if (!response.ok) {
        setOauthError(true);
        return;
      }
      const data = (await response.json()) as GoogleAuthStartResponse;
      if (!data.url) {
        setOauthError(true);
        return;
      }
      window.location.href = data.url;
    } catch {
      setOauthError(true);
    }
  };

  const isRegister = mode === CMS_AUTH_MODE.REGISTER;

  return (
    <div className="ink-cms-login">
      <div className="ink-cms-login__card">
        <Flex direction="column" gap={4}>
          <Typography variant="h1" className="ink-cms-login__title text-3xl font-bold tracking-tight mb-0">
            {isRegister ? t.cmsShell.registerTitle : t.cmsShell.loginTitle}
          </Typography>
          <Typography variant="body1" className="ink-cms__muted mb-0">
            {isRegister ? t.cmsShell.registerDescription : t.cmsShell.loginDescription}
          </Typography>
          <Flex direction="column" gap={2} className="ink-cms-login__oauth">
            <Button
              type="button"
              variant="outline"
              onClick={() => void onOauth(CMS_OAUTH_GOOGLE)}
            >
              {t.login.google}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => void onOauth(CMS_OAUTH_GITHUB)}
            >
              {t.login.github}
            </Button>
          </Flex>
          <Typography variant="caption" className="ink-cms-login__divider mb-0">
            {t.login.oauthDivider}
          </Typography>
          <form className="ink-cms-login__form" onSubmit={onSubmit}>
            <Flex direction="column" gap={3}>
              {isRegister ? (
                <>
                  <Input
                    id="ink-cms-register-name"
                    label={t.login.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    required
                  />
                  <Input
                    id="ink-cms-register-email"
                    type="email"
                    label={t.login.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </>
              ) : null}
              <Input
                id="ink-cms-login-username"
                label={t.login.username}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required={!isRegister}
              />
              <Input
                id="ink-cms-login-password"
                type="password"
                label={t.login.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={isRegister ? 'new-password' : 'current-password'}
                required
              />
              <Button type="submit" variant="ink" disabled={loading}>
                {loading
                  ? isRegister
                    ? t.login.registering
                    : t.login.signingIn
                  : isRegister
                    ? t.login.register
                    : t.login.signIn}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setMode(isRegister ? CMS_AUTH_MODE.LOGIN : CMS_AUTH_MODE.REGISTER)
                }
              >
                {isRegister ? t.login.haveAccount : t.login.needAccount}
              </Button>
            </Flex>
          </form>
          {error || oauthError ? (
            <Typography variant="body2" className="ink-cms-dashboard__error mb-0">
              {isRegister ? t.login.registerError : t.login.error}
            </Typography>
          ) : null}
          {user ? (
            <Typography variant="caption" className="ink-cms__muted mb-0">
              {user.email}
            </Typography>
          ) : null}
        </Flex>
      </div>
    </div>
  );
};
