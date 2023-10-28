import { Button, Form, Input, Select } from 'antd';

export default function FormAccountEdit() {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  type FieldType = {
    displayName?: any;
    phoneNumber?: any;
    displayProfile?: any;
    description?: any;
    email?: any;
    address?: any;
    website?: any;
    // accountName?: any;
    // waBusinnesID?: any;
    // key?: any;
    // endpointText?: any;
  };
  return (
    <div>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Display Name"
          name="displayName"
          rules={[
            { required: true, message: 'Please input your display name!' },
          ]}
        >
          <Input placeholder="Enter Displau Name" />
        </Form.Item>
        <Form.Item<FieldType>
          label="Description"
          name="description"
          rules={[
            { required: true, message: 'Please input your description!' },
          ]}
        >
          <Input placeholder="Enter Description" />
        </Form.Item>
        <Form.Item<FieldType>
          label="Display Profile"
          name="displayProfile"
          rules={[
            { required: true, message: 'Please input your display profile!' },
          ]}
        >
          <Input placeholder="Enter Display Profile" />
        </Form.Item>
        <Form.Item<FieldType> label="Display Profile" name="displayProfile">
          <Select placeholder="Select Display Profile">
            <Select.Option value={1}>1</Select.Option>
            <Select.Option value={2}>2</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email' }]}
        >
          <Input type="email" placeholder="Enter Email" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input your address!' }]}
        >
          <Input placeholder="Enter Address" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Website"
          name="website"
          rules={[{ required: true, message: 'Please input your website!' }]}
        >
          <Input placeholder="Enter Website" />
        </Form.Item>
        <div
          style={{
            width: '90%',
            position: 'absolute',
            bottom: 0,
            padding: 10,
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            backgroundColor: '#fff',
          }}
        >
          <Button type="primary">Submit</Button>
          <Button>Cancel</Button>
        </div>
      </Form>
    </div>
  );
}
