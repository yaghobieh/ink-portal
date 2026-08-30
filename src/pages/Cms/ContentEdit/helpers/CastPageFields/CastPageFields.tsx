import type { FC } from 'react';
import { Button, Card, Flex, Input, Typography } from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { EMPTY_STRING } from '@const/index';
import { CAST_FIELD_TYPE } from '@pages/Cms/CastPages/CastPages.const';
import {
  CAST_PAGE_VALUE_PREFIX,
  CAST_VALUE_INPUT_TYPE,
} from './CastPageFields.const';
import type { CastPageFieldsProps } from './CastPageFields.types';
import { castTypeOptions } from './CastPageFields.utils';
import { CastFieldChrome } from './helpers/CastFieldChrome';

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
  const typeOptions = castTypeOptions(t.cmsCast);

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
        {fields.length === 0 && (
          <Typography variant="caption" className="ink-cms__muted mb-0">
            {t.contentEdit.castEmpty}
          </Typography>
        )}
        {fields.map((field) => {
          const locked = lockedFieldIds.includes(field.id);
          const inputType = CAST_VALUE_INPUT_TYPE[field.type] || CAST_VALUE_INPUT_TYPE[CAST_FIELD_TYPE.TEXT];
          return (
            <Flex key={field.id} direction="column" gap={2}>
              <CastFieldChrome
                locked={locked}
                field={field}
                typeOptions={typeOptions}
                fromTemplateLabel={t.contentEdit.castFromTemplate}
                fieldLabelPlaceholder={t.cmsCast.fieldLabel}
                fieldRequiredLabel={t.cmsCast.fieldRequired}
                onFieldChange={onFieldChange}
              />
              <Input
                id={`${CAST_PAGE_VALUE_PREFIX}${field.id}`}
                label={locked ? field.label || field.name : t.contentEdit.castValue}
                value={values[field.name] ?? EMPTY_STRING}
                type={inputType}
                size="sm"
                fullWidth
                onChange={(event) => onValueChange(field.name, event.target.value)}
              />
              {!locked && (
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
