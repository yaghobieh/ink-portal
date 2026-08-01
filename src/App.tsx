import { CompassProvider, Routes } from '@forgedevstack/forge-compass/react';
import { ROUTES } from '@const/index';
import { Home } from '@pages/Home';
import { Docs } from '@pages/Docs';
import { Playground } from '@pages/Playground';
import { GetStarted } from '@pages/GetStarted';
import { Changelog } from '@pages/Changelog';
import { Ai } from '@pages/Ai';

const routes = [
  { path: ROUTES.HOME, name: 'home', component: Home },
  { path: ROUTES.DOCS, name: 'docs', component: Docs },
  { path: ROUTES.PLAYGROUND, name: 'playground', component: Playground },
  { path: ROUTES.GET_STARTED, name: 'get-started', component: GetStarted },
  { path: ROUTES.CHANGELOG, name: 'changelog', component: Changelog },
  { path: ROUTES.AI, name: 'ai', component: Ai },
];

export const App = () => (
  <CompassProvider routes={routes}>
    <Routes />
  </CompassProvider>
);
