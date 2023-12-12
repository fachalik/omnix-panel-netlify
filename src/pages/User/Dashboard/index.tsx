import { Tabs } from 'antd';

import TrafficSummary from './TrafficSummary';
import UsageSummary from './UsageSummary';
import Content from '@/layouts/Dashboard/Content';

export default function Dashboard() {
  return (
    <Content>
      <Tabs
        items={[
          {
            label: 'Usage Summary',
            key: 'channel',
            children: <UsageSummary />,
          },
          {
            label: 'Traffic Summary',
            key: 'explore',
            children: <TrafficSummary />,
          },
        ]}
        tabBarStyle={{
          marginLeft: 10,
          marginRight: 10,
        }}
      />
    </Content>
  );
}
