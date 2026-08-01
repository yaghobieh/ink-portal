import { Typography } from '@forgedevstack/bear';

const PROPS = [
  ['value / onChange', 'Controlled HTML string'],
  ['toolbar', 'ToolbarOption[]'],
  ['typoAutoFix', 'boolean — blur-triggered dictionary fix (default true)'],
  ['allowImagePaste', 'boolean'],
  ['minHeight / maxHeight', 'number | string'],
  ['showCharCount / charCountMax', 'character counter'],
];

export const Api = () => (
  <div className="fade-in">
    <Typography variant="h2" className="text-teal-200 mb-4">
      API
    </Typography>
    <Typography variant="body1" className="text-zinc-300 mb-6">
      Primary export: <code>InkEditor</code>. Also: <code>applyTypoAutoFix</code>,{' '}
      <code>inkAi</code>, <code>INK_DEFAULT_TOOLBAR</code>.
    </Typography>
    <div className="space-y-3">
      {PROPS.map(([name, desc]) => (
        <div key={name} className="border border-teal-900/40 rounded-lg px-4 py-3 bg-black/25">
          <Typography variant="subtitle2" className="text-teal-300">
            {name}
          </Typography>
          <Typography variant="body2" className="text-zinc-400">
            {desc}
          </Typography>
        </div>
      ))}
    </div>
  </div>
);
