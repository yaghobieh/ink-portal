import { useEffect, type FC } from 'react';
import { useNavigate, useQuery } from '@forgedevstack/forge-compass/react';
import { Spinner, Flex, Typography } from '@forgedevstack/bear';
import { docsPath, ROUTES } from '@const/index';
import { useI18n } from '@i18n/index';
import { PAGE_TYPE } from '@sdk/modules/pages';

export const CmsPagesRoute: FC = () => {
  const { t } = useI18n();
  const { navigate } = useNavigate();
  const query = useQuery();
  const name = typeof query.name === 'string' ? query.name : '';
  const type = typeof query.type === 'string' ? query.type : PAGE_TYPE.DOC;

  useEffect(() => {
    if (!name) {
      navigate(ROUTES.DOCS, { replace: true });
      return;
    }
    if (type === PAGE_TYPE.DOC || type === 'docs') {
      navigate(docsPath(name), { replace: true });
      return;
    }
    if (type === PAGE_TYPE.SYSTEM && name === '404') {
      navigate(ROUTES.NOT_FOUND, { replace: true });
    }
  }, [name, type, navigate]);

  return (
    <Flex align="center" gap={2} className="fade-in p-8">
      <Spinner size="sm" />
      <Typography variant="body2" className="mb-0">
        {t.pages.resolving}
      </Typography>
    </Flex>
  );
};
