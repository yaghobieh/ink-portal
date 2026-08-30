import type { FC } from 'react';
import { Badge, Flex, Input, Select, Switch, Typography } from '@forgedevstack/bear';
import { isStringValue } from '@utils';
import { isCastFieldType, slugFromLabel } from '@pages/Cms/CastPages/CastPages.utils';
import { CAST_TYPE_SELECT_ID_PREFIX } from '@pages/Cms/ContentEdit/helpers/CastPageFields/CastPageFields.const';
import type { CastFieldChromeProps } from './CastFieldChrome.types';

export const CastFieldChrome: FC<CastFieldChromeProps> = (props) => {
  const {
    locked,
    field,
    typeOptions,
    fromTemplateLabel,
    fieldLabelPlaceholder,
    fieldRequiredLabel,
    onFieldChange,
  } = props;
  if (locked) {
    return (
      <Flex align="center" gap={2} className="flex-wrap">
        <Badge variant="info" className="text-xs">
          {fromTemplateLabel}
        </Badge>
        <Typography variant="body2" className="mb-0">
          {field.label || field.name}
        </Typography>
      </Flex>
    );
  }
  return (
    <Flex direction="column" gap={2}>
      <Select
        id={`${CAST_TYPE_SELECT_ID_PREFIX}${field.id}`}
        options={typeOptions}
        value={field.type}
        size="sm"
        fullWidth
        onChange={(value) => {
          if (isStringValue(value) && isCastFieldType(value)) {
            onFieldChange(field.id, { type: value });
          }
        }}
      />
      <Input
        placeholder={fieldLabelPlaceholder}
        value={field.label}
        size="sm"
        fullWidth
        onChange={(event) => {
          const label = event.target.value;
          onFieldChange(field.id, { label, name: slugFromLabel(label) });
        }}
      />
      <Switch
        label={fieldRequiredLabel}
        checked={field.required}
        onCheckedChange={(checked) => onFieldChange(field.id, { required: checked })}
      />
    </Flex>
  );
};
