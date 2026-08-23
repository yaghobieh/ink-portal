import { useState, type FC } from 'react';
import { Badge, Button, Chip, Dropdown, Flex, Input, Modal, Select, Typography } from '@forgedevstack/bear';
import { InkEditor } from '@forgedevstack/ink';
import { useI18n } from '@i18n/index';
import { EMPTY_STRING } from '@const/index';
import { TASK_CREATE_MODAL_ID, TASK_EDITOR_MIN_HEIGHT_PX, TASK_SUBTITLE_INPUT_ID, TASK_TAG_INPUT_ID, TASK_TITLE_INPUT_ID } from '../TasksPages.const';
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
  const { isOpen, onClose, onSubmit, users, board, onCreateTag, defaultStatus } = props;
  const { t } = useI18n();
  const [draft, setDraft] = useState<TaskCreateDraft>(() => emptyDraft(defaultStatus));
  const [tagDraft, setTagDraft] = useState(EMPTY_STRING);

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
      size="lg"
      footer={
        <Flex justify="end" gap={2}>
          <Button variant="outline" onClick={onClose}>
            {t.cmsTasks.cancel}
          </Button>
          <Button
            variant="ink"
            disabled={!draft.title.trim()}
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
          <Flex gap={1} className="flex-wrap mb-2">
            {board.tags.map((tag) => (
              <Chip
                key={tag}
                variant={draft.tags.includes(tag) ? 'filled' : 'outlined'}
                color={draft.tags.includes(tag) ? 'primary' : 'default'}
                size="sm"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Chip>
            ))}
          </Flex>
          <Flex gap={2} align="end">
            <Input
              id={TASK_TAG_INPUT_ID}
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
            <Button size="sm" variant="outline" onClick={addTag} disabled={!tagDraft.trim()}>
              {t.cmsTasks.tagAdd}
            </Button>
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
            placement="bottom-start"
            trigger={
              <Button size="sm" variant="outline">
                {t.cmsTasks.agentPick}
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
                <Badge key={id} variant="info" className="text-xs">
                  {userDisplayName(user)}
                </Badge>
              );
            })}
          </Flex>
        </div>
        <Select
          label={t.cmsTasks.status}
          value={draft.status}
          onChange={(value) => setDraft((current) => ({ ...current, status: String(value) }))}
          options={board.statuses.map((status) => ({ value: status.id, label: status.label }))}
        />
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
            features={{ blocks: true, slash: true }}
          />
        </div>
      </Flex>
    </Modal>
  );
};
