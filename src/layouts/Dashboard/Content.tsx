import React from 'react';
import { Layout, theme } from 'antd';

interface IContent {
  children: React.ReactNode;
}

function Content({ children }: IContent) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout.Content
      style={{
        padding: 24,
        minHeight: '100%',
        width: '100%',
        background: colorBgContainer,
      }}
    >
      {children}
    </Layout.Content>
  );
}

export default Content;
