import React from 'react';
import ReactDOM from 'react-dom/client';
import '@forgedevstack/bear/styles.css';
import '@forgedevstack/ink/styles.css';
import { BearProvider } from '@forgedevstack/bear';
import { I18nProvider } from './i18n';
import { App } from './App';
import { THEME_STORAGE_KEY } from '@const/index';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BearProvider defaultMode="light" persistPreference storageKey={THEME_STORAGE_KEY}>
      <I18nProvider>
        <App />
      </I18nProvider>
    </BearProvider>
  </React.StrictMode>,
);
