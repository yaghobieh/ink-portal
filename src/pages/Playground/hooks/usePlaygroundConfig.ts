import { useMemo, useState } from 'react';
import type { PlaygroundConfig } from '../Playground.types';
import { DEFAULT_CONFIG, DEFAULT_PLAYGROUND_HTML, resolveToolbar, THEME_CLASS_MAP } from '../Playground.const';
import { PLAYGROUND_EDITOR_MIN_HEIGHT_PX } from '@const/index';

export const usePlaygroundConfig = () => {
  const [config, setConfig] = useState<PlaygroundConfig>(DEFAULT_CONFIG);
  const [html, setHtml] = useState(DEFAULT_PLAYGROUND_HTML);

  const set = <K extends keyof PlaygroundConfig>(key: K, value: PlaygroundConfig[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const reset = () => {
    setConfig(DEFAULT_CONFIG);
    setHtml(DEFAULT_PLAYGROUND_HTML);
  };

  const toolbar = useMemo(() => resolveToolbar(config.toolbarPreset), [config.toolbarPreset]);
  const themeClass = THEME_CLASS_MAP[config.theme];

  const generatedCode = useMemo(() => {
    const lines = [
      `import { useState } from 'react';`,
      `import { InkEditor } from '@forgedevstack/ink';`,
      `import '@forgedevstack/ink/styles.css';`,
      ``,
      `export function Example() {`,
      `  const [value, setValue] = useState(${JSON.stringify(html)});`,
      `  return (`,
      `    <div className="${themeClass}">`,
      `      <InkEditor`,
      `        value={value}`,
      `        onChange={setValue}`,
      `        toolbar={${JSON.stringify(toolbar)}}`,
      `        typoAutoFix={${config.typoAutoFix}}`,
      `        allowImagePaste={${config.allowImagePaste}}`,
      `        showCharCount={${config.showCharCount}}`,
      `        readOnly={${config.readOnly}}`,
      `        minHeight={${PLAYGROUND_EDITOR_MIN_HEIGHT_PX}}`,
      `      />`,
      `    </div>`,
      `  );`,
      `}`,
    ];
    return lines.join('\n');
  }, [config, html, themeClass, toolbar]);

  return { config, set, reset, html, setHtml, toolbar, themeClass, generatedCode };
};
