import { Card, Tabs } from 'antd';
import ResellerTenant from './ResellerTenant';
import ResellerProduct from './ResellerProduct';
import Content from '@/layouts/Dashboard/Content';

export default function ManageTenant() {
  return (
    <Content>
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
    </Content>
  );
}
