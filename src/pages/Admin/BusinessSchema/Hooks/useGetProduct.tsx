import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getProductAdmin,
  postProductAdmin,
  updateProductAdmin,
  deleteProductAdmin,
} from '@/service/product';
import { message } from 'antd';

export type GetPackageQueryParams = {
  token: string;
  limit: number;
  page: number;
  query_key: string;
  typeDetails: string;
  productType: string;
  term?: string;
  status?: string;
  productCategory?: string;
  is_not_paginate?: string;
};

// ** GET
const fetchProductAdmin = async (
  params: GetPackageQueryParams
): Promise<any> => {
  const data = await getProductAdmin({
    token: params.token,
    page: params.page,
    limit: params.limit,
    typeDetails: params.typeDetails,
    productType: params.productType,
    productCategory: params.productCategory,
    status: params.status,
    term: params.term,
    is_not_paginate: params.is_not_paginate,
  });
  return data;
};

export const useGetProductAdmin = (params: GetPackageQueryParams) => {
  return useQuery<any, Error>({
    queryKey: [[params.query_key], params],
    queryFn: () => fetchProductAdmin(params),
    keepPreviousData: true,
  });
};

// ** CREATE

const createProductAdmin = async (val: any) => {
  const { data } = await postProductAdmin(val);
  return data;
};

export const usecreateProductAdmin = ({ query_key }: { query_key: string }) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(createProductAdmin, {
    onSuccess: async () => {
      console.log('query_key', [query_key]);
      await queryClient.invalidateQueries([query_key]);
      message.success('Product has been added');
    },
    onError: (error) => {
      console.error(error);
      message.error('failed created Product');
    },
  });
};

// ** UPDATE
const patchProductAdmin = async ({ val, id }: any) => {
  const { data } = await updateProductAdmin({
    val,
    id,
  });
  return data;
};

export const usepatchProductAdmin = ({ query_key }: { query_key: string }) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, any>(patchProductAdmin, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([query_key]);
      message.success('Product Berhasil diedit');
    },
    onError: async (error) => {
      await console.error(error);
      message.error(error.message);
    },
  });
};

// ** DELETE
const destroyGroup = async ({ id }: { id: number }) => {
  const { data } = await deleteProductAdmin(id);
  return data;
};

export const usedestroyGroup = ({ query_key }: { query_key: string }) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(destroyGroup, {
    onSuccess: async () => {
      console.log([query_key]);
      await queryClient.invalidateQueries([query_key]);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
