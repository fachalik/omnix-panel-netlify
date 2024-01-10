import { message } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteMProductUser,
  postMProductUser,
  updateMProductUser,
} from '@/service/m-product-user';
import { useSearchParams } from 'react-router-dom';

const QUERY_KEY = ['M_PRODUCT'];

// ** CREATE

const createMProductUser = async (val: any) => {
  const { data } = await postMProductUser(val);
  return data;
};

export const usecreateMProductUser = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams]: any = useSearchParams();
  return useMutation<any, Error, any>(createMProductUser, {
    onSuccess: async (data: any) => {
      await queryClient.invalidateQueries(QUERY_KEY);
      await message.success('Product has been added');
      await setSearchParams({
        ...searchParams,
        type: data.productType,
        product: data.key,
      });
    },
    onError: (error) => {
      console.error(error);
      message.error('failed created Product');
    },
  });
};

// ** DELETE
const destroyMProductUser = async (id: number) => {
  const { data } = await deleteMProductUser(id);
  return data;
};

export const usedestroyMProductUser = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(destroyMProductUser, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
      message.success('Product has been deleted');
    },
    onError: (error) => {
      console.error(error);
      message.error('failed delete product');
    },
  });
};

// ** UPDATE
const patchMProductUser = async ({ val, id }: any) => {
  const { data } = await updateMProductUser({ val, id });
  return data;
};

export const usepatchMProductUser = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(patchMProductUser, {
    onSuccess: async (data: any) => {
      await queryClient.invalidateQueries(QUERY_KEY);
      await message.success('Product successfully updated');
    },
    onError: (error) => {
      console.error(error);
      message.error('failed updated Product');
    },
  });
};
