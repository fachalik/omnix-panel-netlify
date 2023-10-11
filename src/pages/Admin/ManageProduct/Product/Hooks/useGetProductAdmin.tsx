import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { useNotificatonStore } from '@/store';

import {
  getProduct,
  deleteProduct,
  postProduct,
  updateProduct,
} from '@/service/adminproduct';

import { postSubProduct } from '@/service/adminsubproduct';

export type GetPackageQueryParams = {
  token: string;
  page: number;
  limit: number;
  search: string;
  sortField: string;
  sortOrder: string;
};

const QUERY_KEY = ['LIST_PRODUCT_ADMIN'];

// ** GET

const fetchProductAdmin = async (
  params: GetPackageQueryParams
): Promise<any> => {
  const data = await getProduct({
    token: params.token,
    page: params.page,
    limit: params.limit,
    search: params.search,
    sortField: params.sortField,
    sortOrder: params.sortOrder,
  });
  return data;
};

export const useGetProductAdmin = (params: GetPackageQueryParams) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchProductAdmin(params),
    keepPreviousData: true,
  });
};

// ** CREATE PRODUCT

const createProduct = async (val: any) => {
  const { data } = await postProduct(val);
  return data;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { setNotification } = useNotificatonStore((state) => state);
  return useMutation<any, Error, any>(createProduct, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
      await setNotification({
        message: 'Produk ditambahkan',
        description: 'Produk Berhasil Ditambahkan',
        type: 'success',
        hit: true,
      });
    },
    onError: (error) => {
      setNotification({
        message: 'Create produk mengalami kesalahan',
        description: error.message,
        type: 'error',
        hit: true,
      });
    },
  });
};

// ** CREATE SUB PRODUCT

const createSubProduct = async (val: any) => {
  const { data } = await postSubProduct(val);
  return data;
};

export const useCreateSubProduct = () => {
  const { setNotification } = useNotificatonStore((state) => state);
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(createSubProduct, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
      await setNotification({
        message: 'Sub Produk ditambahkan',
        description: 'Sub Produk Berhasil Ditambahkan',
        type: 'success',
        hit: true,
      });
    },
    onError: (error) => {
      setNotification({
        message: 'Create sub produk mengalami kesalahan',
        description: error.message,
        type: 'error',
        hit: true,
      });
    },
  });
};

// ** DELETE
const destroyProduct = async (id: number) => {
  const { data } = await deleteProduct(id);
  return data;
};

export const useDestroyProduct = () => {
  const queryClient = useQueryClient();
  const { setNotification } = useNotificatonStore((state) => state);
  return useMutation<any, Error, any>(destroyProduct, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
      await setNotification({
        message: 'Produk dihapus',
        description: 'Produk Berhasil Dihapus',
        type: 'success',
        hit: true,
      });
    },
    onError: (error) => {
      setNotification({
        message: 'Delete produk mengalami kesalahan',
        description: error.message,
        type: 'error',
        hit: true,
      });
    },
  });
};

// ** UPDATE
const patchProduct = async ({ val, id }: any) => {
  const { data } = await updateProduct({ val, id });
  return data;
};

export const usePatchProduct = () => {
  const queryClient = useQueryClient();
  const { setNotification } = useNotificatonStore((state) => state);
  return useMutation<any, Error, any>(patchProduct, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
      await setNotification({
        message: 'Produk diupdate',
        description: 'Produk Berhasil Diupdate',
        type: 'success',
        hit: true,
      });
    },
    onError: (error) => {
      setNotification({
        message: 'Update produk mengalami kesalahan',
        description: error.message,
        type: 'error',
        hit: true,
      });
    },
  });
};
