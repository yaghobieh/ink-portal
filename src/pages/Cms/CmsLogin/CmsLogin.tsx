import { useEffect, useState, type FC, type FormEvent } from 'react';
import { useNavigate } from '@forgedevstack/forge-compass/react';
import { useNucleus } from '@forgedevstack/synapse';
import { Alert, Button, Flex, Input, Typography } from '@forgedevstack/bear';
import { useAuth } from '@hooks/index';
import { AUTH_GITHUB_PATH, AUTH_GOOGLE_PATH } from '@hooks/auth.const';
import type { GoogleAuthStartResponse } from '@hooks/auth.types';
import { useI18n } from '@i18n/index';
import { AUTH_OAUTH_TOKEN_PARAM, ROUTES } from '@const/index';
import { SPACE_STRING } from '@const/generals.const';
import { authNucleus } from '@sdk/index';
import {
  CMS_AUTH_MODE,
  CMS_LOGIN_EMAIL_INITIAL,
  CMS_LOGIN_NAME_INITIAL,
  CMS_LOGIN_PASSWORD_INITIAL,
  CMS_LOGIN_TERMS_UNCHECKED,
  CMS_OAUTH_GITHUB,
  CMS_OAUTH_GOOGLE,
} from './CmsLogin.const';
import { cmsLoginApiUrl, cmsLoginInitialPassword, cmsLoginInitialUsername } from './CmsLogin.utils';
import { GithubMark, GoogleMark } from './CmsLogin.icons';
import { CmsLoginBrand } from './helpers/CmsLoginBrand';

export const CmsLogin: FC = () => {
  const { t } = useI18n();
  const { navigate } = useNavigate();
  const { setToken, setUserFromLogin, isAuthenticated } = useAuth();
  const { login, register, loading, error, user } = useNucleus(authNucleus);
  const [mode, setMode] = useState<(typeof CMS_AUTH_MODE)[keyof typeof CMS_AUTH_MODE]>(
    CMS_AUTH_MODE.LOGIN,
  );
  const [username, setUsername] = useState(cmsLoginInitialUsername());
  const [password, setPassword] = useState(cmsLoginInitialPassword());
  const [firstName, setFirstName] = useState(CMS_LOGIN_NAME_INITIAL);
  const [lastName, setLastName] = useState(CMS_LOGIN_NAME_INITIAL);
  const [email, setEmail] = useState(CMS_LOGIN_EMAIL_INITIAL);
  const [termsAccepted, setTermsAccepted] = useState(CMS_LOGIN_TERMS_UNCHECKED);
  const [oauthError, setOauthError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const oauthToken = params.get(AUTH_OAUTH_TOKEN_PARAM);
    if (!oauthToken) {
      return;
    }
    setToken(oauthToken);
    params.delete(AUTH_OAUTH_TOKEN_PARAM);
    const next = `${window.location.pathname}${params.toString() ? `?${params}` : ''}`;
    window.history.replaceState({}, '', next);
  }, [setToken]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.CMS, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const applySession = () => {
    const state = authNucleus.get();
    if (state.token) {
      setToken(state.token);
    }
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
      if (!termsAccepted) {
        return;
      }
      const name = `${firstName}${SPACE_STRING}${lastName}`.trim();
      const ok = await register({
        email,
        name,
        password,
        username: username || undefined,
      });
      if (!ok) {
        return;
      }
      applySession();
      return;
    }
    const ok = await login(username, password);
    if (!ok) {
      return;
    }
    applySession();
  };

  const onOauth = async (provider: typeof CMS_OAUTH_GOOGLE | typeof CMS_OAUTH_GITHUB) => {
    setOauthError(false);
    const path = provider === CMS_OAUTH_GITHUB ? AUTH_GITHUB_PATH : AUTH_GOOGLE_PATH;
    const url = cmsLoginApiUrl(path);
    if (!url) {
      setOauthError(true);
      return;
    }
    try {
      const response = await fetch(url);
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
  const showError = Boolean(error || oauthError);
  const errorText = isRegister ? t.login.registerError : t.login.error;
  let submitLabel = t.login.signIn;
  if (loading) {
    submitLabel = isRegister ? t.login.registering : t.login.signingIn;
  } else if (isRegister) {
    submitLabel = t.login.signUp;
  }

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
              {isRegister ? t.cmsShell.registerTitle : t.cmsShell.loginTitle}
            </Typography>
            <Typography variant="body2" className="ink-cms-login__lead mb-0">
              {isRegister ? t.cmsShell.registerDescription : t.login.description}
            </Typography>
            {showError && (
              <Alert severity="error" variant="outlined">
                {errorText}
              </Alert>
            )}
            <form className="ink-cms-login__form" onSubmit={onSubmit}>
              <Flex direction="column" gap={3}>
                {isRegister && (
                  <Flex gap={2} className="ink-cms-login__names">
                    <Input
                      id="ink-cms-register-first"
                      label={t.login.firstName}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      autoComplete="given-name"
                      required
                    />
                    <Input
                      id="ink-cms-register-last"
                      label={t.login.lastName}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      autoComplete="family-name"
                      required
                    />
                  </Flex>
                )}
                {isRegister && (
                  <Input
                    id="ink-cms-register-email"
                    type="email"
                    label={t.login.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                )}
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
                {isRegister && (
                  <label className="ink-cms-login__terms">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      required
                    />
                    <span>
                      {t.login.agreeTerms}
                      {SPACE_STRING}
                      <a href={ROUTES.TERMS}>{t.login.terms}</a>
                    </span>
                  </label>
                )}
                <Button type="submit" className="ink-cms-login__submit" disabled={loading}>
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
                onClick={() => void onOauth(CMS_OAUTH_GOOGLE)}
              >
                {t.login.google}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="ink-cms-login__oauth-btn"
                icon={<GithubMark />}
                onClick={() => void onOauth(CMS_OAUTH_GITHUB)}
              >
                {t.login.github}
              </Button>
            </Flex>
            <Typography variant="body2" className="ink-cms-login__register mb-0">
              {isRegister ? t.login.haveAccount : t.login.needAccount}
              {SPACE_STRING}
              <button
                type="button"
                className="ink-cms-login__register-btn"
                onClick={() =>
                  setMode(isRegister ? CMS_AUTH_MODE.LOGIN : CMS_AUTH_MODE.REGISTER)
                }
              >
                {isRegister ? t.login.signIn : t.login.register}
              </button>
            </Typography>
            {user && (
              <Typography variant="caption" className="ink-cms__muted mb-0">
                {user.email}
              </Typography>
            )}
          </Flex>
        </div>
      </div>
    </div>
  );
};
