import { INK_API_URL } from '@const/billing.const';
import { EMPTY_STRING } from '@const/index';
import { requestWithError } from '../../http';
import { authHeaders } from '../auth/auth.api';
import {
  CMS_MEDIA_PATH,
  CMS_MEDIA_SIGN_PATH,
  CMS_MEDIA_UPLOAD_PATH,
  CONTENT_TYPE_JSON,
  DEFAULT_MEDIA_FOLDER,
  DEFAULT_MEDIA_RESOURCE_TYPE,
  HTTP_METHOD_POST,
  MEDIA_UPLOAD_DATA_URL_KEY,
  MEDIA_UPLOAD_FILE_NAME_KEY,
} from './media.const';
import type {
  CloudinarySignResponse,
  MediaItem,
  MediaListResponse,
  RegisterMediaInput,
} from './media.types';
import { fileToDataUrl } from './media.utils';

export { CMS_MEDIA_PATH, CMS_MEDIA_SIGN_PATH, CMS_MEDIA_UPLOAD_PATH };

export const fetchMediaRequest = async (
  token: string,
): Promise<{ items: MediaItem[]; source: string | null }> => {
  if (!INK_API_URL || !token) return { items: [], source: null };
  const response = await requestWithError(
    `${INK_API_URL}${CMS_MEDIA_PATH}`,
    { headers: authHeaders(token) },
    { message: 'Failed to load media' },
  );
  if (!response.ok) return { items: [], source: null };
  const data = (await response.json()) as MediaListResponse;
  return { items: data.items ?? [], source: data.source ?? null };
};

export const fetchSign = async (
  token: string,
): Promise<CloudinarySignResponse | null> => {
  if (!INK_API_URL || !token) return null;
  const response = await requestWithError(
    `${INK_API_URL}${CMS_MEDIA_SIGN_PATH}`,
    { headers: authHeaders(token) },
    { message: 'Failed to sign media upload' },
  );
  if (!response.ok) return null;
  return (await response.json()) as CloudinarySignResponse;
};

export const registerMedia = async (
  token: string,
  input: RegisterMediaInput,
): Promise<MediaItem | null> => {
  if (!INK_API_URL || !token) return null;
  const response = await requestWithError(
    `${INK_API_URL}${CMS_MEDIA_PATH}`,
    {
      method: HTTP_METHOD_POST,
      headers: {
        ...authHeaders(token),
        'Content-Type': CONTENT_TYPE_JSON,
      },
      body: JSON.stringify({
        publicId: input.publicId,
        url: input.url || input.secureUrl,
        secureUrl: input.secureUrl,
        resourceType: input.resourceType || DEFAULT_MEDIA_RESOURCE_TYPE,
        format: input.format ?? null,
        bytes: input.bytes ?? 0,
        width: input.width ?? null,
        height: input.height ?? null,
        folder: input.folder || DEFAULT_MEDIA_FOLDER,
      }),
    },
    { mode: 'modal', message: 'Failed to register media' },
  );
  if (!response.ok) return null;
  const data = (await response.json()) as { item?: MediaItem };
  return data.item ?? null;
};

export const uploadViaServer = async (
  token: string,
  file: File,
): Promise<MediaItem | null> => {
  if (!INK_API_URL || !token) {
    return null;
  }
  const dataUrl = await fileToDataUrl(file);
  const response = await requestWithError(
    `${INK_API_URL}${CMS_MEDIA_UPLOAD_PATH}`,
    {
      method: HTTP_METHOD_POST,
      headers: {
        ...authHeaders(token),
        'Content-Type': CONTENT_TYPE_JSON,
      },
      body: JSON.stringify({
        [MEDIA_UPLOAD_DATA_URL_KEY]: dataUrl,
        [MEDIA_UPLOAD_FILE_NAME_KEY]: file.name,
      }),
    },
    { mode: 'modal', message: 'Media upload failed' },
  );
  if (!response.ok) {
    return null;
  }
  const data = (await response.json()) as { item?: MediaItem };
  return data.item ?? null;
};

export const uploadAndRegisterMedia = async (
  token: string,
  file: File,
): Promise<MediaItem | null> => {
  return uploadViaServer(token, file);
};

export const mediaAltFromPublicId = (publicId: string): string =>
  publicId || EMPTY_STRING;
