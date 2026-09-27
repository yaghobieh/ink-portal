import type { PLAN_COMPARE_ROW_KEYS, COMPARE_YES, COMPARE_NO } from './PlanCompareTable.const';

export type PlanCompareRowKey = (typeof PLAN_COMPARE_ROW_KEYS)[number];

export type PlanCompareCell = typeof COMPARE_YES | typeof COMPARE_NO | string;

export type PlanCompareMatrixRow = {
  id: PlanCompareRowKey;
  free: PlanCompareCell;
  pro: PlanCompareCell;
  ai: PlanCompareCell;
};

export type PlanCompareTableRow = {
  id: PlanCompareRowKey;
  feature: string;
  free: PlanCompareCell;
  pro: PlanCompareCell;
  ai: PlanCompareCell;
};

export type PlanCompareTableProps = {
  className?: string;
};
