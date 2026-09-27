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
      { type: 'code', language: 'bash', code: 'npm install @forgedevstack/ink@1.1.9' },
      {
        type: 'code',
        language: 'tsx',
        code: `import { useState } from 'react';
import { InkEditor } from '@forgedevstack/ink';
import '@forgedevstack/ink/styles.css';

export function DocumentEditor() {
  const [content, setContent] = useState('<h1>Hello Ink 1.1.9</h1>');

  return (
    <InkEditor
      value={content}
      onChange={setContent}
      variant="classic"
    />
  );
}`,
      },
      {
        type: 'image',
        src: '/docs/installation.svg',
        alt: 'Ink Installation Diagram',
        caption: 'Install @forgedevstack/ink and import styles entry at app root',
      },
      {
        type: 'html',
        html: `Package: <a class="ink-doc-link" href="${NPM_URL}" target="_blank" rel="noreferrer">@forgedevstack/ink</a> · current release <strong>1.1.9</strong>`,
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
        text: 'Theming in Ink is CSS-variable and data-attribute driven. Built-in themes (Paper, Snow, Ink, Dark) can be selected via the toolbar theme dropdown, configured programmatically with themeId="paper", or overridden via custom CSS variables.',
      },
      {
        type: 'steps',
        title: 'Built-in Themes & Controls',
        items: [
          {
            title: 'Paper',
            body: 'Warm editorial cream background (#fdfbf7) with soft sepia ink accents and Georgia typography.',
          },
          {
            title: 'Snow',
            body: 'Crisp minimalist white canvas (#ffffff) with cool slate borders and subtle contrast.',
          },
          {
            title: 'Ink',
            body: 'Signature deep teal accent palette with modern system sans typography.',
          },
          {
            title: 'Dark',
            body: 'High-contrast midnight dark mode (#0f172a) with luminous accents and darkened toolbar.',
          },
        ],
      },
      {
        type: 'image',
        src: '/docs/themes.svg',
        alt: 'Ink Theming Architecture',
        caption: 'Select themes via toolbar dropdown or pass themeId prop',
      },
      {
        type: 'code',
        language: 'tsx',
        code: `import { useState } from 'react';
import { InkEditor } from '@forgedevstack/ink';
import '@forgedevstack/ink/styles.css';

export function ThemedEditor() {
  const [theme, setTheme] = useState<'paper' | 'snow' | 'ink' | 'dark'>('paper');

  return (
    <InkEditor
      themeId={theme}
      onThemeChange={setTheme}
      toolbar={['headingDropdown', 'fontDropdown', 'bold', 'italic', 'divider', 'theme']}
      features={{ theme: true }}
    />
  );
}`,
      },
      {
        type: 'p',
        text: 'Custom CSS variables can also be overridden on .Ink-Editor or any enclosing parent container:',
      },
      {
        type: 'code',
        language: 'css',
        code: `.Ink-Editor[data-ink-theme="paper"] {
  --ink-bg: #fdfbf7;
  --ink-text: #292524;
  --ink-border: #e7e5e4;
  --ink-toolbar: #f5f0e8;
  --ink-accent: #b45309;
}`,
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
        text: 'Ink provides a modular plugin ecosystem for specialized document features like spreadsheet tables, autonomous AI assistants, SVG charts, stylized heading presets, multi-document tabs, and real-time collaboration. Each plugin can be installed via npm or configured directly into the editor toolbar.',
      },
      {
        type: 'html',
        html: `<div class="ink-plugin-cards flex flex-col gap-4 my-6">
  <div class="ink-plugin-card p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
      <div class="flex items-center gap-2">
        <span class="text-base font-bold">Ink Excel</span>
        <code class="text-xs px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-mono">@forgedevstack/ink-excel</code>
      </div>
      <div class="flex items-center gap-2">
        <a class="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition" href="/demos/sheet">⚡ Live Demo</a>
        <a class="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono hover:bg-slate-200" href="${INK_EXCEL_NPM_URL}" target="_blank" rel="noreferrer">npm</a>
        <a class="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono hover:bg-slate-200" href="${INK_EXCEL_GITHUB_URL}" target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </div>
    <p class="text-sm text-slate-600 dark:text-slate-400 mb-0"><strong>Spreadsheet grid, formulas &amp; CSV/XLSX import:</strong> Embeds a full spreadsheet calculation grid inside Ink. Supports column letters, row numbers, formula evaluation, real-time cell editing, and bidirectional import/export with CSV and Microsoft Excel XLSX files.</p>
  </div>

  <div class="ink-plugin-card p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
      <div class="flex items-center gap-2">
        <span class="text-base font-bold">Ink AI</span>
        <code class="text-xs px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-mono">@forgedevstack/ink/plugins/ai</code>
      </div>
      <div class="flex items-center gap-2">
        <a class="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition" href="/demos/ai">⚡ Live Demo</a>
        <a class="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono hover:bg-slate-200" href="${NPM_URL}" target="_blank" rel="noreferrer">npm</a>
        <a class="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono hover:bg-slate-200" href="https://github.com/yaghobieh/ink" target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </div>
    <p class="text-sm text-slate-600 dark:text-slate-400 mb-0"><strong>Autonomous writing assistant &amp; prompt chat:</strong> Generative AI embedded in the editor flow with inline ghost autocompletion (Tab to accept), rewrite and summarize actions, multi-turn chat panel, and customizable BYO LLM provider endpoints.</p>
  </div>

  <div class="ink-plugin-card p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
      <div class="flex items-center gap-2">
        <span class="text-base font-bold">Ink Graph</span>
        <code class="text-xs px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-mono">@forgedevstack/ink/plugins/graph</code>
      </div>
      <div class="flex items-center gap-2">
        <a class="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-600 text-white hover:bg-amber-700 transition" href="/demos/graph">⚡ Live Demo</a>
        <a class="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono hover:bg-slate-200" href="${NPM_URL}" target="_blank" rel="noreferrer">npm</a>
        <a class="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono hover:bg-slate-200" href="https://github.com/yaghobieh/ink" target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </div>
    <p class="text-sm text-slate-600 dark:text-slate-400 mb-0"><strong>Interactive bar, line, and pie charts:</strong> Generates crisp SVG vector diagrams inside document copy. Authors can change chart types on the fly, right-click any chart to adjust values in a modal, and pick custom color palettes.</p>
  </div>

  <div class="ink-plugin-card p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
      <div class="flex items-center gap-2">
        <span class="text-base font-bold">Ink Titles</span>
        <code class="text-xs px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-mono">@forgedevstack/ink/plugins/titles</code>
      </div>
      <div class="flex items-center gap-2">
        <a class="text-xs font-semibold px-2.5 py-1 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition" href="/demos/titles">⚡ Live Demo</a>
        <a class="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono hover:bg-slate-200" href="${NPM_URL}" target="_blank" rel="noreferrer">npm</a>
        <a class="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono hover:bg-slate-200" href="https://github.com/yaghobieh/ink" target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </div>
    <p class="text-sm text-slate-600 dark:text-slate-400 mb-0"><strong>Word-era styled title gallery &amp; header presets:</strong> Offers 30 distinct typographic treatments in a visual gallery dropdown. Enables rapid insertion of gradient headlines, neon glow banners, framed headers, and decorative accents.</p>
  </div>

  <div class="ink-plugin-card p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
      <div class="flex items-center gap-2">
        <span class="text-base font-bold">Ink Collab</span>
        <code class="text-xs px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-mono">@forgedevstack/ink/collab</code>
      </div>
      <div class="flex items-center gap-2">
        <a class="text-xs font-semibold px-2.5 py-1 rounded-md bg-rose-600 text-white hover:bg-rose-700 transition" href="/demos/collaborative">⚡ Live Demo</a>
        <a class="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono hover:bg-slate-200" href="${NPM_URL}" target="_blank" rel="noreferrer">npm</a>
        <a class="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono hover:bg-slate-200" href="https://github.com/yaghobieh/ink" target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </div>
    <p class="text-sm text-slate-600 dark:text-slate-400 mb-0"><strong>Multi-doc tabs, presence avatars &amp; remote cursors:</strong> Enables collaborative editing sessions with isolated undo/redo per document buffer (InkTabs), document tree navigation (InkWorkspace), active collaborator presence stacks, and colored cursor labels.</p>
  </div>

  <div class="ink-plugin-card p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
      <div class="flex items-center gap-2">
        <span class="text-base font-bold">Ink Theme</span>
        <code class="text-xs px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-mono">@forgedevstack/ink/plugins/theme</code>
      </div>
      <div class="flex items-center gap-2">
        <a class="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition" href="/lab">⚡ Open in Lab</a>
        <a class="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono hover:bg-slate-200" href="${NPM_URL}" target="_blank" rel="noreferrer">npm</a>
        <a class="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono hover:bg-slate-200" href="https://github.com/yaghobieh/ink" target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </div>
    <p class="text-sm text-slate-600 dark:text-slate-400 mb-0"><strong>Dynamic theme switcher:</strong> Scope-isolated styling engine featuring Paper (warm parchment), Snow (crisp white), Ink (sapphire signature), and Dark (high-contrast midnight) modes for both the editor and workspace chrome.</p>
  </div>
</div>`,
      },
      {
        type: 'steps',
        title: 'How to Install & Configure Plugins',
        items: [
          {
            title: '1. Install Packages',
            body: 'Install the core editor and plugin extensions: npm install @forgedevstack/ink @forgedevstack/ink-excel',
          },
          {
            title: '2. Enable in Toolbar & Features',
            body: 'Add the plugin keys to your toolbar configuration (excel, graph, titles, theme, ai) and set features[pluginName] = true.',
          },
          {
            title: '3. Optional Provider Registration',
            body: 'For AI and custom data sources, call inkAi.registerProvider(...) or inkExcel.register(...) to attach custom backends.',
          },
        ],
      },
      {
        type: 'code',
        language: 'tsx',
        code: `import { InkEditor } from '@forgedevstack/ink';
import '@forgedevstack/ink/styles.css';

export const MyEditor = () => (
  <InkEditor
    value="<h1>Hello World</h1>"
    toolbar={[
      'headingDropdown', 'fontDropdown', 'bold', 'italic',
      'divider', 'table', 'excel', 'graph', 'titles', 'theme', 'ai'
    ]}
    features={{
      table: true,
      excel: true,
      graph: true,
      titles: true,
      theme: true,
      ai: true,
    }}
  />
);`,
      },
      {
        type: 'html',
        html: `<figure class="ink-doc-media"><img src="/ink-drag-drop-install.gif" alt="Drag a .ink plugin onto the editor drop zone" width="720" height="400" class="ink-doc-media__img" /><figcaption class="ink-doc-media__caption">Drag &amp; drop a .ink plugin package directly into the editor</figcaption></figure>`,
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
        text: 'Ink 1.1.9 ships real-time presence avatars (PresenceStack), follow-mode navigation, remote cursor broadcasting, multi-document tab workspaces (InkTabs), and the useInkCollaboration hook. Document content stays pure HTML while collaboration states are handled via structured side channels.',
      },
      {
        type: 'steps',
        title: 'Collaboration Features in 1.1.9',
        items: [
          {
            title: 'PresenceStack Avatars',
            body: 'Displays active collaborator avatars with green (active) and amber (idle) status dots in the toolbar.',
          },
          {
            title: 'Follow Collaborator (onFollow)',
            body: 'Clicking an avatar button calls onFollow(collaborator), allowing host apps to scroll to their caret or active block.',
          },
          {
            title: 'Remote Cursors',
            body: 'Broadcasts caret position and selection range with custom user colors and name tags.',
          },
          {
            title: 'useInkCollaboration Hook',
            body: 'Manages connected users, active/idle heartbeat, and cursor dispatch over WebSockets, WebRTC, or BroadcastChannel.',
          },
        ],
      },
      {
        type: 'image',
        src: '/docs/collaboration.svg',
        alt: 'Realtime Collaboration in Ink',
        caption: 'Presence avatars, live remote cursors, and multi-doc tabs',
      },
      {
        type: 'code',
        language: 'tsx',
        code: `import React from 'react';
import { InkEditor, useInkCollaboration } from '@forgedevstack/ink';
import type { InkCollaborator } from '@forgedevstack/ink';
import '@forgedevstack/ink/styles.css';

export function CollaborativeEditor({ docId, currentUser }: { docId: string; currentUser: InkCollaborator }) {
  const {
    collaborators,
    broadcastCursor,
  } = useInkCollaboration({
    roomId: docId,
    user: currentUser,
  });

  const handleFollow = (collaborator: InkCollaborator) => {
    if (collaborator.cursor?.blockId) {
      document.querySelector(\`[data-block-id="\${collaborator.cursor.blockId}"]\`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <InkEditor
      value="<p>Collaborative document...</p>"
      collaboration={{
        enabled: true,
        showPresenceStack: true,
        maxAvatars: 4,
        collaborators,
        onFollow: handleFollow,
        onBroadcastCursor: broadcastCursor,
      }}
    />
  );
}`,
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
