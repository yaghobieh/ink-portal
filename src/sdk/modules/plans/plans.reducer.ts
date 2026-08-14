import { createNucleus } from '@forgedevstack/synapse';
import { fetchPlansRequest, switchPlanRequest } from './plans.api';
import type { PlansState } from './plans.types';

export const plansNucleus = createNucleus<PlansState>((set) => ({
  plans: [],
  activeUserPlan: null,
  loading: false,
  switching: false,
  error: false,
  fetchPlans: async (token: string) => {
    set({ loading: true, error: false });
    try {
      const result = await fetchPlansRequest(token);
      set({
        plans: result.plans,
        activeUserPlan: result.activeUserPlan,
        loading: false,
        error: false,
      });
      return true;
    } catch {
      set({ loading: false, error: true });
      return false;
    }
  },
  switchPlan: async (token: string, plan: string) => {
    set({ switching: true, error: false });
    try {
      const activeUserPlan = await switchPlanRequest(token, plan);
      if (!activeUserPlan) {
        set({ switching: false, error: true });
        return false;
      }
      set({ activeUserPlan, switching: false, error: false });
      return true;
    } catch {
      set({ switching: false, error: true });
      return false;
    }
  },
  reset: () =>
    set({
      plans: [],
      activeUserPlan: null,
      loading: false,
      switching: false,
      error: false,
    }),
}));
