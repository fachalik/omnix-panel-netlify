import React from 'react';
import { message } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getPermissionMenu,
  postPermissionMenu,
  updatePermissionGroup,
  getListMenu,
} from '@/service/permission-menu';

export type GetPackageQueryParams = {
  token: string;
  page: number;
  limit: number;
  group_id: string;
  is_not_paginate?: string;
};

const QUERY_KEY = ['LIST_GROUP_PERMISSION'];

// ** GET

const transformData = (data: any) => {
  const arr = Array.from(data, function (item: any) {
    return { value: item._id, label: item.label };
  });
  return arr;
};

const fetchGetListMenu = async (params: {
  token: string;
  limit: string;
  page: string;
  status?: string;
  is_not_paginate?: string;
}): Promise<any> => {
  const data = await getListMenu({
    token: params.token,
    limit: params.limit,
    page: params.page,
    status: params.status,
    is_not_paginate: params.is_not_paginate,
  });
  return data;
};

export const useGetListMenu = (params: {
  token: string;
  limit: string;
  page: string;
  status?: string;
  is_not_paginate?: string;
}) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchGetListMenu(params),
    keepPreviousData: true,
    select: React.useCallback((data: any) => transformData(data), []),
  });
};

// ** GET

const fetchPermissionMenu = async (
  params: GetPackageQueryParams
): Promise<any> => {
  const data = await getPermissionMenu({
    token: params.token,
    page: params.page,
    limit: params.limit,
    group_id: params.group_id,
    is_not_paginate: params.is_not_paginate,
  });
  return data;
};

export const useGetPermissionMenu = (params: GetPackageQueryParams) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchPermissionMenu(params),
    keepPreviousData: true,
  });
};

// ** CREATE

const createPermissionMenu = async ({ val, id }: { val: any; id: string }) => {
  const { data } = await postPermissionMenu({ val, id });
  return data;
};

export const usecreatePermissionMenu = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(createPermissionMenu, {
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

// ** UPDATE
const patchPermissionMenu = async ({ val, id }: any) => {
  const { data } = await updatePermissionGroup({ val, id });
  return data;
};

export const usepatchPermissionMenu = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(patchPermissionMenu, {
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

// // ** DELETE
// const destroyGroup = async (id: number) => {
//   const { data } = await deleteGroup(id);
//   return data;
// };

// export const usedestroyGroup = () => {
//   const queryClient = useQueryClient();
//   return useMutation<any, Error, any>(destroyGroup, {
//     onSuccess: async () => {
//       console.log(QUERY_KEY);
//       await queryClient.invalidateQueries(QUERY_KEY);
//     },
//     onError: (error) => {
//       console.error(error);
//     },
//   });
// };
