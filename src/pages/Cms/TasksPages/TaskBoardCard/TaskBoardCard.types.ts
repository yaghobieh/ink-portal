import type { CrewUser } from '../../CrewPages/CrewPages.const';
import type { CmsTask } from '../TasksPages.types';

export type TaskBoardCardProps = {
  task: CmsTask;
  users: CrewUser[];
  canEdit: boolean;
  onOpen: (task: CmsTask) => void;
};
