import { Row, Col, Form, Button } from 'antd';

import ProductInformation from './ProductInformation';
import ProductPricingInformation from './ProductPricingInformation';
import LicenseInformation from './LicenseInformation';
import Channel from './Channel';
import AddOn from './AddOn';

import useFormMProduct from '../../Hooks/useFormMProduct';
import { usecreateProduct } from '@/hooks/ReactQuery/admin/useGetProduct';

export default function DetailDataProduct() {
  const { mutate } = usecreateProduct();
  const {
    form,
    watchData,
    isLoading,
    onFinish,
    onFinishFailed,
    handleValuesChange,
  } = useFormMProduct({
    mutate,
  });

  const init: any = {
    productName: '',
    description: '',
    typeSchema: '',
    pricingSchema: '',
    productPrice: '',
    minQuantity: '',
    maxQuantity: '',
    licenseAgent: {
      minQuantity: '',
      maxQuantity: '',
    },
    licenseSVP: { minQuantity: '', maxQuantity: '' },
    licenseBackroom: { minQuantity: '', maxQuantity: '' },
    digital: [],
    nondigital: [],
  };

  console.log('watchData', watchData);

  const concatenatedArray = []
    .concat(watchData?.digital || []) // Use an empty array if array1 is null or undefined
    .concat(watchData?.nondigital || []); // Use an empty array if array2 is null or undefined

  // // console.log('form', form.getFieldValue('typeSchema'));

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: 8,
      }}
    >
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
            initialValues={init}
            style={{ marginTop: 20 }}
            autoComplete="off"
            name="basic"
            layout="vertical"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onValuesChange={handleValuesChange}
          >
            {/* Product Information Start */}
            <ProductInformation form={form} />
            {/* Product Information END */}

            {/* Product Information second Start */}
            <ProductPricingInformation form={form} />
            {/* Product Information second END */}

            {/* License Information Start */}
            {(watchData?.typeSchema === 'PACKAGE' ||
              watchData?.typeSchema === 'ALACARTE' ||
              (watchData?.typeSchema === 'ADDON' &&
                watchData?.pricingSchema === 'LICENSE_USER')) && (
              <LicenseInformation form={form} />
            )}
            {/* License Information END */}

            {/* Channel Start */}

            {(watchData?.typeSchema === 'PACKAGE' ||
              watchData?.typeSchema === 'ALACARTE' ||
              (watchData?.typeSchema === 'ADDON' &&
                watchData?.pricingSchema === 'LICENSE_USER')) && (
              <Channel form={form} />
            )}

            <Button
              type="primary"
              block
              disabled={isLoading}
              htmlType="submit"
              style={{ fontSize: 14, fontWeight: 700 }}
            >
              Submit
            </Button>
            {/* Channel END */}
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
          {concatenatedArray.map((_item, idx: number) => (
            <AddOn key={idx} />
          ))}
        </Col>
      </Row>
    </div>
  );
}
