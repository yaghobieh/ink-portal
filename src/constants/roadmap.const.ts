export type RoadmapItem = {
  id: string;
  title: string;
  body: string;
};

export const ROADMAP_1_1_5: RoadmapItem[] = [
  {
    id: 'shortcuts',
    title: 'Configurable shortcuts',
    body: 'User-overridable key map for bold, lists, headings, find, and custom commands (closes GitHub #30).',
  },
  {
    id: 'real-agent',
    title: 'Real AI agent',
    body: 'Hosted OpenAI via ink-server with live autocomplete, rewrite suggestions, and usage metering — not demo stubs.',
  },
  {
    id: 'tables',
    title: 'Table power tools',
    body: 'Split cells, Tab-advance, row/col inserts polished for CMS documents (#24, #29).',
  },
  {
    id: 'mcp-excel',
    title: 'MCP Excel plugin',
    body: 'First-class block that syncs table/list data through MCP into Excel.',
  },
  {
    id: 'docs-gifs',
    title: 'Docs with GIFs',
    body: 'Editor.js-style animated guides for inline toolbar, block +, and tunes.',
  },
];
