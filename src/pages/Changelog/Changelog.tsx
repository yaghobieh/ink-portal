import { Typography } from '@forgedevstack/bear';
import { INK_VERSION } from '@const/index';

export const Changelog = () => (
  <div className="fade-in">
    <Typography variant="h2" className="text-teal-200 mb-4">
      Changelog
    </Typography>
    <Typography variant="h4" className="text-teal-300 mb-2">
      {INK_VERSION}
    </Typography>
    <ul className="list-disc pl-5 text-zinc-300 space-y-2">
      <li>InkEditor React WYSIWYG with controlled HTML value/onChange</li>
      <li>Toolbar, colors, lists, links, image paste</li>
      <li>Typo auto-fix MVP</li>
      <li>AI plugin stub, Angular entry, WordPress stub</li>
    </ul>
  </div>
);
