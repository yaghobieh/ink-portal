import { NPM_URL } from './urls.const';

export type DocsBlock =
  | { type: 'p'; text: string }
  | { type: 'code'; code: string }
  | { type: 'html'; html: string };

export interface DocsPageContent {
  id: string;
  labelKey:
    | 'tocInstallation'
    | 'tocQuickstart'
    | 'tocConfiguration'
    | 'tocToolbar'
    | 'tocModules'
    | 'tocTables'
    | 'tocTrackChanges'
    | 'tocComments'
    | 'tocBlocks'
    | 'tocSignPad'
    | 'tocMemory'
    | 'tocFindReplace'
    | 'tocThemes'
    | 'tocTypo'
    | 'tocAi'
    | 'tocAngular'
    | 'tocWordpress'
    | 'tocA11y'
    | 'tocPremium';
  blocks: DocsBlock[];
}

export const DOCS_PAGES: DocsPageContent[] = [
  {
    id: 'installation',
    labelKey: 'tocInstallation',
    blocks: [
      { type: 'p', text: 'Install from npm. Peer deps: React 18+.' },
      { type: 'code', code: 'npm install @forgedevstack/ink' },
      {
        type: 'html',
        html: `Package: <a class="ink-doc-link" href="${NPM_URL}" target="_blank" rel="noreferrer">@forgedevstack/ink</a>`,
      },
    ],
  },
  {
    id: 'quickstart',
    labelKey: 'tocQuickstart',
    blocks: [
      { type: 'p', text: 'Minimal controlled editor with typo auto-fix and the classic shell.' },
      {
        type: 'code',
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
      },
    ],
  },
  {
    id: 'configuration',
    labelKey: 'tocConfiguration',
    blocks: [
      {
        type: 'p',
        text: 'Controlled HTML via value / onChange. 1.1.x adds variant, features, trackChanges, comments, showCommentsPanel, ai, slashCommands, author, tableRows / tableCols, keepInMemory, memoryKey.',
      },
      {
        type: 'code',
        code: `<InkEditor
  value={html}
  onChange={setHtml}
  keepInMemory
  memoryKey="my-draft"
  features={{
    table: true,
    signature: true,
    findReplace: true,
    horizontalRule: true,
  }}
/>`,
      },
    ],
  },
  {
    id: 'toolbar',
    labelKey: 'tocToolbar',
    blocks: [
      {
        type: 'p',
        text: 'Toolbar options include table, signature, findReplace, horizontalRule, undo, redo, trackChanges, comments, ai plus classic formats. Presets: INK_DEFAULT_TOOLBAR, INK_SIMPLE_TOOLBAR, INK_COLLAB_TOOLBAR.',
      },
      {
        type: 'code',
        code: `toolbar={[
  'bold',
  'italic',
  'divider',
  'signature',
  'findReplace',
  'horizontalRule',
  'divider',
  'undo',
  'redo',
]}`,
      },
    ],
  },
  {
    id: 'modules',
    labelKey: 'tocModules',
    blocks: [
      {
        type: 'p',
        text: 'Pass features={{ table, trackChanges, comments, ai, blocks, slash, signature, findReplace, horizontalRule }} to enable modules. Legacy props typoAutoFix, allowImagePaste, showCharCount still work.',
      },
    ],
  },
  {
    id: 'tables',
    labelKey: 'tocTables',
    blocks: [
      {
        type: 'p',
        text: 'Toolbar table button inserts an N×M HTML table (tableRows / tableCols). Cells are contenteditable. Helper: buildTableHtml(rows, cols).',
      },
    ],
  },
  {
    id: 'track-changes',
    labelKey: 'tocTrackChanges',
    blocks: [
      {
        type: 'p',
        text: 'Enable via toolbar toggle. Inserts wrap in Ink-tc-insert, deletes in Ink-tc-delete. Parallel model: trackChanges / onTrackChangesChange with Accept/Reject strip.',
      },
    ],
  },
  {
    id: 'comments',
    labelKey: 'tocComments',
    blocks: [
      {
        type: 'p',
        text: 'Highlight selection → prompt → yellow mark + Comments archive sidebar. Props: comments, onCommentsChange, showCommentsPanel.',
      },
    ],
  },
  {
    id: 'blocks',
    labelKey: 'tocBlocks',
    blocks: [
      {
        type: 'p',
        text: 'Document/classic variants outline the active block. Block handles move up/down. Slash menu: type / for heading, list, table, AI.',
      },
    ],
  },
  {
    id: 'sign-pad',
    labelKey: 'tocSignPad',
    blocks: [
      {
        type: 'p',
        text: 'Sign pad (1.1.2) opens a canvas from the toolbar. Draw with pointer/touch, then Insert to place a PNG image in the document.',
      },
      {
        type: 'code',
        code: `import { useState } from 'react';
import { InkEditor } from '@forgedevstack/ink';
import '@forgedevstack/ink/styles.css';

export function ContractEditor() {
  const [html, setHtml] = useState('<p>Sign below.</p>');
  return (
    <InkEditor
      value={html}
      onChange={setHtml}
      features={{ signature: true }}
      toolbar={['bold', 'italic', 'divider', 'signature', 'undo', 'redo']}
    />
  );
}`,
      },
      {
        type: 'p',
        text: 'How to test: open Playground → click ✍ → draw → Insert. The signature appears as an <img> in the HTML.',
      },
    ],
  },
  {
    id: 'keep-in-memory',
    labelKey: 'tocMemory',
    blocks: [
      {
        type: 'p',
        text: 'keepInMemory stores draft HTML in localStorage under ink-memory:{memoryKey}. Use a unique memoryKey per editor instance. Uncontrolled mode (no value prop) restores on mount; controlled value skips restore so React stays source of truth.',
      },
      {
        type: 'code',
        code: `<InkEditor
  defaultValue="<p>Draft…</p>"
  onChange={setHtml}
  keepInMemory
  memoryKey="contract-draft"
/>`,
      },
    ],
  },
  {
    id: 'find-replace',
    labelKey: 'tocFindReplace',
    blocks: [
      {
        type: 'p',
        text: 'Find & replace walks text nodes only — attribute values (class, href) are left intact. Replace one or replace all from the toolbar panel.',
      },
      {
        type: 'code',
        code: `<InkEditor
  value={html}
  onChange={setHtml}
  features={{ findReplace: true }}
  toolbar={['findReplace', 'bold', 'italic']}
/>`,
      },
    ],
  },
  {
    id: 'themes',
    labelKey: 'tocThemes',
    blocks: [
      {
        type: 'p',
        text: 'CSS variables on .Ink-Editor including --ink-shadow, --ink-radius, --ink-ai-*. Theme classes: snow / bubble / dark / minimal.',
      },
    ],
  },
  {
    id: 'typo',
    labelKey: 'tocTypo',
    blocks: [
      {
        type: 'p',
        text: 'typoAutoFix runs blur-time dictionary fixes. Export applyTypoAutoFix.',
      },
    ],
  },
  {
    id: 'ai',
    labelKey: 'tocAi',
    blocks: [
      {
        type: 'p',
        text: 'Side panel via ai={{ enabled: true, placement: "sidebar" }}. Demo provider is built-in. Bring your own LLM:',
      },
      {
        type: 'code',
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
      {
        type: 'p',
        text: 'Honesty: catalog constants only — Ink does not host models or claim SOC2/enterprise hosting.',
      },
    ],
  },
  {
    id: 'angular',
    labelKey: 'tocAngular',
    blocks: [
      {
        type: 'p',
        text: 'Import helpers from @forgedevstack/ink/angular. Mount React InkEditor via your preferred bridge.',
      },
    ],
  },
  {
    id: 'wordpress',
    labelKey: 'tocWordpress',
    blocks: [
      {
        type: 'p',
        text: 'See wordpress/ink-editor in the package for a classic meta box stub.',
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
        text: 'Ink Premium unlocks theme tokens, custom icons, rich HTML paste, onImageUpload, and wysiwyg. Same npm package. Activate with premium={{ enabled: true }} locally or premium={{ licenseKey }} after Stripe checkout.',
      },
      {
        type: 'code',
        code: `<InkEditor
  premium={{ licenseKey: 'ink_prem_AB12_CD34_EF56_GH78' }}
  theme={{ accent: '#0f766e', background: '#fff', radius: '1rem' }}
  icons={{ bold: <BoldIcon />, ai: <SparkIcon /> }}
  pasteMode="rich"
  wysiwyg
  onImageUpload={async (file) => {
    const url = await upload(file);
    return url;
  }}
/>`,
      },
      {
        type: 'p',
        text: 'Billing: Stripe Payment Link → webhook checkout.session.completed → mintInkPremiumLicenseKey(). See /pricing and ink/examples/stripe-webhook.mjs. Israel: full Stripe needs an entity in a supported country (e.g. Atlas).',
      },
    ],
  },
];

export const DOCS_PAGE_BY_ID = Object.fromEntries(DOCS_PAGES.map((page) => [page.id, page])) as Record<
  string,
  DocsPageContent
>;

export const DEFAULT_DOCS_SLUG = 'installation';
