import React from 'react';
import { Table, Pagination } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { PaginationConfig } from 'antd/lib/pagination';

export interface ITablePagination {
  columns: ColumnType<any>[];
  data: any;
  current?: number;
  setPage?: (page: number) => any;
  pageSize?: number;
  total?: number;
  isLoading?: boolean;
  isPaginate: boolean;
  style?: any;
}

export const TablePagination: React.FC<ITablePagination> = ({
  columns,
  data,
  current,
  pageSize,
  total,
  setPage,
  isLoading,
  isPaginate = false,
  style,
}: ITablePagination) => {
  const paginationConfig: PaginationConfig = {
    current,
    pageSize,
    total,
    onChange: (page) => setPage?.(page),
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        loading={isLoading}
        style={style}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        {isPaginate && <Pagination {...paginationConfig} />}
      </div>
    </div>
  );
};
