import { CMS_AVATAR_INITIALS_LENGTH } from '@const/numbers.const';

export const TASK_STORAGE_KEY = 'ink-cms-tasks';
export const TASK_BOARD_STORAGE_KEY = 'ink-cms-task-board';
export const TASK_DRAG_TYPE = 'text/plain';

export const TASK_STATUS = {
  TODO: 'todo',
  DOING: 'doing',
  DONE: 'done',
} as const;

export const TASK_KIND = {
  BUG: 'bug',
  CHORE: 'chore',
  FEATURE: 'feature',
} as const;

export const TASK_DEFAULT_TAGS = [TASK_KIND.BUG, TASK_KIND.CHORE, TASK_KIND.FEATURE] as const;

export const TASK_KIND_CLASS: Record<string, string> = {
  [TASK_KIND.BUG]: 'ink-cms-board__chip--bug',
  [TASK_KIND.CHORE]: 'ink-cms-board__chip--chore',
  [TASK_KIND.FEATURE]: 'ink-cms-board__chip--feature',
};

export const TASK_PERMISSION = {
  EDIT: 'task:edit',
  STATUS: 'task:status',
  FIELDS: 'task:fields',
} as const;

export const TASK_INITIALS_LENGTH = CMS_AVATAR_INITIALS_LENGTH;
export const TASK_EDITOR_MIN_HEIGHT_PX = 180;
export const TASK_CREATE_MODAL_ID = 'ink-cms-task-create';
export const TASK_TITLE_INPUT_ID = 'ink-cms-task-title';
export const TASK_SUBTITLE_INPUT_ID = 'ink-cms-task-subtitle';
export const TASK_TAG_INPUT_ID = 'ink-cms-task-tag';
export const TASK_STATUS_INPUT_ID = 'ink-cms-task-status-new';
export const TASK_FIELD_NAME_ID = 'ink-cms-task-field-name';
export const TASK_FIELD_OPTION_ID = 'ink-cms-task-field-option';

export const TASK_DEFAULT_STATUSES = [
  { id: TASK_STATUS.TODO, labelKey: 'todo' as const },
  { id: TASK_STATUS.DOING, labelKey: 'doing' as const },
  { id: TASK_STATUS.DONE, labelKey: 'done' as const },
] as const;
