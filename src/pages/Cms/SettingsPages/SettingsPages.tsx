import { useEffect, useState, type FC } from 'react';
import { Button, Card, Flex, Input, Typography } from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { CmsShell, CMS_NAV_IDS } from '../CmsShell';
import { SETTINGS_COLOR_INPUT_IDS } from './SettingsPages.const';
import type { CmsThemeColors } from './SettingsPages.types';
import {
  applyCmsThemeColors,
  loadCmsThemeColors,
  saveCmsThemeColors,
} from './SettingsPages.utils';

export const SettingsPages: FC = () => {
  const { t } = useI18n();
  const [colors, setColors] = useState<CmsThemeColors>(() => loadCmsThemeColors());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const root = document.querySelector('.ink-cms') as HTMLElement | null;
    applyCmsThemeColors(root, colors);
  }, [colors]);

  const onSave = () => {
    saveCmsThemeColors(colors);
    const root = document.querySelector('.ink-cms') as HTMLElement | null;
    applyCmsThemeColors(root, colors);
    setSaved(true);
  };

  return (
    <CmsShell activeNavId={CMS_NAV_IDS.SETTINGS}>
      <Flex direction="column" gap={4}>
        <div>
          <Typography variant="h2" className="mb-1">
            {t.settings.title}
          </Typography>
          <Typography variant="body2" className="ink-cms__muted mb-0">
            {t.settings.subtitle}
          </Typography>
        </div>

        <Card className="ink-cms-card ink-cms-settings">
          <Typography variant="h4" className="mb-3">
            {t.settings.themeTitle}
          </Typography>
          <Flex direction="column" gap={3} className="ink-cms-settings__fields">
            <Input
              id={SETTINGS_COLOR_INPUT_IDS.PRIMARY}
              type="color"
              label={t.settings.primaryColor}
              value={colors.primary}
              onChange={(event) => {
                setColors((current) => ({
                  ...current,
                  primary: event.target.value,
                }));
                setSaved(false);
              }}
            />
            <Input
              id={SETTINGS_COLOR_INPUT_IDS.ACCENT}
              type="color"
              label={t.settings.accentColor}
              value={colors.accent}
              onChange={(event) => {
                setColors((current) => ({
                  ...current,
                  accent: event.target.value,
                }));
                setSaved(false);
              }}
            />
            <Input
              id={SETTINGS_COLOR_INPUT_IDS.BACKGROUND}
              type="color"
              label={t.settings.backgroundColor}
              value={colors.background}
              onChange={(event) => {
                setColors((current) => ({
                  ...current,
                  background: event.target.value,
                }));
                setSaved(false);
              }}
            />
            <Flex gap={2} align="center">
              <Button size="sm" variant="ink" onClick={onSave}>
                {t.settings.saveTheme}
              </Button>
              {saved ? (
                <Typography variant="caption" className="ink-cms-save-ok mb-0">
                  {t.settings.themeSaved}
                </Typography>
              ) : null}
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </CmsShell>
  );
};
