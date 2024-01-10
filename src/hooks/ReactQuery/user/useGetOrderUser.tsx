// import { message } from 'antd';
import {
  useQuery,
  //  useMutation, useQueryClient
} from '@tanstack/react-query';
import { getCarts, getCartsDetail } from '@/service/order';

const QUERY_KEY = ['ORDER_USER'];

// ** GET

const fetchGetOrderUser = async (params: {
  token: any;
  page: number;
  limit: number;
  term?: string;
  body: string;
  id_reseller?: string;
  user_id?: string;
}): Promise<any> => {
  const data = await getCarts({
    token: params.token,
    page: params.page,
    limit: params.limit,
    term: params.term,
    body: params.body,
    id_reseller: params.id_reseller,
    user_id: params.user_id,
  });
  return data;
};

export const useGetOrderUser = (params: {
  token: any;
  page: number;
  limit: number;
  term?: string;
  body: any;
  id_reseller?: string;
  user_id?: string;
}) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchGetOrderUser(params),
    keepPreviousData: true,
  });
};

// ** GET Detail

const fetchGetDetailOrderUser = async (params: {
  token: any;
  id?: string;
  orderId?: string;
}): Promise<any> => {
  const data = await getCartsDetail({
    token: params.token,
    id: params.id,
    orderId: params.orderId,
  });
  return data;
};

export const useGetDetailOrderUser = (params: {
  token: any;
  id?: string;
  orderId?: string;
}) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchGetDetailOrderUser(params),
    keepPreviousData: true,
  });
};
