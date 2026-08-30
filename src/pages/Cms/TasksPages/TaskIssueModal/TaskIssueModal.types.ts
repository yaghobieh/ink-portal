import type { CrewUser } from '../../CrewPages/CrewPages.const';
import type { CmsTask, TaskBoardConfig, TaskCreateDraft } from '../TasksPages.types';

export type TaskIssueModalProps = {
  isOpen: boolean;
  task: CmsTask | null;
  onClose: () => void;
  onSave: (id: string, draft: TaskCreateDraft) => void;
  users: CrewUser[];
  board: TaskBoardConfig;
  onCreateTag: (tag: string) => void;
  colorMode: 'light' | 'dark';
  canEdit: boolean;
};
