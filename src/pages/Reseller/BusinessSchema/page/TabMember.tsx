import React from 'react';
import { Select, Space, Button, Empty } from 'antd';

import NoProductPageMember from './NonProductMember';
import ProductMember from './ProductMember';
import { useGetMemberNotPaginate } from '@/hooks/ReactQuery/reseller/useGetMember';

import { getLogin } from '@/utils/sessions';
import { useAuthStore } from '@/store';

export default function TabMember() {
  const { user } = useAuthStore((state) => state);
  const [selectedMember, setSelectedMember] = React.useState('');
  const [schema, setSchema] = React.useState('platform');

  const handleChange = (value: string) => {
    setSelectedMember(value);
  };

  const { data: dataMember, isLoading: isLoadingMember } =
    useGetMemberNotPaginate({
      token: getLogin()?.token ?? '',
      page: 1,
      limit: 100,
      id: user?._id,
      is_not_paginate: '1',
    });

  return (
    <div style={{ marginLeft: 10, marginRight: 10 }}>
      <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>
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
          (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())
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
          <div
            style={{
              marginBottom: '1em',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
            }}
          >
            <div
              style={{
                marginBottom: '1em',
                display: 'flex',
                alignItems: 'start',
              }}
            >
              <Button
                onClick={() => setSchema('platform')}
                disabled={schema === 'platform'}
              >
                Platform
              </Button>
              <Button
                disabled={schema === 'non-platform'}
                onClick={() => setSchema('non-platform')}
                style={{ marginLeft: '1em' }}
              >
                Non Platform
              </Button>
            </div>
          </div>

          {schema === 'platform' && <ProductMember id_user={selectedMember} />}
          {schema === 'non-platform' && (
            <NoProductPageMember id_user={selectedMember} />
          )}
        </Space>
      ) : (
        <Empty
          style={{ marginTop: 20 }}
          description={<span>Please Select Member</span>}
        ></Empty>
      )}

    </div>
  );
}
