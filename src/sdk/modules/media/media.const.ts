export const CMS_MEDIA_PATH = '/api/cms/media';
export const CMS_MEDIA_SIGN_PATH = '/api/cms/media/sign';
export const CMS_MEDIA_UPLOAD_PATH = '/api/cms/media/upload';
export const HTTP_METHOD_POST = 'POST';
export const CONTENT_TYPE_JSON = 'application/json';
export const MEDIA_UPLOAD_DATA_URL_KEY = 'dataUrl';
export const MEDIA_UPLOAD_FILE_NAME_KEY = 'fileName';

export const CLOUDINARY_UPLOAD_PATH = '/auto/upload';
export const CLOUDINARY_API_BASE = 'https://api.cloudinary.com/v1_1';

export const CLOUDINARY_FORM_KEYS = {
  FILE: 'file',
  API_KEY: 'api_key',
  TIMESTAMP: 'timestamp',
  SIGNATURE: 'signature',
  FOLDER: 'folder',
  UPLOAD_PRESET: 'upload_preset',
} as const;

export const DEFAULT_MEDIA_RESOURCE_TYPE = 'image';
export const DEFAULT_MEDIA_FOLDER = 'ink-cms';
