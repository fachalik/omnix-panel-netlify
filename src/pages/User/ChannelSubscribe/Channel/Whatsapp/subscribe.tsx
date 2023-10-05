import React from 'react';
import { Divider, Button, Breadcrumb, Form, Input, Timeline } from 'antd';

import { settingWhatsapp, generateOauth } from '@/service/whatsapp';
import thirdPartyLogin from '@/lib/third-party-login';
import WhatsappImg from '@/assets/icons/whatsapp.svg';

export default function Page() {
  type FieldType = {
    setting_name?: string;
  };

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onFinish = async (values: any) => {
    await setIsLoading(true);
    const payload = {
      ...values,
      callback_url:
        'https://omnixpanel-api.libra.studio/api/v1/setting-whatsapp/callback',
      stream_url:
        'https://omnixpanel-api.libra.studio/api/v1/setting-whatsapp/stream',
      redirect_url: 'https://omnix-panel.netlify.app/',
    };
    const setWA: any = await settingWhatsapp(payload).catch((err) =>
      alert(err)
    );

    const GOAuth = {
      config_id: setWA.config_id,
      callback_url:
        'https://omnixpanel-api.libra.studio/api/v1/setting-whatsapp/callback',
      stream_url:
        'https://omnixpanel-api.libra.studio/api/v1/setting-whatsapp/stream',
      redirect_url: 'https://omnix-panel.netlify.app/',
    };

    const auth = await generateOauth(GOAuth);

    if (auth) {
      await thirdPartyLogin(auth.subscribe_url);
    }
    await setIsLoading(false);
  };

  return (
    <div>
      <Breadcrumb
        separator=">"
        style={{ marginBottom: '1em' }}
        items={[
          {
            href: '/channel-subscription',
            title: 'Channel Subscription',
          },
          {
            href: '/channel-subscription/whatsapp',
            title: 'Whatsapp',
          },
          {
            title: 'Subscribe',
          },
        ]}
      />
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
          <img src={WhatsappImg} alt="omnix-whatsapp" width={30} height={30} />
          <div style={{ fontSize: 20, fontWeight: 'bold' }}>Whatsapp</div>
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
        onFinish={onFinish}
        autoComplete="off"
      >
        <Timeline style={{ textAlign: 'start' }}>
          <Timeline.Item>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600 }}>Step 1</p>
              <p style={{ fontSize: 16, fontWeight: 700 }}>
                Masukkan setting name untuk whatsapp anda
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
                    len: 7,
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
                Hubungkan akun bisnis WhatsApp Anda
              </p>
              <p style={{ fontSize: 14, fontWeight: 400 }}>
                Hubungkan akun bisnis WhatsApp Anda
              </p>
              <Form.Item style={{ marginTop: '1em' }}>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  disabled={isLoading}
                >
                  {!isLoading
                    ? 'Subscription Whatsapp by Omnix'
                    : 'Loading ...'}
                </Button>
              </Form.Item>
            </div>
          </Timeline.Item>
        </Timeline>
      </Form>
    </div>
  );
}
