import { CompassProvider, Routes } from '@forgedevstack/forge-compass/react';
import { ThemeSync } from '@components/ThemeSync';
import { AuthProvider, InkPremiumProvider } from '@hooks/index';
import { ENABLE_LAB, ROUTES } from '@const/index';
import { Home } from '@pages/Home';
import { Docs } from '@pages/Docs';
import { Playground } from '@pages/Playground';
import { GetStarted } from '@pages/GetStarted';
import { Changelog } from '@pages/Changelog';
import { Ai } from '@pages/Ai';
import { DemoPage, Demos } from '@pages/Demos';
import { Pricing } from '@pages/Pricing';
import { PremiumSuccess } from '@pages/PremiumSuccess';
import { Terms } from '@pages/Terms';
import {
  CmsLogin,
  ContentEdit,
  ContentPages,
  CrewPages,
  Dashboard,
  EditorsPages,
  ExtensionsPages,
  LiveEditPages,
  MediaPages,
  PlansPages,
  SettingsPages,
} from '@pages/Cms';
import { Lab } from '@pages/Lab';

const routes = [
  { path: ROUTES.HOME, name: 'home', component: Home },
  { path: ROUTES.DOC_PAGE, name: 'doc-page', component: Docs },
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
  { path: ROUTES.PREMIUM_SUCCESS, name: 'premium-success', component: PremiumSuccess },
  { path: ROUTES.PRICING, name: 'pricing', component: Pricing },
  { path: ROUTES.TERMS, name: 'terms', component: Terms },
  { path: ROUTES.CMS_LOGIN, name: 'cms-login', component: CmsLogin },
  { path: ROUTES.CMS, name: 'cms', component: Dashboard },
  { path: ROUTES.CMS_CONTENT, name: 'cms-content', component: ContentPages },
  { path: ROUTES.CMS_EDIT, name: 'cms-edit', component: ContentEdit },
  { path: ROUTES.CMS_MEDIA, name: 'cms-media', component: MediaPages },
  { path: ROUTES.CMS_EDITORS, name: 'cms-editors', component: EditorsPages },
  { path: ROUTES.CMS_CREW, name: 'cms-crew', component: CrewPages },
  { path: ROUTES.CMS_LIVE_EDIT, name: 'cms-live-edit', component: LiveEditPages },
  { path: ROUTES.CMS_EXTENSIONS, name: 'cms-extensions', component: ExtensionsPages },
  { path: ROUTES.CMS_PLANS, name: 'cms-plans', component: PlansPages },
  { path: ROUTES.CMS_SETTINGS, name: 'cms-settings', component: SettingsPages },
  ...(ENABLE_LAB ? [{ path: ROUTES.LAB, name: 'lab', component: Lab }] : []),
];

export const App = () => (
  <ThemeSync>
    <AuthProvider>
      <InkPremiumProvider>
        <CompassProvider routes={routes}>
          <Routes />
        </CompassProvider>
      </InkPremiumProvider>
    </AuthProvider>
  </ThemeSync>
);
