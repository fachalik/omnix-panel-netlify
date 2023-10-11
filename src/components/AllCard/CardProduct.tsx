import {
  SettingOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Card, Divider, Tooltip, Popconfirm, Button } from 'antd';
import { truncate } from 'lodash';
import { formatRupiah, timeout } from '@/utils/utilitys';
import { useDetailProduct } from '@/store';
import { useNavigate } from 'react-router-dom';
import useIsLoading from '@/hooks/useIsLoading';

interface ICardProduct {
  data: any;
  onClickEdit: () => any;
  onClickDelete: () => any;
  onClickDetail: () => any;
  onClickAddSubProduct: () => any;
}

export default function CardProduct(props: ICardProduct) {
  const navigate = useNavigate();

  const { data, onClickEdit, onClickDelete, onClickAddSubProduct } = props;

  const { setDetailProduct } = useDetailProduct((state) => state);

  const { isLoading: isLoadingDetail, setIsLoading: setIsLoadingDetail } =
    useIsLoading();

  console.log(data);
  return (
    <Card
      style={{
        width: '100%',
      }}
      cover={
        <img
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '200px',
            padding: '1em',
            borderRadius: 24,
          }}
          alt={data.productLogo.id}
          src={data.productLogo.path}
        />
      }
      actions={[
        <Tooltip title={'Edit'}>
          <Button
            onClick={onClickEdit}
            icon={<SettingOutlined key="setting" />}
          />
        </Tooltip>,
        <Tooltip title={'Delete'}>
          <Popconfirm
            title="Delete Product?"
            description={`Are you sure to delete ${data.productName} ?`}
            onConfirm={onClickDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined key="delete" />} />
          </Popconfirm>
        </Tooltip>,
        <Tooltip title={'Detail Sub Product'}>
          <Button
            loading={isLoadingDetail}
            onClick={async () => {
              await setIsLoadingDetail(true);
              await setDetailProduct(data);
              await timeout(1000);
              await setIsLoadingDetail(false);
              await navigate('/manage-product/product/detail');
            }}
            icon={<EyeOutlined key="detail" />}
          />
        </Tooltip>,
        <Tooltip title={'Add Sub Product'}>
          <Button
            onClick={onClickAddSubProduct}
            icon={<PlusOutlined key="addSubProduct" />}
          />
        </Tooltip>,
      ]}
    >
      <p style={{ fontSize: 16 }}>{`${data.productName}`}</p>
      <Tooltip title={data.productDescription} arrow={false}>
        <p style={{ wordWrap: 'unset' }}>
          {truncate(data.productDescription, { length: 60 })}
        </p>
      </Tooltip>
      <p style={{ fontSize: 18, fontWeight: 600, marginTop: '0.5em' }}>
        {formatRupiah(data.productPrice.toString(), 'Rp.')}
      </p>
      <Divider />
      <Card
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: 12, fontWeight: 700 }}>Sub Product</p>
        <p style={{ fontSize: 18, fontWeight: 500 }}>
          {data.subproductId.length}
        </p>
      </Card>
    </Card>
  );
}
