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
  id: string;
}): Promise<any> => {
  const data = await getCartsDetail({
    token: params.token,
    id: params.id,
  });
  return data;
};

export const useGetDetailOrderUser = (params: { token: any; id: string }) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchGetDetailOrderUser(params),
    keepPreviousData: true,
  });
};

// // ** CREATE

// const createProductUser = async (val: any) => {
//   const { data } = await postProductUser(val);
//   return data;
// };

// export const usecreateProductUser = () => {
//   const [searchParams, setSearchParams]: any = useSearchParams();
//   const queryClient = useQueryClient();
//   return useMutation<any, Error, any>(createProductUser, {
//     onSuccess: async (data: any) => {
//       await queryClient.invalidateQueries(QUERY_KEY);
//       await message.success('Product has been added');
//       await setSearchParams({
//         ...Object.fromEntries(searchParams),
//         type: data?.productType,
//         product: data?.productCategory,
//         name: data?.productName,
//         id: data._id,
//       });
//       // return data;
//     },
//     onError: (error) => {
//       console.error(error);
//       message.error('failed created Product');
//     },
//   });
// };

// // ** DELETE
// const destroyProductUser = async (id: number) => {
//   const { data } = await deleteProductUser(id);
//   return data;
// };

// export const usedestroyProductUser = () => {
//   const queryClient = useQueryClient();
//   return useMutation<any, Error, any>(destroyProductUser, {
//     onSuccess: async () => {
//       console.log(QUERY_KEY);
//       await queryClient.invalidateQueries(QUERY_KEY);
//       message.success('Product has been deleted');
//     },
//     onError: (error) => {
//       console.error(error);
//       message.error('failed delete product');
//     },
//   });
// };

// // ** UPDATE
// const patchProductUser = async ({ val, id, id_user, id_reseller }: any) => {
//   const { data } = await updateProductUser({ val, id, id_user, id_reseller });
//   return data;
// };

// export const usepatchProductUser = () => {
//   const queryClient = useQueryClient();
//   return useMutation<any, Error, any>(patchProductUser, {
//     onSuccess: async () => {
//       await queryClient.invalidateQueries(QUERY_KEY);
//       message.success('Product successfully updated');
//     },
//     onError: (error) => {
//       console.error(error);
//       message.error('failed updated Product');
//     },
//   });
// };

// // ** UPDATE
// const patchProductAddOnUser = async ({ val }: any) => {
//   const { data } = await updateProductUserAddon({ val });
//   return data;
// };

// export const usepatchProductAddOnUser = () => {
//   const queryClient = useQueryClient();
//   return useMutation<any, Error, any>(patchProductAddOnUser, {
//     onSuccess: async () => {
//       await queryClient.invalidateQueries(QUERY_KEY);
//       message.success('Product Addon successfully updated');
//     },
//     onError: (error) => {
//       console.error(error);
//       message.error('failed updated Product Addon');
//     },
//   });
// };
