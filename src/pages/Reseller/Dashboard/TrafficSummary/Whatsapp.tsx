import SpendingChart from '@/components/Chart/SpendingChart';
import PieChart from '@/components/Chart/PieChart';
import CardDashboard from '@/components/AllCard/CardDashboard';
import TableComponent from '../TableComponent';

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
        <Col xs={24} sm={24} md={24} lg={5} xl={5}>
          <CardDashboard title="Total User Initiated" value={861} />
        </Col>
        <Col xs={24} sm={24} md={24} lg={5} xl={5}>
          <CardDashboard title="Total Business Initiated" value={861} />
        </Col>
        <Col xs={24} sm={24} md={24} lg={5} xl={4}>
          <CardDashboard title="Total Send" value={861} />
        </Col>
        <Col xs={24} sm={24} md={24} lg={5} xl={5}>
          <CardDashboard title="Total Delivered" value={861} />
        </Col>
        <Col xs={24} sm={24} md={24} lg={5} xl={5}>
          <CardDashboard title="Total Read" value={861} />
        </Col>

        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <CardDashboard title="Total Message Status Hourly">
            <SpendingChart />
          </CardDashboard>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <CardDashboard title="Business initiated Message Categories">
            <PieChart />
          </CardDashboard>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <CardDashboard title="All Re-seller Spending">
            <TableComponent />
          </CardDashboard>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <CardDashboard title="Traffic Per Platform">
            <PieChart />
          </CardDashboard>
        </Col>
      </Row>
    </div>
  );
}
