export type UseApiInit = {
  method?: string;
  headers?: Record<string, string>;
  body?: string | FormData;
  data?: unknown;
};
