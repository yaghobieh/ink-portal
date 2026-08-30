import type { CastField } from '@pages/Cms/CastPages/CastPages.types';
import type { CastTypeOption } from '@pages/Cms/ContentEdit/helpers/CastPageFields/CastPageFields.types';

export type CastFieldChromeProps = {
  locked: boolean;
  field: CastField;
  typeOptions: CastTypeOption[];
  fromTemplateLabel: string;
  fieldLabelPlaceholder: string;
  fieldRequiredLabel: string;
  onFieldChange: (id: string, patch: Partial<CastField>) => void;
};
