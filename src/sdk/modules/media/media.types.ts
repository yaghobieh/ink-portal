export type MediaItem = {
  id: string;
  publicId: string;
  url: string;
  secureUrl: string;
  resourceType: string;
  format: string | null;
  bytes: number;
  width: number | null;
  height: number | null;
  folder: string | null;
  createdAt: string;
};

export type MediaListResponse = {
  items?: MediaItem[];
  source?: string;
};

export type CloudinarySignResponse = {
  cloudName: string;
  apiKey?: string;
  timestamp?: number;
  folder?: string;
  signature?: string;
  uploadPreset?: string;
};

export type CloudinaryUploadResult = {
  public_id: string;
  url?: string;
  secure_url: string;
  resource_type?: string;
  format?: string;
  bytes?: number;
  width?: number;
  height?: number;
};

export type RegisterMediaInput = {
  publicId: string;
  url?: string;
  secureUrl: string;
  resourceType?: string;
  format?: string | null;
  bytes?: number;
  width?: number | null;
  height?: number | null;
  folder?: string | null;
};

export type MediaState = {
  items: MediaItem[];
  source: string | null;
  loading: boolean;
  uploading: boolean;
  error: boolean;
  uploadError: boolean;
  fetchMedia: (token: string) => Promise<boolean>;
  uploadMedia: (token: string, file: File) => Promise<MediaItem | null>;
  reset: () => void;
};
