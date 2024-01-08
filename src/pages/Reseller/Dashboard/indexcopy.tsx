import SpendingChart from '@/components/Chart/SpendingChart';
import BarChart from '@/components/Chart/BarChart';
import DonutsChart from '@/components/Chart/DonutsChart';
import CardDashboard from '@/components/AllCard/CardDashboard';
import TableComponent from './TableComponent';

import { Row, Col } from 'antd';

export default function Dashboard() {
  return (
    <div>
      <Row
        gutter={[12, 12]}
        style={{
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <CardDashboard title="Total User Initiated" value={861} />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <CardDashboard title="Total Business Initiated" value={861} />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <CardDashboard title="Total Send" value={861} />
        </Col>
        r
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <CardDashboard title="Total Message Status Hourly">
            <SpendingChart />
          </CardDashboard>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <CardDashboard title="Top 5 Spending per Tenant">
            <BarChart />
          </CardDashboard>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <CardDashboard title="Top 5 Spending per Re-seller">
            <BarChart />
          </CardDashboard>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <CardDashboard title="Subscription Package Statistic">
            <DonutsChart />
          </CardDashboard>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <CardDashboard title="Subscription Package Statistic">
            <DonutsChart />
          </CardDashboard>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <CardDashboard title="All Tenant Spending">
            <TableComponent />
          </CardDashboard>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <CardDashboard title="All Re-seller Spending">
            <TableComponent />
          </CardDashboard>
        </Col>
      </Row>
    </div>
  );
}
