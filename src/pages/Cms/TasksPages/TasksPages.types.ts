export type TaskStatusId = string;

export type CmsTask = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  agentIds: string[];
  status: TaskStatusId;
  fieldValues: Record<string, string>;
  movedAt: string;
};

export type TaskStatusConfig = {
  id: string;
  label: string;
};

export type TaskFieldConfig = {
  id: string;
  label: string;
  options: string[];
};

export type TaskBoardConfig = {
  statuses: TaskStatusConfig[];
  fields: TaskFieldConfig[];
  tags: string[];
};

export type TaskCreateDraft = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  agentIds: string[];
  status: TaskStatusId;
  fieldValues: Record<string, string>;
};
