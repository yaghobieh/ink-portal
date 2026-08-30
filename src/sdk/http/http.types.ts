export type ApiErrorMode = 'page' | 'modal' | 'snackbar' | 'toast';

export type ApiErrorCode =
  | 'live-analytics'
  | 'current-user'
  | 'pages'
  | 'page-content'
  | 'content'
  | 'crew'
  | 'notifications'
  | 'plans'
  | 'media';

export type ApiErrorPayload = {
  mode: ApiErrorMode;
  message: string;
  code?: ApiErrorCode;
  href?: string;
  url?: string;
  status?: number;
  reason?: string;
  response?: string;
};

export type UseApiOptions = {
  mode?: ApiErrorMode;
  message?: string;
  code?: ApiErrorCode;
  href?: string;
  silent?: boolean;
  onError?: (payload: ApiErrorPayload) => void;
};

export type RequestWithErrorOptions = UseApiOptions;
