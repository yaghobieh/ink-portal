export type Locale = 'en' | 'es';

export interface Messages {
  brand: string;
  tagline: string;
  heroSupport: string;
  ctaDocs: string;
  ctaPlayground: string;
  ctaNpm: string;
  ctaGetStarted: string;
  nav: {
    docs: string;
    playground: string;
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
  ai: {
    title: string;
    description: string;
    redirect: string;
  };
}
