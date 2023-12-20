import React from 'react';
import { message } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getUser,
  postUser,
  deleteUser,
  updateUsers,
} from '@/service/user-management';

export type GetPackageQueryParams = {
  token: string;
  page: number;
  limit: number;
  role?: string;
  term?: string;
  status?: string;
  reqPrice?: string;
  is_not_paginate?: string;
};

const QUERY_KEY = ['LIST_USERS_ADMIN'];

// ** GET LIST

const transformData = (data: any) => {
  const arr = Array.from(data, function (item: any) {
    return { value: item._id, label: item.email };
  });
  return arr;
};

const fetchUsersList = async (params: GetPackageQueryParams): Promise<any> => {
  const data = await getUser(
    params.token,
    params.page,
    params.limit,
    params.role,
    params.term,
    params.status,
    params.reqPrice,
    params.is_not_paginate
  );
  return data;
};

export const useGetUsersList = (params: GetPackageQueryParams) => {
  return useQuery<any, Error>({
    queryKey: ['user-list', params],
    queryFn: () => fetchUsersList(params),
    keepPreviousData: true,
    select: React.useCallback((data: any) => transformData(data), []),
  });
};

// ** GET

const fetchUsers = async (params: GetPackageQueryParams): Promise<any> => {
  const data = await getUser(
    params.token,
    params.page,
    params.limit,
    params.role,
    params.term,
    params.status,
    params.reqPrice,
    params.is_not_paginate
  );
  return data;
};

export const useGetUsers = (params: GetPackageQueryParams) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchUsers(params),
    keepPreviousData: true,
  });
};

// ** CREATE

const createUser = async (val: any) => {
  const { data } = await postUser(val);
  return data;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(createUser, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

// ** DELETE
const destroyUser = async (id: number) => {
  const { data } = await deleteUser(id);
  return data;
};

export const useDestroyUser = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(destroyUser, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

// ** UPDATE
const patchUser = async ({ val, id }: any) => {
  const { data } = await updateUsers({ val, id });
  return data;
};

export const usePatchUser = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(patchUser, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
      message.success('user successfully updated');
    },
    onError: (error) => {
      console.error(error);
      message.error('failed updated user');
    },
  });
};
