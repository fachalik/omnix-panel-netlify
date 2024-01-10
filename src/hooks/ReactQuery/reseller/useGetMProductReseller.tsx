import { message } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteMProductReseller,
  postMProductReseller,
  updateMProductReseller,
} from '@/service/m-product-reseller';
import { useSearchParams } from 'react-router-dom';

const QUERY_KEY = ['M_PRODUCT'];

// ** CREATE

const createMProductReseller = async (val: any) => {
  const { data } = await postMProductReseller(val);
  return data;
};

export const usecreateMProductReseller = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams]: any = useSearchParams();
  return useMutation<any, Error, any>(createMProductReseller, {
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
const destroyMProductReseller = async (id: number) => {
  const { data } = await deleteMProductReseller(id);
  return data;
};

export const usedestroyMProductReseller = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(destroyMProductReseller, {
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
const patchMProductReseller = async ({ val, id }: any) => {
  const { data } = await updateMProductReseller({ val, id });
  return data;
};

export const usepatchMProductReseller = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(patchMProductReseller, {
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
