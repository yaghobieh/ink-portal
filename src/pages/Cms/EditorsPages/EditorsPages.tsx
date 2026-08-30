import { useEffect, useState, type FC } from 'react';
import { useNucleus } from '@forgedevstack/synapse';
import { Badge, Button, Card, Flex, Spinner, Typography } from '@forgedevstack/bear';
import { InkEditor, type InkEditorVariant } from '@forgedevstack/ink';
import { cmsInkAiProps } from '@/ai/index';
import { Link } from '@forgedevstack/forge-compass/react';
import { useAuth } from '@hooks/index';
import { useI18n } from '@i18n/index';
import { ROUTES, THEME_CLASS_SNOW } from '@const/index';
import { authNucleus, contentNucleus } from '@sdk/index';
import type { PlaygroundVariant } from '@pages/Playground/Playground.types';
import { CmsShell, CMS_NAV_IDS } from '../CmsShell';
import {
  EDITORS_COLLECTION,
  EDITOR_PREVIEW_MIN_HEIGHT_PX,
  EDITOR_VARIANT_ORDER,
  FALLBACK_EDITOR_HTML,
} from './EditorsPages.const';

const htmlFromPayload = (payload: Record<string, unknown>, fallback: string): string => {
  if (typeof payload.html === 'string' && payload.html.trim()) return payload.html;
  return fallback;
};

const variantFromSlug = (slug: string): PlaygroundVariant => {
  if (EDITOR_VARIANT_ORDER.includes(slug as PlaygroundVariant)) {
    return slug as PlaygroundVariant;
  }
  return 'classic';
};

export const EditorsPages: FC = () => {
  const { t } = useI18n();
  const { token: providerToken } = useAuth();
  const { token } = useNucleus(authNucleus);
  const { items, loading, error, fetchContentByCollection } = useNucleus(contentNucleus);
  const activeToken = token || providerToken;
  const [activeVariant, setActiveVariant] = useState<PlaygroundVariant>('classic');
  const [htmlByVariant, setHtmlByVariant] = useState<Record<PlaygroundVariant, string>>(
    FALLBACK_EDITOR_HTML,
  );

  useEffect(() => {
    if (activeToken) {
      void fetchContentByCollection(activeToken, EDITORS_COLLECTION);
    }
  }, [activeToken, fetchContentByCollection]);

  useEffect(() => {
    if (items.length === 0) return;
    const next = { ...FALLBACK_EDITOR_HTML };
    for (const item of items) {
      const variant = variantFromSlug(item.slug);
      next[variant] = htmlFromPayload(item.payload, FALLBACK_EDITOR_HTML[variant]);
    }
    setHtmlByVariant(next);
  }, [items]);

  return (
    <CmsShell activeNavId={CMS_NAV_IDS.EDITORS}>
      <Flex direction="column" gap={4}>
        <Flex justify="between" align="center" className="gap-3 flex-wrap">
          <div>
            <Typography variant="h2" className="mb-1">
              {t.dashboard.editorsTitle}
            </Typography>
            <Typography variant="body2" className="ink-cms__muted mb-0">
              {t.dashboard.editorsSubtitle}
            </Typography>
          </div>
          <Link to={ROUTES.PLAYGROUND}>
            <Button size="sm" variant="ink">
              {t.dashboard.openPlayground}
            </Button>
          </Link>
        </Flex>

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

        <div className="ink-cms-variant-tabs">
          {EDITOR_VARIANT_ORDER.map((variant) => (
            <button
              key={variant}
              type="button"
              className={`ink-cms-variant-tab${
                activeVariant === variant ? ' ink-cms-variant-tab--active' : ''
              }`}
              onClick={() => setActiveVariant(variant)}
            >
              {variant}
            </button>
          ))}
        </div>

        <Card className="ink-cms-card ink-cms-editor-preview">
          <Flex justify="between" align="center" className="mb-3">
            <Typography variant="h4" className="mb-0">
              {t.dashboard.editorsLivePreview}: {activeVariant}
            </Typography>
            <Badge variant="success" className="text-xs">
              v{t.dashboard.editorsVersion}
            </Badge>
          </Flex>
          <div className={`ink-cms-editor-stage ${THEME_CLASS_SNOW}`}>
            <InkEditor
              value={htmlByVariant[activeVariant]}
              onChange={(value) =>
                setHtmlByVariant((prev) => ({ ...prev, [activeVariant]: value }))
              }
              variant={activeVariant as InkEditorVariant}
              colorMode="light"
              minHeight={EDITOR_PREVIEW_MIN_HEIGHT_PX}
              features={{ blocks: true, slash: true, table: true, ai: true }}
              ai={cmsInkAiProps()}
            />
          </div>
        </Card>
      </Flex>
    </CmsShell>
  );
};
