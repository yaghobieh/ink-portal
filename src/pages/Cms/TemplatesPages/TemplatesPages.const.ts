import type { CanvasNode } from '../BuilderPages/BuilderPages.types';
import { CANVAS_KIND } from '../BuilderPages/BuilderPages.const';

export const TEMPLATES_COLLECTION = 'templates';
export const TEMPLATE_SLUG_PREFIX = 'template-';
export const PAGE_SLUG_PREFIX = 'page-';

export type PageLayoutTemplate = {
  id: string;
  title: string;
  description: string;
  tree: CanvasNode[];
};

const layoutId = (prefix: string): string => `${prefix}-seed`;

export const PAGE_LAYOUT_TEMPLATES: PageLayoutTemplate[] = [
  {
    id: 'docs-article',
    title: 'Docs article',
    description: 'Title, Ink body, and a code aside — the Ink docs look.',
    tree: [
      {
        id: layoutId('docs-section'),
        kind: CANVAS_KIND.SECTION,
        label: 'Article',
        children: [
          {
            id: layoutId('docs-ink'),
            kind: CANVAS_KIND.INK,
            label: 'Body',
            html: '<h1>Page title</h1><p>Write the article the way this site should look.</p>',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 'landing-hero',
    title: 'Landing hero',
    description: 'Hero section with Flex row and a form.',
    tree: [
      {
        id: layoutId('hero-flex'),
        kind: CANVAS_KIND.FLEX,
        label: 'Hero',
        children: [
          {
            id: layoutId('hero-ink'),
            kind: CANVAS_KIND.INK,
            label: 'Copy',
            html: '<h1>Headline</h1><p>Short supporting line.</p>',
            children: [],
          },
          {
            id: layoutId('hero-form'),
            kind: CANVAS_KIND.FORM,
            label: 'Form',
            html: '<form class="ink-cms-widget-form"><label>Email</label><input type="email" /><button type="submit">Join</button></form>',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 'blank-canvas',
    title: 'Blank canvas',
    description: 'Empty section to start a reusable layout.',
    tree: [
      {
        id: layoutId('blank-section'),
        kind: CANVAS_KIND.SECTION,
        label: 'Section',
        children: [],
      },
    ],
  },
];
