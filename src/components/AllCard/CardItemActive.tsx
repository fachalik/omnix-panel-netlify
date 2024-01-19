import { EllipsisOutlined, LinkOutlined } from '@ant-design/icons';
import { Button, Card, Row, Col, Avatar } from 'antd';
import moment from 'moment';

import { useNavigate } from 'react-router-dom';
import { mapIcon } from '@/utils/utilitys';

export default function CardItemActive(props: any) {
  const navigate = useNavigate();
  const { item } = props;

  const { _id, productName, productCategory, productType, createdAt } = item;

  return (
    <Card
      bodyStyle={{
        padding: 20,
        boxShadow: '0 0 2px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.14)',
      }}
      style={{
        width: 'calc(100% - 20px)',
        margin: 10,
        alignItems: 'center',
        border: 'unset',
      }}
    >
      <Row
        gutter={[12, 12]}
        style={{
          width: '100%',

          alignItems: 'center',
        }}
      >
        <Col xs={24} sm={24} md={24} lg={1} xl={1}>
          <Avatar size={'large'} src={mapIcon(productCategory)} />
        </Col>
        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: 5,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '.5em' }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: '#2D2D2D' }}>
                {productCategory}
              </p>

              <Button
                shape="circle"
                icon={<LinkOutlined />}
                // onClick={() => window.open(link, '_target')}
              />
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={3} xl={3}>
          <div
            style={{
              fontSize: 12,
              color: '#71717A',
            }}
          >
            {productName}
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={3} xl={3}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: 5,
            }}
          >
            <div
              style={{
                color: '#18181B',
                fontSize: 12,
                fontWeight: 'bold',
              }}
            >
              Channel Name
            </div>
            <div
              style={{
                fontSize: 12,
                color: '#71717A',
              }}
            >
              {productType}
            </div>
          </div>
        </Col>

        {/* <Col xs={24} sm={24} md={24} lg={2} xl={2}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: 5,
            }}
          >
            <div
              style={{
                color: '#18181B',
                fontSize: 12,
                fontWeight: 'bold',
              }}
            >
              Price
            </div>
            <div
              style={{
                fontSize: 12,
                color: '#71717A',
              }}
            >
              {formatRupiah(package_price.toString(), 'Rp.')}
            </div>
          </div>
        </Col> */}
        {/* <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: 5,
            }}
          >
            <div
              style={{
                color: '#18181B',
                fontSize: 12,
                fontWeight: 'bold',
              }}
            >
              Deskripsi
            </div>
            <div
              style={{
                fontSize: 12,
                color: '#71717A',
              }}
            >
              {package_description}
            </div>
          </div>
        </Col> */}

        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: 5,
            }}
          >
            <div
              style={{
                color: '#18181B',
                fontSize: 12,
                fontWeight: 'bold',
              }}
            >
              Tanggal
            </div>
            <div
              style={{
                fontSize: 12,
                color: '#71717A',
              }}
            >
              {moment(createdAt).format('MMMM DD, YYYY')}
            </div>
          </div>
        </Col>
        {/* <Col xs={24} sm={24} md={24} lg={4} xl={4}>
          <Tag color={statusMap[status]['color']}>
            {statusMap[status]['text']}
          </Tag>
        </Col> */}
        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <Button
            onClick={() => navigate(`/product-activation/${_id}`)}
            block
            icon={<EllipsisOutlined style={{ fontSize: 20 }} />}
          ></Button>
        </Col>
      </Row>
    </Card>
  );
}
