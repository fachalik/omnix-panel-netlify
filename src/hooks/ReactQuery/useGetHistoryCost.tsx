import { useQuery } from '@tanstack/react-query';
import { getHistoryCost } from '@/service/product-v3';

export type GetPackageQueryParams = {
  token: string;
  updatedBy: any;
  user_id: any;
  productType: string;
  query_key: string;
  start_date: string;
  end_date: string;
};

// ** GET

const fetchHistoryCost = async (
  params: GetPackageQueryParams
): Promise<any> => {
  const data = await getHistoryCost(
    params.token,
    params.updatedBy,
    params.user_id,
    params.productType,
    params.start_date,
    params.end_date
  );
  return data;
};

export const useGetHistoryCost = (params: GetPackageQueryParams) => {
  const mapCondition = (val: string): boolean => {
    if (val === 'Invalid Date') return false;
    return !!val;
  };

  return useQuery<any, Error>({
    queryKey: [`${params.query_key}`, params],
    queryFn: () => fetchHistoryCost(params),
    keepPreviousData: true,
    enabled: mapCondition(params.start_date) && mapCondition(params.end_date),
  });
};
