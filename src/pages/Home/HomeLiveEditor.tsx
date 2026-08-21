import { type FC, useState } from 'react';
import { InkEditor, INK_AI_DEMO_PROVIDER_ID } from '@forgedevstack/ink';
import { HOME_HERO_FEATURES, HOME_HERO_TOOLBAR } from '@const/home.const';
import { HOME_HERO_EDITOR_MIN_HEIGHT_PX } from '@const/numbers.const';
import { useInkPremium } from '@hooks/index';
import type { HomeLiveEditorProps } from './HomeLiveEditor.types';

export const HomeLiveEditor: FC<HomeLiveEditorProps> = (props) => {
  const { html, placeholder, showAi } = props;
  const { premium, active } = useInkPremium();
  const [value, setValue] = useState(html);

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
              providerId: INK_AI_DEMO_PROVIDER_ID,
              autocomplete: true,
            }
          : { enabled: false }
      }
    />
  );
};
