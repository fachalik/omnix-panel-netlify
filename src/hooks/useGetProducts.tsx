import React from 'react';
import { timeout } from '@/utils/utilitys';
import { getLogin } from '@/utils/sessions';
import { getProduct } from '@/service/adminproduct';

interface OutSelect {
  value: number;
  label: string;
}

const useGetProducts = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<OutSelect[]>([]);

  const handleGet = async () => {
    setIsLoading(true);
    await timeout(2000);
    let temp: any = await getProduct({
      token: getLogin()?.token,
      page: 1,
      limit: 1000,
    });
    let tempData = temp[0]?.map((item: any): OutSelect => {
      return { value: item.productId, label: item.productName };
    });

    setData(tempData ?? []);
    setIsLoading(false);
  };

  React.useEffect(() => {
    let fetching = true;

    fetching && handleGet();

    return () => {
      fetching = false;
    };
  }, []);

  return { data, isLoading };
};

export default useGetProducts;
