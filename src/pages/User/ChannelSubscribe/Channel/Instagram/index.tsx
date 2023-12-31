import { Divider, Button, Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom';
import InstagramImg from '@/assets/icons/instagram.svg';

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
            title: 'Instagram',
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
          <img
            src={InstagramImg}
            alt="omnix-instagram"
            width={30}
            height={30}
          />
          <div style={{ fontSize: 20, fontWeight: 'bold' }}>Instagram</div>
          <div>by Omnix</div>
        </div>
        <Button
          type="primary"
          onClick={() => navigate('/channel-subscription/instagram/subscribe')}
        >
          Subscription Instagram
        </Button>
      </div>
      <div style={{ textAlign: 'start' }}>
        Integrate your Instagram business account and manage all your Instagram
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
          Sebelum Anda dapat melakukan subscribe Instagram, Anda harus memiliki:
        </p>
        <p style={{ marginBottom: 10 }}>1. Profil Instagram</p>
        <p style={{ marginBottom: 10 }}>
          2. Halaman Instagram dengan akses admin
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
          akun Instagram Anda, menautkan halaman Instagram Anda, dan memberikan
          <br />
          izin yang benar.
        </p>
      </div>
    </div>
  );
}
