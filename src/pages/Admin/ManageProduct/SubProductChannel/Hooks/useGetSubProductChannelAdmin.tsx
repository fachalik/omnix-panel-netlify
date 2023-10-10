import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  deleteSubProductChannel,
  getSubProductChannel,
  postSubProductChannel,
  updateSubProductChannel,
} from '@/service/adminsubproductchannel';

export type GetPackageQueryParams = {
  token: string;
  page: number;
  limit: number;
  search: string;
  sortField: string;
  sortOrder: string;
};

const QUERY_KEY = ['LIST_SUB_PRODUCT_CHANNEL_ADMIN'];

// ** GET

const fetchSubProductChannelAdmin = async (
  params: GetPackageQueryParams
): Promise<any> => {
  const data = await getSubProductChannel({
    token: params.token,
    page: params.page,
    limit: params.limit,
    search: params.search,
    sortField: params.sortField,
    sortOrder: params.sortOrder,
  });
  return data;
};

export const useGetSubProductChannelAdmin = (params: GetPackageQueryParams) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchSubProductChannelAdmin(params),
    keepPreviousData: true,
  });
};

// ** CREATE

const createSubProductChannelAdmin = async (val: any) => {
  const { data } = await postSubProductChannel(val);
  return data;
};

export const useCreateSubProductChannelAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(createSubProductChannelAdmin, {
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
const destroySubProductChannelAdmin = async (id: number) => {
  const { data } = await deleteSubProductChannel(id);
  return data;
};

export const useDestroySubProductChannelAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(destroySubProductChannelAdmin, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

// ** UPDATE
const patchSubProductChannelAdmin = async ({ val, id }: any) => {
  const { data } = await updateSubProductChannel({ val, id });
  return data;
};

export const usePatchSubProductChannelAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(patchSubProductChannelAdmin, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
