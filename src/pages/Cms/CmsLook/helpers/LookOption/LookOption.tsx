import type { FC } from 'react';
import { Button } from '@forgedevstack/bear';
import { CMS_LOOK_VARIANT_INK, CMS_LOOK_VARIANT_OUTLINE } from '@pages/Cms/CmsLook/cmsLook.const';
import { LOOK_OPTION_CLASS } from './LookOption.const';
import type { LookOptionProps } from './LookOption.types';

export const LookOption: FC<LookOptionProps> = (props) => {
  const { id, label, selected, primary, onSelect } = props;
  return (
    <Button
      type="button"
      size="sm"
      variant={selected ? CMS_LOOK_VARIANT_INK : CMS_LOOK_VARIANT_OUTLINE}
      className={LOOK_OPTION_CLASS}
      style={{ ['--ink-cms-look-swatch' as string]: primary }}
      onClick={() => onSelect(id)}
    >
      {label}
    </Button>
  );
};
