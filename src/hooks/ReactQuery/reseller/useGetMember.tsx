import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMember, postMember, deleteMember } from '@/service/member';

export type GetPackageQueryParams = {
  id: string | undefined;
  token: string;
  page: number;
  limit: number;
};

const QUERY_KEY = ['LIST_MEMBER'];

// ** GET

const fetchMember = async (params: GetPackageQueryParams): Promise<any> => {
  const data = await getMember(
    params.token,
    params.page,
    params.limit,
    params.id
  );
  return data;
};

export const useGetMember = (params: GetPackageQueryParams) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchMember(params),
    keepPreviousData: true,
  });
};

// ** CREATE

const createMember = async ({ val, id }: any) => {
  const { data } = await postMember({ payload: val, id });
  return data;
};

export const useCreateMember = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(createMember, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

// ** DELETE
const destroyMember = async ({ val, id }: any) => {
  const { data } = await deleteMember({ payload: val, id });
  return data;
};

export const useDestroyMember = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(destroyMember, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

// // ** UPDATE
// const patchUser = async ({ val, id }: any) => {
//   const { data } = await updateUsers({ val, id });
//   return data;
// };

// export const usePatchUser = () => {
//   const queryClient = useQueryClient();
//   return useMutation<any, Error, any>(patchUser, {
//     onSuccess: async () =>
//       // data
//       {
//         await queryClient.invalidateQueries(QUERY_KEY);
//         // await Toast('success', `${menu} ${data.name} has been updated`);
//       },
//     onError: (error) => {
//       console.error(error);
//     },
//   });
// };
