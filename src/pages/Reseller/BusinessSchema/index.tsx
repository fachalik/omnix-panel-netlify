import React from 'react';
import { Select, Tabs, Empty } from 'antd';
// import { EditTwoTone } from '@ant-design/icons';
// import { formatRupiah } from '@/utils/utilitys';
// import whatsappIcon from '@/assets/icons/whatsapp.svg';
// import VoiceDashboard from '@/assets/icons/VoiceDashboard.svg';
// import smsIcon from '@/assets/icons/sms.svg';

import NoProductPage from './page/NonProduct';
import Product from './page/Product';

export default function NonProduct() {
  const [selectedMember, setSelectedMember] = React.useState('');
  // const data: any = [
  //   {
  //     name: 'Whatsapp',
  //     img: whatsappIcon,
  //     schema: [
  //       {
  //         label: 'Per Outgoing Utility Message',
  //         value: 0,
  //       },
  //       {
  //         label: 'Per Outgoing Auth Message',
  //         value: 0,
  //       },
  //       {
  //         label: 'Per Outgoing Marketing Message',
  //         value: 0,
  //       },
  //     ],
  //   },
  //   {
  //     name: 'SMS',
  //     img: smsIcon,
  //     schema: [
  //       {
  //         label: 'Per Outgoing Message',
  //         value: 0,
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Voice',
  //     img: VoiceDashboard,
  //     schema: [
  //       {
  //         label: 'Per Phone Duration in minutes',
  //         value: 0,
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Video Call',
  //     img: VoiceDashboard,
  //     schema: [
  //       {
  //         label: 'Per video call duration in minutes',
  //         value: 0,
  //       },
  //     ],
  //   },
  // ];

  const handleChange = (value: string) => {
    setSelectedMember(value);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}
      >
        <h3>Business schema</h3>
      </div>
      <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>
        Select Member
      </div>
      <Select
        showSearch
        style={{ width: '100%' }}
        onChange={handleChange}
        optionFilterProp="children"
        filterOption={(input: any, option: any) =>
          (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())
        }
        filterSort={(optionA: any, optionB: any) =>
          (optionA?.label ?? '')
            .toLowerCase()
            .localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={[
          {
            value: '',
            label: '--select member--',
          },
          {
            value: 'member 1',
            label: 'member 1',
          },
          {
            value: 'member 2',
            label: 'member 2',
          },
        ]}
      />

      {selectedMember ? (
        <Tabs
          style={{ marginTop: 20 }}
          items={[
            {
              label: 'Product',
              key: 'product',
              children: <Product />,
            },
            {
              label: 'Non Product',
              key: 'non-product',
              children: <NoProductPage />,
            },
          ]}
          tabBarStyle={{
            marginLeft: 10,
            marginRight: 10,
          }}
        />
      ) : (
        <Empty
          style={{ marginTop: 20 }}
          description={<span>Please Select Member</span>}
        ></Empty>
      )}
    </div>
  );
}
