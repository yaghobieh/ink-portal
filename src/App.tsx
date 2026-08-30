import { CompassProvider, Routes } from '@forgedevstack/forge-compass/react';
import { ThemeSync } from '@components/ThemeSync';
import { AuthProvider, InkPremiumProvider } from '@hooks/index';
import { ROUTES } from '@const/index';
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
  CalendarPages,
  CmsLogin,
  NotificationsPages,
  TasksPages,
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
  TemplatesPages,
  BuilderPages,
  CastPages,
  withCmsGate,
} from '@pages/Cms';
import { Lab } from '@pages/Lab';
import { Login } from '@pages/Login';
import { NotFound } from '@pages/NotFound';
import { Sensors } from '@pages/Sensors';
import { CmsPagesRoute } from '@pages/CmsPagesRoute';

const routes = [
  { path: ROUTES.HOME, name: 'home', component: Home },
  { path: ROUTES.DOC_PAGE, name: 'doc-page', component: Docs },
  { path: ROUTES.DOCS, name: 'docs', component: Docs },
  { path: ROUTES.PAGES, name: 'pages', component: CmsPagesRoute },
  { path: ROUTES.SENSORS, name: 'sensors', component: Sensors },
  { path: ROUTES.NOT_FOUND, name: 'not-found', component: NotFound },
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
  { path: ROUTES.CMS, name: 'cms', component: withCmsGate(Dashboard) },
  { path: ROUTES.CMS_CONTENT, name: 'cms-content', component: withCmsGate(ContentPages) },
  { path: ROUTES.CMS_EDIT, name: 'cms-edit', component: withCmsGate(ContentEdit) },
  { path: ROUTES.CMS_MEDIA, name: 'cms-media', component: withCmsGate(MediaPages) },
  { path: ROUTES.CMS_EDITORS, name: 'cms-editors', component: withCmsGate(EditorsPages) },
  { path: ROUTES.CMS_CREW, name: 'cms-crew', component: withCmsGate(CrewPages) },
  { path: ROUTES.CMS_LIVE_EDIT, name: 'cms-live-edit', component: withCmsGate(LiveEditPages) },
  { path: ROUTES.CMS_EXTENSIONS, name: 'cms-extensions', component: withCmsGate(ExtensionsPages) },
  { path: ROUTES.CMS_PLANS, name: 'cms-plans', component: withCmsGate(PlansPages) },
  { path: ROUTES.CMS_CALENDAR, name: 'cms-calendar', component: withCmsGate(CalendarPages) },
  { path: ROUTES.CMS_TEMPLATES, name: 'cms-templates', component: withCmsGate(TemplatesPages) },
  { path: ROUTES.CMS_BUILDER, name: 'cms-builder', component: withCmsGate(BuilderPages) },
  { path: ROUTES.CMS_CAST, name: 'cms-cast', component: withCmsGate(CastPages) },
  { path: ROUTES.CMS_SETTINGS, name: 'cms-settings', component: withCmsGate(SettingsPages) },
  { path: ROUTES.CMS_NOTIFICATIONS, name: 'cms-notifications', component: withCmsGate(NotificationsPages) },
  { path: ROUTES.CMS_TASKS, name: 'cms-tasks', component: withCmsGate(TasksPages) },
  { path: ROUTES.LOGIN_PUBLIC, name: 'login', component: Login },
  ...(false ? [{ path: ROUTES.LAB, name: 'lab', component: Lab }] : []),
  { path: '*', name: 'catch-all', component: NotFound },
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
