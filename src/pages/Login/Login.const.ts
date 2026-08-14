import type { LoginPageState, LoginStatsState } from './Login.types';

export const LOGIN_INITIAL_STATE: LoginPageState = {
  loading: false,
  error: false,
};

export const LOGIN_STATS_INITIAL_STATE: LoginStatsState = {
  loading: false,
  error: false,
  user: null,
  usage: null,
};

export const LOGIN_PERIOD_SEPARATOR = ' – ';
export const LOGIN_USERNAME_INITIAL = '';
export const LOGIN_PASSWORD_INITIAL = '';
