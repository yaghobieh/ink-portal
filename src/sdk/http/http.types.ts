export type ApiErrorMode = 'toast' | 'modal';

export type ApiErrorPayload = {
  mode: ApiErrorMode;
  message: string;
};

export type RequestWithErrorOptions = {
  mode?: ApiErrorMode;
  message?: string;
  onError?: (payload: ApiErrorPayload) => void;
};
