import { MailOutlined } from '@ant-design/icons';
import { palette } from '@/theme/themeConfig';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import AuthLayout3 from '@/layouts/NoLayout/AuthLayout3';

export default function Verif() {
  const navigate = useNavigate();
  return (
    <AuthLayout3>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <MailOutlined
          style={{ fontSize: '64px', color: palette.primary.main }}
        />
        <p style={{ fontWeight: 700, fontSize: 20, marginBottom: '1em' }}>
          Please verify your email
        </p>
        <p style={{ fontWeight: 600, fontSize: 14, textAlign: 'center' }}>
          {`We sent an email.`}
          <br />
          {`Please check your email.`}
        </p>
        <Button
          onClick={() => navigate('/')}
          type="primary"
          style={{ marginTop: '1em' }}
          block
        >
          Back to login
        </Button>
      </div>
    </AuthLayout3>
  );
}
