import type { FC } from 'react';
import { Button, Flex, Input, Select, Switch } from '@forgedevstack/bear';
import { useField, Validators } from '@forgedevstack/forge-form';
import { useI18n } from '@i18n/index';
import {
  CAST_FIELD_TYPE,
  CAST_LABEL_PREFIX,
  CAST_NAME_MIN_LENGTH,
  CAST_NAME_PATTERN,
  CAST_NAME_PREFIX,
  CAST_TYPE_PREFIX,
} from './CastPages.const';
import type { CastFieldRowProps } from './CastFieldRow.types';
import { slugFromLabel } from './CastPages.utils';

export const CastFieldRow: FC<CastFieldRowProps> = (props) => {
  const { field, typeOptions, onFieldChange, onRemove } = props;
  const { t } = useI18n();
  const nameField = useField(`${CAST_NAME_PREFIX}${field.id}`, {
    initialValue: field.name,
    validators: [
      Validators.required(t.cmsCast.nameRequired),
      Validators.minLength(CAST_NAME_MIN_LENGTH, t.cmsCast.nameRequired),
      Validators.pattern(CAST_NAME_PATTERN, t.cmsCast.namePattern),
      Validators.custom((value, formValues) => {
        const current = String(value).trim().toLowerCase();
        if (!current) return true;
        const names = Object.entries(formValues ?? {})
          .filter(([key]) => key.startsWith(CAST_NAME_PREFIX))
          .map(([, next]) => String(next).trim().toLowerCase());
        return names.filter((name) => name === current).length <= 1;
      }, t.cmsCast.nameUnique),
    ],
  });
  const labelField = useField(`${CAST_LABEL_PREFIX}${field.id}`, {
    initialValue: field.label,
    validators: [Validators.required(t.cmsCast.labelRequired)],
  });
  const typeField = useField(`${CAST_TYPE_PREFIX}${field.id}`, {
    initialValue: field.type,
    validators: [Validators.required(t.cmsCast.typeRequired)],
  });
  const labelError = labelField.field.touched ? labelField.field.errors[0]?.message : undefined;
  const nameError = nameField.field.touched ? nameField.field.errors[0]?.message : undefined;
  const isEmail = field.type === CAST_FIELD_TYPE.EMAIL;
  const isNumber = field.type === CAST_FIELD_TYPE.NUMBER;

  return (
    <div className="ink-cms-cast__item">
      <div className="ink-cms-cast__item-main">
        <Select
          id={`ink-cms-cast-type-${field.id}`}
          options={[...typeOptions]}
          value={String(typeField.field.value ?? field.type)}
          size="sm"
          fullWidth
          onChange={(value) => {
            typeField.actions.setValue(value);
            onFieldChange(field.id, { type: value as typeof field.type });
          }}
        />
        <Input
          placeholder={t.cmsCast.fieldLabel}
          value={String(labelField.field.value ?? '')}
          error={labelError || nameError}
          size="sm"
          fullWidth
          onBlur={() => {
            labelField.actions.setTouched(true);
            nameField.actions.setTouched(true);
          }}
          onChange={(event) => {
            const label = event.target.value;
            const name = slugFromLabel(label);
            labelField.actions.setValue(label);
            nameField.actions.setValue(name);
            onFieldChange(field.id, { label, name });
          }}
        />
        <Flex direction="column" gap={2} className="ink-cms-cast__rules">
          <Switch
            label={t.cmsCast.fieldRequired}
            checked={field.required}
            onCheckedChange={(checked) => onFieldChange(field.id, { required: checked })}
          />
          {isEmail ? (
            <Switch
              label={t.cmsCast.emailFormat}
              checked={field.emailFormat}
              onCheckedChange={(checked) => onFieldChange(field.id, { emailFormat: checked })}
            />
          ) : null}
          {isNumber ? (
            <Flex gap={2} className="flex-wrap">
              <Input
                placeholder={t.cmsCast.numberMin}
                value={field.min}
                size="sm"
                type="number"
                onChange={(event) => onFieldChange(field.id, { min: event.target.value })}
              />
              <Input
                placeholder={t.cmsCast.numberMax}
                value={field.max}
                size="sm"
                type="number"
                onChange={(event) => onFieldChange(field.id, { max: event.target.value })}
              />
            </Flex>
          ) : null}
        </Flex>
      </div>
      <Button size="sm" variant="outline" onClick={onRemove}>
        {t.cmsCast.removeField}
      </Button>
    </div>
  );
};
