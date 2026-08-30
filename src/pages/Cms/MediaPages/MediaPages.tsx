import { useEffect, useRef, useState, type DragEvent, type FC } from 'react';
import { useNucleus } from '@forgedevstack/synapse';
import { Badge, Button, Card, Flex, Spinner, Typography } from '@forgedevstack/bear';
import { useAuth } from '@hooks/index';
import { useI18n } from '@i18n/index';
import { EMPTY_STRING } from '@const/index';
import { NUMBER_ZERO } from '@const/numbers.const';
import { authNucleus, mediaNucleus } from '@sdk/index';
import { CmsShell, CMS_NAV_IDS } from '../CmsShell';
import { MEDIA_ACCEPT, MEDIA_FILE_INPUT_ID } from './MediaPages.const';

export const MediaPages: FC = () => {
  const { t } = useI18n();
  const { token: providerToken } = useAuth();
  const { token } = useNucleus(authNucleus);
  const { items, source, loading, uploading, error, uploadError, fetchMedia, uploadMedia } =
    useNucleus(mediaNucleus);
  const activeToken = token || providerToken;
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!activeToken) return;
    void fetchMedia(activeToken);
  }, [activeToken]);

  const processFiles = async (files: FileList | null) => {
    if (!activeToken || !files || files.length === NUMBER_ZERO) return;
    const list = Array.from(files);
    for (const file of list) {
      await uploadMedia(activeToken, file);
    }
    void fetchMedia(activeToken);
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    void processFiles(event.dataTransfer.files);
  };

  return (
    <CmsShell activeNavId={CMS_NAV_IDS.MEDIA}>
      <Flex direction="column" gap={4}>
        <Flex justify="between" align="center" className="gap-3 flex-wrap">
          <div>
            <Typography variant="h2" className="mb-1">
              {t.dashboard.mediaTitle}
            </Typography>
            <Typography variant="body2" className="ink-cms__muted mb-0">
              {t.dashboard.mediaSubtitle}
            </Typography>
          </div>
          {source ? (
            <Badge variant="info" className="text-xs">
              {source}
            </Badge>
          ) : null}
        </Flex>

        <div
          className={`ink-cms-dropzone${dragging ? ' ink-cms-dropzone--active' : ''}${
            uploading ? ' ink-cms-dropzone--busy' : EMPTY_STRING
          }`}
          onDragEnter={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            setDragging(false);
          }}
          onDrop={onDrop}
        >
          <Typography variant="h4" className="mb-2">
            {t.dashboard.mediaDropTitle}
          </Typography>
          <Typography variant="body2" className="ink-cms__muted mb-4">
            {t.dashboard.mediaDropBody}
          </Typography>
          <input
            ref={inputRef}
            id={MEDIA_FILE_INPUT_ID}
            type="file"
            accept={MEDIA_ACCEPT}
            multiple
            className="ink-cms-dropzone__input"
            onChange={(event) => {
              void processFiles(event.target.files);
              event.target.value = EMPTY_STRING;
            }}
          />
          <Button
            size="sm"
            variant="ink"
            disabled={uploading || !activeToken}
            onClick={() => inputRef.current?.click()}
          >
            {uploading ? t.dashboard.mediaUploading : t.dashboard.mediaBrowse}
          </Button>
        </div>

        {loading || uploading ? (
          <Flex align="center" gap={2}>
            <Spinner size="sm" />
            <Typography variant="body2" className="mb-0">
              {uploading ? t.dashboard.mediaUploading : t.dashboard.loading}
            </Typography>
          </Flex>
        ) : null}

        {error ? (
          <Typography variant="body2" className="ink-cms-dashboard__error mb-0">
            {t.dashboard.error}
          </Typography>
        ) : null}

        {uploadError ? (
          <Typography variant="body2" className="ink-cms-dashboard__error mb-0">
            {t.dashboard.mediaUploadError}
          </Typography>
        ) : null}

        <div className="ink-cms-list ink-cms-list--media">
          {items.map((item) => (
            <Card key={item.id} className="ink-cms-card ink-cms-media-card">
              {item.secureUrl || item.url ? (
                <img
                  src={item.secureUrl || item.url}
                  alt={item.publicId}
                  className="ink-cms-media-card__thumb"
                />
              ) : null}
              <Typography variant="body2" className="mb-1 font-medium">
                {item.publicId}
              </Typography>
              <Typography variant="caption" className="ink-cms__muted mb-0">
                {item.resourceType}
                {item.format ? ` · ${item.format}` : EMPTY_STRING}
              </Typography>
            </Card>
          ))}
          {!loading && items.length === NUMBER_ZERO ? (
            <Typography variant="body2" className="ink-cms__muted mb-0">
              {t.dashboard.listEmpty}
            </Typography>
          ) : null}
        </div>
      </Flex>
    </CmsShell>
  );
};
