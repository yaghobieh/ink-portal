import { createNucleus } from '@forgedevstack/synapse';
import {
  fetchContentByCollectionRequest,
  fetchContentRequest,
  fetchPagesRequest,
  saveContentRequest,
  updatePageRequest,
} from './content.api';
import type { ContentState } from './content.types';

export const contentNucleus = createNucleus<ContentState>((set, get) => ({
  items: [],
  pages: [],
  loading: false,
  saving: false,
  error: false,

  reset: () => {
    set({ items: [], pages: [], loading: false, saving: false, error: false });
  },

  fetchContent: async (token: string) => {
    set({ loading: true, error: false });
    try {
      const items = await fetchContentRequest(token);
      set({ items, loading: false, error: false });
      return true;
    } catch {
      set({ items: [], loading: false, error: true });
      return false;
    }
  },

  fetchContentByCollection: async (token: string, collection: string) => {
    set({ loading: true, error: false });
    try {
      const items = await fetchContentByCollectionRequest(token, collection);
      set({ items, loading: false, error: false });
      return true;
    } catch {
      set({ items: [], loading: false, error: true });
      return false;
    }
  },

  fetchPages: async (token: string) => {
    set({ loading: true, error: false });
    try {
      const pages = await fetchPagesRequest(token);
      set({ pages, loading: false, error: false });
      return true;
    } catch {
      set({ pages: [], loading: false, error: true });
      return false;
    }
  },

  saveContent: async (token, input) => {
    set({ saving: true, error: false });
    try {
      const item = await saveContentRequest(token, input);
      if (!item) {
        set({ saving: false, error: true });
        return false;
      }
      const items = get().items;
      const next = items.some((entry) => entry.id === item.id)
        ? items.map((entry) => (entry.id === item.id ? item : entry))
        : [item, ...items];
      set({ items: next, saving: false, error: false });
      return true;
    } catch {
      set({ saving: false, error: true });
      return false;
    }
  },

  updatePage: async (token, input) => {
    set({ saving: true, error: false });
    try {
      const page = await updatePageRequest(token, input);
      if (!page) {
        set({ saving: false, error: true });
        return false;
      }
      const pages = get().pages.map((entry) => (entry.id === page.id ? page : entry));
      set({ pages, saving: false, error: false });
      return true;
    } catch {
      set({ saving: false, error: true });
      return false;
    }
  },
}));
