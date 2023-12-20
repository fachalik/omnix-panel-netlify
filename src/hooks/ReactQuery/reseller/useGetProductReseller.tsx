import { message } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteProductReseller,
  getProductReseller,
  postProductReseller,
  updateProductReseller,
  getDetailProductReseller,
  updateProductResellerAddon,
} from '@/service/product-reseller';

import { useSearchParams } from 'react-router-dom';

const QUERY_KEY = ['PRODUCT_DETAILS_RESELLER'];

// ** GET

const fetchProductReseller = async (params: {
  token: any;
  page: number;
  limit: number;
  productType: string;
  productCategory: string;
  status?: string;
  term?: string;
  is_not_paginate?: string;
  akses: string;
}): Promise<any> => {
  const data = await getProductReseller({
    token: params.token,
    page: params.page,
    limit: params.limit,
    productCategory: params.productCategory,
    productType: params.productType,
    term: params.term,
    status: params.status,
    is_not_paginate: params.is_not_paginate,
    akses: params.akses,
  });
  return data;
};

export const useGetProductReseller = (params: {
  token: any;
  page: number;
  limit: number;
  productType: string;
  productCategory: string;
  status?: string;
  term?: string;
  is_not_paginate?: string;
  akses: string;
}) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchProductReseller(params),
    keepPreviousData: true,
  });
};

// ** GET Detail

const fetchProductGetDetailReseller = async (params: {
  token: any;
  id: string;
  id_reseller?: string;
  id_user?: string;
}): Promise<any> => {
  const data = await getDetailProductReseller({
    token: params.token,
    id: params.id,
    id_reseller: params.id_reseller,
    id_user: params.id_user,
  });
  return data;
};

export const useGetDetailProductReseller = (params: {
  token: any;
  id: string;
  key: string;
  id_reseller?: string;
  id_user?: string;
}) => {
  return useQuery<any, Error>({
    queryKey: [params.key, params],
    queryFn: () => fetchProductGetDetailReseller(params),
    keepPreviousData: true,
    enabled: params.id ? true : false,
    cacheTime: 0,
  });
};

// ** CREATE

const createProductReseller = async (val: any) => {
  const { data } = await postProductReseller(val);
  return data;
};

export const usecreateProductReseller = () => {
  const [searchParams, setSearchParams]: any = useSearchParams();
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(createProductReseller, {
    onSuccess: async (data: any) => {
      await queryClient.invalidateQueries(QUERY_KEY);
      await message.success('Product has been added');
      await setSearchParams({
        ...Object.fromEntries(searchParams),
        type: data?.productType,
        product: data?.productCategory,
        name: data?.productName,
        id: data._id,
      });
      // return data;
    },
    onError: (error) => {
      console.error(error);
      message.error('failed created Product');
    },
  });
};

// ** DELETE
const destroyProductReseller = async (id: number) => {
  const { data } = await deleteProductReseller(id);
  return data;
};

export const usedestroyProductReseller = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(destroyProductReseller, {
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
const patchProductReseller = async ({ val, id, id_user, id_reseller }: any) => {
  const { data } = await updateProductReseller({
    val,
    id,
    id_user,
    id_reseller,
  });
  return data;
};

export const usepatchProductReseller = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(patchProductReseller, {
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

// ** UPDATE
const patchProductAddOnReseller = async ({
  val,
  id,
  id_reseller,
  id_user,
}: any) => {
  const { data } = await updateProductResellerAddon({
    val,
    id,
    id_reseller,
    id_user,
  });
  return data;
};

export const usepatchProductAddOnReseller = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(patchProductAddOnReseller, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
      message.success('Product Addon successfully updated');
    },
    onError: (error) => {
      console.error(error);
      message.error('failed updated Product Addon');
    },
  });
};
