import { createNucleus } from '@forgedevstack/synapse';
import { fetchDashboardRequest } from './cms.api';
import type { CmsState } from './cms.types';

export const cmsNucleus = createNucleus<CmsState>((set) => ({
  dashboard: null,
  analytics: null,
  loading: false,
  error: false,

  reset: () => {
    set({ dashboard: null, analytics: null, loading: false, error: false });
  },

  fetchDashboard: async (token: string) => {
    set({ loading: true, error: false });
    try {
      const dashboard = await fetchDashboardRequest(token);
      if (!dashboard) {
        set({ dashboard: null, analytics: null, loading: false, error: true });
        return false;
      }
      set({
        dashboard,
        analytics: dashboard.analytics ?? null,
        loading: false,
        error: false,
      });
      return true;
    } catch {
      set({ dashboard: null, analytics: null, loading: false, error: true });
      return false;
    }
  },
}));
