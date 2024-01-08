// import { useGetProduct } from './Hooks/useGetProduct';
// import { getLogin } from '@/utils/sessions';
// import Loading from '../Loading';
// import CardItemActive from '@/components/AllCard/CardItemActive';
// import { Empty } from 'antd';
// import Error from '@/components/Error';

export default function ActiveProduct() {
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
  //   return (
  //     <div>
  //       {data.data?.map((item: any, idx: number) => (
  //         <CardItemActive
  //           item={item.package}
  //           key={`${idx}_${item.package_name}`}
  //         />
  //       ))}
  //       {data.data.length === 0 && (
  //         <div
  //           style={{
  //             display: 'flex',
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //           }}
  //         >
  //           <Empty />
  //         </div>
  //       )}
  //     </div>
  //   );
  // }

  // if (!isLoading && isError) {
  //   return <Error error={error} />;
  // }

  return <></>;
}
