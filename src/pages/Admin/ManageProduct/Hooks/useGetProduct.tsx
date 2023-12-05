import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getProductPaginate,
  deleteProduct,
  postProduct,
  updateProduct,
} from '@/service/product-v3';

export type GetPackageQueryParams = {
  token: string;
  page: number;
  limit: number;
};

const QUERY_KEY = ['LIST_PRODUCT_ADMIN'];

// ** GET

const fetchProduct = async (params: GetPackageQueryParams): Promise<any> => {
  const data = await getProductPaginate(
    params.token,
    params.page,
    params.limit
  );
  return data;
};

export const useGetProduct = (params: GetPackageQueryParams) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchProduct(params),
    keepPreviousData: true,
  });
};

// ** CREATE

const createProduct = async (val: any) => {
  const { data } = await postProduct(val);
  return data;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(createProduct, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

// ** DELETE
const destroyProduct = async (id: any) => {
  const { data } = await deleteProduct(id);
  return data;
};

export const useDestroyProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(destroyProduct, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
    },
    onError: (error) => {
      console.error(error);
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
  return useMutation<any, Error, any>(patchProduct, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
