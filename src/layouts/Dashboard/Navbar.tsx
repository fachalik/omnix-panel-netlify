import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Button } from 'antd';

import { useOtherStore } from '@/store';
import { useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();
  console.log('pathname', pathname);

  const {
    other: { sidebarCollapse },
    setSidebarCollapse,
  } = useOtherStore((state) => state);

  const actulPathname = pathname
    .split('/')[1]
    .split('-')
    .join(' ')
    .toUpperCase();

  return (
    <Layout.Header
      style={{
        padding: 0,
        position: 'sticky',
        top: 0,
        zIndex: 2,
        background: '#fff',
        overflowY: 'hidden',
        alignItems: 'center',
        display: 'flex',
        width: '100%',
      }}
    >
      <div
        style={{
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
    </Layout.Header>
  );
}
