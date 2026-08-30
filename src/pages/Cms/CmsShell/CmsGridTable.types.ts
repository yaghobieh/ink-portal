import type { ColumnDefinition, RowData } from '@forgedevstack/grid-table';
import type { ReactNode } from 'react';

export type CmsGridTableProps<T extends RowData> = {
  data: T[];
  columns: ColumnDefinition<T>[];
  onRowClick?: (row: T) => void;
  emptyContent?: ReactNode;
  loading?: boolean;
};
