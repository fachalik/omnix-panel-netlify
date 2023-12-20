import React from 'react';

import Sidebar from '@/layouts/Dashboard/Sidebar';
import Navbar from '@/layouts/Dashboard/Navbar';
import NotificationContext from '@/hooks/NotificationContext';
import Content from '@/layouts/Dashboard/Content';

import { Layout, Divider, Row, Col, Button, Breadcrumb } from 'antd';
import { palette } from '@/theme/themeConfig';
import { hexToRgba } from '@/utils/utilitys';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd/lib';

interface IDashboardLayout {
  children: React.ReactNode;
}

export default function BusinessSchemaWrapper({ children }: IDashboardLayout) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [menuData, setMenuData] = React.useState('Product Settings');

  const menu: any = searchParams.get('menu');
  const product: any = searchParams.get('product');
  const name: any = searchParams.get('name');
  // const id: any = searchParams.get('id');
  const action: any = searchParams.get('action');
  const username: any = searchParams.get('username');

  React.useEffect(() => {
    setSearchParams({ ...searchParams, menu: menuData });
  }, [menuData]);

  const menuList = [
    {
      value: 'Product Settings',
      label: 'Product Settings',
    },
    {
      value: 'Pricing Allocation',
      label: 'Pricing Allocation & Visibility',
    },
  ];
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <NotificationContext />
      <Layout hasSider>
        <Sidebar />
        <Layout>
          <Navbar />
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              overflowX: 'hidden',
              overflowY: 'scroll',
              top: 60,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <div style={{ display: 'flex', width: '100%' }}>
              <Row
                style={{ width: '100%' }}
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              >
                <Col xs={24} md={5} style={{ marginBottom: 15 }}>
                  <Content style={{ width: '100%' }}>
                    <p style={{ fontSize: 16, fontWeight: 600 }}>Settings</p>
                    <Divider />
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      {menuList.map(
                        (
                          item: { value: string; label: string },
                          idx: number
                        ) => {
                          return (
                            <>
                              <Button
                                key={`${idx}_${item.value}`}
                                type={
                                  menuData === item.value ? 'primary' : 'text'
                                }
                                block
                                style={{
                                  boxShadow: 'none',
                                  width: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 5,
                                  marginBottom: 5,
                                  color:
                                    menuData !== item.value
                                      ? ''
                                      : palette.primary.main,
                                  background:
                                    menuData !== item.value
                                      ? ''
                                      : hexToRgba(palette.primary.main, 0.2),
                                }}
                                onClick={() => setMenuData(item.value)}
                              >
                                <p
                                  style={{
                                    fontSize: 14,
                                    wordWrap: 'break-word',
                                    fontWeight:
                                      menuData !== item.value ? 400 : 700,
                                  }}
                                >
                                  {item.label}
                                </p>
                              </Button>
                            </>
                          );
                        }
                      )}
                    </div>
                  </Content>
                </Col>
                <Col
                  xs={24}
                  md={24 - 5}
                  style={{ marginBottom: 15, width: '100%', height: '100%' }}
                >
                  <Row
                    style={{ width: '100%' }}
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                  >
                    <Col
                      style={{
                        background: 'white',
                        marginBottom: 20,
                        height: '100%',
                        padding: '20px 20px',
                        borderRadius: 8,
                        display: 'flex',
                      }}
                      xs={24}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {(product || username) && (
                          <Tooltip title="back">
                            <Button
                              type="text"
                              shape="circle"
                              style={{ marginRight: 5 }}
                              icon={<ArrowLeftOutlined />}
                              onClick={() => navigate(-1)}
                            />
                          </Tooltip>
                        )}
                        <Breadcrumb style={{ fontWeight: 600, fontSize: 14 }}>
                          {username && (
                            <Breadcrumb.Item>
                              {username.replaceAll('_', ' ')}
                            </Breadcrumb.Item>
                          )}
                          {menu && (
                            <Breadcrumb.Item>
                              {menu.replaceAll('_', ' ')}
                            </Breadcrumb.Item>
                          )}
                          {product && (
                            <Breadcrumb.Item>
                              {product.replaceAll('_', ' ')}
                            </Breadcrumb.Item>
                          )}
                          {name && (
                            <Breadcrumb.Item>
                              {name.replaceAll('_', ' ')}
                            </Breadcrumb.Item>
                          )}
                          {action && (
                            <Breadcrumb.Item>
                              {action.replaceAll('_', ' ')}
                            </Breadcrumb.Item>
                          )}
                        </Breadcrumb>
                      </div>
                    </Col>
                    <Col
                      xs={24}
                      style={{
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {children}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </Layout>
      </Layout>
    </div>
  );
}
