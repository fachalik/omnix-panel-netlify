// import { useGetOrder } from './Hooks/useGetOrder';
// import { getLogin } from '@/utils/sessions';
// import Loading from '../Loading';
// import CardItemOrder from '@/components/AllCard/CardItemOrder';
// import Error from '@/components/Error';

export default function ExploreOrder() {
  // const { data, isLoading, isSuccess, isError, error }: any = useGetOrder({
  //   token: getLogin()?.token ?? '',
  //   limit: 100,
  //   page: 1,
  // });

  // if (isLoading) {
  //   return <Loading />;
  // }

  // if (!isLoading && isSuccess) {
  //   return (
  //     <div>
  //       {data.data?.map((item: any, idx: number) => (
  //         <CardItemOrder
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
  //           <p style={{ fontWeight: 400, fontSize: 16 }}>No Data</p>
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
