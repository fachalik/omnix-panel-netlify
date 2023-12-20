import React from 'react';
import Content from '@/layouts/Dashboard/Content';
import {
  Row,
  Col,
  Form,
  Select,
  Divider,
  Button,
  Input,
  Tooltip,
  InputNumber,
  Alert,
} from 'antd';
import { FieldTypeUpdateProduct } from '../../models/businessSchema';

import { FormInstance } from 'antd/lib';
import { channel } from '../../models/listChannel';

import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

interface IProps {
  formAddon: FormInstance;
  watchDataAddon: FieldTypeUpdateProduct | null;
  error: any;
  role?: string;
}

export default function AddOn({ formAddon, role }: IProps) {
  const getChannelAddon = formAddon.getFieldValue('channel');

  const channelAddOnData = formAddon.getFieldValue('channelAddOn');
  const [listMenu, setListMenu] = React.useState([]);

  React.useEffect(() => {
    let isMount = true;

    if (isMount) {
      let channelTemp: any = getChannelAddon
        ? channel.filter((item) => getChannelAddon?.includes(item.value))
        : [];
      setListMenu(channelTemp);
    }
    return () => {
      isMount = false;
    };
  }, [getChannelAddon]);

  const updateData = (firstArray: any, secondArray: any) => {
    const secondArrayChannels = secondArray.map((item: any) => item.channel);

    // Add new channels from the first array to the second array
    firstArray.forEach((channel: any) => {
      if (!secondArrayChannels.includes(channel)) {
        const newChannel = {
          channel,
          addOnType: 'single-selection',
          pricingRequired: 1,
          detail: [
            {
              name: '',
              price: '',
            },
          ],
        };
        formAddon.setFieldValue('channelAddOn', [
          ...channelAddOnData,
          newChannel,
        ]);
      }
    });

    // Remove channels from the second array if they are not present in the first array
    for (let i = secondArray.length - 1; i >= 0; i--) {
      const channel = secondArray[i].channel;
      if (!firstArray.includes(channel)) {
        secondArray.splice(i, 1);
      }
    }
  };

  const validateChannels = (_rule: any, value: any) => {
    if (!value || value.length === 0) {
      return Promise.reject('Please add at least one variant.');
    }
    return Promise.resolve();
  };

  return (
    <Content style={{ marginBottom: '1.5em' }}>
      <Row
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
            Multiple Selection
          </div>
          <Form.Item
            style={{ margin: 0 }}
            name="selectChannel"
            hasFeedback
            rules={[{ required: true, message: 'channel name is required' }]}
          >
            <Select
              disabled={!!role}
              mode="multiple"
              showSearch
              style={{ width: '100%' }}
              onChange={(value: any) => {
                formAddon.setFieldValue('selectChannel', value);
                updateData(value, channelAddOnData);
              }}
              defaultValue={formAddon.getFieldValue('selectChannel')}
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                (option?.label.toLowerCase() ?? '').includes(
                  input.toLowerCase()
                )
              }
              options={listMenu}
            />
          </Form.Item>
        </Col>
        <Form.List name={'channelAddOn'}>
          {(channelAddOn) => (
            <>
              {channelAddOn.map((channelAddOn, channelAddOnIndex) => (
                <Col
                  key={`${channelAddOnIndex}`}
                  xs={24}
                  sm={24}
                  md={24}
                  lg={24}
                  xl={24}
                  style={{ marginBottom: '1em', width: '100%', height: '100%' }}
                >
                  <Divider />

                  <Row style={{ width: '100%', height: '100%' }}>
                    <Col>
                      <p
                        style={{
                          textTransform: 'capitalize',
                          fontWeight: 600,
                          fontSize: 16,
                        }}
                      >{`${channelAddOnData[channelAddOnIndex].channel} Channel Add-On Configuration`}</p>
                    </Col>
                  </Row>
                  <Row gutter={24} style={{ width: '100%', height: '100%' }}>
                    <Col
                      xs={24}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      style={{
                        marginBottom: '1em',
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
                        Add-on Type *
                      </div>
                      <Form.Item
                        style={{ margin: 0 }}
                        name={[channelAddOn.name, 'addOnType']}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: 'add On type is required',
                          },
                        ]}
                      >
                        <Select
                          disabled={!!role}
                          showSearch
                          style={{ width: '100%' }}
                          value={formAddon.getFieldValue([
                            channelAddOn.name,
                            'addOnType',
                          ])}
                          onChange={(value: any) => {
                            formAddon.setFieldValue(
                              [channelAddOn.name, 'addOnType'],
                              value
                            );
                          }}
                          defaultValue={formAddon.getFieldValue([
                            channelAddOn.name,
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
                        marginBottom: '1em',
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
                        Purchase Required *
                      </div>
                      <Form.Item
                        style={{ margin: 0 }}
                        name={[channelAddOn.name, 'pricingRequired']}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: 'pricing required is required',
                          },
                        ]}
                      >
                        <Select
                          disabled={!!role}
                          showSearch
                          value={formAddon.getFieldValue([
                            channelAddOn.name,
                            'pricingRequired',
                          ])}
                          style={{ width: '100%' }}
                          onChange={(value: any) => {
                            formAddon.setFieldValue(
                              [channelAddOn.name, 'pricingRequired'],
                              value
                            );
                          }}
                          defaultValue={formAddon.getFieldValue([
                            channelAddOn.name,
                            'pricingRequired',
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
                  <Row style={{ width: '100%', height: '100%' }}>
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={24}
                      xl={24}
                      style={{ width: '100%', height: '100%' }}
                    >
                      <Form.List
                        name={[channelAddOn.name, 'detail']}
                        rules={[{ validator: validateChannels }]}
                      >
                        {(
                          details,
                          { add: addDetail, remove: removeDetail },
                          { errors }
                        ) => (
                          <>
                            {/* {JSON.stringify(errors)} */}
                            {errors.length !== 0 && (
                              <Alert
                                message={errors}
                                type="error"
                                showIcon
                                style={{ margin: '1em 0px' }}
                              />
                            )}
                            {details.map((detail, detailIndex) => (
                              <Row
                                gutter={24}
                                key={`${detailIndex}`}
                                style={{
                                  display: 'flex',
                                  // justifyContent: 'space-between',
                                  alignItems: 'center',
                                  marginBottom: 5,
                                  width: '100%',
                                  height: '100%',
                                }}
                              >
                                <Col
                                  xs={24}
                                  sm={10}
                                  md={10}
                                  lg={10}
                                  xl={10}
                                  style={{ width: '100%', height: '100%' }}
                                >
                                  <Form.Item
                                    {...detail}
                                    name={[detail.name, 'name']}
                                    label={`Variant ${detailIndex + 1}`}
                                    rules={[
                                      {
                                        required: true,
                                        message: `Variant ${
                                          detailIndex + 1
                                        } is required`,
                                      },
                                    ]}
                                  >
                                    <Input
                                      disabled={!!role}
                                      placeholder="Detail Name"
                                    />
                                  </Form.Item>
                                </Col>
                                <Col
                                  xs={24}
                                  sm={10}
                                  md={10}
                                  lg={10}
                                  xl={10}
                                  style={{ width: '100%', height: '100%' }}
                                >
                                  <Form.Item
                                    {...detail}
                                    name={[detail.name, 'price']}
                                    label="Price"
                                    rules={[
                                      {
                                        required: true,
                                        message: `Price ${
                                          detailIndex + 1
                                        } is required`,
                                      },
                                    ]}
                                  >
                                    <InputNumber
                                      disabled={!!role}
                                      prefix="Rp."
                                      style={{ width: '100%' }}
                                      autoComplete="false"
                                      placeholder="Input your product price"
                                      formatter={(value) =>
                                        ` ${value}`
                                          .replace(/\./, ',')
                                          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                                      }
                                      parser={(x) =>
                                        parseFloat(
                                          `${x}`
                                            .replace(/,/, '#')
                                            .replace(/\./g, '')
                                            .replace(/#/, '.')
                                        )
                                      }
                                    />
                                  </Form.Item>
                                </Col>
                                <Col>
                                  <Tooltip
                                    title={`Delete variant ${detailIndex + 1}`}
                                  >
                                    <Button
                                      disabled={!!role}
                                      onClick={() => removeDetail(detail.name)}
                                      color={'red'}
                                      style={{ marginRight: '0.5em' }}
                                      icon={
                                        <DeleteOutlined
                                          style={{ color: 'red' }}
                                        />
                                      }
                                    >
                                      Delete
                                    </Button>
                                  </Tooltip>
                                </Col>
                              </Row>
                            ))}
                            <Button
                              disabled={!!role}
                              type="dashed"
                              block
                              onClick={() => addDetail()}
                              icon={<PlusOutlined />}
                            >
                              Add More Variant
                            </Button>
                          </>
                        )}
                      </Form.List>
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
