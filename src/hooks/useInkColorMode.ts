import { useBear } from '@forgedevstack/bear';

export type InkPortalColorMode = 'light' | 'dark';

export const useInkColorMode = (): InkPortalColorMode => {
  const { mode } = useBear();
  return mode === 'dark' ? 'dark' : 'light';
};
