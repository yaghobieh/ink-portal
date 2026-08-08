import type { FC } from 'react';
import { Flex, Typography } from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import type { ColumnDefinition } from '@forgedevstack/grid-table';
import { useI18n } from '@i18n/index';
import {
  PLAN_COMPARE_COLUMN_IDS,
  PLAN_COMPARE_MATRIX,
} from './PlanCompareTable.const';
import type { PlanCompareTableProps, PlanCompareTableRow } from './PlanCompareTable.types';

export const PlanCompareTable: FC<PlanCompareTableProps> = (props) => {
  const { className } = props;
  const { t } = useI18n();

  const data: PlanCompareTableRow[] = PLAN_COMPARE_MATRIX.map((row) => {
    if (row.id === 'compareLicensePath') {
      return {
        id: row.id,
        feature: t.pricing[row.id],
        free: t.pricing.compareFreePath,
        pro: t.pricing.compareProPath,
        ai: t.pricing.compareAiPath,
      };
    }
    if (row.id === 'compareNpmAccess') {
      return {
        id: row.id,
        feature: t.pricing[row.id],
        free: t.pricing.compareFreeNpm,
        pro: t.pricing.compareProNpm,
        ai: t.pricing.compareAiNpm,
      };
    }
    return {
      id: row.id,
      feature: t.pricing[row.id],
      free: row.free,
      pro: row.pro,
      ai: row.ai,
    };
  });

  const columns: ColumnDefinition<PlanCompareTableRow>[] = [
    {
      id: PLAN_COMPARE_COLUMN_IDS.FEATURE,
      accessor: 'feature',
      header: t.pricing.compareColFeature,
      sortable: true,
    },
    {
      id: PLAN_COMPARE_COLUMN_IDS.FREE,
      accessor: 'free',
      header: t.pricing.freeTitle,
      sortable: false,
    },
    {
      id: PLAN_COMPARE_COLUMN_IDS.PRO,
      accessor: 'pro',
      header: t.pricing.proTitle,
      sortable: false,
    },
    {
      id: PLAN_COMPARE_COLUMN_IDS.AI,
      accessor: 'ai',
      header: t.pricing.aiTitle,
      sortable: false,
    },
  ];

  return (
    <Flex direction="column" gap={3} className={className}>
      <div>
        <Typography variant="h4" className="font-semibold mb-1">
          {t.pricing.compareTitle}
        </Typography>
        <Typography variant="body2" className="ink-text-muted mb-0">
          {t.pricing.compareSubtitle}
        </Typography>
      </div>
      <GridTable
        data={data}
        columns={columns}
        showPagination={false}
        showFilter={false}
        tableEffects={{ hover: true, sort: true, row: true }}
      />
    </Flex>
  );
};
