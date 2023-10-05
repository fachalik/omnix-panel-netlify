import { Card, Row, Col, Divider, Button } from 'antd';
import { useActivatedProduct } from '@/store';
import { formatRupiah } from '@/utils/utilitys';
import FormDetailOrder from './Form/FormDetailOrder';

function Step2() {
  const { selectedData, decCurrentState } = useActivatedProduct(
    (state) => state
  );
  return (
    <div style={{ marginTop: '1.5em' }}>
      <Card style={{ width: '41em' }}>
        <div>
          <p style={{ fontWeight: 600, fontSize: 20 }}>Your Order</p>
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
              gutter={[6, 6]}
              style={{
                width: '100%',
                alignItems: 'center',
              }}
            >
              <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: '#2D2D2D',
                      backgroundColor:
                        selectedData.package_name.toLowerCase() === 'pro'
                          ? '#E7EAFF'
                          : '#D3FFE6',
                      textAlign: 'center',
                      padding: '7px',
                      textTransform: 'uppercase',
                      border: `1px solid #19336B
                         `,
                      borderRadius: '5px',
                    }}
                  >
                    {selectedData.package_name}
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      color: '#18181B',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}
                  >
                    Tipe
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: '#71717A',
                    }}
                  >
                    {selectedData.package_type}
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'end',
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
                    {formatRupiah(selectedData.package_price.toString(), 'Rp.')}
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
          <div style={{ marginTop: '1.5em' }}>
            <Row>
              <Col
                span={12}
                style={{ paddingLeft: '10px', paddingRight: '10px' }}
              >
                <p style={{ fontSize: 14, fontWeight: 400 }}>Subtotal</p>
              </Col>
              <Col
                span={12}
                style={{
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  textAlign: 'end',
                }}
              >
                <p style={{ fontSize: 14, fontWeight: 700 }}>
                  {formatRupiah(selectedData.package_price.toString(), 'Rp.')}
                </p>
              </Col>
            </Row>
            <Row>
              <Col
                span={12}
                style={{ paddingLeft: '10px', paddingRight: '10px' }}
              >
                <p
                  style={{ fontSize: 14, fontWeight: 400 }}
                >{`Tax(${selectedData.package_tax})%`}</p>
              </Col>
              <Col
                span={12}
                style={{
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  textAlign: 'end',
                }}
              >
                <p style={{ fontSize: 14, fontWeight: 700 }}>
                  {formatRupiah(
                    ((selectedData.package_price * 0) / 100).toString(),
                    'Rp.'
                  )}
                </p>
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col
                span={12}
                style={{ paddingLeft: '10px', paddingRight: '10px' }}
              >
                <p style={{ fontSize: 14, fontWeight: 400 }}>Total</p>
              </Col>
              <Col
                span={12}
                style={{
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  textAlign: 'end',
                }}
              >
                <p style={{ fontSize: 14, fontWeight: 700 }}>
                  {formatRupiah(
                    (
                      (selectedData.package_price * 0) / 100 +
                      selectedData.package_price
                    ).toString(),
                    'Rp.'
                  )}
                </p>
              </Col>
            </Row>
            <Divider />
            <FormDetailOrder />
          </div>
        </div>
      </Card>
      <Button
        onClick={() => decCurrentState()}
        style={{ marginTop: '1.5em' }}
        block
      >
        Back
      </Button>
    </div>
  );
}

export default Step2;
