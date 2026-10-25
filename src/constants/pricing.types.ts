export type PlanId = 'free' | 'pro';

export interface PlanPriceInfo {
  amount: number;
  period: 'forever' | 'once' | 'month';
  label: string;
}
