import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getProductPlatform,
  getProductNonPlatform,
  updateProduct,
  updateStatusProduct,
} from '@/service/product-v3';
import { message } from 'antd';

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
  return useMutation<any, Error, any>(patchProductPlatform, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY_PLATFORM);
      message.success('Business Schema Berhasil diedit');
    },
    onError: async (error) => {
      await console.error(error);
      message.error(error.message);
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
  return useMutation<any, Error, any>(patchProductPlatformStatus, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY_PLATFORM);
      message.success('Business Schema Berhasil diedit');
    },
    onError: async (error) => {
      await console.error(error);
      message.error(error.message);
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
  return useMutation<any, Error, any>(patchProductNonPlatform, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY_NON_PLATFORM);
      message.success('Business Schema Berhasil diedit');
    },
    onError: async (error) => {
      await console.error(error);
      message.error(error.message);
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
  return useMutation<any, Error, any>(patchProductNonPlatformStatus, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY_NON_PLATFORM);
      message.success('Business Schema Berhasil diedit');
    },
    onError: async (error) => {
      await console.error(error);
      message.error(error.message);
    },
  });
};
