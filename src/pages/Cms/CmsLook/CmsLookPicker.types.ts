import type { CmsLookId } from './cmsLook.types';

export type CmsLookPickerProps = {
  value: CmsLookId;
  onChange: (look: CmsLookId) => void;
};
