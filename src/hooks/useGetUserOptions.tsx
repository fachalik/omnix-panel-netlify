import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserNoPagination } from '@/service/user';

const QUERY_KEY = ['LIST_USER_OPTIONS'];

// ** GET

const transformData = (data: any) => {
  const arr = Array.from(data, function (item: any) {
    return { value: item._id, label: item.name };
  });
  return arr;
};

const fetchUser = async (token: string): Promise<any> => {
  const data = await getUserNoPagination(token);
  return data;
};

export const useGetUserOptions = (token: string) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY, token],
    queryFn: () => fetchUser(token),
    keepPreviousData: true,
    select: React.useCallback((data: any) => transformData(data), []),
  });
};
