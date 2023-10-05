import React from 'react';
import { Card, Typography } from 'antd';

interface ICardDashboard {
  title: string;
  icon?: any;
  value?: string | number;
  children?: React.ReactNode;
}

function CardDashboard({ title, icon, value, children }: ICardDashboard) {
  return (
    <Card style={{ marginBottom: 10 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {icon && <img src={icon ?? ''} alt={`icon-${title}`} />}
        <div style={{ marginLeft: '1em', textAlign: 'start' }}>
          <Typography style={{ fontWeight: 'bold', fontSize: 14 }}>
            {title}
          </Typography>
          {value && (
            <Typography
              style={{
                fontWeight: 'bold',
                fontSize: 24,
                textAlign: 'center',
              }}
            >
              {value}
            </Typography>
          )}
        </div>
      </div>
      {children}
    </Card>
  );
}

export default CardDashboard;
