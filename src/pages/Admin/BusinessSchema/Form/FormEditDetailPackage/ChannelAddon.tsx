import Content from '@/layouts/Dashboard/Content';
import { Row, Col, Form, Select, Divider, Button, Tooltip } from 'antd';

import { FieldTypeUpdateProduct } from '../../models/businessSchema';

import { FormInstance } from 'antd/lib';

import { useGetProductAddonLicenseGeneral } from '@/hooks/useGetListProduct';

import { getLogin } from '@/utils/sessions';
import { useSearchParams } from 'react-router-dom';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

interface IProps {
  form: FormInstance;
  watchData: FieldTypeUpdateProduct | null;
  error: any;
  role?: string;
}

export default function ChannelAddon({ form, role }: IProps) {
  const [searchParams, _setSearchParams] = useSearchParams();
  const product = searchParams.get('product');
  const type = searchParams.get('type');

  const { data: dataAddon, isLoading: isLoadingAddOn } =
    useGetProductAddonLicenseGeneral({
      token: getLogin()?.token ?? '',
      limit: 100,
      page: 1,
      productCategory: product ?? '',
      productType: type ?? '',
    });

  const updateData = (field: any, firstArray: any, secondArray: any = []) => {
    const secondArrayId = secondArray.map((item: any) => item?._id);

    // Add new channels from the first array to the second array
    firstArray.forEach((data: any) => {
      if (!secondArrayId.includes(data.value)) {
        const newData = {
          _id: data.value,
          label: data.label,
          price: data.productPrice,
        };
        form.setFieldValue(field, [...secondArray, newData]);
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
            Channel Add-On
          </p>
        </Col>

        <Form.List name={'addon'}>
          {(addon, { add: addAddon, remove: removeAddon }) => (
            <>
              {addon.map((addon, addonIndex) => (
                <Col
                  key={`${addonIndex}`}
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
                    <Col
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1em',
                      }}
                    >
                      <p
                        style={{
                          textTransform: 'capitalize',
                          fontWeight: 600,
                          fontSize: 16,
                        }}
                      >{`Multiple Selection Variant ${addonIndex + 1}`}</p>
                      <Tooltip title={`Delete variant ${addonIndex + 1}`}>
                        <Button
                          disabled={!!role}
                          onClick={() => removeAddon(addonIndex)}
                          color={'red'}
                          style={{ marginRight: '0.5em' }}
                          icon={<DeleteOutlined style={{ color: 'red' }} />}
                        >
                          Delete
                        </Button>
                      </Tooltip>
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
                      <Form.Item
                        label="Add-On"
                        style={{ margin: 0 }}
                        name={[addon.name, '_id']}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: 'add On is required',
                          },
                        ]}
                      >
                        <Select
                          placeholder="Select Add-On"
                          disabled={!!role}
                          loading={isLoadingAddOn}
                          mode="multiple"
                          showSearch
                          style={{ width: '100%' }}
                          value={form.getFieldValue([addon.name, '_id'])}
                          onChange={(_value: any, option: any) => {
                            form.setFieldValue([addon.name, '_id'], option);
                            updateData(
                              [addon.name, 'detail'],
                              option,
                              form.getFieldValue([addon.name, 'detail'])
                            );
                          }}
                          defaultValue={form.getFieldValue([addon.name, '_id'])}
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
                  </Row>
                  <Row
                    gutter={24}
                    style={{ width: '100%', height: '100%', marginTop: '1em' }}
                  >
                    <Col
                      xs={24}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      style={{
                        inset: 0,

                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <Form.Item
                        style={{ margin: 0 }}
                        label="Add-on Type"
                        name={[addon.name, 'addOnType']}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: 'add On type is required',
                          },
                        ]}
                      >
                        <Select
                          placeholder="Select Add-On Type"
                          disabled={!!role}
                          showSearch
                          style={{ width: '100%' }}
                          value={form.getFieldValue([addon.name, 'addOnType'])}
                          onChange={(value: any) => {
                            form.setFieldValue(
                              [addon.name, 'addOnType'],
                              value
                            );
                          }}
                          defaultValue={form.getFieldValue([
                            addon.name,
                            'addOnType',
                          ])}
                          optionFilterProp="children"
                          filterOption={(input: any, option: any) =>
                            (option?.label.toLowerCase() ?? '').includes(
                              input.toLowerCase()
                            )
                          }
                          options={[
                            {
                              value: 'single-selection',
                              label: 'Single Selection',
                            },
                            {
                              value: 'multi-selection',
                              label: 'Multi Selection',
                            },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col
                      xs={24}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      style={{
                        inset: 0,

                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <Form.Item
                        label="Pricing Required"
                        style={{ margin: 0 }}
                        name={[addon.name, 'purchaseRequired']}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: 'pricing required is required',
                          },
                        ]}
                      >
                        <Select
                          placeholder="Select Purchase Required"
                          disabled={!!role}
                          showSearch
                          value={form.getFieldValue([
                            addon.name,
                            'purchaseRequired',
                          ])}
                          style={{ width: '100%' }}
                          onChange={(value: any) => {
                            form.setFieldValue(
                              [addon.name, 'purchaseRequired'],
                              value
                            );
                          }}
                          defaultValue={form.getFieldValue([
                            addon.name,
                            'purchaseRequired',
                          ])}
                          optionFilterProp="children"
                          filterOption={(input: any, option: any) =>
                            (option?.label.toLowerCase() ?? '').includes(
                              input.toLowerCase()
                            )
                          }
                          options={[
                            { value: 1, label: 'Required' },
                            { value: 0, label: 'Optional' },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              ))}
              <Button
                disabled={!!role}
                type="dashed"
                block
                onClick={() =>
                  addAddon({
                    _id: [],
                    addOnType: '',
                    purchaseRequired: 0,
                  })
                }
                icon={<PlusOutlined />}
              >
                Add More Variant
              </Button>
            </>
          )}
        </Form.List>
      </Row>
    </Content>
  );
}
