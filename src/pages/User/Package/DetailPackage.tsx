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

import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useOrderStore } from '@/store';

export default function OrderHistory() {
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const { setCheckout, setProductCategory, setProductType, setTenantName } =
    useOrderStore((state) => state);
  const [initData, setInitData] = React.useState<any>({});
  const [wFields, setWFields] = React.useState<any>([]);
  const methods = useForm({
    defaultValues: initData,
  });

  const watchFields = useWatch({
    control: methods.control,
    name: wFields,
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

  const handleDataPackage = async (dataPackage: any) => {
    let groupedData: any = {};

    groupedData = await dataPackage?.reduce((acc: any, item: any) => {
      const key = item.item.typeDetails;
      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(item);

      return acc;
    }, {});

    if (Object.keys(groupedData).length !== 0) {
      if (groupedData['PACKAGE']?.length !== 0) {
        await groupedData['PACKAGE'].push({
          item: { productName: 'Custom' },
          addOn: [],
        });
      }
    }

    setItemPackes(groupedData);

    if (groupedData['PACKAGE'][0]['addOn'].length !== 0) {
      let resultObject: any = {};

      await groupedData['PACKAGE'][0]['addOn'].forEach((value: any) => {
        resultObject[`package_addon_${value.channel}`] = [];
      });

      const fields = {
        package: null,
        alacarte: [],
        addon: [],
        ...resultObject,
        alacarte_addon: [],
      };

      const resultArray = Object.keys(fields).filter((value) => {
        return (
          value !== null && (Array.isArray(value) ? value.length > 0 : true)
        );
      });

      setWFields(resultArray);

      methods.reset(fields);
      setInitData(fields);
    }
  };

  React.useEffect(() => {
    let isMount = true;

    if (isMount && dataPackage) {
      handleDataPackage(dataPackage);
    }

    return () => {
      isMount = false;
    };
  }, [dataPackage]);

  React.useEffect(() => {
    if (Object.keys(initData).length !== 0) {
      if (Object.keys(itemPackages).length !== 0) {
        if (itemPackages['PACKAGE'][0]) {
          setSelectedItems(itemPackages['PACKAGE'][0]);
        }
      }
    }
  }, [initData]);

  const onSubmit = (pData: any) => {
    const transformedArray = Object.values(pData).map((category: any) => {
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
    setProductCategory(data?.key ?? '');
    setProductType(data?.productType ?? '');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
      {(isLoading || isLoadingPackage) && <Loading />}

      {(isSuccess || isSuccessPackage) && (
        <div style={{ width: '100%' }}>
          <HeaderSection
            isBack
            item={[{ title: 'Choose Package' }, { title: data.name }]}
          />
          <FormProvider {...methods}>
            <Form
              onFinish={methods.handleSubmit(onSubmit)}
              style={{ width: '100%' }}
            >
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
                          getValue={methods.getValues}
                          watchData={methods.watch}
                          setValue={methods.setValue}
                          reset={methods.reset}
                          setWFields={setWFields}
                          setInitData={setInitData}
                        />

                        <Divider />
                        {selectedItems &&
                          selectedItems?.item?.productName?.toLowerCase() !==
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
                                  getValue={methods.getValues}
                                  watchData={methods.watch}
                                  setValue={methods.setValue}
                                />
                              </Col>
                              {detailPackage['addOn'] && (
                                <Col xs={24}>
                                  <InformationPackageAddOn
                                    data={detailPackage['addOn']}
                                    isLoading={isLoadingProduct}
                                    isSuccess={isSuccessProduct}
                                    getValue={methods.getValues}
                                    watchData={methods.watch}
                                    setValue={methods.setValue}
                                    control={methods.control}
                                    errors={methods.formState.errors}
                                  />
                                </Col>
                              )}
                            </Row>
                          )}
                        {selectedItems &&
                          selectedItems?.item?.productName?.toLowerCase() ===
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
                                  getValue={methods.getValues}
                                  watchData={methods.watch}
                                  setValue={methods.setValue}
                                  control={methods.control}
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
                              getValue={methods.getValues}
                              watchData={methods.watch}
                              setValue={methods.setValue}
                            />
                          </Col>
                        </Row>
                      </div>
                    </Content>
                  </Col>
                  <Col xs={24} sm={24} md={8} style={{ height: '100%' }}>
                    <Content>
                      <Summary
                        getValue={methods.getValues}
                        watchData={watchFields}
                        setValue={methods.setValue}
                      />
                    </Content>
                  </Col>
                </Row>
              )}
            </Form>
          </FormProvider>
          <Modal
            width={'80%'}
            title="Subscription Summary"
            isModalOpen={IsModalCreate}
            handleCancel={() => {
              handleCancelCreate();
              setTenantName('');
              setCurrent(0);
            }}
            footerCancel={false}
          >
            <ModalCheckout
              current={current}
              next={next}
              prev={prev}
              setCurrent={setCurrent}
              handleClose={() => {
                handleCancelCreate();
                setTenantName('');
                setCurrent(0);
              }}
            />
          </Modal>
        </div>
      )}
      {!isLoading && !isLoadingPackage && !isLoadingProduct && isError && (
        <Error error={error} />
      )}
    </div>
  );
}
