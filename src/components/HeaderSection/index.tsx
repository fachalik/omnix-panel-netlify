import React from 'react';
import { theme, Tooltip, Button, Breadcrumb } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { useOrderStore } from '@/store';
// type BreadCr

interface IProps {
  children?: React.ReactNode;
  item: ItemType[];
  isBack?: boolean;
  navigateTo?: string;
  style?: any;
}

export default function HeaderSection({
  item,
  isBack = false,
  children,
  style,
  navigateTo,
}: IProps) {
  const { reset } = useOrderStore((state) => state);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigateRoute = () => {
    if (navigateTo) {
      navigate(navigateTo);
      reset();
    } else {
      navigate(-1);
      reset();
    }
  };

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
              onClick={() => navigateRoute()}
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
