import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  getProduct,
  deleteProduct,
  postProduct,
  updateProduct,
} from '@/service/adminproduct';

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

// ** CREATE

const createProduct = async (val: any) => {
  const { data } = await postProduct(val);
  return data;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(createProduct, {
    onSuccess: async () =>
      // data
      {
        await queryClient.invalidateQueries(QUERY_KEY);
        // await Toast('success', `${menu} ${data.branch} has been added`);
      },
    onError: (error) => {
      console.error(error);
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
