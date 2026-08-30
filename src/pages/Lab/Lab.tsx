import { useState, type FC } from 'react';
import { Alert, Button, Flex, Typography } from '@forgedevstack/bear';
import { useNavigate } from '@forgedevstack/forge-compass/react';
import {
  InkEditor,
  INK_AI_OPENAI_MODEL_GPT_4_1_MINI,
} from '@forgedevstack/ink';
import { Layout } from '@components/Layout';
import { useInkPremium } from '@hooks/index';
import { useI18n } from '@i18n/index';
import { LAB_EDITOR_MIN_HEIGHT_PX } from '@const/numbers.const';
import { ROUTES } from '@const/routes.const';
import {
  LAB_DOC_DESIGN,
  LAB_DOC_NOTES,
  LAB_FEATURES,
  LAB_INITIAL_STATE,
  LAB_OPENAI_KEY,
  LAB_TOOLBAR,
} from './Lab.const';
import type { LabDocId } from './Lab.types';
import { LabShareMenu } from './LabShareMenu';
import { registerLabAiProviders, resolveLabAiProviderId } from './Lab.ai';

registerLabAiProviders();

export const Lab: FC = () => {
  const { t } = useI18n();
  const { navigate } = useNavigate();
  const { premium, active } = useInkPremium();
  const [fillScreen, setFillScreen] = useState(false);
  const [state, setState] = useState(LAB_INITIAL_STATE);
  const providerId = resolveLabAiProviderId();
  const canSplit = Boolean(active && premium);
  const activeId: LabDocId = state.activeId;

  const onSelectDoc = (id: LabDocId) => {
    setState((current) => ({ ...current, activeId: id }));
  };

  return (
    <Layout hideFooter>
      <div className="ink-lab">
        <Flex direction="column" gap={3} className="ink-lab__intro">
          <Typography variant="h1" className="text-3xl font-bold tracking-tight mb-0">
            {t.lab.title}
          </Typography>
          <Typography variant="body1" className="ink-text-muted mb-0">
            {t.lab.description}
          </Typography>
          {LAB_OPENAI_KEY ? (
            <Alert severity="success">{t.lab.aiOpenAiReady}</Alert>
          ) : (
            <Alert severity="warning">{t.lab.aiOpenAiMissing}</Alert>
          )}
        </Flex>
        <div className="ink-lab-app">
          <div className="ink-lab-app__top">
            <Flex align="center" gap={2} className="ink-lab-app__actions">
              <LabShareMenu html={state.docs[activeId]} />
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const next = !fillScreen;
                  setFillScreen(next);
                  const node = document.querySelector('.ink-lab-app');
                  if (next && node instanceof HTMLElement) {
                    void node.requestFullscreen();
                    return;
                  }
                  if (document.fullscreenElement) {
                    void document.exitFullscreen();
                  }
                }}
              >
                {t.lab.fullscreen}
              </Button>
              <Button size="sm" variant="ink">
                {t.lab.publish}
              </Button>
            </Flex>
          </div>
          <div className="ink-lab-app__tabs">
            <button
              type="button"
              className={`ink-lab-app__tab${activeId === LAB_DOC_DESIGN ? ' ink-lab-app__tab--active' : ''}`}
              onClick={() => onSelectDoc(LAB_DOC_DESIGN)}
            >
              {t.lab.tabDesign}
            </button>
            <button
              type="button"
              className={`ink-lab-app__tab${activeId === LAB_DOC_NOTES ? ' ink-lab-app__tab--active' : ''}${
                canSplit ? '' : ' ink-lab-app__tab--locked'
              }`}
              onClick={() => onSelectDoc(LAB_DOC_NOTES)}
            >
              {t.lab.tabNotes}
            </button>
            <span className="ink-lab-app__ver">{t.lab.version}</span>
          </div>
          {activeId === LAB_DOC_NOTES && !canSplit ? (
            <div className="ink-lab-app__locked">
              <Typography variant="h4" className="mb-2">
                {t.lab.notesLocked}
              </Typography>
              <Typography variant="body2" className="mb-3">
                {t.lab.notesLockedBody}
              </Typography>
              <Button size="sm" variant="ink" onClick={() => navigate(ROUTES.PRICING)}>
                {t.lab.openPricing}
              </Button>
            </div>
          ) : (
            <InkEditor
              value={state.docs[activeId]}
              onChange={(value) =>
                setState((current) => ({
                  ...current,
                  docs: { ...current.docs, [activeId]: value },
                }))
              }
              minHeight={LAB_EDITOR_MIN_HEIGHT_PX}
              toolbar={LAB_TOOLBAR}
              typoAutoFix
              showCharCount
              variant="document"
              chrome="borderless"
              colorMode="light"
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
          )}
        </div>
      </div>
    </Layout>
  );
};
