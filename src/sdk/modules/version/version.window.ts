import type { VersionInfo } from './version.types';

declare global {
  interface Window {
    version?: VersionInfo;
  }
}

export const bindWindowVersion = (info: VersionInfo): void => {
  window.version = info;
};
