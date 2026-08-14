import type { PlanCompareCell, PlanCompareRowKey } from './PlanCompareTable.const';

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
