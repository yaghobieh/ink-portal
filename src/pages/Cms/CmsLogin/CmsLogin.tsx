import { useEffect, useState, type FC, type FormEvent } from 'react';
import { useNavigate } from '@forgedevstack/forge-compass/react';
import { useNucleus } from '@forgedevstack/synapse';
import { Button, Flex, Input, Typography } from '@forgedevstack/bear';
import { useAuth } from '@hooks/index';
import { useI18n } from '@i18n/index';
import { ROUTES } from '@const/index';
import { authNucleus } from '@sdk/index';
import { CMS_LOGIN_PASSWORD_INITIAL, CMS_LOGIN_USERNAME_INITIAL } from './CmsLogin.const';

export const CmsLogin: FC = () => {
  const { t } = useI18n();
  const { navigate } = useNavigate();
  const { setToken, setUserFromLogin, isAuthenticated } = useAuth();
  const { login, loading, error, token, user } = useNucleus(authNucleus);
  const [username, setUsername] = useState(CMS_LOGIN_USERNAME_INITIAL);
  const [password, setPassword] = useState(CMS_LOGIN_PASSWORD_INITIAL);

  useEffect(() => {
    if (isAuthenticated || token) {
      navigate(ROUTES.CMS, { replace: true });
    }
  }, [isAuthenticated, token, navigate]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const ok = await login(username, password);
    if (!ok) return;
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

  return (
    <div className="ink-cms-login">
      <div className="ink-cms-login__card">
        <Flex direction="column" gap={4}>
          <Typography variant="h1" className="ink-cms-login__title text-3xl font-bold tracking-tight mb-0">
            {t.cmsShell.loginTitle}
          </Typography>
          <Typography variant="body1" className="ink-cms__muted mb-0">
            {t.cmsShell.loginDescription}
          </Typography>
          <form className="ink-cms-login__form" onSubmit={onSubmit}>
            <Flex direction="column" gap={3}>
              <Input
                id="ink-cms-login-username"
                label={t.login.username}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
              <Input
                id="ink-cms-login-password"
                type="password"
                label={t.login.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <Button type="submit" variant="ink" disabled={loading}>
                {loading ? t.login.signingIn : t.login.signIn}
              </Button>
            </Flex>
          </form>
          {error ? (
            <Typography variant="body2" className="ink-cms-dashboard__error mb-0">
              {t.login.error}
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
