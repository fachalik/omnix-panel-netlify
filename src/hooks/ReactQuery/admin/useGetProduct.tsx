import { message } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteProductAdmin,
  getProductAdmin,
  postProductAdmin,
  updateProductAdmin,
  getDetailProductAdmin,
} from '@/service/product';

const QUERY_KEY = ['PRODUCT_DETAILS'];

// ** GET

const fetchProduct = async (params: {
  token: any;
  page: number;
  limit: number;
  productType: string;
  productCategory: string;
  status?: string;
  term?: string;
  is_not_paginate?: string;
}): Promise<any> => {
  const data = await getProductAdmin({
    token: params.token,
    page: params.page,
    limit: params.limit,
    productCategory: params.productCategory,
    productType: params.productType,
    term: params.term,
    status: params.status,
    is_not_paginate: params.is_not_paginate,
  });
  return data;
};

export const useGetProduct = (params: {
  token: any;
  page: number;
  limit: number;
  productType: string;
  productCategory: string;
  status?: string;
  term?: string;
  is_not_paginate?: string;
}) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchProduct(params),
    keepPreviousData: true,
  });
};

// ** GET Detail

const fetchProductGetDetail = async (params: {
  token: any;
  id: string;
}): Promise<any> => {
  const data = await getDetailProductAdmin({
    token: params.token,
    id: params.id,
  });
  return data;
};

export const useGetDetailProduct = (params: { token: any; id: string }) => {
  return useQuery<any, Error>({
    queryKey: ['DETAIL_PRODUCT_DETAILS', params],
    queryFn: () => fetchProductGetDetail(params),
    keepPreviousData: true,
  });
};

// ** CREATE

const createProduct = async (val: any) => {
  const { data } = await postProductAdmin(val);
  return data;
};

export const usecreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(createProduct, {
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
const destroyProduct = async (id: number) => {
  const { data } = await deleteProductAdmin(id);
  return data;
};

export const usedestroyProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(destroyProduct, {
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
const patchProduct = async ({ val, id }: any) => {
  const { data } = await updateProductAdmin({ val, id });
  return data;
};

export const usepatchProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(patchProduct, {
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
