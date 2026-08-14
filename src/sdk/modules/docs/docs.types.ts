import type { DocDemoBlock, DocDemoEditorConfig } from '@const/docsContent.types';

export type PublicDocBlockType =
  | 'header'
  | 'paragraph'
  | 'list'
  | 'code'
  | 'html'
  | 'image'
  | 'demo'
  | 'p'
  | 'steps'
  | 'payload';

export type PublicDocHeaderBlock = {
  type: 'header';
  text: string;
  level?: number;
};

export type PublicDocParagraphBlock = {
  type: 'paragraph' | 'p';
  text: string;
};

export type PublicDocListBlock = {
  type: 'list';
  items: string[];
  ordered?: boolean;
};

export type PublicDocCodeBlock = {
  type: 'code';
  code: string;
  language?: string;
};

export type PublicDocHtmlBlock = {
  type: 'html';
  html: string;
};

export type PublicDocImageBlock = {
  type: 'image';
  src: string;
  alt?: string;
};

export type PublicDocDemoBlock = {
  type: 'demo';
  id?: string;
  title?: string;
  description?: string;
  initialHtml?: string;
  code?: string;
  editor?: DocDemoEditorConfig;
  payload?: DocDemoBlock['payload'];
  showLiveHtml?: boolean;
};

export type PublicDocStepsBlock = {
  type: 'steps';
  title?: string;
  items: { title: string; body: string }[];
};

export type PublicDocPayloadBlock = {
  type: 'payload';
  label: string;
  data: unknown;
};

export type PublicDocBlock =
  | PublicDocHeaderBlock
  | PublicDocParagraphBlock
  | PublicDocListBlock
  | PublicDocCodeBlock
  | PublicDocHtmlBlock
  | PublicDocImageBlock
  | PublicDocDemoBlock
  | PublicDocStepsBlock
  | PublicDocPayloadBlock;

export type PublicDocPayload = {
  blocks?: PublicDocBlock[];
  sections?: PublicDocBlock[];
  html?: string;
  title?: string;
  [key: string]: unknown;
};

export type PublicDocPage = {
  id?: string;
  slug: string;
  title: string;
  status?: string;
  locale?: string;
  payload: PublicDocPayload;
  bodyHtml?: string;
  updatedAt?: string;
};

export type PublicDocsListResponse = {
  pages?: PublicDocPage[];
  items?: PublicDocPage[];
};

export type PublicDocBySlugResponse = {
  page?: PublicDocPage;
  item?: PublicDocPage;
};
