import React from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import AuthLayout3 from '@/layouts/NoLayout/AuthLayout3';

export default function Verif() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');

  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(searchParams.entries());

    if (params?.email) {
      setEmail(params.email);
    }
  }, []);

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
        <CheckOutlined style={{ fontSize: '64px', color: 'green' }} />
        <p style={{ fontWeight: 700, fontSize: 20, marginBottom: '1em' }}>
          {`Register for email ${email} success`}
        </p>
        <p style={{ fontWeight: 600, fontSize: 14, textAlign: 'center' }}>
          {`Please wait until admin approved your applicant. thank's 🙏`}
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
