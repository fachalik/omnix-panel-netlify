import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getOrder } from '@/service/product';

export type GetPackageQueryParams = {
  token: string;
  page: number;
  limit: number;
};

const QUERY_KEY = ['LIST_EXPLORE_ORDER'];

// ** GET

const fetchOrder = async (params: GetPackageQueryParams): Promise<any> => {
  const data = await getOrder(params.token, params.page, params.limit);
  return data;
};

export const useGetOrder = (params: GetPackageQueryParams) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchOrder(params),
    keepPreviousData: true,
  });
};
