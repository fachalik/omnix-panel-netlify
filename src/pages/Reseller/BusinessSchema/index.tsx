import { Tabs } from 'antd';
import TabMember from './page/TabMember';
import TabDefaultSchema from './page/TabDefaultSchema';
import Content from '@/layouts/Dashboard/Content';
export default function NonProduct() {
  return (
    <Content>
      <Tabs
        style={{ marginTop: 20 }}
        items={[
          {
            label: 'Default Business Schema',
            key: 'default-business-schema',
            children: <TabDefaultSchema />,
          },
          {
            label: 'Member',
            key: 'member',
            children: <TabMember />,
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
