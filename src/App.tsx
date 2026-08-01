import type { ComponentType } from 'react';
import { CompassProvider, Routes } from '@forgedevstack/forge-compass/react';
import { Layout } from '@components/Layout';
import { ROUTES } from '@const/index';
import { Home } from '@pages/Home';
import { GetStarted } from '@pages/GetStarted';
import { Demos } from '@pages/Demos';
import { Api } from '@pages/Api';
import { Ai } from '@pages/Ai';
import { Changelog } from '@pages/Changelog';

const Page = (Component: ComponentType) => () => (
  <Layout>
    <Component />
  </Layout>
);

const routes = [
  { path: ROUTES.HOME, name: 'home', component: Page(Home) },
  { path: ROUTES.GET_STARTED, name: 'get-started', component: Page(GetStarted) },
  { path: ROUTES.DEMOS, name: 'demos', component: Page(Demos) },
  { path: ROUTES.API, name: 'api', component: Page(Api) },
  { path: ROUTES.AI, name: 'ai', component: Page(Ai) },
  { path: ROUTES.CHANGELOG, name: 'changelog', component: Page(Changelog) },
];

export const App = () => (
  <CompassProvider routes={routes}>
    <Routes />
  </CompassProvider>
);
