import { Divider, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import TwitterImg from '@/assets/icons/twitter.svg';
import Content from '@/layouts/Dashboard/Content';
import HeaderSection from '@/components/HeaderSection';
export default function Page() {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
      <HeaderSection
        isBack
        item={[
          {
            href: '/channel-subscription',
            title: 'Channel Subscription',
          },
          {
            title: 'Twitter',
          },
        ]}
      />
      <Content>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
              marginBottom: 10,
              textAlign: 'start',
            }}
          >
            <img src={TwitterImg} alt="omnix-twitter" width={30} height={30} />
            <div style={{ fontSize: 20, fontWeight: 'bold' }}>Twitter</div>
            <div>by Omnix</div>
          </div>
          <Button
            type="primary"
            onClick={() => navigate('/channel-subscription/twitter/subscribe')}
          >
            Subscription Twitter
          </Button>
        </div>
        <div style={{ textAlign: 'start' }}>
          Integrate your Twitter business account and manage all your Twitter
          conversations.
        </div>
        <Divider />
        <div style={{ textAlign: 'start' }}>
          <p style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>
            Apa saja yang Anda perlukan
          </p>
          <p style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 10 }}>
            Pra-instalasi
          </p>
          <p style={{ marginBottom: 20 }}>
            Sebelum Anda dapat melakukan subscribe Twitter, Anda harus memiliki:
          </p>
          <p style={{ marginBottom: 10 }}>1. Profil Twitter</p>
          <p style={{ marginBottom: 10 }}>
            2. Halaman Twitter dengan akses admin
          </p>
        </div>
        <div style={{ textAlign: 'start' }}>
          <p style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 10 }}>
            Perizinan
          </p>
          <p style={{ marginBottom: 10 }}>
            Sebagai bagian dari proses subscribe, kami akan meminta izin untuk
            <br />
            mengakses percakapan halaman dan menampilkan daftar semua halaman
            <br /> yang Anda kelola.
          </p>
        </div>
        <div style={{ textAlign: 'start' }}>
          <p style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 10 }}>
            Subscribe
          </p>
          <p style={{ marginBottom: 10 }}>
            Kami akan memandu Anda melalui proses subscribe, termasuk masuk ke
            <br />
            akun Twitter Anda, menautkan halaman Twitter Anda, dan memberikan
            <br />
            izin yang benar.
          </p>
        </div>
      </Content>
    </div>
  );
}
