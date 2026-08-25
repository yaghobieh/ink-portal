import { BIFROST_API_URL, INK_API_URL } from '@const/billing.const';
import { EMPTY_STRING } from '@const/strings.const';
import { NUMBER_ZERO } from '@const/numbers.const';
import { BIFROST_VERSION_PATH, CMS_VERSION_PATH } from './version.const';
import type { VersionInfo } from './version.types';

export const EMPTY_VERSION_INFO: VersionInfo = {
  product: EMPTY_STRING,
  version: EMPTY_STRING,
  ink: EMPTY_STRING,
  portal: EMPTY_STRING,
  node: EMPTY_STRING,
  platform: EMPTY_STRING,
  arch: EMPTY_STRING,
  env: EMPTY_STRING,
  uptimeSec: NUMBER_ZERO,
  docker: {
    running: false,
    hostname: EMPTY_STRING,
    image: EMPTY_STRING,
    containerName: EMPTY_STRING,
  },
  build: {
    sha: EMPTY_STRING,
    time: EMPTY_STRING,
    number: EMPTY_STRING,
  },
};

const isVersionInfo = (value: unknown): value is VersionInfo => {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const record = value as Record<string, unknown>;
  return typeof record.version === 'string' && typeof record.ink === 'string';
};

const fetchFrom = async (url: string): Promise<VersionInfo | null> => {
  if (!url) {
    return null;
  }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    const data: unknown = await response.json();
    if (!isVersionInfo(data)) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
};

let pending: Promise<VersionInfo> | null = null;

const loadVersionInfo = async (): Promise<VersionInfo> => {
  const fromBifrost = await fetchFrom(`${BIFROST_API_URL}${BIFROST_VERSION_PATH}`);
  if (fromBifrost) {
    return fromBifrost;
  }
  const fromCms = await fetchFrom(`${INK_API_URL}${CMS_VERSION_PATH}`);
  if (fromCms) {
    return fromCms;
  }
  return EMPTY_VERSION_INFO;
};

export const fetchVersionInfo = (): Promise<VersionInfo> => {
  if (!pending) {
    pending = loadVersionInfo();
  }
  return pending;
};
