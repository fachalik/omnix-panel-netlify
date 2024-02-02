import { message } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getDetailGroupSkill,
  getGroupSkill,
  postGroupSkill,
  updateGroupSkill,
} from '@/service/group-skill';

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

const fetchGroupSkill = async (params: GetPackageQueryParams): Promise<any> => {
  const data = await getGroupSkill({
    token: params.token,
    page: params.page,
    limit: params.limit,
    term: params.term,
    status: params.status,
    is_not_paginate: params.is_not_paginate,
  });
  return data;
};

export const useGetGroupSkill = (params: GetPackageQueryParams) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchGroupSkill(params),
    keepPreviousData: true,
  });
};

// ** GET Detail

const fetchDetailGroupSkill = async (params: {
  token: string;
  id: string;
}): Promise<any> => {
  const data = await getDetailGroupSkill({
    token: params.token,
    id: params.id,
  });
  return data;
};

export const useGetDetailGroupSkill = (params: {
  token: string;
  id: string;
}) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchDetailGroupSkill(params),
    keepPreviousData: true,
  });
};

// ** CREATE

const createGroupSkill = async (val: any) => {
  const { data } = await postGroupSkill(val);
  return data;
};

export const usecreateGroupSkill = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(createGroupSkill, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
      message.success('Group Skill has been added');
    },
    onError: (error) => {
      console.error(error);
      message.error('failed created Group');
    },
  });
};

// ** UPDATE
const patchGroupSkill = async ({ val, id }: any) => {
  const { data } = await updateGroupSkill({ val, id });
  return data;
};

export const usepatchGroupSkill = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(patchGroupSkill, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
      message.success('Group Skill successfully updated');
    },
    onError: (error) => {
      console.error(error);
      message.error('failed updated Group');
    },
  });
};
