import { Button, Flex, Typography } from '@forgedevstack/bear';
import { InkEditor } from '@forgedevstack/ink';
import { useState } from 'react';
import { useI18n } from '@i18n/index';
import { INK_VERSION, NPM_URL, SITE_URL } from '@const/index';

export const Home = () => {
  const { t } = useI18n();
  const [value, setValue] = useState(
    '<h2>Ink</h2><p>Write with <strong>ForgeStack</strong>. Try typing <em>teh</em> then blur — typo auto-fix MVP kicks in.</p>',
  );

  return (
    <div className="fade-in">
      <Typography variant="h1" className="text-5xl md:text-6xl text-teal-200 mb-4">
        {t.brand}
      </Typography>
      <Typography variant="body1" className="text-zinc-300 max-w-2xl mb-2">
        {t.tagline}
      </Typography>
      <Typography variant="caption" className="text-teal-500/80 mb-8 block">
        @forgedevstack/ink@{INK_VERSION}
      </Typography>
      <Flex gap={2} className="mb-10">
        <Button onClick={() => window.open(NPM_URL, '_blank', 'noopener,noreferrer')}>
          {t.ctaNpm}
        </Button>
        <Button
          variant="outline"
          onClick={() => window.open(SITE_URL, '_blank', 'noopener,noreferrer')}
        >
          {t.ctaDocs}
        </Button>
      </Flex>
      <InkEditor value={value} onChange={setValue} minHeight={220} typoAutoFix showCharCount />
    </div>
  );
};
