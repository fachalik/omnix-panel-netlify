import {
  Card,
  Row,
  Col,
  List,
  Typography,
  Tooltip,
  Button,
  Divider,
} from 'antd';
import { EditTwoTone } from '@ant-design/icons';
import { formatRupiah } from '@/utils/utilitys';
// import whatsappIcon from '@/assets/icons/whatsapp.svg';
// import VoiceDashboard from '@/assets/icons/VoiceDashboard.svg';
// import smsIcon from '@/assets/icons/sms.svg';

export default function NonProduct() {
  const data: any = [
    {
      name: 'Omnix Marketing',
      schema: [
        {
          name: 'User License',
          children: [
            {
              label: 'per license',
              value: 0,
            },
          ],
        },
        {
          name: 'Whatsapp',
          children: [
            {
              label: 'Per Outgoing Utility Message',
              value: 0,
            },
            {
              label: 'Per Outgoing Auth Message',
              value: 0,
            },
            {
              label: 'Per Outgoing Marketing Message',
              value: 0,
            },
          ],
        },
        {
          name: 'SMS',
          children: [
            {
              label: 'per Outgoing Message',
              value: 0,
            },
          ],
        },
        {
          name: 'Telegram',
          children: [
            {
              label: 'per Outgoing Message',
              value: 0,
            },
          ],
        },
      ],
    },
    {
      name: 'Omnix Sales',
      schema: [
        {
          name: 'User License',
          children: [
            {
              label: 'per license',
              value: 0,
            },
          ],
        },
        {
          name: 'Voice',
          children: [
            {
              label: 'Per phone duration in minutes',
              value: 0,
            },
          ],
        },
      ],
    },
    {
      name: 'Omnix Service',
      schema: [
        {
          name: 'User License',
          children: [
            {
              label: 'per license',
              value: 0,
            },
          ],
        },
        {
          name: 'Voice',
          children: [
            {
              label: 'Per phone duration in minutes',
              value: 0,
            },
          ],
        },
        {
          name: 'Email',
          children: [
            {
              label: 'Per incoming email',
              value: 0,
            },
          ],
        },
        {
          name: 'Livechat',
          children: [
            {
              label: 'Per session livechat',
              value: 0,
            },
          ],
        },
        {
          name: 'SMS',
          children: [
            {
              label: 'Per outgoing message',
              value: 0,
            },
          ],
        },
        {
          name: 'Telegram',
          children: [
            {
              label: 'Per incoming message',
              value: 0,
            },
          ],
        },
        {
          name: 'Facebook Comment',
          children: [
            {
              label: 'Per incoming message',
              value: 0,
            },
          ],
        },
        {
          name: 'Facebook Message',
          children: [
            {
              label: 'Per incoming message',
              value: 0,
            },
          ],
        },
        {
          name: 'Instagram Comment',
          children: [
            {
              label: 'Per incoming message',
              value: 0,
            },
          ],
        },
        {
          name: 'Instagram Message',
          children: [
            {
              label: 'Per incoming message',
              value: 0,
            },
          ],
        },
        {
          name: 'Twitter Message',
          children: [
            {
              label: 'Per incoming message',
              value: 0,
            },
          ],
        },
        {
          name: 'Twitter Comment',
          children: [
            {
              label: 'Per incoming Reply',
              value: 0,
            },
          ],
        },
        {
          name: 'Video Call',
          children: [
            {
              label: 'Per Videocall Duration in minutes',
              value: 0,
            },
          ],
        },
        {
          name: 'Line',
          children: [
            {
              label: 'Per incoming message',
              value: 0,
            },
          ],
        },
        {
          name: 'Whatsapp',
          children: [
            {
              label: 'Per incoming message',
              value: 0,
            },
          ],
        },
      ],
    },
  ];

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}
      >
        <h3>Business Schema Product</h3>
      </div>
      <Row gutter={[16, 16]}>
        {data.map((item: any, idx: number) => {
          return (
            <Col span={24}>
              <Card
                key={idx}
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ marginLeft: 5 }}>{item.name}</p>
                  </div>
                }
                extra={
                  <Tooltip title={'Edit Schema'}>
                    <Button
                      onClick={() => {}}
                      style={{ marginRight: '0.5em' }}
                      icon={<EditTwoTone />}
                    />
                  </Tooltip>
                }
                style={{ minWidth: 300, width: 'auto' }}
              >
                {item.schema.map((item2: any, idx2: number) => (
                  <div>
                    <Divider />
                    <p style={{ fontWeight: 700 }} key={idx2}>
                      {item2.name}
                    </p>
                    <List
                      dataSource={item2.children}
                      renderItem={(item3: any) => {
                        return (
                          <List.Item key={item3.label}>
                            <Typography>{item3.label}</Typography>
                            <Typography>
                              {formatRupiah(item3.value.toString(), 'Rp.')}
                            </Typography>
                          </List.Item>
                        );
                      }}
                    />
                  </div>
                ))}
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
