import { useQuery } from '@tanstack/react-query';
import {
  getProductActivationUser,
  getDetailProductActivationUser,
} from '@/service/product-activation-user';

export type GetProductQueryParams = {
  token: string;
  page: number;
  limit: number;
  term?: string;
  status?: string;
  is_not_paginate?: string;
};

const QUERY_KEY = ['PRODUCT_ACTIVATION_USER'];

// ** GET

const fetchProductActivation = async (
  params: GetProductQueryParams
): Promise<any> => {
  const data = await getProductActivationUser({
    token: params.token,
    page: params.page,
    limit: params.limit,
    status: params.status,
    term: params.is_not_paginate,
    is_not_paginate: params.is_not_paginate,
  });
  return data;
};

export const useGetProductActivation = (params: GetProductQueryParams) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchProductActivation(params),
    keepPreviousData: true,
  });
};

// ** GET Detail

const fetchProductActivationDetail = async (params: {
  token: string;
  id: string;
}): Promise<any> => {
  const data = await getDetailProductActivationUser({
    token: params.token,
    id: params.id,
  });
  return data;
};

export const useGetProductActivationDetail = (params: {
  token: string;
  id: string;
}) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchProductActivationDetail(params),
    keepPreviousData: true,
  });
};
