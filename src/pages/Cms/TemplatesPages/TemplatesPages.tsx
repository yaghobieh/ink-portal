import { useEffect, type FC } from 'react';
import { useNavigate } from '@forgedevstack/forge-compass/react';
import { useNucleus } from '@forgedevstack/synapse';
import { BearIcons, Button, Card, Flex, Spinner, Typography } from '@forgedevstack/bear';
import { useAuth } from '@hooks/index';
import { useI18n } from '@i18n/index';
import { cmsBuilderPath } from '@const/index';
import { CMS_ICON_SIZE } from '@const/numbers.const';
import { authNucleus, contentNucleus } from '@sdk/index';
import { saveContentRequest } from '@sdk/modules/content';
import { CmsShell, CMS_NAV_IDS } from '../CmsShell';
import {
  CONTENT_COLLECTION_PAGES,
  DOCUMENT_DEFAULT_LOCALE,
  DOCUMENT_STARTER_STATUS,
} from '../ContentPages/ContentPages.const';
import { cloneCanvasTree } from '../BuilderPages/BuilderPages.utils';
import {
  PAGE_LAYOUT_TEMPLATES,
  PAGE_SLUG_PREFIX,
  TEMPLATES_COLLECTION,
  TEMPLATE_SLUG_PREFIX,
} from './TemplatesPages.const';

export const TemplatesPages: FC = () => {
  const { t } = useI18n();
  const { navigate } = useNavigate();
  const { token: providerToken } = useAuth();
  const { token } = useNucleus(authNucleus);
  const { items, loading, error, saving, fetchContent } = useNucleus(contentNucleus);
  const activeToken = token || providerToken;

  useEffect(() => {
    if (activeToken) {
      void fetchContent(activeToken);
    }
  }, [activeToken, fetchContent]);

  const templates = items.filter((item) => item.collection === TEMPLATES_COLLECTION);

  const onNewTemplate = async () => {
    if (!activeToken) return;
    const blank = PAGE_LAYOUT_TEMPLATES.find((layout) => layout.id === 'blank-canvas');
    const slug = `${TEMPLATE_SLUG_PREFIX}${Date.now()}`;
    const item = await saveContentRequest(activeToken, {
      collection: TEMPLATES_COLLECTION,
      slug,
      locale: DOCUMENT_DEFAULT_LOCALE,
      title: t.cmsTemplates.newTemplate,
      status: DOCUMENT_STARTER_STATUS,
      payload: {
        canvas: blank ? cloneCanvasTree(blank.tree) : [],
      },
    });
    if (!item) return;
    await fetchContent(activeToken);
    navigate(cmsBuilderPath({ doc: item.id }));
  };

  const onUseLayout = async (layoutId: string) => {
    if (!activeToken) return;
    const layout = PAGE_LAYOUT_TEMPLATES.find((item) => item.id === layoutId);
    if (!layout) return;
    const slug = `${PAGE_SLUG_PREFIX}${Date.now()}`;
    const item = await saveContentRequest(activeToken, {
      collection: CONTENT_COLLECTION_PAGES,
      slug,
      locale: DOCUMENT_DEFAULT_LOCALE,
      title: layout.title,
      status: DOCUMENT_STARTER_STATUS,
      payload: {
        canvas: cloneCanvasTree(layout.tree),
        layoutId: layout.id,
      },
    });
    if (!item) return;
    await fetchContent(activeToken);
    navigate(cmsBuilderPath({ doc: item.id }));
  };

  return (
    <CmsShell activeNavId={CMS_NAV_IDS.TEMPLATES}>
      <Flex direction="column" gap={4}>
        <Flex justify="between" align="end" className="gap-3 flex-wrap">
          <div>
            <Typography variant="h2" className="mb-1">
              {t.cmsTemplates.title}
            </Typography>
            <Typography variant="body2" className="ink-cms__muted mb-0">
              {t.cmsTemplates.subtitle}
            </Typography>
          </div>
          <Button
            size="sm"
            variant="ink"
            icon={<BearIcons.PlusIcon size={CMS_ICON_SIZE} />}
            onClick={() => void onNewTemplate()}
            disabled={saving || !activeToken}
          >
            {t.cmsTemplates.newTemplate}
          </Button>
        </Flex>
        <Typography variant="h4" className="mb-0">
          {t.cmsTemplates.layoutsTitle}
        </Typography>
        <div className="ink-cms-templates-grid">
          {PAGE_LAYOUT_TEMPLATES.map((layout) => (
            <Card key={layout.id} className="ink-cms-card">
              <Flex direction="column" gap={2}>
                <Typography variant="h4" className="mb-0">
                  {layout.title}
                </Typography>
                <Typography variant="body2" className="ink-cms__muted mb-0">
                  {layout.description}
                </Typography>
                <div className="ink-cms-template-preview">
                  {layout.tree.map((node) => (
                    <Typography key={node.id} variant="caption" className="mb-0">
                      {node.label}
                    </Typography>
                  ))}
                </div>
                <Flex gap={2} className="flex-wrap">
                  <Button
                    size="sm"
                    variant="ink"
                    icon={<BearIcons.GridIcon size={CMS_ICON_SIZE} />}
                    onClick={() => navigate(cmsBuilderPath({ layout: layout.id }))}
                  >
                    {t.cmsTemplates.design}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => void onUseLayout(layout.id)}
                    disabled={saving || !activeToken}
                  >
                    {t.cmsTemplates.useLayout}
                  </Button>
                </Flex>
              </Flex>
            </Card>
          ))}
        </div>
        <Typography variant="h4" className="mb-0">
          {t.cmsTemplates.savedTitle}
        </Typography>
        {loading ? (
          <Flex align="center" gap={2}>
            <Spinner size="sm" />
            <Typography variant="body2" className="mb-0">
              {t.dashboard.loading}
            </Typography>
          </Flex>
        ) : null}
        {error ? (
          <Typography variant="body2" className="ink-cms-dashboard__error mb-0">
            {t.dashboard.error}
          </Typography>
        ) : null}
        {templates.length === 0 && !loading ? (
          <Typography variant="body2" className="ink-cms__muted mb-0">
            {t.cmsTemplates.empty}
          </Typography>
        ) : (
          <div className="ink-cms-templates-grid">
            {templates.map((item) => (
              <Card key={item.id} className="ink-cms-card">
                <Flex direction="column" gap={2}>
                  <Typography variant="h4" className="mb-0">
                    {item.title || item.slug}
                  </Typography>
                  <Typography variant="caption" className="ink-cms__muted mb-0">
                    {item.collection} · {item.status}
                  </Typography>
                  <Button
                    size="sm"
                    variant="outline"
                    icon={<BearIcons.EditIcon size={CMS_ICON_SIZE} />}
                    onClick={() => navigate(cmsBuilderPath({ doc: item.id }))}
                  >
                    {t.cmsTemplates.design}
                  </Button>
                </Flex>
              </Card>
            ))}
          </div>
        )}
      </Flex>
    </CmsShell>
  );
};
