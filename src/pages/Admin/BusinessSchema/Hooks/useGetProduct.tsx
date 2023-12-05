import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProductPlatform, updateProduct } from '@/service/product-v3';

export type GetPackageQueryParams = {
  token: string;
};

const QUERY_KEY = ['LIST_PRODUCT_ADMIN_PLATFORM'];

// ** GET

const fetchProductPlatform = async (
  params: GetPackageQueryParams
): Promise<any> => {
  const data = await getProductPlatform(params.token);
  return data;
};

export const useGetProductPlatform = (params: GetPackageQueryParams) => {
  return useQuery<any, Error>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchProductPlatform(params),
    keepPreviousData: true,
  });
};

// ** UPDATE
const patchProductPlatform = async ({ val, id }: any) => {
  console.log('val', val);
  console.log('id', id);
  const { data } = await updateProduct({ val, id });
  return data;
};

export const usePatchProductPlatform = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>(patchProductPlatform, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
