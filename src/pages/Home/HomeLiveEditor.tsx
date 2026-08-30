import { type FC, useState } from 'react';
import {
  InkEditor,
  INK_AI_DEMO_PROVIDER_ID,
  INK_AI_OPENAI_MODEL_GPT_4_1_MINI,
} from '@forgedevstack/ink';
import { registerPortalAiProviders, resolvePortalAiProviderId } from '@/ai/index';
import { HOME_HERO_FEATURES, HOME_HERO_TOOLBAR } from '@const/home.const';
import { HOME_HERO_EDITOR_MIN_HEIGHT_PX } from '@const/numbers.const';
import { useInkPremium } from '@hooks/index';
import type { HomeLiveEditorProps } from './HomeLiveEditor.types';

registerPortalAiProviders();

export const HomeLiveEditor: FC<HomeLiveEditorProps> = (props) => {
  const { html, placeholder, showAi } = props;
  const { premium, active } = useInkPremium();
  const [value, setValue] = useState(html);
  const providerId = showAi ? resolvePortalAiProviderId() : INK_AI_DEMO_PROVIDER_ID;

  return (
    <InkEditor
      value={value}
      onChange={setValue}
      minHeight={HOME_HERO_EDITOR_MIN_HEIGHT_PX}
      toolbar={HOME_HERO_TOOLBAR}
      typoAutoFix
      showCharCount
      showOutline
      variant="document"
      chrome="borderless"
      colorMode="light"
      premium={premium}
      pasteMode={active ? 'rich' : 'plain'}
      wysiwyg={active}
      features={HOME_HERO_FEATURES}
      placeholder={placeholder}
      ai={
        showAi
          ? {
              enabled: true,
              openOnInit: false,
              placement: 'sidebar',
              showHistory: true,
              providerId,
              modelId: INK_AI_OPENAI_MODEL_GPT_4_1_MINI,
              autocomplete: true,
            }
          : { enabled: false }
      }
    />
  );
};
