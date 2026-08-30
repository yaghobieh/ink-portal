import { useState, type FC } from 'react';
import { Badge, Button, Card, Flex, Typography } from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { CmsShell, CMS_NAV_IDS } from '../CmsShell';
import { EXTENSION_CATALOG, type ExtensionItem } from './ExtensionsPages.const';

export const ExtensionsPages: FC = () => {
  const { t } = useI18n();
  const [items, setItems] = useState<ExtensionItem[]>(EXTENSION_CATALOG);

  const install = (id: string) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id && item.status === 'available'
          ? { ...item, status: 'installed' }
          : item,
      ),
    );
  };

  const statusLabel = (status: ExtensionItem['status']): string => {
    if (status === 'installed') return t.cmsExtensions.statusInstalled;
    if (status === 'coming') return t.cmsExtensions.statusComing;
    return t.cmsExtensions.statusAvailable;
  };

  return (
    <CmsShell activeNavId={CMS_NAV_IDS.EXTENSIONS}>
      <Flex direction="column" gap={4}>
        <div>
          <Typography variant="h2" className="mb-1">
            {t.cmsExtensions.title}
          </Typography>
          <Typography variant="body2" className="ink-cms__muted mb-0">
            {t.cmsExtensions.subtitle}
          </Typography>
        </div>
        <div className="ink-cms-extensions-grid">
          {items.map((item) => (
            <Card key={item.id} className="ink-cms-card">
              <Flex justify="between" align="start" className="gap-2 mb-2">
                <Typography variant="h4" className="mb-0">
                  {item.name}
                </Typography>
                <Badge
                  variant={item.status === 'installed' ? 'success' : 'info'}
                  className="text-xs"
                >
                  {statusLabel(item.status)}
                </Badge>
              </Flex>
              <Typography variant="body2" className="ink-cms__muted mb-2">
                {item.description}
              </Typography>
              <Typography variant="caption" className="mb-3 block">
                v{item.version} · {item.tags.join(' · ')}
              </Typography>
              {item.status === 'available' ? (
                <Button size="sm" variant="ink" onClick={() => install(item.id)}>
                  {t.cmsExtensions.install}
                </Button>
              ) : null}
              {item.status === 'coming' ? (
                <Typography variant="caption" className="ink-cms__muted mb-0">
                  {t.cmsExtensions.comingHint}
                </Typography>
              ) : null}
            </Card>
          ))}
        </div>
      </Flex>
    </CmsShell>
  );
};
