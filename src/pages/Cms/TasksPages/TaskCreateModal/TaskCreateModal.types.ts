import type { CrewUser } from '../../CrewPages/CrewPages.const';
import type { TaskBoardConfig, TaskCreateDraft, TaskStatusId } from '../TasksPages.types';

export type TaskCreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (draft: TaskCreateDraft) => void;
  users: CrewUser[];
  board: TaskBoardConfig;
  onCreateTag: (tag: string) => void;
  defaultStatus: TaskStatusId;
  colorMode: 'light' | 'dark';
  canEdit: boolean;
};
