import { DOCS_CLOUDINARY_IMAGES } from './docsCloudinary.const';

export type DocsPageMedia = {
  guid: string;
  gifSrc: string;
  caption: string;
  width: number;
  height: number;
};

const DOC_MEDIA_WIDTH = 720;
const DOC_MEDIA_HEIGHT = 400;

const media = (slug: string, caption: string): DocsPageMedia => ({
  guid: `ink-doc-${slug}-v2`,
  gifSrc: DOCS_CLOUDINARY_IMAGES[slug] || `/docs/${slug}.svg`,
  caption,
  width: DOC_MEDIA_WIDTH,
  height: DOC_MEDIA_HEIGHT,
});

export const DOCS_PAGE_MEDIA: Record<string, DocsPageMedia> = {
  installation: media('installation', 'Install @forgedevstack/ink and mount the editor'),
  quickstart: media('quickstart', 'Controlled value / onChange quickstart'),
  configuration: media('configuration', 'Toolbar, features, and variant configuration'),
  toolbar: media('toolbar', 'Toolbar presets and format controls'),
  modules: media('modules', 'Modules and feature flags overview'),
  tables: media('tables', 'Insert and edit tables in the canvas'),
  'track-changes': media('track-changes', 'Track inserts and deletes with review chrome'),
  comments: media('comments', 'Inline comment threads on selections'),
  blocks: media('blocks', 'Slash commands and block inserts'),
  'sign-pad': media('sign-pad', 'Capture a signature pad block'),
  'keep-in-memory': media('keep-in-memory', 'Persist draft HTML in memory / storage'),
  'find-replace': media('find-replace', 'Find and replace across the document'),
  themes: media('themes', 'Theme classes and CSS variables'),
  typo: media('typo', 'Typo auto-fix on blur'),
  plugins: media('plugins', 'Drag & drop a .ink package onto the editor'),
  ai: media('ai', 'Ink AI generate and Tab autocomplete'),
  angular: media('angular', 'Host Ink inside an Angular shell'),
  wordpress: media('wordpress', 'Host bridge for Ink content'),
  accessibility: media('accessibility', 'Keyboard and screen-reader friendly chrome'),
  collaboration: media('collaboration', 'Collaboration and live co-edit path'),
  premium: media('premium', 'Premium license unlocks and entitlements'),
};

export const getDocsPageMedia = (slug: string): DocsPageMedia | null =>
  DOCS_PAGE_MEDIA[slug] ?? null;
