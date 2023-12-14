import React from 'react';

import { Row, Col, Form, Button } from 'antd';

import Loading from '@/components/Loading';
import Error from '@/components/Error';
import ProductInformation from './ProductInformation';
import ProductPricingInformation from './ProductPricingInformation';
import LicenseInformation from './LicenseInformation';
import Channel from './Channel';
import AddOn from './AddOn';

import useFormEditDetailProduct from '../../Hooks/useFormEditDetailProduct';
import {
  usepatchProduct,
  useGetDetailProduct,
} from '@/hooks/ReactQuery/admin/useGetProduct';

import { useSearchParams } from 'react-router-dom';
import { getLogin } from '@/utils/sessions';

export default function DetailDataProduct() {
  const [initData, setInitData] = React.useState<any>({});
  const [searchParams]: any = useSearchParams();
  const { mutate } = usepatchProduct();

  const id = searchParams.get('id');

  const {
    data: dataDetail,
    isLoading: isLoadingDetail,
    error: errorDetail,
    isError: isErrorDetail,
    isSuccess: isSuccessDetail,
    refetch: refetchDetail,
  }: any = useGetDetailProduct({
    token: getLogin()?.token ?? '',
    id,
    key: `PRODUCT_DETAILS_${id}`,
  });

  const {
    form,
    watchData,
    isLoading,
    onFinish,
    onFinishFailed,
    handleValuesChange,
  } = useFormEditDetailProduct({
    mutate,
    refetch: refetchDetail,
    id,
  });

  // const getValue = form?.getFieldsValue();

  const funcSetInitData = async (dataDetail: any) => {
    form.resetFields();

    const product = await dataDetail?.data?.product[0];

    const init = {
      productName: product?.productName ?? '',
      description: product?.productName ?? '',
      typeDetails: product?.typeDetails ?? '',
      typeSchema: product?.typeSchema ?? '',
      productPrice: product?.productPrice ?? '',
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

      channel_addon: product?.channel_addon ?? [],
    };
    console.log('init', init);
    setInitData(init);
    form.setFieldsValue(init);
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

  console.log('watchData', watchData);
  console.log('form.getFieldsValue()', form.getFieldsValue());

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: 8,
      }}
    >
      {isLoadingDetail && <Loading />}
      {isSuccessDetail && dataDetail && initData && form.getFieldsValue() && (
        <Row
          style={{ width: '100%', margin: 0, padding: 0 }}
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        >
          <Col
            xs={24}
            style={{
              margin: '0px 0px 15px 0px',
              padding: '0px',
              width: '100%',
              height: '100%',
            }}
          >
            <Form
              initialValues={initData}
              style={{ marginTop: 20 }}
              autoComplete="off"
              name="basic"
              layout="vertical"
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              onValuesChange={handleValuesChange}
            >
              <ProductInformation form={form} watchData={watchData} />

              <ProductPricingInformation form={form} watchData={watchData} />

              <RenderData>
                <LicenseInformation form={form} watchData={watchData} />
              </RenderData>

              <RenderData>
                <Channel form={form} watchData={watchData} />
              </RenderData>

              <Button
                type="primary"
                block
                disabled={isLoading}
                htmlType="submit"
                style={{ fontSize: 14, fontWeight: 700 }}
              >
                Submit
              </Button>
            </Form>
          </Col>
          <Col
            xs={24}
            style={{
              padding: '0px',
              width: '100%',
              height: '100%',
            }}
          >
            {(watchData?.channel ?? []).map((item, idx: number) => (
              <AddOn key={`${idx}_${item}`} item={item} watchData={watchData} />
            ))}
          </Col>
        </Row>
      )}
      {!isLoadingDetail && isErrorDetail && <Error error={errorDetail} />}
    </div>
  );
}

// digital: channelList.filter(
//   (item) =>
//     item.channel === 'digital' &&
//     (product?.channel ?? []).includes(item.value)
// ),

// nondigital: channelList.filter(
//   (item) =>
//     item.channel === 'nondigital' &&
//     (product?.channel ?? []).includes(item.value)
// ),
