import { Button, Card, Row, Col, Avatar, Tag } from 'antd';
import moment from 'moment';
// import { useRouter, usePathname } from 'next/navigation';
import { useNavigate } from 'react-router-dom';
import { EllipsisOutlined } from '@ant-design/icons';

interface ICardItem {
  icon: string;
  package_name: string;
  package_type: string;
  channelName: string;
  totalAccount: number;
  createdAt: Date;
}

interface IItem {
  item: ICardItem;
}

export default function CardItemChannel(props: IItem) {
  // const location = useLocation();
  // const { pathname } = location;
  const navigate = useNavigate();
  const { item } = props;
  const { icon, package_name, package_type, totalAccount, createdAt } = item;

  // const role: = pathname.split('/')[1];

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
          <Avatar size={'large'} src={icon} />
        </Col>
        <Col xs={24} sm={24} md={24} lg={7} xl={7}>
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
              Account
            </div>
            <div
              style={{
                fontSize: 12,
                color: '#71717A',
              }}
            >
              {totalAccount}
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
              {/* Jan 17,2022 */}
              {moment(createdAt).format('MMMM DD, YYYY')}
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={2} xl={2}>
          <Tag color={'success'}>Subscribed</Tag>
        </Col>
        <Col xs={24} sm={24} md={24} lg={2} xl={2}>
          <Button
            onClick={() => navigate(`/channel-subscription/1`)}
            block
            icon={<EllipsisOutlined style={{ fontSize: 20 }} />}
          ></Button>
        </Col>
      </Row>
    </Card>
  );
}
