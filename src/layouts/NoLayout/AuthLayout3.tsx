import { Row, Col, Card } from 'antd';

import useIsMobile from '@/hooks/useIsMobile';
import { palette } from '@/theme/themeConfig';

interface IAuthLayout3 {
  children: React.ReactNode;
}

export default function AuthLayout3({ children }: IAuthLayout3) {
  const isMobile = useIsMobile();

  return (
    <main>
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
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={24}
                  xl={24}
                  style={{
                    padding: '50px 30px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  {children}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </main>
  );
}
