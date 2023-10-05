// import Image from 'next/image';
import { Row, Col, Card } from 'antd';

import { palette } from '@/theme/themeConfig';

import RegisterImage from '@/assets/image/register-image.png';

interface IAuthLayout2 {
  children: React.ReactNode;
}

export default function AuthLayout2({ children }: IAuthLayout2) {
  return (
    <main style={{ width: '100%', height: '100%' }}>
      <div
        style={{
          height: '100%',
          width: '100%',
          overflow: 'hidden',
          background: '#f0f0f0',
        }}
      >
        <Row style={{ width: '100vw' }}>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={14}
            xl={14}
            style={{ width: '100%' }}
          >
            <Card bodyStyle={{ padding: 0, width: '100vw' }} bordered={false}>
              <Row>
                <Col xs={0} sm={0} md={0} lg={14} xl={14}>
                  <div
                    style={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      backgroundColor: palette.primary.main,
                    }}
                  >
                    <div style={{ marginTop: '1.5em' }}>
                      <div
                        style={{
                          fontSize: 24,
                          textAlign: 'center',
                          fontWeight: 'bold',
                          color: '#fff',
                          margin: '10px 30px 10px 30px',
                          zIndex: 5,
                        }}
                      >
                        Make us to be solution for your business
                      </div>

                      <div
                        style={{
                          fontSize: 16,
                          textAlign: 'center',
                          color: '#fff',
                          zIndex: 5,
                        }}
                      >
                        {`We love learning more about you and your needs. Leave your
                  details behind and we'll be in touch shortly.`}
                      </div>
                    </div>
                    <div
                      style={{
                        width: '100%',
                        textAlign: 'center',
                      }}
                    >
                      <img
                        src={RegisterImage}
                        alt="omnix-white"
                        width={300}
                        height={300}
                        style={{
                          backgroundSize: 'contain',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'top',
                          height: '100%',
                          width: '100%',
                          paddingLeft: 15,
                        }}
                      />
                    </div>
                  </div>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={10}
                  xl={10}
                  style={{
                    width: '100%',
                    height: '100%',
                    // overflow: 'scroll',
                    padding: '50px 30px',
                    // display: 'flex',
                    // flexDirection: 'column',
                    // justifyContent: 'center',
                    // width: '100%',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      overflow: 'scroll',
                    }}
                  >
                    {children}
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </main>
  );
}
