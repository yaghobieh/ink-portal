import { EMPTY_STRING } from '@const/index';

const CLOUDINARY_URL_PREFIX = 'CLOUDINARY_URL=';
const CLOUDINARY_URL_SCHEME = 'cloudinary://';

export const parseCloudinaryCloudName = (raw: string): string => {
  let value = raw.trim();
  if (value.toUpperCase().startsWith(CLOUDINARY_URL_PREFIX)) {
    value = value.slice(CLOUDINARY_URL_PREFIX.length).trim();
  }
  if (value.toLowerCase().startsWith(CLOUDINARY_URL_SCHEME)) {
    const at = value.lastIndexOf('@');
    if (at < 0) return EMPTY_STRING;
    return value.slice(at + 1).split('/')[0].split('?')[0].trim();
  }
  return value;
};

export const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string' && result) {
        resolve(result);
        return;
      }
      reject(new Error(EMPTY_STRING));
    };
    reader.onerror = () => {
      reject(reader.error ?? new Error(EMPTY_STRING));
    };
    reader.readAsDataURL(file);
  });
