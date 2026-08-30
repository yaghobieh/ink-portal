import type { Messages } from '@i18n/types';
import type { CmsLookId } from '@const/look.const';
import { CMS_LOOK_LABEL_KEY } from '@pages/Cms/CmsLook/cmsLook.const';

export const lookLabel = (id: CmsLookId, lookCopy: Messages['cmsLook']): string =>
  lookCopy[CMS_LOOK_LABEL_KEY[id]];
