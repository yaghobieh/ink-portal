import { useState, type FC } from 'react';
import { Alert, Card, Flex, Typography, useBear } from '@forgedevstack/bear';
import {
  InkEditor,
  INK_AI_OPENAI_MODEL_GPT_4_1_MINI,
  INK_DEFAULT_TOOLBAR,
} from '@forgedevstack/ink';
import { Layout } from '@components/Layout';
import { useInkPremium } from '@hooks/index';
import { useI18n } from '@i18n/index';
import { HERO_EDITOR_MIN_HEIGHT_PX } from '@const/index';
import { LAB_FEATURES, LAB_INITIAL_STATE, LAB_OPENAI_KEY } from './Lab.const';
import { registerLabAiProviders, resolveLabAiProviderId } from './Lab.ai';

registerLabAiProviders();

export const Lab: FC = () => {
  const { t } = useI18n();
  const { mode } = useBear();
  const { premium, active } = useInkPremium();
  const [state, setState] = useState(LAB_INITIAL_STATE);
  const providerId = resolveLabAiProviderId();
  const colorMode = mode === 'dark' ? 'dark' : 'light';

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
          {LAB_OPENAI_KEY ? (
            <Alert severity="success">{t.lab.aiOpenAiReady}</Alert>
          ) : (
            <Alert severity="warning">{t.lab.aiOpenAiMissing}</Alert>
          )}
          <Card className="p-4">
            <InkEditor
              value={state.value}
              onChange={(value) => setState({ value })}
              minHeight={HERO_EDITOR_MIN_HEIGHT_PX}
              toolbar={INK_DEFAULT_TOOLBAR}
              typoAutoFix
              showCharCount
              variant="classic"
              chrome="borderless"
              colorMode={colorMode}
              premium={premium}
              pasteMode={active ? 'rich' : 'plain'}
              wysiwyg={active}
              features={LAB_FEATURES}
              placeholder={t.lab.placeholder}
              ai={{
                enabled: true,
                openOnInit: true,
                placement: 'sidebar',
                showHistory: true,
                providerId,
                modelId: INK_AI_OPENAI_MODEL_GPT_4_1_MINI,
                autocomplete: true,
              }}
            />
          </Card>
        </Flex>
      </div>
    </Layout>
  );
};
