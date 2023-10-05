import { Card, Tabs } from 'antd';

import ExploreProduct from '@/components/ProductActivation/ExploreProduct';
import ActiveProduct from '@/components/ProductActivation/ActiveProduct';
import ExploreOrder from '@/components/ProductActivation/ExploreOrder';

export default function Page() {
  return (
    <div>
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
    </div>
  );
}
