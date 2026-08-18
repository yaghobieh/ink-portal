import { CMS_EXTENSIONS_STORAGE_KEY, CMS_FILTER_ALL, EMPTY_STRING } from '@const/strings.const';
import type { ExtensionItem, ExtensionKind, ExtensionTabId } from './ExtensionsPages.types';

export const EXTENSIONS_STORAGE_KEY = CMS_EXTENSIONS_STORAGE_KEY;
export const THEMING_EXTENSION_ID = 'cms-theming';
export const BIF_DYNAMIC_EXTENSION_ID = 'bif-dynamic';
export const FORM_PLUGIN_EXTENSION_ID = 'forma-forms';
export const EXTENSION_INSTALL_DELAY_MS = 700;
export const EXTENSION_FILTER_ALL = CMS_FILTER_ALL;
export const EXTENSION_SEARCH_EMPTY = EMPTY_STRING;
export const EXTENSION_PRICE_FREE = 'free';
export const EXTENSION_PRICE_PAID = 'paid';

export const EXTENSION_TABS = {
  STORE: 'store',
  DOCS: 'docs',
} as const satisfies Record<string, ExtensionTabId>;

export const EXTENSION_KINDS = {
  THEME: 'theme',
  SEO: 'seo',
  EDITOR: 'editor',
  COLLAB: 'collab',
  PUBLISH: 'publish',
  BRIDGE: 'bridge',
  BUILDER: 'builder',
  FORM: 'form',
} as const satisfies Record<string, ExtensionKind>;

export const EXTENSION_SEARCH_INPUT_ID = 'ink-cms-store-search';
export const EXTENSION_KIND_SELECT_ID = 'ink-cms-store-kind';
export const EXTENSION_AUTHOR_SELECT_ID = 'ink-cms-store-author';
export const EXTENSION_GIT_SELECT_ID = 'ink-cms-store-git';
export const EXTENSION_EXTERNAL_INPUT_ID = 'ink-cms-store-external';
export const EXTENSION_GIT_HTTPS_PREFIX = 'https://';

const INK_GIT = 'https://github.com/forgedevstack/ink';
const INK_SITE = 'https://inkforgejs.com';
const INK_AUTHOR = 'Ink Team';
const BIFROST_GIT = 'https://github.com/forgedevstack/bifrost';
const PREVIEW_HERO = '/ink-hero.png';
const PREVIEW_EDITOR = '/ink-editor-demo.png';
const PREVIEW_BUILDER = '/ink-drag-drop-install.png';

export const EXTENSION_CATALOG: ExtensionItem[] = [
  {
    id: THEMING_EXTENSION_ID,
    name: 'CMS Theming',
    description: 'Unlocks Settings → Theme for the CMS shell (colors, accent).',
    longDescription:
      'Theme the CMS chrome itself: primary, accent, and background tokens apply to AppBar, Sidebar, and cards. Changes persist on Save and fire ink-cms-save for plugins.',
    highlights: ['Shell color tokens', 'Accent + background', 'Persists on Save'],
    previewSrc: PREVIEW_HERO,
    version: '1.0.0',
    kind: EXTENSION_KINDS.THEME,
    tags: ['theme', 'cms'],
    status: 'available',
    author: INK_AUTHOR,
    git: INK_GIT,
    website: INK_SITE,
    dependencies: ['@forgedevstack/bear'],
    price: EXTENSION_PRICE_FREE,
    likes: 1280,
    installs: 4120,
    isNew: true,
  },
  {
    id: BIF_DYNAMIC_EXTENSION_ID,
    name: 'bifDynamic',
    description: 'Visual canvas builder for CMS pages. Drag widgets, style sections, publish layouts.',
    longDescription:
      'Open a full-width canvas with a widget palette and inspector. Drop Bear widgets onto sections, preview, and save the layout. Install to unlock the Builder side-nav.',
    highlights: ['Drag-and-drop canvas', 'Widget palette', 'Section inspector', 'Publish-ready HTML'],
    previewSrc: PREVIEW_BUILDER,
    version: '1.0.0',
    kind: EXTENSION_KINDS.BUILDER,
    tags: ['builder', 'canvas', 'widgets'],
    status: 'available',
    author: 'Bifrost Team',
    git: BIFROST_GIT,
    website: INK_SITE,
    dependencies: ['@forgedevstack/bear', '@forgedevstack/ink', '@bifrost/canvas'],
    price: EXTENSION_PRICE_FREE,
    likes: 2460,
    installs: 3810,
    isNew: true,
  },
  {
    id: FORM_PLUGIN_EXTENSION_ID,
    name: 'Forma Forms',
    description: 'Drop a form block on the canvas — fields, submit, and save with the page.',
    longDescription:
      'Install to unlock the Form layout block in bifDynamic. Forms persist with the canvas tree and can later connect to formaforms.',
    highlights: ['Canvas form block', 'Name + email fields', 'Saves with layout'],
    previewSrc: PREVIEW_EDITOR,
    version: '0.1.0',
    kind: EXTENSION_KINDS.FORM,
    tags: ['form', 'plugin'],
    status: 'available',
    author: INK_AUTHOR,
    git: INK_GIT,
    website: INK_SITE,
    dependencies: ['@forgedevstack/bear'],
    price: EXTENSION_PRICE_FREE,
    likes: 520,
    installs: 310,
    isNew: true,
  },
  {
    id: 'seo-pack',
    name: 'SEO Pack',
    description: 'Meta title, description, Open Graph fields on every page publish.',
    longDescription:
      'SEO title and description live in the Publish drawer. Scheduled publish and Open Graph-ready fields ship with every save snapshot.',
    highlights: ['SEO title + description', 'Schedule publish', 'Revision snapshots'],
    previewSrc: PREVIEW_EDITOR,
    version: '0.2.0',
    kind: EXTENSION_KINDS.SEO,
    tags: ['seo', 'publish'],
    status: 'installed',
    author: INK_AUTHOR,
    git: INK_GIT,
    website: INK_SITE,
    dependencies: [],
    price: EXTENSION_PRICE_FREE,
    likes: 980,
    installs: 2540,
  },
  {
    id: 'live-edit-bridge',
    name: 'Live Edit Bridge',
    description: 'Edit published pages on the customer site with Bifrost SDK.',
    longDescription:
      'Generate a live-edit link for a published page. Operators edit in place on the customer site through the Bifrost bridge.',
    highlights: ['Customer-site editing', 'Bifrost SDK', 'Published pages only'],
    previewSrc: PREVIEW_BUILDER,
    version: '0.1.0',
    kind: EXTENSION_KINDS.BRIDGE,
    tags: ['live-edit', 'sdk'],
    status: 'installed',
    author: 'Bifrost Team',
    git: BIFROST_GIT,
    website: INK_SITE,
    dependencies: ['@forgedevstack/bifrost'],
    price: EXTENSION_PRICE_FREE,
    likes: 640,
    installs: 1190,
  },
  {
    id: 'revisions',
    name: 'Revisions',
    description: 'Local revision snapshots before each save — restore any prior draft.',
    longDescription:
      'Every save in the editor pushes a revision. Restore title, body, and status from any snapshot in the drawer.',
    highlights: ['Pre-save snapshots', 'One-click restore', 'Status included'],
    previewSrc: PREVIEW_EDITOR,
    version: '0.1.0',
    kind: EXTENSION_KINDS.EDITOR,
    tags: ['history'],
    status: 'installed',
    author: INK_AUTHOR,
    git: INK_GIT,
    website: INK_SITE,
    dependencies: [],
    price: EXTENSION_PRICE_FREE,
    likes: 410,
    installs: 1870,
  },
  {
    id: 'collab-yjs',
    name: 'Realtime Collab (Yjs)',
    description: 'CRDT presence + live cursors.',
    longDescription:
      'Shared editing with presence and live cursors. Roadmapped for a later pack — not a mock.',
    highlights: ['CRDT presence', 'Live cursors', 'Coming soon'],
    previewSrc: PREVIEW_HERO,
    version: '0.0.1',
    kind: EXTENSION_KINDS.COLLAB,
    tags: ['collab', 'crdt'],
    status: 'coming',
    author: INK_AUTHOR,
    git: INK_GIT,
    website: INK_SITE,
    dependencies: ['yjs'],
    price: EXTENSION_PRICE_PAID,
    likes: 2100,
    installs: 0,
  },
  {
    id: 'ink-excel',
    name: 'Ink Excel',
    description: 'Spreadsheet block plugin for docs and CMS pages.',
    longDescription:
      'Insert a spreadsheet block into documents and CMS pages. Cells persist with the content payload.',
    highlights: ['Spreadsheet block', 'Docs + CMS pages', 'Payload persistence'],
    previewSrc: PREVIEW_EDITOR,
    version: '1.0.0',
    kind: EXTENSION_KINDS.EDITOR,
    tags: ['plugin', 'blocks'],
    status: 'available',
    author: INK_AUTHOR,
    git: INK_GIT,
    website: INK_SITE,
    dependencies: ['@forgedevstack/ink'],
    price: EXTENSION_PRICE_FREE,
    likes: 760,
    installs: 940,
  },
  {
    id: 'schedule-publish',
    name: 'Schedule Publish',
    description: 'Queue publish at a future datetime from the edit drawer.',
    longDescription:
      'Set a datetime in Publish & SEO. The drawer stores scheduleAt on the content payload with the rest of the save.',
    highlights: ['Datetime queue', 'Drawer control', 'Saved with content'],
    previewSrc: PREVIEW_HERO,
    version: '0.1.0',
    kind: EXTENSION_KINDS.PUBLISH,
    tags: ['publish'],
    status: 'installed',
    author: INK_AUTHOR,
    git: INK_GIT,
    website: INK_SITE,
    dependencies: [],
    price: EXTENSION_PRICE_FREE,
    likes: 330,
    installs: 1510,
  },
];
