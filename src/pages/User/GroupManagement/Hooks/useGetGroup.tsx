import { message } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getGroupAll,
  deleteGroup,
  postGroup,
  updateGroup,
} from '@/service/group-management';

export type GetPackageQueryParams = {
  token: string;
  page: number;
  limit: number;
  term?: string;
  status?: string;
  is_not_paginate?: string;
};

const QUERY_KEY = ['LIST_GROUP_ADMIN'];

// ** GET

const fetchGroup = async (params: GetPackageQueryParams): Promise<any> => {
  const data = await getGroupAll({
    token: params.token,
    page: params.page,
    limit: params.limit,
    term: params.term,
    status: params.status,
    is_not_paginate: params.is_not_paginate,
  });
  return data;
};

export const useGetGroup = (params: GetPackageQueryParams) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchGroup(params),
    keepPreviousData: true,
  });
};

// ** CREATE

const createGroup = async (val: any) => {
  const { data } = await postGroup(val);
  return data;
};

export const usecreateGroup = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(createGroup, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
      message.success('Group has been added');
    },
    onError: (error) => {
      console.error(error);
      message.error('failed created Group');
    },
  });
};

// ** DELETE
const destroyGroup = async (id: number) => {
  const { data } = await deleteGroup(id);
  return data;
};

export const usedestroyGroup = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(destroyGroup, {
    onSuccess: async () => {
      console.log(QUERY_KEY);
      await queryClient.invalidateQueries(QUERY_KEY);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

// ** UPDATE
const patchGroup = async ({ val, id }: any) => {
  const { data } = await updateGroup({ val, id });
  return data;
};

export const usepatchGroup = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(patchGroup, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
      message.success('Group successfully updated');
    },
    onError: (error) => {
      console.error(error);
      message.error('failed updated Group');
    },
  });
};
