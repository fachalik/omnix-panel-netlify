import { Button, Form, Input, Select } from 'antd';

function FormAccount() {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  type FieldType = {
    accountName?: any;
    phoneNumber?: any;
    waBusinnesID?: any;
    key?: any;
    endpointText?: any;
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
          label="Account name"
          name="accountName"
          rules={[
            { required: true, message: 'Please input your account name!' },
          ]}
        >
          <Input placeholder="Enter Account Name" />
        </Form.Item>
        <Form.Item<FieldType>
          label="Phone number"
          name="phoneNumber"
          rules={[
            { required: true, message: 'Please input your phone number!' },
          ]}
        >
          <Input placeholder="Enter Phone Number" />
        </Form.Item>
        <Form.Item<FieldType>
          label="Wa Businness ID"
          name="waBusinnesID"
          rules={[
            { required: true, message: 'Please input your Wa Businness ID!' },
          ]}
        >
          <Input placeholder="Enter WA Businness" />
        </Form.Item>
        <Form.Item<FieldType>
          label="Key"
          name="key"
          //   rules={[
          //     { required: true, message: "Please input your Wa Businness ID!" },
          //   ]}
        >
          <Select placeholder="Select WA Businness">
            <Select.Option value={1}>1</Select.Option>
            <Select.Option value={2}>2</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item<FieldType>
          label="Endpoint Text"
          name="endpointText"
          rules={[
            { required: true, message: 'Please input your Endpoint Text!' },
          ]}
        >
          <Input placeholder="Enter Endpoint Text" />
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

export default FormAccount;
