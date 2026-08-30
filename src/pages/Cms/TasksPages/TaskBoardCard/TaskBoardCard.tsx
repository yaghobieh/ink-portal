import type { DragEvent, FC } from 'react';
import { Avatar, Chip, Flex, Typography } from '@forgedevstack/bear';
import { TASK_DRAG_TYPE, TASK_INITIALS_LENGTH } from '../TasksPages.const';
import { userDisplayName, userInitials } from '../TasksPages.utils';
import type { TaskBoardCardProps } from './TaskBoardCard.types';

export const TaskBoardCard: FC<TaskBoardCardProps> = (props) => {
  const { task, users, canEdit, onOpen } = props;
  const agents = users.filter((user) => task.agentIds.includes(user.id));

  const onDragStart = (event: DragEvent<HTMLButtonElement>) => {
    if (!canEdit) return;
    event.dataTransfer.setData(TASK_DRAG_TYPE, task.id);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <button
      type="button"
      className="ink-cms-board__card"
      draggable={canEdit}
      onDragStart={onDragStart}
      onClick={() => onOpen(task)}
    >
      <Typography variant="body2" className="mb-0 font-medium">
        {task.title}
      </Typography>
      {task.subtitle ? (
        <Typography variant="caption" className="ink-cms__muted mb-0">
          {task.subtitle}
        </Typography>
      ) : null}
      <Flex justify="between" align="center" className="ink-cms-board__card-meta">
        <Flex gap={1} className="flex-wrap">
          {task.tags.map((tag) => (
            <Chip key={tag} size="sm" color="primary" variant="soft">
              {tag}
            </Chip>
          ))}
        </Flex>
        <Flex gap={1}>
          {agents.map((user) => (
            <span key={user.id} title={userDisplayName(user)}>
              <Avatar initials={userInitials(user, TASK_INITIALS_LENGTH)} size="sm" />
            </span>
          ))}
        </Flex>
      </Flex>
    </button>
  );
};
