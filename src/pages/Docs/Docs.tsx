import type { FC } from 'react';
import { Typography } from '@forgedevstack/bear';
import { DocLayout } from '@components/DocLayout';
import { DocSection } from '@components/DocSection';
import { useI18n } from '@i18n/index';
import { NPM_URL, PORTAL_GITHUB_URL, SITE_URL } from '@const/index';

export const Docs: FC = () => {
  const { t } = useI18n();

  return (
    <DocLayout>
      <div className="fade-in">
        <DocSection id="installation" title={t.docs.tocInstallation}>
          <Typography variant="body1">
            Install from npm. Peer deps: React 18+.
          </Typography>
          <pre className="ink-code">{`npm install @forgedevstack/ink`}</pre>
          <Typography variant="body1">
            Package:{' '}
            <a className="text-teal-700 underline" href={NPM_URL} target="_blank" rel="noreferrer">
              @forgedevstack/ink
            </a>
          </Typography>
        </DocSection>

        <DocSection id="quickstart" title={t.docs.tocQuickstart}>
          <pre className="ink-code">{`import { useState } from 'react';
import { InkEditor } from '@forgedevstack/ink';
import '@forgedevstack/ink/styles.css';

export function App() {
  const [value, setValue] = useState('<p>Hello Ink</p>');
  return (
    <InkEditor value={value} onChange={setValue} typoAutoFix />
  );
}`}</pre>
        </DocSection>

        <DocSection id="configuration" title={t.docs.tocConfiguration}>
          <Typography variant="body1">
            Controlled HTML via <code>value</code> / <code>onChange</code>. Optional{' '}
            <code>defaultValue</code>, <code>placeholder</code>, <code>disabled</code>,{' '}
            <code>readOnly</code>, <code>minHeight</code>, <code>maxHeight</code>,{' '}
            <code>toolbar</code>, <code>testId</code>.
          </Typography>
        </DocSection>

        <DocSection id="toolbar" title={t.docs.tocToolbar}>
          <Typography variant="body1">
            Pass a <code>ToolbarOption[]</code>: bold, italic, underline, strikethrough, heading1–6,
            paragraph, headingDropdown, bulletList, orderedList, blockquote, code, link, image,
            textColor, highlightColor, align*, indent/outdent, clearFormat, divider.
          </Typography>
          <pre className="ink-code">{`toolbar={['bold', 'italic', 'divider', 'bulletList', 'link']}`}</pre>
        </DocSection>

        <DocSection id="modules" title={t.docs.tocModules}>
          <Typography variant="body1">
            Module-style props: <code>typoAutoFix</code>, <code>allowImagePaste</code>,{' '}
            <code>showCharCount</code>, <code>charCountMax</code>, <code>readOnly</code>.
          </Typography>
        </DocSection>

        <DocSection id="themes" title={t.docs.tocThemes}>
          <Typography variant="body1">
            Override CSS variables on <code>.Ink-Editor</code>: <code>--ink-border</code>,{' '}
            <code>--ink-bg</code>, <code>--ink-toolbar</code>, <code>--ink-text</code>,{' '}
            <code>--ink-muted</code>, <code>--ink-accent</code>, <code>--ink-accent-soft</code>.
          </Typography>
          <Typography variant="body1">
            Portal themes: <code>.ink-theme-snow</code>, <code>.ink-theme-bubble</code>,{' '}
            <code>.ink-theme-dark</code>, <code>.ink-theme-minimal</code>. Try them in the{' '}
            <a className="text-teal-700 underline" href="/playground">
              playground
            </a>
            .
          </Typography>
        </DocSection>

        <DocSection id="typo" title={t.docs.tocTypo}>
          <Typography variant="body1">
            Enable <code>typoAutoFix</code> for blur-time corrections from a small bundled dictionary
            (MVP — not a full spell engine). Export <code>applyTypoAutoFix</code> for custom pipelines.
          </Typography>
        </DocSection>

        <DocSection id="ai" title={t.docs.tocAi}>
          <pre className="ink-code">{`import { inkAi } from '@forgedevstack/ink/plugins/ai';

inkAi.register({
  id: 'my-agent',
  name: 'My Agent',
  capabilities: ['rewrite'],
  async run({ html }) {
    return { html };
  },
});`}</pre>
        </DocSection>

        <DocSection id="angular" title={t.docs.tocAngular}>
          <Typography variant="body1">
            Import helpers from <code>@forgedevstack/ink/angular</code>. Mount React{' '}
            <code>InkEditor</code> via your preferred bridge; a dedicated Angular component lands in 1.x.
          </Typography>
        </DocSection>

        <DocSection id="wordpress" title={t.docs.tocWordpress}>
          <Typography variant="body1">
            See <code>wordpress/ink-editor</code> in the package for a classic meta box stub.
          </Typography>
        </DocSection>

        <DocSection id="accessibility" title={t.docs.tocA11y}>
          <Typography variant="body1">
            Toolbar controls expose titles; contenteditable surface supports keyboard formatting via
            browser execCommand. Prefer labelled wrappers and sufficient contrast when theming.
          </Typography>
          <Typography variant="caption" className="text-slate-400 block">
            Docs site: {SITE_URL} · Portal source: {PORTAL_GITHUB_URL}
          </Typography>
        </DocSection>
      </div>
    </DocLayout>
  );
};
