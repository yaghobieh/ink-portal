import { createElement, type ReactNode } from 'react';
import type { PlanCompareTableRow } from './PlanCompareTable.types';

export const planCellDiffers = (row: PlanCompareTableRow): boolean =>
  row.free !== row.pro || row.pro !== row.ai || row.free !== row.ai;

export const renderPlanCell = (value: string, isDiff: boolean): ReactNode =>
  createElement(
    'span',
    {
      className: isDiff
        ? 'ink-plan-compare__cell ink-plan-compare__cell--diff'
        : 'ink-plan-compare__cell',
    },
    value,
  );
