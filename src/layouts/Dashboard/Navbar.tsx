import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Layout, Button, Dropdown, Avatar, Modal } from 'antd';
import type { MenuProps } from 'antd';

import { palette } from '@/theme/themeConfig';
import { useLocation } from 'react-router-dom';
import { useOtherStore, useAuthStore, useModalLogoutstore } from '@/store';

export default function Navbar() {
  const { pathname } = useLocation();

  const { user, logoutAuth, setIsLogout } = useAuthStore((state) => state);

  const { reset: resetModalLogout } = useModalLogoutstore((state) => state);

  const {
    other: { sidebarCollapse },
    setSidebarCollapse,
  } = useOtherStore((state) => state);

  const actulPathname = pathname
    .split('/')[1]
    .split('-')
    .join(' ')
    .toUpperCase();

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

  return (
    <Layout.Header
      style={{
        height: '8%',
        position: 'sticky',
        top: 0,
        zIndex: 2,
        background: '#fff',
        overflowY: 'hidden',
        alignItems: 'center',
        justifyContent: 'space-between',
        display: 'flex',
        padding: '0px 20px',
        width: '100%',
      }}
    >
      <div
        style={{
          height: '100%',
          marginLeft: '1em',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Button
          type="text"
          icon={sidebarCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setSidebarCollapse()}
        />
        <p style={{ marginLeft: '1em', fontSize: 16, fontWeight: 600 }}>
          {actulPathname}
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            lineHeight: 1.5,
            marginRight: '1em',
            textAlign: 'right',
          }}
        >
          <p style={{ color: '#6e6b7b', fontWeight: 'bold', fontSize: 12 }}>
            {user?.name}
          </p>
          <p
            style={{
              color: palette.primary.main,
              fontWeight: 'bold',
              fontSize: 10,
            }}
          >
            {user?.role}
          </p>
        </div>
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
              {user?.name.charAt(0)}
            </Avatar>
          </div>
        </Dropdown>
      </div>
    </Layout.Header>
  );
}
