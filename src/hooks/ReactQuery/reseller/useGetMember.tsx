import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getMember,
  getMemberNoReferralCode,
  postMember,
  deleteMember,
} from '@/service/member';

export type GetPackageQueryParams = {
  id?: string | undefined;
  token: string;
  page?: number;
  limit?: number;
  is_not_paginate?: string;
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

// ** GET

const transformData = (data: any) => {
  const arr = Array.from(data, function (item: any) {
    return { value: item['_id'], label: item.email };
  });
  return [{ value: '', label: '--select member--' }, ...arr];
};

const fetchMemberNotPaginate = async (
  params: GetPackageQueryParams
): Promise<any> => {
  const data = await getMember(
    params.token,
    params.page,
    params.limit,
    params.id,
    params.is_not_paginate
  );
  return data;
};

export const useGetMemberNotPaginate = (params: GetPackageQueryParams) => {
  return useQuery<any, Error>({
    queryKey: ['LIST_MEMBER_CODE_NOT_PAGINATE', params],
    queryFn: () => fetchMemberNotPaginate(params),
    keepPreviousData: true,
    select: React.useCallback((data: any) => transformData(data), []),
  });
};

// ** GET

const fetchMemberNotPaginateNoReferallCode = async (
  params: GetPackageQueryParams
): Promise<any> => {
  const data = await getMemberNoReferralCode(params.token);
  return data;
};

export const useGetMemberNotPaginateNoReferralCode = (
  params: GetPackageQueryParams
) => {
  return useQuery<any, Error>({
    queryKey: ['LIST_MEMBER_NO_REFERRAL_CODE_NOT_PAGINATE', params],
    queryFn: () => fetchMemberNotPaginateNoReferallCode(params),
    keepPreviousData: true,
    select: React.useCallback((data: any) => transformData(data), []),
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
