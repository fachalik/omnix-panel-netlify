import { Card, Row, Col, Tabs } from 'antd';
import CardSettingChannel from '@/components/AllCard/CardSettingChannel';
import { CredentialInformation } from './CredentialInformation';
import { PaymentInformation } from './PaymentInformation';
import HeaderSection from '@/components/HeaderSection';
import { getLogin } from '@/utils/sessions';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

import { useGetProductActivationDetail } from '@/hooks/ReactQuery/user/useGetProductActivation';

import { useNavigate, useParams } from 'react-router-dom';
import { mapIcon } from '@/utils/utilitys';

export default function Page() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isError, error }: any =
    useGetProductActivationDetail({
      token: getLogin().token ?? '',
      id: id ?? '',
    });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
      {isLoading && <Loading />}

      {!isLoading && isSuccess && (
        <>
          <HeaderSection
            isBack
            item={[
              {
                href: '/product-activation',
                title: 'Product Activation',
              },
              {
                title: data?.productName ?? '',
              },
            ]}
          />

          <Card>
            <div
              style={{
                background: '#F0F2F5',
                padding: '20px 30px',
                marginTop: 20,
                marginBottom: 20,
                textAlign: 'start',
              }}
            >
              <Row align="middle" gutter={[12, 12]}>
                <Col xs={24} sm={24} md={24} lg={2}>
                  <img
                    src={mapIcon(data?.productCategory)}
                    width={100}
                    height={100}
                    style={{
                      width: '100%',
                      margin: 'auto',
                      objectFit: 'contain',
                      height: 60,
                    }}
                    alt={'iconLogo'}
                  />
                </Col>
                <Col xs={24} sm={24} md={24} lg={5}>
                  <div
                    style={{ color: '#595959', fontSize: 17, fontWeight: 500 }}
                  >
                    {data?.productName ?? ''}
                  </div>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={5}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                    alignItems: 'start',
                    gap: '.5em',
                  }}
                >
                  <p>Plan</p>
                  <div
                    style={{ color: '#595959', fontSize: 17, fontWeight: 500 }}
                  >
                    {data?.productName}
                  </div>
                  {data.productsDetail.length !== 0 && (
                    <a
                      type={'link'}
                      onClick={() => {
                        navigate(`/package/${data.main_product_id ?? ''}`);
                      }}
                    >
                      Change Plan
                    </a>
                  )}
                </Col>
                <Col xs={24} sm={24} md={24} lg={4}>
                  <div style={{ fontSize: 12 }}>Role</div>
                  <div style={{ fontSize: 12 }}>Support Agent</div>
                </Col>

                <Col span={24} xs={24} sm={24} md={24} lg={4}>
                  <div style={{ fontSize: 12 }}>
                    Your current OMNIX Marketing account URL is
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: '#6E5FC9',
                      cursor: 'pointer',
                    }}
                  >
                    https:’’nadafadhilahfitriyani-62787389821782787382.omnixmarketing.com
                  </div>
                </Col>
              </Row>
            </div>
            <Tabs
              items={[
                {
                  label: 'Credential Information',
                  key: 'credential',
                  children: <CredentialInformation />,
                },
                {
                  label: 'Setting Channel',
                  key: 'setting',
                  children: <CardSettingChannel />,
                },
                {
                  label: 'Payment Information',
                  key: 'payment',
                  children: <PaymentInformation />,
                },
              ]}
              tabBarStyle={{
                marginLeft: 10,
                marginRight: 10,
              }}
            ></Tabs>
          </Card>
        </>
      )}

      {!isLoading && isError && <Error error={error} />}
    </div>
  );
}
