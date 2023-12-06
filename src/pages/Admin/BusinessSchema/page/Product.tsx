import React from 'react';
import { Select, Space, Tabs, Empty } from 'antd';

import MemberProduct from '../components/MemberProduct';
import DefaultSchemaProduct from '../components/DefaultSchemaProduct';

import { useGetMemberNotPaginateNoReferralCode } from '@/hooks/ReactQuery/reseller/useGetMember';

import { getLogin } from '@/utils/sessions';

export default function NonProduct() {
  const [selectedMember, setSelectedMember] = React.useState('');

  const handleChange = (value: string) => {
    setSelectedMember(value);
  };

  const { data: dataMember, isLoading: isLoadingMember } =
    useGetMemberNotPaginateNoReferralCode({
      token: getLogin()?.token ?? '',
    });

  return (
    <Tabs
      style={{ marginTop: 20 }}
      items={[
        {
          label: 'Default Business Schema',
          key: 'default-business-schema',
          children: <DefaultSchemaProduct />,
        },
        {
          label: 'Member',
          key: 'member',
          children: (
            <div style={{ marginLeft: 10, marginRight: 10 }}>
              <div
                style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}
              >
                Select Member
              </div>
              <Select
                loading={isLoadingMember}
                showSearch
                style={{ width: '100%' }}
                onChange={handleChange}
                defaultValue={''}
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  (option?.label.toLowerCase() ?? '').includes(
                    input.toLowerCase()
                  )
                }
                filterSort={(optionA: any, optionB: any) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={dataMember}
              />
              {selectedMember ? (
                <Space
                  direction="vertical"
                  size="middle"
                  style={{
                    display: 'flex',
                    marginTop: 20,
                  }}
                >
                  <MemberProduct id_user={selectedMember} />
                </Space>
              ) : (
                <Empty
                  style={{ marginTop: 20 }}
                  description={<span>Please Select Member</span>}
                ></Empty>
              )}
            </div>
          ),
        },
      ]}
      tabBarStyle={{
        marginLeft: 10,
        marginRight: 10,
      }}
    />
  );
}
