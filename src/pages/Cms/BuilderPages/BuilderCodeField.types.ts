import type { CodeEditorLanguage } from '@forgedevstack/bear';

export type BuilderCodeFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  language: CodeEditorLanguage;
};
