export type ExtensionStatus = 'available' | 'installed' | 'coming';

export type ExtensionItem = {
  id: string;
  name: string;
  description: string;
  version: string;
  tags: string[];
  status: ExtensionStatus;
};

export const EXTENSION_CATALOG: ExtensionItem[] = [
  {
    id: 'seo-pack',
    name: 'SEO Pack',
    description: 'Meta title, description, Open Graph fields on every page publish.',
    version: '0.2.0',
    tags: ['seo', 'publish'],
    status: 'installed',
  },
  {
    id: 'live-edit-bridge',
    name: 'Live Edit Bridge',
    description: 'Edit published pages on the customer site with Bifrost SDK.',
    version: '0.1.0',
    tags: ['live-edit', 'sdk'],
    status: 'installed',
  },
  {
    id: 'revisions',
    name: 'Revisions',
    description: 'Local revision snapshots before each save — restore any prior draft.',
    version: '0.1.0',
    tags: ['history'],
    status: 'installed',
  },
  {
    id: 'collab-yjs',
    name: 'Realtime Collab (Yjs)',
    description: 'CRDT presence + live cursors — competitive parity with Tiptap/Hocuspocus.',
    version: '0.0.1',
    tags: ['collab', 'crdt'],
    status: 'coming',
  },
  {
    id: 'ink-excel',
    name: 'Ink Excel',
    description: 'Spreadsheet block plugin for docs and CMS pages.',
    version: '1.0.0',
    tags: ['plugin', 'blocks'],
    status: 'available',
  },
  {
    id: 'schedule-publish',
    name: 'Schedule Publish',
    description: 'Queue publish at a future datetime from the edit drawer.',
    version: '0.1.0',
    tags: ['publish'],
    status: 'installed',
  },
];
