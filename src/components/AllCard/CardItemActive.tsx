import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Card, Row, Col, Avatar, Tag } from 'antd';
import moment from 'moment';
import { formatRupiah } from '@/utils/utilitys';

import channelService from '@/assets/icons/channelservice.svg';
import channelmarketing from '@/assets/icons/channelmarketing.svg';

interface ICardItem {
  id: number;
  package_name: string;
  package_type: string;
  package_price: number;
  package_tax: number;
  package_description: string;
  channel_email: boolean;
  channel_facebook: boolean;
  channel_instagram: boolean;
  channel_whatsapp: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  __entity: string;
}

interface IItem {
  item: ICardItem;
}

export default function CardItemActive(props: IItem) {
  const { item } = props;
  const {
    package_name,
    package_type,
    package_price,
    package_tax,
    package_description,
    createdAt,
  } = item;

  const mapIcon = (icon: string) => {
    console.log('icon', icon);
    switch (icon.toLowerCase()) {
      case 'omnix_services':
        return channelService;

      case 'omnix_marketing':
        return channelmarketing;
      default:
        break;
    }
  };
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
          <Avatar size={'large'} src={mapIcon(package_type)} />
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
                fontSize: 14,
                fontWeight: 500,
                color: '#2D2D2D',
              }}
            >
              {package_name}
            </div>
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
              {package_type}
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={2} xl={2}>
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
        </Col>
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
        </Col>
        <Col xs={24} sm={24} md={24} lg={2} xl={2}>
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
              Tax
            </div>
            <div
              style={{
                fontSize: 12,
                color: '#71717A',
              }}
            >
              {package_tax}%
            </div>
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
        <Col xs={24} sm={24} md={24} lg={2} xl={2}>
          <Tag color={'success'}>Active</Tag>
        </Col>
        <Col xs={24} sm={24} md={24} lg={2} xl={2}>
          <Button
            block
            icon={<EllipsisOutlined style={{ fontSize: 20 }} />}
          ></Button>
        </Col>
      </Row>
    </Card>
  );
}
