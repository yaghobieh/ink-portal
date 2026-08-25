import type { FC } from 'react';
import { Flex, Switch, Typography } from '@forgedevstack/bear';
import { SETTINGS_TOGGLE_CLASS } from './SettingsToggleRow.const';
import type { SettingsToggleRowProps } from './SettingsToggleRow.types';

export const SettingsToggleRow: FC<SettingsToggleRowProps> = (props) => {
  const { id, label, description, checked, onCheckedChange } = props;
  return (
    <Flex align="center" gap={3} className={SETTINGS_TOGGLE_CLASS}>
      <div>
        <Typography variant="body2" className="mb-0 font-medium">
          {label}
        </Typography>
        <Typography variant="caption" className="ink-cms__muted mb-0 block">
          {description}
        </Typography>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </Flex>
  );
};
