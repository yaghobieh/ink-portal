import { useState, type FC } from 'react';
import { Link } from '@forgedevstack/forge-compass/react';
import { BearIcons, Button, Flex, Typography } from '@forgedevstack/bear';
import { InkEditor } from '@forgedevstack/ink';
import { useI18n } from '@i18n/index';
import { PLAYGROUND_EDITOR_MIN_HEIGHT_PX, ROUTES } from '@const/index';
import { usePlaygroundConfig } from './hooks/usePlaygroundConfig';
import { SectionTitle } from './components/SectionTitle';
import { SelectRow } from './components/SelectRow';
import { ToggleRow } from './components/ToggleRow';
import { THEME_OPTIONS, TOOLBAR_OPTIONS } from './Playground.const';
import type { PlaygroundTheme, PlaygroundView, ToolbarPreset } from './Playground.types';

export const Playground: FC = () => {
  const { t } = useI18n();
  const { config, set, reset, html, setHtml, toolbar, themeClass, generatedCode } =
    usePlaygroundConfig();
  const [view, setView] = useState<PlaygroundView>('preview');
  const [copied, setCopied] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const copyCode = async () => {
    await navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="ink-playground">
      <header className="flex items-center justify-between px-4 py-2.5 flex-shrink-0 z-20 bg-white/95 border-b border-slate-200 backdrop-blur">
        <Flex align="center" gap={3}>
          <Link to={ROUTES.HOME}>
            <button
              type="button"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-100"
            >
              <BearIcons.ArrowLeftIcon size="xs" />
              {t.playground.back}
            </button>
          </Link>
          <div className="w-px h-5 bg-slate-200" />
          <Typography variant="body2" className="font-bold">
            {t.playground.title}
          </Typography>
        </Flex>

        <Flex gap={2} align="center">
          <button
            type="button"
            onClick={() => setShowControls(!showControls)}
            className="md:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs border border-slate-200 text-slate-500"
          >
            <BearIcons.SettingsIcon size="xs" />
          </button>
          <Flex gap={0} className="p-0.5 rounded-lg bg-slate-100 border border-slate-200">
            {(['preview', 'code'] as PlaygroundView[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setView(key)}
                className="px-3 py-1.5 rounded-md text-xs font-medium transition-all"
                style={{
                  backgroundColor: view === key ? '#0f766e' : 'transparent',
                  color: view === key ? '#fff' : '#64748b',
                }}
              >
                {key === 'preview' ? t.playground.preview : t.playground.code}
              </button>
            ))}
          </Flex>
          <Button size="sm" variant="outline" onClick={reset}>
            {t.playground.reset}
          </Button>
        </Flex>
      </header>

      <div className="flex flex-1 min-h-0">
        <aside
          className={`${showControls ? 'block' : 'hidden'} md:block w-72 lg:w-80 flex-shrink-0 overflow-y-auto p-4 bg-slate-50 border-r border-slate-200`}
        >
          <SectionTitle>{t.playground.formats}</SectionTitle>
          <SelectRow
            label={t.playground.formats}
            value={config.toolbarPreset}
            options={TOOLBAR_OPTIONS.map((o) => ({
              value: o.value,
              label: t.playground[o.labelKey],
            }))}
            onChange={(v) => set('toolbarPreset', v as ToolbarPreset)}
          />

          <SectionTitle>{t.playground.modules}</SectionTitle>
          <ToggleRow
            label={t.playground.typoAutoFix}
            checked={config.typoAutoFix}
            onChange={(v) => set('typoAutoFix', v)}
          />
          <ToggleRow
            label={t.playground.allowImagePaste}
            checked={config.allowImagePaste}
            onChange={(v) => set('allowImagePaste', v)}
          />
          <ToggleRow
            label={t.playground.showCharCount}
            checked={config.showCharCount}
            onChange={(v) => set('showCharCount', v)}
          />
          <ToggleRow
            label={t.playground.readOnly}
            checked={config.readOnly}
            onChange={(v) => set('readOnly', v)}
          />

          <SectionTitle>{t.playground.theme}</SectionTitle>
          <SelectRow
            label={t.playground.theme}
            value={config.theme}
            options={THEME_OPTIONS.map((o) => ({
              value: o.value,
              label: t.playground[o.labelKey],
            }))}
            onChange={(v) => set('theme', v as PlaygroundTheme)}
          />
        </aside>

        <main className="flex-1 min-w-0 flex flex-col overflow-hidden bg-[#fafafa]">
          {view === 'preview' ? (
            <div className="flex-1 overflow-auto p-6 md:p-10">
              <div className={`max-w-4xl mx-auto ink-paper p-1 ${themeClass}`}>
                <InkEditor
                  value={html}
                  onChange={setHtml}
                  toolbar={toolbar}
                  typoAutoFix={config.typoAutoFix}
                  allowImagePaste={config.allowImagePaste}
                  showCharCount={config.showCharCount}
                  readOnly={config.readOnly}
                  minHeight={PLAYGROUND_EDITOR_MIN_HEIGHT_PX}
                />
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-auto p-6 md:p-10">
              <div className="max-w-3xl mx-auto">
                <Flex justify="between" align="center" className="mb-3">
                  <Typography variant="body2" className="font-semibold">
                    {t.playground.code}
                  </Typography>
                  <Button size="sm" variant="outline" onClick={copyCode}>
                    {copied ? t.playground.copied : t.playground.copyCode}
                  </Button>
                </Flex>
                <pre className="ink-code">{generatedCode}</pre>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
