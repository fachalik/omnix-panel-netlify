import { Divider, Button, Form, Input, Timeline } from 'antd';
import FacebookImg from '@/assets/icons/facebook.svg';
import Content from '@/layouts/Dashboard/Content';
import HeaderSection from '@/components/HeaderSection';
export default function Page() {
  type FieldType = {
    setting_name?: string;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
      <HeaderSection
        isBack
        item={[
          {
            href: '/channel-subscription',
            title: 'Channel Subscription',
          },
          {
            href: '/channel-subscription/facebook',
            title: 'Facebook',
          },
          {
            title: 'Subscribe',
          },
        ]}
      />

      <Content>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
              marginBottom: 10,
            }}
          >
            <img
              src={FacebookImg}
              alt="omnix-whatsapp"
              width={30}
              height={30}
            />
            <div style={{ fontSize: 20, fontWeight: 'bold' }}>Facebook</div>
            <div>by Omnix</div>
          </div>
        </div>
        <Divider />
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={() => {}}
          autoComplete="off"
        >
          <Timeline style={{ textAlign: 'start' }}>
            <Timeline.Item>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600 }}>Step 1</p>
                <p style={{ fontSize: 16, fontWeight: 700 }}>
                  Masukkan setting name untuk Facebook anda
                </p>
                <div
                  style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}
                >
                  Setting Name
                </div>
                <Form.Item<FieldType>
                  style={{ marginTop: '1em' }}
                  name="setting_name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your setting name!',
                    },
                  ]}
                >
                  <Input placeholder="please input your setting name" />
                </Form.Item>
              </div>
            </Timeline.Item>
            <Timeline.Item>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600 }}>Step 2</p>
                <p style={{ fontSize: 16, fontWeight: 700 }}>
                  Hubungkan akun bisnis Facebook Anda
                </p>
                <p style={{ fontSize: 14, fontWeight: 400 }}>
                  Hubungkan akun bisnis Facebook Anda
                </p>
                <Form.Item style={{ marginTop: '1em' }}>
                  <Button block type="primary" htmlType="submit">
                    Subscription Facebook by Omnix
                  </Button>
                </Form.Item>
              </div>
            </Timeline.Item>
          </Timeline>
        </Form>
      </Content>
    </div>
  );
}
