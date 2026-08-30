import { useState, type FC } from 'react';
import { Button, Flex, Input, Modal, Typography } from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { EMPTY_STRING } from '@const/index';
import { TASK_BOARD_SETTINGS_ID, TASK_FIELD_NAME_ID, TASK_FIELD_OPTION_ID, TASK_STATUS_INPUT_ID } from '../TasksPages.const';
import type { TaskBoardSettingsProps } from './TaskBoardSettings.types';

export const TaskBoardSettings: FC<TaskBoardSettingsProps> = (props) => {
  const { isOpen, onClose, board, onAddStatus, onAddField, canStatus, canFields } = props;
  const { t } = useI18n();
  const [statusDraft, setStatusDraft] = useState(EMPTY_STRING);
  const [fieldName, setFieldName] = useState(EMPTY_STRING);
  const [fieldOption, setFieldOption] = useState(EMPTY_STRING);

  return (
    <Modal
      id={TASK_BOARD_SETTINGS_ID}
      isOpen={isOpen}
      onClose={onClose}
      title={t.cmsTasks.boardSettings}
      size="md"
      footer={
        <Flex justify="end">
          <Button variant="outline" onClick={onClose}>
            {t.cmsTasks.cancel}
          </Button>
        </Flex>
      }
    >
      <Flex direction="column" gap={3}>
        <div>
          <Typography variant="caption" className="mb-2">
            {t.cmsTasks.addStatus}
          </Typography>
          {board.statuses.map((status) => (
            <Typography key={status.id} variant="body2" className="mb-1">
              {status.label}
            </Typography>
          ))}
          {canStatus ? (
            <Flex gap={2} align="end" className="mt-2">
              <Input
                id={TASK_STATUS_INPUT_ID}
                label={t.cmsTasks.addStatus}
                value={statusDraft}
                onChange={(event) => setStatusDraft(event.target.value)}
              />
              <Button
                size="sm"
                variant="ink"
                disabled={!statusDraft.trim()}
                onClick={() => {
                  onAddStatus(statusDraft);
                  setStatusDraft(EMPTY_STRING);
                }}
              >
                {t.cmsTasks.addStatus}
              </Button>
            </Flex>
          ) : null}
        </div>
        <div>
          <Typography variant="caption" className="mb-2">
            {t.cmsTasks.addField}
          </Typography>
          {board.fields.map((field) => (
            <Typography key={field.id} variant="body2" className="mb-1">
              {field.label}
            </Typography>
          ))}
          {canFields ? (
            <Flex gap={2} align="end" className="mt-2 flex-wrap">
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
              <Button
                size="sm"
                variant="ink"
                disabled={!fieldName.trim()}
                onClick={() => {
                  onAddField(fieldName, fieldOption);
                  setFieldName(EMPTY_STRING);
                  setFieldOption(EMPTY_STRING);
                }}
              >
                {t.cmsTasks.addField}
              </Button>
            </Flex>
          ) : null}
        </div>
      </Flex>
    </Modal>
  );
};
