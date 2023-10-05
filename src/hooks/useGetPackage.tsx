import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPackage } from '@/service/product';

export type GetPackageQueryParams = {
  token: string;
  page: number;
  limit: number;
};

const QUERY_KEY = ['LIST_EXPLORE_PACKAGE'];

// ** GET

const fetchPackage = async (params: GetPackageQueryParams): Promise<any> => {
  const data = await getPackage(params.token, params.page, params.limit);
  return data;
};

export const useGetPackage = (params: GetPackageQueryParams) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchPackage(params),
    keepPreviousData: true,
  });
};
