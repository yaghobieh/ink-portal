export type LabDocId = 'design' | 'notes';

export interface LabPageState {
  activeId: LabDocId;
  docs: Record<LabDocId, string>;
}
