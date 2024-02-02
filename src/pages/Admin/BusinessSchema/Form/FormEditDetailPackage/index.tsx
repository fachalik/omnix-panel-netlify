import React from 'react';

import { Row, Col, Form, Button, Tabs } from 'antd';

import Loading from '@/components/Loading';

import Error from '@/components/Error';
import ProductInformation from './ProductInformation';
import LicenseInformation from './LicenseInformation';
import ChannelAddon from './ChannelAddon';

import useFormDetailPackage from '../../Hooks/useFormEditDetailPackage';

import {
  useGetDetailPackage,
  usepatchPackage,
} from '@/hooks/ReactQuery/admin/useGetPackages';

import { useSearchParams } from 'react-router-dom';
import { getLogin } from '@/utils/sessions';

export default function DetailDataProduct() {
  const [initData, setInitData] = React.useState<any>({});
  const [searchParams]: any = useSearchParams();
  const { mutate: mutatePackage } = usepatchPackage();

  const id = searchParams.get('id');

  const {
    data: dataDetail,
    isLoading: isLoadingDetail,
    error: errorDetail,
    isError: isErrorDetail,
    isSuccess: isSuccessDetail,
    refetch: refetchDetail,
  }: any = useGetDetailPackage({
    token: getLogin()?.token ?? '',
    id,
    key: `PRODUCT_DETAILS_${id}`,
  });

  const {
    form,
    watchData,
    error: errorProduct,
    isLoading: isLoadingProduct,
    onFinish,
    onFinishFailed,
    handleValuesChange,
  } = useFormDetailPackage({
    mutate: mutatePackage,
    refetch: refetchDetail,
    id,
  });

  const funcSetInitData = async (dataDetail: any) => {
    form.resetFields();

    const { product, detail_product, addOn_product } = await dataDetail;

    let productPrice: number = 0;

    const init: any = await {
      productName: product?.productName ?? '',
      description: product?.productName ?? '',
      typeDetails: product?.typeDetails ?? '',
      typeSchema: product?.typeSchema ?? '',
      // productPrice: product?.productPrice ?? '',
      selectedProductPackages: [],
      addon: product?.addOn_product ?? [],
    };

    if (detail_product.length !== 0) {
      init['productsPackage'] = await detail_product?.map((item: any) => {
        return {
          _id: item.products[0]?.['_id'],
          label: item.products[0]?.['productName'],
          quantity: +item.quantity,
          price: item.products[0]?.['productPrice'],
        };
      });
      init['selectedProductPackages'] = await detail_product?.map(
        (item: any) => item?.products?.[0]?.['_id']
      );

      const totalProductPrice: any = detail_product.reduce(
        (total: any, item: any) => {
          const productPrice = item.products.reduce(
            (subTotal: any, product: any) => subTotal + product.productPrice,
            0
          );
          return total + productPrice * item.quantity;
        },
        0
      );
      productPrice += totalProductPrice;
    } else {
      init['productsPackage'] = await [];
      init['selectedProductPackages'] = await [];
    }

    if (addOn_product.length !== 0) {
      init['addon'] = await addOn_product?.map((item: any) => {
        return {
          _id: !item?.addon
            ? []
            : item.addon.map((item2: any) =>
                JSON.stringify({ _id: item2._id, price: item2.productPrice })
              ),
          addOnType: item?.addOnType ?? '',
          purchaseRequired: item?.pricingRequired ?? 0,
        };
      });
      const totalchannelprice: any = addOn_product.reduce(
        (total: any, product: any) => {
          // For each product in addOn_products, sum up the productPrice
          return (
            total +
            product.addon.reduce((subtotal: any, addon: any) => {
              return subtotal + addon.productPrice;
            }, 0)
          ); // Initial value of subtotal is 0
        },
        0
      ); // Initial value of total is 0
      productPrice += totalchannelprice;
    } else {
      init['addon'] = await [];
    }

    init['productPrice'] = (await productPrice) ?? 0;

    await setInitData(init);

    await form.setFieldsValue(init);
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
            label: 'Package',
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
                          />

                          <LicenseInformation
                            form={form}
                            watchData={watchData}
                            error={errorProduct}
                          />
                          <ChannelAddon
                            form={form}
                            watchData={watchData}
                            error={errorProduct}
                          />

                          {/* <Channel
                            form={form}
                            watchData={watchData}
                            error={errorProduct}
                          /> */}

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
        ]}
      />
    </div>
  );
}
