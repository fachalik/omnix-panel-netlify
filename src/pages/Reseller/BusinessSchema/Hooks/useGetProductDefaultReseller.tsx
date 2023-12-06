import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getProductNonPlatformResellerDefault,
  getProductPlatformResellerDefault,
  updateProductResellerDefault,
} from '@/service/product-v3';
import { useNotificatonStore } from '@/store';

export type GetPackageQueryParams = {
  token: string;
  id_reseller: any;
};

const QUERY_KEY_PLATFORM = ['LIST_PRODUCT_RESELLER_PLATFORM'];
const QUERY_KEY_NON_PLATFORM = ['LIST_PRODUCT_RESELLER_NON_PLATFORM'];

// ** GET
const fetchProductPlatform = async (
  params: GetPackageQueryParams
): Promise<any> => {
  const data = await getProductPlatformResellerDefault(
    params.token,
    params.id_reseller
  );
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
const patchProductPlatform = async ({ val, id, id_reseller }: any) => {
  const { data } = await updateProductResellerDefault({ val, id, id_reseller });
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

// ** GET
const fetchProductNonPlatform = async (
  params: GetPackageQueryParams
): Promise<any> => {
  const data = await getProductNonPlatformResellerDefault(
    params.token,
    params.id_reseller
  );
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
const patchProductNonPlatform = async ({ val, id, id_reseller }: any) => {
  const { data } = await updateProductResellerDefault({ val, id, id_reseller });
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
