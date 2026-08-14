import { INK_EXCEL_GITHUB_URL, INK_EXCEL_NPM_URL, INK_EXCEL_PACKAGE_NAME, NPM_URL } from './urls.const';
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
      {
        type: 'p',
        text: 'Ink is a React rich-text editor that stores content as HTML and exposes structured side-channel state (comments, track changes) as JSON-friendly payloads. Install the package once, import styles once, then mount InkEditor in any form or document surface.',
      },
      {
        type: 'steps',
        title: 'What you get',
        items: [
          {
            title: 'npm package',
            body: 'Adds the editor runtime, toolbar presets, and CSS entry under @forgedevstack/ink.',
          },
          {
            title: 'Styles entry',
            body: 'One import of @forgedevstack/ink/styles.css at the app root styles the chrome and content.',
          },
          {
            title: 'Controlled mount',
            body: 'value / onChange keeps the parent as source of truth — ideal for forms and save APIs.',
          },
        ],
      },
      { type: 'code', language: 'bash', code: 'npm install @forgedevstack/ink@1.1.6' },
      {
        type: 'code',
        language: 'tsx',
        code: `import { InkEditor } from '@forgedevstack/ink';
import '@forgedevstack/ink/styles.css';`,
      },
      {
        type: 'html',
        html: `Package: <a class="ink-doc-link" href="${NPM_URL}" target="_blank" rel="noreferrer">@forgedevstack/ink</a> · current docs target <strong>1.1.6</strong>`,
      },
    ],
  },
  {
    id: 'quickstart',
    labelKey: 'tocQuickstart',
    blocks: [
      {
        type: 'p',
        text: 'The quickest path to a working editor: one controlled HTML string, a classic chrome variant, and optional typo auto-fix on blur. Use this when you want to see HTML and payload tabs update as you type.',
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
        text: 'Configuration is prop-driven and block-friendly: HTML lives in value, modules gate via features, and chrome is ordered through toolbar[]. Each prop below changes editor behaviour — try the live demo, then inspect Code / HTML / Payload tabs.',
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
        text: 'The toolbar is an ordered array of ToolbarOption strings. Order is layout; omitting an option hides it even when the matching feature flag is on. Presets (INK_DEFAULT_TOOLBAR, INK_SIMPLE_TOOLBAR, INK_COLLAB_TOOLBAR) cover common product shapes.',
      },
      {
        type: 'steps',
        title: 'What you get',
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
          {
            title: 'New dropdowns (1.1.4+)',
            body: 'fontDropdown, listDropdown (bullet / dash / numbers / letters), findReplaceDropdown, and directionLtr / directionRtl. Available in 1.1.4+ even while npm may still show 1.1.3.',
          },
        ],
      },
      {
        type: 'code',
        language: 'tsx',
        code: `import { INK_DEFAULT_TOOLBAR, INK_COLLAB_TOOLBAR } from '@forgedevstack/ink';

toolbar={[
  'headingDropdown',
  'fontDropdown',
  'listDropdown',
  'divider',
  'bold',
  'italic',
  'signature',
  'findReplaceDropdown',
  'directionLtr',
  'directionRtl',
  'horizontalRule',
  'divider',
  'undo',
  'redo',
]}

toolbar={INK_DEFAULT_TOOLBAR}
toolbar={INK_COLLAB_TOOLBAR}`,
      },
      {
        type: 'payload',
        label: 'ToolbarOption union (1.1.3 + 1.1.4+)',
        data: {
          options: [
            'headingDropdown',
            'fontDropdown',
            'listDropdown',
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
            'findReplaceDropdown',
            'horizontalRule',
            'directionLtr',
            'directionRtl',
            'undo',
            'redo',
            'trackChanges',
            'comments',
            'ai',
            'clearFormat',
            'divider',
          ],
          note: 'fontDropdown, listDropdown, findReplaceDropdown, directionLtr, directionRtl require Ink 1.1.4+',
        },
      },
      {
        type: 'p',
        text: 'Tip: use a short toolbar for marketing forms and expand to collab presets when you need comments, track changes, and find/replace. Prefer dropdowns (1.1.4+) when you want denser chrome without losing list styles or direction controls.',
      },
    ],
  },
  {
    id: 'modules',
    labelKey: 'tocModules',
    blocks: [
      {
        type: 'p',
        text: 'features={{ … }} is the module gate. Think of each flag as unlocking a capability; toolbar[] still decides which controls appear. A feature flag alone never renders a button.',
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
        text: 'Tables are HTML-first: insert injects a <table class="Ink-table"> into the document string. tableRows / tableCols control the insert size; cells stay contenteditable so the parent always receives real markup.',
      },
      {
        type: 'steps',
        title: 'What you get',
        items: [
          { title: 'Enable', body: 'features.table + toolbar includes "table".' },
          { title: 'Insert', body: 'Toolbar table button injects HTML table markup.' },
          { title: 'Edit', body: 'Click cells and type. HTML payload shows <table class="Ink-table">.' },
          {
            title: 'Helper',
            body: 'buildTableHtml(rows, cols) builds the same markup for server-side or tests.',
          },
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
        text: 'Track changes uses a parallel model: HTML marks (Ink-tc-insert / Ink-tc-delete) plus a trackChanges[] JSON payload. Accept and Reject mutate both so UIs can render a review list without parsing the DOM.',
      },
      {
        type: 'steps',
        title: 'What you get',
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
        text: 'Comments attach to a selection and sync through comments / onCommentsChange as structured threads. showCommentsPanel opens the archive sidebar for review without leaving the editor.',
      },
      {
        type: 'steps',
        title: 'What you get',
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
        text: 'Block mode treats the document as stacked sections. variant="document" outlines the active block; features.blocks adds ↑↓ handles; slash inserts structures via /. Prefer this for long-form, JSON-friendly editing flows.',
      },
      {
        type: 'steps',
        title: 'What you get',
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
        text: 'Sign pad opens a canvas for pointer or touch strokes. On insert, Ink embeds a PNG data URL as an <img> in the HTML payload — no separate upload step required for demos.',
      },
      {
        type: 'steps',
        title: 'What you get',
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
        text: 'keepInMemory persists the HTML draft under ink-memory:{memoryKey} in localStorage. Use a unique key per editor instance. From 1.1.3+, mount restores the draft and calls onChange so controlled parents stay in sync.',
      },
      {
        type: 'steps',
        title: 'What you get',
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
        text: 'Find and replace walks text nodes only — attribute values and class names stay untouched. Use it for content cleanup without corrupting markup or data attributes.',
      },
      {
        type: 'steps',
        title: 'What you get',
        items: [
          { title: 'Open panel', body: 'Toolbar findReplace (or findReplaceDropdown in 1.1.4+).' },
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
        text: 'Theming is CSS-variable driven on .Ink-Editor. Helper classes (snow / bubble / dark / minimal) swap presets quickly; Premium unlocks theme={{ … }} token overrides for product branding.',
      },
      {
        type: 'steps',
        title: 'What you get',
        items: [
          {
            title: 'CSS variables',
            body: 'Override --ink-bg, --ink-text, --ink-border, --ink-toolbar, --ink-accent, --ink-shadow, --ink-radius.',
          },
          {
            title: 'Helper classes',
            body: 'Wrap the editor in ink-theme-snow, ink-theme-bubble, ink-theme-dark, or ink-theme-minimal.',
          },
          {
            title: 'Premium tokens',
            body: 'theme={{ accent, background, radius, … }} when premium is enabled.',
          },
        ],
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
      {
        type: 'p',
        text: 'Tip: start with a helper class for demos, then move brand colors into CSS variables or Premium theme tokens when shipping a product shell.',
      },
    ],
  },
  {
    id: 'typo',
    labelKey: 'tocTypo',
    blocks: [
      {
        type: 'p',
        text: 'typoAutoFix rewrites common typos in the HTML string on blur. Export applyTypoAutoFix when you want the same pipeline outside the editor (API save, batch cleanup).',
      },
      {
        type: 'steps',
        title: 'What you get',
        items: [
          {
            title: 'On blur',
            body: 'Pass typoAutoFix on InkEditor to fix as the user leaves the field.',
          },
          {
            title: 'Standalone helper',
            body: 'applyTypoAutoFix(html) returns { html, fixedCount } for custom pipelines.',
          },
          {
            title: 'Safe on markup',
            body: 'Corrections target text content; structure stays intact.',
          },
        ],
      },
      {
        type: 'code',
        language: 'tsx',
        code: `import { applyTypoAutoFix } from '@forgedevstack/ink';

const { html, fixedCount } = applyTypoAutoFix('<p>teh end</p>');
`,
      },
      {
        type: 'payload',
        label: 'applyTypoAutoFix result',
        data: { html: '<p>the end</p>', fixedCount: 1 },
      },
      {
        type: 'p',
        text: 'Tip: enable typoAutoFix on short form fields; use applyTypoAutoFix on the server or before persist when you need a count for analytics.',
      },
    ],
  },
  {
    id: 'plugins',
    labelKey: 'tocPlugins',
    blocks: [
      {
        type: 'p',
        text: 'Ink plugins mirror the AI provider pattern: register in JS, optional host config. Preferred long-term install is a drag-and-drop .ink package (like a .vsix) — npm remains supported for apps and CI.',
      },
      {
        type: 'html',
        html: `<div class="ink-plugin-row"><span class="ink-plugin-row__name">${INK_EXCEL_PACKAGE_NAME}</span><span class="ink-plugin-row__links"><a class="ink-plugin-row__icon-link" href="${INK_EXCEL_NPM_URL}" target="_blank" rel="noreferrer" aria-label="npm" title="npm"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z"/></svg></a><a class="ink-plugin-row__icon-link" href="${INK_EXCEL_GITHUB_URL}" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.12-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.248 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.479 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a></span></div>`,
      },
      {
        type: 'steps',
        title: 'Install today (npm / JS register)',
        items: [
          {
            title: 'Install packages',
            body: 'npm install @forgedevstack/ink @forgedevstack/ink-excel',
          },
          {
            title: 'Register handler',
            body: 'inkExcel.register(createCsvExcelHandler()) — same idea as inkAi.registerProvider.',
          },
          {
            title: 'Import / export',
            body: 'Call inkExcel.import(file) → Ink-table HTML; inkExcel.export(html) → CSV blob.',
          },
        ],
      },
      {
        type: 'code',
        language: 'tsx',
        code: `import { inkExcel, createCsvExcelHandler } from '@forgedevstack/ink-excel';

inkExcel.register(createCsvExcelHandler());

const result = await inkExcel.import(file);
setHtml(result.html);`,
      },
      {
        type: 'p',
        text: 'Every plugin can be packed as a .ink file (same idea as a .vsix). Drag it onto the editor — loading, install, then the plugin appears.',
      },
      {
        type: 'html',
        html: `<figure class="ink-doc-media"><img src="/ink-drag-drop-install.gif" alt="Drag a .ink plugin onto the editor drop zone" width="720" height="400" class="ink-doc-media__img" /><figcaption class="ink-doc-media__caption">Drag &amp; drop a .ink package</figcaption></figure>`,
      },
      {
        type: 'steps',
        title: 'Install paths',
        items: [
          {
            title: 'npm (today)',
            body: 'npm install @forgedevstack/ink-excel — best for apps and CI.',
          },
          {
            title: 'Drag .ink (coming)',
            body: 'Pack any plugin as .ink, drop it in — loading UI, then the plugin activates.',
          },
          {
            title: 'CMS',
            body: 'Soon — install and entitlement control from your site token / org plan.',
          },
        ],
      },
      {
        type: 'html',
        html: `Links: <a class="ink-doc-link" href="${INK_EXCEL_NPM_URL}" target="_blank" rel="noreferrer">npm</a> · <a class="ink-doc-link" href="${INK_EXCEL_GITHUB_URL}" target="_blank" rel="noreferrer">GitHub</a>`,
      },
    ],
  },
  {
    id: 'ai',
    labelKey: 'tocAi',
    blocks: [
      {
        type: 'p',
        text: 'AI opens as a side panel via ai={{ enabled: true }}. The demo provider runs locally for marketing; register your own LLM with inkAi.registerProvider for production.',
      },
      {
        type: 'steps',
        title: 'What you get',
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
        text: 'Angular apps can host Ink through helpers at @forgedevstack/ink/angular. Mount the React editor via your preferred bridge; props and HTML payloads stay the same as in React.',
      },
      {
        type: 'steps',
        title: 'What you get',
        items: [
          {
            title: 'Angular entry',
            body: 'Import helpers from @forgedevstack/ink/angular.',
          },
          {
            title: 'Same props model',
            body: 'value / onChange, features, and toolbar behave like the React API.',
          },
          {
            title: 'Bridge-friendly',
            body: 'Use your preferred React-in-Angular bridge; Ink stays a controlled HTML surface.',
          },
        ],
      },
      {
        type: 'code',
        language: 'tsx',
        code: `import { /* angular helpers */ } from '@forgedevstack/ink/angular';`,
      },
      {
        type: 'p',
        text: 'Tip: use the Angular helpers when the host app is Angular but content and save APIs still expect HTML strings — avoid rewriting the editor for a second framework.',
      },
    ],
  },
  {
    id: 'wordpress',
    labelKey: 'tocWordpress',
    blocks: [
      {
        type: 'p',
        text: 'WordPress integration ships as a classic meta box stub inside the npm package (wordpress/ink-editor). It mounts Ink for post/meta editing without leaving the WP admin chrome.',
      },
      {
        type: 'steps',
        title: 'What you get',
        items: [
          {
            title: 'Package stub',
            body: 'Find wordpress/ink-editor in the published @forgedevstack/ink package.',
          },
          {
            title: 'Meta box mount',
            body: 'Classic admin box hosts the React editor for HTML content fields.',
          },
          {
            title: 'Same HTML model',
            body: 'Saved content remains an HTML string compatible with WP post content or custom meta.',
          },
        ],
      },
      {
        type: 'p',
        text: 'Tip: use the WordPress stub when you need Ink inside classic admin screens; for block-editor plugins, treat Ink as an embedded React island with the same value/onChange contract.',
      },
    ],
  },
  {
    id: 'accessibility',
    labelKey: 'tocA11y',
    blocks: [
      {
        type: 'p',
        text: 'Ink toolbar controls expose titles and the contenteditable surface supports keyboard formatting. Accessibility is a product concern: labelled wrappers, focus order, and contrast when theming all matter.',
      },
      {
        type: 'steps',
        title: 'What you get',
        items: [
          {
            title: 'Control titles',
            body: 'Toolbar buttons expose accessible titles for screen readers.',
          },
          {
            title: 'Keyboard formatting',
            body: 'contenteditable supports common keyboard formatting shortcuts.',
          },
          {
            title: 'Theme contrast',
            body: 'Prefer labelled wrappers and sufficient contrast when overriding CSS variables.',
          },
        ],
      },
      {
        type: 'p',
        text: 'Tip: when building custom themes, verify focus rings and contrast on toolbar and panel chrome before shipping — especially for dark or high-accent skins.',
      },
    ],
  },
  {
    id: 'collaboration',
    labelKey: 'tocCollaboration',
    blocks: [
      {
        type: 'p',
        text: 'Ink ships comments, track changes, and a Collaborative MVP demo today. Realtime multiplayer presence (live cursors) is scoped as a Yjs/CRDT extension — not an opaque mock. This page documents what is production-ready versus what competes with Tiptap/Hocuspocus next.',
      },
      {
        type: 'steps',
        title: 'What ships now',
        items: [
          {
            title: 'Comments',
            body: 'Thread side-channel JSON — pure decorations over HTML, no document mutation on highlight alone.',
          },
          {
            title: 'Track changes',
            body: 'Accept / reject flow with author metadata for review workflows.',
          },
          {
            title: 'Collaborative MVP demo',
            body: 'Presence stubs for product UX; not a claimed CRDT engine.',
          },
          {
            title: 'Yjs extension (roadmap)',
            body: 'CRDT document sync + live cursors as an installable Extension — parity path vs Tiptap cloud.',
          },
        ],
      },
      {
        type: 'p',
        text: 'Architecture note: Ink keeps HTML as the persisted document. Collaboration decorations must stay pure (presence / cursors / comments) so they do not rewrite the core HTML until a merge step. That is the opposite of bolting OT onto contenteditable without a CRDT store.',
      },
      {
        type: 'code',
        language: 'tsx',
        code: `<InkEditor
  features={{ comments: true, trackChanges: true }}
  comments={threads}
  trackChanges={changes}
  showCommentsPanel
/>`,
      },
      {
        type: 'p',
        text: 'Tip: for CMS multiplayer, install the Realtime Collab (Yjs) extension from Ink CMS → Extensions when it moves from Coming to Available. Until then, use comments + revisions for review.',
      },
    ],
  },
  {
    id: 'premium',
    labelKey: 'tocPremium',
    blocks: [
      {
        type: 'p',
        text: 'Monetization is explicit: MIT core stays free forever; Pro and AI are paid entitlements that fund maintenance — the failure mode Gemini flagged for Quill-style abandonware. Same package binary; gate with premium + ink-server licenses.',
      },
      {
        type: 'steps',
        title: 'What you get',
        items: [
          { title: 'Ink (free / MIT)', body: 'Core editor — no premium tokens, no hosted AI. Safe for OSS and demos.' },
          { title: 'Ink Pro', body: 'Theme / icons / rich paste / BYO AI key via premium + provider register.' },
          { title: 'Ink AI', body: 'Hosted OpenAI — entitlements + token usage from ink-server (Neon).' },
          {
            title: 'Billing posture',
            body: 'Global SaaS: prefer MoR (Paddle / Lemon) for tax; Israel B2B: local PSP (PayMe / Tranzila). Portal checkout wires to ink-server.',
          },
          {
            title: 'Social proof',
            body: 'Ink CMS (this portal) is the first production host. Design-partner logos replace “Coming soon” placeholders as they go live.',
          },
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
          monetization: ['mit-core', 'pro-license', 'ai-usage'],
        },
      },
      {
        type: 'p',
        text: 'Tip: ship the free MIT core for open demos; enable premium when you need brand tokens, rich paste, or hosted AI entitlements without forking the package.',
      },
    ],
  },
];

export const DOCS_PAGE_BY_ID = Object.fromEntries(DOCS_PAGES.map((page) => [page.id, page])) as Record<
  string,
  DocsPageContent
>;

export const DEFAULT_DOCS_SLUG = 'installation';
