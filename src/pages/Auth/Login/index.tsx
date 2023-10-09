import React from 'react';
import { GoogleOutlined, UserOutlined, BankOutlined } from '@ant-design/icons';

import { Row, Col, Card, Button, Divider } from 'antd';

import FormSignIn from '@/components/SingIn/Form/FormSignIn';
import FormSignInReseller from '@/components/SingIn/Form/FormSignInReseller';

import useIsMobile from '@/hooks/useIsMobile';
import { palette } from '@/theme/themeConfig';

import AlertContext from '@/hooks/AlertContext';

import useCheckIsNotLogin from '@/hooks/useCheckIsNotLogin';
import Loading from '@/components/Loading';

import { useNavigate } from 'react-router-dom';

import thirdPartyLogin from '@/lib/third-party-login';

import RegisterImage from '@/assets/image/register-image.png';

export default function Login() {
  // const { push } = useRouter();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [user, setUser] = React.useState<string>('user');

  const { isLoading, isNotLogin } = useCheckIsNotLogin();

  const redirect =
    import.meta.env.MODE === 'development'
      ? 'http://localhost:3000/google'
      : 'https://omnix-panel.netlify.app/google';

  const googleLogin = async () => {
    thirdPartyLogin(
      `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&client_id=${
        import.meta.env.VITE_APP_GOOGLE_CLIENT_ID
      }&scope=openid%20email%20profile&redirect_uri=${redirect}&service=lso&o2v=2&theme=glif&flowName=GeneralOAuthFlow`
    );
  };

  if (isLoading) {
    <Loading />;
  }

  if (isLoading && !isNotLogin) {
    return;
  }

  return (
    <main>
      <AlertContext />
      {!isMobile ? (
        <>
          <svg
            width="629"
            height="565"
            viewBox="0 0 629 565"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: 'absolute', right: 0 }}
          >
            <g filter="url(#filter0_f_2778_141517)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M523.63 -174C631.543 -174 704.478 -72.9834 704.478 34.9299C704.478 148.997 637.697 264.296 523.63 264.296C398.528 264.296 300 160.031 300 34.9299C300 -84.5871 404.113 -174 523.63 -174Z"
                fill="url(#paint0_linear_2778_141517)"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_2778_141517"
                x="0"
                y="-474"
                width="1004.48"
                height="1038.3"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="150"
                  result="effect1_foregroundBlur_2778_141517"
                />
              </filter>
              <linearGradient
                id="paint0_linear_2778_141517"
                x1="502.239"
                y1="-174"
                x2="502.239"
                y2="264.296"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#EFFFEF" />
                <stop offset="1" stopColor={`${palette.primary.main}`} />
              </linearGradient>
            </defs>
          </svg>
          <svg
            width="789"
            height="800"
            viewBox="0 0 789 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: 'absolute', left: 0, bottom: 0 }}
          >
            <g filter="url(#filter0_f_2778_141516)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M307.63 291C415.543 291 488.478 392.017 488.478 499.93C488.478 613.997 421.697 729.296 307.63 729.296C182.528 729.296 84 625.031 84 499.93C84 380.413 188.113 291 307.63 291Z"
                fill="url(#paint0_linear_2778_141516)"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_2778_141516"
                x="-216"
                y="-9"
                width="1004.48"
                height="1038.3"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="150"
                  result="effect1_foregroundBlur_2778_141516"
                />
              </filter>
              <linearGradient
                id="paint0_linear_2778_141516"
                x1="286.239"
                y1="291"
                x2="286"
                y2="650"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#EFFFEF" />
                <stop offset="1" stopColor={`${palette.primary.main}`} />
              </linearGradient>
            </defs>
          </svg>
        </>
      ) : null}

      <div
        style={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#f0f0f0',
        }}
      >
        <Row style={{ width: '100%', zIndex: 5 }} justify="center">
          <Col xs={24} sm={24} md={24} lg={14} xl={14}>
            <Card bodyStyle={{ padding: 0 }} bordered={false}>
              <Row>
                <Col xs={0} sm={0} md={0} lg={14} xl={14}>
                  <div
                    style={{
                      height: '75vh',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderTopLeftRadius: 7,
                      borderBottomLeftRadius: 7,
                      backgroundColor: palette.primary.main,
                    }}
                  >
                    <svg
                      width="343"
                      height="274"
                      viewBox="0 0 343 274"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        borderBottomLeftRadius: 7,
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M-122.035 0.0084906L-117.757 19.321C-113.749 39.6415 -105.865 79.0143 -63.3518 80.511C-21.2403 81.7475 54.8301 45.8555 67.4115 79.994C80.3952 114.393 30.9632 218.334 48.9138 246.49C66.5954 275.654 152.331 228.286 189.475 235.765C226.889 242.235 215.711 303.554 234.064 331.97C251.344 360.874 298.555 357.136 321.204 380.058C344.254 403.24 342.071 453.83 342.052 478.637L340.961 503.932L312.102 536.086L298.429 527.242C284.353 518.138 257.007 500.451 229.258 482.503C201.912 464.816 174.163 446.868 146.817 429.18C119.068 411.233 91.3193 393.285 63.9728 375.598C36.2242 357.65 8.87776 339.963 -18.8709 322.015C-46.2173 304.328 -73.966 286.38 -101.715 268.432C-129.061 250.745 -156.81 232.797 -184.156 215.11C-211.905 197.162 -239.251 179.475 -253.327 170.371L-267 161.527L-122.035 0.0084906Z"
                        fill="url(#paint0_linear_2778_141204)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_2778_141204"
                          x1="-77.2348"
                          y1="85.9767"
                          x2="205.246"
                          y2="496.626"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor={`${palette.primary.dark}`} />
                          <stop
                            offset="0.479648"
                            stopColor={`${palette.primary.main}`}
                          />
                          <stop
                            offset="1"
                            stopColor={`${palette.primary.dark}`}
                          />
                        </linearGradient>
                      </defs>
                    </svg>

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
                          // margin: '0 30px 30px 30px',
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
                    padding: '50px 30px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  <p
                    style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      marginBottom: '1em',
                    }}
                  >
                    Sign In
                  </p>

                  <Row gutter={[8, 16]}>
                    <Col span={12}>
                      <Card
                        onClick={() => setUser('user')}
                        style={{
                          cursor: 'pointer',
                          borderColor:
                            user === 'user' ? palette.primary.main : '',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <UserOutlined
                            style={{
                              fontSize: 22,
                              color:
                                user === 'user' ? palette.primary.main : '',
                            }}
                          />
                          <p>Regular</p>
                        </div>
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card
                        onClick={() => setUser('reseller')}
                        style={{
                          cursor: 'pointer',
                          borderColor:
                            user === 'reseller' ? palette.primary.main : '',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <BankOutlined
                            style={{
                              fontSize: 22,
                              color:
                                user === 'reseller' ? palette.primary.main : '',
                            }}
                          />
                          <p>Reseller</p>
                        </div>
                      </Card>
                    </Col>
                  </Row>

                  {user === 'user' && <FormSignIn />}

                  {user === 'reseller' && <FormSignInReseller />}

                  <Divider plain>Or</Divider>
                  <Button onClick={googleLogin} type="primary" block>
                    <GoogleOutlined />
                    Sign in with google
                  </Button>
                  <div
                    style={{
                      marginTop: '2em',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <p style={{ marginRight: '1em' }}>Belum memiliki akun?</p>
                    <Button type="primary" onClick={() => navigate('/sign-up')}>
                      Buat Akun
                    </Button>
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
