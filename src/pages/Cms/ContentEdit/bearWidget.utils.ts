import {
  BEAR_CLASS_PREFIX,
  DATA_BEAR_WIDGET_ATTR,
  HTML_TAG_DIV,
} from '@const/strings.const';

export const bearWidgetHtml = (
  component: string,
  inner: string,
  tag: string = HTML_TAG_DIV,
): string =>
  `<${tag} ${DATA_BEAR_WIDGET_ATTR}="${component}" class="${BEAR_CLASS_PREFIX}${component}">${inner}</${tag}>`;
