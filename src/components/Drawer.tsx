import React from 'react';
import { Drawer as DrawerANTD } from 'antd';

interface IDrawer {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  width?: number;
}

export default function Drawer(props: IDrawer) {
  const { title, open, onClose, children } = props;

  return (
    <DrawerANTD
      title={<p style={{ textTransform: 'capitalize' }}>{title}</p>}
      open={open}
      onClose={onClose}
    >
      {children}
    </DrawerANTD>
  );
}
