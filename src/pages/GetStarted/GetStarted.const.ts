export const GET_STARTED_INSTALL = `npx i @forgedevstack/ink
npx @forgedevstack/ink --plugin titles
npx @forgedevstack/ink --plugin graph
npx @forgedevstack/ink --plugin theme
npx @forgedevstack/ink --plugin excel`;

export const GET_STARTED_IMPORT = `import { InkEditor } from '@forgedevstack/ink';
import '@forgedevstack/ink/styles.css';

<InkEditor value={html} onChange={setHtml} typoAutoFix />`;
