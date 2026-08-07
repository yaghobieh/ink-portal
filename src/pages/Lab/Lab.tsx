import { useState, type FC } from 'react';
import { Alert, Button, Card, Flex, Typography } from '@forgedevstack/bear';
import { InkEditor, INK_DEFAULT_TOOLBAR } from '@forgedevstack/ink';
import type { InkColorMode } from '@forgedevstack/ink';
import { Layout } from '@components/Layout';
import { useInkPremium } from '@hooks/index';
import { useI18n } from '@i18n/index';
import { HERO_EDITOR_MIN_HEIGHT_PX } from '@const/index';
import { LAB_COLOR_MODES, LAB_FEATURES, LAB_INITIAL_STATE } from './Lab.const';

export const Lab: FC = () => {
  const { t } = useI18n();
  const { premium, active } = useInkPremium();
  const [state, setState] = useState(LAB_INITIAL_STATE);

  return (
    <Layout>
      <div className="fade-in max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Flex direction="column" gap={4}>
          <Typography variant="h1" className="text-3xl font-bold tracking-tight mb-0">
            {t.lab.title}
          </Typography>
          <Typography variant="body1" className="ink-text-muted mb-0">
            {t.lab.description}
          </Typography>
          <Alert severity="info">{t.lab.note}</Alert>
          <Flex align="center" gap={2} className="flex-wrap">
            <Typography variant="body2" className="mb-0">
              {t.lab.colorMode}:
            </Typography>
            {LAB_COLOR_MODES.map((mode) => (
              <Button
                key={mode}
                size="sm"
                variant={state.colorMode === mode ? 'ink' : 'outline'}
                onClick={() => setState((prev) => ({ ...prev, colorMode: mode as InkColorMode }))}
              >
                {mode === 'light' ? t.lab.colorLight : t.lab.colorDark}
              </Button>
            ))}
          </Flex>
          <Card className="p-4">
            <InkEditor
              value={state.value}
              onChange={(value) => setState((prev) => ({ ...prev, value }))}
              minHeight={HERO_EDITOR_MIN_HEIGHT_PX}
              toolbar={INK_DEFAULT_TOOLBAR}
              typoAutoFix
              showCharCount
              variant="classic"
              chrome="borderless"
              colorMode={state.colorMode}
              premium={premium}
              pasteMode={active ? 'rich' : 'plain'}
              wysiwyg={active}
              features={LAB_FEATURES}
              placeholder={t.lab.placeholder}
            />
          </Card>
        </Flex>
      </div>
    </Layout>
  );
};
