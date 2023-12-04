import React from 'react';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Upload,
  message,
  Row,
  Col,
  Select,
} from 'antd';
import useFormProduct from '../Hooks/useFormProduct';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import { getLogin } from '@/utils/sessions';
import { useCreateProduct } from '../Hooks/useGetProduct';

interface IFormUsers {
  handleClose: () => void;
}

export default function FormProduct({ handleClose }: IFormUsers) {
  const [image, setImage] = React.useState<string | null>(null);

  const handleCloseForm = () => {
    handleClose();
    setImage(null);
  };

  const { mutate } = useCreateProduct();

  const { form, isLoading, onFinish, onFinishFailed } = useFormProduct({
    handleCloseForm,
    mutate,
  });

  const props: UploadProps = {
    name: 'file',
    action: 'http://api-panel-dev.omnix.co.id/api/images/upload',
    headers: {
      authorization: `Bearer ${getLogin().token}`,
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        setImage(info.file.originFileObj);
        // console.log('info.file.response.path', info.file.originFileObj);
        form.setFieldValue('productLogo', info.file.response?.data);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload(file: RcFile) {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
  };

  const uploadButton = (
    <div>
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  console.log('form', form.getFieldsValue());

  return (
    <main style={{ width: '100%', height: '100%', overflow: 'scroll' }}>
      <Form
        style={{ marginTop: 20 }}
        autoComplete="off"
        name="basic"
        layout="vertical"
        form={form}
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row
          gutter={[12, 12]}
          style={{
            width: '100%',
            alignItems: 'start',
          }}
        >
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={24}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
              Product Logo
            </div>

            <Form.Item
              name="productLogo"
              rules={[
                {
                  required: true,
                  message: 'Please select insert your product logo!',
                  type: 'object',
                },
              ]}
            >
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                {...props}
              >
                {image ? (
                  <img
                    src={image}
                    alt="productLogo"
                    style={{ width: '100%' }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
              Product ID
            </div>
            <Form.Item
              name="productId"
              hasFeedback
              rules={[{ required: true, message: 'Product id is required' }]}
            >
              <Input
                autoComplete="false"
                placeholder="Input your Product ID"
                name="productId"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
              Product Name
            </div>
            <Form.Item
              name="productName"
              hasFeedback
              rules={[{ required: true, message: 'Product Name is required' }]}
            >
              <Input
                autoComplete="false"
                placeholder="Input your Product Name"
                name="productName"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
              Product Price
            </div>
            <Form.Item
              name="productPrice"
              hasFeedback
              rules={[{ required: true, message: 'Product Price is required' }]}
            >
              <InputNumber
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

          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
              Product Type
            </div>
            <Form.Item
              name="productType"
              hasFeedback
              rules={[{ required: true, message: 'Product Type is required' }]}
            >
              <Select
                style={{ width: '100%' }}
                onChange={handleChange}
                options={[
                  {
                    value: 'PLATFORM',
                    label: 'PLATFORM',
                  },
                  {
                    value: 'CHANNEL',
                    label: 'CHANNEL',
                  },
                ]}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
              Product Category
            </div>
            <Form.Item
              name="productCategory"
              hasFeedback
              rules={[
                { required: true, message: 'Product Category is required' },
              ]}
            >
              <Select
                style={{ width: '100%' }}
                onChange={handleChange}
                options={[
                  {
                    value: 'PLATFORM_OMNIX_SERVICE',
                    label: 'PLATFORM_OMNIX_SERVICE',
                  },
                  {
                    value: 'PLATFORM_OMNIX_SALES',
                    label: 'PLATFORM_OMNIX_SALES',
                  },
                  {
                    value: 'PLATFORM_OMNIX_MARKETING',
                    label: 'PLATFORM_OMNIX_MARKETING',
                  },
                  {
                    value: 'CHANNEL_WHATSAPP',
                    label: 'CHANNEL_WHATSAPP',
                  },
                  {
                    value: 'CHANNEL_TELEGRAM',
                    label: 'CHANNEL_TELEGRAM',
                  },
                ]}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
              Product Description
            </div>
            <Form.Item
              name="description"
              hasFeedback
              rules={[
                { required: true, message: 'Product Description is required' },
              ]}
            >
              <Input.TextArea
                rows={4}
                autoComplete="false"
                placeholder="Input your product description"
                name="description"
              />
            </Form.Item>
          </Col>
        </Row>

        <Button
          type="primary"
          block
          disabled={isLoading}
          htmlType="submit"
          style={{ fontSize: 14, fontWeight: 700 }}
        >
          {!isLoading ? 'Tambah Product' : 'Loading ....'}
        </Button>
      </Form>
    </main>
  );
}
