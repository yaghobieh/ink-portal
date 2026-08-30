import { CMS_LOOK_DEFAULT, CMS_LOOK_IDS } from '@const/look.const';
import type { CmsLookId } from '@const/look.const';
import { CMS_LOOK_STORAGE_KEY } from '@const/strings.const';
import { readStorage, writeStorage } from '@utils';
import { CMS_LOOKS } from './cmsLook.const';
import type { CmsLookDefinition } from './cmsLook.types';

const LOOK_BY_ID: ReadonlyMap<CmsLookId, CmsLookDefinition> = new Map(
  CMS_LOOKS.map((entry) => [entry.id, entry]),
);

const isLookId = (value: string): value is CmsLookId =>
  (Object.values(CMS_LOOK_IDS) as string[]).includes(value);

export const loadCmsLook = (): CmsLookId => {
  const raw = readStorage(CMS_LOOK_STORAGE_KEY);
  if (raw && isLookId(raw)) return raw;
  return CMS_LOOK_DEFAULT;
};

export const saveCmsLook = (look: CmsLookId): void => {
  writeStorage(CMS_LOOK_STORAGE_KEY, look);
};

export const lookDefinition = (look: CmsLookId): CmsLookDefinition =>
  LOOK_BY_ID.get(look) ?? CMS_LOOKS[0];
