import { INK_CALLOUT_CLASS, VERSION_PLACEHOLDER } from '@const/home.const';
import { EMPTY_STRING } from '@const/strings.const';
import type { HeroEditorCopy } from '@const/home.types';

export const fillVersion = (template: string, version: string): string =>
  template.split(VERSION_PLACEHOLDER).join(version || EMPTY_STRING);

export const buildHeroEditorHtml = (copy: HeroEditorCopy, version: string): string => {
  const title = fillVersion(copy.title, version);
  return [
    `<h1>${title}</h1>`,
    `<p>${copy.lead}</p>`,
    '<ul>',
    `<li><b>${copy.toolbarLabel}</b> — ${copy.toolbarBody}</li>`,
    `<li><b>${copy.slashLabel}</b> — ${copy.slashBody}</li>`,
    `<li><b>${copy.outlineLabel}</b> — ${copy.outlineBody}</li>`,
    '</ul>',
    `<blockquote class="${INK_CALLOUT_CLASS}"><p>${copy.callout}</p></blockquote>`,
    `<h2>${copy.whatsNewTitle}</h2>`,
    `<p>${copy.whatsNewBody}</p>`,
    `<h3>${copy.aiTitle}</h3>`,
    `<p>${copy.aiBody}</p>`,
  ].join('');
};
