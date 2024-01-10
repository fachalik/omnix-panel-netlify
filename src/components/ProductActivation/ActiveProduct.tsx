// import { useGetProduct } from './Hooks/useGetProduct';
// import { getLogin } from '@/utils/sessions';
// import Loading from '../Loading';
// import Error from '@/components/Error';
// import { Empty } from 'antd';
import CardItemActive from '@/components/AllCard/CardItemActive';
import moment from 'moment';

export default function ActiveProduct() {
  const data: any = [
    {
      id: 1,
      package_name: 'PAKET 1',
      package_type: 'OMNIX_SERVICE',
      package_price: 1000,
      package_tax: 110,
      package_description:
        '3 License Agent digital, 1 License SPV, Channel Digital Only',
      createdAt: moment(),
      tenant_code: 'sometning',
      status: 'active',
      link: 'https://www.google.com/',
    },
    {
      id: 2,
      package_name: 'PAKET 2',
      package_type: 'OMNIX_MARKETING',
      package_price: 1000,
      package_tax: 110,
      package_description:
        '3 License Agent digital, 1 License SPV, Channel Digital Only',
      createdAt: moment(),
      tenant_code: 'garuda',
      status: 'buildinprogress',
      link: 'https://www.google.com/',
    },
    {
      id: 3,
      package_name: 'PAKET 3',
      package_type: 'OMNIX_SALES',
      package_price: 1000,
      package_tax: 110,
      package_description:
        '2000 Blast Email, 1000 Blast Whatsapp, 500 Blast SMS, 1 License Marketingy',
      createdAt: moment(),
      tenant_code: 'erajaya',
      status: 'active',
      link: 'https://www.google.com/',
    },
  ];
  console.log('data', data);
  // const { data, isLoading, isSuccess, isError, error }: any = useGetProduct({
  //   token: getLogin().token ?? '',
  //   limit: 100,
  //   page: 1,
  // });

  // if (isLoading) {
  //   return <Loading />;
  // }

  // console.log(isLoading, isSuccess);

  // if (!isLoading && isSuccess) {
  return (
    <div>
      {data?.map((item: any, idx: number) => (
        <CardItemActive item={item} key={`${idx}_${item.package_name}`} />
      ))}
      {/* {data.data.length === 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Empty />
        </div>
      )} */}
    </div>
  );
  // }

  // if (!isLoading && isError) {
  //   return <Error error={error} />;
  // }
}
