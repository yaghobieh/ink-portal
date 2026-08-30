import { useEffect, useState, type FC } from 'react';
import { Button, Chip, Dropdown, Flex, Input, Modal, Select, Typography } from '@forgedevstack/bear';
import { InkEditor } from '@forgedevstack/ink';
import { useI18n } from '@i18n/index';
import { EMPTY_STRING } from '@const/index';
import {
  TASK_CREATE_MODAL_ID,
  TASK_EDITOR_MIN_HEIGHT_PX,
  TASK_SUBTITLE_INPUT_ID,
  TASK_TITLE_INPUT_ID,
} from '../TasksPages.const';
import { userDisplayName } from '../TasksPages.utils';
import type { TaskCreateDraft } from '../TasksPages.types';
import type { TaskCreateModalProps } from './TaskCreateModal.types';

const emptyDraft = (status: string): TaskCreateDraft => ({
  title: EMPTY_STRING,
  subtitle: EMPTY_STRING,
  description: EMPTY_STRING,
  tags: [],
  agentIds: [],
  status,
  fieldValues: {},
});

export const TaskCreateModal: FC<TaskCreateModalProps> = (props) => {
  const { isOpen, onClose, onSubmit, users, board, onCreateTag, defaultStatus, colorMode, canEdit } =
    props;
  const { t } = useI18n();
  const [draft, setDraft] = useState<TaskCreateDraft>(() => emptyDraft(defaultStatus));
  const [tagDraft, setTagDraft] = useState(EMPTY_STRING);

  useEffect(() => {
    if (isOpen) {
      setDraft(emptyDraft(defaultStatus));
      setTagDraft(EMPTY_STRING);
    }
  }, [isOpen, defaultStatus]);

  const reset = (status: string) => {
    setDraft(emptyDraft(status));
    setTagDraft(EMPTY_STRING);
  };

  const toggleTag = (tag: string) => {
    setDraft((current) => ({
      ...current,
      tags: current.tags.includes(tag)
        ? current.tags.filter((item) => item !== tag)
        : [...current.tags, tag],
    }));
  };

  const toggleAgent = (id: string) => {
    setDraft((current) => ({
      ...current,
      agentIds: current.agentIds.includes(id)
        ? current.agentIds.filter((item) => item !== id)
        : [...current.agentIds, id],
    }));
  };

  const addTag = () => {
    const next = tagDraft.trim().toLowerCase();
    if (!next) return;
    onCreateTag(next);
    setDraft((current) => ({
      ...current,
      tags: current.tags.includes(next) ? current.tags : [...current.tags, next],
    }));
    setTagDraft(EMPTY_STRING);
  };

  return (
    <Modal
      id={TASK_CREATE_MODAL_ID}
      isOpen={isOpen}
      onClose={() => {
        reset(defaultStatus);
        onClose();
      }}
      title={t.cmsTasks.createTitle}
      size="xl"
      className="ink-cms-task-modal"
      footer={
        <Flex justify="end" gap={2}>
          <Button variant="outline" onClick={onClose}>
            {t.cmsTasks.cancel}
          </Button>
          <Button
            variant="ink"
            disabled={!draft.title.trim() || !canEdit}
            onClick={() => {
              onSubmit(draft);
              reset(defaultStatus);
              onClose();
            }}
          >
            {t.cmsTasks.add}
          </Button>
        </Flex>
      }
    >
      <Flex direction="column" gap={3}>
        <Input
          id={TASK_TITLE_INPUT_ID}
          label={t.cmsTasks.taskTitle}
          value={draft.title}
          onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
        />
        <Input
          id={TASK_SUBTITLE_INPUT_ID}
          label={t.cmsTasks.subtitleLabel}
          value={draft.subtitle}
          onChange={(event) => setDraft((current) => ({ ...current, subtitle: event.target.value }))}
        />
        <div>
          <Typography variant="caption" className="mb-1">
            {t.cmsTasks.tags}
          </Typography>
          <Dropdown
            searchable
            closeOnSelect={false}
            searchPlaceholder={t.cmsTasks.tagCreate}
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
              {
                key: 'tag-create',
                label: t.cmsTasks.tagAdd,
                onClick: addTag,
              },
            ]}
          />
          <Flex gap={2} align="end" className="mt-2">
            <Input
              label={t.cmsTasks.tagCreate}
              value={tagDraft}
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
              <Chip key={tag} size="sm" color="primary" variant="soft" onDelete={() => toggleTag(tag)}>
                {tag}
              </Chip>
            ))}
          </Flex>
        </div>
        <div>
          <Typography variant="caption" className="mb-1">
            {t.cmsTasks.agent}
          </Typography>
          <Typography variant="caption" className="ink-cms__muted mb-2 block">
            {t.cmsTasks.agentNotify}
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
                  onDelete={() => toggleAgent(id)}
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
