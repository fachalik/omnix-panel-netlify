import React from 'react';

import Sidebar from '@/layouts/Dashboard/Sidebar';
import Navbar from '@/layouts/Dashboard/Navbar';
// import Content from '@/layouts/Dashboard/Content';

import { Layout } from 'antd';
import NotificationContext from '@/hooks/NotificationContext';

interface IDashboardLayout {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: IDashboardLayout) {
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
            {children}
            {/* <Content>{children}</Content> */}
          </div>
        </Layout>
      </Layout>
    </div>
  );
}
