import { Card, Button } from 'antd';
import { useActivatedProduct } from '@/store';
import { useNavigate } from 'react-router-dom';
import moneyState from '@/assets/image/moneyState.png';

function Step3() {
  const navigate = useNavigate();
  const { reset } = useActivatedProduct((state) => state);

  return (
    <div style={{ marginTop: '5em' }}>
      <Card style={{ width: '41em', padding: '2em' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src={moneyState}
            alt="money-state"
            width={300}
            height={300}
            style={{
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'top',
            }}
          />
          <p style={{ textAlign: 'center', fontSize: 14, fontWeight: 600 }}>
            Waiting for payment! Please complete the
            <br /> payment to immediately use the product
          </p>
        </div>
      </Card>
      <Button
        style={{ marginTop: '1.5em' }}
        block
        type="primary"
        onClick={() => {
          navigate('/product-activation');
          reset();
        }}
      >
        Back to Product Activation
      </Button>
    </div>
  );
}

export default Step3;
