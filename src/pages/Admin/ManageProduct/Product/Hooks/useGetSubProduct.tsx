import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  deleteSubProduct,
  getSubProduct,
  postSubProduct,
  updateSubProduct,
} from '@/service/adminsubproduct';

export type GetPackageQueryParams = {
  token: string;
  page: number;
  limit: number;
  search: string;
  sortField: string;
  sortOrder: string;
};

const QUERY_KEY = ['LIST_SUB_PRODUCT_ADMIN'];

// ** GET

const fetchSubProduct = async (params: GetPackageQueryParams): Promise<any> => {
  const data = await getSubProduct({
    token: params.token,
    page: params.page,
    limit: params.limit,
    search: params.search,
    sortField: params.sortField,
    sortOrder: params.sortOrder,
  });
  return data;
};

export const useGetSubProduct = (params: GetPackageQueryParams) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchSubProduct(params),
    keepPreviousData: true,
  });
};

// ** CREATE

const createSubProduct = async (val: any) => {
  const { data } = await postSubProduct(val);
  return data;
};

export const useCreateSubProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(createSubProduct, {
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
const destroySubProduct = async (id: number) => {
  const { data } = await deleteSubProduct(id);
  return data;
};

export const useDestroySubProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(destroySubProduct, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

// ** UPDATE
const patchSubProduct = async ({ val, id }: any) => {
  const { data } = await updateSubProduct({ val, id });
  return data;
};

export const usePatchSubProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(patchSubProduct, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
