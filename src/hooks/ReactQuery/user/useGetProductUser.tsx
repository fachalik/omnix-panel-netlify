import { message } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteProductUser,
  getProductUser,
  postProductUser,
  updateProductUser,
  getDetailProductUser,
  updateProductUserAddon,
  getProductUserWithAddOn,
} from '@/service/product-user';

import { useSearchParams } from 'react-router-dom';

const QUERY_KEY = ['PRODUCT_DETAILS_USER'];

// ** GET

const fetchProductUser = async (params: {
  token: any;
  page: number;
  limit: number;
  akses?: string;
  id_user: string;
  productType: string;
  productCategory?: string;
  status?: string;
  term?: string;
  is_not_paginate?: string;
}): Promise<any> => {
  const data = await getProductUser({
    token: params.token,
    page: params.page,
    limit: params.limit,
    productCategory: params.productCategory,
    productType: params.productType,
    term: params.term,
    status: params.status,
    is_not_paginate: params.is_not_paginate,
    akses: params.akses,
    id_user: params.id_user,
  });
  return data;
};

export const useGetProductUser = (params: {
  token: any;
  page: number;
  limit: number;
  akses?: string;
  id_user: string;
  productType: string;
  productCategory?: string;
  status?: string;
  term?: string;
  is_not_paginate?: string;
}) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchProductUser(params),
    keepPreviousData: true,
  });
};

// ** GET With Addon

const fetchProductUserWithAddon = async (params: {
  token: any;
  page: number;
  limit: number;
  akses?: string;
  id_user: string;
  productType: string;
  productCategory?: string;
  status?: string;
  term?: string;
  is_not_paginate?: string;
}): Promise<any> => {
  const data = await getProductUserWithAddOn({
    token: params.token,
    page: params.page,
    limit: params.limit,
    productCategory: params.productCategory,
    productType: params.productType,
    term: params.term,
    status: params.status,
    is_not_paginate: params.is_not_paginate,
    akses: params.akses,
    id_user: params.id_user,
  });
  return data;
};

export const useGetProductUserWithAddon = (params: {
  token: any;
  page: number;
  limit: number;
  akses?: string;
  id_user: string;
  productType: string;
  productCategory?: string;
  status?: string;
  term?: string;
  is_not_paginate?: string;
}) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchProductUserWithAddon(params),
    keepPreviousData: true,
  });
};

// ** GET Detail

const fetchProductGetDetailUser = async (params: {
  token: any;
  id: string;
  id_reseller?: string;
  id_user?: string;
}): Promise<any> => {
  const data = await getDetailProductUser({
    token: params.token,
    id: params.id,
    id_reseller: params.id_reseller,
    id_user: params.id_user,
  });
  return data;
};

export const useGetDetailProductUser = (params: {
  token: any;
  id: string;
  key: string;
  id_reseller?: string;
  id_user?: string;
}) => {
  return useQuery<any, Error>({
    queryKey: [params.key, params],
    queryFn: () => fetchProductGetDetailUser(params),
    keepPreviousData: true,
    enabled: params.id ? true : false,
    // cacheTime: 0,
  });
};

// ** CREATE

const createProductUser = async (val: any) => {
  const { data } = await postProductUser(val);
  return data;
};

export const usecreateProductUser = () => {
  const [searchParams, setSearchParams]: any = useSearchParams();
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(createProductUser, {
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
const destroyProductUser = async (id: number) => {
  const { data } = await deleteProductUser(id);
  return data;
};

export const usedestroyProductUser = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(destroyProductUser, {
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
const patchProductUser = async ({ val, id, id_user, id_reseller }: any) => {
  const { data } = await updateProductUser({ val, id, id_user, id_reseller });
  return data;
};

export const usepatchProductUser = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(patchProductUser, {
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
const patchProductAddOnUser = async ({ val }: any) => {
  const { data } = await updateProductUserAddon({
    val,
  });
  return data;
};

export const usepatchProductAddOnUser = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(patchProductAddOnUser, {
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
