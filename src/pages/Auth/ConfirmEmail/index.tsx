import React from 'react';
import {
  MailOutlined,
  ExclamationCircleOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { palette } from '@/theme/themeConfig';
import { Button } from 'antd';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { confirmEmail } from '@/service/auth';
import AuthLayout3 from '@/layouts/NoLayout/AuthLayout3';

export default function ConfirmEmail() {
  const [isSuccess, setIsSuccess] = React.useState<any>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hash = searchParams.get('hash');

  const emailConfirm = async () => {
    const payload = {
      hash,
    };
    await confirmEmail(payload)
      .then(() => {
        setIsSuccess(true);
      })
      .catch(() => {
        setIsSuccess(false);
      });
  };

  return (
    <AuthLayout3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {hash && isSuccess === null && (
          <>
            <MailOutlined
              style={{ fontSize: '64px', color: palette.primary.main }}
            />
            <p style={{ fontWeight: 700, fontSize: 20, marginBottom: '1em' }}>
              Please verify your email
            </p>
            <p style={{ fontWeight: 600, fontSize: 14, textAlign: 'center' }}>
              {`Click button below to verify your email`}
            </p>
            <Button
              onClick={() => emailConfirm()}
              type="primary"
              style={{ marginTop: '1em' }}
              block
            >
              Confirm Email
            </Button>
          </>
        )}
        {isSuccess === false && (
          <>
            <ExclamationCircleOutlined
              style={{ fontSize: '64px', color: 'red' }}
            />
            <p style={{ fontWeight: 700, fontSize: 20, marginBottom: '1em' }}>
              Email unsuccess verify
            </p>
            <p style={{ fontWeight: 600, fontSize: 14, textAlign: 'center' }}>
              {`your email has been verified previously`}
            </p>
            <Button
              onClick={() => navigate('/')}
              type="primary"
              style={{ marginTop: '1em' }}
              block
            >
              Back to login
            </Button>
          </>
        )}

        {isSuccess === true && (
          <>
            <CheckOutlined style={{ fontSize: '64px', color: 'green' }} />
            <p style={{ fontWeight: 700, fontSize: 20, marginBottom: '1em' }}>
              Email success verify
            </p>
            <p style={{ fontWeight: 600, fontSize: 14, textAlign: 'center' }}>
              {`your email has been verified`}
            </p>
            <Button
              onClick={() => navigate('/')}
              type="primary"
              style={{ marginTop: '1em' }}
              block
            >
              Back to login
            </Button>
          </>
        )}
        <div></div>
      </div>
    </AuthLayout3>
  );
}
