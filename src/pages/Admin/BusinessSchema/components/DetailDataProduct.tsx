import Content from '@/layouts/Dashboard/Content';
import React from 'react';
import { Row, Col } from 'antd';

export default function DetailDataProduct() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: 8,
      }}
    >
      <Row
        style={{ width: '100%', margin: 0, padding: 0 }}
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      >
        <Col
          xs={24}
          style={{
            margin: '0px 0px 15px 0px',
            padding: '0px',
            width: '100%',
            height: '100%',
          }}
        >
          <Content>DetailDataProduct</Content>
        </Col>
        <Col
          xs={24}
          style={{
            margin: '0px 0px 15px 0px',
            padding: '0px',
            width: '100%',
            height: '100%',
          }}
        >
          <Content>DetailDataProduct</Content>
        </Col>
      </Row>
    </div>
  );
}
