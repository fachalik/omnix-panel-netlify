import { message } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteMProduct,
  getMProduct,
  postMProduct,
  updateMProduct,
} from '@/service/m-product';

const QUERY_KEY = ['M_PRODUCT'];

// ** GET

const fetchMProduct = async (params: {
  token: any;
  page: number;
  limit: number;
  status?: number;
  ProductType: string;
  is_not_paginate?: string;
  term?: string;
}): Promise<any> => {
  const data = await getMProduct({
    limit: params.limit,
    page: params.page,
    ProductType: params.ProductType,
    token: params.token,
    is_not_paginate: params.is_not_paginate,
  });
  return data;
  return data;
};

export const useGetMProduct = (params: {
  token: any;
  page: number;
  limit: number;
  status?: number;
  ProductType: string;
  is_not_paginate?: string;
  term?: string;
}) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchMProduct(params),
    keepPreviousData: true,
  });
};

// ** CREATE

const createMProduct = async (val: any) => {
  const { data } = await postMProduct(val);
  return data;
};

export const usecreateMProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(createMProduct, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
      message.success('Product has been added');
    },
    onError: (error) => {
      console.error(error);
      message.error('failed created Product');
    },
  });
};

// ** DELETE
const destroyMProduct = async (id: number) => {
  const { data } = await deleteMProduct(id);
  return data;
};

export const usedestroyMProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(destroyMProduct, {
    onSuccess: async () => {
      console.log(QUERY_KEY);
      await queryClient.invalidateQueries(QUERY_KEY);
      message.success('Product has been deleted');
    },
    onError: (error) => {
      console.error(error);
      message.error('failed delete product');
    },
  });
};

// ** UPDATE
const patchMProduct = async ({ val, id }: any) => {
  const { data } = await updateMProduct({ val, id });
  return data;
};

export const usepatchMProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(patchMProduct, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
      message.success('Product successfully updated');
    },
    onError: (error) => {
      console.error(error);
      message.error('failed updated Product');
    },
  });
};
