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
          <Typography variant="body1">Install from npm. Peer deps: React 18+.</Typography>
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
    <InkEditor
      value={value}
      onChange={setValue}
      variant="classic"
      ai={{ enabled: true, placement: 'sidebar' }}
      showCommentsPanel
      typoAutoFix
    />
  );
}`}</pre>
        </DocSection>

        <DocSection id="configuration" title={t.docs.tocConfiguration}>
          <Typography variant="body1">
            Controlled HTML via <code>value</code> / <code>onChange</code>. New in 1.1:{' '}
            <code>variant</code>, <code>features</code>, <code>trackChanges</code>,{' '}
            <code>comments</code>, <code>showCommentsPanel</code>, <code>ai</code>,{' '}
            <code>slashCommands</code>, <code>author</code>, <code>tableRows</code> /{' '}
            <code>tableCols</code>.
          </Typography>
        </DocSection>

        <DocSection id="toolbar" title={t.docs.tocToolbar}>
          <Typography variant="body1">
            Toolbar options now include <code>table</code>, <code>undo</code>, <code>redo</code>,{' '}
            <code>trackChanges</code>, <code>comments</code>, <code>ai</code> plus classic formats.
            Presets: <code>INK_DEFAULT_TOOLBAR</code>, <code>INK_SIMPLE_TOOLBAR</code>,{' '}
            <code>INK_COLLAB_TOOLBAR</code>.
          </Typography>
        </DocSection>

        <DocSection id="modules" title={t.docs.tocModules}>
          <Typography variant="body1">
            Pass <code>features=&#123;&#123; table, trackChanges, comments, ai, blocks, slash &#125;&#125;</code>{' '}
            to enable modules. Legacy props <code>typoAutoFix</code>, <code>allowImagePaste</code>,{' '}
            <code>showCharCount</code> still work.
          </Typography>
        </DocSection>

        <DocSection id="tables" title={t.docs.tocTables}>
          <Typography variant="body1">
            Toolbar table button inserts an N×M HTML table (<code>tableRows</code> /{' '}
            <code>tableCols</code>). Cells are contenteditable. Helper:{' '}
            <code>buildTableHtml(rows, cols)</code>.
          </Typography>
        </DocSection>

        <DocSection id="track-changes" title={t.docs.tocTrackChanges}>
          <Typography variant="body1">
            Enable via toolbar toggle. Inserts wrap in <code>Ink-tc-insert</code>, deletes in{' '}
            <code>Ink-tc-delete</code>. Parallel model: <code>trackChanges</code> /{' '}
            <code>onTrackChangesChange</code> with Accept/Reject strip.
          </Typography>
        </DocSection>

        <DocSection id="comments" title={t.docs.tocComments}>
          <Typography variant="body1">
            Highlight selection → prompt → yellow mark + Comments archive sidebar. Props:{' '}
            <code>comments</code>, <code>onCommentsChange</code>, <code>showCommentsPanel</code>.
          </Typography>
        </DocSection>

        <DocSection id="blocks" title={t.docs.tocBlocks}>
          <Typography variant="body1">
            Document/classic variants outline the active block. Block handles move up/down (DnD
            Planned). Slash menu: type <code>/</code> for heading, list, table, AI.
          </Typography>
        </DocSection>

        <DocSection id="themes" title={t.docs.tocThemes}>
          <Typography variant="body1">
            CSS variables on <code>.Ink-Editor</code> including <code>--ink-shadow</code>,{' '}
            <code>--ink-radius</code>, <code>--ink-ai-*</code>. Theme classes: snow / bubble / dark /
            minimal.
          </Typography>
        </DocSection>

        <DocSection id="typo" title={t.docs.tocTypo}>
          <Typography variant="body1">
            <code>typoAutoFix</code> runs blur-time dictionary fixes. Export{' '}
            <code>applyTypoAutoFix</code>.
          </Typography>
        </DocSection>

        <DocSection id="ai" title={t.docs.tocAi}>
          <Typography variant="body1">
            Side panel via <code>ai=&#123;&#123; enabled: true, placement: &apos;sidebar&apos; &#125;&#125;</code>.
            Demo provider is built-in. Bring your own LLM:
          </Typography>
          <pre className="ink-code">{`import { inkAi, INK_AI_MODEL_CATALOG } from '@forgedevstack/ink/plugins/ai';

inkAi.registerProvider({
  id: 'my-provider',
  name: 'My provider',
  models: INK_AI_MODEL_CATALOG.filter((m) => m.provider === 'openai'),
  async run(request) {
    return { text: '…', html: request.html };
  },
});`}</pre>
          <Typography variant="body2" className="text-slate-500">
            Honesty: catalog constants only — Ink does not host models or claim SOC2/enterprise
            hosting. See the{' '}
            <a className="text-teal-700 underline" href="/ai">
              AI page
            </a>
            .
          </Typography>
        </DocSection>

        <DocSection id="angular" title={t.docs.tocAngular}>
          <Typography variant="body1">
            Import helpers from <code>@forgedevstack/ink/angular</code>. Mount React{' '}
            <code>InkEditor</code> via your preferred bridge.
          </Typography>
        </DocSection>

        <DocSection id="wordpress" title={t.docs.tocWordpress}>
          <Typography variant="body1">
            See <code>wordpress/ink-editor</code> in the package for a classic meta box stub.
          </Typography>
        </DocSection>

        <DocSection id="accessibility" title={t.docs.tocA11y}>
          <Typography variant="body1">
            Toolbar controls expose titles; contenteditable supports keyboard formatting via
            execCommand. Prefer labelled wrappers and sufficient contrast when theming.
          </Typography>
          <Typography variant="caption" className="text-slate-400 block">
            Docs site: {SITE_URL} · Portal source: {PORTAL_GITHUB_URL}
          </Typography>
        </DocSection>
      </div>
    </DocLayout>
  );
};
