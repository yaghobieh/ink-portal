import type { CmsLookId } from '@const/look.const';

export type { CmsLookId };

export type CmsLookDefinition = {
  id: CmsLookId;
  primary: string;
  accent: string;
  background: string;
};
