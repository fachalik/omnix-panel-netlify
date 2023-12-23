import React from 'react';
import { theme, Tooltip, Button, Breadcrumb } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';

// type BreadCr

interface IProps {
  children?: React.ReactNode;
  item: ItemType[];
  isBack?: boolean;
  style?: any;
}

export default function HeaderSection({
  item,
  isBack = false,
  children,
  style,
}: IProps) {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div
      style={{
        padding: 24,
        width: '100%',
        background: colorBgContainer,
        textAlign: 'start',
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'space-between',
        ...style,
      }}
    >
      <div style={{ display: 'flex', gap: '1em', alignItems: 'center' }}>
        {isBack && (
          <Tooltip title="back">
            <Button
              type="text"
              shape="circle"
              style={{ marginRight: 5 }}
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(-1)}
            />
          </Tooltip>
        )}
        <Breadcrumb
          style={{ fontSize: '18px', fontWeight: 600 }}
          items={item}
        />
      </div>
      {children}
    </div>
  );
}
