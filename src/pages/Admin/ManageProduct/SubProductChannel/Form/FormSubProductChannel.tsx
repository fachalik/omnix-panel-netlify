import { Button, Form, Input, Row, Col } from 'antd';
import useFormSubProductChannel from '../Hooks/useFormSubProductChannel';
import { useCreateSubProductChannelAdmin } from '../Hooks/useGetSubProductChannelAdmin';

interface IFormUsers {
  handleClose: () => void;
}

export default function FormSubProductChannel({ handleClose }: IFormUsers) {
  const handleCloseForm = () => {
    handleClose();
  };

  const { mutate } = useCreateSubProductChannelAdmin();

  const { form, isLoading, onFinish, onFinishFailed } =
    useFormSubProductChannel({
      handleCloseForm,
      mutate,
    });

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
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
              Channel ID
            </div>
            <Form.Item
              name="channelId"
              hasFeedback
              rules={[{ required: true, message: 'Channel id is required' }]}
            >
              <Input
                autoComplete="false"
                placeholder="Input your Channel ID"
                name="channelId"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
              Channel Name
            </div>
            <Form.Item
              name="channelName"
              hasFeedback
              rules={[{ required: true, message: 'Channel Name is required' }]}
            >
              <Input
                autoComplete="false"
                placeholder="Input your Channel Name"
                name="channelName"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
              Channel Description
            </div>
            <Form.Item
              name="channelDescription"
              hasFeedback
              rules={[
                { required: true, message: 'Channel Description is required' },
              ]}
            >
              <Input.TextArea
                rows={4}
                autoComplete="false"
                placeholder="Input your Channel description"
                name="channelDescription"
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
