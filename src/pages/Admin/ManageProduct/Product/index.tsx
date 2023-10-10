import React from 'react';
import {
  Button,
  Tag,
  Popconfirm,
  Tooltip,
  Table,
  Card,
  Divider,
  Select,
  Input,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  useGetProductAdmin,
  useDestroyProduct,
} from './Hooks/useGetProductAdmin';
import { getLogin } from '@/utils/sessions';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { palette } from '@/theme/themeConfig';
import moment from 'moment';
import { EditTwoTone, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import Modal from '@/components/Modal';
import FormProduct from './Form/FormProduct';
import FormProductEdit from './Form/FormProductEdit';
import debounce from 'lodash.debounce';
import { formatRupiah } from '@/utils/utilitys';

export default function ManageProduct() {
  // const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>(100);
  const [search, setSearch] = React.useState<string>('');
  // const [sortField, setSortField] = React.useState<string>('');
  // const [sortOrder, setSortOrder] = React.useState<string>('');

  const filterSearch = (e: any) => setSearch(e.target.value);

  const debounceSearch = debounce(filterSearch, 500);

  const { mutate } = useDestroyProduct();

  // ** Modal Create
  const [IsModalCreate, setIsModalCreate] = React.useState<boolean>(false);
  const handleCancelCreate = () => setIsModalCreate(false);

  // ** Modal Edit
  const [editData, setEditData] = React.useState(null);
  const [IsModalEdit, setIsModalEdit] = React.useState<boolean>(false);
  const handleCancelEdit = () => {
    setEditData(null);
    setIsModalEdit(false);
  };

  const { data, isLoading, isSuccess, isError, error }: any =
    useGetProductAdmin({
      token: getLogin()?.token ?? '',
      limit,
      page: 1,
      search,
      sortField: '',
      sortOrder: '',
    });

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
      title: 'Product Unit',
      dataIndex: 'productUnit',
    },
    {
      key: 'productPrice',
      title: 'Price',
      dataIndex: 'productPrice',
      render: (_, record: any) => {
        return (
          <p>{`${formatRupiah(record?.productPrice.toString(), 'Rp. ')}`}</p>
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
            {moment(record?.createdAt).format('LLL')}
          </Tag>
        );
      },
    },
    {
      key: 'updatedAt',
      title: 'UpdatedAt At',
      dataIndex: 'updatedAt',
      render: (_, record: any) => {
        return (
          <Tag color={palette.primary.main}>
            {moment(record?.updatedAt).format('LLL')}
          </Tag>
        );
      },
    },
    {
      key: 'action',
      title: 'Action',
      dataIndex: 'action',
      render: (_, record: any) => {
        return (
          <div>
            <Tooltip title={'Edit user'}>
              <Button
                onClick={() => {
                  setIsModalEdit(true);
                  setEditData(null);
                  setEditData(record);
                }}
                style={{ marginRight: '0.5em' }}
                color={palette.primary.main}
                icon={<EditTwoTone />}
              />
            </Tooltip>
            <Tooltip title={'Delete user'}>
              <Popconfirm
                title="Delete user?"
                description="Are you sure to delete this user?"
                onConfirm={() => {
                  mutate(record.id);
                }}
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  onClick={() => console.log(record?.id)}
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
      <Card>
        <div style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>
          Product
        </div>
        <div style={{ fontSize: 12 }}>Tambah product</div>
        <Divider />
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 12 }}>Show</span>
            <Select
              defaultActiveFirstOption={false}
              style={{ width: '5em', marginLeft: 10, marginRight: 10 }}
              onChange={(e) => {
                setLimit(e);
              }}
              value={limit}
            >
              <Select.Option value="10">10</Select.Option>
              <Select.Option value="50">50</Select.Option>
              <Select.Option value="100">100</Select.Option>
              <Select.Option value="500">500</Select.Option>
            </Select>
            <span style={{ fontSize: 12 }}>entries</span>
          </div>
          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Input.Search
              placeholder="Search data"
              onSearch={(e) => setSearch(e)}
              onChange={debounceSearch}
            />
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => setIsModalCreate(true)}
              style={{
                marginRight: 10,
                marginLeft: 10,
              }}
            >
              Tambah Product
            </Button>
          </div>
        </div>
      </Card>

      <div style={{ marginTop: '2em', overflow: 'auto' }}>
        {isLoading && <Loading />}
        {isSuccess && data && (
          <Table
            loading={isLoading}
            style={{ marginTop: 10, paddingBottom: 20 }}
            columns={columns}
            dataSource={data[0]}
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
        title="Edit Product"
        isModalOpen={IsModalEdit}
        handleCancel={handleCancelEdit}
      >
        <FormProductEdit handleClose={handleCancelEdit} data={editData} />
      </Modal>
    </div>
  );
}
