import type { CastField } from './CastPages.types';

export type CastTypeOption = {
  value: CastField['type'];
  label: string;
};

export type CastFieldRowProps = {
  field: CastField;
  typeOptions: readonly CastTypeOption[];
  onFieldChange: (fieldId: string, patch: Partial<CastField>) => void;
  onRemove: () => void;
};
