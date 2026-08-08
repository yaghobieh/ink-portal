import { createNucleus } from '@forgedevstack/synapse';
import { fetchMediaRequest, uploadAndRegisterMedia } from './media.api';
import type { MediaState } from './media.types';

export const mediaNucleus = createNucleus<MediaState>((set, get) => ({
  items: [],
  source: null,
  loading: false,
  uploading: false,
  error: false,
  uploadError: false,

  reset: () => {
    set({
      items: [],
      source: null,
      loading: false,
      uploading: false,
      error: false,
      uploadError: false,
    });
  },

  fetchMedia: async (token: string) => {
    set({ loading: true, error: false });
    try {
      const result = await fetchMediaRequest(token);
      set({
        items: result.items,
        source: result.source,
        loading: false,
        error: false,
      });
      return true;
    } catch {
      set({ items: [], source: null, loading: false, error: true });
      return false;
    }
  },

  uploadMedia: async (token: string, file: File) => {
    set({ uploading: true, uploadError: false });
    try {
      const item = await uploadAndRegisterMedia(token, file);
      if (!item) {
        set({ uploading: false, uploadError: true });
        return null;
      }
      const current = get().items;
      set({
        items: [item, ...current.filter((entry) => entry.publicId !== item.publicId)],
        uploading: false,
        uploadError: false,
      });
      return item;
    } catch {
      set({ uploading: false, uploadError: true });
      return null;
    }
  },
}));
