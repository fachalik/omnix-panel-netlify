import Illustration404 from '@/assets/image/Illustration404.svg';

interface IError {
  error?: string;
}

export default function Error({ error }: IError) {
  return (
    <div style={{ padding: 12, textAlign: 'center' }}>
      <img src={Illustration404} alt="404" />
      <p style={{ fontWeight: '500', fontSize: '16px' }}>{error}</p>
    </div>
  );
}
