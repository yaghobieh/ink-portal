import { CMS_LOOK_IDS } from '@const/look.const';
import type { CmsLookId } from '@const/look.const';
import type { CmsLookDefinition } from './cmsLook.types';
import type { Messages } from '@i18n/types';

export const CMS_LOOKS: readonly CmsLookDefinition[] = [
  {
    id: CMS_LOOK_IDS.COSMIC,
    primary: 'var(--bear-primary-300)',
    accent: 'var(--bear-primary-500)',
    background: 'var(--bear-neutral-950)',
  },
  {
    id: CMS_LOOK_IDS.MIDNIGHT,
    primary: 'var(--bear-info-500)',
    accent: 'var(--bear-info-600)',
    background: 'var(--bear-secondary-950)',
  },
  {
    id: CMS_LOOK_IDS.AURORA,
    primary: 'var(--bear-success-500)',
    accent: 'var(--bear-primary-400)',
    background: 'var(--bear-neutral-950)',
  },
  {
    id: CMS_LOOK_IDS.DUSK,
    primary: 'var(--bear-danger-500)',
    accent: 'var(--bear-danger-600)',
    background: 'var(--bear-neutral-900)',
  },
  {
    id: CMS_LOOK_IDS.SAND,
    primary: 'var(--bear-warning-500)',
    accent: 'var(--bear-warning-700)',
    background: 'var(--bear-neutral-900)',
  },
  {
    id: CMS_LOOK_IDS.SLATE,
    primary: 'var(--bear-secondary-400)',
    accent: 'var(--bear-secondary-500)',
    background: 'var(--bear-secondary-900)',
  },
];

export const CMS_LOOK_LABEL_KEY: Record<CmsLookId, keyof Messages['cmsLook']> = {
  cosmic: 'cosmic',
  midnight: 'midnight',
  aurora: 'aurora',
  dusk: 'dusk',
  sand: 'sand',
  slate: 'slate',
};

export const CMS_LOOK_VARIANT_INK = 'ink';
export const CMS_LOOK_VARIANT_OUTLINE = 'outline';
