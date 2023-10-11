import { Card } from 'antd';

interface ICardComponent {
  children: React.ReactNode;
}

export default function CardComponent({ children }: ICardComponent) {
  return (
    <Card
      bodyStyle={{
        padding: ' 20px',
        boxShadow: '0 0 2px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.14)',
      }}
      style={{
        width: 'calc(100% - 20px)',
        margin: '10px 0px',
        alignItems: 'center',
        border: 'unset',
        marginBottom: '2em',
      }}
    >
      {children}
    </Card>
  );
}
