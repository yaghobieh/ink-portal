import { CMS_SAVE_EVENT } from '@const/strings.const';
import { SETTINGS_CSS_VARS } from '../SettingsPages/SettingsPages.const';

export const EXTENSION_SCAFFOLD_TREE = `my-extension/
  package.json
  bifrost.extension.json
  src/
    index.ts
    MyWidget.tsx
    styles.css
  README.md`;

export const EXTENSION_MANIFEST_SAMPLE = `{
  "id": "my-extension",
  "name": "My Extension",
  "version": "0.1.0",
  "author": "Your name",
  "kind": "editor",
  "git": "https://github.com/you/my-extension",
  "website": "https://example.com",
  "dependencies": ["@forgedevstack/bear", "@forgedevstack/ink"]
}`;

export const EXTENSION_REACT_SAMPLE = `import { Card, Typography } from '@forgedevstack/bear';
import type { FC } from 'react';

export const MyWidget: FC = () => (
  <Card className="my-ext-widget">
    <Typography variant="h4">Hello from my extension</Typography>
  </Card>
);`;

export const EXTENSION_JS_SAMPLE = `import { subscribeCmsSave } from '@forgedevstack/ink-cms';
import { MyWidget } from './MyWidget';
import './styles.css';

export const install = (cms) => {
  cms.registerWidget('my-extension/widget', MyWidget);
  return subscribeCmsSave((payload) => {
    cms.notify('settings-saved', payload.profile);
  });
};`;

export const EXTENSION_EVENT_SAMPLE = `window.addEventListener('${CMS_SAVE_EVENT}', (event) => {
  const payload = event.detail;
  // payload.profile.username, displayName, avatarDataUrl
  // payload.password is present only when the operator typed a new one
  // payload.theme is present when CMS Theming is installed
});`;

export const EXTENSION_CSS_SAMPLE = `.my-ext-widget {
  background: var(${SETTINGS_CSS_VARS.BACKGROUND});
  border: 1px solid var(--ink-cms-border);
  color: var(--ink-cms-text);
}

.my-ext-widget--accent {
  color: var(${SETTINGS_CSS_VARS.PRIMARY});
  background: var(${SETTINGS_CSS_VARS.ACCENT_SOFT});
}`;
