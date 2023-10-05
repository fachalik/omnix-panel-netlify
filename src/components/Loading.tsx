import { Spin, theme } from 'antd';

function Loading() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: colorBgContainer,
      }}
    >
      <Spin />
      <p style={{ marginLeft: '10px', fontSize: '16px' }}>Loading ...</p>
    </div>
  );
}

export default Loading;
