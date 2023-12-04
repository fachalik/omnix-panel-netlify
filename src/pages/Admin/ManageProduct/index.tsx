import React from 'react';
import { Button, Table, Popconfirm, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useGetProduct, useDestroyProduct } from './Hooks/useGetProduct';
import { getLogin } from '@/utils/sessions';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { DeleteOutlined } from '@ant-design/icons';
import Modal from '@/components/Modal';
import FormProduct from './Form/FormProduct';

import { useAuthStore } from '@/store';
import { timeout } from '@/utils/utilitys';

export default function ManageProduct() {
  const { user } = useAuthStore((state) => state);

  const [idDelete, setIdDelete] = React.useState<string>('');

  // ** Modal Create
  const [IsModalCreate, setIsModalCreate] = React.useState<boolean>(false);
  const handleCancelCreate = () => setIsModalCreate(false);

  const { data, isLoading, isSuccess, isError, error, refetch }: any =
    useGetProduct({
      token: getLogin()?.token ?? '',
      page: 1,
      limit: 100,
      id: user?._id,
    });

  const { mutate } = useDestroyProduct();

  const columns: ColumnsType<any> = [
    {
      title: 'Product ID',
      dataIndex: 'productId',
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
    },
    {
      title: 'Product Type',
      dataIndex: 'productType',
    },
    {
      title: 'Product Category',
      dataIndex: 'productCategory',
    },
    {
      title: 'Product Price',
      dataIndex: 'productPrice',
    },
    {
      key: 'action',
      title: 'Action',
      dataIndex: 'action',
      render: (_, record: any) => {
        return (
          <div>
            <Tooltip title={'Delete Product'}>
              <Popconfirm
                title="Delete Product?"
                description="Are you sure to delete this Product?"
                onConfirm={async () => {
                  await mutate(idDelete);
                  await setIdDelete('');
                  await timeout(1500);
                  await refetch();
                }}
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  onClick={() => setIdDelete(record._id)}
                  color={'red'}
                  icon={<DeleteOutlined style={{ color: 'red' }} />}
                />
              </Popconfirm>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3 style={{}}>Product Management</h3>
        <Button type="primary" onClick={() => setIsModalCreate(true)}>
          Tambah Product
        </Button>
      </div>
      <div style={{ marginTop: '2em', overflow: 'auto' }}>
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
      <Modal
        title="Tambah Product"
        isModalOpen={IsModalCreate}
        handleCancel={handleCancelCreate}
      >
        <FormProduct handleClose={handleCancelCreate} />
      </Modal>

      <Modal
        title="Edit User"
        isModalOpen={IsModalEdit}
        handleCancel={handleCancelEdit}
      >
        <FormMemberEdit handleClose={handleCancelEdit} data={editData} />
      </Modal>
    </div>
  );
}
