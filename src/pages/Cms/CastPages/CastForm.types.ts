import type { CastField } from './CastPages.types';
import type { CastTypeOption } from './CastFieldRow.types';

export type CastFormProps = {
  formKey: string;
  initialTitle: string;
  fields: CastField[];
  typeOptions: readonly CastTypeOption[];
  saved: boolean;
  onTitleChange: (value: string) => void;
  onFieldChange: (fieldId: string, patch: Partial<CastField>) => void;
  onAddField: () => void;
  onRemoveField: (fieldId: string) => void;
  onSave: (title: string) => Promise<void>;
};
