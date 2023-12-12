import { Card, Tabs } from 'antd';

import ExploreProduct from '@/components/ProductActivation/ExploreProduct';
import ActiveProduct from '@/components/ProductActivation/ActiveProduct';
import ExploreOrder from '@/components/ProductActivation/ExploreOrder';
import Content from '@/layouts/Dashboard/Content';

export default function Page() {
  return (
    <Content>
      <Card>
        <Tabs
          items={[
            {
              label: 'Your Activated Product',
              key: 'channel',
              children: <ActiveProduct />,
            },
            {
              label: 'Explore Product',
              key: 'explore',
              children: <ExploreProduct />,
            },
            {
              label: 'Order Product',
              key: 'order',
              children: <ExploreOrder />,
            },
          ]}
          tabBarStyle={{
            marginLeft: 10,
            marginRight: 10,
          }}
        ></Tabs>
      </Card>
    </Content>
  );
}
