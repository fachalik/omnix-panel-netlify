import React from 'react';
import { Layout, theme } from 'antd';

interface IContent {
  children: React.ReactNode;
  style?: any;
}

function Content({ children, style }: IContent) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout.Content
      style={{
        padding: 24,
        minHeight: '100%',
        background: colorBgContainer,
        textAlign: 'start',
        borderRadius: 8,
        ...style,
      }}
    >
      {children}
    </Layout.Content>
  );
}

export default Content;
