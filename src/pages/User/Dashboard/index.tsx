import { Tabs } from 'antd';

import TrafficSummary from './TrafficSummary';
import UsageSummary from './UsageSummary';

export default function Dashboard() {
  return (
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
    ></Tabs>
  );
}
