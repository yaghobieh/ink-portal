import type { FC } from 'react';
import { Flex, Typography } from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { lookLabel } from '@utils';
import { CMS_LOOKS } from './cmsLook.const';
import type { CmsLookPickerProps } from './CmsLookPicker.types';
import { LookOption } from './helpers/LookOption';

export const CmsLookPicker: FC<CmsLookPickerProps> = (props) => {
  const { value, onChange } = props;
  const { t } = useI18n();

  return (
    <Flex direction="column" gap={2} className="ink-cms-look">
      <Typography variant="caption" className="ink-cms-look__label mb-0">
        {t.cmsLook.label}
      </Typography>
      <Flex gap={2} className="ink-cms-look__row">
        {CMS_LOOKS.map((look) => (
          <LookOption
            key={look.id}
            id={look.id}
            label={lookLabel(look.id, t.cmsLook)}
            selected={value === look.id}
            primary={look.primary}
            onSelect={onChange}
          />
        ))}
      </Flex>
    </Flex>
  );
};
