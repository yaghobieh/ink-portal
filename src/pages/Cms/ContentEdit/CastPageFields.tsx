import type { FC } from 'react';
import { Badge, Button, Card, Flex, Input, Select, Switch, Typography } from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { CAST_FIELD_TYPE } from '../CastPages/CastPages.const';
import type { CastFieldType } from '../CastPages/CastPages.types';
import { isCastFieldType, slugFromLabel } from '../CastPages/CastPages.utils';
import { CAST_PAGE_VALUE_PREFIX, CAST_VALUE_INPUT_TYPE } from './CastPageFields.const';
import type { CastPageFieldsProps } from './CastPageFields.types';

export const CastPageFields: FC<CastPageFieldsProps> = (props) => {
  const {
    fields,
    values,
    lockedFieldIds,
    onAddField,
    onFieldChange,
    onRemoveField,
    onValueChange,
  } = props;
  const { t } = useI18n();
  const typeOptions = [
    { value: CAST_FIELD_TYPE.TEXT, label: t.cmsCast.typeText },
    { value: CAST_FIELD_TYPE.TEXTAREA, label: t.cmsCast.typeTextarea },
    { value: CAST_FIELD_TYPE.NUMBER, label: t.cmsCast.typeNumber },
    { value: CAST_FIELD_TYPE.EMAIL, label: t.cmsCast.typeEmail },
    { value: CAST_FIELD_TYPE.IMAGE, label: t.cmsCast.typeImage },
    { value: CAST_FIELD_TYPE.RICH, label: t.cmsCast.typeRich },
  ];

  return (
    <Card className="ink-cms-card mb-3">
      <Flex direction="column" gap={3}>
        <div>
          <Typography variant="h4" className="mb-1">
            {t.contentEdit.castFieldsTitle}
          </Typography>
          <Typography variant="caption" className="ink-cms__muted mb-0">
            {t.contentEdit.castFieldsHint}
          </Typography>
        </div>
        {fields.length === 0 ? (
          <Typography variant="caption" className="ink-cms__muted mb-0">
            {t.contentEdit.castEmpty}
          </Typography>
        ) : null}
        {fields.map((field) => {
          const locked = lockedFieldIds.includes(field.id);
          const inputType = CAST_VALUE_INPUT_TYPE[field.type] || CAST_VALUE_INPUT_TYPE.text;
          return (
            <Flex key={field.id} direction="column" gap={2}>
              {locked ? (
                <Flex align="center" gap={2} className="flex-wrap">
                  <Badge variant="info" className="text-xs">
                    {t.contentEdit.castFromTemplate}
                  </Badge>
                  <Typography variant="body2" className="mb-0">
                    {field.label || field.name}
                  </Typography>
                </Flex>
              ) : (
                <Flex direction="column" gap={2}>
                  <Select
                    id={`cms-cast-type-${field.id}`}
                    options={typeOptions}
                    value={field.type}
                    size="sm"
                    fullWidth
                    onChange={(value) => {
                      if (isCastFieldType(value)) {
                        onFieldChange(field.id, { type: value as CastFieldType });
                      }
                    }}
                  />
                  <Input
                    placeholder={t.cmsCast.fieldLabel}
                    value={field.label}
                    size="sm"
                    fullWidth
                    onChange={(event) => {
                      const label = event.target.value;
                      onFieldChange(field.id, { label, name: slugFromLabel(label) });
                    }}
                  />
                  <Switch
                    label={t.cmsCast.fieldRequired}
                    checked={field.required}
                    onCheckedChange={(checked) => onFieldChange(field.id, { required: checked })}
                  />
                </Flex>
              )}
              <Input
                id={`${CAST_PAGE_VALUE_PREFIX}${field.id}`}
                label={locked ? field.label || field.name : t.contentEdit.castValue}
                value={values[field.name] ?? ''}
                type={inputType}
                size="sm"
                fullWidth
                onChange={(event) => onValueChange(field.name, event.target.value)}
              />
              {locked ? null : (
                <Button size="sm" variant="outline" onClick={() => onRemoveField(field.id)}>
                  {t.cmsCast.removeField}
                </Button>
              )}
            </Flex>
          );
        })}
        <Button size="sm" variant="outline" onClick={onAddField}>
          {t.contentEdit.castAddField}
        </Button>
      </Flex>
    </Card>
  );
};
