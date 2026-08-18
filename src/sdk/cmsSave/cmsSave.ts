import { CMS_SAVE_EVENT_NAME } from './cmsSave.const';
import type { CmsSavePayload } from './cmsSave.types';

export const dispatchCmsSave = (payload: CmsSavePayload): void => {
  window.dispatchEvent(new CustomEvent<CmsSavePayload>(CMS_SAVE_EVENT_NAME, { detail: payload }));
};

export const subscribeCmsSave = (
  listener: (payload: CmsSavePayload) => void,
): (() => void) => {
  const onSave = (event: Event) => {
    const custom = event as CustomEvent<CmsSavePayload>;
    if (!custom.detail) return;
    listener(custom.detail);
  };
  window.addEventListener(CMS_SAVE_EVENT_NAME, onSave);
  return () => window.removeEventListener(CMS_SAVE_EVENT_NAME, onSave);
};
