import { message } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  GetDetailPackageAdmin,
  postPackageAdmin,
  updatePackageAdmin,
} from '@/service/packages';

import { useSearchParams } from 'react-router-dom';

const QUERY_KEY = ['PACKAGE_DETAIL'];

// ** GET Detail

const fetchPackageDetail = async (params: {
  token: any;
  id: string;
}): Promise<any> => {
  const data = await GetDetailPackageAdmin({
    token: params.token,
    id: params.id,
  });
  return data;
};

export const useGetDetailPackage = (params: {
  token: any;
  id: string;
  key: string;
}) => {
  return useQuery<any, Error>({
    queryKey: [params.key, params],
    queryFn: () => fetchPackageDetail(params),
    keepPreviousData: true,
    enabled: params.id ? true : false,
    cacheTime: 0,
  });
};

// ** CREATE

const createPackage = async (val: any) => {
  const { data } = await postPackageAdmin(val);
  return data;
};

export const usecreatePackage = () => {
  const [searchParams, setSearchParams]: any = useSearchParams();
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(createPackage, {
    onSuccess: async (data: any) => {
      await queryClient.invalidateQueries(QUERY_KEY);
      await message.success('Package has been added');
      await setSearchParams({
        ...Object.fromEntries(searchParams),
        type: data?.productType,
        product: data?.productCategory,
        name: data?.productName,
        id: data._id,
      });
      // return data;
    },
    onError: (error) => {
      console.error(error);
      message.error('failed created Package');
    },
  });
};

// ** UPDATE
const patchPackage = async ({ val, id }: any) => {
  const { data } = await updatePackageAdmin({ val, id });
  return data;
};

export const usepatchPackage = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(patchPackage, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
      message.success('Package successfully updated');
    },
    onError: (error) => {
      console.error(error);
      message.error('failed updated Package');
    },
  });
};
