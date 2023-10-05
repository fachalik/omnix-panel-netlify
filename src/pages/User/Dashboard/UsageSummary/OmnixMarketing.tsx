import SpendingChart from '@/components/Chart/SpendingChart';
import BarChart from '@/components/Chart/BarChart';
import DonutsChart from '@/components/Chart/DonutsChart';
import CardDashboard from '@/components/AllCard/CardDashboard';
import TableComponent from '../TableComponent';

import { Row, Col } from 'antd';
import { formatRupiah } from '@/utils/utilitys';

import IconWhasappDashboard from '@/assets/icons/WhatsappDashboard.svg';
import IconSmsDashboard from '@/assets/icons/SmsDashboard.svg';
import IconEmailDashboard from '@/assets/icons/EmailDashboard.svg';

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
          <CardDashboard
            title="Whatsapp Usage"
            value={formatRupiah('55998000', 'Rp.')}
            icon={IconWhasappDashboard}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <CardDashboard
            title="SMS Usage"
            value={formatRupiah('55998000', 'Rp.')}
            icon={IconSmsDashboard}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <CardDashboard
            title="Email Usage"
            value={formatRupiah('55998000', 'Rp.')}
            icon={IconEmailDashboard}
          />
        </Col>

        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <CardDashboard title="Spending Overview per Channel (Rp)">
            <SpendingChart />
          </CardDashboard>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <CardDashboard title="Top 5 Spending per Tenant">
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
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <CardDashboard title="All Tenant Spending">
            <TableComponent />
          </CardDashboard>
        </Col>
      </Row>
    </div>
  );
}
