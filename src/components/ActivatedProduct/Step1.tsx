import { useGetPackage } from '@/hooks/useGetPackage';
import Loading from '@/components/Loading';
import { getLogin } from '@/utils/sessions';
import moment from 'moment';
import { formatRupiah } from '@/utils/utilitys';
import { Button, Card, Row, Col, Empty } from 'antd';
import { useActivatedProduct } from '@/store';
import Error from '@/components/Error';

function Step1() {
  const { setSelectedData, incCurrentState } = useActivatedProduct(
    (state) => state
  );

  const { data, isLoading, isSuccess, isError, error }: any = useGetPackage({
    token: getLogin()?.token ?? '',
    limit: 100,
    page: 1,
  });

  const handleSelectedPackage = (item: any) => {
    setSelectedData(item);
    incCurrentState();
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && isSuccess) {
    return (
      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            fontSize: 20,
            fontWeight: 600,
            marginTop: '1.5em',
            marginBottom: '1em',
            textAlign: 'center',
          }}
        >
          How would you like to start?
        </p>
        {data.data?.map((item: any, idx: number) => (
          <Card
            key={idx}
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
              <Col xs={24} sm={24} md={24} lg={3} xl={3}>
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
                        item.package_name.toLowerCase() === 'pro'
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
                    {item.package_name}
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={3} xl={3}>
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
                    Channel Name
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: '#71717A',
                    }}
                  >
                    {item.package_type}
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={3} xl={3}>
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
                    Price
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: '#71717A',
                    }}
                  >
                    {formatRupiah(item.package_price.toString(), 'Rp.')}
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
                    Deskripsi
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: '#71717A',
                    }}
                  >
                    {item.package_description}
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={3} xl={3}>
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
                    Tax
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: '#71717A',
                    }}
                  >
                    {item.package_tax}%
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={3} xl={3}>
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
                    Tanggal
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: '#71717A',
                    }}
                  >
                    {moment(item.createdAt).format('MMMM DD, YYYY')}
                  </div>
                </div>
              </Col>

              <Col xs={24} sm={24} md={24} lg={3} xl={3}>
                <Button
                  block
                  type="default"
                  onClick={() => handleSelectedPackage(item)}
                >
                  Buy Package
                </Button>
              </Col>
            </Row>
          </Card>
        ))}
        {data.data.length === 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Empty />
          </div>
        )}
      </div>
    );
  }

  if (!isLoading && isError) {
    return <Error error={error} />;
  }

  return <></>;
}

export default Step1;
