export type PlanPrice = {
  amount: number;
  period: string;
  label: string;
};

export type CmsPlan = {
  id: string;
  title: string;
  portalTier: string;
  aiMode: string;
  monthlyTokenLimit: number;
  sitesLimit?: number;
  licenseFeatures: string[];
  price: PlanPrice;
  status: string;
};

export type PlansState = {
  plans: CmsPlan[];
  activeUserPlan: string | null;
  loading: boolean;
  switching: boolean;
  error: boolean;
  fetchPlans: (token: string) => Promise<boolean>;
  switchPlan: (token: string, plan: string) => Promise<boolean>;
  reset: () => void;
};
