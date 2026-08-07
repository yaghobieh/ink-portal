import { LOGIN_PERIOD_SEPARATOR } from './Login.const';

export const formatUsagePeriod = (periodStart: string, periodEnd: string): string => {
  const start = new Date(periodStart);
  const end = new Date(periodEnd);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return `${periodStart}${LOGIN_PERIOD_SEPARATOR}${periodEnd}`;
  }
  return `${start.toLocaleDateString()}${LOGIN_PERIOD_SEPARATOR}${end.toLocaleDateString()}`;
};

export const formatTokenUsage = (tokensUsed: number, tokensLimit: number): string =>
  `${tokensUsed} / ${tokensLimit}`;
