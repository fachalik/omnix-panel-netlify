import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getProductPlatform,
  getProductNonPlatform,
  updateProduct,
  updateStatusProduct,
} from '@/service/product-v3';
import { useNotificatonStore } from '@/store';

export type GetPackageQueryParams = {
  token: string;
};

const QUERY_KEY_PLATFORM = ['LIST_PRODUCT_ADMIN_PLATFORM'];
const QUERY_KEY_NON_PLATFORM = ['LIST_PRODUCT_ADMIN_NON_PLATFORM'];

// ** GET
const fetchProductPlatform = async (
  params: GetPackageQueryParams
): Promise<any> => {
  const data = await getProductPlatform(params.token);
  return data;
};

export const useGetProductPlatform = (params: GetPackageQueryParams) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY_PLATFORM, params],
    queryFn: () => fetchProductPlatform(params),
    keepPreviousData: true,
  });
};

// ** UPDATE
const patchProductPlatform = async ({ val, id }: any) => {
  const { data } = await updateProduct({ val, id });
  return data;
};

export const usePatchProductPlatform = () => {
  const queryClient = useQueryClient();
  const { setNotification } = useNotificatonStore((state) => state);
  return useMutation<any, Error, any>(patchProductPlatform, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY_PLATFORM);
      await setNotification({
        message: 'Business Schema',
        description: 'Business Schema Berhasil diedit',
        type: 'success',
        hit: true,
      });
    },
    onError: async (error) => {
      await console.error(error);
      setNotification({
        message: 'Business schema product mengalami kesalahan',
        description: error.message,
        type: 'error',
        hit: true,
      });
    },
  });
};

// ** UPDATE
const patchProductPlatformStatus = async ({ productCategory, status }: any) => {
  const { data } = await updateStatusProduct({ productCategory, status });
  return data;
};

export const usePatchProductPlatformStatus = () => {
  const queryClient = useQueryClient();
  const { setNotification } = useNotificatonStore((state) => state);
  return useMutation<any, Error, any>(patchProductPlatformStatus, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY_PLATFORM);
      await setNotification({
        message: 'Business Schema',
        description: 'Business Schema Ubah Status berhasil',
        type: 'success',
        hit: true,
      });
    },
    onError: async (error) => {
      await console.error(error);
      setNotification({
        message: 'Business schema product mengalami kesalahan',
        description: error.message,
        type: 'error',
        hit: true,
      });
    },
  });
};

// ** GET
const fetchProductNonPlatform = async (
  params: GetPackageQueryParams
): Promise<any> => {
  const data = await getProductNonPlatform(params.token);
  return data;
};

export const useGetProductNonPlatform = (params: GetPackageQueryParams) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY_NON_PLATFORM, params],
    queryFn: () => fetchProductNonPlatform(params),
    keepPreviousData: true,
  });
};

// ** UPDATE
const patchProductNonPlatform = async ({ val, id }: any) => {
  const { data } = await updateProduct({ val, id });
  return data;
};

export const usePatchProductNonPlatform = () => {
  const queryClient = useQueryClient();
  const { setNotification } = useNotificatonStore((state) => state);
  return useMutation<any, Error, any>(patchProductNonPlatform, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY_NON_PLATFORM);
      await setNotification({
        message: 'Business Schema',
        description: 'Business Schema Berhasil diedit',
        type: 'success',
        hit: true,
      });
    },
    onError: async (error) => {
      await console.error(error);
      setNotification({
        message: 'Business schema product mengalami kesalahan',
        description: error.message,
        type: 'error',
        hit: true,
      });
    },
  });
};

// ** UPDATE
const patchProductNonPlatformStatus = async ({
  productCategory,
  status,
}: any) => {
  const { data } = await updateStatusProduct({ productCategory, status });
  return data;
};

export const usePatchProductNonPlatformStatus = () => {
  const queryClient = useQueryClient();
  const { setNotification } = useNotificatonStore((state) => state);
  return useMutation<any, Error, any>(patchProductNonPlatformStatus, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY_NON_PLATFORM);
      await setNotification({
        message: 'Business Schema',
        description: 'Business Schema Ubah Status berhasil',
        type: 'success',
        hit: true,
      });
    },
    onError: async (error) => {
      await console.error(error);
      setNotification({
        message: 'Business schema product mengalami kesalahan',
        description: error.message,
        type: 'error',
        hit: true,
      });
    },
  });
};
