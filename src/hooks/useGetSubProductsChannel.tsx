import React from 'react';
import { timeout } from '@/utils/utilitys';
import { getLogin } from '@/utils/sessions';
import { getSubProductChannel } from '@/service/adminsubproductchannel';

interface OutSelect {
  value: number;
  label: string;
}

const useGetSubProductsChannel = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<OutSelect[]>([]);

  const handleGet = async () => {
    setIsLoading(true);
    await timeout(2000);
    let temp: any = await getSubProductChannel({
      token: getLogin()?.token,
      page: 1,
      limit: 1000,
    });
    let tempData: any = await temp[0]?.map((item: any): OutSelect => {
      return { value: item.channelId, label: item.channelName };
    });

    setData([{ value: '', label: '-' }, ...tempData] ?? []);
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

export default useGetSubProductsChannel;
