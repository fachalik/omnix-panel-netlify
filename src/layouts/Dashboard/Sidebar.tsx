// import React from 'react';

import { adminRoutes, userRoutes, resellerRoutes } from './Config';

import { LogoutOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Layout, Menu, Avatar, Dropdown, Modal, Tooltip } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

import { palette } from '@/theme/themeConfig';
import { useOtherStore, useAuthStore, useModalLogoutstore } from '@/store';
import useIsMobile from '@/hooks/useIsMobile';
import useWindowSize from '@/hooks/useWindowSize';
import OmnixSmall from '@/assets/omnix-icon-white.png';
import OmnixBig from '@/assets/omnix_white_v2.png';

//**--------------------------------------------------------------

export default function Sidebar() {
  const {
    other: { sidebarCollapse },
  } = useOtherStore((state) => state);

  const { height } = useWindowSize();

  const { user, logoutAuth, setIsLogout } = useAuthStore((state) => state);

  const { reset: resetModalLogout } = useModalLogoutstore((state) => state);

  const navigate = useNavigate();

  const location = useLocation();

  const { pathname } = location;

  const isMobile = useIsMobile();

  const items: MenuProps['items'] = [
    {
      key: '/logout',
      icon: <LogoutOutlined />,
      label: (
        <p
          onClick={() => {
            Modal.confirm({
              title: 'Logout',
              icon: <ExclamationCircleOutlined />,
              content: (
                <div style={{ borderTop: '1px solid #d4d4d4' }}>
                  <div style={{ marginTop: 5 }}>Are you sure want logout?</div>
                </div>
              ),
              okText: 'Yes',
              cancelText: 'No',
              okButtonProps: {
                type: 'primary',
                style: {
                  background: palette.primary.main,
                  color: '#fff',
                  float: 'left',
                  border: '1px solid ' + palette.primary.main,
                },
              },
              cancelButtonProps: {
                type: 'default',
                style: {
                  color: palette.primary.main,
                  float: 'left',
                  marginLeft: '34px',
                  border: '1px solid ' + palette.primary.main,
                },
              },
              onOk: async () => {
                await logoutAuth();
                await resetModalLogout;
                await setIsLogout(false);
              },
            });
          }}
        >
          Logout
        </p>
      ),

      title: '',
      style: {
        fontSize: 12,
        borderTop: '1px solid #f0f0f0',
      },
    },
  ];

  const mapRoute = (role: string): any => {
    console.log('ROLE', role);
    switch (role) {
      case 'user':
        return userRoutes;

      case 'admin':
        return adminRoutes;

      case 'reseller':
        return resellerRoutes;

      default:
        return [];
    }
  };

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={sidebarCollapse}
      collapsedWidth={isMobile ? 0 : '4rem'}
      breakpoint="lg"
      style={{
        height: '100vh',
        overflow: 'hidden',
        background: palette.primary.dark,
        position: 'sticky',
        left: 0,
        // position: 'relative',
      }}
      theme="dark"
      className="sidebar"
    >
      <div
        style={{
          height: 50,
          backgroundColor: palette.primary.light,
        }}
      >
        <img
          src={sidebarCollapse ? OmnixSmall : OmnixBig}
          alt="Vercel Logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            margin: 'auto',
            borderRadius: 10,
            backgroundColor: palette.primary.light,
            padding: 5,
          }}
        />
      </div>

      <Menu
        style={{
          padding: 5,
          marginTop: 20,
          overflow: 'hidden',
          height: height - 150,
          position: 'relative',
          backgroundColor: palette.primary.dark,
        }}
        theme="dark"
        mode="inline"
        onClick={(e) => {
          navigate(e.key);
        }}
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={[pathname]}
        selectedKeys={[pathname]}
        items={mapRoute(user?.role.name.toLowerCase() ?? '').map(
          (val: any, idx: number) => {
            return {
              key: val.key,
              icon: (
                <Tooltip placement="left">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                    }}
                  >
                    <img
                      src={val.icon}
                      style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: val[idx] ? '#eeeeee' : '',
                      }}
                      alt={`${val.key}-${idx}`}
                    />
                  </div>
                </Tooltip>
              ),
              label: val.label,
            };
          }
        )}
      />
      <Dropdown menu={{ items }} placement="topRight" trigger={['click']}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Avatar
            style={{
              background: palette.primary.main,
              color: '#fff',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
            size={'large'}
          >
            {user?.firstName.charAt(0)}
          </Avatar>
        </div>
      </Dropdown>
    </Layout.Sider>
  );
}
