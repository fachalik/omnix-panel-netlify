import React from 'react';

import { Row, Col, Form, Button, Tabs } from 'antd';

import Loading from '@/components/Loading';

import Error from '@/components/Error';
import ProductInformation from './ProductInformation';
import ProductPricingInformation from './ProductPricingInformation';
import LicenseInformation from './LicenseInformation';
import Channel from './Channel';
import AddOn from './AddOn';

import useFormEditDetailProduct from '../../Hooks/useFormEditDetailProduct';
import useFormAddOnDetailProduct from '../../Hooks/useFormAddOnDetailProduct';
import {
  useGetDetailProductUser,
  // usepatchProductUser,
  usepatchProductAddOnUser,
} from '@/hooks/ReactQuery/user/useGetProductUser';
import { usepatchProduct } from '@/hooks/ReactQuery/admin/useGetProduct';

import { useSearchParams } from 'react-router-dom';
import { getLogin } from '@/utils/sessions';

export default function DetailDataProductUser() {
  const [initData, setInitData] = React.useState<any>({});
  const [initDataAddon, setInitDataAddon] = React.useState<any>({});
  const [searchParams]: any = useSearchParams();
  const { mutate: mutateProduct } = usepatchProduct();
  const { mutate: mutateAddOn } = usepatchProductAddOnUser();

  const id = searchParams.get('id');
  const role: any = searchParams.get('role');
  const user: any = searchParams.get('user');

  const {
    data: dataDetail,
    isLoading: isLoadingDetail,
    error: errorDetail,
    isError: isErrorDetail,
    isSuccess: isSuccessDetail,
    refetch: refetchDetail,
  }: any = useGetDetailProductUser({
    token: getLogin()?.token ?? '',
    id,
    key: `PRODUCT_DETAILS_USER_${id}`,
    id_reseller: role === 'RESELLER' ? user : '',
    id_user: role === 'REGULER' ? user : '',
  });

  const {
    form,
    watchData,
    error: errorProduct,
    isLoading: isLoadingProduct,
    onFinish,
    onFinishFailed,
    handleValuesChange,
  } = useFormEditDetailProduct({
    mutate: mutateProduct,
    refetch: refetchDetail,
    id,
    role,
    user,
  });

  const {
    form: formAddon,
    error: errorAddon,
    watchData: watchDataAddon,
    isLoading: isLoadingAddon,
    onFinish: onFinishAddon,
    onFinishFailed: onFinishFailedAddon,
    handleValuesChange: handleValuesChangeAddon,
  } = useFormAddOnDetailProduct({
    mutate: mutateAddOn,
    refetch: refetchDetail,
    id,
  });

  const funcSetInitData = async (dataDetail: any) => {
    form.resetFields();
    formAddon.resetFields();

    const product = await dataDetail?.data?.product[0];
    const addOn = await dataDetail?.data?.addOn;

    const initDataAddon = {
      channel: product?.channel ?? [],
      selectChannel: addOn ? addOn.map((item: any) => item.channel) : [],
      channelAddOn: addOn
        ? addOn.map((item: any) => {
            return {
              channel: item.channel,
              addOnType: item.addOnType,
              pricingRequired: item.pricingRequired,
              detail: item.detail,
            };
          })
        : [],
    };

    const init = {
      productName: product?.productName ?? '',
      description: product?.productName ?? '',
      typeDetails: product?.typeDetails ?? '',
      typeSchema: product?.typeSchema ?? '',
      productPrice: product?.productPrice ?? '',
      salesPrice: product?.salesPrice ?? '',
      minQuantity: product?.minQuantity ?? '',
      maxQuantity: product?.maxQuantity ?? '',
      licenseAgent:
        product?.licenseAgent.length === 0
          ? {
              minQuantity: '',
              maxQuantity: '',
            }
          : {
              minQuantity: product?.licenseAgent[0]?.minQuantity ?? '',
              maxQuantity: product?.licenseAgent[0]?.maxQuantity ?? '',
            },
      licenseSVP:
        product?.licenseSVP.length === 0
          ? {
              minQuantity: '',
              maxQuantity: '',
            }
          : {
              minQuantity: product?.licenseSVP[0]?.minQuantity ?? '',
              maxQuantity: product?.licenseSVP[0]?.maxQuantity ?? '',
            },
      licenseBackroom:
        product?.licenseBackroom.length === 0
          ? {
              minQuantity: '',
              maxQuantity: '',
            }
          : {
              minQuantity: product?.licenseBackroom[0]?.minQuantity ?? '',
              maxQuantity: product?.licenseBackroom[0]?.maxQuantity ?? '',
            },
      channel: product?.channel ?? [],
    };
    setInitData(init);
    setInitDataAddon(initDataAddon);
    form.setFieldsValue(init);
    formAddon.setFieldsValue(initDataAddon);
  };

  React.useEffect(() => {
    let isMount = true;

    if (isMount && dataDetail) {
      funcSetInitData(dataDetail);
    }

    return () => {
      isMount = false;
    };
  }, [dataDetail]);

  React.useEffect(() => {
    let isMount = true;

    if (isMount && watchData) {
      formAddon.setFieldValue('channel', watchData?.channel);
    }

    return () => {
      isMount = false;
    };
  }, [watchData]);

  const RenderData = ({ children }: { children: React.ReactNode }) => {
    const c1 = watchData?.typeDetails === 'PACKAGE';
    const c2 = form.getFieldValue('typeDetails') === 'PACKAGE';
    const c3 = watchData?.typeDetails === 'ALACARTE';
    const c4 = form.getFieldValue('typeDetails') === 'ALACARTE';
    const c5 =
      watchData?.typeDetails === 'ADDON' &&
      watchData?.typeSchema === 'LICENSE_USER';
    const c6 =
      form.getFieldValue('typeDetails') === 'ADDON' &&
      form.getFieldValue('typeSchema') === 'LICENSE_USER';

    if (c1 || c2 || c3 || c4 || c5 || c6) {
      return children;
    }
    return;
  };

  const activeMenu = (): boolean => {
    const c1 = watchData?.typeDetails === 'PACKAGE';
    const c2 = form.getFieldValue('typeDetails') === 'PACKAGE';
    const c3 = watchData?.typeDetails === 'ALACARTE';
    const c4 = form.getFieldValue('typeDetails') === 'ALACARTE';
    const c5 =
      watchData?.typeDetails === 'ADDON' &&
      watchData?.typeSchema === 'LICENSE_USER';
    const c6 =
      form.getFieldValue('typeDetails') === 'ADDON' &&
      form.getFieldValue('typeSchema') === 'LICENSE_USER';

    const logic = c1 || c2 || c3 || c4 || c5 || c6;

    return !logic;
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: 8,
      }}
    >
      <Tabs
        style={{
          backgroundColor: 'white',
          padding: '0px 20px',
          borderRadius: '10px',
        }}
        defaultActiveKey="1"
        items={[
          {
            label: 'Product',
            key: '1',
            children: (
              <>
                {isLoadingDetail && <Loading />}
                {isSuccessDetail &&
                  dataDetail &&
                  initData &&
                  form.getFieldsValue() && (
                    <Row
                      style={{ width: '100%', margin: 0, padding: 0 }}
                      gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    >
                      <Col
                        xs={24}
                        style={{
                          padding: '0px',
                          width: '100%',
                          height: '100%',
                        }}
                      >
                        <Form
                          initialValues={initData}
                          autoComplete="off"
                          name="basic"
                          layout="vertical"
                          form={form}
                          onFinish={onFinish}
                          onFinishFailed={onFinishFailed}
                          onValuesChange={handleValuesChange}
                        >
                          <ProductInformation
                            form={form}
                            watchData={watchData}
                            error={errorProduct}
                            role={role}
                          />

                          <ProductPricingInformation
                            form={form}
                            watchData={watchData}
                            error={errorProduct}
                            role={role}
                          />

                          <RenderData>
                            <LicenseInformation
                              form={form}
                              watchData={watchData}
                              error={errorProduct}
                              role={role}
                            />
                          </RenderData>

                          <RenderData>
                            <Channel
                              form={form}
                              watchData={watchData}
                              error={errorProduct}
                              role={role}
                            />
                          </RenderData>

                          <Form.Item shouldUpdate className="submit">
                            {() => (
                              <Button
                                type="primary"
                                block
                                htmlType="submit"
                                style={{ fontSize: 14, fontWeight: 700 }}
                                disabled={isLoadingProduct}
                              >
                                Submit
                              </Button>
                            )}
                          </Form.Item>
                        </Form>
                      </Col>
                    </Row>
                  )}
                {!isLoadingDetail && isErrorDetail && (
                  <Error error={errorDetail} />
                )}
              </>
            ),
          },
          {
            label: 'Add On',
            disabled: activeMenu(),
            key: '2',
            children: (
              <>
                {isLoadingDetail && <Loading />}
                {isSuccessDetail &&
                  dataDetail &&
                  initData &&
                  form.getFieldsValue() && (
                    <Row
                      style={{ width: '100%', margin: 0, padding: 0 }}
                      gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    >
                      <Col
                        xs={24}
                        style={{
                          padding: '0px',
                          width: '100%',
                          height: '100%',
                        }}
                      >
                        <Form
                          initialValues={initDataAddon}
                          autoComplete="off"
                          name="basic"
                          layout="vertical"
                          form={formAddon}
                          onFinish={onFinishAddon}
                          onFinishFailed={onFinishFailedAddon}
                          onValuesChange={handleValuesChangeAddon}
                        >
                          <AddOn
                            formAddon={formAddon}
                            watchDataAddon={watchDataAddon}
                            error={errorAddon}
                            role={role}
                          />

                          <Form.Item shouldUpdate className="submit">
                            {() => (
                              <Button
                                type="primary"
                                block
                                htmlType="submit"
                                style={{ fontSize: 14, fontWeight: 700 }}
                                disabled={isLoadingAddon}
                              >
                                Submit
                              </Button>
                            )}
                          </Form.Item>
                        </Form>
                      </Col>
                    </Row>
                  )}
                {!isLoadingDetail && isErrorDetail && (
                  <Error error={errorDetail} />
                )}
              </>
            ),
          },
        ]}
      />
    </div>
  );
}
