import { Card, Tabs } from 'antd';

import ActiveProduct from '@/components/ProductActivation/ActiveProduct';
// import ExploreProduct from '@/components/ProductActivation/ExploreProduct';
// import ExploreOrder from '@/components/ProductActivation/ExploreOrder';

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
