import { Card, Row, Col, List, Typography, Tooltip, Button } from 'antd';
import { EditTwoTone } from '@ant-design/icons';
import { formatRupiah } from '@/utils/utilitys';
import whatsappIcon from '@/assets/icons/whatsapp.svg';
import VoiceDashboard from '@/assets/icons/VoiceDashboard.svg';
import smsIcon from '@/assets/icons/sms.svg';

export default function NonProduct() {
  const data: any = [
    {
      name: 'Whatsapp',
      img: whatsappIcon,
      schema: [
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
      img: smsIcon,
      schema: [
        {
          label: 'Per Outgoing Message',
          value: 0,
        },
      ],
    },
    {
      name: 'Voice',
      img: VoiceDashboard,
      schema: [
        {
          label: 'Per Phone Duration in minutes',
          value: 0,
        },
      ],
    },
    {
      name: 'Video Call',
      img: VoiceDashboard,
      schema: [
        {
          label: 'Per video call duration in minutes',
          value: 0,
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
        <h3>Business Schema Non Product</h3>
      </div>
      <Row gutter={[16, 16]}>
        {data.map((item: any, idx: number) => {
          return (
            <Col span={12}>
              <Card
                key={idx}
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={item.img}
                      alt="omnix-whatsapp"
                      width={30}
                      height={30}
                    />
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
                <List
                  dataSource={item.schema}
                  renderItem={(item2: any) => {
                    return (
                      <List.Item key={item2.label}>
                        <Typography>{item2.label}</Typography>
                        <Typography>
                          {formatRupiah(item2.value.toString(), 'Rp.')}
                        </Typography>
                      </List.Item>
                    );
                  }}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
