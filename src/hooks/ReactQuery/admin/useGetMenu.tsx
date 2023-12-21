import { message } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMenu, deleteMenu, postMenu, updateMenu } from '@/service/menu';

export type GetPackageQueryParams = {
  token: string;
  page: number;
  limit: number;
  status?: string;
  is_not_paginate?: string;
};

const QUERY_KEY = ['LIST_MENU'];

// ** GET

const fetchUMenu = async (params: GetPackageQueryParams): Promise<any> => {
  const data = await getMenu({
    token: params.token,
    page: params.page,
    limit: params.limit,
    status: params.status,
    is_not_paginate: params.is_not_paginate,
  });
  return data;
};

export const useGetMenu = (params: GetPackageQueryParams) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchUMenu(params),
    keepPreviousData: true,
  });
};

// ** CREATE

const createMenu = async (val: any) => {
  const { data } = await postMenu(val);
  return data;
};

export const useCreateMenu = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(createMenu, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
      message.success('menu successfully added');
    },
    onError: (error) => {
      console.error(error);
      message.error('failed added menu');
    },
  });
};

// ** DELETE
const destroyMenu = async (id: number) => {
  const { data } = await deleteMenu(id);
  return data;
};

export const useDestroyMenu = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(destroyMenu, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
      message.success('menu successfully delete');
    },
    onError: (error) => {
      console.error(error);
      message.error('failed delete menu');
    },
  });
};

// ** UPDATE
const patchMenu = async ({ val, id }: any) => {
  const { data } = await updateMenu({ val, id });
  return data;
};

export const usePatchMenu = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(patchMenu, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
      message.success('menu successfully updated');
    },
    onError: (error) => {
      console.error(error);
      message.error('failed updated menu');
    },
  });
};
