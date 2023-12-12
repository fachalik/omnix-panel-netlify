import React from 'react';
import { Layout, theme } from 'antd';

interface IContent {
  children: React.ReactNode;
  style?: any;
}

function ContentLeft({ children, style }: IContent) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout.Content
      style={{
        padding: 24,
        maxHeight: '100%',
        width: '20%',
        background: colorBgContainer,
        textAlign: 'start',
        marginRight: 10,
        borderRadius: 8,
        ...style,
      }}
    >
      {children}
    </Layout.Content>
  );
}

export default ContentLeft;
