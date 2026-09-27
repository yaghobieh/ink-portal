import type { InkDocument, InkFolder, InkSplitMode } from '@forgedevstack/ink';

export interface LabPageState {
  documents: InkDocument[];
  activeDocumentId: string;
  folders: InkFolder[];
  splitMode: InkSplitMode;
  secondaryDocumentId: string | null;
}
