import { INK_API_URL } from '@const/billing.const';
import { EMPTY_STRING, HTTP_METHOD_POST, HTTP_METHOD_PUT } from '@const/index';
import { useApi } from '@sdk/http';
import { authHeaders } from '../auth/auth.api';
import {
  CLOUDINARY_API_BASE,
  CLOUDINARY_FORM_KEYS,
  CLOUDINARY_UPLOAD_PATH,
  CMS_MEDIA_PATH,
  CMS_MEDIA_SIGN_PATH,
  CMS_MEDIA_UPLOAD_PATH,
  CMS_MEDIA_CONFIG_PATH,
  DEFAULT_MEDIA_FOLDER,
  DEFAULT_MEDIA_RESOURCE_TYPE,
} from './media.const';
import type {
  CloudinarySignResponse,
  CloudinaryUploadResult,
  MediaItem,
  MediaListResponse,
  RegisterMediaInput,
} from './media.types';
import { fileToDataUrl, parseCloudinaryCloudName } from './media.utils';

export { CMS_MEDIA_PATH, CMS_MEDIA_SIGN_PATH, CMS_MEDIA_UPLOAD_PATH, CMS_MEDIA_CONFIG_PATH };

let inflightMedia: { token: string; promise: Promise<{ items: MediaItem[]; source: string | null }> } | null =
  null;

export const fetchMediaRequest = async (
  token: string,
): Promise<{ items: MediaItem[]; source: string | null }> => {
  if (!token) return { items: [], source: null };
  if (inflightMedia && inflightMedia.token === token) {
    return inflightMedia.promise;
  }
  const promise = (async () => {
    const response = await useApi(
      `${INK_API_URL}${CMS_MEDIA_PATH}`,
      { headers: authHeaders(token) },
      { message: 'Failed to load media' },
    );
    if (!response.ok) return { items: [], source: null };
    const data = (await response.json()) as MediaListResponse;
    return { items: data.items ?? [], source: data.source ?? null };
  })().finally(() => {
    if (inflightMedia?.promise === promise) {
      inflightMedia = null;
    }
  });
  inflightMedia = { token, promise };
  return promise;
};

export const fetchSign = async (
  token: string,
): Promise<CloudinarySignResponse | null> => {
  if (!token) return null;
  const response = await useApi(
    `${INK_API_URL}${CMS_MEDIA_SIGN_PATH}`,
    { headers: authHeaders(token) },
    { message: 'Failed to sign media upload' },
  );
  if (!response.ok) return null;
  return (await response.json()) as CloudinarySignResponse;
};

export const uploadToCloudinary = async (
  file: File,
  sign: CloudinarySignResponse,
): Promise<CloudinaryUploadResult | null> => {
  if (!sign.cloudName) return null;
  const endpoint = `${CLOUDINARY_API_BASE}/${sign.cloudName}${CLOUDINARY_UPLOAD_PATH}`;
  const form = new FormData();
  form.append(CLOUDINARY_FORM_KEYS.FILE, file);

  if (sign.uploadPreset) {
    form.append(CLOUDINARY_FORM_KEYS.UPLOAD_PRESET, sign.uploadPreset);
  }

  if (sign.apiKey && sign.signature != null && sign.timestamp != null) {
    form.append(CLOUDINARY_FORM_KEYS.API_KEY, sign.apiKey);
    form.append(CLOUDINARY_FORM_KEYS.TIMESTAMP, String(sign.timestamp));
    form.append(CLOUDINARY_FORM_KEYS.SIGNATURE, sign.signature);
  }

  const folder = sign.folder || DEFAULT_MEDIA_FOLDER;
  if (folder) {
    form.append(CLOUDINARY_FORM_KEYS.FOLDER, folder);
  }

  const response = await useApi(
    endpoint,
    { method: HTTP_METHOD_POST, body: form },
    { mode: 'modal', message: 'Cloudinary upload failed' },
  );
  if (!response.ok) return null;
  return (await response.json()) as CloudinaryUploadResult;
};

export const registerMedia = async (
  token: string,
  input: RegisterMediaInput,
): Promise<MediaItem | null> => {
  if (!token) return null;
  const response = await useApi(
    `${INK_API_URL}${CMS_MEDIA_PATH}`,
    {
      method: HTTP_METHOD_POST,
      headers: {
        ...authHeaders(token),
        'Content-Type': 'application/json',
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
  if (!token) return null;
  const dataUrl = await fileToDataUrl(file);
  const response = await useApi(
    `${INK_API_URL}${CMS_MEDIA_UPLOAD_PATH}`,
    {
      method: HTTP_METHOD_POST,
      headers: {
        ...authHeaders(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dataUrl,
        fileName: file.name,
      }),
    },
    { mode: 'modal', message: 'Media upload failed' },
  );
  if (!response.ok) return null;
  const data = (await response.json()) as { item?: MediaItem };
  return data.item ?? null;
};

export const fetchMediaConfig = async (
  token: string,
): Promise<{ cloudName: string; configured: boolean; hasKey: boolean; hasSecret: boolean } | null> => {
  if (!token) return null;
  const response = await useApi(
    `${INK_API_URL}${CMS_MEDIA_CONFIG_PATH}`,
    { headers: authHeaders(token) },
    { message: 'Failed to load media config' },
  );
  if (!response.ok) return null;
  return (await response.json()) as {
    cloudName: string;
    configured: boolean;
    hasKey: boolean;
    hasSecret: boolean;
  };
};

export const saveMediaCloudName = async (
  token: string,
  cloudName: string,
): Promise<boolean> => {
  if (!token) return false;
  const response = await useApi(
    `${INK_API_URL}${CMS_MEDIA_CONFIG_PATH}`,
    {
      method: HTTP_METHOD_PUT,
      headers: {
        ...authHeaders(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cloudName: parseCloudinaryCloudName(cloudName) }),
    },
    { mode: 'modal', message: 'Failed to save Cloudinary cloud name' },
  );
  return response.ok;
};

export const uploadAndRegisterMedia = async (
  token: string,
  file: File,
): Promise<MediaItem | null> => {
  return uploadViaServer(token, file);
};

export const mediaAltFromPublicId = (publicId: string): string =>
  publicId || EMPTY_STRING;
