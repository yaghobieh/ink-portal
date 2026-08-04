import {
  DEMO_HTML_AI,
  DEMO_HTML_COLLAB,
  DEMO_HTML_DOCUMENT,
  DEMO_HTML_FEATURE,
  DEMO_HTML_TABLES,
  MOCK_COLLAB_COMMENTS,
  MOCK_COLLAB_TRACK,
} from './demos.const';
import type { DocDemoBlock } from './docsContent.types';

export const DOC_DEMO_CONFIGURATION: DocDemoBlock = {
  type: 'demo',
  id: 'config-core',
  title: 'What changes when you set props',
  description:
    'Toggle modules via features, persist with keepInMemory, and watch the live HTML + payload tabs as you type.',
  initialHtml: DEMO_HTML_FEATURE,
  code: `const [html, setHtml] = useState(${JSON.stringify(DEMO_HTML_FEATURE)});

<InkEditor
  value={html}
  onChange={setHtml}
  variant="classic"
  keepInMemory
  memoryKey="docs-config"
  showCharCount
  features={{
    table: true,
    signature: true,
    findReplace: true,
    horizontalRule: true,
    blocks: true,
    slash: true,
  }}
  toolbar={[
    'headingDropdown',
    'bold',
    'italic',
    'divider',
    'table',
    'signature',
    'findReplace',
    'horizontalRule',
    'undo',
    'redo',
  ]}
/>`,
  editor: {
    variant: 'classic',
    keepInMemory: true,
    memoryKey: 'docs-config',
    showCharCount: true,
    features: {
      table: true,
      signature: true,
      findReplace: true,
      horizontalRule: true,
      blocks: true,
      slash: true,
    },
    toolbar: [
      'headingDropdown',
      'bold',
      'italic',
      'divider',
      'table',
      'signature',
      'findReplace',
      'horizontalRule',
      'undo',
      'redo',
    ],
  },
  payload: {
    label: 'Controlled state shape',
    data: {
      props: {
        variant: 'classic',
        keepInMemory: true,
        memoryKey: 'docs-config',
        features: {
          table: true,
          signature: true,
          findReplace: true,
          horizontalRule: true,
          blocks: true,
          slash: true,
        },
      },
    },
  },
};

export const DOC_DEMO_BLOCKS: DocDemoBlock = {
  type: 'demo',
  id: 'blocks-slash',
  title: 'Blocks & slash',
  description:
    'Use variant="document" for block outlines. Hover a block for ↑↓ handles. Type / for the slash menu.',
  initialHtml: DEMO_HTML_DOCUMENT,
  code: `<InkEditor
  value={html}
  onChange={setHtml}
  variant="document"
  features={{ blocks: true, slash: true, table: true }}
  slashCommands
  toolbar={['headingDropdown', 'bold', 'italic', 'table', 'undo', 'redo']}
/>`,
  editor: {
    variant: 'document',
    features: { blocks: true, slash: true, table: true },
    slashCommands: true,
    toolbar: ['headingDropdown', 'bold', 'italic', 'table', 'undo', 'redo'],
  },
  payload: {
    label: 'Slash command item shape',
    data: {
      slashItem: {
        id: 'heading1',
        label: 'Heading 1',
        keywords: ['h1', 'title'],
      },
      features: { blocks: true, slash: true },
      slashCommands: true,
      variant: 'document',
    },
  },
};

export const DOC_DEMO_TABLES: DocDemoBlock = {
  type: 'demo',
  id: 'tables-live',
  title: 'Tables',
  description: 'Click the table toolbar button to insert N×M. Edit cells inline. HTML uses .Ink-table.',
  initialHtml: DEMO_HTML_TABLES,
  code: `<InkEditor
  value={html}
  onChange={setHtml}
  tableRows={3}
  tableCols={3}
  features={{ table: true }}
  toolbar={['bold', 'italic', 'table', 'undo', 'redo']}
/>`,
  editor: {
    tableRows: 3,
    tableCols: 3,
    features: { table: true },
    toolbar: ['bold', 'italic', 'table', 'undo', 'redo'],
  },
  payload: {
    label: 'Insert payload',
    data: { tableRows: 3, tableCols: 3, helper: 'buildTableHtml(rows, cols)' },
  },
};

export const DOC_DEMO_TRACK: DocDemoBlock = {
  type: 'demo',
  id: 'track-changes-live',
  title: 'Track changes',
  description: 'Enable TC on the toolbar. Inserts/deletes wrap in Ink-tc-* marks. Accept/Reject updates the payload.',
  initialHtml: DEMO_HTML_COLLAB,
  code: `const [trackChanges, setTrackChanges] = useState(MOCK_COLLAB_TRACK);

<InkEditor
  value={html}
  onChange={setHtml}
  author="You"
  trackChangesEnabled
  trackChanges={trackChanges}
  onTrackChangesChange={setTrackChanges}
  features={{ trackChanges: true }}
  toolbar={['bold', 'italic', 'trackChanges', 'undo', 'redo']}
/>`,
  editor: {
    author: 'You',
    trackChangesEnabled: true,
    trackChanges: MOCK_COLLAB_TRACK,
    features: { trackChanges: true },
    toolbar: ['bold', 'italic', 'trackChanges', 'undo', 'redo'],
  },
  payload: {
    label: 'trackChanges array',
    data: { trackChanges: MOCK_COLLAB_TRACK },
  },
};

export const DOC_DEMO_COMMENTS: DocDemoBlock = {
  type: 'demo',
  id: 'comments-live',
  title: 'Comments archive',
  description: 'Select text → Comments. Sidebar lists threads. Payload shows comment JSON as you add replies.',
  initialHtml: DEMO_HTML_COLLAB,
  code: `const [comments, setComments] = useState(MOCK_COLLAB_COMMENTS);

<InkEditor
  value={html}
  onChange={setHtml}
  author="You"
  comments={comments}
  onCommentsChange={setComments}
  showCommentsPanel
  features={{ comments: true }}
  toolbar={['bold', 'italic', 'comments', 'undo', 'redo']}
/>`,
  editor: {
    author: 'You',
    comments: MOCK_COLLAB_COMMENTS,
    showCommentsPanel: true,
    features: { comments: true },
    toolbar: ['bold', 'italic', 'comments', 'undo', 'redo'],
  },
  payload: {
    label: 'comments threads',
    data: { comments: MOCK_COLLAB_COMMENTS },
  },
};

export const DOC_DEMO_SIGN: DocDemoBlock = {
  type: 'demo',
  id: 'sign-pad-live',
  title: 'Sign pad',
  description: 'Click ✍ → draw → Insert. Check HTML tab for the data:image/png img node.',
  initialHtml: '<p>Sign the agreement below.</p><p></p>',
  code: `<InkEditor
  value={html}
  onChange={setHtml}
  features={{ signature: true }}
  toolbar={['bold', 'italic', 'signature', 'undo', 'redo']}
/>`,
  editor: {
    features: { signature: true },
    toolbar: ['bold', 'italic', 'signature', 'undo', 'redo'],
  },
  payload: {
    label: 'Inserted image shape',
    data: {
      node: '<img src="data:image/png;base64,…" alt="signature" />',
      mime: 'image/png',
    },
  },
};

export const DOC_DEMO_MEMORY: DocDemoBlock = {
  type: 'demo',
  id: 'memory-live',
  title: 'Keep in memory',
  description:
    'Type, refresh the page — draft restores from localStorage key ink-memory:docs-memory (1.1.3+ restores controlled mounts too).',
  initialHtml: '<p>Edit this draft, then refresh.</p>',
  code: `<InkEditor
  value={html}
  onChange={setHtml}
  keepInMemory
  memoryKey="docs-memory"
  toolbar={['bold', 'italic', 'undo', 'redo']}
/>`,
  editor: {
    keepInMemory: true,
    memoryKey: 'docs-memory',
    toolbar: ['bold', 'italic', 'undo', 'redo'],
  },
  payload: {
    label: 'Storage',
    data: {
      key: 'ink-memory:docs-memory',
      api: ['readInkMemory', 'writeInkMemory', 'clearInkMemory'],
    },
  },
};

export const DOC_DEMO_FIND: DocDemoBlock = {
  type: 'demo',
  id: 'find-replace-live',
  title: 'Find & replace',
  description: 'Open find/replace from the toolbar. Only text nodes change — class="find-me" stays intact.',
  initialHtml: '<p class="find-me">find me once, find me twice</p>',
  code: `<InkEditor
  value={html}
  onChange={setHtml}
  features={{ findReplace: true }}
  toolbar={['findReplace', 'bold', 'italic']}
/>`,
  editor: {
    features: { findReplace: true },
    toolbar: ['findReplace', 'bold', 'italic'],
  },
  payload: {
    label: 'replaceInHtml(html, find, replace, replaceAll)',
    data: {
      find: 'find',
      replace: 'seek',
      replaceAll: true,
      preservesAttributes: true,
    },
  },
};

export const DOC_DEMO_AI: DocDemoBlock = {
  type: 'demo',
  id: 'ai-live',
  title: 'Ink AI sidebar',
  description: 'Open AI from the toolbar. Demo provider is local — swap via inkAi.registerProvider.',
  initialHtml: DEMO_HTML_AI,
  code: `<InkEditor
  value={html}
  onChange={setHtml}
  features={{ ai: true }}
  ai={{ enabled: true, placement: 'sidebar', openOnInit: true, showHistory: true }}
  toolbar={['bold', 'italic', 'ai', 'undo', 'redo']}
/>`,
  editor: {
    features: { ai: true },
    ai: { enabled: true, placement: 'sidebar', openOnInit: true, showHistory: true },
    toolbar: ['bold', 'italic', 'ai', 'undo', 'redo'],
  },
  payload: {
    label: 'ai config + provider run request',
    data: {
      ai: { enabled: true, placement: 'sidebar' },
      providerRun: {
        html: '<p>…</p>',
        selectionHtml: '',
        action: 'summarize',
      },
    },
  },
};
