import { INK_API_URL } from '@const/billing.const';
import { EMPTY_STRING } from '@const/index';
import { authHeaders } from '../auth/auth.api';
import {
  CLOUDINARY_API_BASE,
  CLOUDINARY_FORM_KEYS,
  CLOUDINARY_UPLOAD_PATH,
  CMS_MEDIA_PATH,
  CMS_MEDIA_SIGN_PATH,
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

export { CMS_MEDIA_PATH, CMS_MEDIA_SIGN_PATH };

export const fetchMediaRequest = async (
  token: string,
): Promise<{ items: MediaItem[]; source: string | null }> => {
  if (!INK_API_URL || !token) return { items: [], source: null };
  const response = await fetch(`${INK_API_URL}${CMS_MEDIA_PATH}`, {
    headers: authHeaders(token),
  });
  if (!response.ok) return { items: [], source: null };
  const data = (await response.json()) as MediaListResponse;
  return { items: data.items ?? [], source: data.source ?? null };
};

export const fetchSign = async (
  token: string,
): Promise<CloudinarySignResponse | null> => {
  if (!INK_API_URL || !token) return null;
  const response = await fetch(`${INK_API_URL}${CMS_MEDIA_SIGN_PATH}`, {
    headers: authHeaders(token),
  });
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

  const response = await fetch(endpoint, { method: 'POST', body: form });
  if (!response.ok) return null;
  return (await response.json()) as CloudinaryUploadResult;
};

export const registerMedia = async (
  token: string,
  input: RegisterMediaInput,
): Promise<MediaItem | null> => {
  if (!INK_API_URL || !token) return null;
  const response = await fetch(`${INK_API_URL}${CMS_MEDIA_PATH}`, {
    method: 'POST',
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
  });
  if (!response.ok) return null;
  const data = (await response.json()) as { item?: MediaItem };
  return data.item ?? null;
};

export const uploadAndRegisterMedia = async (
  token: string,
  file: File,
): Promise<MediaItem | null> => {
  const sign = await fetchSign(token);
  if (!sign) return null;
  const uploaded = await uploadToCloudinary(file, sign);
  if (!uploaded?.public_id || !uploaded.secure_url) return null;
  return registerMedia(token, {
    publicId: uploaded.public_id,
    url: uploaded.url || uploaded.secure_url,
    secureUrl: uploaded.secure_url,
    resourceType: uploaded.resource_type || DEFAULT_MEDIA_RESOURCE_TYPE,
    format: uploaded.format ?? null,
    bytes: uploaded.bytes ?? 0,
    width: uploaded.width ?? null,
    height: uploaded.height ?? null,
    folder: sign.folder || DEFAULT_MEDIA_FOLDER,
  });
};

export const mediaAltFromPublicId = (publicId: string): string =>
  publicId || EMPTY_STRING;
