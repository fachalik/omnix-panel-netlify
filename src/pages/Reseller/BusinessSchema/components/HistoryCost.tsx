import { Card, Row, Col, Typography, Empty } from 'antd';

import { formatRupiah } from '@/utils/utilitys';
import moment from 'moment';

interface IProps {
  data: any;
}

export default function HistoryCost(props: IProps) {
  const { data } = props;
  const mapVariable = (data: any) => {
    switch (data.productName) {
      case 'User License':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography>per license</Typography>
            <Typography>
              {formatRupiah(data.License.toString(), 'Rp.')}
            </Typography>
          </div>
        );

      case 'Whatsapp':
        return (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1em',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Typography>Per Outgoing Utility Message</Typography>
                <Typography>
                  {formatRupiah(data.Outgoing_Utility.toString(), 'Rp.')}
                </Typography>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1em',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Typography>Per Outgoing Auth Message</Typography>
                <Typography>
                  {formatRupiah(data.Outgoing_Auth.toString(), 'Rp.')}
                </Typography>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1em',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Typography>Per Outgoing Marketing Message</Typography>
                <Typography>
                  {formatRupiah(data.Outgoing_Marketing.toString(), 'Rp.')}
                </Typography>
              </div>
            </div>
          </div>
        );

      case 'SMS':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography>per Outgoing Message</Typography>
              <Typography>
                {formatRupiah(data.Outgoing_Message.toString(), 'Rp.')}
              </Typography>
            </div>
          </div>
        );

      case 'Telegram':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography>Per incoming message</Typography>
              <Typography>
                {formatRupiah(data.Incoming_Message.toString(), 'Rp.')}
              </Typography>
            </div>
          </div>
        );

      case 'Voice':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography>Per phone duration in minutes</Typography>
              <Typography>
                {formatRupiah(data.Phone_Duration.toString(), 'Rp.')}
              </Typography>
            </div>
          </div>
        );

      case 'Email':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography>Per incoming email</Typography>
              <Typography>
                {formatRupiah(data.Incoming_Message.toString(), 'Rp.')}
              </Typography>
            </div>
          </div>
        );

      case 'Livechat':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography>Per session livechat</Typography>
              <Typography>
                {formatRupiah(data.Incoming_Message.toString(), 'Rp.')}
              </Typography>
            </div>
          </div>
        );
      case 'Line':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography>Per incoming message</Typography>
              <Typography>
                {formatRupiah(data.Incoming_Message.toString(), 'Rp.')}
              </Typography>
            </div>
          </div>
        );

      case 'Video Call':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography>Per Videocall Duration in minutes</Typography>
              <Typography>
                {formatRupiah(data.Videocall_Duration.toString(), 'Rp.')}
              </Typography>
            </div>
          </div>
        );

      case 'Facebook Comment':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography>Per incoming message</Typography>
              <Typography>
                {formatRupiah(data.Incoming_Message.toString(), 'Rp.')}
              </Typography>
            </div>
          </div>
        );

      case 'Facebook Message':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography>Per incoming message</Typography>
              <Typography>
                {formatRupiah(data.Incoming_Message.toString(), 'Rp.')}
              </Typography>
            </div>
          </div>
        );

      case 'Instagram Comment':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography>Per incoming message</Typography>
              <Typography>
                {formatRupiah(data.Incoming_Message.toString(), 'Rp.')}
              </Typography>
            </div>
          </div>
        );

      case 'Instagram Message':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography>Per incoming message</Typography>
              <Typography>
                {formatRupiah(data.Incoming_Message.toString(), 'Rp.')}
              </Typography>
            </div>
          </div>
        );

      case 'Twitter Message':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography>Per incoming message</Typography>
              <Typography>
                {formatRupiah(data.Incoming_Message.toString(), 'Rp.')}
              </Typography>
            </div>
          </div>
        );

      case 'Twitter Comment':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography>Per incoming message</Typography>
              <p style={{ fontSize: 10, fontWeight: '500' }}>
                {moment(data.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
              </p>

              <Typography>
                {formatRupiah(data.Incoming_Message.toString(), 'Rp.')}
              </Typography>
            </div>
          </div>
        );

      default:
        break;
    }
  };

  if (data.length !== 0) {
    return (
      <>
        {data.map((item: any, idx: number) => {
          return (
            <Col span={24} key={idx}>
              <Card
                title={
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <p>{item.name.replaceAll('_', ' ')}</p>
                  </div>
                }
                style={{ minWidth: 300, width: 'auto' }}
              >
                {item.data.map((item2: any, idx2: number) => (
                  <div key={idx2}>
                    <p style={{ fontWeight: 700 }}>{item2.productName}</p>
                    <p
                      style={{
                        fontSize: 10,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}
                    >
                      {moment(item2.updatedAt).format(
                        'dddd, DD MMMM YYYY, h:mm:ss a'
                      )}
                    </p>
                    {mapVariable(item2)}
                  </div>
                ))}
              </Card>
            </Col>
          );
        })}
      </>
    );
  }

  if (data.length === 0) {
    return (
      <Row
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <Col>
          <Empty />
        </Col>
      </Row>
    );
  }
}
