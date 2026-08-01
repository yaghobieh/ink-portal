import { Alert, Typography } from '@forgedevstack/bear';

export const Ai = () => (
  <div className="fade-in">
    <Typography variant="h2" className="text-teal-200 mb-4">
      AI agent
    </Typography>
    <Alert severity="info" className="mb-6">
      Coming in 1.x — 1.0.0 ships the plugin interface only. Do not expect a built-in model.
    </Alert>
    <Typography variant="body1" className="text-zinc-300 mb-4">
      Register agents via <code>@forgedevstack/ink/plugins/ai</code>:
    </Typography>
    <pre className="rounded-xl bg-black/40 border border-teal-900/50 p-4 overflow-x-auto text-sm text-teal-100">{`import { inkAi } from '@forgedevstack/ink/plugins/ai';

inkAi.register({
  id: 'rewrite',
  name: 'Rewrite',
  capabilities: ['rewrite'],
  async run({ html }) {
    // your model call
    return { html };
  },
});`}</pre>
  </div>
);
