import { message } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserDetail, updateUsers } from '@/service/user';

export type GetPackageQueryParams = {
  id: string;
  token: string;
  query_key: string;
};

// ** GET

const fetchUserDetail = async (params: GetPackageQueryParams): Promise<any> => {
  const data = await getUserDetail({ id: params.id, token: params.token });
  return data;
};

export const useGetUserDetail = (params: GetPackageQueryParams) => {
  return useQuery<any, Error>({
    queryKey: [`${params.query_key}`, params],
    queryFn: () => fetchUserDetail(params),
    keepPreviousData: true,
  });
};

// ** UPDATE
const patchUser = async ({ val, id }: any) => {
  const { data } = await updateUsers({ val, id });
  return data;
};

export const usePatchUser = (params: GetPackageQueryParams) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(patchUser, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([params.query_key]);
      message.success('payment status successfully added');
      // window.location.reload();
    },
    onError: (error) => {
      console.error(error);
      message.error('Failed to edit status payment');
    },
  });
};
