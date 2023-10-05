import { Divider, Button, Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom';
import TelegramImg from '@/assets/icons/telegram.svg';

export default function Page() {
  const navigate = useNavigate();
  return (
    <div>
      <Breadcrumb
        separator=">"
        style={{ marginBottom: '1em' }}
        items={[
          {
            href: '/channel-subscription',
            title: 'Channel Subscription',
          },
          {
            href: '',
            title: 'Telegram',
          },
        ]}
      />
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
          <img src={TelegramImg} alt="omnix-telegram" width={30} height={30} />
          <div style={{ fontSize: 20, fontWeight: 'bold' }}>Telegram</div>
          <div>by Omnix</div>
        </div>
        <Button
          type="primary"
          onClick={() => navigate('/channel-subscription/telegram/subscribe')}
        >
          Subscription Telegram
        </Button>
      </div>
      <div style={{ textAlign: 'start' }}>
        Integrate your Telegram business account and manage all your Telegram
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
          Sebelum Anda dapat melakukan subscribe Telegram, Anda harus memiliki:
        </p>
        <p style={{ marginBottom: 10 }}>1. Profil Telegram</p>
        <p style={{ marginBottom: 10 }}>
          2. Halaman Telegram dengan akses admin
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
          akun Telegram Anda, menautkan halaman Telegram Anda, dan memberikan
          <br />
          izin yang benar.
        </p>
      </div>
    </div>
  );
}
