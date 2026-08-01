import { CompassProvider, Routes } from '@forgedevstack/forge-compass/react';
import { ROUTES } from '@const/index';
import { Home } from '@pages/Home';
import { Docs } from '@pages/Docs';
import { Playground } from '@pages/Playground';
import { GetStarted } from '@pages/GetStarted';
import { Changelog } from '@pages/Changelog';
import { Ai } from '@pages/Ai';
import { DemoPage, Demos } from '@pages/Demos';

const routes = [
  { path: ROUTES.HOME, name: 'home', component: Home },
  { path: ROUTES.DOCS, name: 'docs', component: Docs },
  { path: ROUTES.DEMOS, name: 'demos', component: Demos },
  { path: ROUTES.DEMO_FEATURE, name: 'demo-feature', component: DemoPage },
  { path: ROUTES.DEMO_AI, name: 'demo-ai', component: DemoPage },
  { path: ROUTES.DEMO_COLLAB, name: 'demo-collab', component: DemoPage },
  { path: ROUTES.DEMO_DOCUMENT, name: 'demo-document', component: DemoPage },
  { path: ROUTES.DEMO_TABLES, name: 'demo-tables', component: DemoPage },
  { path: ROUTES.DEMO_MARKDOWN, name: 'demo-markdown', component: DemoPage },
  { path: ROUTES.DEMO_MOBILE, name: 'demo-mobile', component: DemoPage },
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
