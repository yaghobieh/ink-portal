import { NPM_URL } from './urls.const';
import type { DocsPageContent } from './docsContent.types';
import {
  DOC_DEMO_AI,
  DOC_DEMO_BLOCKS,
  DOC_DEMO_COMMENTS,
  DOC_DEMO_CONFIGURATION,
  DOC_DEMO_FIND,
  DOC_DEMO_MEMORY,
  DOC_DEMO_SIGN,
  DOC_DEMO_TABLES,
  DOC_DEMO_TRACK,
} from './docsDemos.const';

export type { DocsBlock, DocsPageContent, DocDemoBlock } from './docsContent.types';

export const DOCS_PAGES: DocsPageContent[] = [
  {
    id: 'installation',
    labelKey: 'tocInstallation',
    blocks: [
      { type: 'p', text: 'Install Ink from npm. Peer dependency: React 18+.' },
      {
        type: 'steps',
        title: 'Setup',
        items: [
          {
            title: '1. Install package',
            body: 'Adds the editor + CSS entry to your app.',
          },
          {
            title: '2. Import styles',
            body: 'Pull @forgedevstack/ink/styles.css once at the app root.',
          },
          {
            title: '3. Mount InkEditor',
            body: 'Controlled value/onChange is the recommended default for forms.',
          },
        ],
      },
      { type: 'code', language: 'bash', code: 'npm install @forgedevstack/ink@1.1.3' },
      {
        type: 'code',
        language: 'tsx',
        code: `import { InkEditor } from '@forgedevstack/ink';
import '@forgedevstack/ink/styles.css';`,
      },
      {
        type: 'html',
        html: `Package: <a class="ink-doc-link" href="${NPM_URL}" target="_blank" rel="noreferrer">@forgedevstack/ink</a> · current docs target <strong>1.1.3</strong>`,
      },
    ],
  },
  {
    id: 'quickstart',
    labelKey: 'tocQuickstart',
    blocks: [
      {
        type: 'p',
        text: 'Minimal controlled editor. typoAutoFix runs on blur. This is the smallest useful payload.',
      },
      {
        type: 'steps',
        title: 'What we change',
        items: [
          {
            title: 'value / onChange',
            body: 'Parent owns HTML. Every keystroke updates React state — open the HTML / Payload tabs to see it.',
          },
          {
            title: 'variant="classic"',
            body: 'Soft card chrome for marketing and forms. Switch to document later for long-form.',
          },
          {
            title: 'typoAutoFix',
            body: 'On blur, common typos are rewritten in the HTML string.',
          },
        ],
      },
      {
        type: 'demo',
        id: 'quickstart-live',
        title: 'Hello Ink',
        description: 'Type here, then open HTML and Payload tabs.',
        initialHtml: '<p>Hello Ink</p>',
        code: `import { useState } from 'react';
import { InkEditor } from '@forgedevstack/ink';
import '@forgedevstack/ink/styles.css';

export function App() {
  const [value, setValue] = useState('<p>Hello Ink</p>');
  return (
    <InkEditor
      value={value}
      onChange={setValue}
      variant="classic"
      typoAutoFix
    />
  );
}`,
        editor: {
          variant: 'classic',
          typoAutoFix: true,
          toolbar: ['bold', 'italic', 'undo', 'redo'],
        },
        payload: {
          label: 'Initial state payload',
          data: {
            value: '<p>Hello Ink</p>',
            variant: 'classic',
            typoAutoFix: true,
          },
        },
      },
    ],
  },
  {
    id: 'configuration',
    labelKey: 'tocConfiguration',
    blocks: [
      {
        type: 'p',
        text: 'Configuration is prop-driven. Each prop below changes editor behaviour — try the live demo, then inspect Code / HTML / Payload tabs.',
      },
      {
        type: 'steps',
        title: 'What each group changes',
        items: [
          {
            title: 'value / onChange',
            body: 'Controlled HTML string. Parent owns the document; every keystroke emits HTML.',
          },
          {
            title: 'features',
            body: 'Module switches: table, trackChanges, comments, ai, blocks, slash, signature, findReplace, horizontalRule.',
          },
          {
            title: 'toolbar',
            body: 'Ordered list of ToolbarOption strings. Missing items never render — even if the feature flag is on.',
          },
          {
            title: 'keepInMemory + memoryKey',
            body: 'Writes drafts to localStorage under ink-memory:{key}. On mount (1.1.3+) restores and calls onChange so controlled apps refresh correctly.',
          },
          {
            title: 'variant',
            body: 'classic = soft card shell. document = page-like with stronger block outlines.',
          },
        ],
      },
      DOC_DEMO_CONFIGURATION,
      {
        type: 'payload',
        label: 'Full props cheat-sheet (subset)',
        data: {
          value: 'string HTML',
          onChange: '(html: string) => void',
          defaultValue: 'string HTML (uncontrolled)',
          variant: 'classic | document',
          features: {
            table: true,
            trackChanges: true,
            comments: true,
            ai: true,
            blocks: true,
            slash: true,
            signature: true,
            findReplace: true,
            horizontalRule: true,
          },
          keepInMemory: true,
          memoryKey: 'unique-per-editor',
          toolbar: ['bold', 'italic', 'signature'],
          author: 'You',
          tableRows: 3,
          tableCols: 3,
          showCommentsPanel: true,
          ai: { enabled: true, placement: 'sidebar' },
        },
      },
    ],
  },
  {
    id: 'toolbar',
    labelKey: 'tocToolbar',
    blocks: [
      {
        type: 'p',
        text: 'Toolbar is an ordered array. Presets: INK_DEFAULT_TOOLBAR, INK_SIMPLE_TOOLBAR, INK_COLLAB_TOOLBAR.',
      },
      {
        type: 'steps',
        items: [
          {
            title: 'Add an option',
            body: 'Push a ToolbarOption into toolbar[] and enable the matching features flag when required.',
          },
          {
            title: 'divider',
            body: 'Visual separator only — no command.',
          },
          {
            title: 'headingDropdown',
            body: 'Maps to block formats h1–h6 / paragraph.',
          },
        ],
      },
      {
        type: 'code',
        language: 'tsx',
        code: `import { INK_DEFAULT_TOOLBAR, INK_COLLAB_TOOLBAR } from '@forgedevstack/ink';

toolbar={[
  'headingDropdown',
  'divider',
  'bold',
  'italic',
  'signature',
  'findReplace',
  'horizontalRule',
  'divider',
  'undo',
  'redo',
]}

// or
toolbar={INK_DEFAULT_TOOLBAR}
toolbar={INK_COLLAB_TOOLBAR}`,
      },
      {
        type: 'payload',
        label: 'ToolbarOption union (1.1.3)',
        data: {
          options: [
            'headingDropdown',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'textColor',
            'highlightColor',
            'bulletList',
            'orderedList',
            'link',
            'image',
            'table',
            'signature',
            'findReplace',
            'horizontalRule',
            'undo',
            'redo',
            'trackChanges',
            'comments',
            'ai',
            'clearFormat',
            'divider',
          ],
        },
      },
    ],
  },
  {
    id: 'modules',
    labelKey: 'tocModules',
    blocks: [
      {
        type: 'p',
        text: 'features={{ … }} is the module gate. Toolbar buttons still need an entry in toolbar[] — a feature flag alone never renders a control.',
      },
      {
        type: 'steps',
        title: 'What each flag changes',
        items: [
          {
            title: 'table',
            body: 'Enables table insert + cell editing. Pair with toolbar "table" and optional tableRows/tableCols.',
          },
          {
            title: 'trackChanges',
            body: 'Insert/delete marks + trackChanges[] payload. Pair with toolbar trackChanges + trackChangesEnabled.',
          },
          {
            title: 'comments',
            body: 'Selection threads + comments/onCommentsChange. Pair with toolbar comments + showCommentsPanel.',
          },
          {
            title: 'blocks + slash',
            body: 'Block handles (↑↓) and / menu. Best with variant="document".',
          },
          {
            title: 'signature / findReplace / horizontalRule',
            body: 'Sign pad canvas, find panel, and HR insert — each needs its toolbar option.',
          },
          {
            title: 'ai',
            body: 'Side panel. Pair with toolbar ai + ai={{ enabled: true }}.',
          },
        ],
      },
      DOC_DEMO_CONFIGURATION,
      {
        type: 'code',
        language: 'tsx',
        code: `features={{
  table: true,
  trackChanges: true,
  comments: true,
  ai: true,
  blocks: true,
  slash: true,
  signature: true,
  findReplace: true,
  horizontalRule: true,
}}`,
      },
      {
        type: 'payload',
        label: 'Default features merge',
        data: {
          note: 'Ink merges your features over INK_DEFAULT_FEATURES',
          defaults: {
            table: true,
            trackChanges: true,
            comments: true,
            ai: true,
            blocks: true,
            slash: true,
            signature: true,
            findReplace: true,
            horizontalRule: true,
          },
        },
      },
    ],
  },
  {
    id: 'tables',
    labelKey: 'tocTables',
    blocks: [
      {
        type: 'p',
        text: 'tableRows / tableCols control the insert size. Cells are contenteditable. Helper: buildTableHtml(rows, cols).',
      },
      {
        type: 'steps',
        items: [
          { title: 'Enable', body: 'features.table + toolbar includes "table".' },
          { title: 'Insert', body: 'Toolbar table button injects HTML table markup.' },
          { title: 'Edit', body: 'Click cells and type. HTML payload shows <table class="Ink-table">.' },
        ],
      },
      DOC_DEMO_TABLES,
    ],
  },
  {
    id: 'track-changes',
    labelKey: 'tocTrackChanges',
    blocks: [
      {
        type: 'p',
        text: 'Parallel model: HTML marks + trackChanges[] state. Accept/Reject mutates both.',
      },
      {
        type: 'steps',
        items: [
          { title: 'Enable', body: 'features.trackChanges + toolbar trackChanges + trackChangesEnabled.' },
          { title: 'Edit with TC on', body: 'Inserts wrap Ink-tc-insert; deletes wrap Ink-tc-delete.' },
          { title: 'Review', body: 'Accept/Reject strip updates trackChanges payload.' },
        ],
      },
      DOC_DEMO_TRACK,
    ],
  },
  {
    id: 'comments',
    labelKey: 'tocComments',
    blocks: [
      {
        type: 'p',
        text: 'Selection → comment thread. showCommentsPanel opens the archive sidebar.',
      },
      {
        type: 'steps',
        items: [
          { title: 'Enable', body: 'features.comments + toolbar comments.' },
          { title: 'Annotate', body: 'Select text, click Comments, enter body.' },
          { title: 'Sync', body: 'comments / onCommentsChange keep the thread payload in React state.' },
        ],
      },
      DOC_DEMO_COMMENTS,
    ],
  },
  {
    id: 'blocks',
    labelKey: 'tocBlocks',
    blocks: [
      {
        type: 'p',
        text: 'Document variant outlines the active block. Block handles move sections. Slash menu inserts structures via /.',
      },
      {
        type: 'steps',
        items: [
          {
            title: 'variant="document"',
            body: 'Stronger block chrome — best for long-form docs.',
          },
          {
            title: 'features.blocks',
            body: 'Shows ↑↓ handles on the active block.',
          },
          {
            title: 'features.slash / slashCommands',
            body: 'Type / then choose heading, list, table, AI.',
          },
        ],
      },
      DOC_DEMO_BLOCKS,
    ],
  },
  {
    id: 'sign-pad',
    labelKey: 'tocSignPad',
    blocks: [
      {
        type: 'p',
        text: 'Sign pad opens a canvas. Draw, then Insert — PNG lands as an <img> in the HTML payload.',
      },
      {
        type: 'steps',
        items: [
          { title: 'Enable', body: 'features.signature + toolbar "signature".' },
          { title: 'Draw', body: 'Pointer/touch strokes on the white pad.' },
          { title: 'Insert', body: 'Confirm inserts data:image/png;base64,… into the document.' },
        ],
      },
      DOC_DEMO_SIGN,
    ],
  },
  {
    id: 'keep-in-memory',
    labelKey: 'tocMemory',
    blocks: [
      {
        type: 'p',
        text: 'keepInMemory persists HTML under ink-memory:{memoryKey}. Use a unique key per editor. 1.1.3 restores on mount for controlled editors via onChange.',
      },
      {
        type: 'steps',
        items: [
          { title: 'Write', body: 'Every emitChange writes localStorage.' },
          { title: 'Restore', body: 'On mount, remembered HTML is applied and onChange fires.' },
          { title: 'Clear', body: 'clearInkMemory(memoryKey) from @forgedevstack/ink utils.' },
        ],
      },
      DOC_DEMO_MEMORY,
    ],
  },
  {
    id: 'find-replace',
    labelKey: 'tocFindReplace',
    blocks: [
      {
        type: 'p',
        text: 'Text-node only replace — attribute values stay untouched.',
      },
      {
        type: 'steps',
        items: [
          { title: 'Open panel', body: 'Toolbar findReplace.' },
          { title: 'Replace one / all', body: 'Runs replaceInHtml under the hood.' },
          { title: 'Verify', body: 'HTML tab: class="find-me" remains while text updates.' },
        ],
      },
      DOC_DEMO_FIND,
    ],
  },
  {
    id: 'themes',
    labelKey: 'tocThemes',
    blocks: [
      {
        type: 'p',
        text: 'Theme via CSS variables on .Ink-Editor and helper classes: snow / bubble / dark / minimal. Premium unlocks theme={{ … }} tokens.',
      },
      {
        type: 'code',
        language: 'tsx',
        code: `<div className="ink-theme-snow">
  <InkEditor … />
</div>`,
      },
      {
        type: 'payload',
        label: 'CSS variables',
        data: {
          vars: [
            '--ink-bg',
            '--ink-text',
            '--ink-border',
            '--ink-toolbar',
            '--ink-accent',
            '--ink-shadow',
            '--ink-radius',
          ],
        },
      },
    ],
  },
  {
    id: 'typo',
    labelKey: 'tocTypo',
    blocks: [
      {
        type: 'p',
        text: 'typoAutoFix runs on blur. Export applyTypoAutoFix for custom pipelines.',
      },
      {
        type: 'code',
        language: 'tsx',
        code: `import { applyTypoAutoFix } from '@forgedevstack/ink';

const { html, fixedCount } = applyTypoAutoFix('<p>teh end</p>');
// html → <p>the end</p>`,
      },
      {
        type: 'payload',
        label: 'applyTypoAutoFix result',
        data: { html: '<p>the end</p>', fixedCount: 1 },
      },
    ],
  },
  {
    id: 'ai',
    labelKey: 'tocAi',
    blocks: [
      {
        type: 'p',
        text: 'Side panel via ai={{ enabled: true }}. Demo provider is local. Register BYO LLM with inkAi.registerProvider.',
      },
      {
        type: 'steps',
        items: [
          { title: 'Enable UI', body: 'features.ai + toolbar ai + ai.enabled.' },
          { title: 'Demo provider', body: 'Works offline for marketing demos.' },
          { title: 'BYO LLM', body: 'Register a provider; models come from INK_AI_MODEL_CATALOG.' },
        ],
      },
      DOC_DEMO_AI,
      {
        type: 'code',
        language: 'tsx',
        code: `import { inkAi, INK_AI_MODEL_CATALOG } from '@forgedevstack/ink/plugins/ai';

inkAi.registerProvider({
  id: 'my-provider',
  name: 'My provider',
  models: INK_AI_MODEL_CATALOG.filter((m) => m.provider === 'openai'),
  async run(request) {
    return { text: '…', html: request.html };
  },
});`,
      },
    ],
  },
  {
    id: 'angular',
    labelKey: 'tocAngular',
    blocks: [
      {
        type: 'p',
        text: 'Helpers live at @forgedevstack/ink/angular. Mount the React editor through your preferred bridge.',
      },
      {
        type: 'code',
        language: 'tsx',
        code: `import { /* angular helpers */ } from '@forgedevstack/ink/angular';`,
      },
    ],
  },
  {
    id: 'wordpress',
    labelKey: 'tocWordpress',
    blocks: [
      {
        type: 'p',
        text: 'See wordpress/ink-editor in the npm package for a classic meta box stub.',
      },
    ],
  },
  {
    id: 'accessibility',
    labelKey: 'tocA11y',
    blocks: [
      {
        type: 'p',
        text: 'Toolbar controls expose titles; contenteditable supports keyboard formatting. Prefer labelled wrappers and sufficient contrast when theming.',
      },
    ],
  },
  {
    id: 'premium',
    labelKey: 'tocPremium',
    blocks: [
      {
        type: 'p',
        text: 'Premium unlocks theme tokens, custom icons, rich paste, onImageUpload, wysiwyg. Same package — gate with premium prop.',
      },
      {
        type: 'steps',
        items: [
          { title: 'Ink (free)', body: 'MIT core — no premium tokens, no hosted AI.' },
          { title: 'Ink Pro', body: 'Theme / icons / rich paste / BYO AI key via premium + provider register.' },
          { title: 'Ink AI', body: 'Hosted OpenAI — entitlements + token usage from ink-server (Neon).' },
          { title: 'Portal checkout', body: 'PayPal buttons removed. Billing via ink-server when live.' },
        ],
      },
      {
        type: 'code',
        language: 'tsx',
        code: `<InkEditor
  premium={{ licenseKey: 'ink_prem_AB12_CD34_EF56_GH78' }}
  theme={{ accent: '#0f766e', background: '#fff', radius: '1rem' }}
  pasteMode="rich"
  wysiwyg
/>`,
      },
      {
        type: 'payload',
        label: 'premium resolve shape',
        data: {
          enabled: true,
          licenseKey: 'ink_prem_…',
          features: ['theme', 'icons', 'richPaste', 'imageUpload', 'wysiwyg'],
        },
      },
    ],
  },
];

export const DOCS_PAGE_BY_ID = Object.fromEntries(DOCS_PAGES.map((page) => [page.id, page])) as Record<
  string,
  DocsPageContent
>;

export const DEFAULT_DOCS_SLUG = 'installation';
