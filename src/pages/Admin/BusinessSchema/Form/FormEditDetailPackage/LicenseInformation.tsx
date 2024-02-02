import Content from '@/layouts/Dashboard/Content';
import { Row, Col, Form, Select, Divider, InputNumber } from 'antd';

import { FieldTypeUpdateProduct } from '../../models/businessSchema';

import { FormInstance } from 'antd/lib';

import { useGetProductAddonLicenseUser } from '@/hooks/useGetListProduct';

import { getLogin } from '@/utils/sessions';
import { useSearchParams } from 'react-router-dom';

// import { FieldTypeUpdateProduct } from '../../models/businessSchema';

interface IProps {
  form: FormInstance;
  watchData: FieldTypeUpdateProduct | null;
  error: any;
  role?: string;
}

export default function LicenseInformation({ form, role }: IProps) {
  // const {getfield} = form
  const [searchParams, _setSearchParams] = useSearchParams();
  const product = searchParams.get('product');
  const type = searchParams.get('type');
  const productsPackageData = form.getFieldValue('productsPackage');
  const selectedProductPackages = form.getFieldValue('selectedProductPackages');

  const { data: dataAddon, isLoading: isLoadingAddOn } =
    useGetProductAddonLicenseUser({
      token: getLogin()?.token ?? '',
      limit: 100,
      page: 1,
      productCategory: product ?? '',
      productType: type ?? '',
    });

  const updateData = (firstArray: any, secondArray: any) => {
    const secondArrayId = (secondArray ?? []).map((item: any) => item?._id);

    // Add new channels from the first array to the second array

    firstArray.forEach((data: any) => {
      if (!secondArrayId.includes(data.value)) {
        const newData = {
          _id: data.value,
          label: data.label,
          quantity: 0,
          price: data.price,
        };
        form.setFieldValue('productsPackage', [
          ...productsPackageData,
          newData,
        ]);
        // form.setFieldValue('selectedProductPackages', secondArrayId);
      }
    });

    // Remove channels from the second array if they are not present in the first array
    for (let i = secondArray.length - 1; i >= 0; i--) {
      const tempData = secondArray[i]?.['_id'];

      const isSame = firstArray.some((item: any) => item.value === tempData);
      if (!isSame) {
        secondArray.splice(i, 1);
      }
    }
  };

  return (
    <Content style={{ marginBottom: '1.5em' }}>
      <Row
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
        }}
      >
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
          style={{ marginBottom: '1em' }}
        >
          <p
            style={{
              fontSize: 16,
              fontWeight: 600,
              textTransform: 'capitalize',
            }}
          >
            License Information
          </p>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
          style={{
            margin: '0px',
            padding: '0px',
            width: '100%',
            height: '100%',
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              marginBottom: 10,
            }}
          >
            Select License
          </div>
          <Form.Item<FieldTypeUpdateProduct>
            style={{ margin: 0 }}
            name="selectedProductPackages"
            // hasFeedback
            rules={[{ required: true, message: 'select license is required' }]}
          >
            <Select
              loading={isLoadingAddOn}
              disabled={!!role}
              mode="multiple"
              showSearch
              style={{ width: '100%' }}
              onChange={(_value: any, option: any) => {
                updateData(option, productsPackageData);
              }}
              // defaultValue={selectedProductPackages}
              value={selectedProductPackages}
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                (option?.label.toLowerCase() ?? '').includes(
                  input.toLowerCase()
                )
              }
              options={dataAddon}
            />
          </Form.Item>
        </Col>
        <Form.List name={'productsPackage'}>
          {(productsPackage) => (
            <>
              {productsPackage.map((productsPackage, productsPackageIndex) => (
                <Col
                  key={`${productsPackageIndex}`}
                  xs={24}
                  sm={24}
                  md={24}
                  lg={24}
                  xl={24}
                  style={{
                    marginBottom: '1em',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <Divider />

                  <Row
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Col>
                      <p
                        style={{
                          textTransform: 'capitalize',
                          fontWeight: 600,
                          fontSize: 16,
                        }}
                      >{`Quantity ${productsPackageData[productsPackageIndex].label}`}</p>
                    </Col>
                    <Col>
                      <Form.Item
                        {...productsPackage}
                        name={[productsPackage.name, 'quantity']}
                        label={`Quantity`}
                        rules={[
                          {
                            required: true,
                            message: `Variant ${
                              productsPackageIndex + 1
                            } is required`,
                          },
                          {
                            type: 'number',
                            min: 1,
                            message: 'Number must be at least 1',
                          },
                        ]}
                      >
                        <InputNumber
                          min={0}
                          disabled={!!role}
                          placeholder="Ex: 0"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              ))}
            </>
          )}
        </Form.List>
      </Row>
    </Content>
  );
}
