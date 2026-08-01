import { Typography } from '@forgedevstack/bear';

const SNIPPET = `npm install @forgedevstack/ink

import { InkEditor } from '@forgedevstack/ink';
import '@forgedevstack/ink/styles.css';

<InkEditor value={html} onChange={setHtml} typoAutoFix />`;

export const GetStarted = () => (
  <div className="fade-in">
    <Typography variant="h2" className="text-teal-200 mb-4">
      Get started
    </Typography>
    <Typography variant="body1" className="text-zinc-300 mb-6">
      Install the package, import styles, and render a controlled editor.
    </Typography>
    <pre className="rounded-xl bg-black/40 border border-teal-900/50 p-4 overflow-x-auto text-sm text-teal-100">
      {SNIPPET}
    </pre>
  </div>
);
