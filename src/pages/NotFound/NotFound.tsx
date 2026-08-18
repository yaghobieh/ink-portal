import { useEffect, useState, type FC } from 'react';
import { Link } from '@forgedevstack/forge-compass/react';
import { Button, Flex, Spinner, Typography } from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { ROUTES } from '@const/index';
import { fetchCmsPageRequest, PAGE_TYPE, SYSTEM_404_NAME } from '@sdk/modules/pages';

export const NotFound: FC = () => {
  const { t } = useI18n();
  const [title, setTitle] = useState(t.notFound.title);
  const [bodyHtml, setBodyHtml] = useState('');
  const [bodyText, setBodyText] = useState(t.notFound.body);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void fetchCmsPageRequest({ name: SYSTEM_404_NAME, type: PAGE_TYPE.SYSTEM })
      .then((page) => {
        if (cancelled || !page) return;
        setTitle(page.title || t.notFound.title);
        if (typeof page.payload.html === 'string' && page.payload.html) {
          setBodyHtml(page.payload.html);
          setBodyText('');
          return;
        }
        const blocks = Array.isArray(page.payload.blocks) ? page.payload.blocks : [];
        const paragraph = blocks.find(
          (block) =>
            block.type === 'paragraph' ||
            block.type === 'p' ||
            block.type === 'header',
        );
        if (paragraph && 'text' in paragraph && typeof paragraph.text === 'string') {
          setBodyText(paragraph.text);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [t.notFound.body, t.notFound.title]);

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap={4}
      className="fade-in ink-not-found min-h-[60vh] px-4 text-center"
    >
      {loading ? <Spinner size="sm" /> : null}
      <Typography variant="h1" className="mb-0">
        {title}
      </Typography>
      {bodyHtml ? (
        <div
          className="ink-doc-body max-w-xl"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      ) : (
        <Typography variant="body1" className="ink-text-muted max-w-xl mb-0">
          {bodyText}
        </Typography>
      )}
      <Typography variant="body2" className="ink-text-muted mb-0">
        {t.notFound.cmsHint}
      </Typography>
      <Link to={ROUTES.HOME} className="ink-doc-link">
        <Button size="sm" variant="ink">
          {t.notFound.home}
        </Button>
      </Link>
    </Flex>
  );
};
