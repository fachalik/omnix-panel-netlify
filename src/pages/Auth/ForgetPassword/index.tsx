import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import FormForgetPassword from '@/components/ForgetPassword/Form/FormForgetPassword';
import AuthLayout1 from '@/layouts/NoLayout/AuthLayout1';

export default function ForgetPassword() {
  const navigate = useNavigate();
  return (
    <AuthLayout1>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <p
          style={{
            fontSize: '20px',
            fontWeight: '700',
            marginBottom: '1em',
          }}
        >
          Atur Ulang Kata Sandi
        </p>

        <FormForgetPassword />

        <div
          style={{
            marginTop: '1em',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            style={{
              float: 'left',
              fontSize: 12,
              textDecoration: 'underline',
            }}
            onClick={() => navigate('/')}
          >
            Kembali ke halamanm login
          </Button>
        </div>
      </div>
    </AuthLayout1>
  );
}
