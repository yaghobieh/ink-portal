import { GridTable } from '@forgedevstack/grid-table';
import type { RowData } from '@forgedevstack/grid-table';
import type { CmsGridTableProps } from './CmsGridTable.types';

export const CmsGridTable = <T extends RowData>(props: CmsGridTableProps<T>) => {
  const { data, columns, onRowClick, emptyContent, loading } = props;
  return (
    <div className="ink-cms-grid">
      <GridTable
        data={data}
        columns={columns}
        stickyHeader
        showPagination={false}
        showFilter={false}
        loading={loading}
        emptyContent={emptyContent}
        onRowClick={onRowClick ? (row) => onRowClick(row) : undefined}
      />
    </div>
  );
};
