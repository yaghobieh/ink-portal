import type { CodeEditorLanguage } from '@forgedevstack/bear';
import { CodeEditor, Typography, useBear } from '@forgedevstack/bear';
import type { FC } from 'react';
import { BUILDER_CODE_EDITOR_FONT_SIZE, BUILDER_CODE_EDITOR_HEIGHT_PX } from '@const/numbers.const';
import type { BuilderCodeFieldProps } from './BuilderCodeField.types';

export const BuilderCodeField: FC<BuilderCodeFieldProps> = (props) => {
  const { label, value, onChange, language } = props;
  const { mode } = useBear();
  const theme = mode === 'dark' ? 'dark' : 'light';
  const editorLanguage: CodeEditorLanguage = language;

  return (
    <div className="ink-cms-code-field">
      <Typography variant="caption" className="ink-cms-code-field__label mb-1">
        {label}
      </Typography>
      <CodeEditor
        value={value}
        onChange={onChange}
        language={editorLanguage}
        theme={theme}
        showLineNumbers
        showGutter
        highlightActiveLine
        height={BUILDER_CODE_EDITOR_HEIGHT_PX}
        fontSize={BUILDER_CODE_EDITOR_FONT_SIZE}
        className="ink-cms-code-field__editor"
      />
    </div>
  );
};
