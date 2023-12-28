import React from 'react';
import { Row, Col, Divider, Empty, Form } from 'antd';

// import useFormPackage from './Hooks/useFormPackage';
import Content from '@/layouts/Dashboard/Content';
import HeaderSection from '@/components/HeaderSection';
import Modal from '@/components/Modal';

import { useGetMProductDetail } from '@/hooks/ReactQuery/admin/useGetMProduct';
import {
  useGetProductUserWithAddon,
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
import { AlacartePackage } from './Components/AlacartePackage';
import { ModalCheckout } from './Modal/modalCheckout';

import { useForm, useWatch } from 'react-hook-form';
import { useOrderStore } from '@/store';

export default function OrderHistory() {
  const { setCheckout } = useOrderStore((state) => state);
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      package: null,
      alacarte: [],
      addon: [],
      package_addon: [],
      alacarte_addon: [],
    },
  });

  console.log('errors', errors);

  const watchFields = useWatch({
    control,
    name: ['package', 'alacarte', 'addon', 'package_addon', 'alacarte_addon'],
  });

  const { user } = useAuthStore((state) => state);
  const { id } = useParams();

  // ** Modal Create
  const [IsModalCreate, setIsModalCreate] = React.useState<boolean>(false);
  const handleCancelCreate = () => setIsModalCreate(false);

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
  } = useGetProductUserWithAddon({
    limit: 100,
    page: 1,
    token: getLogin()?.token ?? '',
    productType: 'PLATFORM',
    is_not_paginate: '1',
    id_user: user?._id ?? '',
    productCategory: data?.key ?? '',
    status: '1',
  });

  const {
    data: dataProduct,
    isLoading: isLoadingProduct,
    isSuccess: isSuccessProduct,
  } = useGetDetailProductUser({
    token: getLogin()?.token ?? '',
    id: selectedItems?.item?._id ?? '',
    key: `GET_DETAIL_PRODUCT_${selectedItems?.item?.productName ?? 'none'}`,
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

      console.log('dataPackage', dataPackage);
      groupedData = dataPackage?.reduce((acc: any, item: any) => {
        const key = item.item.typeDetails;
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
            item: { productName: 'Custom' },
            addOn: [],
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

  const onSubmit = (data: any) => {
    // console.log('data', data);

    const transformedArray = Object.values(data).map((category: any) => {
      if (Array.isArray(category) && category.length > 0) {
        return category.map((item) => ({
          ...item,
          type: item.type,
        }));
      } else {
        if (category) {
          return category;
        } else {
          return null;
        }
      }
    });

    const combinedArray = transformedArray
      .filter((item: any) => item !== null)
      .reduce((result: any, array: any) => result.concat(array), []);

    setIsModalCreate(true);
    setCheckout(combinedArray);
    console.log('combinedArray', combinedArray);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
      {isLoading && <Loading />}
      {isSuccess && (
        <div style={{ width: '100%' }}>
          <HeaderSection
            isBack
            item={[{ title: 'Choose Package' }, { title: data.name }]}
          />
          <Form onFinish={handleSubmit(onSubmit)}>
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
                        getValue={getValues}
                        watchData={watch}
                        setValue={setValue}
                      />
                      <Divider />
                      {selectedItems.item.productName.toLowerCase() !==
                        'custom' && (
                        <Row
                          style={{
                            width: '100%',
                            display: 'flex',
                            gap: '2em',
                          }}
                        >
                          <Col xs={24}>
                            <InformationPackage
                              data={detailPackage['product']}
                              isLoading={isLoadingProduct}
                              isSuccess={isSuccessProduct}
                              getValue={getValues}
                              watchData={watch}
                              setValue={setValue}
                            />
                          </Col>
                          {detailPackage['addOn'] && (
                            <Col xs={24}>
                              <InformationPackageAddOn
                                data={detailPackage['addOn']}
                                isLoading={isLoadingProduct}
                                isSuccess={isSuccessProduct}
                                getValue={getValues}
                                watchData={watch}
                                setValue={setValue}
                                control={control}
                              />
                            </Col>
                          )}
                        </Row>
                      )}
                      {selectedItems.item.productName.toLowerCase() ===
                        'custom' && (
                        <Row
                          style={{
                            width: '100%',
                            display: 'flex',
                            gap: '2em',
                          }}
                        >
                          <Col xs={24}>
                            <AlacartePackage
                              data={itemPackages['ALACARTE']}
                              isLoading={isLoadingPackage}
                              isSuccess={isSuccessPackage}
                              getValue={getValues}
                              watchData={watch}
                              setValue={setValue}
                            />
                          </Col>
                        </Row>
                      )}
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
                            getValue={getValues}
                            watchData={watch}
                            setValue={setValue}
                          />
                        </Col>
                      </Row>
                    </div>
                  </Content>
                </Col>
                <Col xs={24} sm={24} md={8} style={{ height: '100%' }}>
                  <Content>
                    <Summary
                      getValue={getValues}
                      watchData={watchFields}
                      setValue={setValue}
                    />
                  </Content>
                </Col>
              </Row>
            )}
          </Form>
          <Modal
            width={'80%'}
            title="SubScription Summary"
            isModalOpen={IsModalCreate}
            handleCancel={handleCancelCreate}
            footerCancel={false}
          >
            <ModalCheckout handleClose={handleCancelCreate} />
          </Modal>
        </div>
      )}
      {!isLoading && isError && <Error error={error} />}
    </div>
  );
}
