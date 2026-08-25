import type { FC } from 'react';
import { Flex, Typography } from '@forgedevstack/bear';
import { SETTINGS_SECTION_CLASS } from './SettingsSection.const';
import type { SettingsSectionProps } from './SettingsSection.types';

export const SettingsSection: FC<SettingsSectionProps> = (props) => {
  const { title, description, children } = props;
  return (
    <Flex direction="column" gap={3} className={SETTINGS_SECTION_CLASS}>
      <div>
        <Typography variant="h4" className="mb-1">
          {title}
        </Typography>
        <Typography variant="caption" className="ink-cms__muted mb-0 block">
          {description}
        </Typography>
      </div>
      {children}
    </Flex>
  );
};
