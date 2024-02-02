import { message } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteProductAdmin,
  getProductAdmin,
  postProductAdmin,
  updateProductAdmin,
  getDetailProductAdmin,
  updateProductAdminAddon,
} from '@/service/product';

import { useSearchParams } from 'react-router-dom';

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
  typeDetails?: string;
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
    typeDetails: params.typeDetails,
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
  typeDetails?: string;
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
  id_reseller?: string;
  id_user?: string;
}): Promise<any> => {
  const data = await getDetailProductAdmin({
    token: params.token,
    id: params.id,
    id_reseller: params.id_reseller,
    id_user: params.id_user,
  });
  return data;
};

export const useGetDetailProduct = (params: {
  token: any;
  id: string;
  key: string;
  id_reseller?: string;
  id_user?: string;
}) => {
  return useQuery<any, Error>({
    queryKey: [params.key, params],
    queryFn: () => fetchProductGetDetail(params),
    keepPreviousData: true,
    enabled: params.id ? true : false,
    cacheTime: 0,
  });
};

// ** CREATE

const createProduct = async (val: any) => {
  const { data } = await postProductAdmin(val);
  return data;
};

export const usecreateProduct = () => {
  const [searchParams, setSearchParams]: any = useSearchParams();
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(createProduct, {
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
const destroyProduct = async (id: number) => {
  const { data } = await deleteProductAdmin(id);
  return data;
};

export const usedestroyProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(destroyProduct, {
    onSuccess: async () => {
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
const patchProduct = async ({ val, id, id_user, id_reseller }: any) => {
  const { data } = await updateProductAdmin({ val, id, id_user, id_reseller });
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

// ** UPDATE
const patchProductAddOn = async ({ val }: any) => {
  const { data } = await updateProductAdminAddon({ val });
  return data;
};

export const usepatchProductAddOn = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(patchProductAddOn, {
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
