import React from 'react';
import { Select, Space, Tabs, Empty } from 'antd';

import MemberProduct from '../components/MemberProduct';
import DefaultSchemaProduct from '../components/DefaultSchemaProduct';
import ResellerProduct from '../components/ResellerProduct';

import { useGetMemberAllNoPaginate } from '@/hooks/ReactQuery/reseller/useGetMember';

import { getLogin } from '@/utils/sessions';

export default function NonProduct() {
  const [selectedMember, setSelectedMember] = React.useState({
    label: '',
    value: '',
  });

  const [selectedReseller, setSelectedReseller] = React.useState({
    label: '',
    value: '',
  });

  const handleChangeMember = (_: string, option: any) => {
    setSelectedMember(option);
  };

  const handleChangeReseller = (_: string, option: any) => {
    setSelectedReseller(option);
  };

  const { data: dataMember, isLoading: isLoadingMember } =
    useGetMemberAllNoPaginate({
      token: getLogin()?.token ?? '',
      role: 'REGULER',
      is_not_paginate: '1',
    });

  const { data: dataReseller, isLoading: isLoadingReseller } =
    useGetMemberAllNoPaginate({
      token: getLogin()?.token ?? '',
      role: 'RESELLER',
      is_not_paginate: '1',
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
                onChange={handleChangeMember}
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
              {selectedMember.value !== '' && (
                <Space
                  direction="vertical"
                  size="middle"
                  style={{
                    display: 'flex',
                    marginTop: 20,
                  }}
                >
                  <MemberProduct user_data={selectedMember} />
                </Space>
              )}
              {selectedMember?.value == '' && (
                <Empty
                  style={{ marginTop: 20 }}
                  description={<span>Please Select member</span>}
                ></Empty>
              )}
            </div>
          ),
        },
        {
          label: 'Reseller',
          key: 'reseller',
          children: (
            <div style={{ marginLeft: 10, marginRight: 10 }}>
              <div
                style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}
              >
                Select Reseller
              </div>
              <Select
                loading={isLoadingReseller}
                showSearch
                style={{ width: '100%' }}
                onChange={handleChangeReseller}
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
                options={dataReseller}
              />
              {selectedReseller.value !== '' && (
                <Space
                  direction="vertical"
                  size="middle"
                  style={{
                    display: 'flex',
                    marginTop: 20,
                  }}
                >
                  <ResellerProduct user_data={selectedReseller} />
                </Space>
              )}
              {selectedReseller?.value == '' && (
                <Empty
                  style={{ marginTop: 20 }}
                  description={<span>Please Select reseller</span>}
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
