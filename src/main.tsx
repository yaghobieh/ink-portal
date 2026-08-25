import React from 'react';
import ReactDOM from 'react-dom/client';
import '@forgedevstack/bear/styles.css';
import '@forgedevstack/ink/styles.css';
import '@forgedevstack/grid-table/grid-table.css';
import { BearProvider } from '@forgedevstack/bear';
import { I18nProvider } from './i18n';
import { App } from './App';
import { THEME_STORAGE_KEY } from '@const/index';
import { inkTheme, inkVariants } from './config';
import { bindWindowVersion, CONSOLE_VERSION_LABEL, fetchVersionInfo } from '@sdk/modules/version';
import './styles/index.css';
import './styles/cms.css';

void fetchVersionInfo().then((info) => {
  bindWindowVersion(info);
  console.info(CONSOLE_VERSION_LABEL, info);
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BearProvider
      defaultMode="light"
      persistPreference
      storageKey={THEME_STORAGE_KEY}
      theme={inkTheme}
      customVariants={inkVariants}
    >
      <I18nProvider>
        <App />
      </I18nProvider>
    </BearProvider>
  </React.StrictMode>,
);
