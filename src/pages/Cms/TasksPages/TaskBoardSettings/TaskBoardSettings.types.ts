import type { TaskBoardConfig } from '../TasksPages.types';

export type TaskBoardSettingsProps = {
  isOpen: boolean;
  onClose: () => void;
  board: TaskBoardConfig;
  onAddStatus: (label: string) => void;
  onAddField: (name: string, option: string) => void;
  canStatus: boolean;
  canFields: boolean;
};
