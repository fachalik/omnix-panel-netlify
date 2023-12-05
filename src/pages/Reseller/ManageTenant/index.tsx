import { Card, Tabs } from 'antd';
import ResellerTenant from './ResellerTenant';
import ResellerProduct from './ResellerProduct';

export default function ManageTenant() {
  return (
    <div>
      <Card>
        <Tabs
          items={[
            {
              label: 'Your Tenant',
              key: 'yout-tenant',
              children: <ResellerTenant />,
            },
            {
              label: 'Your Product',
              key: 'yout-product',
              children: <ResellerProduct />,
            },
          ]}
          tabBarStyle={{
            marginLeft: 10,
            marginRight: 10,
          }}
        />
      </Card>
    </div>
  );
}
