import { Card, Tabs } from 'antd';
import CardItemChannel from '@/components/AllCard/CardItemChannel';
import ExploreChannel from '@/components/ExploreChannel';

export default function Page() {
  const dataChannel = [
    {
      icon: '/icons/whatsapp.svg',
      package_name: 'Whatsapp',
      package_type: 'Platform',
      channelName: 'OMNIX Official',
      totalAccount: 2,
      createdAt: new Date(),
    },
    // {
    //   icon: '/icons/facebook.svg',
    //   package_name: 'Facebook',
    //   package_type: 'Platform',
    //   channelName: 'OMNIX Official',
    //   totalAccount: 2,
    //   createdAt: new Date(),
    // },
    // {
    //   icon: '/icons/instagram.svg',
    //   package_name: 'Instagram',
    //   package_type: 'Platform',
    //   channelName: 'OMNIX Official',
    //   totalAccount: 5,
    //   createdAt: new Date(),
    // },
  ];

  return (
    <div>
      <Card>
        <Tabs
          items={[
            {
              label: 'Your Channel',
              key: 'channel',
              children: dataChannel.map((item: any, idx: number) => {
                return <CardItemChannel item={item} key={idx} />;
              }),
            },
            {
              label: 'Explore Channel',
              key: 'explore',
              children: <ExploreChannel />,
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
