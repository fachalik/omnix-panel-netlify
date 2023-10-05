import { Steps, Breadcrumb } from 'antd';
import { useActivatedProduct } from '@/store';
import Step1 from '@/components/ActivatedProduct/Step1';
import Step2 from '@/components/ActivatedProduct/Step2';
import Step3 from '@/components/ActivatedProduct/Step3';

function Page() {
  const { currentState } = useActivatedProduct((state) => state);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'start',
        flexDirection: 'column',
      }}
    >
      <Breadcrumb
        separator=">"
        style={{ marginBottom: '2em' }}
        items={[
          {
            href: '/product-activation',
            title: 'Product Activation',
          },
          {
            href: '',
            title: 'Active Product',
          },
        ]}
      />
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Steps
          current={currentState}
          items={[
            {
              title: 'Choose Package',
            },
            {
              title: 'Summary Order',
            },
            {
              title: 'Payment',
            },
          ]}
        />

        {currentState === 1 && <Step1 />}

        {currentState === 2 && <Step2 />}

        {currentState === 3 && <Step3 />}
      </div>
    </div>
  );
}

export default Page;
