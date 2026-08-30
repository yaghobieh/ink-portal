import { useEffect, useState, type FC } from 'react';
import { useNavigate } from '@forgedevstack/forge-compass/react';
import { useNucleus } from '@forgedevstack/synapse';
import { BearIcons, Button, Card, Flex, Select, Typography } from '@forgedevstack/bear';
import { useAuth } from '@hooks/index';
import { useI18n } from '@i18n/index';
import { ROUTES } from '@const/index';
import { CMS_ICON_SIZE } from '@const/numbers.const';
import { authNucleus, contentNucleus } from '@sdk/index';
import { saveContentRequest } from '@sdk/modules/content';
import { CmsShell, CMS_NAV_IDS } from '../CmsShell';
import { DOCUMENT_DEFAULT_LOCALE } from '../ContentPages/ContentPages.const';
import { isCastInstalled } from '../ExtensionsPages';
import {
  CAST_COLLECTION,
  CAST_FIELD_EMPTY,
  CAST_FIELD_TYPE,
  CAST_NONE,
  CAST_SLUG_PREFIX,
} from './CastPages.const';
import { CastForm } from './CastForm';
import type { CastField } from './CastPages.types';
import {
  createCastField,
  fieldsFromPayload,
  isCastFieldType,
  withCastPayload,
} from './CastPages.utils';

export const CastPages: FC = () => {
  const { t } = useI18n();
  const { navigate } = useNavigate();
  const { token: providerToken } = useAuth();
  const { token } = useNucleus(authNucleus);
  const { items, fetchContent } = useNucleus(contentNucleus);
  const activeToken = token || providerToken;
  const installed = isCastInstalled();
  const [title, setTitle] = useState(CAST_FIELD_EMPTY);
  const [fields, setFields] = useState<CastField[]>([]);
  const [targetId, setTargetId] = useState(CAST_NONE);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (activeToken) {
      void fetchContent(activeToken);
    }
  }, [activeToken, fetchContent]);

  const groups = items.filter((item) => item.collection === CAST_COLLECTION);
  const targetOptions = [
    { value: CAST_NONE, label: t.cmsCast.newGroup },
    ...groups.map((item) => ({
      value: item.id,
      label: item.title || item.slug,
    })),
  ];
  const typeOptions = [
    { value: CAST_FIELD_TYPE.TEXT, label: t.cmsCast.typeText },
    { value: CAST_FIELD_TYPE.TEXTAREA, label: t.cmsCast.typeTextarea },
    { value: CAST_FIELD_TYPE.NUMBER, label: t.cmsCast.typeNumber },
    { value: CAST_FIELD_TYPE.EMAIL, label: t.cmsCast.typeEmail },
    { value: CAST_FIELD_TYPE.IMAGE, label: t.cmsCast.typeImage },
    { value: CAST_FIELD_TYPE.RICH, label: t.cmsCast.typeRich },
  ];

  const onTargetChange = (value: string) => {
    setTargetId(value);
    setSaved(false);
    if (!value) {
      setTitle(CAST_FIELD_EMPTY);
      setFields([]);
      return;
    }
    const item = items.find((entry) => entry.id === value);
    if (!item) return;
    setTitle(item.title);
    setFields(fieldsFromPayload(item.payload));
  };

  const onAddField = () => {
    setFields((current) => [...current, createCastField()]);
    setSaved(false);
  };

  const onFieldChange = (fieldId: string, patch: Partial<CastField>) => {
    setFields((current) =>
      current.map((field) => (field.id === fieldId ? { ...field, ...patch } : field)),
    );
    setSaved(false);
  };

  const onRemoveField = (fieldId: string) => {
    setFields((current) => current.filter((field) => field.id !== fieldId));
    setSaved(false);
  };

  const onSave = async (nextTitle: string) => {
    if (!activeToken) return;
    const resolvedTitle = nextTitle.trim();
    if (!resolvedTitle) return;
    const existing = items.find((entry) => entry.id === targetId);
    const item = await saveContentRequest(activeToken, {
      collection: CAST_COLLECTION,
      slug: existing?.slug || `${CAST_SLUG_PREFIX}${Date.now()}`,
      locale: existing?.locale || DOCUMENT_DEFAULT_LOCALE,
      title: resolvedTitle,
      status: existing?.status || 'draft',
      payload: withCastPayload(fields),
    });
    if (!item) return;
    await fetchContent(activeToken);
    setTargetId(item.id);
    setTitle(resolvedTitle);
    setSaved(true);
  };

  return (
    <CmsShell activeNavId={CMS_NAV_IDS.CAST}>
      <Flex direction="column" gap={4}>
        <div>
          <Typography variant="h2" className="mb-1">
            {t.cmsCast.title}
          </Typography>
          <Typography variant="body2" className="ink-cms__muted mb-0">
            {t.cmsCast.subtitle}
          </Typography>
        </div>
        {!installed ? (
          <Card className="ink-cms-card">
            <Typography variant="h4" className="mb-2">
              {t.cmsCast.lockedTitle}
            </Typography>
            <Typography variant="body2" className="mb-3">
              {t.cmsCast.lockedBody}
            </Typography>
            <Button
              size="sm"
              variant="ink"
              icon={<BearIcons.PackageIcon size={CMS_ICON_SIZE} />}
              onClick={() => navigate(ROUTES.CMS_EXTENSIONS)}
            >
              {t.cmsCast.openStore}
            </Button>
          </Card>
        ) : (
          <div className="ink-cms-cast">
            <Card className="ink-cms-card">
              <Typography variant="h4" className="mb-2">
                {t.cmsCast.groups}
              </Typography>
              <Select
                id="ink-cms-cast-group"
                label={t.cmsCast.groupLabel}
                options={targetOptions}
                value={targetId}
                onChange={onTargetChange}
              />
            </Card>
            <Card className="ink-cms-card">
              <CastForm
                formKey={targetId || 'new'}
                initialTitle={title}
                fields={fields}
                typeOptions={typeOptions}
                saved={saved}
                onTitleChange={(value) => {
                  setTitle(value);
                  setSaved(false);
                }}
                onFieldChange={onFieldChange}
                onAddField={onAddField}
                onRemoveField={onRemoveField}
                onSave={onSave}
              />
            </Card>
          </div>
        )}
      </Flex>
    </CmsShell>
  );
};
