export const CMS_LOOK_IDS = {
  COSMIC: 'cosmic',
  MIDNIGHT: 'midnight',
  AURORA: 'aurora',
  DUSK: 'dusk',
  SAND: 'sand',
  SLATE: 'slate',
} as const;

export type CmsLookId = (typeof CMS_LOOK_IDS)[keyof typeof CMS_LOOK_IDS];

export const CMS_LOOK_DEFAULT: CmsLookId = 'cosmic';
