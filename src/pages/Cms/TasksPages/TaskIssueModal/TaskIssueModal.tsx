import { useEffect, useState, type FC } from 'react';
import { Button, Chip, Dropdown, Flex, Input, Modal, Select, Typography } from '@forgedevstack/bear';
import { InkEditor } from '@forgedevstack/ink';
import { useI18n } from '@i18n/index';
import { EMPTY_STRING } from '@const/index';
import { TASK_EDITOR_MIN_HEIGHT_PX, TASK_ISSUE_MODAL_ID } from '../TasksPages.const';
import { userDisplayName } from '../TasksPages.utils';
import type { TaskCreateDraft } from '../TasksPages.types';
import type { TaskIssueModalProps } from './TaskIssueModal.types';

const toDraft = (task: TaskIssueModalProps['task']): TaskCreateDraft => ({
  title: task?.title ?? EMPTY_STRING,
  subtitle: task?.subtitle ?? EMPTY_STRING,
  description: task?.description ?? EMPTY_STRING,
  tags: task?.tags ?? [],
  agentIds: task?.agentIds ?? [],
  status: task?.status ?? EMPTY_STRING,
  fieldValues: task?.fieldValues ?? {},
});

export const TaskIssueModal: FC<TaskIssueModalProps> = (props) => {
  const { isOpen, task, onClose, onSave, users, board, onCreateTag, colorMode, canEdit } = props;
  const { t } = useI18n();
  const [draft, setDraft] = useState<TaskCreateDraft>(() => toDraft(task));
  const [tagDraft, setTagDraft] = useState(EMPTY_STRING);

  useEffect(() => {
    setDraft(toDraft(task));
    setTagDraft(EMPTY_STRING);
  }, [task, isOpen]);

  const toggleTag = (tag: string) => {
    if (!canEdit) return;
    setDraft((current) => ({
      ...current,
      tags: current.tags.includes(tag)
        ? current.tags.filter((item) => item !== tag)
        : [...current.tags, tag],
    }));
  };

  const toggleAgent = (id: string) => {
    if (!canEdit) return;
    setDraft((current) => ({
      ...current,
      agentIds: current.agentIds.includes(id)
        ? current.agentIds.filter((item) => item !== id)
        : [...current.agentIds, id],
    }));
  };

  const addTag = () => {
    const next = tagDraft.trim().toLowerCase();
    if (!next || !canEdit) return;
    onCreateTag(next);
    setDraft((current) => ({
      ...current,
      tags: current.tags.includes(next) ? current.tags : [...current.tags, next],
    }));
    setTagDraft(EMPTY_STRING);
  };

  return (
    <Modal
      id={TASK_ISSUE_MODAL_ID}
      isOpen={isOpen}
      onClose={onClose}
      title={task?.title || t.cmsTasks.issueTitle}
      size="xl"
      className="ink-cms-task-modal"
      footer={
        <Flex justify="end" gap={2}>
          <Button variant="outline" onClick={onClose}>
            {t.cmsTasks.cancel}
          </Button>
          {canEdit ? (
            <Button
              variant="ink"
              disabled={!draft.title.trim() || !task}
              onClick={() => {
                if (!task) return;
                onSave(task.id, draft);
                onClose();
              }}
            >
              {t.cmsTasks.saveIssue}
            </Button>
          ) : null}
        </Flex>
      }
    >
      <Flex direction="column" gap={3}>
        <Input
          label={t.cmsTasks.taskTitle}
          value={draft.title}
          disabled={!canEdit}
          onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
        />
        <Input
          label={t.cmsTasks.subtitleLabel}
          value={draft.subtitle}
          disabled={!canEdit}
          onChange={(event) => setDraft((current) => ({ ...current, subtitle: event.target.value }))}
        />
        <div>
          <Typography variant="caption" className="mb-1">
            {t.cmsTasks.tags}
          </Typography>
          <Dropdown
            searchable
            closeOnSelect={false}
            emptyText={t.cmsTasks.pickEmpty}
            placement="bottom-start"
            trigger={
              <Button size="sm" variant="outline">
                {t.cmsTasks.tags} · {draft.tags.length}
              </Button>
            }
            items={[
              ...board.tags.map((tag) => ({
                key: tag,
                label: tag,
                selected: draft.tags.includes(tag),
                onClick: () => toggleTag(tag),
              })),
              { key: 'tag-div', label: EMPTY_STRING, divider: true },
              { key: 'tag-create', label: t.cmsTasks.tagAdd, onClick: addTag },
            ]}
          />
          <Flex gap={2} align="end" className="mt-2">
            <Input
              label={t.cmsTasks.tagCreate}
              value={tagDraft}
              disabled={!canEdit}
              onChange={(event) => setTagDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  addTag();
                }
              }}
            />
          </Flex>
          <Flex gap={1} className="flex-wrap mt-2">
            {draft.tags.map((tag) => (
              <Chip key={tag} size="sm" color="primary" variant="soft" onDelete={canEdit ? () => toggleTag(tag) : undefined}>
                {tag}
              </Chip>
            ))}
          </Flex>
        </div>
        <div>
          <Typography variant="caption" className="mb-1">
            {t.cmsTasks.agent}
          </Typography>
          <Dropdown
            searchable
            closeOnSelect={false}
            emptyText={t.cmsTasks.pickEmpty}
            placement="bottom-start"
            trigger={
              <Button size="sm" variant="outline">
                {t.cmsTasks.agentPick} · {draft.agentIds.length}
              </Button>
            }
            items={users.map((user) => ({
              key: user.id,
              label: userDisplayName(user),
              selected: draft.agentIds.includes(user.id),
              onClick: () => toggleAgent(user.id),
            }))}
          />
          <Flex gap={1} className="flex-wrap mt-2">
            {draft.agentIds.map((id) => {
              const user = users.find((item) => item.id === id);
              if (!user) return null;
              return (
                <Chip
                  key={id}
                  size="sm"
                  color="info"
                  variant="soft"
                  onDelete={canEdit ? () => toggleAgent(id) : undefined}
                >
                  {userDisplayName(user)}
                </Chip>
              );
            })}
          </Flex>
        </div>
        <div>
          <Typography variant="caption" className="mb-1">
            {t.cmsTasks.status}
          </Typography>
          <Dropdown
            searchable
            emptyText={t.cmsTasks.pickEmpty}
            placement="bottom-start"
            trigger={
              <Button size="sm" variant="outline">
                {board.statuses.find((item) => item.id === draft.status)?.label || t.cmsTasks.status}
              </Button>
            }
            items={board.statuses.map((status) => ({
              key: status.id,
              label: status.label,
              selected: draft.status === status.id,
              onClick: () => setDraft((current) => ({ ...current, status: status.id })),
            }))}
          />
        </div>
        {board.fields.map((field) => (
          <Select
            key={field.id}
            label={field.label}
            value={draft.fieldValues[field.id] ?? EMPTY_STRING}
            onChange={(value) =>
              setDraft((current) => ({
                ...current,
                fieldValues: { ...current.fieldValues, [field.id]: String(value) },
              }))
            }
            options={[
              { value: EMPTY_STRING, label: t.cmsTasks.fieldNone },
              ...field.options.map((option) => ({ value: option, label: option })),
            ]}
          />
        ))}
        <div>
          <Typography variant="caption" className="mb-1">
            {t.cmsTasks.description}
          </Typography>
          <InkEditor
            value={draft.description}
            onChange={(value) => setDraft((current) => ({ ...current, description: value }))}
            minHeight={TASK_EDITOR_MIN_HEIGHT_PX}
            colorMode={colorMode}
            features={{ blocks: true, slash: true }}
          />
        </div>
      </Flex>
    </Modal>
  );
};
