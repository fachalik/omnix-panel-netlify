import React from 'react';
import type { ColumnsType } from 'antd/es/table';

import { Button, Table, Tooltip, Popconfirm } from 'antd';
import { DeleteOutlined, EditTwoTone } from '@ant-design/icons';
import FormAddProduct from '../Form/FormAddProduct';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import Modal from '@/components/Modal';

import { useGetProductAdmin, usedestroyGroup } from '../Hooks/useGetProduct';
import { getLogin } from '@/utils/sessions';
import { formatRupiah, timeout } from '@/utils/utilitys';

interface IProps {
  productType: string;
  productCategory: string;
}

export default function Package({ productType, productCategory }: IProps) {
  const [productDetails, setProductDetails] = React.useState('PAKET');
  const [limit, setLimit] = React.useState(10);
  const [pagination, setPagination] = React.useState({
    current: 1,
    total: 10,
    pagesize: 10,
  });

  // ** Modal Create
  const [IsModalCreate, setIsModalCreate] = React.useState<boolean>(false);
  const handleCancelCreate = () => setIsModalCreate(false);

  const { data, isLoading, isError, error, isSuccess, refetch }: any =
    useGetProductAdmin({
      token: getLogin()?.token ?? '',
      page: pagination.current,
      limit,
      productType,
      productCategory,
      query_key: `PRODUCT_${productCategory}_${productType}_${productDetails}`,
      typeDetails: productDetails,
    });

  const { mutate } = usedestroyGroup({
    query_key: `PRODUCT_${productCategory}_${productType}_${productDetails}`,
  });

  const mapPagination = (data: any) => {
    console.log('data', data);
    if (data) {
      setPagination({
        ...pagination,
        current: data.page,
        total: data.total,
      });
    }
  };

  React.useEffect(() => {
    let isMount = true;

    if (isMount) {
      mapPagination(data);
    }

    return () => {
      isMount = false;
    };
  }, [data]);

  const columns: ColumnsType<any> = [
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
      key: 'productPrice',
      title: 'Product Price',
      dataIndex: 'productPrice',
      render: (_, record: any) => {
        return (
          <p>{`${formatRupiah(record?.productPrice.toString(), 'Rp.')}`}</p>
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
            <Tooltip title={'Edit product'}>
              <Button
                onClick={() => {
                  // setIsModalEdit(true);
                  // setEditData(null);
                  // setEditData(record);
                }}
                style={{ marginRight: '0.5em' }}
                icon={<EditTwoTone />}
              />
            </Tooltip>
            <Tooltip title={'Delete Product'}>
              <Popconfirm
                title="Delete Product?"
                description="Are you sure to delete this Product?"
                onConfirm={async () => {
                  await mutate({ id: record._id });
                  await timeout(1000);
                  await refetch();
                }}
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
              >
                <Button
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

  const menuDetail = [
    {
      value: 'PAKET',
      label: 'Package',
    },
    {
      value: 'ALACARTE',
      label: 'Ala Carte',
    },
    {
      value: 'ADDON',
      label: 'Add on',
    },
  ];

  const handlePaginationChange = (page: any, pageSize: any) => {
    console.log(page, pageSize);
    setPagination({
      ...pagination,
      current: page,
      pagesize: pageSize,
    });
  };

  return (
    <>
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
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{
              marginBottom: '1em',
              display: 'flex',
              alignItems: 'start',
            }}
          >
            {menuDetail.map(
              (item: { value: string; label: string }, idx: number) => (
                <Button
                  disabled={item.value === productDetails}
                  onClick={() => setProductDetails(item.value)}
                  key={idx}
                  style={{ marginRight: '1em' }}
                >
                  {item.label}
                </Button>
              )
            )}
          </div>
          <Button type="primary" onClick={() => setIsModalCreate(true)}>
            Add Product
          </Button>
        </div>
      </div>
      {isLoading && <Loading />}
      {isSuccess && data && (
        <Table
          loading={isLoading}
          style={{ marginTop: 10, paddingBottom: 20 }}
          columns={columns}
          dataSource={data.data}
          pagination={{
            ...pagination,
            onChange: handlePaginationChange,
          }}
        />
      )}
      {!isLoading && isError && <Error error={error} />}
      <Modal
        title="Tambah Product"
        isModalOpen={IsModalCreate}
        handleCancel={handleCancelCreate}
      >
        <FormAddProduct
          handleClose={handleCancelCreate}
          query_key={`PRODUCT_${productCategory}_${productType}_${productDetails}`}
          productCategory={productCategory}
          productType={productType}
          typeDetails={productDetails}
          refetch={refetch}
        />
      </Modal>
    </>
  );
}
