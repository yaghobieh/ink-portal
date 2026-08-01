export type Locale = 'en' | 'es';

export interface Messages {
  brand: string;
  tagline: string;
  heroSupport: string;
  ctaDocs: string;
  ctaPlayground: string;
  ctaDemos: string;
  ctaAi: string;
  ctaNpm: string;
  ctaGetStarted: string;
  nav: {
    docs: string;
    demos: string;
    playground: string;
    ai: string;
    getStarted: string;
    changelog: string;
    toggleTheme: string;
    searchPlaceholder: string;
    searchEmpty: string;
  };
  footer: {
    mitLicense: string;
    builtWith: string;
    ecosystem: string;
    resources: string;
    domainNote: string;
  };
  docs: {
    title: string;
    description: string;
    onThisPage: string;
    tocInstallation: string;
    tocQuickstart: string;
    tocConfiguration: string;
    tocToolbar: string;
    tocModules: string;
    tocThemes: string;
    tocTypo: string;
    tocAi: string;
    tocTables: string;
    tocTrackChanges: string;
    tocComments: string;
    tocBlocks: string;
    tocAngular: string;
    tocWordpress: string;
    tocA11y: string;
  };
  playground: {
    title: string;
    back: string;
    preview: string;
    code: string;
    formats: string;
    modules: string;
    theme: string;
    reset: string;
    copyCode: string;
    copied: string;
    typoAutoFix: string;
    allowImagePaste: string;
    showCharCount: string;
    readOnly: string;
    table: string;
    trackChanges: string;
    comments: string;
    ai: string;
    blocks: string;
    themeSnow: string;
    themeBubble: string;
    themeDark: string;
    themeMinimal: string;
    toolbarFull: string;
    toolbarSimple: string;
    toolbarMinimal: string;
  };
  getStarted: {
    title: string;
    description: string;
    install: string;
    next: string;
  };
  changelog: {
    title: string;
    description: string;
  };
  demos: {
    title: string;
    description: string;
    back: string;
    open: string;
    mobileNote: string;
    featureRich: { title: string; description: string };
    ai: { title: string; description: string };
    collab: { title: string; description: string };
    document: { title: string; description: string };
    tables: { title: string; description: string };
    markdown: { title: string; description: string };
    playground: { title: string; description: string };
    mobile: { title: string; description: string };
  };
  ai: {
    title: string;
    headline: string;
    description: string;
    honesty: string;
    tryDemo: string;
    chatTitle: string;
    chatBody: string;
    reviewTitle: string;
    reviewBody: string;
    translateTitle: string;
    translateBody: string;
    quickTitle: string;
    quickBody: string;
    modelsTitle: string;
    modelsBody: string;
    costTitle: string;
    costBody: string;
    securityTitle: string;
    securityBody: string;
    liveDemo: string;
  };
  home: {
    liveDemo: string;
  };
}
