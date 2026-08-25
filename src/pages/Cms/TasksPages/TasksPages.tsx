import { useEffect, useState, type DragEvent, type FC } from 'react';
import { Badge, BearIcons, Button, Flex, Input, Typography } from '@forgedevstack/bear';
import { useAuth } from '@hooks/index';
import { useI18n } from '@i18n/index';
import { EMPTY_STRING } from '@const/index';
import { CMS_ICON_SIZE } from '@const/numbers.const';
import { fetchCrewRoles, fetchCrewUsers, notifyTaskAgentsRequest } from '@sdk/modules/cms';
import type { CrewRole, CrewUser } from '../CrewPages/CrewPages.const';
import { CmsShell, CMS_NAV_IDS } from '../CmsShell';
import { TaskBoardCard } from './TaskBoardCard';
import { TaskCreateModal } from './TaskCreateModal';
import {
  TASK_DRAG_TYPE,
  TASK_FIELD_NAME_ID,
  TASK_FIELD_OPTION_ID,
  TASK_PERMISSION,
  TASK_STATUS,
  TASK_STATUS_INPUT_ID,
} from './TasksPages.const';
import type { CmsTask, TaskBoardConfig, TaskCreateDraft } from './TasksPages.types';
import {
  collectTags,
  createTask,
  defaultBoardConfig,
  hasTaskPermission,
  loadBoardConfig,
  loadTasks,
  saveBoardConfig,
  saveTasks,
} from './TasksPages.utils';

export const TasksPages: FC = () => {
  const { t } = useI18n();
  const { token, user } = useAuth();
  const fallbackBoard = defaultBoardConfig({
    todo: t.cmsTasks.todo,
    doing: t.cmsTasks.doing,
    done: t.cmsTasks.done,
  });
  const [tasks, setTasks] = useState<CmsTask[]>(() => loadTasks());
  const [board, setBoard] = useState<TaskBoardConfig>(() => loadBoardConfig(fallbackBoard));
  const [users, setUsers] = useState<CrewUser[]>([]);
  const [roles, setRoles] = useState<CrewRole[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<string>(TASK_STATUS.TODO);
  const [statusDraft, setStatusDraft] = useState(EMPTY_STRING);
  const [fieldName, setFieldName] = useState(EMPTY_STRING);
  const [fieldOption, setFieldOption] = useState(EMPTY_STRING);

  useEffect(() => {
    if (!token) return;
    void Promise.all([fetchCrewUsers(token), fetchCrewRoles(token)]).then(([nextUsers, nextRoles]) => {
      if (nextUsers) setUsers(nextUsers);
      if (nextRoles) setRoles(nextRoles);
    });
  }, [token]);

  const isAdmin = user?.role === 'admin' || user?.role === 'crm_admin';
  const userKey = user?.email || user?.username || EMPTY_STRING;
  const canEdit = hasTaskPermission(userKey, users, roles, TASK_PERMISSION.EDIT, isAdmin);
  const canStatus = hasTaskPermission(userKey, users, roles, TASK_PERMISSION.STATUS, isAdmin);
  const canFields = hasTaskPermission(userKey, users, roles, TASK_PERMISSION.FIELDS, isAdmin);

  const persistTasks = (next: CmsTask[]) => {
    setTasks(next);
    saveTasks(next);
  };

  const persistBoard = (next: TaskBoardConfig) => {
    setBoard(next);
    saveBoardConfig(next);
  };

  const openCreate = (status: string) => {
    if (!canEdit) return;
    setModalStatus(status);
    setModalOpen(true);
  };

  const onCreate = (draft: TaskCreateDraft) => {
    const task = createTask(draft);
    persistTasks([task, ...tasks]);
    if (token && task.agentIds.length > 0) {
      void notifyTaskAgentsRequest(token, {
        title: task.title,
        body: task.subtitle || t.cmsTasks.agentNotify,
        agentIds: task.agentIds,
      });
    }
  };

  const onDrop = (event: DragEvent<HTMLDivElement>, status: string) => {
    event.preventDefault();
    if (!canEdit) return;
    const id = event.dataTransfer.getData(TASK_DRAG_TYPE);
    if (!id) return;
    persistTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status, movedAt: new Date().toISOString() } : task,
      ),
    );
  };

  const addStatus = () => {
    const label = statusDraft.trim();
    if (!label || !canStatus) return;
    const id = label.toLowerCase().replace(/\s+/g, '-');
    if (board.statuses.some((item) => item.id === id)) return;
    persistBoard({ ...board, statuses: [...board.statuses, { id, label }] });
    setStatusDraft(EMPTY_STRING);
  };

  const addField = () => {
    const label = fieldName.trim();
    const option = fieldOption.trim();
    if (!label || !canFields) return;
    const id = label.toLowerCase().replace(/\s+/g, '-');
    const existing = board.fields.find((item) => item.id === id);
    const options = option ? [option] : [];
    if (existing) {
      persistBoard({
        ...board,
        fields: board.fields.map((item) =>
          item.id === id
            ? { ...item, options: option && !item.options.includes(option) ? [...item.options, option] : item.options }
            : item,
        ),
      });
    } else {
      persistBoard({
        ...board,
        fields: [...board.fields, { id, label, options }],
      });
    }
    setFieldName(EMPTY_STRING);
    setFieldOption(EMPTY_STRING);
  };

  const onCreateTag = (tag: string) => {
    persistBoard({ ...board, tags: collectTags(tasks, [...board.tags, tag]) });
  };

  return (
    <CmsShell activeNavId={CMS_NAV_IDS.TASKS}>
      <Flex direction="column" gap={4} className="ink-cms-board">
        <div>
          <Typography variant="h2" className="mb-1">
            {t.cmsTasks.title}
          </Typography>
          <Typography variant="body2" className="ink-cms__muted mb-0">
            {t.cmsTasks.subtitle}
          </Typography>
        </div>
        <Flex justify="between" align="center" className="flex-wrap gap-2">
          <Button
            size="sm"
            variant="ink"
            disabled={!canEdit}
            icon={<BearIcons.PlusIcon size={CMS_ICON_SIZE} />}
            onClick={() => openCreate(TASK_STATUS.TODO)}
          >
            {t.cmsTasks.add}
          </Button>
          {canStatus || canFields ? (
            <Flex gap={2} align="end" className="flex-wrap">
              {canStatus ? (
                <Flex gap={1} align="end">
                  <Input
                    id={TASK_STATUS_INPUT_ID}
                    label={t.cmsTasks.addStatus}
                    value={statusDraft}
                    onChange={(event) => setStatusDraft(event.target.value)}
                  />
                  <Button size="sm" variant="outline" onClick={addStatus} disabled={!statusDraft.trim()}>
                    {t.cmsTasks.addStatus}
                  </Button>
                </Flex>
              ) : null}
              {canFields ? (
                <Flex gap={1} align="end">
                  <Input
                    id={TASK_FIELD_NAME_ID}
                    label={t.cmsTasks.addField}
                    value={fieldName}
                    onChange={(event) => setFieldName(event.target.value)}
                  />
                  <Input
                    id={TASK_FIELD_OPTION_ID}
                    label={t.cmsTasks.fieldOption}
                    value={fieldOption}
                    onChange={(event) => setFieldOption(event.target.value)}
                  />
                  <Button size="sm" variant="outline" onClick={addField} disabled={!fieldName.trim()}>
                    {t.cmsTasks.addField}
                  </Button>
                </Flex>
              ) : null}
            </Flex>
          ) : null}
        </Flex>
        <div className="ink-cms-board__columns">
          {board.statuses.map((status) => {
            const columnTasks = tasks.filter((task) => task.status === status.id);
            return (
              <div
                key={status.id}
                className="ink-cms-board__column"
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => onDrop(event, status.id)}
              >
                <Flex justify="between" align="center" className="ink-cms-board__column-head">
                  <Flex align="center" gap={2}>
                    <BearIcons.GridIcon size={CMS_ICON_SIZE} />
                    <Typography variant="h4" className="mb-0">
                      {status.label}
                    </Typography>
                    <Badge variant="info" className="text-xs">
                      {columnTasks.length}
                    </Badge>
                  </Flex>
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={!canEdit}
                    aria-label={t.cmsTasks.add}
                    icon={<BearIcons.PlusIcon size={CMS_ICON_SIZE} />}
                    onClick={() => openCreate(status.id)}
                  />
                </Flex>
                <Flex direction="column" gap={2}>
                  {columnTasks.map((task) => (
                    <TaskBoardCard
                      key={task.id}
                      task={task}
                      users={users}
                      canEdit={canEdit}
                      onOpen={() => openCreate(task.status)}
                    />
                  ))}
                </Flex>
              </div>
            );
          })}
        </div>
      </Flex>
      <TaskCreateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={onCreate}
        users={users}
        board={board}
        onCreateTag={onCreateTag}
        defaultStatus={modalStatus}
      />
    </CmsShell>
  );
};
