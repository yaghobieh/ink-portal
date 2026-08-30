import type { CastField } from '@pages/Cms/CastPages/CastPages.types';

export type CastPageFieldsProps = {
  fields: CastField[];
  values: Record<string, string>;
  lockedFieldIds: string[];
  onAddField: () => void;
  onFieldChange: (id: string, patch: Partial<CastField>) => void;
  onRemoveField: (id: string) => void;
  onValueChange: (name: string, value: string) => void;
};

export type CastTypeOption = {
  value: string;
  label: string;
};
