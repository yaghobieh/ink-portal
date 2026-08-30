import type { CanvasNode } from '../BuilderPages/BuilderPages.types';
import { CANVAS_KIND } from '../BuilderPages/BuilderPages.const';
import { DOCUMENT_CLOUDINARY_IMAGE_SRC } from '@const/docsCloudinary.const';

export const TEMPLATES_COLLECTION = 'templates';
export const TEMPLATE_SLUG_PREFIX = 'template-';
export const PAGE_SLUG_PREFIX = 'page-';
export const DOCS_ARTICLE_IMAGE_SRC =
  DOCUMENT_CLOUDINARY_IMAGE_SRC || '/docs/installation.svg';
export const DOCS_ARTICLE_HTML = `<h1>Installation</h1><p><img src="${DOCS_ARTICLE_IMAGE_SRC}" alt="Install Ink and mount the editor" /></p><p>Ink is a React rich-text editor that stores content as HTML and exposes structured side-channel state (comments, track changes) as JSON-friendly payloads. Install the package once, import styles once, then mount InkEditor in any form or document surface.</p><h2>What you get</h2><ul><li><strong>npm package</strong> — Adds the editor runtime, toolbar presets, and CSS entry under @forgedevstack/ink.</li><li><strong>Styles entry</strong> — One import of @forgedevstack/ink/styles.css at the app root styles the chrome and content.</li><li><strong>Controlled mount</strong> — value / onChange keeps the parent as source of truth — ideal for forms and save APIs.</li></ul><pre><code>npm install @forgedevstack/ink@1.1.6</code></pre><pre><code>import { InkEditor } from '@forgedevstack/ink';
import '@forgedevstack/ink/styles.css';</code></pre><p>Package: <a class="ink-doc-link" href="https://www.npmjs.com/package/@forgedevstack/ink" target="_blank" rel="noreferrer">@forgedevstack/ink</a> · current docs target <strong>1.1.6</strong></p>`;

export type PageLayoutTemplate = {
  id: string;
  title: string;
  description: string;
  tree: CanvasNode[];
};

const layoutId = (prefix: string): string => `${prefix}-seed`;

export const PAGE_LAYOUT_TEMPLATES: PageLayoutTemplate[] = [
  {
    id: 'documentation',
    title: 'Documentation',
    description: 'Docs article — hero image, steps, and code. Use this for installation and every docs page.',
    tree: [
      {
        id: layoutId('documentation-section'),
        kind: CANVAS_KIND.SECTION,
        label: 'Article',
        children: [
          {
            id: layoutId('documentation-ink'),
            kind: CANVAS_KIND.INK,
            label: 'Body',
            html: DOCS_ARTICLE_HTML,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 'docs-article',
    title: 'Document',
    description: 'Installation page layout — hero image, steps, and code. Used for every docs page.',
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
            html: DOCS_ARTICLE_HTML,
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
