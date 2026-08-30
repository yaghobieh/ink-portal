import type { ApiErrorCode } from './http.types';

export type ClientAlert = {
  id: string;
  code: ApiErrorCode | 'generic';
  title: string;
  body: string;
  href: string;
  severity: 'error';
  readAt: string | null;
  createdAt: string;
};

type ClientAlertListener = (items: ClientAlert[]) => void;

let items: ClientAlert[] = [];
let listener: ClientAlertListener | null = null;

export const subscribeClientAlerts = (next: ClientAlertListener): (() => void) => {
  listener = next;
  next(items);
  return () => {
    if (listener === next) listener = null;
  };
};

export const pushClientAlert = (input: {
  code?: ApiErrorCode;
  title: string;
  body: string;
  href: string;
}): void => {
  const code = input.code ?? 'generic';
  const createdAt = new Date().toISOString();
  const alert: ClientAlert = {
    id: `client-${code}`,
    code,
    title: input.title,
    body: input.body,
    href: input.href,
    severity: 'error',
    readAt: null,
    createdAt,
  };
  items = [alert, ...items.filter((item) => item.code !== code)];
  listener?.(items);
};

export const markClientAlertRead = (id: string): void => {
  const readAt = new Date().toISOString();
  items = items.map((item) => (item.id === id ? { ...item, readAt } : item));
  listener?.(items);
};

export const unreadClientAlertCount = (): number =>
  items.filter((item) => !item.readAt).length;
