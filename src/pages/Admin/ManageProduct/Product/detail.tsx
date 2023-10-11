import { Button, Row, Col, Empty, Avatar } from 'antd';
import { useDetailProduct } from '@/store';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined, EllipsisOutlined } from '@ant-design/icons';
import CardComponent from '@/components/AllCard/CardComponent';
import moment from 'moment';

import channelService from '@/assets/icons/channelservice.svg';
import channelmarketing from '@/assets/icons/channelmarketing.svg';
import { formatRupiah } from '@/utils/utilitys';

export default function Detail() {
  const navigate = useNavigate();
  const { detailProduct, setRemoveProduct } = useDetailProduct(
    (state) => state
  );

  const mapIcon = (channelId: any) => {
    if (channelId) {
      return channelService;
    } else {
      return channelmarketing;
    }
  };

  const { data } = detailProduct;
  return (
    <div>
      <Button
        type="primary"
        onClick={async () => {
          await navigate('/manage-product/product');
          await setRemoveProduct();
        }}
        icon={<LeftOutlined />}
      >
        Back
      </Button>
      <Row gutter={[16, 16]} style={{ marginTop: '1em' }}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <p
            style={{
              fontSize: '2em',
              fontWeight: '600',
              marginBottom: '0.5em',
            }}
          >
            {data?.productName}
          </p>
          <img
            alt={data.productLogo.id}
            src={data.productLogo.path}
            style={{
              width: '100%',
              height: '25em',
              objectFit: 'cover',
              borderRadius: '1em',
            }}
          />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          style={{ marginTop: '2.6em' }}
        >
          <p style={{ fontSize: '1em', fontWeight: 700, marginTop: '0.5em' }}>
            Product ID
          </p>
          <p style={{ fontSize: '1em', marginTop: '0.5em' }}>
            {data?.productId}
          </p>

          <div style={{ marginTop: '1em' }}>
            <p style={{ fontSize: '1em', fontWeight: 700 }}>Deskripsi</p>
            <p style={{ fontSize: '1em', marginTop: '0.5em' }}>
              {data?.productDescription}
            </p>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ marginTop: '1em' }}>
              <p style={{ fontSize: '1em', fontWeight: 700 }}>Created At</p>
              <p style={{ fontSize: '1em', marginTop: '0.5em' }}>
                {moment(data?.createdBy?.createdAt ?? '').format('llll')}
              </p>
            </div>
            <div style={{ marginTop: '1em', marginLeft: '3em' }}>
              <p style={{ fontSize: '1em', fontWeight: 700 }}>Updated At</p>
              <p style={{ fontSize: '1em', marginTop: '0.5em' }}>
                {moment(data?.createdBy?.updatedAt ?? '').format('llll')}
              </p>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <div style={{ marginTop: '1em' }}>
            <p style={{ fontSize: '2em', fontWeight: '600' }}>Sub Product</p>
            {data?.subproductId.length === 0 && (
              <Empty description="Tidak terdapat sub product" />
            )}
            {data?.subproductId.length !== 0 &&
              data?.subproductId.map((item: any, idx: number) => {
                console.log('item', item);
                return (
                  <CardComponent key={idx}>
                    <Row
                      gutter={[12, 12]}
                      style={{
                        width: '100%',

                        alignItems: 'center',
                      }}
                    >
                      <Col xs={24} sm={24} md={1} lg={1} xl={1}>
                        <Avatar size={'large'} src={mapIcon(item.channelId)} />
                      </Col>

                      <Col xs={24} sm={24} md={3} lg={3} xl={3}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginLeft: 5,
                          }}
                        >
                          <p>Sub product ID</p>
                          <p
                            style={{
                              fontSize: 14,
                              fontWeight: 700,
                              color: '#2D2D2D',
                            }}
                          >
                            {item.subproductId}
                          </p>
                        </div>
                      </Col>

                      <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginLeft: 5,
                          }}
                        >
                          <p>Sub product name</p>
                          <p
                            style={{
                              fontSize: 14,
                              fontWeight: 700,
                              color: '#2D2D2D',
                            }}
                          >
                            {item.subproductName}
                          </p>
                        </div>
                      </Col>
                      <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginLeft: 5,
                          }}
                        >
                          <p>Price</p>
                          <p
                            style={{
                              fontSize: 14,
                              fontWeight: 700,
                              color: '#2D2D2D',
                            }}
                          >
                            {formatRupiah(
                              item.subproductPrice.toString(),
                              'Rp.'
                            )}
                          </p>
                        </div>
                      </Col>
                      <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginLeft: 5,
                          }}
                        >
                          <p>Sub Product Unit</p>
                          <p
                            style={{
                              fontSize: 14,
                              fontWeight: 700,
                              color: '#2D2D2D',
                            }}
                          >
                            {item.subproductUnit}
                          </p>
                        </div>
                      </Col>
                      <Col xs={24} sm={24} md={3} lg={3} xl={3}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginLeft: 5,
                          }}
                        >
                          <p>Created At</p>
                          <p
                            style={{
                              fontSize: 14,
                              fontWeight: 700,
                              color: '#2D2D2D',
                            }}
                          >
                            {moment(item?.createdAt ?? '').format('ll')}
                          </p>
                        </div>
                      </Col>
                      <Col xs={24} sm={24} md={3} lg={3} xl={3}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginLeft: 5,
                          }}
                        >
                          <p>Updated At</p>
                          <p
                            style={{
                              fontSize: 14,
                              fontWeight: 700,
                              color: '#2D2D2D',
                            }}
                          >
                            {moment(item?.updatedAt ?? '').format('ll')}
                          </p>
                        </div>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={2} xl={2}>
                        <Button
                          block
                          type="primary"
                          icon={<EllipsisOutlined style={{ fontSize: 20 }} />}
                        />
                      </Col>
                    </Row>
                  </CardComponent>
                );
              })}
          </div>
        </Col>
      </Row>
    </div>
  );
}
