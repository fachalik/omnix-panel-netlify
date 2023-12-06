import { Spin, theme } from 'antd';

interface IProps {
  height?: string;
}

function Loading(props: IProps) {
  const { height = '100vh' } = props;

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height,
        background: colorBgContainer,
      }}
    >
      <Spin />
      <p style={{ marginLeft: '10px', fontSize: '16px' }}>Loading ...</p>
    </div>
  );
}

export default Loading;
