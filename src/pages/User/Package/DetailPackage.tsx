import React from 'react';
import { Row, Col, Divider, Empty } from 'antd';

// import { EllipsisOutlined } from '@ant-design/icons';

import Content from '@/layouts/Dashboard/Content';
import HeaderSection from '@/components/HeaderSection';

import { useGetMProductDetail } from '@/hooks/ReactQuery/admin/useGetMProduct';
import {
  useGetProductUser,
  useGetDetailProductUser,
} from '@/hooks/ReactQuery/user/useGetProductUser';
import { useAuthStore } from '@/store/auth';

import { useParams } from 'react-router-dom';
import { getLogin } from '@/utils/sessions';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { InformationPackage } from './Components/InformationPackage';
import { InformationPackageAddOn } from './Components/InformationPackageAddon';
import { SelectPackage } from './Components/SelectPackage';
import { AddOnPackage } from './Components/AddOnPackage';
import { Summary } from './Components/Summary';

export default function OrderHistory() {
  const { user } = useAuthStore((state) => state);
  const { id } = useParams();

  const [itemPackages, setItemPackes] = React.useState<any>({});
  const [selectedItems, setSelectedItems] = React.useState<any>({});
  const [detailPackage, setDetailPackage] = React.useState<any>({});

  const { data, isLoading, isError, isSuccess, error }: any =
    useGetMProductDetail({
      token: getLogin()?.token ?? '',
      id: id ?? '',
      userType: 'REGULER',
    });

  const {
    data: dataPackage,
    isLoading: isLoadingPackage,
    isSuccess: isSuccessPackage,
  } = useGetProductUser({
    limit: 100,
    page: 1,
    token: getLogin()?.token ?? '',
    productType: 'PLATFORM',
    is_not_paginate: '1',
    id_user: user?._id ?? '',
    productCategory: data?.key ?? '',
  });

  const {
    data: dataProduct,
    isLoading: isLoadingProduct,
    isSuccess: isSuccessProduct,
  } = useGetDetailProductUser({
    token: getLogin()?.token ?? '',
    id: selectedItems?._id ?? '',
    key: `GET_DETAIL_PRODUCT_${selectedItems?.productName ?? 'none'}`,
  });

  React.useEffect(() => {
    let isMount = true;

    if (isMount && dataProduct) {
      setDetailPackage(dataProduct.data);
    }

    return () => {
      isMount = false;
    };
  }, [dataProduct]);

  React.useEffect(() => {
    let isMount = true;

    if (isMount && dataPackage) {
      let groupedData: any = {};

      groupedData = dataPackage?.reduce((acc: any, item: any) => {
        const key = item.typeDetails;
        if (!acc[key]) {
          acc[key] = [];
        }

        acc[key].push(item);

        return acc;
      }, {});

      console.log('groupedData', groupedData);

      if (Object.keys(groupedData).length !== 0) {
        if (groupedData['PACKAGE']?.length !== 0) {
          groupedData['PACKAGE'].push({
            productName: 'Custom',
          });
        }
      }

      setItemPackes(groupedData);

      if (Object.keys(groupedData).length !== 0) {
        if (groupedData['PACKAGE'][0]) {
          setSelectedItems(groupedData['PACKAGE'][0]);
        }
      }
    }

    return () => {
      isMount = false;
    };
  }, [dataPackage]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
      {isLoading && <Loading />}
      {isSuccess && (
        <div style={{ width: '100%' }}>
          <HeaderSection
            isBack
            item={[{ title: 'Choose Package' }, { title: data.name }]}
          />
          {Object.keys(itemPackages).length === 0 && (
            <Content style={{ width: '100%', marginTop: '1em' }}>
              <Empty description={<p>There is no package assign</p>} />
            </Content>
          )}
          {Object.keys(itemPackages).length !== 0 && (
            <Row
              style={{
                width: '100%',
                marginTop: '1em',
                display: 'flex',
                justifyContent: 'space-between',
              }}
              gutter={[8, 8]}
            >
              <Col
                xs={24}
                sm={24}
                md={16}
                style={{ width: '100%', height: '100%' }}
              >
                <Content style={{ width: '100%' }}>
                  <div
                    style={{
                      overflow: 'auto',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <SelectPackage
                      itemPackages={itemPackages['PACKAGE']}
                      selectedItems={selectedItems}
                      setSelectedItems={setSelectedItems}
                    />
                    <Divider />
                    <Row
                      style={{
                        width: '100%',
                        display: 'flex',
                        gap: '4em',
                      }}
                    >
                      <Col xs={24}>
                        <InformationPackage
                          data={detailPackage['product']}
                          isLoading={isLoadingProduct}
                          isSuccess={isSuccessProduct}
                        />
                      </Col>
                      {detailPackage['addOn'] && (
                        <Col xs={24}>
                          <InformationPackageAddOn
                            data={detailPackage['addOn']}
                            isLoading={isLoadingProduct}
                            isSuccess={isSuccessProduct}
                          />
                        </Col>
                      )}
                    </Row>
                    <Divider />
                    <Row
                      style={{
                        width: '100%',
                        display: 'flex',
                      }}
                    >
                      <Col xs={24}>
                        <AddOnPackage
                          data={itemPackages['ADDON']}
                          isLoading={isLoadingPackage}
                          isSuccess={isSuccessPackage}
                        />
                      </Col>
                    </Row>
                  </div>
                </Content>
              </Col>
              <Col xs={24} sm={24} md={8} style={{ height: '100%' }}>
                <Content>
                  <Summary />
                </Content>
              </Col>
            </Row>
          )}
        </div>
      )}
      {!isLoading && isError && <Error error={error} />}
    </div>
  );
}
