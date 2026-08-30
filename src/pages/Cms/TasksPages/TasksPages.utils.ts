import { EMPTY_STRING } from '@const/index';
import type { CrewPermission, CrewRole, CrewUser } from '../CrewPages/CrewPages.const';
import {
  TASK_BOARD_STORAGE_KEY,
  TASK_DEFAULT_TAGS,
  TASK_PERMISSION,
  TASK_STATUS,
  TASK_STORAGE_KEY,
} from './TasksPages.const';
import type { CmsTask, TaskBoardConfig, TaskCreateDraft, TaskStatusConfig } from './TasksPages.types';

const createId = (prefix: string): string =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const seedTasks = (): CmsTask[] => [];

const readStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string' && item.length > 0);
};

const normalizeTask = (item: unknown): CmsTask | null => {
  if (!item || typeof item !== 'object') return null;
  const raw = item as Record<string, unknown>;
  if (typeof raw.id !== 'string' || typeof raw.title !== 'string') return null;
  const agentIds = readStringArray(raw.agentIds);
  if (typeof raw.agent === 'string' && raw.agent && agentIds.length === 0) {
    agentIds.push(raw.agent);
  }
  const fieldValues =
    raw.fieldValues && typeof raw.fieldValues === 'object' && !Array.isArray(raw.fieldValues)
      ? (raw.fieldValues as Record<string, string>)
      : {};
  return {
    id: raw.id,
    title: raw.title,
    subtitle: typeof raw.subtitle === 'string' ? raw.subtitle : EMPTY_STRING,
    description: typeof raw.description === 'string' ? raw.description : EMPTY_STRING,
    tags: readStringArray(raw.tags),
    agentIds,
    status:
      raw.status === 'doing'
        ? TASK_STATUS.IN_PROGRESS
        : typeof raw.status === 'string'
          ? raw.status
          : TASK_STATUS.TODO,
    fieldValues,
    movedAt: typeof raw.movedAt === 'string' ? raw.movedAt : new Date().toISOString(),
  };
};

export const defaultBoardConfig = (labels: {
  todo: string;
  inProgress: string;
  decline: string;
  inReview: string;
  done: string;
}): TaskBoardConfig => ({
  statuses: [
    { id: TASK_STATUS.TODO, label: labels.todo },
    { id: TASK_STATUS.IN_PROGRESS, label: labels.inProgress },
    { id: TASK_STATUS.DECLINE, label: labels.decline },
    { id: TASK_STATUS.IN_REVIEW, label: labels.inReview },
    { id: TASK_STATUS.DONE, label: labels.done },
  ],
  fields: [],
  tags: [...TASK_DEFAULT_TAGS],
});

export const loadBoardConfig = (fallback: TaskBoardConfig): TaskBoardConfig => {
  try {
    const raw = localStorage.getItem(TASK_BOARD_STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<TaskBoardConfig>;
    const statuses = Array.isArray(parsed.statuses)
      ? parsed.statuses.filter(
          (item): item is TaskStatusConfig =>
            Boolean(item && typeof item.id === 'string' && typeof item.label === 'string'),
        )
      : [];
    return {
      statuses: statuses.length > 0 ? statuses : fallback.statuses,
      fields: Array.isArray(parsed.fields) ? parsed.fields : fallback.fields,
      tags: readStringArray(parsed.tags).length > 0 ? readStringArray(parsed.tags) : fallback.tags,
    };
  } catch {
    return fallback;
  }
};

export const saveBoardConfig = (board: TaskBoardConfig): void => {
  localStorage.setItem(TASK_BOARD_STORAGE_KEY, JSON.stringify(board));
};

export const loadTasks = (): CmsTask[] => {
  try {
    const raw = localStorage.getItem(TASK_STORAGE_KEY);
    if (!raw) return seedTasks();
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return seedTasks();
    const tasks = parsed.map(normalizeTask).filter((item): item is CmsTask => Boolean(item));
    return tasks;
  } catch {
    return seedTasks();
  }
};

export const saveTasks = (tasks: CmsTask[]): void => {
  localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
};

export const createTask = (draft: TaskCreateDraft): CmsTask => ({
  id: createId('task'),
  title: draft.title.trim(),
  subtitle: draft.subtitle.trim(),
  description: draft.description,
  tags: draft.tags,
  agentIds: draft.agentIds,
  status: draft.status,
  fieldValues: draft.fieldValues,
  movedAt: new Date().toISOString(),
});

export const userDisplayName = (user: CrewUser): string =>
  user.name || user.username || user.email;

export const userInitials = (user: CrewUser, length: number): string => {
  const name = userDisplayName(user).trim();
  if (!name) return EMPTY_STRING;
  const parts = name.split(/\s+/);
  if (parts.length > 1) {
    return `${parts[0][0] ?? EMPTY_STRING}${parts[1][0] ?? EMPTY_STRING}`.toUpperCase();
  }
  return name.slice(0, length).toUpperCase();
};

export const hasTaskPermission = (
  userEmail: string,
  users: CrewUser[],
  roles: CrewRole[],
  permission: CrewPermission,
  isAdmin: boolean,
): boolean => {
  if (isAdmin) return true;
  const crew = users.find(
    (user) => user.email === userEmail || user.username === userEmail,
  );
  if (!crew) return false;
  return crew.roleIds.some((roleId) => {
    const role = roles.find((item) => item.id === roleId);
    return role?.permissions.includes(permission as CrewPermission);
  });
};

export const collectTags = (tasks: CmsTask[], boardTags: string[]): string[] => {
  const next = new Set(boardTags);
  tasks.forEach((task) => {
    task.tags.forEach((tag) => next.add(tag));
  });
  return [...next];
};
