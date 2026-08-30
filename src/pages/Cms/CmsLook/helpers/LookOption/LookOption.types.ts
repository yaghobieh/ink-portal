import type { CmsLookId } from '@const/look.const';

export type LookOptionProps = {
  id: CmsLookId;
  label: string;
  selected: boolean;
  primary: string;
  onSelect: (id: CmsLookId) => void;
};
