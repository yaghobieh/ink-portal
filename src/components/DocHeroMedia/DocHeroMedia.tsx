import type { FC } from 'react';
import { Typography } from '@forgedevstack/bear';
import { getDocsPageMedia } from '@const/docsMedia.const';
import { EMPTY_STRING } from '@const/strings.const';
import type { DocHeroMediaProps } from './DocHeroMedia.types';

export const DocHeroMedia: FC<DocHeroMediaProps> = (props) => {
  const { slug, guidLabel } = props;
  const media = getDocsPageMedia(slug);
  if (!media) return null;

  return (
    <figure className="ink-doc-media ink-doc-media--hero" data-doc-guid={media.guid}>
      <img
        src={media.gifSrc}
        alt={media.caption}
        width={media.width}
        height={media.height}
        className="ink-doc-media__img"
        loading="eager"
      />
      <figcaption className="ink-doc-media__caption">
        {media.caption}
      </figcaption>
      <Typography variant="caption" className="ink-doc-media__guid mb-0">
        {guidLabel}
        {EMPTY_STRING}
        {media.guid}
      </Typography>
    </figure>
  );
};
