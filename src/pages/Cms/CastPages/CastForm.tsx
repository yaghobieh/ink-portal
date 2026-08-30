import type { FC } from 'react';
import { BearIcons, Button, Flex, Input, Typography } from '@forgedevstack/bear';
import { ForgeForm, useField, useForm, Validators } from '@forgedevstack/forge-form';
import { NUMBER_ZERO } from '@const/numbers.const';
import { CMS_ICON_SIZE } from '@const/numbers.const';
import { useI18n } from '@i18n/index';
import { CastFieldRow } from './CastFieldRow';
import { CAST_TITLE_FIELD, CAST_TITLE_MIN_LENGTH } from './CastPages.const';
import type { CastFormProps } from './CastForm.types';

const CastFormFields: FC<Omit<CastFormProps, 'formKey'>> = (props) => {
  const {
    fields,
    typeOptions,
    saved,
    onTitleChange,
    onFieldChange,
    onAddField,
    onRemoveField,
  } = props;
  const { t } = useI18n();
  const { handleSubmit } = useForm();
  const titleField = useField(CAST_TITLE_FIELD, {
    initialValue: props.initialTitle,
    validators: [
      Validators.required(t.cmsCast.titleRequired),
      Validators.minLength(CAST_TITLE_MIN_LENGTH, t.cmsCast.titleRequired),
    ],
  });
  const titleError = titleField.field.touched ? titleField.field.errors[0]?.message : undefined;

  return (
    <form
      className="ink-cms-cast__form"
      onSubmit={(event) => {
        void handleSubmit(event);
      }}
    >
      <Input
        label={t.cmsCast.groupTitle}
        value={String(titleField.field.value ?? '')}
        error={titleError}
        fullWidth
        onBlur={() => titleField.actions.setTouched(true)}
        onChange={(event) => {
          titleField.actions.setValue(event.target.value);
          onTitleChange(event.target.value);
        }}
      />
      <Typography variant="h5" className="mb-0">
        {t.cmsCast.fields}
      </Typography>
      {fields.length > NUMBER_ZERO ? (
        <div className="ink-cms-cast__grid">
          {fields.map((field) => (
            <CastFieldRow
              key={field.id}
              field={field}
              typeOptions={typeOptions}
              onFieldChange={onFieldChange}
              onRemove={() => onRemoveField(field.id)}
            />
          ))}
        </div>
      ) : (
        <Typography variant="caption" className="ink-cms__muted mb-0">
          {t.cmsCast.fieldsEmpty}
        </Typography>
      )}
      <Flex gap={2} className="flex-wrap">
        <Button size="sm" variant="outline" type="button" onClick={onAddField}>
          {t.cmsCast.addField}
        </Button>
        <Button
          size="sm"
          variant="ink"
          type="submit"
          icon={<BearIcons.SaveIcon size={CMS_ICON_SIZE} />}
        >
          {t.cmsCast.save}
        </Button>
      </Flex>
      {saved ? (
        <Typography variant="caption" className="ink-cms-save-ok mb-0">
          {t.cmsCast.saved}
        </Typography>
      ) : null}
    </form>
  );
};

export const CastForm: FC<CastFormProps> = (props) => {
  const { formKey, initialTitle, onSave } = props;
  return (
    <ForgeForm
      key={formKey}
      initialValues={{ [CAST_TITLE_FIELD]: initialTitle }}
      validateOnSubmit
      onSubmit={(values) => {
        void onSave(String(values[CAST_TITLE_FIELD] ?? ''));
      }}
    >
      <CastFormFields {...props} />
    </ForgeForm>
  );
};
