export type PlanId = 'free' | 'pro' | 'ai';

export interface PlanPriceInfo {
  amount: number;
  period: 'forever' | 'once' | 'month';
  label: string;
}
