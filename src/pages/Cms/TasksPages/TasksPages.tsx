import { useEffect, useState, type DragEvent, type FC } from 'react';
import { Badge, BearIcons, Button, Flex, Typography, useBearMode } from '@forgedevstack/bear';
import { useAuth } from '@hooks/index';
import { useI18n } from '@i18n/index';
import { EMPTY_STRING } from '@const/index';
import { CMS_ICON_SIZE } from '@const/numbers.const';
import { fetchCrewRoles, fetchCrewUsers, notifyTaskAgentsRequest } from '@sdk/modules/cms';
import type { CrewRole, CrewUser } from '../CrewPages/CrewPages.const';
import { CmsShell, CMS_NAV_IDS } from '../CmsShell';
import { useCmsLive } from '../CmsShell/CmsLiveProvider';
import { TaskBoardCard } from './TaskBoardCard';
import { TaskBoardSettings } from './TaskBoardSettings';
import { TaskCreateModal } from './TaskCreateModal';
import { TaskIssueModal } from './TaskIssueModal';
import { TASK_DRAG_TYPE, TASK_PERMISSION, TASK_STATUS, TASK_DEFAULT_TAGS } from './TasksPages.const';
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
  const { mode } = useBearMode();
  const { token, user } = useAuth();
  const live = useCmsLive();
  const colorMode = mode === 'dark' ? 'dark' : 'light';
  const fallbackBoard = defaultBoardConfig({
    todo: t.cmsTasks.todo,
    inProgress: t.cmsTasks.inProgress,
    decline: t.cmsTasks.decline,
    inReview: t.cmsTasks.inReview,
    done: t.cmsTasks.done,
  });
  const [tasks, setTasks] = useState<CmsTask[]>(() => loadTasks());
  const [board, setBoard] = useState<TaskBoardConfig>(() => loadBoardConfig(fallbackBoard));
  const [users, setUsers] = useState<CrewUser[]>([]);
  const [roles, setRoles] = useState<CrewRole[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<string>(TASK_STATUS.TODO);
  const [issueId, setIssueId] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    void Promise.all([fetchCrewUsers(token), fetchCrewRoles(token)]).then(([nextUsers, nextRoles]) => {
      if (nextUsers) setUsers(nextUsers);
      if (nextRoles) setRoles(nextRoles);
    });
  }, [token]);

  useEffect(() => {
    if (live.tasks && live.tasks.length > 0) {
      setTasks(live.tasks);
      saveTasks(live.tasks);
    }
    if (live.board && live.board.statuses.length > 0) {
      const tags =
        live.board.tags.length > 0
          ? live.board.tags
          : collectTags(live.tasks ?? tasks, [...TASK_DEFAULT_TAGS]);
      const nextBoard = { ...live.board, tags };
      setBoard(nextBoard);
      saveBoardConfig(nextBoard);
    }
  }, [live.tasks, live.board]);

  const isAdmin = user?.role === 'admin' || user?.role === 'crm_admin';
  const userKey = user?.email || user?.username || EMPTY_STRING;
  const canCreate = hasTaskPermission(userKey, users, roles, TASK_PERMISSION.CREATE, isAdmin);
  const canEdit = hasTaskPermission(userKey, users, roles, TASK_PERMISSION.EDIT, isAdmin);
  const canStatus = hasTaskPermission(userKey, users, roles, TASK_PERMISSION.STATUS, isAdmin);
  const canFields = hasTaskPermission(userKey, users, roles, TASK_PERMISSION.FIELDS, isAdmin);

  const persistTasks = (next: CmsTask[]) => {
    setTasks(next);
    saveTasks(next);
    live.publishTasks(next, board);
  };

  const persistBoard = (next: TaskBoardConfig) => {
    setBoard(next);
    saveBoardConfig(next);
    live.publishTasks(tasks, next);
  };

  const openCreate = (status: string) => {
    setModalStatus(status);
    setCreateOpen(true);
  };

  const onCreate = (draft: TaskCreateDraft) => {
    if (!canCreate) return;
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

  const onSaveIssue = (id: string, draft: TaskCreateDraft) => {
    if (!canEdit) return;
    persistTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: draft.title.trim(),
              subtitle: draft.subtitle.trim(),
              description: draft.description,
              tags: draft.tags,
              agentIds: draft.agentIds,
              status: draft.status,
              fieldValues: draft.fieldValues,
              movedAt: new Date().toISOString(),
            }
          : task,
      ),
    );
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

  const addStatus = (labelRaw: string) => {
    const label = labelRaw.trim();
    if (!label || !canStatus) return;
    const id = label.toLowerCase().replace(/\s+/g, '-');
    if (board.statuses.some((item) => item.id === id)) return;
    persistBoard({ ...board, statuses: [...board.statuses, { id, label }] });
  };

  const addField = (nameRaw: string, optionRaw: string) => {
    const label = nameRaw.trim();
    const option = optionRaw.trim();
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
  };

  const onCreateTag = (tag: string) => {
    persistBoard({ ...board, tags: collectTags(tasks, [...board.tags, tag]) });
  };

  const issueTask = tasks.find((task) => task.id === issueId) ?? null;

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
        <Flex align="center" gap={2} className="flex-wrap">
          <Button
            size="sm"
            variant="ink"
            icon={<BearIcons.PlusIcon size={CMS_ICON_SIZE} />}
            onClick={() => openCreate(TASK_STATUS.TODO)}
          >
            {t.cmsTasks.add}
          </Button>
          <Button
            size="sm"
            variant="outline"
            aria-label={t.cmsTasks.boardSettings}
            icon={<BearIcons.SettingsIcon size={CMS_ICON_SIZE} />}
            onClick={() => setSettingsOpen(true)}
          />
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
                      onOpen={() => setIssueId(task.id)}
                    />
                  ))}
                </Flex>
              </div>
            );
          })}
        </div>
      </Flex>
      <TaskCreateModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={onCreate}
        users={users}
        board={board}
        onCreateTag={onCreateTag}
        defaultStatus={modalStatus}
        colorMode={colorMode}
        canEdit={canCreate}
      />
      <TaskIssueModal
        isOpen={Boolean(issueTask)}
        task={issueTask}
        onClose={() => setIssueId(null)}
        onSave={onSaveIssue}
        users={users}
        board={board}
        onCreateTag={onCreateTag}
        colorMode={colorMode}
        canEdit={canEdit}
      />
      <TaskBoardSettings
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        board={board}
        onAddStatus={addStatus}
        onAddField={addField}
        canStatus={canStatus}
        canFields={canFields}
      />
    </CmsShell>
  );
};
