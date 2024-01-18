import React from 'react';
import { useGetProductActivation } from '@/hooks/ReactQuery/user/useGetProductActivation';
import { getLogin } from '@/utils/sessions';
import Loading from '../Loading';
import Error from '@/components/Error';
import { Empty, Pagination } from 'antd';
import CardItemActive from '@/components/AllCard/CardItemActive';
import { PaginationConfig } from 'antd/lib/pagination';
// import moment from 'moment';

export default function ActiveProduct() {
  const [limit, _setLimit] = React.useState<number>(10);
  const [page, setPage] = React.useState<number>(1);
  const { data, isLoading, isSuccess, isError, error }: any =
    useGetProductActivation({
      token: getLogin().token ?? '',
      limit,
      page,
    });

  const paginationConfig: PaginationConfig = {
    current: page,
    pageSize: limit,
    total: data?.total ?? 0,
    onChange: (page) => setPage?.(page),
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && isSuccess) {
    return (
      <div>
        {data?.data?.map((item: any, idx: number) => (
          <CardItemActive item={item} key={`${idx}_${item.package_name}`} />
        ))}
        {data.data.length === 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Empty />
          </div>
        )}
        <div
          style={{
            marginTop: '3em',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Pagination {...paginationConfig} />
        </div>
      </div>
    );
  }

  if (!isLoading && isError) {
    return <Error error={error} />;
  }
}
