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
import TelegramDashboard from '@/assets/icons/telegram.svg';
import FBMDashboard from '@/assets/icons/FBMDashboard.svg';
import InstagramDashboard from '@/assets/icons/InstagramDashboard.svg';
import twitter from '@/assets/icons/twitter.svg';
import LivechatDashboard from '@/assets/icons/LivechatDashboard.svg';
import LineDashboard from '@/assets/icons/LineDashboard.svg';
import FacebookDashboard from '@/assets/icons/FacebookDashboard.svg';
import InstagramCommentDashboard from '@/assets/icons/InstagramCommentDashboard.svg';
import VoiceDashboard from '@/assets/icons/VoiceDashboard.svg';

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
        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <CardDashboard
            title="Whatsapp Usage"
            value={formatRupiah('55998000', 'Rp.')}
            icon={IconWhasappDashboard}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <CardDashboard
            title="Telegram Usage"
            value={formatRupiah('55998000', 'Rp.')}
            icon={TelegramDashboard}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <CardDashboard
            title="Facebook Messenger Usage"
            value={formatRupiah('55998000', 'Rp.')}
            icon={FBMDashboard}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <CardDashboard
            title="Instagram Messenger Usage"
            value={formatRupiah('55998000', 'Rp.')}
            icon={InstagramDashboard}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <CardDashboard
            title="Twitter Messenger Usage"
            value={formatRupiah('55998000', 'Rp.')}
            icon={twitter}
          />
        </Col>

        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <CardDashboard
            title="Livechat Usage"
            value={formatRupiah('55998000', 'Rp.')}
            icon={LivechatDashboard}
          />
        </Col>

        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <CardDashboard
            title="Line Usage"
            value={formatRupiah('55998000', 'Rp.')}
            icon={LineDashboard}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <CardDashboard
            title="SMS Usage"
            value={formatRupiah('55998000', 'Rp.')}
            icon={IconSmsDashboard}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <CardDashboard
            title="Email Usage"
            value={formatRupiah('55998000', 'Rp.')}
            icon={IconEmailDashboard}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <CardDashboard
            title="Facebook Comment Usage"
            value={formatRupiah('55998000', 'Rp.')}
            icon={FacebookDashboard}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <CardDashboard
            title="Instagram Comment Usage"
            value={formatRupiah('55998000', 'Rp.')}
            icon={InstagramCommentDashboard}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <CardDashboard
            title="Voice Usage"
            value={formatRupiah('55998000', 'Rp.')}
            icon={VoiceDashboard}
          />
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
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
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <CardDashboard title="All Tenant Spending">
            <TableComponent />
          </CardDashboard>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <CardDashboard title="All Tenant Spending">
            <TableComponent />
          </CardDashboard>
        </Col>
      </Row>
    </div>
  );
}
