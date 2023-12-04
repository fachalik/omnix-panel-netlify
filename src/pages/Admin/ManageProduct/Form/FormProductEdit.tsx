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
} from 'antd';
import useFormProduct from '../Hooks/useFormProduct';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import { getLogin } from '@/utils/sessions';
import { usePatchProduct } from '../Hooks/useGetProduct';

interface IFormUsers {
  handleClose: () => void;
  data: any;
}

export default function FormProductEdit({ handleClose, data }: IFormUsers) {
  const [image, setImage] = React.useState<string | null>(null);

  const handleCloseForm = () => {
    handleClose();
    setImage(null);
  };

  const { mutate } = usePatchProduct();

  const { form, isLoading, onFinish, onFinishFailed } = useFormProduct({
    handleCloseForm,
    mutate,
    id: data?.id ?? '',
  });

  const init: any = {
    productId: data?.productId ?? '',
    productName: data?.productName ?? '',
    productDescription: data?.productDescription ?? '',
    productUnit: data?.productUnit ?? '',
    productPrice: data?.productPrice ? parseInt(data?.productPrice) : '',
    productLogo: data?.productLogo ? data?.productLogo : {},
  };

  React.useEffect(() => {
    let isMount = true;

    if (isMount) {
      form.setFieldsValue(init);
      setImage(data?.productLogo?.path);
    }

    return () => {
      isMount = false;
    };
  }, [data]);

  form.setFieldsValue(init);

  const props: UploadProps = {
    name: 'file',
    action: 'https://omnixpanel-api2.libra.studio/api/v1/files/upload',
    headers: {
      authorization: `Bearer ${getLogin().token}`,
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file);
        setImage(info.file.response.path);
        form.setFieldValue('productLogo', info.file.response);
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

  return (
    <main style={{ width: '100%', height: '100%', overflow: 'scroll' }}>
      <Form
        style={{ marginTop: 20 }}
        autoComplete="off"
        name="basic"
        layout="vertical"
        form={form}
        initialValues={init}
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
              Product Unit
            </div>
            <Form.Item
              name="productUnit"
              hasFeedback
              rules={[{ required: true, message: 'Product Unit is required' }]}
            >
              <Input
                autoComplete="false"
                placeholder="Input your product unit"
                name="productUnit"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
              Product Description
            </div>
            <Form.Item
              name="productDescription"
              hasFeedback
              rules={[
                { required: true, message: 'Product Description is required' },
              ]}
            >
              <Input.TextArea
                rows={4}
                autoComplete="false"
                placeholder="Input your product description"
                name="productDescription"
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
          {!isLoading ? 'Edit Product' : 'Loading ....'}
        </Button>
      </Form>
    </main>
  );
}