import { message } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postTeam, getTeam } from '@/service/team-management';

export type GetPackageQueryParams = {
  token: string;
  page: number;
  limit: number;
  UnitAccounts: string;
  status?: string;
  is_not_paginate?: string;
};

const QUERY_KEY = ['LIST_TEAM_USER'];

// ** GET

const fetchTeam = async (params: GetPackageQueryParams): Promise<any> => {
  const data = await getTeam({
    token: params.token,
    page: params.page,
    limit: params.limit,
    status: params.status,
    UnitAccounts: params.UnitAccounts,
    is_not_paginate: params.is_not_paginate,
  });
  return data;
};

export const useGetTeam = (params: GetPackageQueryParams) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchTeam(params),
    keepPreviousData: true,
  });
};

// ** CREATE

const createTeam = async (val: any) => {
  const { data } = await postTeam(val);
  return data;
};

export const usecreateTeam = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(createTeam, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
      message.success('Team has been added');
    },
    onError: (error) => {
      console.error(error);
      message.error(error.message);
    },
  });
};
