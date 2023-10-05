import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProduct } from '@/service/product';

export type GetProductQueryParams = {
  token: string;
  page: number;
  limit: number;
};

const QUERY_KEY = ['LIST_EXPLORE_PRODUCT'];

// ** GET

const fetchProduct = async (params: GetProductQueryParams): Promise<any> => {
  const data = await getProduct(params.token, params.page, params.limit);
  return data;
};

export const useGetProduct = (params: GetProductQueryParams) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchProduct(params),
    keepPreviousData: true,
  });
};
