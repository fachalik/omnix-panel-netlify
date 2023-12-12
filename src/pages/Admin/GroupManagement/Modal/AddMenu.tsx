import React from 'react';
import { Button, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useGetPermissionMenu } from '../Hooks/usePermissionMenu';
import { getLogin } from '@/utils/sessions';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { palette } from '@/theme/themeConfig';
import moment from 'moment';
import Drawer from '@/components/Drawer';

import FormAddMenu from '../Form/FormAddMenu';
import FormEditMenu from '../Form/FormEditMenu';

export default function AddMenu({ id }: { id: string }) {
  const [addMenu, setAddMenu] = React.useState<boolean>(false);

  const [editMenu, seteditMenu] = React.useState<boolean>(false);

  const { data, isLoading, isSuccess, isError, error }: any =
    useGetPermissionMenu({
      token: getLogin()?.token ?? '',
      limit: 10,
      page: 1,
      group_id: id,
    });

  const columns: ColumnsType<any> = [
    {
      key: 'menu',
      title: 'Menu',
      dataIndex: 'menu',
      render: (_, record: any) => {
        return <p>{record?.menu_id[0]?.label}</p>;
      },
    },

    {
      key: 'path',
      title: 'Path',
      dataIndex: 'path',
      render: (_, record: any) => {
        return <p style={{ width: 150 }}>{record?.menu_id[0]?.path}</p>;
      },
    },
    {
      key: 'icon',
      title: 'Icon',
      dataIndex: 'icon',
      render: (_, record: any) => {
        return (
          <Tag color={palette.primary.main}>
            <div className={record?.menu_id[0]?.icon} />
          </Tag>
        );
      },
    },
    {
      key: 'createdAt',
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (_, record: any) => {
        return (
          <Tag color={palette.primary.main}>
            {record?.createdAt ? moment(record?.createdAt).format('LLL') : '-'}
          </Tag>
        );
      },
    },
    {
      key: 'updatedAt',
      title: 'Updated At',
      dataIndex: 'updatedAt',
      render: (_, record: any) => {
        return (
          <Tag color={palette.primary.main}>
            {record?.updatedAt ? moment(record?.updatedAt).format('LLL') : '-'}
          </Tag>
        );
      },
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Button type="primary" onClick={() => setAddMenu(true)}>
          Add Menu
        </Button>
        <Button
          style={{ marginLeft: 10 }}
          type="primary"
          onClick={() => seteditMenu(true)}
        >
          Edit Menu
        </Button>
      </div>
      <div style={{ marginTop: '1em', overflow: 'auto' }}>
        {isLoading && <Loading />}
        {isSuccess && data && (
          <Table
            loading={isLoading}
            style={{ marginTop: 10, paddingBottom: 20 }}
            columns={columns}
            dataSource={data.data}
          />
        )}
        {!isLoading && isError && <Error error={error} />}
      </div>
      <Drawer onClose={() => setAddMenu(false)} open={addMenu} title="Add Menu">
        <FormAddMenu handleClose={() => setAddMenu(false)} id={id} />
      </Drawer>
      <Drawer
        onClose={() => seteditMenu(false)}
        open={editMenu}
        title="Edit Menu"
      >
        {isSuccess && data && (
          <FormEditMenu
            handleClose={() => seteditMenu(false)}
            id={id}
            data={data.data}
          />
        )}
      </Drawer>
      {/* <Modal
        title="Add Group"
        isModalOpen={IsModalCreate}
        handleCancel={handleCancelCreate}
      >
        <FormAddGroup handleClose={handleCancelCreate} />
      </Modal>

      <Modal
        title="Edit Group"
        isModalOpen={IsModalEdit}
        handleCancel={handleCancelEdit}
      >
        <FormEditGroup handleClose={handleCancelEdit} data={editData} />
      </Modal>

      <Modal
        title="Add Menu"
        isModalOpen={IsMenu}
        handleCancel={handleCancelManu}
      >
        <AddMenu />
      </Modal> */}
    </div>
  );
}
